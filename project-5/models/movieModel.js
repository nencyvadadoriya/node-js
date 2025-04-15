const mongoose = require('mongoose');

const movieschema = new mongoose.Schema({
    movieTitle :{
        type  : String ,
        required : true
    },
    releaseYear : {
        type : Number,
        required : true
    },
    directorName : {
        type : String,
        required : true
    },
    Genre : {
        type : String,
        required:true
    },
    avatar: {
        type: String,
        required: true 
    }
})

module.exports = mongoose.model('movie', movieschema)