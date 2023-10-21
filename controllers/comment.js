import { validationResult } from "express-validator"
import { commentRepository } from "../repositories/index.js";

const create = async (req, res) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return res.status(400).json({ message: error.array()[0].msg });
	}

	// Destructuring Request Object of Post
	const { content, postID } = req.body;
	const userID = req.userID;
	try {
		// Call action cua Repository (DAO)
		const newComment = await commentRepository.create({ content, userID, postID })
		return res.status(201).json({
			message: 'Create comment successfully',
			data: newComment
		})
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
}

const edit = async (req, res) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return res.status(400).json({ message: error.array()[0].msg });
	}

	// Destructuring Request Object of Post
	const { content, commentID } = req.body;
	const userID = req.userID;
	try {
		await commentRepository.edit({ content, commentID, userID })
		return res.status(201).json({ message: 'Edit comment successfully.' });
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
}

const deleteComment = async (req, res) => {
	const { commentID } = req.query;
	const userID = req.userID;
	try {
		const commentDelete = await commentRepository.deleteComment({ commentID, userID });
		return res.status(201).json({
			message: 'Delete comment successfully.',
			data: commentDelete
		});
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
}

const getAllComment = async (req, res) => {
	try {
		// const listAllPosts = await postRepository.getAllPosts();
		return res.status(201).json(listAllPosts);
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}

}

export default {
	create,
	edit,
	getAllComment,
	deleteComment
}