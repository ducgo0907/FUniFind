import express from 'express';
import { messageController } from '../controllers/index.js';
import { authJWT, verifySignIn} from '../middleware/index.js'

const messageRouter = express.Router();

messageRouter.get('/all', [authJWT.verifyToken],messageController.getAllMessage);
messageRouter.post('/save', [authJWT.verifyToken, verifySignIn.checkEmailFPTMessage], messageController.saveMessage);

export default messageRouter;