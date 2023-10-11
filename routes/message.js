import express from 'express';
import { messageController } from '../controllers/index.js';
import { authJWT } from '../middleware/index.js'

const messageRouter = express.Router();

messageRouter.get('/all', messageController.getAllMessage);
messageRouter.post('/save', [authJWT.verifyToken], messageController.saveMessage);

export default messageRouter;