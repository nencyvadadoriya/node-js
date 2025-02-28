//What is NPM? make custom server using HTTP use file system module

//What is NPM?
// NPM (Node Package Manager) is a package manager for JavaScript that helps developers install, manage, and share libraries or tools for Node.js applications. It comes bundled with Node.js.

//Key Features of NPM:
//==>1 Allows installing third-party packages (e.g., express, axios, mongoose).
//==2> Helps manage project dependencies.
//==3> Provides a vast registry of open-source JavaScript libraries.

const http = require('http');  // Import HTTP module
const fs = require('fs');      // Import File System module

const port = 3000;  // Define server port

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Read the HTML file
    fs.readFile('index.html', (err, data) => {
        if (err) {
            res.end('Internal Server ');
        } else {
            res.end(data);
        }
    });
});
// Start the server
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
