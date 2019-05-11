const express = require('express');
const Router = express.Router();

const GameModel = require('../models/game.model');

Router.post('/game', (req, res) => {
    let newGame = {
        players: [],
        scores: []
    };

    Object.keys(req.body).forEach(e => {
        newGame.players.push(req.body[e]);
    });
    
    GameModel.create(newGame)
        .then(gameCreated => res.status(201).send({ success: 1, game: gameCreated._id }))
        .catch(err => res.status(500).send({ success: 0, err: err }));
});

Router.put('/game', (req, res) => {
    GameModel.findById(req.body.gameId)
        .lean()
        .then(gameFound => {
            if(req.body.score) {
                gameFound.scores[req.body.score.row][req.body.score.col] = req.body.score.value;
            } else gameFound.scores.push([ 0, 0, 0, 0 ]);

            return GameModel.findByIdAndUpdate(gameFound._id, { scores: gameFound.scores });
        })
        .then(() => res.send({ success: 1 }))
        .catch(err => res.status(500).send({ success: 0, err: err }));
});

module.exports = Router;