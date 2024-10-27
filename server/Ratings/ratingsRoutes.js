import { Router } from "express";
import { getAllRatingsController } from "./ratingsController";

const ratingRouter = Router();

ratingRouter.route("/").post(addRatingController);
ratingRouter.route("/id").get(getAllRatingsController);

export default ratingRouter;
