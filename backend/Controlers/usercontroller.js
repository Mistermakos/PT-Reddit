export const getUser = (user) => 
{
    if(user == {})
    {
        const id = parseInt((req.params.id).replace(":","")) 
        console.log(id)
        const result = global.db.query('SELECT * FROM users WHERE id = ' + global.db.escape(id), function(err, results) {
            result.push(results)
            //SELECT * FROM users WHERE id = 'id'
        })
        console.log(query)
    }
}

export const addUser = (req,res) => 
{
    
} 