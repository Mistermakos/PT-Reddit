import express from "express"
import * as pages from "../Controlers/pagescontroler.js"
const router = express.Router()

router.route("/Pages")
  .get(pages.getAllPages)
  .post(pages.addPage)

export default router