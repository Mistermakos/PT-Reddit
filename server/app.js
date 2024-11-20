import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import { router } from "./routes.js";
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'mysql',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'PTREDDIT',
});

global.db = connection;

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
