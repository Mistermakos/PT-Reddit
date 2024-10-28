import { Router } from "express";
import {
  getAllUsersController,
  addOneUserController,
  getOneUserController,
  updateOneUserController,
  deleteOneController,
} from "./usersController";

const userRouter = Router();

userRouter.route("/").get(getAllUsersController).post(addOneUserController);
userRouter
  .route("/id")
  .get(getOneUserController)
  .update(updateOneUserController)
  .delete(deleteOneController);

export default userRouter;
