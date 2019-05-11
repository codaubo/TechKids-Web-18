const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const helpers = require('handlebars-helpers');
const math = helpers.math();

const GameModel = require('./models/game.model');
const ApiRouter = require('./routers/apiRouter');

let app = express();

mongoose.connect('mongodb://localhost/scorekeeper', (err) => {
    if(err) console.error(err)
    else console.log("Connect DB success!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', hbs({ defaultLayout: 'main', helpers: {
    math,
    checkSumScore: function(score) {
        return score.reduce((a, b) => a + b, 0) != 0 ? "invalid" : '';
    }
}}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/game/:id', (req, res) => {
    GameModel.findById(req.params.id)
        .then(gameFound => {
            let sumPlayerScore = [ 0, 0, 0, 0];

            gameFound.scores.forEach(scoreRow => {
                sumPlayerScore[0] += scoreRow[0];
                sumPlayerScore[1] += scoreRow[1];
                sumPlayerScore[2] += scoreRow[2];
                sumPlayerScore[3] += scoreRow[3];
            })

            res.render('game', {
                game: gameFound,
                sumPlayerScore,
                sumPlayerScoreTotal: sumPlayerScore.reduce((a, b) => a + b, 0)
            });
        });
});

app.use('/api', ApiRouter);

app.use(express.static('public'));

app.listen(6996, (err) => {
    if(err) console.log(err)
    else console.log("App is listening!");
});