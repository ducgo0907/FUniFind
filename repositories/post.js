import Post from "../models/Post.js";

const create = async ({ content, userID }) => {
	try {
		const newPost = (await Post.create({ content, user: userID })).populate('user', 'name');
		return newPost;
	} catch (error) {
		throw new Error(error);
	}
}

const edit = async ({ content, postID, userID }) => {
	try {
		const post = await Post.findById(postID);
		if (!post) {
			throw new Error('Post is not existed!!');
		}
		if (post.user.toString() !== userID) {
			throw new Error('Only user who creat post that can edit post');
		}
		post.content = content;
		await post.save();
	} catch (error) {
		throw new Error(error);
	}
}

const getAllPosts = async () => {
	// lay tat ca post
	const listAllPost = await Post.find()
		.populate({
			path: 'user',
			select: 'name'
		})
		.populate({
			path: 'comments',
			populate: {
				path: 'user'
			}
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
			throw new Error('Post is not existed!!');
		}
		if (post.user.toString() !== userID) {
			throw new Error('Only user who creat post that can delete post');
		}
		await post.deleteOne();
	} catch (error) {
		throw new Error(error);
	}
}

// Actions wirk DB: ...

export default {
	create,
	edit,
	deletePost,
	getAllPosts
};