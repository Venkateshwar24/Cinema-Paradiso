const mongoose = require('mongoose');
const {Users} = require('./user');
const {Movie} = require('./movie');

const ratingSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required:true
    },
    movie_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Movie',
        required:true
    },
    user_rating : {
        type : Number,
        required:true 
        
    }
})

const Rating = mongoose.model('Rating',ratingSchema);
module.exports = {Rating};