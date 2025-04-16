const movie = require('../models/movieModel');
const fs = require('fs');
const path = require('path');

// Home page
const homepage = async (req, res) => {
    const record = await movie.find();
    res.render("index", { record });
};

// Render form page
const RenderForm = (req, res) => {
    res.render("form");
};

// horrer page
const horrerPage = (req, res) => {
    res.render('horrer');
}

// indetails page
const inDetailsPage = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movieData = await movie.findById(movieId);

        if (!movieData) {
            return res.status(404).send("Movie not found");
        }

        res.render('indetails', { movie: movieData });
    } catch (error) {
        console.error("Error in inDetailsPage:", error);
        res.send(`<p>not found : ${error} </p>`)
    }
};

// card indetails
const CardInDetails = (req, res) => {
    const serires = {
        1: {
            movieTitle: "Pokémon: Indigo League",
            avatar: "/images/Pokemon Season-1.jpg",
            directorName: "Kunihiko Yuyama",
            releaseYear: 1997,
            Genre: "Action, Adventure, Comedy",
            description: "Ash starts his journey as a Pokémon Trainer from Pallet Town with Pikachu.",
        },
        2: {
            movieTitle: "Pokémon: Adventures in the Orange Islands",
            avatar: "/images/Pokemon Season-2.webp",
            directorName: "Kunihiko Yuyama",
            releaseYear: 1999,
            Genre: "Action, Adventure, Comedy",
        },
        3: {
            movieTitle: "Pokémon: The Johto Journeys",
            avatar: "/images/Pokemon Season-3.jpg",
            directorName: "Kunihiko Yuyama",
            releaseYear: 1999,
            Genre: "Action, Adventure, Comedy",
            description: "Ash begins a new journey in Johto with Pikachu and friends.",
        },
        4: {
            movieTitle: "Pokémon: Johto League Champions",
            avatar: "/images/Pokemon Season-4.jpg",
            directorName: "Kunihiko Yuyama",
            releaseYear: 2000,
            Genre: "Action, Adventure, Comedy",
            description: "Continuation of Ash's Johto journey with more battles and growth.",
        },
        5: {
            movieTitle: "Pokémon: Master Quest",
            avatar: "/images/Pokemon Season-5.jpg",
            directorName: "Kunihiko Yuyama",
            releaseYear: 2001,
            Genre: "Action, Adventure, Comedy",
            description: "Final part of the Johto saga, leading up to the Silver Conference.",
        }
    };
    try {
        const CardData = req.query.CardData;
        const info = serires[CardData];
        if (info) {
            res.render("CardInDetails", { movie: info });
        } else {
            res.send("Series not found");
        }
    } catch (error) {
        res.send(`card is not found ` , error)
    }
};

// Insert movie
const insertMovie = async (req, res) => {
    try {
        console.log("Insert is loading...");
        console.log("Data Received:", req.body);
        console.log(req.file);

        if (req.file) {
            req.body.avatar = req.file.path;
        }
        await movie.create(req.body);
        console.log("Data stored successfully!");
        res.redirect('/');
    } catch (error) {
        console.error("Error inserting movie information:", error);
        res.send("Insert error");
    }
};

// Delete movie
const DeletMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const record = await movie.findById(id);

        if (record.avatar) {
            fs.unlinkSync(record.avatar);
        }
        await movie.findByIdAndDelete(id);
        res.redirect('/');
    } catch (error) {
        console.error("Error deleting movie card:", error);
        res.send("Delete error");
    }
};

//  update form
const UpdateMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const record = await movie.findById(id);
        res.render('edit', { record });
    } catch (error) {
        res.send('movie card is not found : ', error)
    }
};

// Edit movie
const EditMovie = async (req, res) => {
    console.log(req.body);
    try {
        const id = req.params.id;
        console.log(id);
        const record = await movie.findById(id);

        if (req.file) {
            if (record.avatar) {
                fs.unlinkSync(record.avatar);
            }
            req.body.avatar = req.file.path;
        } else {
            req.body.avatar = record.avatar;
        }
        await movie.findByIdAndUpdate(id, req.body);
        res.redirect('/');
    } catch (error) {
        console.error("Error editing album:", error);
        res.send("Edit error");
    }
};

module.exports = {
    homepage, RenderForm, horrerPage, inDetailsPage, CardInDetails, insertMovie, DeletMovie, UpdateMovie, EditMovie
};
