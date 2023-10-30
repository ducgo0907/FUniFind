import Interaction from "../models/Interaction.js";
import Post from "../models/Post.js";

// const interact = async ({ typeInteract, userID, postID }) => {
// 	try {
// 		const existedInteraction = await Interaction.findOne({ user: userID, post: postID });
// 		if (existedInteraction && typeInteract === existedInteraction._doc.type) {
// 			existedInteraction.deleteOne();
// 			return {
// 				...existedInteraction._doc,
// 				action: 'undo'
// 			};
// 		}
// 		if(existedInteraction && typeInteract !== existedInteraction._doc.type){
// 			existedInteraction.type = typeInteract;
// 			existedInteraction.save();
// 			return {
// 				...existedInteraction._doc,
// 				action: 'change'
// 			};
// 		}
// 		const newInteraction = await Interaction.create({ type: typeInteract, user: userID, post: postID });
// 		// Update new comment to post's comments array
// 		await Post.findByIdAndUpdate(postID, { $push: { interactions: newInteraction._id } });

// 		const newInteractionWithUser = await newInteraction.populate({
// 			path: 'user',
// 			select: 'name _id'
// 		});
// 		return { ...newInteractionWithUser._doc, action: 'do' };
// 	} catch (error) {
// 		throw new Error(error);
// 	}
// }

const like = async ({ userID, postID }) => {
	try {
		const existedInteraction = await Interaction.findOne({ user: userID, post: postID });
		if (existedInteraction) {
			return "User already liked!";
		}
		const newInteraction = await Interaction.create({ type: "LIKE", user: userID, post: postID });
		// Update new comment to post's comments array
		await Post.findByIdAndUpdate(postID, { $push: { interactions: newInteraction._id } });

		const newInteractionWithUser = await newInteraction.populate({
			path: 'user',
			select: 'name _id'
		});
		return { ...newInteractionWithUser._doc };
	} catch (error) {
		throw new Error(error);
	}
}

const dislike = async ({ userID, postID }) => {
	try {
		const existedInteraction = await Interaction.findOne({ user: userID, post: postID });
		if (!existedInteraction) {
			return "User already unlike!";
		}
		// Update new comment to post's comments array
		await Post.findByIdAndUpdate(postID, { $pull: { interactions: existedInteraction._id } });

		const newInteractionWithUser = await existedInteraction.populate({
			path: 'user',
			select: 'name _id'
		});
		await existedInteraction.deleteOne();
		return { ...newInteractionWithUser._doc };
	} catch (error) {
		throw new Error(error);
	}
}

export default {
	// interact
	like,
	dislike
}