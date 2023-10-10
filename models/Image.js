import mongoose, { ObjectId, Schema } from "mongoose";

const Image = mongoose.model("Image", new Schema(
	{
		id: ObjectId,
		url: {
			type: String,
			require: true,
		},
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post'
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		}

	},
	{
		timestamps: true
	}
))

export default Image;