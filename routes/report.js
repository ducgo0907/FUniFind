import express from 'express';
import { reportController } from '../controllers/index.js';
import { authJWT } from '../middleware/index.js';

const reportRouter = express.Router();

reportRouter.get('/all', [authJWT.verifyToken, authJWT.isAdmin], reportController.all);
reportRouter.get('/reportComment', [authJWT.verifyToken, authJWT.isAdmin], reportController.getReportComment);
reportRouter.get('/reportPost', [authJWT.verifyToken, authJWT.isAdmin], reportController.getReportPost);
reportRouter.post('/createReportComment', [authJWT.verifyToken], reportController.reportComment);
reportRouter.post('/createReportPost', [authJWT.verifyToken], reportController.reportPost);


export default reportRouter;