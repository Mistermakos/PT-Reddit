export const getAllRatingsController = async () => {
  try {
    const data = await getAllRatingsModel();
    return data;
  } catch (err) {
    throw err;
  }
};

export const addRatingController = async () => {
  try {
    if (req.session.user !== undefined) {
      let User = req.session.user;
      User = User.replace(/\D/g, "");
      const body = req.query;
      const Page = body.pageId;
      const Rating = body.rating;
      if (rows.length == 0) {
        const responseFromDatabase = await addRatingModel();
      }
    }
    return "";
  } catch (err) {
    throw err;
  }
};
