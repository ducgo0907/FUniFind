import Post from "../models/Post.js";

const checkPostNew = async () => {
	try {
		const postsToCheck = await Post.find({ new: true, created_at: { $lte: new Date(Date.now() - 12 * 60 * 60 * 1000) } });

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