import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyToken = async (req, res, next) => {
	let token = req.headers["x-access-token"];
	if (!token) {
		return res.status(403).send({ message: "No token provide!" });
	}

	const jwtSecret = process.env.SECRET_KEY_JWT;
	jwt.verify(token,
		jwtSecret,
		(error, decoded) => {
			if (error) {
				return res.status(401).send({
					message: error
				})
			}
			if (!decoded.isActive) {
				return res.status(401).send({
					message: 'User is not active'
				})
			}
			req.userID = decoded.id;
			next();
		})
}

const isAdmin = async (req, res, next) => {
	try {
		const user = await User.findById(req.userID).exec();
		if (!user) {
			return res.status(400).send({ message: "User not found!" });
		}
		if (user.isAdmin) {
			next();
		} else {
			return res.status(403).send({ message: "Require Admin Role" });
		}
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
}

export default {
	verifyToken,
	isAdmin
}