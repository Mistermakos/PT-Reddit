import express from "express";
import * as API from "../../Utilities/APIFeatures.js";
import { getUser, addUser } from "./usercontroller.js";
import fs from "fs/promises";

// const APIReturn_success = (
//   res,
//   rows,
//   image_array // For sending successfull responses
// ) => {
//   res.status(201).json({
//     status: "success",
//     length: rows.length,
//     data: rows,
//     images: image_array,
//   });
// };

// const APIReturn_fail = (
//   res,
//   err //For sending unsuccessfull responses
// ) => {
//   res.status(401).json({
//     status: "fail",
//     message: "something went wrong: " + err.message, // May be change, although User might want to send what happend to him/her.
//   });
// };

// const getImages = async (
//   rows // Creates array of images from icon, because i had a problem with changing icon for every record
// ) => {
//   try {
//     let image_array = [];
//     rows.forEach((element) => {
//       // loops through every record and changes buffer into image string
//       image_array.push(element.icon.toString("base64"));
//     });
//     return image_array;
//   } catch (err) {
//     return "something went wrong";
//   }
// };

export const getAllPagesController = async () => {
  try {
    const data = await getAllPagesView();
    return data;
  } catch (err) {
    //ERROR
  }
};

export const getOnePageController = async () => {
  const data = await getOnePageView();
  return data;
};

export const addOnePageController = async (req, res) => {
  try {
    const response = await addOnePageView();
  } catch (err) {
    throw err;
  }
};

export const deleteOnePageController = async (req, res) => {
  try {
    const response = await deleteOnePageView();
  } catch (err) {
    throw err;
  }
};

export const updatePage = async () => {
  try {
    const response = await updateOnePageView();
  } catch (err) {
    throw err;
  }
};
