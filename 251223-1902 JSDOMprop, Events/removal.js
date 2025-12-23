console.log("Removal running");

let item = document.getElementsByClassName(".item1");

// Remove the element
item.remove();

// Remove a specific child
let parent = document.getElementsByClassName(".box");
let child = document.getElementsByClassName(".box1");
parent.removeChild(child);

// Remove all children
let conta = document.getElementsByClassName(".box");
conta.innerHTML = ""; // Simple way

// Or more controlled way
while (conta.firstChild) {
  conta.removeChild(conta.firstChild);
}
