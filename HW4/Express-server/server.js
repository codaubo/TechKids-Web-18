const express = require("express");
const app = express();

// Router
// app.get("/", function(request, response) {
// 	console.log(request);
// 	response.send("Hoàng Quang Hùng!");
// });
app.use(express.static("css"));

app.get("/", function(req, res) {
	// res.send("<h1>asjdoiasjd</h1>");
	// console.log(__dirname)
	res.sendFile(__dirname + "/css/index.html");
});

app.listen("5000", function(err) {
	if(err) console.log(err)
	else console.log("Server start success!!!");
});