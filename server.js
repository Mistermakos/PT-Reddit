import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import mysql from "mysql2/promise";
import app from "./server/app.js";

const conn = await mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USR,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

global.db = conn;

app.listen(process.env.SERVER_PORT, (req, res) => {
  console.log("Everything is working");
});
