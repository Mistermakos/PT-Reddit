import path from "path";
import {promises as fs} from "fs";
const dirname = path.resolve();

const super_access = 'Super User Panel' // Page that super user will have
const user_access = 'User Panel' // Page that user will have

const addPage = `<form action="/addPage" enctype="multipart/form-data" method="POST">
<h3>Add Page:</h3>
<p>Give icon: <input name='plik' type="file" accept=".jpg,.jpeg,.png" id="file1" required/></p>
<p>Link: <input name='link' type="text" required/></p>
<p>Title: <input name='tytul' type="text" required/></p>
<p>Opis: <input name='opis' type='text' required/>
<br>
<input type="submit"/></p>
</form>`


const addUser = `<form action="/addUser" method="POST">
<h3>Add User:</h3>
<p>Login: <input type="text" name="login" required/></p>
<p>Password: <input type="password" name="password" required/></p>
<p><input type="submit" required/></p>
</form>`


const getPanel = async (req,res) => 
{
    try{
        if(req.session.user !== undefined)
        {

            let editPage = `<form action="/editPage" enctype="multipart/form-data" method="POST">
                <h3>edit Page:</h3>
                <select name='id' required>
                    [%selectOptions%]
                </select>
                <p>Give icon: <input name='plik' type="file" accept=".jpg,.jpeg,.png" id="file2" required/></p>
                <p>Link: <input name='link' type="text" required/></p>
                <p>Title: <input name='tytul' type="text" required/></p>
                <p>Opis: <input name='opis' type='text' required/>
                <br>
                <input type="submit"/></p>
            </form>`
                        
            let deletePage = `<form action="/deletePage" method="POST">
            <h3>Delete Page:</h3>
            <select name='id' required>
                [%selectOptions%]
            </select>
            <p><input type="submit"/></p>
            </form>`

            let panel = await fs.readFile(path.join(dirname, '/frontend/subpages/panel.html'),'utf-8')

            const userId =  req.session.user.substr(-1);
            const [rows,fields] = await (global.db).query("select * from sites where author_id = ?", userId);

            if(req.session.user[0]=="s") // checking if user is super user
            {
                panel = panel.replace("[%body%]", `${addUser} [%body%]`)
            }   

            let options = ""
            rows.forEach(element => {
                options += `<option value='${element.id}'>${element.id} ${element.title}</option>` 
            });

            deletePage = deletePage.replace('[%selectOptions%]', options)
            editPage = editPage.replace('[%selectOptions%]', options)
            
            panel = panel.replace("[%body%]", `${addPage} ${editPage} ${deletePage}`)

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