import { followRepository } from "../repositories/index.js";

const getListUserFollow = async (req, res) => {
	try {
		const { userId } = req.params;
		const page = parseInt(req.query.page) || 1;
		const size = parseInt(req.query.size) || 5;

		const startIndex = (page - 1) * size;
		const listFollow = await followRepository.getListUserFollow(userId, startIndex, size);
		return res.status(200).json(listFollow);
	} catch (error) {
		return res.status(500).json({ message: error });
	}
}

const follow = async (req, res) => {
	try {
		const { userFollowId } = req.body;
		const userId = req.userID;
		const newFollow = await followRepository.follow(userId, userFollowId);
		return res.status(200).json(newFollow);
	} catch (error) {
		return res.status(500).json({ message: error });
	}
}

export default {
	getListUserFollow,
	follow
}