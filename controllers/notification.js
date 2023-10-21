import { notificationRepository } from "../repositories/index.js";

const getNotification = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const size = parseInt(req.query.size) || 5;
	const user = req.userID;
	const query = { user };
	const startIndex = (page - 1) * size;
	try {
		const listNoti = await notificationRepository.getNotification(startIndex, size, query);
		return res.status(201).json(listNoti);
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
}

export default {
	getNotification
}