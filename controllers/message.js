import { messageRepository } from "../repositories/index.js";

const saveMessage = async ({ sender, receiver, message }) => {
	try {
		const newMessage = await messageRepository.saveMessage({ sender, receiver, message });
		return {
			message: 'success',
			data: newMessage
		}
	} catch (error) {
		return res.status(500).json({ error: error.toString() });
	}
}

const getAllMessage = async (req, res) => {
	try {
		const { receiver, sender } = req.query;
		const listMessages = await messageRepository.getAllMessage(receiver, sender);
		return res.status(200).json({
			status: 'success',
			data: listMessages
		})
	} catch (error) {
		return res.status(500).json({ error: error.toString() })
	}
}

export default {
	saveMessage,
	getAllMessage
}