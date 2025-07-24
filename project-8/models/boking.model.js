const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight'
    },
    passengerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'passenger'
    },
    seats: String,
    bookingDate: Date,
    CheckedIn: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Booking', bookingSchema);
