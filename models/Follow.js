import mongoose, { ObjectId, Schema } from "mongoose";

const Follow = mongoose.model("Follow", new Schema(
	{
		id: ObjectId,
		userFollowed: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		userFollow: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
))

export default Follow;