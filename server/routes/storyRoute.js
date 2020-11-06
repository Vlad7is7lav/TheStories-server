const express = require('express');
const user = require('../models/user');
const router = express.Router();

//MODELS

const {User} = require('../models/user');

//MIDDLEWARE
const {auth} = require('../middleware/auth');

router.route('/story')
.get((req, res)=>{

})
.post(auth, (req, res)=>{
    
})
.patch(auth, (req, res)=>{
    
})
.delete(auth, (req, res)=>{
    
})

module.exports = router;