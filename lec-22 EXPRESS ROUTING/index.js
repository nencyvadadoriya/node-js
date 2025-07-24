const express = require('express');
const app = express();
const port = 9000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const db = require('./confige/db'); 
app.use('/', require('./routes'));

app.listen(port, (err) => {
    if (err) {
        console.log("Server is not started...", err);
        return false;
    }
    console.log("server started on port", port);
})