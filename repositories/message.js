import Message from "../models/Message.js"
import User from "../models/User.js";

const getAllMessage = async (receiver, sender, userId) => {
	const user = await User.findOne({ email: sender });
	if (user._id.toString() !== userId) {
		return { message: "You don't have access to this messages" };
	}
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

const getListReceiver = async (sender) => {
	try {
		const listReceiver = await Message.distinct('receiver', { sender });
		return listReceiver;
	}catch(error){
		throw new Error(error.toString())
	}
}

export default {
	getAllMessage,
	saveMessage,
	getListReceiver
}