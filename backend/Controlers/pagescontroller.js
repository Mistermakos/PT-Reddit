import express from "express";
import * as API from "../../Utilities/APIFeatures.js"
import { getUser , addUser} from "./usercontroller.js";

export const getAllPages = async (req,res) => 
{
    try
    {
       const [rows,fields] = await (global.db).execute("select * from sites");
       //console.log(rows);
       res.status(201).json({
            status:"success",
            length: rows.length,
            data: rows
       })
    }
    catch(err)
    {
        res.status(401).json({
                status:"fail",
                message: err.message
        }) 
    }
}

//Aliases when refering to them do /searchby whatever you want and after it add ?(link|author|title)= string you want to add (space = %20, but users have -) 

export const getByAuthor = async (req,res) => 
{
    try
    {
        //console.log(req.query)
        const [rows,fields] = await (global.db).execute("SELECT * FROM `sites` WHERE `author_id` = (select id from users where login = ?)", [req.query.author]);
        res.status(201).json({
            status:"success",
            length: rows.length,
            data: rows
        })
    }
    catch(err)
    {
        res.status(401).json({
                status:"fail",
                message: err.message
        }) 
    }
}

export const getByTitle = async (req,res) => 
{
    try
    {
        //console.log(req.query)
        const [rows,fields] = await (global.db).execute("SELECT * FROM `sites` WHERE title = ?", [req.query.title]);
        res.status(201).json({
            status:"success",
            length: rows.length,
            data: rows
        })
    }
    catch(err)
    {
        res.status(401).json({
                status:"fail",
                message: err.message
        }) 
    }
}

export const getByLink = async (req,res) => 
{
    try
    {
        //console.log(req.query)
        const [rows,fields] = await (global.db).execute("SELECT * FROM `sites` WHERE link = ? ", [req.query.link]);
        res.status(201).json({
            status:"success",
            length: rows.length,
            data: rows
        })
    }
    catch(err)
    {
        res.status(401).json({
                status:"fail",
                message: err.message
        }) 
    }
}

export const addPage = async (req,res) => {
    
    const values = await API.Includes(req.body, ["icon", "link", "title", "description", "author_id"])
    if(values.length == 0){
        res.status(405).json({
            status:"FAIL",
            message:"Add valid data"
    })}
    else // !!! THIS HAS TO BE CHECKED AFTER CREATING USERS GET && POST REQUEST
    {
        const rows = await getUser('id',req.body.id);
        console.log(rows)
        if(rows.length == 0)
        {
            res.status(405).json({
                status:"FAIL",
                message:"This user does not exist yet"                
            })
        }
        else{
            const query = `Insert into sites (icon, link, title, description, author_id) VALUES( ? , ? , ? , ?, ?)`;
            const [rows] = await (global.db).query(query, [values[0],values[1],values[2],values[3],values[4]]);
            res.status(201).json({
                status:"Success",
                message:"Page added successfully"                
            })
        }
    }
    //console.log(values)
}