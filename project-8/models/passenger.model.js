const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    age: Number,
    assigned_flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Passenger', passengerSchema);
