const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var movie_id = require('mongoose').Types.ObjectId;
var { Rating } = require('./../models/rating');
var { Users } = require('./../models/user');
var { Movie } = require('./../models/movie');
var { Review } = require('./../models/review');
const moment = require('moment');
const currDate = moment().format('DD MMM` YY');
const currTime = moment().format('hh:mm');

router.get('/:id', (req, res) => {
    if (!movie_id.isValid(req.params.id)) {
        return res.status(400).send('No records found at:', `${req.params.id}`);
    }


    Review.find({ movie_id: req.params.id }, (err, doc) => {

        if (!err) {
            res.send(doc);
        }
        else {
            console.log(err);
        }



    });
});



router.post('/:id', (req, res) => {
    var review = new Review({
        user_id: req.body.user_id,
        user_name: req.body.user_name,
        movie_id: req.body.movie_id,
        user_reviewHeader: req.body.user_reviewHeader,
        user_review: req.body.user_review,
        creation_date: currDate,
        creation_time: currTime
    });

    review.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log(err);
        }
    });
})

module.exports = router;