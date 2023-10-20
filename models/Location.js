import mongoose, { ObjectId, Schema } from "mongoose";

const Location = mongoose.model("Location", new Schema(
	{
		id: ObjectId,
		name: {
			type: String,
			require: true,
		}

	},
	{
		timestamps: true
	}
))

export default Location;