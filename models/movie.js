const mongoose = require('mongoose');
const {Users} = require('./user');

const genreSchema = new mongoose.Schema({
    genre_name : String,
});

const movieSchema = new mongoose.Schema({
    movie_title : {type:String},
    release_year : {type:String},
    creation_date : {type:String},
    creation_time : {type:String},
    movie_desc : {type:String},
    running_min : {type:String},
     movie_poster : {type:String},    
     user_id : {type:mongoose.Schema.Types.ObjectId, ref : 'Users'},
     user_name:{type:String},
    movie_director : {type:String},
    isVerified : {type:Boolean},
    streaming_platform : {type:String},
    movie_language : {type:String},
    movie_country : {type:String},
    movie_region : {type:String},
    genres_list : [{type:String}],
    wikipedia_url : {type:String}
});


const Movie = mongoose.model('Movie', movieSchema);
const Genres = mongoose.model('Genres', genreSchema );
module.exports = {Movie,Genres};