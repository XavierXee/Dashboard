var _ = require('underscore');

var Utils = (function() {

    var _this = {};

    /*
    * # getAvailablePositions
    *
    * Cherche dans grille quelles sont les positions de la grille qui peuvent être jouées
    *
    * @ Object grid : l'objet représentant la grille dans l'état actuelle de la partie
    *
    * return Array positions: un tableau composé des différentes positions jouable
    *
    */
    _this.getAvailablePositions = function(grid){

        var positions = [];

        _.each(['A', 'B', 'C', 'D', 'E', 'F', 'G'], function(column){
            
            var keys = _.keys(grid).filter(function(key){ return key.charAt(0) === column });
            for(i=0; i<keys.length; i++){
                if(grid[keys[i]] === 0){
                    positions.push(keys[i]);
                    break;
                }
            }

        });

        return positions;

    }

    /*
    * # vectorSens
    *
    * retourne un tableau de valeur correspondant à une droite verticale ou horizontale passant par le point donné
    *
    * @ Object grid : l'objet représentant la grille dans l'état actuelle de la partie
    * @ Object position : le point dont on cherche une des diagonales
    * @ int direction : 0 = horizontal, 1 = vertical
    * @ bool return keys : permet de retourner un tableau de position au lieu d'un tableau de valeurs
    *
    * return ArrayvectorArray: le tableau de valeur (ou de position)
    *
    */
    _this.vectorDirection = function(grid, position, direction, returnKeys){
        
        var vectorArray = [];
        var vectorKeys = _.keys(grid).filter(function(key){ return key.charAt(direction) === position.charAt(direction)});
        _.each(vectorKeys, function(key){
            if(returnKeys === true){
                vectorArray.push(key);
            } else if (returnKeys === false){
                vectorArray.push(grid[key]);
            }
        });

        return vectorArray;

    };

    /*
    * # vectorSens
    *
    * retourne un tableau de valeur correspondant à une diagonale passant par le point donné
    *
    * @ Object grid : l'objet représentant la grille dans l'état actuelle de la partie
    * @ Object position : le point dont on cherche une des diagonales
    * @ int sens : 0 = lignes décroissantes, 1 = lignes croissantes
    *
    * return Array vectorArray: le tableau de valeur
    *
    */
    _this.vectorSens = function(grid, position, sens){
        
        var vectorArray = [];
        var vectorKeys = _this.vectorDirection(grid, position, 1, true);
        var positionIndex = _.toArray(vectorKeys).indexOf(position);
        positionIndex = sens === 0 ? positionIndex : -(positionIndex);

        _.each(vectorKeys, function(key, i){
            var letter = key.charAt(0);
            var number = Number(key.charAt(1)) + positionIndex;
            if(typeof(grid[letter+number]) != "undefined"){
                vectorArray.push(grid[letter+number]);
            }
            if(sens === 0){
                positionIndex--;
            } else {
                positionIndex++;
            }
            
        });

        return vectorArray;

    };

    /*
    * # computeVectorWeight
    *
    * Calcul le poid d'un vecteur donnée
    * le poid est déterminé par le nombre de point concurent portant la même valeur
    * sa valeur est incrémentée à chaque instance dans le vecteur d'une valeur égale à la précédente
    * la valeur 0 est considéré comme nul (ou non jouée), 1 et 2 correspondent respéctivement
    * au coups du joueur et à ceux du bot
    * ex : le vecteur suivant [0,1,0,0,1,0,0] aura un poid de 1 
    * ex : le vecteur suivant [0,1,0,0,1,1,0] aura un poid de 2
    * ex : le vecteur suivant [0,1,0,0,1,1,0] aura un poid de 2 
    *
    * @ Array vector : le tableau de valeur à calculer
    * @ int ignore : valeur à considérer comme nul (en plus du 0 = coup du joueur adverse)
    *
    * return int : le poid maximal obtenu pour le vecteur
    *
    */
    _this.computeVectorWeight = function(vector, ignore){

    	var weigthVector = [];
    	_.each(vector, function(val){
    		if(val === 0 || val === ignore){
    			weigthVector.push(0);
    		} else {
    			if(weigthVector.length === 0){
    				weigthVector.push(1);
    			} else {
					weigthVector[weigthVector.length-1]++;
    			}
    		}
    	});

    	return _.max(weigthVector);

    };

    /*
    * # getPositionWeight
    *
    * Calcul, pour un point donné le poid maximal obtenu sur l'un de ses vecteurs
    *
    * @ Object grid : l'objet représentant la grille dans l'état actuelle de la partie
    * @ Object position : le point a peser
    * @ int ignore : valeur à considérer comme nul (en plus du 0 = coup du joueur adverse)
    *
    * return int : le poid retenu pour la position donnée
    *
    */
    _this.getPositionWeight = function(grid, position, ignore){

        var vectors = [];
        vectors.push(_this.vectorDirection(grid, position, 0, false));
        vectors.push(_this.vectorDirection(grid, position, 1, false));
        vectors.push(_this.vectorSens(grid, position, 0));
        vectors.push(_this.vectorSens(grid, position, 1));

        for(i=0; i<vectors.length; i++){
            vectors[i] = _this.computeVectorWeight(vectors[i], ignore);
        }

        return _.max(vectors);

    };

    return _this;

})();

module.exports = Utils;