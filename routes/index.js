import postRouter from "./post.js";
import userRouter from "./user.js";
import commentRouter from "./comment.js";
import express from "express";
import messageRouter from "./message.js";
import interactionRouter from "./interaction.js";
import reportRouter from "./Report.js";
import imageRouter from "./image.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);
router.use("/messages", messageRouter);
router.use("/interactions", interactionRouter);
router.use("/reports", reportRouter);
router.use("/images", imageRouter);

export default router;
