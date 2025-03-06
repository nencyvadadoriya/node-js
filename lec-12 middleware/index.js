//what is middleware
//Middleware in Node.js (especially in frameworks like Express.js) refers to functions that have access to the request (req), response (res), and next() function in the application's request-response cycle. Middleware functions are used to process incoming requests before they reach the final request handler.

// Types of Middleware in Node.js
//1> Built-in Middleware – Middleware functions that come with frameworks like Express.js (e.g., express.json() for parsing JSON).
//2> Application-Level Middleware – Custom middleware defined in the app to handle specific logic.
//3> Router-Level Middleware – Middleware that runs only for specific routes.
//4> Error-Handling Middleware – Middleware that catches and handles errors.
//5> Third-Party Middleware – External middleware like cors, morgan, body-parser, etc.

// Key Points About Middleware
//1==> Middleware runs before the request reaches the final route handler.
//2==> It can modify the request or response (e.g., authentication, logging, parsing).
//3==> The next() function is crucial to pass control to the next middleware.
//4==> Middleware can handle errors by defining four parameters (err, req, res, next).

const express = require('express');
const path = require('path');
const app = express();
const port = 8004;

app.set('view engine', 'ejs');

const middleware = (req, res, next) => {
    console.log("Middleware 1");
    next();
}
// Request => Middleware1 => Middleware2 => Response
// Request <= => Middleware 

app.use(middleware);
app.use((req, res, next) => {
    console.log("Middleware 2");
    next()
})
app.use('/', express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/users', (req, res) => {
    res.render('users');
})
app.listen(port, () => console.log("Server started.."))