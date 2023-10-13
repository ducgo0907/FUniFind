import { reportRepository } from "../repositories/index.js";

const all = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const size = parseInt(req.query.size) || 5;
	const startIndex = (page - 1) * size;
	try {
		const listReport = await reportRepository.all(startIndex, size);
		return res.status(200).json({ message: 'Get data successfully', data: listReport })
	} catch (error) {
		return res.status(500).json({
			message: error.toString()
		})
	}
}

const reportPost = async (req, res) => {
	const { postId, description } = req.body;
	const userId = req.userID;
	try {
		const newReport = await reportRepository.reportPost({ postId, userId, description });
		return res.status(200).json({ message: 'Post Reported', data: newReport })
	} catch (error) {
		return res.status(500).json({
			message: error.toString()
		})
	}
}

const reportComment = async (req, res) => {
	const { commentId, description } = req.body;
	const userId = req.userID;
	try {
		const newReport = await reportRepository.reportComment({ commentId, userId, description });
		return res.status(200).json({ message: 'Comment Reported', data: newReport })
	} catch (error) {
		return res.status(500).json({
			message: error.toString()
		})
	}
}

const getReportComment = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const size = parseInt(req.query.size) || 5;
	const startIndex = (page - 1) * size;
	const searchString = req.query.searchString || '';
	const query = {
		description: { $regex: searchString, $options: 'i' }
	};
	query.type = "COMMENT";
	try {
		const listReport = await reportRepository.getReportComment(startIndex, size, query);
		return res.status(200).json({ message: 'Get report comment', data: listReport })
	} catch (error) {
		return res.status(500).json({
			message: error.toString()
		})
	}
}

const getReportPost = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const size = parseInt(req.query.size) || 5;
	const startIndex = (page - 1) * size;
	const searchString = req.query.searchString || '';
	const query = {
		description: { $regex: searchString, $options: 'i' }
	};
	query.type = "POST";
	try {
		const listReport = await reportRepository.getReportPost(startIndex, size, query);
		return res.status(200).json({ message: 'Get report post', data: listReport })
	} catch (error) {
		return res.status(500).json({
			message: error.toString()
		})
	}
}

export default {
	all,
	reportPost,
	reportComment,
	getReportComment,
	getReportPost
}