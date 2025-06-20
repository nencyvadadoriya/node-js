const category = require('../model/categoryModel');
const SubCategory = require("../model/subcategoryModel");
const extracategory = require('../model/extraCategoryModel');
const product = require('../model/product');
const fs = require('fs');

// category page render
const categorypage = (req, res) => {
    const currentAdmin = req.user;
    const success = req.flash('success');
    const error = req.flash('error');
    res.render('category/categorypage', { currentAdmin, success, error });
}

//insert category 
const addcategory = async (req, res) => {
    console.log(req.body);
    try {
        req.body.category_image = req.file.path;
        const insert = await category.create(req.body);
        if (insert) {
            req.flash("success", `${req.body.category_title} Inserted...`);
        } else {
            req.flash("error", "Category Insertion failed...");
        }
        res.redirect("/category/addCategoryPage");
    } catch (error) {
        req.flash("error", `error ${error}`);
        res.redirect('/category/addCategoryPage');
    }
};

// render viewCategorypage 
const viewCategorypage = async (req, res) => {
    try {
        const currentAdmin = req.user;
        const success = req.flash('success');
        const error = req.flash('error');

        const categories = await category.find();

        res.render('category/viewcategorypage', { currentAdmin, success, error, categories });
    } catch (err) {
        req.flash('error', 'Failed to load categories');
        res.redirect('/category');
    }
}

// delete category
const deleteCategory = async (req, res) => {
    const DeleteId = req.params.id;

    try {
        await SubCategory.deleteMany({ category_id: DeleteId });
        await extracategory.deleteMany({ category_id: DeleteId });
        await product.deleteMany({ category_id: DeleteId });
        const data = await category.findByIdAndDelete(DeleteId);
        console.log("Deleted Category Data:", data);
        if (data && data.category_image) {
            const imagePath = `./${data.category_image}`;
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log('Category image deleted from file system');
            } else {
                console.log('Category image file not found');
            }
        }
        req.flash('success', 'Category deleted successfully!');
        res.redirect('/category/viewCategory');

    } catch (error) {
        console.error(error);
        req.flash('error', 'Something went wrong while deleting category.');
        res.redirect('/category/viewCategory');
    }
};
// update admin form
const updatecategory = async (req, res) => {
    const UpdateId = req.params.id;
    try {
        const data = await category.findById(UpdateId);
        if (data) {
            const currentAdmin = req.user;
            const success = req.flash('success');
            const error = req.flash('error');
            res.render('category/editcategorypage', { data, currentAdmin, success, error });
        } else {
            res.redirect('/category/viewCategory');
        }
    } catch (error) {
        res.send(`<h2> Not found: ${error} </h2>`);
    }
};

// edit admin post
const editcategory = async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.file);

        const data = await category.findById(req.params.id);

        if (req.file) {
            fs.unlinkSync(data.category_image);

            req.body.category_image = req.file.path;

            const updateData = await category.findByIdAndUpdate(req.params.id, req.body);
            if (updateData) {
                req.flash("success", "Category updated successfully...");
            } else {
                req.flash("error", "Category updation failed...");
            }
        } else {
            if (data) {
                req.body.category_image = data.category_image;
                const updateData = await category.findByIdAndUpdate(req.params.id, req.body);
                if (updateData) {
                    req.flash("success", "Category updated successfully...");
                } else {
                    req.flash("error", "Category updation failed...");
                }
            } else {
                req.flash("error", "Data not found...");
            }
        }
        res.redirect("/category/viewCategory");
    } catch (e) {
        console.log("Exception", e);
        res.redirect("back");
    }
};

module.exports = {
    categorypage, addcategory, viewCategorypage, deleteCategory, updatecategory, editcategory
}