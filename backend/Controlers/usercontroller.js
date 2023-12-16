import sha512 from "js-sha512";

export const getUser = async (query, user) => 
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

export const addUser = async (req,res) => 
{
    try
    {
        if(req.session.user !== undefined)
        {
            const r =  await getUser("login", req.body.login) // checks if user exists
            if(r.length != 0){res.redirect("/panel"); return 0;} // returns him to panel if not (if not logged in panel will redirect to main page)
            const [re] = await (global.db).query("INSERT INTO users(id,login,password) VALUES (NULL, ?, ?);", [req.body.login, sha512(req.body.password)]);
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

export const editUser = async (req,res) => 
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
        else{res.redirect('/');}
    }
    catch(err)
    {
        res.redirect('/login');
    }
}

export const deleteUser = (req,res) => 
{
    try
    {
        if(req.session.user !== undefined)
        {
            const re = (global.db).query("delete from users where id = ?", [req.body.id]);
            res.redirect('/panel');
        }
        else{res.redirect('/');}
    }
    catch(err)
    {
        res.redirect('/');
    }
}


