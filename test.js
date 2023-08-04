// const name = 'Raghav';
// console.log(name); 
const greet = (name) => {
    console.log(`hello, ${name}`);
}
greet('maria');
greet('yoshi');

global.setTimeout(() => {
console.log('in the timeout')
},3000);

// const int = setInterval(()=>{
// console.log('in the interval')
// }, 1000);

const {people, ages} = require('./people');
// this file is returning an empty file.

console.log(ages);