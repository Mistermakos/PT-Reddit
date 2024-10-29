import { Router } from "express";
import {
  getAllPagesController,
  getOnePageController,
  addOnePageController,
  updateOnePageController,
  deleteOnePageController,
} from "./pagesController.js";

export const pagesRouter = Router();

pagesRouter
  .route("/")
  .get(await getAllPagesController)
  .post(await addOnePageController);
pagesRouter
  .route("/id")
  .get(await getOnePageController)
  .put(await updateOnePageController)
  .delete(await deleteOnePageController);
