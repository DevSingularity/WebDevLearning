console.log("Insertion running");

let container = document.getElementsByClassName('.box1');

// Prepend (at the beginning inside)
container.prepend(exa);

// Append (at the end inside)
container.append('Last item');

// Before (outside, before the element)
container.before('Before container');

// After (outside, after the element)
container.after('After container');

// insertAdjacentHTML
container.insertAdjacentText('beforebegin', 'Before Begin');
container.insertAdjacentHTML('afterbegin', '<p>Start</p>');
container.insertAdjacentHTML('beforeend', '<p>End</p>');
container.insertAdjacentText('afterend', 'After End');