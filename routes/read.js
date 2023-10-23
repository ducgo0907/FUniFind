import express from 'express';
import { readController } from '../controllers/index.js';
import { authJWT } from '../middleware/index.js';

const readRouter = express.Router();

readRouter.post('/create', [authJWT.verifyToken, authJWT.isAdmin], readController.read);

export default readRouter;