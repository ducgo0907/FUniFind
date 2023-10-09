import mongoose, { ObjectId, Schema } from "mongoose";

const Post = mongoose.model("Post", new Schema(
	{
		id: ObjectId,
		content: {
			type: String,
			require: true
		},
		status: {
			type: String,
			enum: ['PENDING', 'APPROVED', "REJECTED"],
			default: 'PENDING'
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
		],
		interactions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Interaction',
			}
		],
		images: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Image',
			}
		]
	},
	{
		timestamps: true
	}
))

export default Post;