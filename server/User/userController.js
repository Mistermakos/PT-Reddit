import {
  getAllUsersView,
  getOneUserView,
  addOneUserView,
  updateOneUserView,
  deleteOneUserView,
} from "./userView.js";

export const getAllUsersController = async (req, res) => {
  try {
    const data = await getAllUsersView(req, res);
    return data;
  } catch (err) {
    throw err;
  }
};

export const getOneUserController = async (req, res) => {
  try {
    const data = await getOneUserView(req, res);
    return data;
  } catch (err) {
    throw err;
  }
};

export const addOneUserController = async (req, res) => {
  try {
    const responseFromServer = await addOneUserView(req, res);
    return responseFromServer;
  } catch (err) {
    throw err;
  }
};

export const updateOneUserController = async (req, res) => {
  try {
    const responseFromServer = await updateOneUserView(req, res);
    return responseFromServer;
  } catch (err) {
    throw err;
  }
};

export const deleteOneUserController = async (req, res) => {
  try {
    const responseFromServer = await deleteOneUserView(req, res);
    return responseFromServer;
  } catch (err) {
    throw err;
  }
};
