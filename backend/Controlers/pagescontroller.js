import express from "express";
import * as API from "../../Utilities/APIFeatures.js"
import { getUser , addUser} from "./usercontroller.js";
import fs from 'fs/promises'

const APIReturn_success = (res, rows, image_array) => // For sending successfull responses
{
    res.status(201).json({
        status:"success",
        length: rows.length,
        data: rows,
        images: image_array
    });
}

const APIReturn_fail = (res, err) => //For sending unsuccessfull responses
{
    res.status(401).json({
        status:"fail",
        message: "something went wrong: " + err.message // May be change, although User might want to send what happend to him/her.
    }) 
}

const getImages = async (rows) => // Creates array of images from icon, because i had a problem with changing icon for every record
{
    try
    {
        let image_array = []
        rows.forEach(element => { // loops through every record and changes buffer into image string
            image_array.push(element.icon.toString('base64'))
        });
        return image_array;
    }
    catch(err){return "something went wrong";}
}

export const getAllPages = async (req,res) => // For index page (When using a lot of data, you might want to use offset and limit)
{
    try
    {
        var [rows,fields] = await (global.db).query("select * from sites order by creation_date"); // Might be ordered by Rating/Creation date. Up to you
        var image_array = await getImages(rows); // Gets array of images      

        APIReturn_success(res, rows, image_array);
    }
    catch(err){APIReturn_fail(res, err);}
}

export const getOnePage = async (req,res) => // For site_details page, gets specific values
{
    try
    {
        
        const id = (req.params.id).replace(":","") // For learning how to use : id on pages
        // might be replaced with simple query, but you would have to change it in routes file 

        // Gets id, title, icon, description, link, id of author, date (when was added) and rating for the page
        const [rows,fields] = await (global.db).query("select *, (select Avg(rate) from ratings where site_id = ? ) as `rating` from sites where id = ?", [id,id]);
        const image_array = await getImages(rows); // gets image

        APIReturn_success(res, rows, image_array);
    }
    catch(err){APIReturn_fail(res, err);}
}

export const getByAuthor = async (req,res) => // For filtering data by author
{
    try
    {
        const author = "%" + req.query.param + "%"
        const [rows,fields] = await (global.db).query("SELECT * FROM `sites` WHERE `author_id` in (select id from users where login like ?) order by creation_date", author);
        const image_array = await getImages(rows)

        APIReturn_success(res, rows, image_array);
    }
    catch(err){APIReturn_fail(res, err);}
}

export const getByTitle = async (req,res) => // For filtering data by title
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

export const getByLink = async (req,res) => // For filtering data by link
{
    try
    {
        let Value = req.query.param;
        Value = "%" + Value + "%"
        const [rows,fields] = await (global.db).query("SELECT * FROM `sites` WHERE link like ? order by creation_date", [Value]);
        const image_array = await getImages(rows);

        APIReturn_success(res, rows, image_array);
    }
    catch(err){APIReturn_fail(res, err);}
}

export const addPage = async (req,res) => { // Ading page into database
        try
        {
            if(req.session.user !== undefined)
            {
                const body = req.body;
                const plik =  req.file.buffer;
                const link = body.link;
                const tytul = body.tytul;
                const opis = body.opis;
                let user =  req.session.user // id has form of: "1id" where 1 is s/u, s = super user, u = normal user and id has id
                user = user.replace(/\D/g, "");
                const curDate = new Date();
                const [re] = await (global.db).query("INSERT INTO sites VALUES (NULL, ?, ?, ?, ?, ?, ?);", [plik, link, tytul, opis, user, curDate]);
                res.redirect("/panel") // sending back to panel page
                return 0;
            }
            else{res.redirect('/login');} // if not loged in, 
        }
        catch(err){
            throw err;
            res.redirect('/');}
}

export const deletePage = async (req,res) => // deleting page
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
        else{res.redirect('/login');}
    }
    catch(err){res.redirect('/');}
}

export const updatePage = async (req,res) => // Updating page
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
        else{res.redirect('/login');}
    }
    catch(err){res.redirect('/');}
}