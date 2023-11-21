import path from "path";
import fs from "fs";
const dirname = path.resolve();

let panel = fs.readFileSync(path.join(dirname, '/frontend/subpages/panel.html'),'utf-8')
const super_access = ['Super User Panel', '<form action="/addUser" method="POST"></form>'] // Page that super user will have
const user_access = ['User Panel'] // Page that user will have

const addPage = `<form action="/addPage" method="POST">
<h3>Add Page:</h3>
<p>Give icon: <input name='plik' type="file"/></p>
<p>Link: <input name='link' type="text"/></p>
<p>Title: <input name='tytul' type="text"/></p>
<p>Opis: <input name='opis' type='text'/><br><input type="submit"/></p>
</form>`

let editPage = `<form action="/editPage" method="POST">
<h3>edit Page:</h3>
<select name='id'>[%selectOptions%]</select>
<p>Give icon: <input type="file"/></p>
<p>Link: <input type="text"/></p>
<p>Title: <input type="text"/><br><input type="submit"/></p>
<p><input type="submit"/></p>
</form>`
            
let deletePage = `<form action="/deletePage" method="POST">
<h3>Delete Page:</h3>
<select name='id'>[%selectOptions%]</select>
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
            

            const userId =  req.session.user.substr(-1);
            const [rows,fields] = await (global.db).query("select * from sites where author_id = ?", userId);
            console.log(rows)

            let options = ""
            rows.forEach(element => {
                options += `<option value='${element.id}'>${element.id} ${element.title}</option>` 
            });

            deletePage = deletePage.replace('[%selectOptions%]', options + `<div style='display:none'>[%selectOptions%]</div>`)
            editPage = editPage.replace('[%selectOptions%]', options)

            if(req.session.user[0]=="s") // checking if user is super user
            {
                panel = panel.replace("[%body%]", `${addUser} [%body%]`)
            }   
            
            panel = panel.replace("[%body%]", `${addPage} ${editPage} ${deletePage}`)

            res.send(panel)
        }
        else // If sombody not logged in wanted to go to path /panel, he/she will be redirected
        {
            res.redirect('/');
        }
    }
    catch(err){throw err;res.redirect('/login');} // id any error occures
}

export default getPanel;