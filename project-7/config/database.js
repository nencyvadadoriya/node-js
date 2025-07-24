const mongoose = require('mongoose')
const url = "mongodb://localhost:27017/adminCrud";
mongoose.connect(url);
const db = mongoose.connection;
db.on('connected',()=>{
    console.log("db is conntected..")
})

db.on('error',()=>{
    console.log("db is not  connteced..")
})

db.on('disconnected',()=>{
    console.log("db is disconntected..")
})

module.exports = db;