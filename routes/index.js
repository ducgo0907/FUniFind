import postRouter from "./post.js";
import userRouter from "./user.js";
import commentRouter from "./comment.js";
import express from "express";

const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);

export default router;
