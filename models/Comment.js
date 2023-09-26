	import mongoose, { ObjectId, Schema } from "mongoose";

	const Comment = mongoose.model("Comment", new Schema(
		{
			id: ObjectId,
			content: {
				type: String,
				require: true
			},
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			},
			post: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Post'
			}
		},
		{
			timestamps: true
		}
	))

	export default Comment;