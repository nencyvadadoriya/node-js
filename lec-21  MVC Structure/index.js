const express = require('express');
const app = express();
const port = 9000;

app.set("view engine", "ejs");
app.use('/',require('./routes/index'))

app.listen(port,(err)=>{
    if (err) {
        console.log("Server is not started...", err);
        return false;
    }
    console.log("server started");
})
