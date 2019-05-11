console.log("Hello world!");
const fs = require('fs');
console.log("aaa" + { a: 5 });
const obj = {
	a: 10,
	b: 25
}

const objToJSON = JSON.stringify(obj);

// console.log("Begin.");
// fs.writeFile("test.txt", objToJSON, function(err) {
// 	if(err) console.log("Error!!!", err)
// 	else console.log("Write file success!");
// });

// fs.readFile("test.txt", function(err, data) {
// 	if(err) console.log("Error!!!", err)
// 	else {
// 		console.log(data);
// 		console.log(JSON.parse(data));
// 		const jsonToObj = JSON.parse(data);
// 		console.log(jsonToObj.a);
// 	}
// });
// console.log("End.");

// try {
// 	console.log("Begin Sync.");
// 	fs.writeFileSync("testSync.txt", objToJSON);

// 	const data = fs.readFileSync("testSync.txt", { encoding: "utf8" });
// 	console.log(data);
// 	console.log("End Sync.");
// } catch (error) {
// 	console.log(error);
// }

const fileCtrl = require("./fileController");

// const readFileCustom = fileCtrl.readFileCustom;
// const writeFileCustom = fileCtrl.writeFileCustom;
const { readFileCustom, writeFileCustom } = fileCtrl;

console.log(fileCtrl.readFileCustom("test.txt"));