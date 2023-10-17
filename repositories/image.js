import Image from "../models/Image.js";
import Post from "../models/Post.js";
import Profile from "../models/Profile.js";
import User from "../models/User.js";

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

const addProfile = async ({ url, userID }) => {
	try {
		const newProfile = await Profile.create({ url, user: userID });
		// Update new image to user's profile array
		await User.findByIdAndUpdate(userID, { $push: { profiles: {id: newProfile._id, url: newProfile.url} } });
		return newProfile;
	} catch (error) {
		throw new Error(error);
	}
}

export default {
	create,
	addProfile
};