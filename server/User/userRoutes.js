import { Router } from "express";
import {
  getAllUsersController,
  addOneUserController,
  getOneUserController,
  updateOneUserController,
  deleteOneUserController,
} from "./userController.js";

export const userRouter = Router();

userRouter
  .route("/")
  .get(await getAllUsersController)
  .post(await addOneUserController);
userRouter
  .route("/:id")
  .get(await getOneUserController)
  .put(await updateOneUserController)
  .delete(await deleteOneUserController);
