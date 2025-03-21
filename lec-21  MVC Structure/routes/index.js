const express = require('express');
const route = express.Router();
console.log("routing...")


const controller = require('../controllers/controller');
route.get("/",controller.homepage);
route.get("/about",controller.aboutpage);
route.get("/services",controller.servicespage);
route.get("/contact",controller.contactpage);
route.get("/blog",controller.blogpage);

module.exports = route;