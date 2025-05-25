const express = require('express');
const route = express.Router();
const { categorypage, addcategory, viewCategorypage, deleteCategory, updatecategory, editcategory } = require('../controller/category')
const upload = require('../middelware/categoryMulter');

route.get('/addCategoryPage', categorypage);
route.post('/addcategory', upload.single('category_image'), addcategory);
route.get('/viewCategory', viewCategorypage);
route.get('/deletecategory/:id', deleteCategory);
route.get('/updatecategory/:id', upload.single('category_image'), updatecategory);
route.post('/editcategory/:id', upload.single('category_image'), editcategory);

module.exports = route;