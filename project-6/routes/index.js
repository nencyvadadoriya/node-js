const express = require('express');
const Controller = require('../controllers/productController');
const routes = express.Router();
const path = require('path');
const multer = require('multer');

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: Storage });
console.log('routing.');

routes.get('/', Controller.HomePage);

routes.get('/formPage' ,Controller.ProductForm);

routes.post('/insertProduct', upload.single('productImage'), Controller.insertProduct);

routes.get('/delete/:id',Controller.DeleteProduct);
routes.get('/update/:id', Controller.updateProduct); 
routes.post('/editProduct/:id', upload.single('productImage'), Controller.editProduct);


module.exports = routes;