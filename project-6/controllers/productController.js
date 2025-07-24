const express = require('express');
const fs = require('fs')
const product = require('../models/productSchema');


const HomePage = async (req, res) => {
    const records = await product.find({});
    // console.log('records',records);
    res.render('index', { records });
}

// addProduct page
const ProductForm = async (req, res) => {
    res.render('addProduct');
}

//============ crud opration====================
// insertProduct page
const insertProduct = async (req, res) => {
    console.log('addProduct ', req.body);
    try {
        req.body.productImage = req.file.path;

        const insert = await product.create(req.body);

        if (insert) {
            console.log('Product added successfully');
            res.redirect('/');
        }
        else {
            console.log('Product not add');
            res.redirect('/addProduct');
        }
    } catch (error) {
        res.send(`<p>error : ${error}</p>`)
    }
}

//delete logic
const DeleteProduct = async (req, res) => {
    const id = req.params.id;
    console.log('id', id);
    const data = await product.findById(id);
    if(data){
        fs.unlinkSync(data.productImage);
    }
    await product.findByIdAndDelete(id);
    res.redirect('/')
}

//update logic
const updateProduct = async (req, res) => {
    const id = req.params.id;
    console.log('id', id);
    const record = await product.findById(id);
    console.log('records', record);
    if (record) {
        res.render('update', { records: record });
    } else {
        res.redirect('/');
    }
    res.render('update', { record });

}

const editProduct = (req,res)=>{

}

module.exports = {
    HomePage, ProductForm, insertProduct, DeleteProduct, updateProduct , editProduct
}

