import express from 'express';
import { reportController } from '../controllers/index.js';
import { authJWT } from '../middleware/index.js';

const reportRouter = express.Router();

reportRouter.get('/all', [authJWT.verifyToken, authJWT.isAdmin], reportController.all);
reportRouter.post('/reportComment', [authJWT.verifyToken], reportController.reportComment);
reportRouter.post('/reportPost', [authJWT.verifyToken], reportController.reportPost)

export default reportRouter;