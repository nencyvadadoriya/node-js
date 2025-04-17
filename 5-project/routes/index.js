const express = require('express');
const multer = require('multer');
const route = express.Router();
const controllers = require('../controllers/movieController');

const storage = multer.diskStorage({
    destination : (req, file,cb) => {
        cb(null, "uploads/");
    },
    filename : (req, file, cb) => {
        cb(null, Date.now()+file.originalname)
    }
});
 
const movie = multer({storage: storage});

console.log("Routing...");

route.get('/', controllers.homepage);
route.get('/addMovie', controllers.RenderForm);
route.post('/insert', movie.single('avatar'), controllers.insertMovie);
route.get('/delete/:id', controllers.DeletMovie)
route.post('/edit/:id', movie.single('avatar'), controllers.EditMovie);
route.get('/update/:id', controllers.UpdateMovie);
route.get('/horrer', controllers.horrerPage);
route.get('/freeMovie', controllers.freeMoviePage);
route.get('/allMovie', controllers.AllMoviePage);
route.get('/indetails/:id' , controllers.inDetailsPage);
route.get('/CardInDetails', controllers.CardInDetails);

module.exports = route;
