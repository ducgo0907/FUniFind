import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

const create = async ({ content, userID }) => {
	try {
		const newPost = (await Post.create({ content, user: userID })).populate(
			"user",
			"name"
		);
		return newPost;
	} catch (error) {
		throw new Error(error);
	}
};

const edit = async ({ content, postID, userID }) => {
	try {
		const post = await Post.findById(postID);
		if (!post) {
			throw new Error("Post is not existed!!");
		}
		if (post.user.toString() !== userID) {
			throw new Error("Only user who creat post that can edit post");
		}
		post.content = content;
		await post.save();
	} catch (error) {
		throw new Error(error);
	}
};

const getAllPosts = async () => {
	// lay tat ca post
	const listAllPost = await Post.find({ status: "APPROVED" })
		.populate({
			path: 'user',
			select: 'name'
		})
		.populate({
			path: 'comments',
			populate: {
				path: 'user',
				select: 'name _id'
			}
		})
		.populate({
			path: 'interactions',
			populate: {
				path: 'user',
				select: 'name _id'
			}
		})
		.populate({
			path: 'images',
			select: 'url post'
		})
		.exec();
	if (listAllPost == null) {
		throw new Error("Don't have any post");
	}
	return listAllPost;
}

const deletePost = async ({ postID, userID }) => {
	try {
		const post = await Post.findById(postID);
		if (!post) {
			throw new Error("Post is not existed!!");
		}
		if (post.user.toString() !== userID) {
			throw new Error("Only user who creat post that can delete post");
		}
		await post.deleteOne();
		await Comment.deleteMany({ post: postID });
	} catch (error) {
		throw new Error(error);
	}
};

const getListPending = async () => {
	try {
		const listPostPending = await Post.find({ status: "PENDING" })
			.populate({
				path: "user",
				select: "name",
			})
			.populate({
				path: "comments",
				populate: {
					path: "user",
					select: "_id name",
				},
			})
			.exec();
		if (listPostPending == null) {
			throw new Error("Don't have any post is pending status");
		}
		return listPostPending;
	} catch (error) {
		throw new Error(error);
	}
};

const approve = async ({ postID, isApprove }) => {
	try {
		const post = await Post.findById(postID);
		if (!post) {
			throw new Error("Post is not existed");
		}
		const status = isApprove ? "APPROVED" : "REJECTED";
		post.status = status;
		await post.save();
		return post;
	} catch (error) {
		throw new Error(error);
	}
};

const getPostDetail = async (postID) => {
	try {
		return await Post.find({ _id: postID, status: "APPROVED" })
			.populate({
				path: "user",
				select: "name",
			})
			.populate({
				path: "comments",
				populate: {
					path: "user",
					select: "_id name",
				},
			})
			.populate({
				path: "images"
			})
			.exec();
	} catch (error) {
		throw new Error(error);
	}
};

const getListPost = async (startIndex, size, query) => {
	const listPost = await Post.find(query).skip(startIndex).limit(size);
	const totalPost = await Post.countDocuments(query);
	
	if (!listPost || listPost.length <= 0) {
		throw new Error("Don't have any post!");
	}
	return {
		data: listPost,
		totalPost
	};
}

export default {
	create,
	edit,
	deletePost,
	getAllPosts,
	getListPending,
	approve,
	getPostDetail,
	getListPost
};
