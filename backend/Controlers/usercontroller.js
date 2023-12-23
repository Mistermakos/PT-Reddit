import sha512 from "js-sha512";

export const getUser = async (query, user) => // gets if there is user like that, may be searched by name of id
{
    try
    {
        // query <- "id" || "name" user (obj) must consist of thing we want to check (so user.id or user.name)
        const [rows,fields] =  await (global.db).query(`select 0=0 from users where ${query} = ?`, user);
        return rows;
    }
    catch(err)
    {
        return "Couldn't take user"
    }
}

export const addUser = async (req,res) => // Adds user
{
    try
    {
        if(req.session.user !== undefined)
        {
            const r =  await getUser("login", req.body.login) // checks if user exists (by login)
            if(r.length != 0){res.redirect("/panel"); return 0;} // returns him to panel if not (if not logged in panel will redirect to main page)
            const [re] = await (global.db).query("INSERT INTO users(id,login,password) VALUES (NULL, ?, ?);", [req.body.login, sha512(req.body.password)]);
            res.redirect('/panel');
            return 0;
        }
        else{res.redirect('/login');}
    }
    catch(err){res.redirect('/');}
}

export const editUser = async (req,res) => // Edits user
{
    try
    {
        if(req.session.user !== undefined)
        {
            const body = req.body;
            const login = body.login;
            const password = body.password;
            const id = body.id;

            const [re] = await (global.db).query("update users set login = ?, password = ? where id = ?", [login, sha512(password), id]);
            res.redirect('/panel');
            return 0;
        }
        else{res.redirect('/login');}}
    catch(err){res.redirect('/');}
}

export const deleteUser = (req,res) => //Deletes user, pages they added and rating they added
{
    try
    {
        if(req.session.user !== undefined)
        {
            const user =parseInt(req.body.id)
            const del = (global.db).query("delete from super_users where user_id = ?", user)
            const rows = (global.db).query("delete from ratings where user_id = ?;", user)
            const rows2  = (global.db).query("delete from sites where author_id = ?;", user)
            const rows3  = (global.db).query("delete from users where id = ?;", user)
            res.redirect('/panel');
        }
        else{res.redirect('/login');}
    }
    catch(err){ throw err;
        res.redirect('/');}
}


