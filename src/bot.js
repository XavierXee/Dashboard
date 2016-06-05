var _ = require('underscore');
var Utils = require(__dirname + '/Utils.js');

var IA = (function() {

	var _this = {};

	/*
	* # play
	*
	* Démarre la phase de jeu du bot
	*
	* @ Object grid : la grille de jeu dans son état actuel dans la partie
	*
	* return Object : le choix retenu pour le coup du bot
	*
	*/
	_this.play = function(grid){

		var move;
		var bestMoves = [];

		bestMoves.push(_this.findBestMove(grid, false));
		bestMoves.push(_this.findBestMove(grid, true));

		// Choisis parmis les meilleurs coup à jouer, celui qui est le plus judicieux
		if(bestMoves[0].w > bestMoves[1].w) {
			move = bestMoves[0].id;
		} else if(bestMoves[0].w < bestMoves[1].w) {
			move = bestMoves[1].id;
		} else if(bestMoves[0].w == bestMoves[1].w && bestMoves[0].w != 4) {
			move = bestMoves[1].id;
		} else if(bestMoves[0].w == bestMoves[1].w && bestMoves[0].w == 4){
			move = bestMoves[0].id;
		}

		return move;

	}

	/*
	* # simulateMove
	*
	* Simule les différents coup possible comme si ils était joués par le joueur adverse ou par lui même
	*
	* @ Object grid : la grille de jeu dans son état actuel dans la partie
	* @ Object position : la position a simuler
	* @ Boolean modeDefensive : true = simule les coup du joueur adverse (humain), false = simule ses propre coups
	*
	* return int : le poid de la position testée
	*
	*/
	_this.simulateMove = function(grid, position, modeDefensive){
		
		var ignore = modeDefensive === true ? 2 : 1;
		return Utils.getPositionWeight(grid, position, ignore);

	}

	/*
	* # findBestMove
	*
	* Cherche le meilleur coup à jouer en comparant les différents poids des coups possibles
	*
	* @ Object grid : la grille de jeu dans son état actuel dans la partie
	* @ Boolean modeDefensive : true = simule les coup du joueur adverse (humain), false = simule ses propre coups
	*
	* return Object : le choix retenu pour le coup du bot
	*
	*/
	_this.findBestMove = function(grid, modeDefensive){

		var positionValue = modeDefensive === true ? 1 : 2;
		
		var positionsWeight = {};
		var bestPositions = [];
		var winPosition = "";
		var prevKey = null;
		var playablePositions = Utils.getAvailablePositions(grid);

		_.each(playablePositions, function(position){
			grid[position] = positionValue;
			positionsWeight[position] = _this.simulateMove(grid, position, modeDefensive);
			if (positionsWeight[position] == 4){
				winPosition = {id: position, w: positionsWeight[position]};
			}
			grid[position] = 0;
		});

		if(winPosition !== ""){

			return winPosition;

		} else {

			for(key in positionsWeight){
				if(!prevKey){
					bestPositions.push({id: key, w: positionsWeight[key]});
					prevKey = key
				} else {
					if(positionsWeight[prevKey] < positionsWeight[key]){
						bestPositions[bestPositions.length-1] = {id: key, w: positionsWeight[key]}
						prevKey = key
					} else if(positionsWeight[prevKey] == positionsWeight[key]){
						bestPositions.push({id: key, w: positionsWeight[key]})
					}
				}
			}

			return bestPositions[Math.floor(Math.random()*bestPositions.length)];

		}
		
	}

    return _this;	

})();

module.exports = IA;