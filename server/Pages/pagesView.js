export const getAllPagesView = async () => {
  try {
    const data = await getAllpagesModel();
    return data;
  } catch (err) {
  }
};
