import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
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
		const comment = await Comment.findById(commentId);
		if (comment.status === 'BAN') {
			throw new Error('Comment already Banned');
		}
		const newReport = await Report.create({ comment: commentId, user: userId, description, type: "COMMENT" });
		const distinctUserCount = await Report.find({ comment: commentId, type: "COMMENT" }).distinct("user");
		console.log(distinctUserCount.length);
		if (distinctUserCount.length > 5) {
			const commentBanned = await Comment.findByIdAndUpdate(commentId, { status: "BAN" });
			console.log("Comment be banned: ", commentBanned);
		}
		return newReport;
	} catch (error) {
		throw new Error(error);
	}
}

const reportPost = async ({ postId, userId, description }) => {
	try {
		const post = await Post.findById(postId);
		if (post.status === 'BAN') {
			throw new Error('Post is already banned');
		}
		const newReport = await Report.create({ post: postId, user: userId, description, type: "POST" });
		const distinctUserCount = await Report.find({ post: postId, type: "POST" }).distinct("user");
		console.log(distinctUserCount.length);
		if (distinctUserCount.length > 5) {
			const postBanned = await Post.findByIdAndUpdate(postId, { status: "BAN" });
			console.log("Post be banned: ", postBanned);
		}
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