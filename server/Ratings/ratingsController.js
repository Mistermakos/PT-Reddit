import session from "express-session";

export const getAllRatingsController = async () => {
  try {
    const data = await getAllRatingsView();
  } catch (err) {
    throw err;
  }
};

export const addRatingController = async () => {
  try {
    const response = await addRatingView();
  } catch (err) {
    throw err;
  }
};
