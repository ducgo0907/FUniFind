import express from 'express';
import { body } from 'express-validator';
import { postController } from '../controllers/index.js';
import { authJWT } from '../middleware/index.js';

const postRouter = express.Router();

postRouter.post(
	'/create',
	body("content").isLength({ min: 1 }).withMessage("Content must be not empty!"),
	authJWT.verifyToken,
	postController.create
);

postRouter.put(
	'/edit',
	body("content").isLength({ min: 1 }).withMessage("Content must be not empty!"),
	authJWT.verifyToken,
	postController.edit
);

postRouter.get('/all', postController.getAllPosts);

postRouter.delete('/delete', [authJWT.verifyToken], postController.deletePost);

postRouter.post('/approve', [authJWT.verifyToken, authJWT.isAdmin], postController.approve);

postRouter.get('/listApprove', [authJWT.verifyToken, authJWT.isAdmin], postController.getListPending);

postRouter.post("/upload", postController.upload);

export default postRouter;