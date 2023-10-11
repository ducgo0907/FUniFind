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

const report = async (req, res) => {
	const { postId, commentId, userId, description } = req.body;
	try {
		const newReport = await reportRepository.report({postId, commentId, userId, description});
		return res.status(200).json({ message: 'Get data successfully', data: newReport })
	} catch (error) {
		return res.status(500).json({
			message: error.toString()
		})
	}
}

export default {
	all,
	report
}