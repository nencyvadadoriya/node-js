const express = require('express');
const db = require('./confige/db');
const employe = require("./models/employe");

const app = express();
const port = 4008;

app.set("view engine", "ejs");
app.use(express.urlencoded( )); // Middleware

app.get("/", (req, res) => {
    res.render("form");
});

// add data
app.post("/addemploye", (req, res) => {
    const { fname, lname, phonenum, address, email } = req.body;

    employe.create({
        fname: fname,
        lname: lname,
        phonenum: phonenum,
        address: address,
        email: email,
    })
    .then(() => { 
        console.log("Data stored successfully!");
        res.redirect('/table');
    })
    .catch(err => {
        console.log("Error:", err);
        res.send("Error storing data.");
    });
});

// data in  table 
app.get('/table', (req, res) => {
    employe.find({}).then((recordes) => {
        res.render('table', { recordes });
    })
    .catch((err) => {
        console.log("Error fetching records:", err);
        res.send("Error fetching data.");
    });
});

//delete logic
app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log("delete id", id);

    employe.findByIdAndDelete(id).then(() => {
        console.log("Data deleted Succussfully..");
    }).catch((err) => {
        console.log("Error", err);
    });

    res.redirect('/table');
})

app.listen(port, () => console.log(`Server started..`));
