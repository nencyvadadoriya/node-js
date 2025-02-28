//REAP concepts Global Objects

//In Node.js, the REPL (Read-Eval-Print Loop) is an interactive environment where you can execute JavaScript code and see the results immediately. The global object in Node.js acts as the global scope, similar to window in browsers.

// REPL in Node.js==>
// REPL allows you to:

//1=> Execute JavaScript expressions.
//2=> Load and test Node.js modules.
//3=> Access the global object and variables.
//4=> Use _ to reference the last evaluated result.

//=>How to Start REPL
//node

//In Node.js, the global object provides access to global variables and functions.
console.log(global);
global.myVar = "Hello, World!";
console.log(global.myVar);  // Output: Hello, World!

//==> Common Global Variables & Functions

// Property/Function	    Description

//   console	            Logging output (console.log())
//    process	            Provides information about the Node.js process
//   setTimeout()	        Executes a function after a delay
//   setInterval()	        Runs a function repeatedly after a delay
//   __dirname	            Directory name of the current module
//   __filename	            Filename of the current module

// Example: Using Global Functions
setTimeout(() => {
    console.log("Hello after 2 seconds!");
  }, 2000);

//REPL with Global Object Example
global.message = "Hello from Global";
console.log(global.message);
//output":= 'Hello from Global'

