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
    const productImage = await product.findById(id);

    res.redirect('/')
}

//update logic
const updateProduct = async (req, res) => {
    const id = req.params.id;
    console.log('id', id);
    const records = await product.findById(id);
    console.log('records', records);
    res.render('update', { records });

}

module.exports = {
    HomePage, ProductForm, insertProduct, DeleteProduct, updateProduct
}

