const express = require('express')
const route = express.Router();
const uploade = require('../middelware/studentMulter');
const { addstudents, fecthStudents, DeleteStudents, updateStudents, fecthSingleStudents } = require('../controller/studentsController');

// crud opretion
route.post('/addStud', uploade.single('image'), addstudents);
route.get('/fecthStud', fecthStudents);
route.delete('/deleteStud/:id', DeleteStudents);
route.put('/updateStud/:id', uploade.single('image'), updateStudents);
route.get('/fecthSingalStud/:id', fecthSingleStudents);
module.exports = route; 