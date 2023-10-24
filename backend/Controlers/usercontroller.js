import sha512 from "js-sha512";

export const getUser = async (query, user) => 
{
    try
    {
        // query <- "id" || "name" user (obj) must consist of thing we want to check (so user.id or user.name)
        const [rows,fields] = await (global.db).query(`select 0=0 from users where ${query} = ?`, user);
        return rows;
    }
    catch(err)
    {
        throw err; 
    }
}

export const addUser = async (user) => 
{
    try
    {
        const tab = await getUser("login", user.login) // checking if user exist
        if(tab.length != 0)
        {
            return "User exists"; // does not add duplicated user :)
        }
        //console.log(tab);
        await (global.db).query("INSERT INTO `users`(login, password) VALUES (?,?)", [user.login, sha512(user.password)])
    }
    catch(err)
    {
        throw err;
    }
} 
