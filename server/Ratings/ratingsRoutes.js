import { Router } from "express";
import {
  getAllRatingsController,
  addRatingController,
} from "./ratingsController.js";

export const ratingsRouter = Router();

ratingsRouter.route("/").post(addRatingController);
ratingsRouter.route("/id").get(getAllRatingsController);
