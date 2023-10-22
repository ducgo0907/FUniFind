import express from 'express';
import { locationController } from '../controllers/index.js';
import { authJWT } from '../middleware/index.js'
import { body } from "express-validator";

const locationRouter = express.Router();

locationRouter.get("/all", locationController.getAllLocation);

locationRouter.post('/create',
	[body("name").isLength({ min: 2 }).withMessage("Name of location must be greater than 2"),
	authJWT.verifyToken,
	authJWT.isAdmin],
	locationController.create);

locationRouter.put('/edit', [
	body("name").isLength({ min: 2 }).withMessage("Name of location must be greater than 2"),
	authJWT.verifyToken,
	authJWT.isAdmin],
	locationController.edit);
locationRouter.delete('/delete/:id', [authJWT.verifyToken, authJWT.isAdmin], locationController.deleteLocation);

locationRouter.get("/detail/:id", locationController.getDetail);

export default locationRouter;