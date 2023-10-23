import mongoose, { ObjectId, Schema } from "mongoose";

const Read = mongoose.model("Read", new Schema(
	{
		id: ObjectId,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
		}
	},
	{
		timestamps: true
	}
))

export default Read;