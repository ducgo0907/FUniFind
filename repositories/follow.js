import Follow from "../models/Follow.js";


const getListUserFollow = async (userId, startIndex, size) => {
	try {
		const listUserFollowing = await Follow.find({ followerUser: userId }).skip(startIndex).limit(size);
		if (!listUserFollowing) {
			throw new Error("You are following anyone");
		}
		const totalFollowing = await Follow.countDocuments({ followerUser: userId });
		return {
			data: listUserFollowing,
			totalFollowing
		};
	} catch (error) {
		throw new Error(error);
	}
}

const follow = async (userId, userFollowId) => {
	try {
		const existedFollow = await Follow.findOne({ followerUser: userId, followingUser: userFollowId });

		if (existedFollow) {
			await existedFollow.deleteOne();
			return "unfollow";
		}

		const newFollow = await Follow.create({ followerUser: userId, followingUser: userFollowId });
		return newFollow;
	} catch (error) {
		throw new Error(error);
	}
}
export default {
	getListUserFollow,
	follow
}