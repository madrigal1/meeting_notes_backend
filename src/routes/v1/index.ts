import express from "express";
import userRoutes from "./User";
import meetingRoutes from './Meeting';

const router = express.Router();

router.use("/user", userRoutes);
router.use("/meeting", meetingRoutes);

export default router;


