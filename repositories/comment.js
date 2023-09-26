import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

const create = async ({ content, userID, postID }) => {
	try {
		const newComment = (await Comment.create({ content, user: userID, post: postID })).populate('user');

		// Update new comment to post's comments array
		await Post.findByIdAndUpdate(postID, { $push: { comments: newComment._id } });

		return newComment;
	} catch (error) {
		throw new Error(error);
	}
}

const edit = async ({ content, postID, userID }) => {
	// try {
	// 	const post = await Post.findById(postID);
	// 	if (!post) {
	// 		throw new Error('Post is not existed!!');
	// 	}
	// 	if (post.user.toString() !== userID) {
	// 		throw new Error('Only user who creat post that can edit post');
	// 	}
	// 	post.content = content;
	// 	await post.save();
	// } catch (error) {
	// 	throw new Error(error);
	// }
}
// Actions wirk DB: ...

export default {
	create,
	edit
};