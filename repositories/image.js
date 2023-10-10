import Image from "../models/Image.js";
import Post from "../models/Post.js";

const create = async ({ url, userID, postID }) => {
	try {
		const newImage = await Image.create({ url, user: userID, post: postID });
		// Update new comment to post's comments array
		await Post.findByIdAndUpdate(postID, { $push: { images: newImage._id } });
		return newImage;
	} catch (error) {
		throw new Error(error);
	}
}

export default {
	create
};