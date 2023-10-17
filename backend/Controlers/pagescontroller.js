import express from "express";
import * as API from "../../Utilities/APIFeatures.js"

export const getAllPages = async (req,res) => 
{
    try
    {
        let result = [];
        await (req.db).query("SELECT icon,link,title,description,author_id FROM sites", function(error, results)
        {
            result.push(results)
        }) 
        res.status(201).json({
            status:"success",
            data: result
        });
        
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
    console.log(req.body)
    const values = await API.Includes(req.body, ["icon", "link", "title", "description", "author_id"])
    
    if(values = []){
        res.staus(405).json({
            status:"FAIL",
            message:"Add valid data"
    })}
    else // !!! THIS HAS TO BE CHECKED AFTER CREATING USERS GET && POST REQUEST
    {
        let query = 'SELECT id FROM users WHERE id = ?'
        const [rows] = await connection.query(query, [values[(values.length) - 1]])
        console.log(rows)
        if(rows == {})
        {
            res.status(405).json({
                status:"FAIL",
                message:"This user does not exist yet"                
            })
        }
        else{
            query = `Insert into sites (icon, link, title, description, author_id) VALUES( ? , ? , ? , ?, ?)`;
            const [rows] = await connection.query(query, [values[0],values[1],values[2],values[3],values[4]]);
        }
    }
    //console.log(values)
}