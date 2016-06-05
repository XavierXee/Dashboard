/**
*
* ---------------------------------------------------------------------------
*
* DEPENDENCIES
*
**/

// Framework
var express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),

// Utils
_ = require('underscore'),

// Core
gameController = require(__dirname + '/src/GameController.js'),
bot = require(__dirname + '/src/bot.js'),

dashboardConfig = require(__dirname + '/src/Config.js'),
twitterBot = require(__dirname + '/src/TwitterBot.js');

// ---------------------------------------------------------------------------


/**
*
* PORT
*
**/
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
    res.render('index', {'title' : 'Dashboard'});
});

var schedule = dashboardConfig.scheduler.TenSecondsEveryMinute;

var tickCounter = 0;


setInterval(function(){

  console.log("Tick");

  if(tickCounter == 0)
  {
    console.log("----  ", tickCounter);
    gate = true;

  }
  else
  {

    console.log("----  ", tickCounter);
    gate = false;

    if(tickCounter == schedule.tickReturnToZero)
    {
      // greetNewFollowers();
      // retweetFromList();
      tickCounter = -1;

    }
  }

  tickCounter++;

}, schedule.tickInterval);

module.exports = app;
