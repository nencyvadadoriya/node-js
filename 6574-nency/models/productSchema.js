const mongoose = require('mongoose');
 const ProductSchema  = mongoose.Schema({
    productName :{
        type : String,
        required : true
    },
    productPrice :{
        type : Number ,
        required : true
    },
    productColor :{
        type : String,
        required : true
    },
    productCategory :{
        type : String,
        required : true
    },
    productDesc :{
        type : String,
        required : true
    },
    productImage :{
        type : String,
        required : true
    },
 })

const Product = mongoose.model('Product',ProductSchema);

module.exports = Product;