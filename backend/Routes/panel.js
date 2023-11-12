import path from "path";
import fs from "fs";
const dirname = path.resolve();

let panel = fs.readFileSync(path.join(dirname, '/frontend/subpages/panel.html'),'utf-8')
const super_access = ['Super User Panel'] // Page that super user will have
const user_access = ['User Panel'] // Page that user will have

const getPanel = async (req,res) => 
{
    try{
        if(req.session.user !== undefined)
        {
            if(req.session.user[0]=="s") // checking if user is super user
            {
                super_access.forEach((element,index) => {
                    panel = panel.replace(`[%${index}%]`, element)
                });
            }
            else
            {
                user_access.forEach((element,index) => {
                    panel = panel.replace(`[%${index}%]`, element)
                });
            }        
            res.send(panel)
        }
        else // If sombody not logged in wanted to go to path /panel, he/she will be redirected
        {
            res.redirect('/');
        }
    }
    catch(err){res.redirect('/');} // id any error occures
}

export default getPanel;