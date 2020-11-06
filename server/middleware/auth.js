const {User} = require('../models/user');

let auth = function(req, res, next){
    let token = req.cookies.auth;

    User.findByToken(token, (err, user)=>{
        if (err) return res.status(400).send({
            message: 'Wrong token'
        });

        if(!user) return res.status(401).send({
            message: 'UserNotFound'
        })

        req.user = user;
        req.token = token;
        next();
    })

}

module.exports = { auth };