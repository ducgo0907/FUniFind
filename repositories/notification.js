import Notification from "../models/Notification.js";

const getNotification = async (startIndex, size, query) => {
	const listNoti = await Notification.find(query).skip(startIndex).limit(size).sort({ createdAt: -1 });
	const totalNoti = await Notification.countDocuments(query);

	if (!listNoti || listNoti.length <= 0) {
		return {message: "Don't have any notification!"}
	}
	return {
		data: listNoti,
		totalNoti
	};
}

export default {
	getNotification
};
