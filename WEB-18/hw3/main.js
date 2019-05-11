console.log("Hello");
const totalChar = 200;

document.querySelector("textarea")
	.addEventListener("input", function() {
		const length = document.querySelector("textarea").value.length;
		const remainChar = totalChar - length;
		console.log(remainChar);
		document.getElementById("remainChar").innerText = remainChar;
	});