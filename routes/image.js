import express from 'express';
import { imageController } from '../controllers/index.js';
import authJWT from '../middleware/authJWT.js';

const imageRouter = express.Router();

imageRouter.post('/upload', imageController.upload)

export default imageRouter;