import express from 'express';
import { followController } from '../controllers/index.js';
import authJWT from '../middleware/authJWT.js';

const followRouter = express.Router();

followRouter.use(authJWT.verifyToken);

followRouter.get('/:userId', followController.getListUserFollow)
followRouter.post('/follow', followController.follow)


export default followRouter;