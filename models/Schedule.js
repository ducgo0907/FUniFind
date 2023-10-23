import mongoose, { ObjectId, Schema } from "mongoose";

const Schedule = mongoose.model("Schedule", new Schema(
	{
		id: ObjectId,
		cronExpression: {
			type: String,
			require: true
		}
	},
	{
		timestamps: true
	}
))

export default Schedule;

