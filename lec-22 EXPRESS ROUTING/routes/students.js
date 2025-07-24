const express = require('express');
const route = express.Router();

const std = require('../controllers/stdcontroller');

route.get('/', std.studentpage);
route.post('/addstd', std.insertstd);


module.exports = route;