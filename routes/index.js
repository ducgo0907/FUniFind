import postRouter from "./post.js";
import userRouter from "./user.js";
import commentRouter from "./comment.js";
import express from "express";
import messageRouter from "./message.js";
import interactionRouter from "./interaction.js";
import reportRouter from "./report.js";
import imageRouter from "./image.js";
import followRouter from "./follow.js";
import locationRouter from "./location.js";
import notificationRouter from "./notification.js";
import configRouter from "./config.js";
import readRouter from "./read.js";


const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);
router.use("/messages", messageRouter);
router.use("/interactions", interactionRouter);
router.use("/reports", reportRouter);
router.use("/images", imageRouter);
router.use("/follows", followRouter)
router.use("/locations", locationRouter);
router.use("/notifications", notificationRouter);
router.use("/config", configRouter);
router.use("/read", readRouter)

export default router;
