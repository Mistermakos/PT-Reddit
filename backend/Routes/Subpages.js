import express from "express"
import path from "path"
import {checkLogin, logout} from "../login.js"
import getPanel from "../Controlers/panel.js"
import * as User from "../Controlers/usercontroller.js"
import * as Page from "../Controlers/pagescontroller.js"
import multer from "multer"
const SubpagesRouter = express.Router()

const dirname = path.resolve();

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

SubpagesRouter.route("")
  .get((req,res) => res.sendFile(path.join(dirname, '/frontend/subpages/index.html')));
SubpagesRouter.route("/login")
  .get((req,res) => res.sendFile(path.join(dirname, '/frontend/subpages/login.html')))
  .post(await checkLogin);
SubpagesRouter.route("/panel")
  .get(await getPanel);
SubpagesRouter.route("/logout")
  .get(await logout);

SubpagesRouter.route("/addUser")
  .post(await User.addUser);
SubpagesRouter.route("/editUser")
  .post(await User.editUser);
SubpagesRouter.route("/deleteUser")
  .post(await User.deleteUser);

  SubpagesRouter.route("/addPage")
  .post(upload.single('plik'), await Page.addPage);
SubpagesRouter.route("/editPage")
  .post(upload.single('plik'), await Page.updatePage)
SubpagesRouter.route("/deletePage")
  .post(await Page.deletePage);

  SubpagesRouter.route("/site_details/")
  .get((req,res) => res.sendFile(path.join(dirname, '/frontend/subpages/site_details.html')))
  

export default SubpagesRouter