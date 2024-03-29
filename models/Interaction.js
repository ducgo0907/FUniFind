import mongoose, { ObjectId, Schema } from "mongoose";

const Interaction = mongoose.model("Interaction", new Schema(
	{
		id: ObjectId,
		type: {
			type: String,
			enum: ['LIKE', 'HAHA', "DISLIKE", "NONE"],
			default: 'NONE'
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

export default Interaction;