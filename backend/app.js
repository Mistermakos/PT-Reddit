import express from "express"
import IndexRouter from "./Routes/indexrouter.js";

const app = express();
app.use(express.json());

// app.use("/login", LoginRouter)
// app.use("/index", IndexRouter)
// app.use("/site_details",SiteDetalsRouter)
// app.use("/about", AboutRouter)
// app.use("/contact", ContactRouter)

export default app;