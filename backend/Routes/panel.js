import path from "path";
import fs from "fs";
const dirname = path.resolve();

let panel = fs.readFileSync(path.join(dirname, '/frontend/subpages/panel.html'),'utf-8')
const super_access = ['Super User Panel', '<form action="/addUser" method="POST"></form>'] // Page that super user will have
const user_access = ['User Panel'] // Page that user will have

const addPage = `<form action="/addPage" method="POST">
<h3>Add Page:</h3>
<p>Give icon: <input type="file"/></p>
<p>Link: <input type="text"/></p>
<p>Title: <input type="text"/><br><input type="submit"/></p>
</form>`

const deletePage = `<form action="/deletePage" method="POST">
<h3>Delete Page:</h3>
<select>[%selectOptions%]</select>
<p><input type="submit"/></p>
</form>`


const addUser = `<form action="/addUser" method="POST">
<h3>Add User:</h3>
<p>Login: <input type="text" name="login"/></p>
<p>Password: <input type="password" name="password"/></p>
<p><input type="submit"/></p>
</form>`


const getPanel = async (req,res) => 
{
    try{
        if(req.session.user !== undefined)
        {
            const userID =  req.session.user.substr(-1);
            // const [rows,fields] = await (global.db).query("select * from websites where id = ?", userId);
            // console.log(rows)
            

            if(req.session.user[0]=="s") // checking if user is super user
            {
                panel = panel.replace("[%body%]", `${addUser} [%body%]`)
            }   
            
            panel = panel.replace("[%body%]", `${addPage}`)

            res.send(panel)
        }
        else // If sombody not logged in wanted to go to path /panel, he/she will be redirected
        {
            res.redirect('/');
        }
    }
    catch(err){res.redirect('/login');} // id any error occures
}

export default getPanel;