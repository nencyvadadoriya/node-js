const express = require('express');
const app = express();

// Sample to-do list data
let todo = ['Task 1'];
let completedtodo = [];

app.set('view engine', 'ejs'); // Use EJS for rendering views

// Use express built-in middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.json()); // For parsing JSON data (if needed)

// Route to render the main to-do list
app.get('/', (req, res) => {
    res.render('index', { todo, completedtodo }); // Render index.ejs with data
});

// Route to handle adding a new task
app.post('/add', (req, res) => {
    const newTask = req.body.task; // Get the new task from the form
    todo.push(newTask); // Add the new task to the to-do list
    res.redirect('/currentdata'); // Redirect to the currentdata page
});

// Route to handle marking a task as complete
app.get('/complete/:index', (req, res) => {
    const index = req.params.index; // Get the index of the task to be completed
    const completedTask = todo.splice(index, 1)[0]; // Remove the task from to-do list and add it to completed
    completedtodo.push(completedTask); // Add the task to completed tasks
    res.redirect('/currentdata'); // Redirect to the currentdata page
});

// Route to handle deleting a task
app.get('/delete/:index', (req, res) => {
    const index = req.params.index; // Get the index of the task to be deleted
    todo.splice(index, 1); // Remove the task from the to-do list
    res.redirect('/currentdata'); // Redirect back to currentdata page instead of home page
});

// Route to render the currentdata page with all tasks
app.get('/currentdata', (req, res) => {
    res.render('currentdata', { todo, completedtodo }); // Show updated lists on currentdata.ejs
});

// Set up the server to listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
