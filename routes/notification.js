import express from 'express';
import { authJWT } from '../middleware/index.js'
import { notificationController } from '../controllers/index.js';

const notificationRouter = express.Router();

notificationRouter.get('/all', authJWT.verifyToken, notificationController.getNotification);

export default notificationRouter;