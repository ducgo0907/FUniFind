import express from "express";
import { body } from "express-validator";
import { userController } from "../controllers/index.js";
import { verifySignIn, authJWT } from "../middleware/index.js";

const userRouter = express.Router();

userRouter.post("/register",
	body("email").isEmail().withMessage('Email invalid format!'),
	body("password").isLength({ min: 8 }).withMessage('Password must be greater than or equal 8'),
	verifySignIn.checkEmailFPT,
	userController.register
);

userRouter.get("/", [authJWT.verifyToken, authJWT.isAdmin], userController.getAllUser);

userRouter.post("/login", verifySignIn.checkEmailFPT, userController.login);

userRouter.get("/activate", userController.activateAccount);

userRouter.get("/:id", userController.getUserById);

userRouter.put("/changeActive", [authJWT.verifyToken, authJWT.isAdmin], userController.changeActiveUser);

userRouter.put("/setAdmin", [authJWT.verifyToken, authJWT.isAdmin], userController.setAdmin);

userRouter.put("/edit", [
	body("password").isLength({ min: 8 }).withMessage('Password must be greater than or equal 8'),
	authJWT.verifyToken
], userController.edit);

export default userRouter;