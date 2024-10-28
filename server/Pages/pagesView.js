import {
  getAllpagesModel,
  getOnePageModel,
  addOnePageModel,
  updateOnePageModel,
  deleteOnePageModel,
} from "./pagesModel";

export const getAllPagesView = async (req, res) => {
  try {
    const data = await getAllpagesModel();
    return data;
  } catch (err) {
    throw err;
  }
};

export const getOnePageView = async (req, res) => {
  try {
    const id = req.body.id;
    const data = await getOnePageModel(id);
    return data;
  } catch (err) {
    throw err;
  }
};

export const addOnePageView = async (req, res) => {
  try {
    const body = req.body;
    const file = req.file.buffer;
    const link = body.link;
    const title = body.title;
    const description = body.description;
    let user = req.session.user;
    user = user.replace(/\D/g, "");
    const curDate = new Date();

    const responseFromDatabase = await addOnePageModel(
      file,
      link,
      title,
      description
    );
    return 1;
  } catch (err) {
    throw err;
  }
};

export const updateOnePageView = async (req, res) => {
  try {
    const body = req.body;
    const link = body.link;
    const title = body.title;
    const description = body.description;
    const authorId = body.authorId;
    const id = body.id;
    const responseFromDatabase = await updateOnePageModel(
      link,
      title,
      description,
      authorId,
      id
    );
    return 1;
  } catch (err) {
    throw err;
  }
};

export const deleteOnePageView = async (req, res) => {
  try {
    const id = req.body.id;
    const responseFromDatabase = await deleteOnePageModel(id);
    return 1;
  } catch (err) {
    throw err;
  }
};
