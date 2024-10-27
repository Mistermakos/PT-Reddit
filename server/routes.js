import userRoutes from "./User/userRoutes";
import ratingsRoutes from "./Ratings/ratingsRoutes";
import pagesRouter from "./Pages/pagesRoutes";
import { Router } from "express";

const router = Router();

router.route("/Pages", pagesRouter);
router.route("/Ratings", ratingsRoutes);
router.route("/Users", userRoutes);

export default router;
