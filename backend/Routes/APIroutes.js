import express from "express"
import * as Pages from "../Controlers/pagescontroller.js"
const router = express.Router()

router.route("/Pages")
  .get(await Pages.getAllPages)
  .post(Pages.addPage)
router.route("/Pages:id")
  .get(Pages.getOnePage)
router.route("/SearchByAuthor")
  .get(Pages.getByAuthor)
router.route("/SearchByTitle")
  .get(Pages.getByTitle)
router.route("/SearchByLink")
  .get(Pages.getByLink)
  
export default router