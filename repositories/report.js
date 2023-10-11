import Report from "../models/Report.js"

const all = async (startIndex, size) => {
	const listReport = await Report.find().skip(startIndex).limit(size);
	const totalReport = await Report.countDocuments();
	if (!listReport || listReport.length <= 0) {
		throw new Error("Don't have any report!");
	}
	return {
		data: listReport,
		totalReport
	};
}

const reportComment = async ({ commentId, userId, description }) => {
	try {
		const newReport = await Report.create({ comment: commentId, user: userId, description, type: "COMMENT" });
		return newReport;
	} catch (error) {
		throw new Error(error);
	}
}

const reportPost = async ({ postId, commentId, userId, description }) => {
	try {
		const newReport = await Report.create({ post: postId, user: userId, description, type: "POST" });
		return newReport;
	} catch (error) {
		throw new Error(error);
	}
}

const getReportComment = async (startIndex, size) => {
	const listReport = await Report.find({ type: 'COMMENT' }).skip(startIndex).limit(size);
	const totalReport = await Report.countDocuments({ type: 'COMMENT' });
	if (!listReport || listReport.length <= 0) {
		throw new Error("Don't have any report!");
	}
	return {
		data: listReport,
		totalReport
	};
}

const getReportPost = async (startIndex, size) => {
	const listReport = await Report.find({ type: 'POST' }).skip(startIndex).limit(size);
	const totalReport = await Report.countDocuments({ type: 'POST' });
	if (!listReport || listReport.length <= 0) {
		throw new Error("Don't have any report!");
	}
	return {
		data: listReport,
		totalReport
	};
}

export default {
	all,
	reportComment,
	reportPost,
	getReportComment,
	getReportPost
}