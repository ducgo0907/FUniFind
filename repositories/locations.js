import Image from "../models/Image.js";
import Location from "../models/Location.js";
import Post from "../models/Post.js";
import Profile from "../models/Profile.js";
import User from "../models/User.js";

const create = async ({ name }) => {
	try {
		const newLocation = await Location.create({ name });
		return newLocation;
	} catch (error) {
		throw new Error(error);
	}
}

const edit = async ({ id, name }) => {
	try {
		const location = await Location.findById(id);
		if (!location) {
			return { message: "Location is not existed" }
		}
		location.name = name;
		await location.save();
		return location;
	} catch (error) {
		throw new Error(error.toString());
	}
}

const deleteLocation = async ({ id }) => {
	try {
		const location = await Location.findByIdAndDelete(id);
		if (!location) {
			return { message: "Location is not existed" }
		}
		return location;
	} catch (error) {
		throw new Error(error.toString());
	}
}

const getAllLocation = async () => {
	try {
		const listLocation = await Location.find();
		return listLocation;
	} catch (error) {
		throw new Error(error.toString());
	}
}

export default {
	create,
	edit,
	deleteLocation,
	getAllLocation
};