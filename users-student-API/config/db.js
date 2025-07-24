const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/users-API";
mongoose.connect(url);
const db = mongoose.connection;

db.on('connected', () => {
    console.log("database is connetced..");

})
db.on('error', () => {
    console.log("database in error ..");

})
db.on('disconnected', () => {
    console.log("database is disconnetced..");

})

module.exports = db;