const express = require('express');
const route = express.Router();
const auth = require('../middelware/auth');
const { searchFlights, bookFlight, viewBookings, cancelBooking, checkIn, register, login, viewProfile, updateProfile, forgetPassword, resetPassword } = require('../controller/passenger.controller');

// Search flights
route.get('/search_flights', searchFlights);
//bookflight
route.post('/bookFlight', auth, bookFlight);
//booking
route.put('/checkin/:bookingId', auth, checkIn);
//viewbooking
route.get('/my-bookings/:id', auth, viewBookings);
//cancel booking
route.delete('/cancel/:bookingId', auth, cancelBooking);

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

module.exports = route;//11 api
