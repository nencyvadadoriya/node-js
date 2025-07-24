const express = require('express');
const route = express.Router();
const { register, login, viewProfile, updateProfile, resetPassword, forgetPassword, createPassenger, assignHostess, viewFlightPassengers, checkInPassenger, viewAllPassengersWithFlight } = require('../controller/hostess.controller');
const auth = require('../middelware/auth');


//register passenger
route.post('/register', register);
//logn passenger
route.post('/login', login);

//view profile
route.get('/view_profile', auth, viewProfile);

//update profile
route.put('/update_profile/:id', auth, updateProfile);

//forget password supervisor
route.post('/forgetPassword', forgetPassword);

//reset password
route.put('/resetPassword', resetPassword)

route.post('/createPassenger', auth, createPassenger);
route.post('/assignHostess', assignHostess);
route.get('/passengers/:fid', auth, viewFlightPassengers);
route.put('/checkin/:pid', auth, checkInPassenger);
route.get('/passengers_with_flights', auth, viewAllPassengersWithFlight);
module.exports = route;
// 11 api