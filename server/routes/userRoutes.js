const express = require('express');
const user = require('../models/user');
const router = express.Router();

//MODELS

const {User} = require('../models/user');

//MIDDLEWARE
const {auth} = require('../middleware/auth');

////
router.post('/register', function(req, res){
    console.log('works');
    const user1 = new User(req.body);

    user1.save((err, doc)=>{
        if(err) return res.json({success: err});
        res.status(200).json({success: true, user: doc});
    })
})

router.post('/login', function(req, res){
    User.findOne({'email': req.body.email}, (err,user)=>{
        if(!user) return res.json({
            auth: false,
            message: 'User not found',
            userData: false
        });

        user.comparePassword(req.body.password, (err, isMatch)=>{
            if (err) throw err;
            if(!isMatch) return res.status(400).send({
                auth: false,
                message: 'Wrong password',
                userData: false
            })

            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth', user.token).json({
                    auth: true
                });
            })
        })
    })
})

router.get('/auth', auth, function(req, res){
    res.json({auth: true,
    userData: {
        id: req.user,
        email: req.email,
        name: req.name,
        lastname: req.lastname
        }
    })
})

router.get('/logout', auth, function(req, res){
    req.user.deleteToken(req.token, (err,user)=> {
        if(err) return res.status(400).send(err);
        res.status(200).send('Bye')
     })
})

module.exports = router;