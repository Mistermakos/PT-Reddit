import express from "express";
import * as API from "../../Utilities/APIFeatures.js"
import { getUser } from "./usercontroller.js";

export const getAllPages = async (req,res) => 
{
    try
    {
       const [rows,fields] = await (global.db).execute("select * from sites");
       console.log(rows);
       res.status(201).json({
            status:"success",
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
        }
    }
    //console.log(values)
}