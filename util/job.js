import Post from "../models/Post.js";
import moment from "moment-timezone"
import Schedule from "../models/Schedule.js";
import cron from 'node-cron'

const checkPostNew = async () => {
	// const serverTimezone = 'Etc/GMT+0';
	const currentUtcTime = moment().utc();
	const twelveHoursAgoUtc = currentUtcTime.clone().subtract(12, 'hours');

	try {
		const postsToCheck = await Post.find({ new: true, createdAt: { $lte: twelveHoursAgoUtc.toDate() } });

		// Update the 'new' field for the posts that need to be marked as 'false'
		const updatePromises = postsToCheck.map(async (post) => {
			post.new = false;
			return post.save();
		});

		await Promise.all(updatePromises);

		console.log("Posts checked and updated");
	} catch (error) {
		console.error("Erorr: ", error);
	}
}

async function setupDynamicCronJob() {
	try {
		// Query the database to retrieve the cron expression from the schedule
		const schedule = await Schedule.findOne();

		if (!schedule) {
			await Schedule.create({cronExpression: "0 0 8,10,14,20,0 * * 0-6"});
			console.log('No schedule found in the database.');
			return;
		}

		const cronExpression = schedule.cronExpression;

		// Schedule the cron job using the retrieved cron expression
		cron.schedule(cronExpression, async () => {
			console.log('Cron job executed at', new Date().toLocaleString());
			// Your task to be executed on the cron schedule
			// Check post new or not
			await checkPostNew();
		}, {
			scheduled: true,
			timeZone: 'Asia/Ho_Chi_Minh', // Set the desired timezone
		});

		console.log('Cron job scheduled with expression:', cronExpression);
	} catch (error) {
		console.error('Error setting up dynamic cron job:', error);
	}
}

export {
	checkPostNew,
	setupDynamicCronJob
}