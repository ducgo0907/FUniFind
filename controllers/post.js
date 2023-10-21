import { validationResult } from "express-validator";
import { postRepository } from "../repositories/index.js";
import post from "../repositories/post.js";
import multiparty from 'multiparty'
import { v2 as cloudinary } from 'cloudinary'
import Image from "../models/Image.js";

const create = async (req, res) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return res.status(400).json({ message: error.array()[0].msg });
	}

	// Destructuring Request Object of Post
	const { content, location } = req.body;
	const userID = req.userID;
	try {
		// Call action cua Repository (DAO)
		const newPost = await postRepository.create({ content, userID, location });
		return res.status(201).json({
			message: "Create post successfully",
			data: newPost,
		});
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
};

const edit = async (req, res) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return res.status(400).json({ message: error.array()[0].msg });
	}

	// Destructuring Request Object of Post
	const { content, postID, location } = req.body;
	const userID = req.userID;
	try {
		// Call action cua Repository (DAO)
		await postRepository.edit({ content, postID, userID, location });
		return res.status(201).json({ message: "Edit post successfully." });
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
};

const deletePost = async (req, res) => {
	const { postID } = req.query;
	const userID = req.userID;
	try {
		await postRepository.deletePost({ postID, userID });
		return res.status(201).json({ message: "Delete post successfully." });
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
};

const getAllPosts = async (req, res) => {
	try {
		const listAllPosts = await postRepository.getAllPosts();
		return res.status(201).json(listAllPosts);
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
};

const approve = async (req, res) => {
	const { postID, isApprove } = req.body;
	try {
		const postAction = await postRepository.approve({ postID, isApprove });
		return res.status(200).json({
			message: "Action successfully!",
			data: postAction,
		});
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
};

const getListPending = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const size = parseInt(req.query.size) || 5;
	const searchString = req.query.searchString || '';

	const query = {
		content: { $regex: searchString, $options: 'i' }
	};
	query.status = "PENDING"

	const startIndex = (page - 1) * size;
	try {
		const listPostPending = await postRepository.getListPending(startIndex, size, query);
		return res.status(200).json(listPostPending);
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
};

const getPostDetails = async (req, res) => {
	const { id } = req.params;
	try {
		const postDetail = await postRepository.getPostDetail(id);
		return res.status(200).json({
			message: "Get detail post successfully",
			data: postDetail,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.toString(),
		});
	}
};

const upload = async (req, res) => {
	const urls = [];
	const form = new multiparty.Form({ maxFieldsSize: "20MB" });
	form.parse(req, async function (err, fields, files) {
		const options = {
			use_filename: true,
			unique_filename: false,
			overwrite: true,
			folder: "/test",
		};
		const { postId } = fields;
		console.log(postId);
		const filesData = fields.file;
		for (let i = 0; i < filesData.length; i++) {
			const imagePath = filesData[i];
			try {
				const result = await cloudinary.uploader.upload(imagePath, options);
				urls.push(result.secure_url);

				if (i === filesData.length - 1 && !!result.secure_url) {
					return res.status(200).json({ data: urls });
				}
			} catch (error) {
				console.error(error);
				return res.status(400);
			}
		}
	});
}

const getListPost = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const size = parseInt(req.query.size) || 5;
	const searchString = req.query.searchString || '';
	const location = req.query.location || '';
	const query = {
		content: { $regex: searchString, $options: 'i' },
	};
	query.status = "APPROVED"
	if(location !== ''){
		query.location = {$regex: location, $options: 'i'};
	}
	const startIndex = (page - 1) * size;
	try {
		const listPosts = await postRepository.getListPost(startIndex, size, query);
		return res.status(201).json(listPosts);
	} catch (error) {
		return res.status(500).json({ message: error.toString() });
	}
}

const banPost = async (req, res) => {
	const { postID } = req.body;
	const userID = req.userID;
	try {
		await postRepository.banPost({ postID, userID });
		return res.status(201).json({ message: "Ban post successfully." });
	} catch (error) {
		return res.status(400).json({ message: error.toString() });
	}
}

export default {
	create,
	edit,
	getAllPosts,
	deletePost,
	approve,
	getListPending,
	getPostDetails,
	upload,
	getListPost,
	banPost
}

