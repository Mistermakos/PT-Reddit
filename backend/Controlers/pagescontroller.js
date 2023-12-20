import express from "express";
import * as API from "../../Utilities/APIFeatures.js"
import { getUser , addUser} from "./usercontroller.js";
import fs from 'fs/promises'

const APIReturn_success = (res, rows, image_array) => 
{
    res.status(201).json({
        status:"success",
        length: rows.length,
        data: rows,
        images: image_array
    });
}

const APIReturn_fail = (res, err) => 
{
    res.status(401).json({
        status:"fail",
        message: "something went wrong: " + err.message
    }) 
}

const getImages = async (rows) => 
{
    try
    {
        let image_array = []
        rows.forEach(element => {
            image_array.push(element.icon.toString('base64'))
        });
        return image_array;
    }
    catch(err){return "something went wrong";}
}

export const getAllPages = async (req,res) => 
{
    try
    {
        var [rows,fields] = await (global.db).query("select * from sites order by creation_date");
        var image_array = await getImages(rows);        

        APIReturn_success(res, rows, image_array);
    }
    catch(err){APIReturn_fail(res, err);}
}

export const getOnePage = async (req,res) => 
{
    try
    {
        
        const id = (req.params.id).replace(":","")

        const [rows,fields] = await (global.db).query("select *, (select Avg(rate) from ratings where site_id = ? ) as `rating` from sites where id = ?", [id,id]);
        const image_array = await getImages(rows);

        APIReturn_success(res, rows, image_array);
    }
    catch(err){APIReturn_fail(res, err);}
}

//Aliases when refering to them do /searchby whatever you want and after it add ?(link|author|title)= string you want to add (space = %20, but users have -) 

export const getByAuthor = async (req,res) => 
{
    try
    {
        const [rows,fields] = await (global.db).execute("SELECT * FROM `sites` WHERE `author_id` = (select id from users where login = ?) order by creation_date", [req.query.param]);
        const image_array = await getImages(rows)

        APIReturn_success(res, rows, image_array);
    }
    catch(err){APIReturn_fail(res, err);}
}

export const getByTitle = async (req,res) => 
{
    try
    {
        let Value = req.query.param;
        Value = "%" + Value + "%"
        const [rows,fields] = await (global.db).query(`SELECT * FROM sites WHERE title like ? order by creation_date`, [Value]);
        const image_array = await getImages(rows);
        
        APIReturn_success(res, rows, image_array);
    }
    catch(err){APIReturn_fail(res, err);}
}

export const getByLink = async (req,res) => 
{
    try
    {
        let Value = req.query.param;
        Value = "%" + Value + "%"
        const [rows,fields] = await (global.db).execute("SELECT * FROM `sites` WHERE link like ? order by creation_date", [Value]);
        const image_array = await getImages(rows);

        APIReturn_success(res, rows, image_array);
    }
    catch(err){APIReturn_fail(res, err);}
}

export const addPage = async (req,res) => {
        try
        {
            if(req.session.user !== undefined)
            {
                const body = req.body;
                const plik =  req.file.buffer;
                const link = body.link;
                const tytul = body.tytul;
                const opis = body.opis;
                const user =  req.session.user.substr(-1);
                const curDate = new Date();
                const [re] = await (global.db).query("INSERT INTO sites VALUES (NULL, ?, ?, ?, ?, ?, ?);", [plik, link, tytul, opis, user, curDate]);
                res.redirect("/panel")
                return 0;
            }
            else{res.redirect('/');}
        }
        catch(err)
        {
            res.redirect('/login');
        }
}

export const deletePage = async (req,res) => 
{
    try
    {   
        if(req.session.user !== undefined)
        {
            const [response] = await (global.db).query("delete from ratings where site_id = ?", [parseInt(req.body.id)]);
            const [re] = await (global.db).query("delete from sites where id = ?", [parseInt(req.body.id)]);
            res.redirect('/panel');
            return 0;
        }
        else{res.redirect('/');}
    }
    catch(err)
    {
        throw err;
        res.redirect('/login');
    }
}

export const updatePage = async (req,res) => 
{
    try
    {   
        if(req.session.user !== undefined)
        {
            const body = req.body;
            const icon = req.file.buffer;
            const link = body.link;
            const title = body.tytul;
            const dscription = body.opis;

            const [re] = await (global.db).query("update sites set icon = ?, link = ?, title = ?, description = ? where id = ?", [icon, link, title, dscription, parseInt(req.body.id)]);
            res.redirect('/panel');
            return 0;
        }
        else{res.redirect('/');}
    }
    catch(err)
    {
        res.redirect('/login');
    }
}