import Config from "../models/Config.js";

// config.js
let configData = {};

async function fetchConfigurationFromDatabase() {
	// Fetch configuration data from MongoDB
	// Update the `configData` variable
	// Handle any errors that may occur during the fetch
	const config = await Config.find();
	config.forEach(config => {
		configData[config.name] = config.value;
	})
}

async function refreshFromDatabase() {
	await fetchConfigurationFromDatabase();
}

export async function initialize() {
	await fetchConfigurationFromDatabase();
}

export function get() {
	return configData;
}

export default configData;

export { refreshFromDatabase as refresh };
