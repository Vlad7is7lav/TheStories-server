const express = require('express');
const user = require('../models/user');
const router = express.Router();

//MODELS

const {User} = require('../models/user');
const {Story} = require('../models/story');

//MIDDLEWARE
const {auth} = require('../middleware/auth');

router.route('/story')
.get((req, res)=>{
    let id = req.query.id;
    Story
    .find({_id: id})
    .populate('ownerId','name')
    .exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc)
    })
})
.post(auth, (req, res)=>{
    let story = new Story({...req.body, ownerId: req.user._id});

    story.save((err,doc)=>{
        if(err) return res.json({success: err});
        res.status(200).json({post: true, bookId: doc._id});
    })
})
.patch(auth, (req, res)=>{
    Story.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    })
})
.delete(auth, (req, res)=>{
    let id = req.query.id;
    
    Story.findByIdAndRemove(id, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            message: "Deleted successfull"
        })
    } )
})

router.route('/all_stories')
.get((req, res)=>{
    // /all_stories?skip=1&limit=4&order=asc&owner=lfkoeoiwjff

    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 50;
    let order = req.query.order ? req.query.order : 'asc';
    let byOwner=req.query.owner ? {ownerId: req.query.owner} : {};

    Story.find(byOwner).skip(skip).limit(limit).sort({name: order}).exec((err, doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })

    // Story.find({author: "Vladislav", rating: 3}, (err,stories)=>{
    //     if(err) return res.status(400).send(err);
    //     res.json({
    //         stories
    //     })
    // })
})

module.exports = router;