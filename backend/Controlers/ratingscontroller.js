import session from "express-session";

export const addRating = async (req,res) => 
{
    try
    {
        if(req.session.user !== undefined)
        {
            let User = req.session.user;
            User =  User.replace(/\D/g, "");
            const body = req.query;
            const Page = body.pageId;
            const Rating = body.rating;
            const [rows, fields] = await (global.db).query("select * from ratings where user_id = ? && site_id = ?", [User, Page]) 
            if(rows.length == 0)
            {
                const result = await (global.db).query("INSERT INTO ratings Value(?,?,?);", [User, Page, Rating]) 
            }
        } 
        return "lol"
    }
    catch(err){return "Could not add rating"}
}

export const getRating = async (req,res) => 
{
    try
    {
        const [rows,fields] = await (global.db).query("select avg(rate) as `avg` from ratings where site_id = ?", [parseInt(req.query.id)])
        res.status(201).json({
            status:"success",
            rating: rows
        });
    }
    catch(err)
    {
        res.status(401).json({
            status:"fail",
            message: "something went wrong: " + err.message
        })
    }
}