const express = require('express');
require('dotenv').config();
require('./config/database');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/admin', require('./routes/admin'))
app.use("/supervisor", require('./routes/supervisor'));
app.use('/flights', require('./routes/flight'));
app.use('/Hostess', require('./routes/hostess'))
app.use('/passenger', require('./routes/passenger'))
app.listen(process.env.PORT, () => {
    console.log("server is staring.");
})