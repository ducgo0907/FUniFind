import express from 'express';
import { interactionController } from '../controllers/index.js';
import { authJWT } from '../middleware/index.js'

const interactionRouter = express.Router();

interactionRouter.post('/like', [authJWT.verifyToken], interactionController.interact);
interactionRouter.delete('/dislike', [authJWT.verifyToken], interactionController.dislike);

export default interactionRouter;