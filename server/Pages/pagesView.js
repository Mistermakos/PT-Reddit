import { deleteOnePageModel } from "./pagesModel";

export const getAllPagesView = async () => {
  try {
    const data = await getAllpagesModel();
    return data;
  } catch (err) {}
};

export const getOnePageView = async () => {
  try {
    const data = await getOnePageModel;
    return data;
  } catch (err) {}
};

export const addOnePageView = async () => {
  if (req.session.user !== undefined) {
    const body = req.body;
    const plik = req.file.buffer;
    const link = body.link;
    const tytul = body.tytul;
    const opis = body.opis;
    let user = req.session.user; // id has form of: "1id" where 1 is s/u, s = super user, u = normal user and id has id
    user = user.replace(/\D/g, "");
    const curDate = new Date();

    const responseFromDatabase = await addOnePageModel();

    res.redirect("/panel"); // sending back to panel page
    return 0;
  } else {
    res.redirect("/login");
  } // if not loged in,
};

export const deleteOnePageView = async () => {
  try {
    if (req.session.user !== undefined) {
      const responseFromDatabase = await deleteOnePageModel();

      res.redirect("/panel");
      return 0;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    res.redirect("/");
  }
};
