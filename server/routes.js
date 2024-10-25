import userRoutes from "./User/userRoutes"
import ratingsRoutes from "./Ratings/ratingsRoutes"
import pagesRouter from "./Pages/pagesRoutes"
import { Router } from "express"

const router = Router();

router.use(pagesRouter);
router.use(ratingsRoutes);
router.use(userRoutes);

export default router;