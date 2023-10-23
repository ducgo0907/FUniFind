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
			enum: ['PENDING', 'APPROVED', "REJECTED", "BAN"],
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
		],
		location: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Location',
		},
		approvedAt: {
			type: Date,
			require: false
		},
		refuseReason: {
			type: String,
			require: false
		},
		new: {
			type: Boolean,
			default: true
		}
	},
	{
		timestamps: true
	}
))

export default Post;