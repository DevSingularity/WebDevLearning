console.log("Attributes running");

// <== tagName ==>
console.log('Starting with "tagName"');

let heading = document.querySelector("h1");
console.log(heading.tagName); //gives H1

let para = document.getElementById("mpara");
console.log(para.nodeName); //gives P

// Practice Questions

// 1. Create an HTML page with different elements (div, span, button, input). Write JavaScript to display the tag name of each element when clicked.
// 2. Write a function that takes an element as input and returns true if it's a heading tag (H1-H6), otherwise returns false.
// 3. Create a script that finds all elements in the document and creates a list showing which tag names are used and how many times each appears.

console.log("This is qt 1");

function display(text) {
  console.log(`This is ${text}`);
}

let data = Array.from(document.body.children);
console.log(data);
data = document.body.children; //returns collection
console.log(data);
for (const item of data) {
  // item.onclick=display(item.tagName); this automatically starts display, not waited for click
  item.onclick = () => display(item.tagName);
}

console.log("This is qt 2");

function isHeading(tag) {
    // const tag = ele.tagName; //wont work as already defined
  return (
    tag == "H1" ||
    tag == "H2" ||
    tag == "H3" ||
    tag == "H4" ||
    tag == "H5" ||
    tag == "H6"
  );
}

function checkHeading() {
  const input = document.getElementById("tagInput").value;
  const result = document.getElementById("result");
  if (isHeading(input)) {
    result.textContent = input.toUpperCase() + " is a heading tag";
  } else {
    result.textContent = input.toUpperCase() + " is NOT a heading tag";
  }
}

console.log("this is question 3");
//displaying in console
function countTagNames() {
  const elements = document.getElementsByTagName("*");
  const tagCount = {}; //tagname(key): count (value)

  for (const ele of elements) {
    const tag = ele.tagName;
    if (tagCount[tag]) {
      //if already exists
      tagCount[tag]++;
    } else {
      tagCount[tag] = 1;
    }
  }
  return tagCount;
}
console.log(countTagNames());

// <== nodeName ==>
let element = document.querySelector(".box");
console.log(element.nodeName);
let ab1 = document.createTextNode("Hello");
console.log(ab1.nodeName);
let ab2 = document.createComment("Comment");
console.log(ab2.nodeName);

// <== innerHTML ==>
let ab3 = document.querySelector(".box");
console.log(ab3.innerHTML);
ab3.innerHTML += "<span>Additional content</span>";

// <== outerHTML ==>
let completeELe = ab3.outerHTML;
console.log(ab3.outerHTML);
// textContent
console.log(ab3.textContent);
setTimeout(()=>document.body.querySelector(".box1").textContent="Never mess with me", 3000);

ab3.hidden=true; //hides the ele
ab3.hidden=false; //unhides the ele
//both of these adds inline hidden to ab3 element


// Toggle
ab3.hidden=!ab3.hidden;

// Using setAttribute
ab3.setAttribute('hidden', '');
ab3.removeAttribute('hidden');

if(ab3.hasAttribute('hidden')){
    console.log("element box is hidden");
}else{
    console.log("element box is not hidden");
}