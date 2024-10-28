import sha512 from "js-sha512";
import {
  getAllUsersModel,
  getOneUserModel,
  addOneUserModel,
  updateOneUserModel,
  deleteOneUserModel,
} from "./userModel";

export const getAllUsersView = async (req, res) => {
  try {
    const data = await getAllUsersModel();
    return data;
  } catch (err) {
    throw err;
  }
};
export const getOneUserView = async (req, res) => {
  try {
    const query = req.body.query;
    const user = req.body.userData;
    const data = await getOneUserModel(query, userData);
    return data;
  } catch (err) {
    throw err;
  }
};
export const addOneUserView = async (req, res) => {
  try {
    const login = req.body.login;
    const password = req.body.password;
    const responseFromDatabase = await addOneUserModel(login, password);
    return 1;
  } catch (err) {
    throw err;
  }
};
export const updateOneUserView = async (req, res) => {
  try {
    const body = req.body;
    const login = body.login;
    const password = body.password;
    const id = body.id;
    const responseFromDatabase = await updateOneUserModel(login, password, id);
    return 1;
  } catch (err) {
    throw err;
  }
};
export const deleteOneUserView = async (req, res) => {
  try {
    const user = parseInt(req.body.id);
    const responseFromDatabase = await deleteOneUserModel(user);
    return 1;
  } catch (err) {
    throw err;
  }
};
