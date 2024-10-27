export const getAllRatingsModel = async () => {
  try {
    const [rows, fields] = await global.db.query(
      "select avg(rate) as `avg` from ratings where site_id = ?",
      [parseInt(req.query.id)]
    );
    return rows;
  } catch (err) {
    throw err;
  }
};

export const addRatingModel = async (params) => {
  try {
    const result = await global.db.query("INSERT INTO ratings Value(?,?,?);", [
      User,
      Page,
      Rating,
    ]);
  } catch (err) {
    throw err;
  }
};
