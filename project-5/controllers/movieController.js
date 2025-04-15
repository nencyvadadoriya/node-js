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
const horrerPage = (req,res)=>{
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
        res.status(500).send("Server error");
    }
};

// card indetails
const CardInDetails = (req, res) => {
    const season = req.query.season;

    const seasons = {
        1: {
            movieTitle: "Pokémon: Indigo League",
            avatar: "/images/Pokemon Season-1.jpg",
            directorName: "Kunihiko Yuyama",
            releaseYear: 1997,
            Genre: "Action, Adventure, Comedy",
            description: "Ash starts his journey as a Pokémon Trainer from Pallet Town with Pikachu.",
            originalRunJapan: "April 1, 1997 – January 21, 1999",
            originalRunUS: "September 8, 1998 – November 27, 1999",
            episodes: "82 (Japan), 80 (US – 2 banned)",
            region: "Kanto",
            characters: "Ash Ketchum, Pikachu, Misty, Brock",
            plotPoints: [
                "Ash starts his journey as a Pokémon Trainer from Pallet Town.",
                "Receives Pikachu as his first Pokémon.",
                "Battles Gym Leaders across the Kanto region.",
                "Faces Team Rocket frequently.",
                "Competes in the Pokémon League at Indigo Plateau."
            ]
        },
        2: {
            movieTitle: "Pokémon: Adventures in the Orange Islands",
            avatar: "/images/Pokemon Season-2.webp",
            directorName: "Kunihiko Yuyama",
            releaseYear: 1999,
            Genre: "Action, Adventure, Comedy",
            description: "Ash travels through the Orange Islands and meets new friends.",
            originalRunJapan: "January 28, 1999 – October 7, 1999",
            originalRunUS: "December 4, 1999 – October 14, 2000",
            episodes: "36",
            region: "Orange Archipelago",
            characters: "Ash, Misty, Tracey Sketchit",
            plotPoints: [
                "Follows Ash’s adventures in the Orange Islands.",
                "New companion: Tracey joins the group.",
                "Faces the Orange Crew Leaders (not standard Gyms).",
                "Battles the Orange League Champion, Drake.",
                "Returns with Lapras and Charizard becoming more cooperative."
            ]
        },
        3: {
            movieTitle: "Pokémon: The Johto Journeys",
            avatar: "/images/Pokemon Season-3.jpg",
            directorName: "Kunihiko Yuyama",
            releaseYear: 1999,
            Genre: "Action, Adventure, Comedy",
            description: "Ash begins a new journey in Johto with Pikachu and friends.",
            originalRunJapan: "October 14, 1999 – July 27, 2000",
            originalRunUS: "October 14, 2000 – August 11, 2001",
            episodes: "41",
            region: "Johto",
            characters: "Ash, Misty, Brock",
            plotPoints: [
                "Ash begins a new journey in Johto with Pikachu and friends.",
                "New Pokémon from Gen II (Gold/Silver) introduced.",
                "Battles against new Gym Leaders.",
                "Rivalry with new characters like Casey.",
                "Starts catching Johto-native Pokémon like Chikorita and Cyndaquil."
            ]
        },
        4: {
            movieTitle: "Pokémon: Johto League Champions",
            avatar: "/images/Pokemon Season-4.jpg",
            directorName: "Kunihiko Yuyama",
            releaseYear: 2000,
            Genre: "Action, Adventure, Comedy",
            description: "Continuation of Ash's Johto journey with more battles and growth.",
            originalRunJapan: "August 3, 2000 – August 2, 2001",
            originalRunUS: "August 18, 2001 – September 7, 2002",
            episodes: "52",
            region: "Johto",
            characters: "Ash, Misty, Brock",
            plotPoints: [
                "Continuation of Ash's Johto journey.",
                "Faces more Gym Leaders and trains his Johto team.",
                "Ongoing battle against Team Rocket.",
                "Participation in various Pokémon contests and events.",
                "Builds strong bonds with his Johto Pokémon."
            ]
        },
        5: {
            movieTitle: "Pokémon: Master Quest",
            avatar: "/images/Pokemon Season-5.jpg",
            directorName: "Kunihiko Yuyama",
            releaseYear: 2001,
            Genre: "Action, Adventure, Comedy",
            description: "Final part of the Johto saga, leading up to the Silver Conference.",
            originalRunJapan: "August 9, 2001 – November 14, 2002",
            originalRunUS: "September 14, 2002 – October 25, 2003",
            episodes: "65",
            region: "Johto",
            characters: "Ash, Misty, Brock",
            plotPoints: [
                "Final part of the Johto saga.",
                "Ash earns final Gym Badges and competes in the Silver Conference.",
                "Battles tough opponents like Harrison.",
                "Wraps up major character arcs before heading to Hoenn.",
                "Misty and Brock part ways temporarily at the end of the season."
            ]
        }
    };

    const data = seasons[season];

    if (data) {
        res.render("CardInDetails", { movie: data });
    } else {
        res.status(404).send("Season not found");
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
        console.error("Error inserting album:", error);
        res.status(500).send("Insert error");
    }
};

// Delete movie
const DeletMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await movie.findById(id);

        if (record.avatar && fs.existsSync(record.avatar)) {
            fs.unlinkSync(record.avatar);
        }

        await movie.findByIdAndDelete(id);
        res.redirect('/');
    } catch (error) {
        console.error("Error deleting album:", error);
        res.status(500).send("Delete error");
    }
};

//  update form
const UpdateMovie = async (req, res) => {
    const { id } = req.params;
    const record = await movie.findById(id);
    res.render('edit', { record });
};

// Edit movie
const EditMovie =  async(req, res) => {
    console.log(req.body);
    try {
        const  id  = req.params.id;
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
        res.status(500).send("Edit error");
    }
};

module.exports = {
    homepage,RenderForm, horrerPage ,inDetailsPage ,CardInDetails ,insertMovie,DeletMovie,UpdateMovie,EditMovie
};
