import express from "express"
import * as Pages from "../Controlers/pagescontroller.js"
import * as Rating from "../Controlers/ratingscontroller.js"
const router = express.Router()

//Routes for API

router.route("/Pages")
  .get(await Pages.getAllPages)
  .post(Pages.addPage)
router.route("/Pages:id")
  .get(await Pages.getOnePage)
router.route("/SearchByAuthor")
  .get(await Pages.getByAuthor)
router.route("/SearchByTitle")
  .get(await Pages.getByTitle)
router.route("/SearchByLink")
  .get(await Pages.getByLink)
router.route("/AddRating")
  .post(await Rating.addRating)
router.route("/getRating")
  .get(await Rating.getRating)
  
export default router