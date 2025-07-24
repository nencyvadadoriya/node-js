const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flight_no: String,
    source: String,
    destination: String
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Flight', flightSchema);
