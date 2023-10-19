import express from "express"
import path from "path"
const SubpagesRouter = express.Router()

const dirname = path.resolve();

SubpagesRouter.route("")
  .get((req,res) => res.sendFile(path.join(dirname, '/frontend/subpages/index.html')));
SubpagesRouter.route("/login")
  .get((req,res) => res.sendFile(path.join(dirname, '/frontend/subpages/login.html')));
SubpagesRouter.route("/site_details")
  .get((req,res) => res.sendFile(path.join(dirname, '/frontend/subpages/site_details.html')));
  

export default SubpagesRouter