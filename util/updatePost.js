import Post from "../models/Post.js";
import moment from "moment-timezone"

const checkPostNew = async () => {
	// const serverTimezone = 'Etc/GMT+0';
	const currentUtcTime = moment().utc();
	const twelveHoursAgoUtc = currentUtcTime.clone().subtract(12, 'hours');

	try {
		const postsToCheck = await Post.find({ new: true, createdAt: { $lte: twelveHoursAgoUtc.toDate() } });

		// Update the 'new' field for the posts that need to be marked as 'false'
		const updatePromises = postsToCheck.map(async (post) => {
			post.new = false;
			return post.save();
		});

		await Promise.all(updatePromises);

		console.log("Posts checked and updated");
	} catch (error) {
		console.error("Erorr: ", error);
	}
}

export {
	checkPostNew
}