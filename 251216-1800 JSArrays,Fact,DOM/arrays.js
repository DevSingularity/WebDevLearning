console.log("Hi, bro!");

//Arrays in JS

let arr = [1, 2, 4, 5, 7];
console.log(arr); //gives size with array
console.log(arr[1]); //gives i th ele
console.log(arr.toString());
console.log(arr.join(" then "));
console.log(arr.pop());
console.log(arr.push(10));
console.log(arr.shift()); //removes first ele
console.log(arr.unshift(0)); //adds at first
console.log(arr[2].delete); //deletes 2nd index ele but size remains same
console.log(arr.concat([8, 9, 11], ["Sin", "gul", "ari", "ty"])); //merges arrays
console.log(arr.sort()); //sorts as per string unicode
console.log(arr.sort(function (a, b) {
    return a - b;
})); //sorts as per number value
console.log(arr.reverse()); //reverses array

let arr2 = [3, 6, 2, 8, 4, 5, 7, 1];
console.log(arr2.slice(2, 5)); //from index 2 to 4
console.log(arr2.splice(2, 4, 10, 11, 12)); //from index 2 removes 4 ele and adds 10,11,12
console.log();

//Looping through arrays
//for loop
for (let i = 0; i < arr2.length; i++) {
    console.log(arr2[i]);
}
console.log();
//for-of loop
for (let value of arr2) {
    console.log(value);
}
//for-each loop
arr2.forEach(function (element, index, array) {
    console.log(element + " at index " + index + " in " + array);
});


//Array methods that return a value
let newArr = arr2.map(function (element, index, array) {
    return element ** 2;
});
console.log(newArr);

let filteredArr = arr2.filter(function (element, index, array) {
    return element > 4;
});
console.log(filteredArr);

let isPresent = arr2.includes(5);
console.log(isPresent); //false

let somePresent = arr2.some(function (element, index, array) {
    return element > 6;
});
console.log(somePresent); //true

let allPresent = arr2.every(function (element, index, array) {
    return element < 10;
});
console.log(allPresent); //false

let reducedValue = arr2.reduce(function (accumulator, element, index, array) {
    return accumulator + element;
}, 0);
console.log(reducedValue); //sum of all elements

let firstIndex = arr2.findIndex(function (element, index, array) {
    return element > 4;
});
console.log(firstIndex); //ind=1

let firstElement = arr2.find(function (element, index, array) {
    return element > 4;
});
console.log(firstElement); //6

//create array form object:
console.log(Array.from("Singularity"));