const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const QuestionModel = require('./models/question');

mongoose.connect('mongodb://hungdz:hung123@ds157158.mlab.com:57158/quyetde',{ useNewUrlParser: true }, (error) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Connect to mongodb success')
	}
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static('public'));

// routers for page
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/html/index.html");
});

app.get("/ask", (req, res) => {
	res.sendFile(__dirname + "/public/html/ask.html");
});

app.get("/answer/:questionId", (req, res) => {
	res.sendFile(__dirname + "/public/html/answer.html");
});
app.get("/question/:questionId", (req, res) =>{
	res.sendFile(__dirname + "/public/html/question.html")
});

// routers for json data
app.post('/api/questions', async (req, res) => {
	try {
		const { questionContent } = req.body;
		const newQuestion = {
			content: questionContent,
			yes: 0,
			no: 0,
			createdAt: new Date(),
		};
		const result = await QuestionModel.create([newQuestion]);

		res.json({
			success: true,
			data: result[0],
		});
	} catch (error) {
		res.json({
			success: false,
			message: error.message,
		});
	}
});

app.get('/api/questions/getRandomQuestion', async (req, res) => {
	try {
		const randomQuestion = await QuestionModel.aggregate([
			{$sample: { size: 1 }},
		]);
		console.log(randomQuestion);

		res.json(randomQuestion[0]);
	} catch (error) {
		res.json({
			success: false,
			message: error.message,
		});
	}
});

app.get('/api/questions/getQuestionById/:questionId', async (req, res) => {
	try {
		const { questionId } = req.params;
		const seletedQuestion = await QuestionModel.findById(questionId).exec();

		if (seletedQuestion) {
			console.log(seletedQuestion);
			
			res.json(seletedQuestion);
		} else {
			res.json({
				success: false,
				message: 'Question not found'
			});
		}
	} catch (error) {
		res.json({
			success: false,
			message: error.message,
		});
	}
});

app.put('/api/questions', async (req, res) => {
	try {
		const questionId = req.body.questionId;
		const vote = req.body.vote;
		await QuestionModel.findByIdAndUpdate(questionId, {$inc: {[vote]: 1}}).exec();
		
		res.json({
			success: true,
		});
	} catch (error) {
		res.json({
			success: false,
			message: error.message,
		});
	}
});

app.listen(process.env.PORT || 3000, (err) => {
	if(err) console.log(err)
	else console.log(`Server listen on PORT ${process.env.PORT || 3000}...`);
});