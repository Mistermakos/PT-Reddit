import dotenv from 'dotenv'
dotenv.config({path:"./config.env"})
import mysql from 'mysql'
import app from "./backend/app.js"

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ptreddit"
});

global.db = conn;

app.listen(process.env.SERVER_PORT, (req,res) => 
{
    console.log("Everything is working");
})

conn.end()