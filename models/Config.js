import mongoose, { ObjectId, Schema } from "mongoose";

const Config = mongoose.model("Config", new Schema(
	{
		id: ObjectId,
		name: {
			type: String,
			require: true
		},
		value: {
			type: Number,
			require: true
		},
		description: {
			type: String,
			require: true
		}
	}
))

export default Config;