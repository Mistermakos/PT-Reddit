export const getAllpagesModel = async () => {
  try {
    var [rows, fields] = await global.db.query(
      "select * from sites order by creation_date"
    ); // Might be ordered by Rating/Creation date. Up to you
    var image_array = await getImages(rows); // Gets array of images
    return [rows, image_array];
  } catch (err) {}
};

export const getOnePageModel = async () => {
  try {
    // Gets id, title, icon, description, link, id of author, date (when was added) and rating for the page
    const [rows, fields] = await global.db.query(
      "select *, (select Avg(rate) from ratings where site_id = ? ) as `rating` from sites where id = ?",
      [id, id]
    );
    const image_array = await getImages(rows); // gets image
    returns[(rows, image_array)];
  } catch (err) {}
};

export const addOnePageModel = async () => {
  try {
    const [re] = await global.db.query(
      "INSERT INTO sites VALUES (NULL, ?, ?, ?, ?, ?, ?);",
      [plik, link, tytul, opis, user, curDate]
    );
    return re;
  } catch (err) {
    console.log(err);
    return "issue";
  }
};

export const deleteOnePageModel = async () => {
  try {
    const [response] = await global.db.query(
      "delete from ratings where site_id = ?",
      [parseInt(req.body.id)]
    );
    const [re] = await global.db.query("delete from sites where id = ?", [
      parseInt(req.body.id),
    ]);
  } catch (err) {
    throw err;
  }
};
