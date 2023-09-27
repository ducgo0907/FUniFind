import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

const create = async ({ content, userID, postID }) => {
	try {
		const newComment = await Comment.create({ content, user: userID, post: postID });
		// Update new comment to post's comments array
		await Post.findByIdAndUpdate(postID, { $push: { comments: newComment._id } });
		const newCommentWithUser = await newComment.populate({
			path: 'user',
			select: 'name email'
		});
		return newCommentWithUser;
	} catch (error) {
		throw new Error(error);
	}
}

const edit = async ({ content, postID, userID }) => {

}

const deleteComment = async ({ commentID, userID }) => {
	try {
		const comment = await Comment.findById(commentID);
		if (!comment) {
			throw new Error('Comment is not existed!!');
		}
		if (comment.user.toString() !== userID) {
			throw new Error('Only user who creat post that can delete post');
		}
		await comment.deleteOne();
		return comment;
	} catch (error) {
		throw new Error(error);
	}

}
// Actions wirk DB: ...

export default {
	create,
	edit,
	deleteComment
};