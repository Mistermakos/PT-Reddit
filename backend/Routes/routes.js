import express from "express"
import * as pages from "../Controlers/pagescontroller.js"
import * as users from "../Controlers/usercontroller.js"
const router = express.Router()

router.route("/Pages")
  .get(pages.getAllPages)
  .post(pages.addPage)

export default router