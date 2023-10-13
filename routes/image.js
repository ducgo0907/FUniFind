import express from 'express';
import { imageController } from '../controllers/index.js';
import { authJWT } from '../middleware/index.js'

const imageRouter = express.Router();

imageRouter.post('/upload', imageController.upload)

export default imageRouter;