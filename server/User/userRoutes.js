import { Router } from "express";
import { getAllUsersController } from "./usersController";

const UsersRouter = Router();

UsersRouter.route("/").get(getAllUsersController).post(addUserController);
UsersRouter
  .route("/id")
  .get(getOneUserController)
  .update(updateUserController)
  .delete(deleteController);

export default userRouter;
