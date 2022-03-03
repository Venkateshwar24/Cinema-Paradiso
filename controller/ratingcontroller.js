const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var movie_id = require('mongoose').Types.ObjectId;
var { Rating } = require('./../models/rating');
var { Users } = require('./../models/user');
var { Movie } = require('./../models/movie');

router.get('/:id',(req,res) => {
    if (!movie_id.isValid(req.params.id)) {
        return res.status(400).send('No records found at:', `${req.params.id}`);
    }
    Rating.find({movie_id:req.params.id}, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log(err);
        }
    });
});



router.post('/:id',(req,res) => 
{
    var rating = new Rating({
        user_id : req.body.user_id,
        movie_id : req.body.movie_id,
        user_rating : req.body.user_rating
    });

    rating.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log(err);
        }
    });
})

module.exports = router;