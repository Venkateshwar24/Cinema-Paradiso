const mongoose = require('mongoose');
const {Users} = require('./user');
const {Movie} = require('./movie');

const reviewSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required:true
    },
    user_name :{
        type : String,
        required:true

    },
    movie_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Movie',
        required:true
    },
    user_reviewHeader: {
        type : String,
        required:true
    },
    user_review : {
        type : String,
        required:true  
    },
    creation_date : {
        type:String},
    creation_time : {
        type:String}
})

const Review = mongoose.model('Review',reviewSchema);
module.exports = {Review};