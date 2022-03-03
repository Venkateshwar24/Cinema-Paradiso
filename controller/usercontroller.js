const express = require('express');
var router = express.Router();
var user_id = require('mongoose').Types.ObjectId;
var { Users } = require('./../models/user');
var { Movie } = require('./../models/movie');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');



// function verifyToken(req,res,next){
//     if(!req.headers.authorization){
//         return res.status(401).send('Unauthorized request');
//     }
//     let token = req.headers.authorization.split(' ')[1];
//     if(token=='null')
//     {
//         return res.status(401).send('Unauthorized request');
//     }
//     let payload = jwt.verify(token,'secretKey');
//     if(!payload)
//     {
//         return res.status(401).send('Unauthorized request');
//     }
//     req.userId = payload.subject;
//     //return req.userId;
//     next();

// }



router.get('/', (req, res) => {
    Users.aggregate([
        {
            "$lookup": {

                "from": "movies",
                "localField": "_id",
                "foreignField": "user_id",
                "as": "movieIds"
            },
        }, {
            "$set": {
                "movieIds": {
                    "$map": {
                        "input": "$movieIds",
                        "in": "$$this._id"
                    }
                }
            }
        }

    ]).then(result => res.send(result)).catch(err => console.log(err));



});

router.get('/:id', (req, res) => {
    const token = req.params.id;
    let payload = jwt.verify(token, 'secretKey');
    const params = payload.subject;
    Users.findOne({ _id: params }, (err, user) => {
        if (!user) {
            console.log(err);

        }

        else {
            res.send({
                _id: user._id,
                user_name: user.user_name
            });
        }
    })

});
router.get('/details/:id',(req,res) => {
    Users.findById(req.params.id,(err,docs) => 
    {
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


router.post('/', (req, res) => {
    var users = new Users({
        user_name: req.body.user_name,
        email_id: req.body.email_id,
        user_password: req.body.user_password,
        mob_no: req.body.mob_no
    });

    users.save((err, user) => {
        if (!err) {
            let payload = { subject: user._id };
            let token = jwt.sign(payload, 'secretKey')
            res.send({ token });
        }
        else {
            console.log(err);
        }
    });
});


router.post('/login', (req, res) => {
    Users.findOne({ email_id: req.body.email_id }, (err, user) => {
        if (err) {
            console.log("Error");
        }
        else
            if (!user) {
                res.status(401).send('Invalid Email');
            }
            else
                if (user.user_password !== req.body.user_password) {
                    res.status(401).send('Invalid Password');
                }
                else {
                    let payload = { subject: user._id };
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token });
                }
    })
})






module.exports = router;