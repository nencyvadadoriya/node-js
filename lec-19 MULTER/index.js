const express = require('express');
const db = require('./confige/db');
const employe = require("./models/employe");
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const app = express();
const port = 9000;

app.set("view engine", "ejs");
app.use(express.urlencoded()); // Middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get("/", (req, res) => {
    res.render("form");
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });//file midelvar

// add data
app.post("/addemploye", upload.single('image'), async (req, res) => {
    const { fname, lname, phonenum, address, email ,id} = req.body;
    console.log(req.file);
    let image = "";
    if (req.file) {
        image = req.file.path;
    }
    if (id) {
        //edit for  data
        const data = await employe.findById(id);
        if (image) {
            console.log("new image insertedd..");

            fs.unlinkSync(data.image)
            console.log(id)
            employe.findByIdAndUpdate(id, {
                fname: fname,
                lname: lname,
                phonenum: phonenum,
                address: address,
                email: email,
                image: image,
            }).then(() => {
                console.log("Data is Updated");
                res.redirect('/table');
            }).catch((err) => {
                console.log(err);
            });
            // console.log(req.body);
        }
        else {
            console.log("old image");
            employe.findByIdAndUpdate(id, {
                fname: fname,
                lname: lname,
                phonenum: phonenum,
                address: address,
                email: email,
                image: data.image,
            }).then(() => {
                console.log("Data is Updated");
                res.redirect('/table');
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    else {
        // insert data
        employe.create({
            fname: fname,
            lname: lname,
            phonenum: phonenum,
            address: address,
            email: email,
            image: image,
        })
            .then(() => {
                console.log("Data stored successfully!");
                res.redirect('/table');
            })
            .catch(err => {
                console.log("Error:", err);
                res.send("Error....");
            });
    }
});

// data in  table 
app.get('/table', (req, res) => {
    employe.find({}).then((recordes) => {
        res.render('table', { recordes });
    })
        .catch((err) => {
            console.log("Error:", err);
            res.send("Error...");
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

//edit logic 
app.get('/edit', (req, res) => {
    const id = req.query.id;

    employe.findById(id).then((record) => {
        console.log(record);
        res.render('edit', { record });
    }).catch((err) => {
        res.redirect('/table');
        console.log(err);
    })
})

// Update logic
app.post('/table',upload.single('image'), async(req, res) => {
    const { id, fname, lname, phonenum, address, email , image } = req.body;
    console.log(id)
   await employe.findByIdAndUpdate(id, {
        fname: fname,
        lname: lname,
        phonenum: phonenum,
        address: address,
        email: email,
        image :image,
    }).then(() => {
        console.log("Data is Updated");
        res.redirect('/table');
    }).catch((err) => {
        console.log(err);
    });
    console.log(req.body)
})
app.listen(port, () => console.log(`Server started..`));
