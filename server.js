import express from 'express';
import * as dotvn from 'dotenv';
import connectDB from './database/database.js';
import router from './routes/index.js';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary';
import { setupDynamicCronJob } from './util/job.js';

const app = express();
app.use(express.json());
const server = http.createServer(app);

// Create socket for realtime chat and comment
const socketIO = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true, // Enable credentials (important for cookies and authentication)
	},
});

app.use(cors({
	origin: 'http://localhost:3000', // Replace with the origin of your frontend
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true, // Enable credentials (if needed)
}))

dotvn.config();

app.get('/', (req, res) => {
	res.send("Hello, welcome to FUniFind website");
})

app.use(router);

const connectedUsers = {};

socketIO.on('connection', (socket) => {
	console.log("User connected,: ", socket.id);
	socket.on('storeUserId', (userId) => {
		connectedUsers[userId] = socket.id;
	})

	socket.on('sendComment', data => {
		socketIO.emit('getComment', { data });
	})

	socket.on('deleteComment', ({ commentId, postId }) => {
		socketIO.emit('deletedComment', { commentId, postId });
	})

	socket.on('privateMessage', ({ sender, receiver, message, userName }) => {
		let receiverSocketId = connectedUsers[receiver];
		if (receiverSocketId) {
			socketIO.to(receiverSocketId).emit('privateMessage', { sender, message, userName });
		}
	})

	socket.on('disconnect', () => {
		console.log('User disconnect: ', socket.id);
	});
})

const port = process.env.PORT || 8080;


//Setting cloudinary for upload image
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
	secure: true,
});

setupDynamicCronJob();

// Listen at port
server.listen(port, async () => {
	await connectDB();
	console.log(`Node API is running on port ${port}`);
})

export { socketIO }