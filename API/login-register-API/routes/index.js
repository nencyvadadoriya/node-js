const express = require('express');
const route = express.Router();
const authUser = require('../middelware/authUsers')
route.use('/students', authUser, require('../routes/students'));
route.use("/users", require('./userRoute'));
module.exports = route;
