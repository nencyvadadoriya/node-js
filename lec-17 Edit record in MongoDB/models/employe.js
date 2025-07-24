const mongoose =  require("mongoose");

// MongoDB Schema
const employeSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    phonenum: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email:{
        type : String,
        required : true,
    },
})

// MongoDB Model
const employe = mongoose.model('employe', employeSchema);
module.exports = employe;