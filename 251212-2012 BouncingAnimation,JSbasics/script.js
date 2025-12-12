alert("Welcome BRO");
console.log("Animation is running");


// IF-ELSE
let age = 21;

if (age > 19) {
    console.log("He is older than 19");
} else {
    console.log("He is younger than 19");
}

// SWITCH CASE
let day = "Monday";
switch (day) {
    case "Monday":
        console.log("Today is Monday");
        break;
    case "Tuesday":
        console.log("Today is Tuesday");
        break;
}

//Operator == and ===
let a = 10;
let b = '10';

if (a === b) {
    console.log("both value and type are equal");
} else if (a == b) {
    console.log("only value is equal");
} else {
    console.log("both value and type are not equal");
}

// Declare a object and print the key and value using for in loop
const item = {
    name: "Singularity",
    city: "New York",
    country: "USA"
}

for (const key in item) {
    const value = item[key];
    console.log(key, value);
}


//for of loop
for (const ch of "Singularity") {
    console.log(ch);
}


//Write a program to check if a number is palindrome or not
let x = 121;
let rev = 0;
let original = x;
//While loop
while (x > 0) {
    var digit = x % 10;
    rev = rev * 10 + digit;
    x = Math.floor(x / 10);
}
if (rev == original) {
    console.log("Palindrome");
} else {
    console.log("Not a Palindrome");
}

//Do while loop
let i = 0;
do {
    console.log('This is ' + i + 'th iteration');
} while (i > 0)

//Function to find hcf of two numbers using euclidean algorithm
function hcf(a, b) {
    // Apply Euclidean Algorithm
    while (b != 0) {
        let temp = b;
        b = a % b; // Calculate the remainder
        a = temp;  // Update a to be b
    }
    return a; // Return the HCF (a will be the HCF when b becomes 0)
}

console.log("The hcf of 12 and 18 is " + hcf(12, 18));

//creaitng a avriable that is a function
const fun1 = (x)=>{
    console.log("This is an arrow function "+ x);
}

fun1(33);
fun1(44);
fun1(69);

//Create a faulty calculator using JAVASCRIPT
//This calc does: 
//1. It takes two numbers as input from the user
//2. It performs operations as follows: 10% of the times
//+ --> -
//* --> +
//- --> /
/// --> **

function faultyCalculator(num1, num2, operation) {
    // Generate a random number between 0 and 1
    // If it's less than 0.1 (10% chance), perform wrong operation
    const isFaulty = Math.random() < 0.1;
    
    if (isFaulty) {
        // 10% of the time, perform wrong operations
        switch(operation) {
            case '+':
                return num1 - num2; // + becomes -
            case '*':
                return num1 + num2; // * becomes +
            case '-':
                return num1 / num2; // - becomes /
            case '/':
                return num1 ** num2; // / becomes **
            default:
                return "Invalid operation";
        }
    } else {
        // 90% of the time, perform correct operations
        switch(operation) {
            case '+':
                return num1 + num2;
            case '*':
                return num1 * num2;
            case '-':
                return num1 - num2;
            case '/':
                return num1 / num2;
            default:
                return "Invalid operation";
        }
    }
}

// Example usage with user input (using prompt)
const num1 = parseFloat(prompt("Enter first number:"));
const num2 = parseFloat(prompt("Enter second number:"));
const operation = prompt("Enter operation (+, -, *, /):");

const result = faultyCalculator(num1, num2, operation);
console.log(`Result: ${result}`);
alert(`Result: ${result}`);

//STRINGS:

console.log("This is strings tutorial")
a = "Harry";
console.log(a[0]);
console.log(a[1]);
console.log(a[2]);
console.log(a[3]);
console.log(a[4]);
// console.log(a[5]);

console.log(a.length)

let real_name = "Harry"
let friend = "Rohan"
console.log("His name is " + real_name + " and his friends name is " + friend)
console.log(`His name is ${real_name} and his friends name is ${friend}`)

b = "ShivamSh"
console.log(b.toUpperCase())
console.log(b.toLowerCase()) 
console.log(b.length) 
console.log(b.slice(1, 5)) 
console.log(b.slice(1)) 

console.log(b.replace("Sh", "77"))
console.log(b.concat(a, "Aishwariya", "Rahul", "Priya"))

console.log(b)