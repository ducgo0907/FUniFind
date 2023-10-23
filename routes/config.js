import express from 'express';
import { configController } from '../controllers/index.js';
import { authJWT } from '../middleware/index.js'

const configRouter = express.Router();

configRouter.use(authJWT.verifyToken, authJWT.isAdmin);

configRouter.post('/refresh', configController.refreshConfig);
configRouter.get("/all", configController.listConfig);
configRouter.post("/create", configController.createConfig);
configRouter.put("/edit", configController.updateConfig);


export default configRouter;