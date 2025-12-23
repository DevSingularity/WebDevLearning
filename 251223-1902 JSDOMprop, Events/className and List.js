let box = document.getElementsByClassName('.box');

// Get all classes as a string
console.log(box.className); // Output: "container active"

// Set classes (replaces all existing)
box.className = 'box-large red-border';

// Add a class
box.className += ' animated';

// Check if has specific class
if (box.className.includes('active')) {
    console.log('Box is active');
}

let button = document.getElementById('myButton');

// Add class
button.classList.add('btn-primary');

// Remove class
button.classList.remove('btn-secondary');

// Toggle class
button.classList.toggle('active'); // adds if not present, removes if present

// Check if has class
if (button.classList.contains('active')) {
    console.log('Button is active');
}

// Replace class
button.classList.replace('small', 'large');

// Add multiple classes
button.classList.add('rounded', 'shadow', 'animated');