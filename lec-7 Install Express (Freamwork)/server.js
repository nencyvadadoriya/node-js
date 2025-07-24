//install express js install EJS Template crud operation using local date
//please intrall a express and ejs 
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Local in-memory storage
let users = [
    { id: 1, name: 'harsh', email: 'harsh@gmail.com' },
    { id: 2, name: 'mohan', email: 'mohan@gamil.com' }
];

// READ: Display All Users
app.get('/', (req, res) => {
    res.render('index', { users });
});

//  CREATE: Show Form
app.get('/add', (req, res) => {
    res.render('add');
});

//  CREATE: Add New User
app.post('/add', (req, res) => {
    const { name, email } = req.body;
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push({ id, name, email });
    res.redirect('/');
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
