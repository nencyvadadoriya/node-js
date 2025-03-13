// MongoDB is a NoSQL database that stores data in flexible, JSON-like documents.

//used--
//MongoDB is used in web applications, big data, real-time analytics, IoT, mobile apps, and content management systems due to its flexibility, scalability, and high performance.

const express = require('express');
const db= require('./confige/db');
const employe = require("./models/employe")
const app = express();
const port = 4005;
app.set("view engine" ,"ejs");
app.use(express.urlencoded()); // MiddleWare
app.get("/" ,(req,res)=>{
    res.render("form");
})
app.post("/addemploye",(req,res)=>{
    console.log(req.body);
    const{ fname , lname , phonenum , address , email} = req.body;

    employe.create({
            fname: fname,
            lname: lname,
            phonenum: phonenum, 
            address : address,
            email : email,
            }).then(() => { 
                console.log("Data inserted Successfully...");
            })
        res.redirect('/');
    }) 
app.listen(port,()=>console.log("Server is Started.."));  