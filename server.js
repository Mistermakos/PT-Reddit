import dotenv from 'dotenv'
dotenv.config({path:"./config.env"})
import mysql from "mysql"
import app from "./backend/app.js"

var connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "ptreddit",
});



app.listen(process.env.SERVER_PORT, (req,res) => 
{
    console.log("Everything is working");
})

connection.end();