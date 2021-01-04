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
        if (err) throw err;
        if(!user) return res.json({
            auth: false,
            message: 'User not found',
            userData: false
        });

        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch) return res.json({
                auth:false,
                message:'Wrong password',
                userData:false
            });

            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth', user.token).json({
                    auth: true,
                    userData: {
                            id: user._id,
                            email: user.email,
                            name: user.name,
                            lastname: user.lastname
                        }
                });
            })
        })
    })
})

router.get('/auth', auth, function(req, res){
    res.json({auth: true,
    userData: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        age: req.user.age,
        country: req.user.country,
        city: req.user.city,
        favBooks: req.user.favBooks
        }
    })
})

router.get('/logout', auth, function(req, res){
    req.user.deleteToken(req.token, (err,user)=> {
        if(err) return res.status(400).send(err);
        res.status(200).send('Bye')
     })
})

router.patch('/update', auth, function(req, res){
    User.findByIdAndUpdate(req.body.userData.id, req.body.userData, {new: true}, (err, doc)=> {
        if(err) return res.status(400).send(err);
        res.json({
            auth: true,
            success: true,
            userData: doc
        })
    })
})

module.exports = router;