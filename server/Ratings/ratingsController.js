import { getAllRatingsView, addRatingView } from "./ratingsView.js";

export const getAllRatingsController = async (req, res) => {
  try {
    const data = await getAllRatingsView(req, res);
    return data;
  } catch (err) {
    throw err;
  }
};

export const addRatingController = async (req, res) => {
  try {
    const responseFromServer = await addRatingView(req, res);
    return responseFromServer;
  } catch (err) {
    throw err;
  }
};
