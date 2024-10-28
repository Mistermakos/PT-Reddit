const insertUserQuery =
  "INSERT INTO users(id,login,password) VALUES (NULL, ?, ?);";

export const getAllUserModel = async () => {
  try {
    const [rows, fields] = await global.db.query(`select * from users where`);
    return rows;
  } catch (err) {
    throw err;
  }
};
export const getOneUserModel = async () => {
  try {
    const [rows, fields] = await global.db.query(
      `select 0=0 from users where ${query} = ?`,
      user
    );
    return rows;
  } catch (err) {
    throw err;
  }
};
export const addOneUserModel = async () => {
  try {
    const [re] = await global.db.query(insertUserQuery, [
      req.body.login,
      sha512(req.body.password),
    ]);
  } catch (err) {
    throw err;
  }
};
export const updateOneUserModel = async () => {
  try {
    const [re] = await global.db.query(
      "update users set login = ?, password = ? where id = ?",
      [login, sha512(password), id]
    );
    return re;
  } catch (err) {
    throw err;
  }
};
export const deleteOneUserModel = async (user) => {
  try {
    const del = global.db.query(
      "delete from super_users where user_id = ?",
      user
    );
    const rows = global.db.query(
      "delete from ratings where user_id = ?;",
      user
    );
    const rows2 = global.db.query(
      "delete from sites where author_id = ?;",
      user
    );
    const rows3 = global.db.query("delete from users where id = ?;", user);
    return "gut";
  } catch (err) {
    throw err;
  }
};
