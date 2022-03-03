const express = require('express');
var router = express.Router();
var genre_id = require('mongoose').Types.ObjectId;
var {Genres} = require('./../models/movie');

router.get('/',(req,res) => {
    Genres.find((err,docs) => {
        if(!err)
        {
            res.send(docs);
        }
        else
        {
            console.log(err);
        }
    });
   });
   
   router.get('/:id', (req, res) => {
       if (!genre_id.isValid(req.params.id)) {
           return res.status(400).send('No records found at:', `${req.params.id}`);
       }
       Genres.findById(req.params.id, (err, doc) => {
           if (!err) {
               res.send(doc);
           }
           else {
               console.log(err);
           }
       });
   
   });
   
   
   router.post('/', (req, res) => {
       var genres = new Genres({
           genre_name : req.body.genre_name
       });
       genres.save((err, doc) => {
           if (!err) {
               res.send(doc);
           }
           else {
               console.log(err);
           }
       });
   });
   
 module.exports=router;