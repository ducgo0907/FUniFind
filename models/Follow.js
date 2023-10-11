import mongoose, { ObjectId, Schema } from "mongoose";

const Follow = mongoose.model("Follow", new Schema(
	{
		id: ObjectId,
		// List User người dùng theo dõi
		followingUser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		// User Id
		followerUser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
))

export default Follow;