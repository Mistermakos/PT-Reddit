import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import app from "./app.js";

app.listen(3000, (req, res) => {
  console.log("Everything is working");
});
