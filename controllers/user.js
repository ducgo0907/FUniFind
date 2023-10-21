import { validationResult } from "express-validator";
import { userRepository } from "../repositories/index.js";

const register = async (req, res) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return res.status(400).json({ error: error.array() });
	}

	// Destructuring Request Object
	const { name, email, password, phoneNumber, address } = req.body;
	try {
		// Call action cua Repository (DAO)
		const activeUser = await userRepository.register({ name, email, password, phoneNumber, address })
		return res.status(201).json({ message: 'Register successfully, please check email and active email by link in email.' })
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
}

const getAllUser = async (req, res) => {
	try {
		const listUser = await userRepository.getAllUsers();
		return res.status(200).json(listUser);
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
}

const login = async (req, res) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return res.status(400).json({ error: error.array() });
	}

	const { email, password } = req.body;
	try {
		const userInfo = await userRepository.login({ email, password });
		return res.status(200).json(userInfo);
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
}

const activateAccount = async (req, res) => {
	const email = req.query.email;
	const activationCode = req.query.activationCode;
	if (!email || !activationCode) {
		return res.status(400).json({
			message: 'Link is not correct!!'
		});
	}

	try {
		const isActive = await userRepository.activateAccount(email, activationCode);
		return res.status(200).json({ message: 'Active user sucessfully' });
	} catch (error) {
		return res.status(500).json({ message: error.toString() })
	}
}

const getUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await userRepository.getUserById(id);
		return res.status(200).json({
			message: "Get user successfully",
			data: user
		})
	} catch (error) {
		return res.status(500).json({ error: error });
	}
}

const changeActiveUser = async (req, res) => {
	const { userId } = req.body;
	try {
		const user = await userRepository.changeActiveUser(userId);
		return res.status(200).json(user)
	} catch (error) {
		return res.status(500).json({ error: error.toString() });
	}
}

const setAdmin = async (req, res) => {
	const { userId } = req.body;
	try {
		const user = await userRepository.setAdmin({ userId });
		return res.status(200).json(user)
	} catch (error) {
		return res.status(500).json({ error: error.toString() });
	}
}

export default {
	register,
	getAllUser,
	login,
	activateAccount,
	getUserById,
	setAdmin,
	changeActiveUser
}