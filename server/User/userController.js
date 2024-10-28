import express from express;

export const getAllUsersController = async () => {
  try {
    const data = await getAllUsersView();
  } catch (err) {
    throw err;
  }
};

export const getOneUserController = async () => {
  try {
    const data = await getOneUserView();
  } catch (err) {
    throw err;
  }
};

export const addOneUserController = async () => {
  try {
    const data = await addOneUserView();
  } catch (err) {
    throw err;
  }
};

export const updateOneUserController = async () => {
  try {
    const data = await updateOneUserView();
  } catch (err) {
    throw err;
  }
};

export const deleteOneUserController = async () => {
  try {
    const data = await deleteOneUserView();
  } catch (err) {
    throw err;
  }
};