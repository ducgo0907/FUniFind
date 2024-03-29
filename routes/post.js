import express from "express";
import { body } from "express-validator";
import { postController } from "../controllers/index.js";
import { authJWT } from "../middleware/index.js";

const postRouter = express.Router();

postRouter.post(
	"/create",
	body("content")
		.isLength({ min: 1 })
		.withMessage("Content must be not empty!"),
	authJWT.verifyToken,
	postController.create
);

postRouter.put(
	"/edit",
	body("content")
		.isLength({ min: 1 })
		.withMessage("Content must be not empty!"),
	authJWT.verifyToken,
	postController.edit
);

postRouter.get("/all", postController.getAllPosts);

postRouter.delete("/delete", [authJWT.verifyToken], postController.deletePost);

postRouter.post(
	"/approve",
	[authJWT.verifyToken, authJWT.isAdmin],
	postController.approve
);

postRouter.get(
	"/listPending",
	[authJWT.verifyToken, authJWT.isAdmin],
	postController.getListPending
);

postRouter.post("/upload", postController.upload);

postRouter.get("/list", postController.getListPost);

postRouter.get("/listBan",
	[authJWT.verifyToken, authJWT.isAdmin],
	postController.getListPostBan);

postRouter.get(
	"/:id",
	postController.getPostDetails
);

postRouter.put("/ban", [authJWT.verifyToken, authJWT.isAdmin], postController.banPost);
postRouter.put("/unban", [authJWT.verifyToken, authJWT.isAdmin], postController.unBanPost);
export default postRouter;
