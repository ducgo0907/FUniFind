import Comment from "../models/Comment.js";
import Notification from "../models/Notification.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

const create = async ({ content, userID, location }) => {
	try {
		const newPost = (await Post.create({ content, user: userID, location })).populate(
			"user",
			"name"
		);
		return newPost;
	} catch (error) {
		throw new Error(error);
	}
};

const edit = async ({ content, postID, userID, location }) => {
	try {
		const post = await Post.findById(postID);
		if (!post) {
			throw new Error("Post is not existed!!");
		}
		if (post.user.toString() !== userID) {
			throw new Error("Only user who creat post that can edit post");
		}
		post.content = content;
		post.location = location ? location : post.location;
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

const getListPending = async (startIndex, size, query) => {
	try {
		const listPostPending = await Post.find(query).skip(startIndex).limit(size)
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
		const totalPost = await Post.countDocuments(query);
		if (listPostPending == null) {
			throw new Error("Don't have any post is pending status");
		}
		return {
			listPostPending,
			totalPost
		};
	} catch (error) {
		throw new Error(error);
	}
};

const approve = async ({ postID, isApprove }) => {
	try {
		const post = await Post.findById(postID)
			.populate({
				path: "user",
				select: "name",
			});
		console.log(post);
		if (!post) {
			return { message: "Post is not existed" };
		}
		console.log(post);
		const status = isApprove ? "APPROVED" : "REJECTED";
		post.status = status;
		await post.save();
		const notification = `Admin ${status} your post!`;
		await Notification.create({ user: post.user._id, content: notification });
		return post;
	} catch (error) {
		throw new Error(error);
	}
};

const getPostDetail = async (postID) => {
	try {
		return await Post.find({ _id: postID })
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
	console.log(startIndex, size, query);
	const listPost = await Post.find(query).skip(startIndex).limit(size).sort({ createdAt: -1 })
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
		});
	const totalPost = await Post.countDocuments(query);

	if (!listPost || listPost.length <= 0) {
		throw new Error("Don't have any post!");
	}
	return {
		data: listPost,
		totalPost
	};
}

const banPost = async ({ postID, userID }) => {
	try {
		const post = await Post.findById(postID);
		const user = await User.findById(userID);
		console.log(postID, user);
		if (!post) {
			throw new Error("Post is not existed!!");
		}
		if (!user.isAdmin) {
			throw new Error("Only admin can ban post");
		}
		post.status = "BAN";
		await post.save();
		return post;
	} catch (error) {
		throw new Error(error);
	}
}

export default {
	create,
	edit,
	deletePost,
	getAllPosts,
	getListPending,
	approve,
	getPostDetail,
	getListPost,
	banPost
};
