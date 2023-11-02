import express from 'express';
import { authJWT } from '../middleware/index.js'
import { notificationController } from '../controllers/index.js';

const notificationRouter = express.Router();

notificationRouter.get('/list', authJWT.verifyToken, notificationController.getNotification);
notificationRouter.post('/create', authJWT.verifyToken, notificationController.createNotification);
notificationRouter.put('/read', authJWT.verifyToken, notificationController.read)

export default notificationRouter;