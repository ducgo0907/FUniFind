import mongoose, { ObjectId, Schema } from "mongoose";

const Profile = mongoose.model("Profile", new Schema(
	{
		id: ObjectId,
		url: {
			type: String,
			require: true,
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

export default Profile;