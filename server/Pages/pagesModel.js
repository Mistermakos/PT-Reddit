export const getAllpagesModel = async () => {
  try {
    var [rows, fields] = await global.db.query(
      "select * from sites order by creation_date"
    );
    return rows;
  } catch (err) {
    throw err;
  }
};

export const getOnePageModel = async (siteId) => {
  try {
    // Gets id, title, icon, description, link, id of author, date (when was added) and rating for the page
    const [rows, fields] = await global.db.query(
      "select *, (select Avg(rate) from ratings where site_id = ? ) as `rating` from sites where id = ?",
      [siteId, siteId]
    );
    return rows;
  } catch (err) {
    throw err;
  }
};

export const addOnePageModel = async (
  file,
  link,
  title,
  description,
  user,
  currentDate
) => {
  try {
    const [re] = await global.db.query(
      "INSERT INTO sites VALUES (NULL, ?, ?, ?, ?, ?, ?);",
      [file, link, title, description, user, currentDate]
    );
    return 1;
  } catch (err) {
    throw err;
  }
};

export const updateOnePageModel = async (
  link,
  title,
  description,
  authorId,
  id
) => {
  try {
    const [re] = await global.db.query(
      "update sites set link = ?, title, description, author_id where id = ?",
      [link, title, description, authorId, id]
    );
    return 1;
  } catch (err) {
    throw err;
  }
};

export const deleteOnePageModel = async (id) => {
  try {
    const [response] = await global.db.query(
      "delete from ratings where site_id = ?",
      [parseInt(id)]
    );
    const [re] = await global.db.query("delete from sites where id = ?", [
      parseInt(id),
    ]);
    return 1;
  } catch (err) {
    throw err;
  }
};
