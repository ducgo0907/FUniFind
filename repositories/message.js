import Message from "../models/Message.js"

const getAllMessage = async (receiver, sender) => {
	const listAllMessage = await Message.find({
		$or: [{ sender: sender, receiver: receiver }, { sender: receiver, receiver: sender }]
	}).sort({ createdAt: 1 });

	return listAllMessage;
}

const saveMessage = async ({ sender, receiver, message }) => {
	const newMessage = await Message.create({
		sender,
		receiver,
		message
	});
	return newMessage;
}

export default {
	getAllMessage,
	saveMessage
}