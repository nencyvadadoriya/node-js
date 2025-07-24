const express = require('express');
const route = express.Router();
console.log("Admin route is called...");
const auth = require('../middelware/auth')
const { registerAdmin, loginAdmin, adminProfile, changePassword, forgetPassword, fetchAdmins, createSupervisor, getAllSupervisors, supervisorProfile, allHostes, createHostess, updateHostess, viewAsignflights, deleteHostess, deleteSupervisor, updateSupervisor } = require('../controller/admin.controller');

//register admin
route.post('/registerAdmin', registerAdmin);

//login admin
route.post('/loginAdmin', loginAdmin);

//admin profile
route.get('/adminProfile', auth, adminProfile);

//change password for admin
route.post('/changePassword', auth, changePassword)

//forget password 
route.post('/forgetPassword', forgetPassword);

//fetch all admin
route.get('/fetchAdmins', fetchAdmins)

//get all hostes
route.get('/allHostes', auth, allHostes);
//create supervisor
route.post('/createSupervisor', createSupervisor);

//supervisor profile
route.get('/supervisorProfile', auth, supervisorProfile);

//update supervisor
route.put('/updateSupervisor/:id', auth, updateSupervisor)
//get all supervisor
route.get('/getAllsupervisors', auth, getAllSupervisors);

//crete hostes
route.post('/createHostess', createHostess);
//update hostess
route.put('/updateHostess/:id', auth, updateHostess);

//delete hostess
route.delete('/deleteHostess/:id', auth, deleteHostess)

//view asign flights for hostess
route.get('/viewAsignflights', auth, viewAsignflights);

//delete supervisor
route.delete('/deletesupervisor/:id', auth, deleteSupervisor);
module.exports = route;