console.log("Hello User!");

console.log(document.childNodes);
console.log(document.body);
console.log(document.body.childNodes); //gives all childnodes NodeList(4) [text, div.container, text, script]
console.log(document.body.childNodes[0]); //gives text
console.log(document.body.childNodes[1]); //gives container

let x=document.body.firstElementChild;  //container
console.log(x.childNodes); //NodeList(11) [text, div.box, text, div.box, text, div.box, text, div.box, text, div.box, text]
console.log(x.children); //HTMLCollection(5) [div.box, div.box, div.box, div.box, div.box]
console.log(x.firstChild); //text
console.log(x.lastChild); //text
console.log(x.firstElementChild); //box1
console.log(x.firstElementChild.nextSibling); //box1-> text
console.log(x.firstElementChild.nextElementSibling); //box1-> text -> box2
console.log(x.firstElementChild.parentElement); //container
console.log(x.lastElementChild); //box5
console.log(x.lastElementChild.previousSibling); //box5 <- text
console.log(x.lastElementChild.previousElementSibling); //box5 <- text <- box4

x.firstElementChild.style.backgroundColor="red"; //box1 becomes red
x.lastElementChild.style.color="rgb(100,100,100)"; //box1 becomes red

console.log(x.hasChildNodes()); //true

console.log(document.getElementsByClassName(".temp")); //HTMLCollection []
console.log(document.getElementsByTagName("div")); //HTMLCollection(12) [div.container, div.box, div.box, div.box, div.box, div.box, div.container, div.temp, div.temp, div#web.temp, div.temp, div.temp, web: div#web.temp]
console.log(document.getElementById("web"));
// console.log(document.getElementsByName());

console.log(document.querySelector(".box")); //returns first ele <div class="box" style="background-color: red;">BOX 1</div>
console.log(document.querySelectorAll(".box")); //NodeList(5) [div.box, div.box, div.box, div.box, div.box]

document.querySelectorAll(".temp").forEach(e=>{
    e.style.backgroundColor="blue";
    e.style.color="white";
});

console.log(x.firstElementChild.matches(".box")); //ture
console.log(x.firstElementChild.closest(".box")); // div.box
let y=document.querySelector(".container");
console.log(y.contains(y.firstElementChild)); //true