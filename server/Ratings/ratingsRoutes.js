import { Router } from "express";
import {
  getAllRatingsController,
  addRatingController,
} from "./ratingsController";

const ratingRouter = Router();

ratingRouter.route("/").post(addRatingController);
ratingRouter.route("/id").get(getAllRatingsController);

export default ratingRouter;
