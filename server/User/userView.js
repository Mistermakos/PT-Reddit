import sha512 from "js-sha512";
import { deleteOneUserModel } from "./userModel";

export const getAllUsersViewUserView = async () => {
  try {
    const que = await getAllUsersModel();
  } catch (err) {
    throw err;
  }
};
export const getOneUserView = async () => {
  try {
    const que = await getOneUserModel();
    return que;
  } catch (err) {
    throw err;
  }
};
export const addOneUserView = async () => {
  try {
    if (req.session.user !== undefined) {
      const r = await getUser("login", req.body.login); // checks if user exists (by login)
      if (r.length != 0) {
        res.redirect("/panel");
        return 0;
      } // returns him to panel if not (if not logged in panel will redirect to main page)

      const responseFromDatabase = await addOneUserModel();
      res.redirect("/panel");
      return 0;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    throw err;
  }
};
export const updateOneUserView = async () => {
  try {
    if (req.session.user !== undefined) {
      const body = req.body;
      const login = body.login;
      const password = body.password;
      const id = body.id;

      const responseFromDatabase = await updateOneUserModel();
      res.redirect("/panel");
      return 0;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    throw err;
  }
};
export const deleteOneUserView = async (req, res) => {
  try {
    if (req.session.user !== undefined) {
      const user = parseInt(req.body.id);
      const responseFromDatabase = await deleteOneUserModel(user);
      res.redirect("/panel");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    throw err;
  }
};
