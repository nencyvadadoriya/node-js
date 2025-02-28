const math = require('./math');
console.log("Simple Calculator");
var a = 20;
var b = 10;
var operation = "add";

switch(operation) {
    case "add":
        console.log("addition is: " + (a + b));
        break;
    case "sub":
        console.log("subtraction is: " + (a - b));
        break;
    case "multiply":
        console.log("product is: " + (a * b));
        break;
    case "divide":
        console.log("division is: " + (a / b));
        break;
    default:
        console.log("Invalid choice");
        break;
}