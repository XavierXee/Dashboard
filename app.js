// Référence aux dépendances de l'application
var express = require('express');
var path = require('path');
var _ = require('underscore');
var bodyParser = require('body-parser')
var gameController = require(__dirname + '/src/GameController.js');
var bot = require(__dirname + '/src/bot.js');

// Port
var port = process.env.PORT || 3000;

// Démarrage de l'application
var app    = express() ;
    server = app.listen(port, function() {
        console.log('Listening on port %d', server.address().port);  
    });

// Configuration
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true})); 

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

// Routage des requêtes HTTP
app.post('/jeton', function(req, res){

    var updateDatedGrid = gameController.updateGrid(req.body.grid, req.body.position, 1);
    var isEnd = gameController.isEndGame(req.body.grid, req.body.position, 2);
    res.send({grid : updateDatedGrid, end : isEnd});

});
app.post('/opponentMove', function(req, res){

    var position = bot.play(req.body.grid);
    var updateDatedGrid = gameController.updateGrid(req.body.grid, position, 2);
    var isEnd = gameController.isEndGame(req.body.grid, position, 1);
    res.send({grid : updateDatedGrid, end : isEnd});

});
app.get('/newGame', function(req, res){

    var gameGrid = gameController.newGame();
    res.send({grid : gameGrid});

});
app.get('/', function(req, res){
    res.render('index', {'title' : 'Puissance 4 - NodeJS + Angular'});
});

module.exports = app;