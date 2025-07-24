const express = require('express');
const route = express.Router();
console.log("routing...")

const controller = require('../controllers/controller');
route.get("/", controller.homepage);
route.get("/about", controller.aboutpage);

route.use('/students', require('./students'));

module.exports = route;