var _ = require('underscore');
var Utils = require(__dirname + '/Utils.js');

var GameController = (function() {
    
    var _this = {};

    /*
    *
    * # newGame
    *
    * Démarre une nouvelle partie en créant une grille vierge
    *
    * return Object grid : la grille de jeu
    *
    */
    _this.newGame = function() {

    	var gameGrid = {};

		_.each(['A', 'B', 'C', 'D', 'E', 'F', 'G'], function(column){
			_.each(['0', '1', '2', '3', '4', '5'], function(line){
				gameGrid[column+line] = 0;
			});
		});

    	return gameGrid; 
    };

    /*
    *
    * # updateGrid
    *
    * Met à jour la grille de jeu avec la position qui vient d'être jouée
    *
    * @ Object currentGrid : l'objet représentant la grille dans l'état actuelle de la partie
    * @ Object position : la position jouée
    * @ int value : permet de déterminer si c'est le joueur humain ou le bot qui a joué
    *
    * return Object currentGrid : la grille de jeu
    *
    */
    _this.updateGrid = function(currentGrid, position, value) {

    	currentGrid[position] = value;

    	return currentGrid;

    };

    /*
    *
    * # isEndGame
    *
    * Détecte la fin de la partie (si le dernier coup joué a un poid de 4 ou si la grille est pleine)
    *
    * @ Object currentGrid : l'objet représentant la grille dans l'état actuelle de la partie
    * @ Object position : la position du dernier coup joué
    * @ int ignore : permet de déterminer si c'est le joueur humain ou le bot qui joue
    *
    * return Boolean : true = fin de jeu, false = la partie continue
    * return String : "draw" = la grille est remplie : Egalité
    *
    */
    _this.isEndGame = function(currentGrid, position, ignore) {

        var weigth = Utils.getPositionWeight(currentGrid, position, ignore);
        var gridComplete = true;
        
        for(key in currentGrid){
            if(currentGrid[key] == 0){
                gridComplete = false;
            }
        }

        if(weigth === 4){
            return true
        } else if(gridComplete === true){
            return "draw"
        } else {
            return false;
        }

    };

    return _this;

})();

module.exports = GameController;