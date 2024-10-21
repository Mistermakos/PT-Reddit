import session from "express-session";

export const addRating = async (req, res) => {
  try {
    if (req.session.user !== undefined) {
      // only loged users may add ratings
      let User = req.session.user;
      User = User.replace(/\D/g, "");
      const body = req.query;
      const Page = body.pageId;
      const Rating = body.rating;
      const [rows, fields] = await global.db.query(
        "select * from ratings where user_id = ? && site_id = ?",
        [User, Page]
      );
      if (rows.length == 0) {
        // You may not add more than 1 rating
        const result = await global.db.query(
          "INSERT INTO ratings Value(?,?,?);",
          [User, Page, Rating]
        ); // adds rating
      }
    }
    return "";
  } catch (err) {
    return "Could not add rating";
  } // if error
};

export const getRating = async (
  req,
  res // Gets average rating of site
) => {
  try {
    const [rows, fields] = await global.db.query(
      "select avg(rate) as `avg` from ratings where site_id = ?",
      [parseInt(req.query.id)]
    );
    res.status(201).json({
      status: "success",
      rating: rows,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: "something went wrong: " + err.message,
    });
  }
};
