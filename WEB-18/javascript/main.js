// aFunc(); // => Run

// function aFunc(a, b, c) {
// 	// Code
// 	console.log(a);
// 	console.log(b);
// 	console.log(c);
// }

// // bFunc() // => Error

// const bFunc = function(callback) {
// 	// excuted something....
// 	callback(10, 15, 20);
// }

// bFunc(aFunc); // => Run

// const cFunc = () => {

// }

// console.log("Begin");
// setTimeout(function() {
// 	console.log("Hello");
// }, 0);
// console.log("End");

// for(var i = 0; i < 10; i++) {

// }

// while (condition) {
	
// }

// "123" == 123  => true
// "123" === 123 => false

// // !!variable

// if(0 undefined null false => false) {

// }

// Function Scope

// var a = 15;

// function aFunc() {
// 	var b = 10;
// 	function cFunc() {
// 		var c = 25;
		
// 		console.log(a); // 15
// 		console.log(b); // 10
// 		console.log(c); // 25
// 	}

// 	cFunc();

// 	console.log(a); // 15
// 	console.log(b); // 10
// 	console.log(c); // undefined
// }

// aFunc();

// console.log(a); // 15
// console.log(b); // undefined
// console.log(c); // undefined

// for(var i = 0; i < 1; i++) {

// }
// console.log(i);

// Block scope { }
const countDown = function(count) {
	// var i;
	for(let i = count; i >= 0; i--) {
		// const a = i;
		setTimeout(function() {
			console.log(i); // -1
		}, 1000*(count - i));
	}
	// console.log(a);
}

countDown(10);