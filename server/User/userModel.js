import { sha512 } from "js-sha512";

export const getAllUsersModel = async () => {
  try {
    const [rows, fields] = await global.db.query(`select * from users`);
    return rows;
  } catch (err) {
    throw err;
  }
};
export const getOneUserModel = async (query, userData) => {
  try {
    const [rows, fields] = await global.db.query(
      `select * from users where ${query} = ?`,
      userData
    );
    return rows;
  } catch (err) {
    throw err;
  }
};
export const addOneUserModel = async (login, password) => {
  try {
    const [re] = await global.db.query('INSERT INTO `users` (login, password) VALUES (?,?)', [
      login,
      sha512(password),
    ]);
    return 1;
  } catch (err) {
    throw err;
  }
};
export const updateOneUserModel = async (login, password, id) => {
  try {
    const [re] = await global.db.query(
      "update users set login = ?, password = ? where id = ?",
      [login, sha512(password), id]
    );
    return 1;
  } catch (err) {
    throw err;
  }
};

export const deleteOneUserModel = async (userId) => {
  try {
    const del = global.db.query(
      "delete from super_users where user_id = ?",
      userId
    );
    const rows = global.db.query(
      "delete from ratings where user_id = ?;",
      userId
    );
    const rows2 = global.db.query(
      "delete from sites where author_id = ?;",
      userId
    );
    const rows3 = global.db.query("delete from users where id = ?;", userId);
    return 1;
  } catch (err) {
    throw err;
  }
};
