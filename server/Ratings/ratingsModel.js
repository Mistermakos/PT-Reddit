export const getAllRatingsModel = async (pageId) => {
  try {
    const [rows, fields] = await global.db.query(
      "select avg(rate) as `avg` from ratings where site_id = ?",
      [parseInt(pageId)]
    );
    return rows;
  } catch (err) {
    throw err;
  }
};

export const addRatingModel = async (User, Page, Rating) => {
  try {
    const result = await global.db.query("INSERT INTO ratings Value(?,?,?);", [
      User,
      Page,
      Rating,
    ]);
    return 1;
  } catch (err) {
    throw err;
  }
};
