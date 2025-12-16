//Random business name generator

let f, s, t;
// First
let rand = Math.random();
if (rand < 0.33) {
  f = "Crazy";
} else if (rand >= 0.33 && rand < 0.66) {
  f = "Amazing";
} else {
  f = "Fire";
}
// Second
rand = Math.random();
if (rand < 0.33) {
  s = "Engine";
} else if (rand >= 0.33 && rand < 0.66) {
  s = "Foods";
} else {
  s = "Garment";
}
// Third
rand = Math.random();
if (rand < 0.33) {
  t = "Bros";
} else if (rand >= 0.33 && rand < 0.66) {
  t = "Limited";
} else {
  t = "Hub";
}
console.log(`${f} ${s} ${t}`);
