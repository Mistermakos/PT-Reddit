import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import { router } from "./routes.js";

const app = express();

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(
//   session({
//     secret: "user", // code
//     resave: false,
//     saveUninitialized: true,
//   })
// );

app.use("/api/v1", router);

export default app;
