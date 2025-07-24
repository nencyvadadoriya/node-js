const mongoose = require('mongoose');
const supervisorSchema = new mongoose.Schema(
    {
        username: String,
        email: {
            type: String,
            unique: true,
        },
        password: String,
        status: Boolean,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("supervisor", supervisorSchema, "supervisor");