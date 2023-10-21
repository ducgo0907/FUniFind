import { validationResult } from "express-validator";
import { locationRepository } from "../repositories/index.js";

const create = async (req, res) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return res.status(400).json({ message: error.array()[0].msg });
	}

	const { name } = req.body;
	try {
		const newLocation = await locationRepository.create({ name });
		return res.status(200).json(newLocation);
	} catch (error) {
		return res.status(500).json({ error: error.toString() });
	}
}

const edit = async (req, res) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return res.status(400).json({ message: error.array()[0].msg });
	}
	const { id, name } = req.body;
	try {
		const editLocation = await locationRepository.edit({ id, name });
		return res.status(200).json(editLocation);
	} catch (error) {
		return res.status(500).json({ error: error.toString() });
	}
}

const deleteLocation = async (req, res) => {
	const { id } = req.params;
	try {
		const deleteLocation = await locationRepository.deleteLocation({ id });
		return res.status(200).json(deleteLocation);
	} catch (error) {
		return res.status(500).json({ error: error.toString() })
	}
}

const getAllLocation = async (req, res) => {
	try {
		const listLocation = await locationRepository.getAllLocation();
		return res.status(200).json(listLocation);
	} catch (error) {
		return res.status(500).json({ error: error.toString() })
	}
}

export default {
	create,
	edit,
	deleteLocation,
	getAllLocation
}