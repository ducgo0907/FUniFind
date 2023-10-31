import { response } from "express";
import { messageRepository } from "../repositories/index.js";

const saveMessage = async (req, res) => {
	const { sender, receiver, message } = req.body;
	try {
		const newMessage = await messageRepository.saveMessage({ sender, receiver, message });
		return res.status(200).json({
			message: 'Created success',
			data: newMessage
		})
	} catch (error) {
		return res.status(500).json({ error: error.toString() });
	}
}

const getAllMessage = async (req, res) => {
	try {
		const { receiver, sender } = req.query;
		const userId = req.userID;
		const listMessages = await messageRepository.getAllMessage(receiver, sender, userId);
		return res.status(200).json({
			status: 'success',
			data: listMessages
		})
	} catch (error) {
		return res.status(500).json({ error: error.toString() })
	}
}

const getListReceiver = async (req, res) => {
	const { sender } = req.query;
	try {
		const listReceiver = await messageRepository.getListReceiver(sender);
		return res.status(200).json({ listReceiver });
	} catch (error) {
		return res.status(500).json({ error });
	}
}

export default {
	saveMessage,
	getAllMessage,
	getListReceiver
}