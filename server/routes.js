import { userRouter } from "./User/userRoutes.js";
import { ratingsRouter } from "./Ratings/ratingsRoutes.js";
import { pagesRouter } from "./Pages/pagesRoutes.js";
import { Router } from "express";

export const router = Router();

router.use("/Pages", pagesRouter);
router.use("/Ratings", ratingsRouter);
router.use("/Users", userRouter);