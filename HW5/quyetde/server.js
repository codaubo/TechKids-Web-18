const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.get("/",(req,res)=>{
	let questions = [];
	try{
		questions = JSON.parse(fs.readFileSync("database.json"));
	}catch(error){

	}
	if(questions.length ==0){
		res.send("Chưa có câu hỏi nào!!!");
	}
	else{
		const index = Math.floor(Math.random()*questions.length);
		const randomQuestion = questions[index];
		res.send(`
		<h1>${randomQuestion.content }</h1>
		<a href="/vote/yes/${randomQuestion.id}"><button>Yes</button></a>
		<a href="/vote/no/${randomQuestion.id}"><button>No</button></a><br><br>
		<a href="question/${randomQuestion.id}">Kết quả vote</a>
        <a href="question/other">Câu hỏi khác</a>
		`);
	}
	
});

app.get("/vote/:voteId/:questionId",(req,res)=>{
	const {questionId} = req.params;
	const {voteId} = req.params;
	const listansw = req.params;
	console.log(listansw);

	let questions = [];
	try{
		questions = JSON.parse(fs.readFileSync("database.json"));
	}catch(error){
		console.log('file empty');
	}
	questions.forEach((item,index) => {
        if(item.id == questionId){
            if(voteId == "yes"){
                questions[index].yes +=1;                
            }else if(voteId == "no"){
                questions[index].no +=1;
            }
        }
    });
    fs.writeFileSync("database.json",JSON.stringify(questions)); 
    res.redirect("/");
});

app.get("/question/:choise", (req,res) => {
    const {choise} = req.params;
    questions = []
    try{
        questions = JSON.parse(fs.readFileSync("database.json","utf-8"));
    }catch(erorr){
        console.log('file empty');
    }   
    questions.forEach((item,index) =>{
        if(choise == item.id){
            res.send(`
                <h1>${item.content}</h1>
                <p> yes: ${item.yes}</p>
                <p> no: ${item.no}</p>
            	`);
        }else if(choise == "other"){
            res.redirect("/");
        }
    });

});


app.get("/ask",(req,res)=>{
	res.sendFile(__dirname+"/views/ask.html");
});

app.post("/addquestion",(req,res)=>{
	console.log("Add a new question");
	console.log(req.body);
	const questionContent = req.body.questionContent;
	let questions = [];
	try{
		questions = JSON.parse(fs.readFileSync("database.json","utf8"));
	}catch(error){

	}
	console.log(questions);
	const newQuestion = {
		id: questions.length,
		content: questionContent,
		yes: 0,
		no: 0
	}
	questions.push(newQuestion);
	fs.writeFileSync("database.json",JSON.stringify(questions));
	res.redirect("/");

});

app.listen("5000", function(err) {
	if(err) console.log(err)
	else console.log("Server start success!!!");
});