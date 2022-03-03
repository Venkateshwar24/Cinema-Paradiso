const express = require('express');
const multer = require('multer');
var router = express.Router();
var movie_id = require('mongoose').Types.ObjectId;
var { Movie } = require('./../models/movie');
const moment = require('moment');
const currDate = moment().format('DD-MM-YYYY');
const currTime = moment().format('hh:mm');
const { Users } = require('./../models/user');
const mongoose = require('mongoose');
var objectId = require('mongoose').Types.ObjectId;

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },

    filename: function (req, file, callback) {
        callback(null, currDate + file.originalname);
    }

});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    }
    else {
        callback(null, false);
    }

};
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 8
    },
    fileFilter: fileFilter
});

router.get('/', (req, res) => {

    Movie.aggregate([
        {
            "$lookup": {
                "from": "ratings",
                "localField": "_id",
                "foreignField": "movie_id",
                "as": "total_votes"
            }
        },
        {
            "$lookup": {
                "from": "ratings",
                "localField": "_id",
                "foreignField": "movie_id",
                "as": "avg_rating"
            }
        },
        {
            "$set": {
                "total_votes": { "$size": "$total_votes" }
            }
        },
        {
            "$set": {

                "avg_rating":
                {
                    "$avg": {
                        "$map": {
                            "input": "$avg_rating",
                            "in": { "$avg": "$$this.user_rating" }
                        }

                    }
                }
            }
        }
    ]).then(result => res.send(result)).catch(err => console.log(err));





    // Movie.find((err,docs) => {
    //         if(!err)
    //         {
    //             res.send(docs);
    //         }
    //         else
    //         {
    //             console.log(err);
    //         }
    //     })










});

router.get('/:id', (req, res) => {
    if (!movie_id.isValid(req.params.id)) {
        return res.status(400).send('No records found at:', `${req.params.id}`);
    }
    Movie.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log(err);
        }
    });

});


router.post('/', upload.single('movie_poster'), (req, res) => {
    //console.log(req);
    var movie = new Movie({
        movie_title: req.body.movie_title,
        release_year: req.body.release_year,
        creation_date: currDate,
        creation_time: currTime,
        movie_desc: req.body.movie_desc,
        running_min: req.body.running_min,
        movie_poster: req.file.path,
        user_id: req.body.user_id,
        user_name: req.body.user_name,
        movie_director: req.body.movie_director,
        isVerified: false,
        streaming_platform: req.body.streaming_platform,
        movie_country: req.body.movie_country,
        movie_language: req.body.movie_language,
        movie_region: req.body.movie_region,
        genres_list: req.body.genres_list,
        wikipedia_url: req.body.wikipedia_url
    });


    movie.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log(err);
        }
    });
});




router.put('/:id',(req,res)=>{
    if (!objectId.isValid(req.params.id)) {
        return res.status(400).send('No records found at:', `${req.params.id}`);
    }
    var mov={
        
        isVerified: req.body.isVerified,
        
    };
    Movie.findByIdAndUpdate(req.params.id,{$set:mov},{new:true},(err,doc)=>
    {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log(err);
        }
    });
});


router.delete('/:id',(req,res)=>{
    if (!objectId.isValid(req.params.id)) {
        return res.status(400).send('No records found at:', `${req.params.id}`);
    }
    Movie.findByIdAndRemove(req.params.id,(err,doc)=>
    {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log(err);
        }
    });
});


module.exports = router;