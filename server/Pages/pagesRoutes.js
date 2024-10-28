import { Router } from "express";
import { getAllPagesController, getOnePageController, addOnePageController, updateOnePageController, deleteOnePageController } from "./pagesController";

const pagesRouter = Router();

pagesRouter.route("/").get(getAllPagesController).post(addOnePageController);
pagesRouter
  .route("/id")
  .get(getOnePageController)
  .update(updateOnePageController)
  .delete(deleteOnePageController);

export default pagesRouter;
