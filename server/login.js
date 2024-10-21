import sha512 from "js-sha512";
import path from "path";
import * as users from "./Controlers/usercontroller.js";

const dirname = path.resolve();

export const checkLogin = async (req, res) => {
  try {
    const tab = await users.getUser("login", req.body.login);
    if (tab.length != 0) {
      const [rows, fields] = await global.db.query(
        `select id, login, password from users where login = ? && password = ?`,
        [req.body.login, sha512(req.body.password)]
      );

      if (rows.length != 0) {
        const [rows_2, fields_2] = await global.db.query(
          `select user_id from super_users where user_id = ?`,
          [rows[0].id]
        );

        if (rows_2.length != 0) {
          req.session.user = "s" + rows_2[0].user_id;
        } else {
          req.session.user = "u" + rows[0].id;
        }

        res.redirect("/panel");
      } else {
        res.redirect("/login");
      } // bad
    } else {
      res.redirect("/login");
    } // bad
  } catch (err) {
    res.redirect("/");
  }
};

export const logout = async (req, res) => {
  try {
    req.session.user = undefined;
    res.redirect("/");
  } catch (err) {
    res.redirect("/"); // Will not log out
  }
};

export default checkLogin;
