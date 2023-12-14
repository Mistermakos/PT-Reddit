import path from "path";
import {promises as fs} from "fs";
const dirname = path.resolve();

const Page = async (req) => 
{
    try
    {    
        let tekst = `<div class = "form_row"> [%AddPage%] [%EditPage%] [%DeletePage%] </div>`;
        const userId =  req.session.user.substr(-1);
        const [rows,fields] = await (global.db).query("select * from sites where author_id = ?", userId);

        const addPage = `<form action="/addPage" enctype="multipart/form-data" method="POST">
            <h3>Add Page:</h3>
            <p>Give icon: <input name='plik' type="file" accept=".png" id="file1" required/></p>
            <p>Link: <input name='link' type="text" required/></p>
            <p>Title: <input name='tytul' type="text" required/></p>
            <p>Opis: <input name='opis' type='text' required/>
            <br>
            <input type="submit"/></p>
        </form>`

        let editPage = `<form action="/editPage" enctype="multipart/form-data" method="POST">
        <h3>edit Page:</h3>
        <select name='id' required>
            [%selectOptions%]
        </select>
            <p>Give icon: <input name='plik' type="file" accept=".png" id="file2" required/></p>
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

        let options = ""
                
        rows.forEach(element => {
            options += `<option value='${element.id}'>${element.id} ${element.title}</option>` 
        });

        deletePage = deletePage.replace('[%selectOptions%]', options)
        editPage = editPage.replace('[%selectOptions%]', options)

        tekst = tekst.replace('[%AddPage%]', addPage)
        tekst = tekst.replace('[%EditPage%]', editPage)
        tekst = tekst.replace('[%DeletePage%]', deletePage)

        return tekst;
    }
    catch(err)
    {
        return "Problem occured";
    }
}

const User = async (req) =>
{
    try
    {
        let tekst = `<div class = "form_row"> [%AddUser%] [%EditUser%] [%DeleteUser%] </div>`;
        const [rows,fields] = await (global.db).query("select * from users");

        const addUser = `<form action="/addUser" method="POST">
            <h3>Add User:</h3>
            <p>Login: <input type="text" name="login" required/></p>
            <p>Password: <input type="password" name="password" required/></p>
            <p><input type="submit" required/></p>
        </form>`

        let editUser = `<form action="/editUser" method="POST">
            <h3>Edit User:</h3>
            <select name='id' required>
                [%selectOptions%]
            </select>
            <p>Login: <input type="text" name="login" required/></p>
            <p>Password: <input type="password" name="password" required/></p>
            <p><input type="submit" required/></p>
        </form>`
                            
        let deleteUser = `<form action="/deleteUser" method="POST">
            <h3>Delete Page:</h3>
            <select name='id' required>
                [%selectOptions%]
            </select>
            <p><input type="submit"/></p>
        </form>`

        let options = ""
                
        rows.forEach(element => {
            options += `<option value='${element.id}'>${element.id} ${element.login}</option>` 
        });

        editUser = editUser.replace('[%selectOptions%]', options)
        deleteUser = deleteUser.replace('[%selectOptions%]', options)

        tekst = tekst.replace('[%AddUser%]', addUser)
        tekst = tekst.replace('[%EditUser%]', editUser)
        tekst = tekst.replace('[%DeleteUser%]', deleteUser)

        return tekst;
    }
    catch(err)
    {
        throw err;
        return "Problem Occured";
    }
} 

const getPanel = async (req,res) => 
{
    try{
        if(req.session.user !== undefined)
        {
            // Loading file each time is required. If it were in top-level code, it would not work
            let panel = await fs.readFile(path.join(dirname, '/frontend/subpages/panel.html'),'utf-8')

            if(req.session.user[0]=="s") // checking if user is super user
            {
                const Users = await User(req);
                panel = panel.replace("[%body%]", `${Users} [%body%]`)
            }   

            const pages = await Page(req);
            panel = panel.replace("[%body%]", `${pages}`)

            res.send(panel)
        }
        else // If sombody not logged in wanted to go to path /panel, he/she will be redirected
        {
            res.redirect('/login');
        }
    }
    catch(err){throw err; res.redirect('/');} // if any error occures
}

export default getPanel;