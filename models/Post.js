import mongoose, { ObjectId, Schema } from "mongoose";

const Post = mongoose.model("Post", new Schema(
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
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			}
		]
	},
	{
		timestamps: true
	}
))

export default Post;