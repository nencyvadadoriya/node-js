 //Node.js Modules
//==> Node.js modules allow you to organize your code into separate files and reuse functionality. There are three types of modules in Node.js:

//1:==> Built-in Modules (e.g., fs, http, path)
//2:==> User-defined Modules (your own custom modules)
//3:==> Third-party Modules (installed via npm, e.g., express, lodash)

//==> 1. Built-in Modules
// Node.js has several built-in modules that you can use without installation.
const fs = require("fs");

// Create a file and write data
fs.writeFileSync("example.txt", "Hello, Node.js!");

// Read file content
const data = fs.readFileSync("example.txt", "utf8");
console.log(data);
// Creates a file example.txt and reads its content.

//Example: Using the http Module to Create a Server
const http = require("http");
const server = http.createServer((req, res) => {
  res.end("Hello, node js!");
});

server.listen(3000, () => console.log("Server running on port 3000"));
// Runs a simple HTTP server at http://localhost:3000/.

//==>2. User-defined Modules
//You can create your own modules by exporting and importing functions.
const math = require("./math");
console.log(math.add(5, 3));      // Output: 8
console.log(math.multiply(4, 2)); // Output: 8

//3. Third-party Modules (npm Packages)
//You can install modules using npm (Node Package Manager).
// सबसे पहले, टर्मिनल में `axios` को इंस्टॉल करें:
// npm install axios

// const axios = require('axios');
// axios.get('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => {
//     console.log('Data:', response.data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

//output:=
// {
//   "userId": 1,
//   "id": 1,
//   "title": "delectus aut autem",
//   "completed": false
// }





