import mongoose, { ObjectId, Schema } from "mongoose";

const FPTAdress = mongoose.model("FPTAdress", new Schema(
	{
		address: {
			type: String,
			require: true
		}
	},
	{
		timestamps: true
	}
))

export default FPTAdress;