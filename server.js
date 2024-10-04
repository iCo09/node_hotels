// console.log("Server file is running");
// console.log("rahul");

// var add = function(a,b){
//     return a + b;
// }

// var add = (a,b) => {return a+b;}

// var result = add(2,7);
// console.log(result);


//Callback function

// function callback(){
//     console.log('Rahul is calling a callback function');
// }

const add = function(a,b,callback){
    var result = a+b;
    console.log(result);  //main function completed
    callback(); //callback is called
}

// add(3,4, function(){
//     console.log('add completed');
// });

add(3,4, () => console.log('add completed'))


const { log } = require('console');
//File system module

// var fs = require('fs'); 
// var os = require('os');

// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.txt', 'Hi ' + user.username + '!\n', ()=>{
//     console.log('File is created')
// });

const notes = require('./notes.js');
var _ = require('lodash');


console.log('Server file is available');
var age = notes.age;
var result = notes.addNumber(age,10);

console.log(result);
console.log(age);

var data = ["person", "person", 1, 2, 1, 2, 'name', 'age', '2'];
var filter = _.uniq(data);
console.log(filter);



