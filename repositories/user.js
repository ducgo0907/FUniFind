import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import sendMail from "../util/sendMail.js";
import user from "../controllers/user.js";

const register = async ({ name, email, password, phoneNumber, address }) => {
	// Kiem tra su ton tai cua User
	const existingUser = await User.findOne({ email }).exec();
	if (existingUser != null) {
		throw new Error("User is existed");
	}
	const hashPassword = await bcrypt.hash(password, parseInt(process.env.SECRET_KEY));

	// Create random activation code for user active account
	const activationCode = uuidv4();
	// Goi user model de thao tac du lieu
	const newUser = await User.create({
		name,
		email,
		password: hashPassword,
		phoneNumber,
		address,
		activationCode
	});

	const linkActivateCode = `${process.env.WEB_URL}users/activate?email=${email}&activationCode=${activationCode}`;
	sendMail(linkActivateCode, email)
		.then(() => {
			console.log("Send mail successfully");
		})
		.catch(error => {
			throw new Error(error);
		})
	return {
		...newUser,
		password: 'Not Show'
	}
}

const getAllUsers = async () => {
	// lay tat ca user
	const listAllUser = await User.find().select("-password");
	if (listAllUser == null) {
		throw new Error("Don't have any user");
	}
	return listAllUser;
}

const login = async ({ email, password }) => {
	try {
		const loginUser = await User.findOne({ email }).exec();

		if (!loginUser) {
			throw new Error('User not found');
		}
		const passwordIsValid = bcrypt.compareSync(password, loginUser.password);

		if (!passwordIsValid) {
			throw new Error('Password invalid');
		}
		if(!loginUser.isActive){
			throw new Error("User is not active");
		}
		const jwtSecret = process.env.SECRET_KEY_JWT;
		const token = jwt.sign({ id: loginUser._id, name: loginUser.name, email: loginUser.email, isActive: loginUser.isActive }, jwtSecret, {
			algorithm: 'HS256',
			expiresIn: 86400
		});
		return {
			id: loginUser._id,
			name: loginUser.name,
			email: loginUser.email,
			isAdmin: loginUser.isAdmin,
			accessToken: token
		}
	} catch (error) {
		throw new Error(error);
	}
}

const activateAccount = async (email, activationCode) => {
	try {
		const activeUser = await User.findOne({ email }).select("-password").exec();
		if (!activeUser) {
			throw new Error('User not existed');
		}
		if (activeUser.isActive) {
			throw new Error('User already active!');
		}
		if (activeUser.activationCode == activationCode) {
			activeUser.isActive = true;
			activeUser.activationCode = '';
		}
		await activeUser.save();
		return activeUser;
	} catch (error) {
		throw new Error(error);
	}
}

const getUserById = async (id) => {
	const user = await User.findById(id).select("-password");
	if (!user) {
		throw new Error("User is not existed");
	}
	return user;
}

const changeActiveUser = async (userId) => {
	const user = await User.findById(userId).select("-password").exec();
	console.log(user);
	if (!user) {
		return "User with this ID don't existed";
	}
	user.isActive = !user.isActive;
	await user.save();
	return user;
}

const setAdmin = async ({ userId }) => {
	const user = await User.findById(userId).select("-password").exec();
	if (!user) {
		return "User with this ID don't existed";
	}
	user.isAdmin = !user.isAdmin;
	await user.save();
	return user;
}


const edit = async ({ name, password, phoneNumber, address, userId }) => {
	const editUser = await User.findById(userId);
	if (!editUser) {
		return { message: "User is not existed" };
	}
	const hashPassword = await bcrypt.hash(password, parseInt(process.env.SECRET_KEY));
	editUser.name = name;
	editUser.password = hashPassword;
	editUser.phoneNumber = phoneNumber;
	editUser.address = address;
	try {
		await editUser.save();
		return editUser;
	} catch (error) {
		throw new Error({ message: error }.toString());
	}
}

export default {
	register,
	getAllUsers,
	login,
	activateAccount,
	getUserById,
	setAdmin,
	changeActiveUser,
	edit
};