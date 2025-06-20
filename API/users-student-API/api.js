const express = require('express');
const db = require('./config/db')
const app = express();
const PORT = 9000;

app.use(express.urlencoded({ extended: true }));
//routes go to index file
app.use('/', require('./routes/index'));
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        return false;
    } else {
        console.log("server is starting..");
    }
});