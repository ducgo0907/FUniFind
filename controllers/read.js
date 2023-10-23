import Read from "../models/Read.js";

const read = async (req, res) => {
	const { postId } = req.body;
	const userId = req.userID;
	try {
		const read = await Read.create({ user: userId, post: postId });
		return res.status(200).json({ read });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
}

export default {
	read
}