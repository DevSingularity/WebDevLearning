// Calculating Factorial

// Using recursion
function factRec(num){
    if(num==1||num==0) return 1;
    return num*factRec(num-1);
}
function factIter(num){
    // if
    let result=1;
    for(i=1; i<=num; i++){
        result*=i;
    }
    return result;
}
// Taking input from user-in terminal using Node.js command line
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter the number whose factorial is required: ", function (x) {
    x = Number(x);

    console.log("Recursion: " + factRec(x));
    console.log("Iteration: " + factIter(x));

    rl.close();
});