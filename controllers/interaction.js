import Message from "../models/Message.js";
import { interactionRepostiroy } from "../repositories/index.js";


const interact = async (req, res) => {
	const { typeInteract, postID } = req.body;
	const userID = req.userID;
	try {
		const newInteraction = await interactionRepostiroy.interact({ typeInteract, postID, userID });
		return res.status(200).json({
			message: 'action sucessfully',
			data: newInteraction
		})
	} catch (error) {
		res.status(500).json({ message: error });
	}
}

export default {
	interact
}