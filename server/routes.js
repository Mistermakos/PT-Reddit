import { userRouter } from "./User/userRoutes.js";
import { ratingsRouter } from "./Ratings/ratingsRoutes.js";
import { pagesRouter } from "./Pages/pagesRoutes.js";
import { Router } from "express";

export const router = Router();

router.route("/Pages", pagesRouter);
router.route("/Ratings", ratingsRouter);
router.route("/Users", userRouter);