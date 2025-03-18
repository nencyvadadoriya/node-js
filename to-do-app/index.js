const express = require('express');
const app = express();
let todo = [];
let completedtodo = [];

app.set('view engine', 'ejs');

app.use(express.urlencoded());
app.use(express.json());
app.get('/', (req, res) => {
    res.render('index', { todo, completedtodo });
});
app.post('/add', (req, res) => {
    const newTask = req.body.task; 
    todo.push(newTask); 
    res.redirect('/currentdata');
});
app.get('/complete/:indc:\Users\NANCY\Desktop\node-js\p-serverex', (req, res) => {
    const index = req.params.index;
    const completedTask = todo.splice(index, 1)[0]; 
    completedtodo.push(completedTask); 
    res.redirect('/currentdata');
});
app.get('/delete/:index', (req, res) => {
    const index = req.params.index; 
    todo.splice(index, 1); 
    res.redirect('/currentdata'); 
});
app.get('/currentdata', (req, res) => {
    res.render('currentdata', { todo, completedtodo }); 
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
