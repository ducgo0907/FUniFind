import Message from "../models/Message.js";
import { interactionRepostiroy } from "../repositories/index.js";


const interact = async (req, res) => {
	const { postID } = req.body;
	const userID = req.userID;
	try {
		const newInteraction = await interactionRepostiroy.like({ postID, userID });
		return res.status(200).json(newInteraction)
	} catch (error) {
		res.status(500).json({ message: error });
	}
}

const dislike = async (req, res) => {
	const { postID } = req.query;
	const userID = req.userID;
	try {
		const deleteInteraction = await interactionRepostiroy.dislike({ postID, userID });
		return res.status(200).json(deleteInteraction);
	} catch (error) {
		res.status(500).json({ message: error });
	}
}

export default {
	interact,
	dislike
}