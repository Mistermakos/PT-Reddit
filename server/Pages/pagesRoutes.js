import { Router } from "express";
import { getAllPagesController } from "./pagesController";

const pagesRouter = Router();

pagesRouter.route("/").get(getAllPagesController).post(addPageController);
pagesRouter
  .route("/id")
  .get(getOnePageController)
  .update(updatePageController)
  .delete(deletePageController);

export default pagesRouter;
