const mongoose = require('mongoose');

const hostessSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    status: {
        type: Boolean,
        default: true
    },
    assigned_flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' }
});

module.exports = mongoose.model('Hostess', hostessSchema);
