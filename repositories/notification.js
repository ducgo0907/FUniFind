import Notification from "../models/Notification.js";

const getNotification = async (startIndex, size, query) => {
	const listNoti = await Notification.find(query).skip(startIndex).limit(size).sort({ createdAt: -1 });
	const totalNoti = await Notification.countDocuments(query);

	if (!listNoti || listNoti.length <= 0) {
		return { message: "Don't have any notification!" }
	}
	return {
		data: listNoti,
		totalNoti
	};
}

const createNotification = async (content, userId, uri) => {
	const newNoti = await Notification.create({ content, user: userId, uri });
	return newNoti;
}

const read = async (notificationId) => {
	const notification = await Notification.findById(notificationId);
	notification.read = true;
	return notification.save();
}

export default {
	getNotification,
	createNotification,
	read
};
