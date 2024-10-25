import { Router } from "express";
import { getAllPagesController } from "./pagesController";

const pagesRouter = Router();

pagesRouter
  .route("/Page")
  .get(getAllPagesController)
  .post(addPageController)
pagesRouter
  .route("/Page/id")
  .get(getOnePageController)
  .update(updatePageController)
  .delete(deletePageController);

export default pagesRouter;
