import { refresh } from "../config/config.js";
import config from '../config/config.js'
import Config from "../models/Config.js";
const refreshConfig = async (req, res) => {
	try {
		await refresh();
		res.status(200).send('Configuration refreshed');
	} catch (error) {
		res.status(500).send('Error refreshing configuration');
	}
}

const createConfig = async (req, res) => {
	const { name, value, description } = req.body;
	try {
		const newConfig = await Config.create({ name, value, description });
		await refresh();
		res.status(200).json({ newConfig });
	} catch (error) {
		res.status(500).json({ error: error });
	}
}

const updateConfig = async (req, res) => {
	const { id, value, description } = req.body;
	try {
		const editConfig = await Config.findById(id);
		if (!editConfig) {
			return res.status(401).json({ message: "This config is not existed!!" });
		}
		editConfig.value = value;
		if (description && description !== "")
			editConfig.description = description;
		await editConfig.save();
		await refresh();
		return res.status(200).json({ message: "Update successfully", data: editConfig });
	} catch (error) {
		res.status(500).json({ error: error });
	}
}

const listConfig = async (req, res) => {
	try {
		return res.status(200).json({ data: config });
	} catch (error) {
		res.status(500).json({ error: error });
	}
}

export default {
	refreshConfig,
	createConfig,
	updateConfig,
	listConfig
}