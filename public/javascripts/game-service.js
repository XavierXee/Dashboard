angular.module('App').service('GameService', ['$http', function($http) {
// app.service('GameService', ['$http', function($http) {

    var _this = {};

    _this.currentGrid = {};

    /*
    * Retourne une promise sur la ressource "newGame" de l'application
    * la ressource renvoie une grille de jeu vierge
    *
    */
    _this.startNewGame = function(){

		return $http({
			method: 'GET',
			url: '/newGame',
		});
		
    }

    /*
    * Retourne une promise sur la ressource "opponenMove" de l'application
    * la ressource renvoie la grille de jeu mise à jour après le choix du robot
    *
    */
    _this.getOpponenMove = function(grid){
		
		return $http({
			method: 'POST',
			url: '/opponentMove',
			data: { grid: grid }
		});
		
    }

    /*
    * Retourne une promise sur la ressource "jeton" de l'application
    * la ressource renvoie la grille de jeu mise à jour après le coup du joueur
    *
    */
    _this.updateGameState = function(grid, position){

		return $http({
			method: 'POST',
			url: '/jeton',
			data: { grid: grid, position: position }
		});

    }

    return _this;

}]);