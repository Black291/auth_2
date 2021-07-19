const {User} = require('./../models/user');

let auth = () => {
    let token = req.cookies.auth;

    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.status(401).send("no access");

        // res.status(200).send('you have access')
        req.token = token
        next();
    })
}

module.exports = {auth}