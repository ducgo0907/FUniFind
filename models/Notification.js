import mongoose, { ObjectId, Schema } from "mongoose";
import { stringify } from "uuid";

const Notification = mongoose.model("Notification", new Schema(
	{
		id: ObjectId,
		content: {
			type: String,
			require: true
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

export default Notification;