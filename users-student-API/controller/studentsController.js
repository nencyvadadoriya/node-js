const studentsModel = require('../models/students');
const bcrytpt = require('bcrypt');
const moment = require('moment');
const fs = require('fs');
// add students 
const addstudents = async (req, res) => {
    try {
        req.body.password = await bcrytpt.hash(req.body.password, 7);
        req.body.created_date = moment().format('Do MMMM YYYY, h:mm:ss A');
        req.body.updated_date = moment().format('Do MMMM YYYY, h:mm:ss A');
        req.body.image = req.file.path;
        const insertData = await studentsModel.create(req.body);
        if (insertData) {
            res.status(201).json({ insert: true, message: "student data insert successfully" })
        }
        else {
            res.status(201).json({ insert: false, message: "students data not insert" })
        }
    } catch (error) {
        res.status(404).json({ message: " somthing went worng", error: error });
    }
}

//fecth students
const fecthStudents = async (req, res) => {
    try {
        const studentsData = await studentsModel.find({});
        if (studentsData) {
            res.status(201).json({ insert: true, message: "student data found successfully", record: studentsData })
        }
        else {
            res.status(201).json({ insert: true, message: "student data not found successfully" })
        }
    } catch (error) {
        res.status(404).json({ message: " somthing went worng", error: error });
    }
}

//delete student
const DeleteStudents = async (req, res) => {
    console.log(req.params.id);
    try {
        const deleteData = await studentsModel.findByIdAndDelete(req.params.id);
        if (deleteData) {
            fs.unlinkSync(deleteData.image);
            res.status(200).json({ message: " delete student successfully" });
        } else {
            res.status(200).json({ message: " delete student failed", error: error });
        }
    } catch (error) {
        res.status(404).json({ message: " smothing went worng", error: error });
    }
}

// update student
const updateStudents = async (req, res) => {
    console.log(req.file);
    try {
        req.body.updated_date = moment().format('Do MMMM YYYY, h:mm:ss A');

        req.body.password = await bcrytpt.hash(req.body.password, 7);
        if (req.file) {
            const data = await studentsModel.findById(req.params.id);
            if (data) {
                fs.unlinkSync(data.image);
                req.body.image = req.file.path;
            }
        }
        const updateData = await studentsModel.findByIdAndUpdate(req.params.id, req.body);
        if (updateData) {

            res.status(200).json({ message: "student update successfully" })
        } else {
            res.status(200).json({ message: "student update failed" })
        }
    } catch (error) {
        res.status(400).json({ message: "somthig went wrong", error: error })
    }
}

// single data fecth
const fecthSingleStudents = async (req, res) => {
    try {
        const singleData = await studentsModel.findById(req.params.id);
        if (singleData) {
            res.status(200).json({ message: "single student fecth", record: singleData });
        } else {
            res.status(200).json({ message: "single student not fecth" });
        }
    } catch (error) {
        res.status(400).json({ message: "somthing wrnt wrong" });
    }
}
module.exports = {
    addstudents, fecthStudents, DeleteStudents, updateStudents, fecthSingleStudents
}