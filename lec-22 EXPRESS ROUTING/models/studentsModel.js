const mongoose = require('mongoose');

const stdSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    roll: {
        type: Number,
        required: true,
    }
});

const std = mongoose.model('students', stdSchema);

module.exports = std;