const express = require('express');
const route = express.Router();
console.log("supervisor route is called...");
const auth = require('../middelware/auth')
const { registerSupervisor, superviserLogin, supervisorProfile, updateProfile, forgetPassword, resetPassword, updateStatus, allHostes, createHostess } = require('../controller/supervisor.controller');

//register supervisor
route.post('/registerSupervisor', registerSupervisor);

//login supervisor
route.post('/loginSupervisor', superviserLogin);

//supervisor profile
route.get('/supervisorProfile', auth, supervisorProfile);

//update profile
route.put('/updateProfile/:id', auth, updateProfile);

//forget password supervisor
route.post('/forgetPassword', forgetPassword);

//reset password
route.put('/resetPassword', resetPassword)

//updateStatus supervisor
route.post('/updateStatus', auth, updateStatus);

//get all hostes
route.get('/allHostes', auth, allHostes);


//crete hostes
route.post('/createHostess', createHostess);

module.exports = route; 