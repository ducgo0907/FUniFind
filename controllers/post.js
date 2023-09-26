import { validationResult } from "express-validator"
import { postRepository } from "../repositories/index.js";

const create = async (req, res) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return res.status(400).json({ error: error.array() });
	}

	// Destructuring Request Object of Post
	const { content } = req.body;
	const userID = req.userID;
	try {
		// Call action cua Repository (DAO)
		const newPost = await postRepository.create({ content, userID })
		return res.status(201).json({
			message: 'Create post successfully',
			data: newPost
		})
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
}

const edit = async (req, res) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return res.status(400).json({ error: error.array() });
	}

	// Destructuring Request Object of Post
	const { content, postID } = req.body;
	const userID = req.userID;
	try {
		// Call action cua Repository (DAO)
		await postRepository.edit({ content, postID, userID })
		return res.status(201).json({ message: 'Edit post successfully.' });
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
}

const deletePost = async (req, res) => {
	const { postID } = req.query;
	const userID = req.userID;
	try {
		await postRepository.deletePost({ postID, userID });
		return res.status(201).json({ message: 'Delete post successfully.' });
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
}

const getAllPosts = async (req, res) => {
	try {
		const listAllPosts = await postRepository.getAllPosts();
		return res.status(201).json(listAllPosts);
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}

}

export default {
	create,
	edit,
	getAllPosts,
	deletePost
}