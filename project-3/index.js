const express = require('express');
const path = require('path');
const app = express();
const port = 9003;
app.set('view engine', 'ejs');
app.use('/', express.static('public'));

// Middleware function
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/dashboard', (req, res) => {
    res.redirect('/');
});
app.get('/gridsystem', (req, res) => {
    res.render('gridsystem');
});
app.get('/notifications', (req, res) => {
    res.render('notifications');
});
app.get('/fonticon', (req, res) => {
    res.render('fonticon');
});
app.get('/simpleicons', (req, res) => {
    res.render('simpleicons');
});
app.get('/sidebar2', (req, res) => {
    res.render('sidebar2');
});
app.get('/form', (req, res) => {
    res.render('form');
});
app.get('/table', (req, res) => {
    res.render('table');
});
app.get('/map', (req, res) => {
    res.render('map');
});
app.get('/jsvectormap', (req, res) => {
    res.render('jsvectormap');
});
app.get('/chart', (req, res) => {
    res.render('chart');
});
app.get('/sparkchart', (req, res) => {
    res.render('sparkchart');
});
app.get('/widgets', (req, res) => {
    res.render('widgets');
});
app.listen(port, () => console.log("Server started on port " + port));
