import express from "express"

const IndexRouter = express.Router()

IndexRouter.route("/").get((req,res) => {})

export default IndexRouter