import express from "express";
import { getAllPagesView, getOnePageView, addOnePageView, updateOnePageView, deleteOnePageView } from "./pagesView";

export const getAllPagesController = async (req, res) => {
  try {
    const data = await getAllPagesView(req, res);
    return data;
  } catch (err) {
    throw err;
  }
};

export const getOnePageController = async (req, res) => {
  try {
    const data = await getOnePageView(req, res);
    return data;
  } catch (err) {
    throw err;
  }
};

export const addOnePageController = async (req, res) => {
  try {
    const responseFromServer = await addOnePageView(req, res);
    return responseFromServer;
  } catch (err) {
    throw err;
  }
};

export const updateOnePageController = async (req, res) => {
  try {
    const responseFromServer = await updateOnePageView(req, res);
    return responseFromServer;
  } catch (err) {
    throw err;
  }
};

export const deleteOnePageController = async (req, res) => {
  try {
    const responseFromServer = await deleteOnePageView(req, res);
    return responseFromServer;
  } catch (err) {
    throw err;
  }
};
