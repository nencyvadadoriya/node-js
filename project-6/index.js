const express = require('express');
const db = require('./config/database');    
const path = require('path');
const app = express();
const port =9000;

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use('/uploads', express.static('uploads'));


app.use('/',require('./routes/index'));
app.listen(port, () => {
  console.log(`Server is running...`);
});