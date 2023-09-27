import express from 'express';
import { body } from 'express-validator';
import { authJWT } from '../middleware/index.js';
import { commentController } from '../controllers/index.js';

const commentRouter = express.Router();

commentRouter.post(
	'/create',
	body("content").isLength({ min: 1 }).withMessage("Comment must be not empty!"),
	authJWT.verifyToken,
	commentController.create
);

commentRouter.put(
	'/edit',
	body("content").isLength({ min: 1 }).withMessage("Comment must be not empty!"),
	authJWT.verifyToken,
	commentController.edit
);

commentRouter.delete('/delete', [authJWT.verifyToken],
	commentController.deleteComment
);


export default commentRouter;