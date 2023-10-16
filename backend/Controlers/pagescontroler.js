import express from "express";

export const getAllPages = async (req,res) => 
{
    try
    {
        let result = [];
        (req.db).query("SELECT icon,link,title,description,author_id FROM sites", function(error, results)
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

}