import { getAllRatingsModel, addRatingModel } from "./ratingsModel";

export const getAllRatingsView = async (req, res) => {
  try {
    const pageId = req.body.pageId;
    const data = await getAllRatingsModel(pageId);
    return data;
  } catch (err) {
    throw err;
  }
};

export const addRatingView = async (req, res) => {
  try {
    if (req.session.user !== undefined) {
      let user = req.session.user;
      user = user.replace(/\D/g, "");
      const body = req.query;
      const rage = body.pageId;
      const rating = body.rating;
      const responseFromDatabase = await addRatingModel(user, page, rating);
      return 1;
    }
  } catch (err) {
    throw err;
  }
};
