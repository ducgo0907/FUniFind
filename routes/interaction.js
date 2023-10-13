import express from 'express';
import { interactionController } from '../controllers/index.js';
import { authJWT } from '../middleware/index.js'

const interactionRouter = express.Router();

interactionRouter.post('/interact', [authJWT.verifyToken], interactionController.interact)

export default interactionRouter;