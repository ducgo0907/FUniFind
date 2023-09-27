import mongoose, { ObjectId, Schema } from "mongoose";

const Report = mongoose.model("Report", new Schema(
	{
		id: ObjectId,
		description: {
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
		},
		comment: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	},
	{
		timestamps: true
	}
))

export default Report;

