const express = require('express');
const route = express.Router();

console.log("routing....");
const { fecthUsers, insertUsers, DeleteUsers, UpdateUsers } = require('../controller/usersController');
//crud opretion
route.get('/users', fecthUsers);
route.post('/users', insertUsers);
route.delete('/users/:id', DeleteUsers);
route.patch('/users/:id', UpdateUsers);


//use studnets route
route.use('/students', require('../routes/students'))

module.exports = route;