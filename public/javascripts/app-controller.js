(function(){

	var app = angular.module('App',[]);

    app.controller('Controller', ['GameService',
    	function(GameService) {
				
			var _this = this ; 

			_this.playerMove = true;

			// Réference au service game-service
			_this.gameService = GameService;

			// Le modele de donnée correspond à la grille de jeu
			_this.model = {};

			_this.message = "";

			// Définition des coordonnées pour les point de la grilles
			_this.columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
			_this.lines = ['5', '4', '3', '2', '1', '0'];

			// Définition des classes materialize utilisées pour les différents états d'un point de la grille
			var colors = {
				0 : { "blue-grey" : true, "lighten-5" : true},
				1 : { "played" : true, "blue-grey" : false, "lighten-5" : false, "yellow" : true, "darken-5" : true},
				2 : { "played" : true, "blue-grey" : false, "lighten-5" : false, "red" : true, "darken-5" : true},
			}

			var targetPosition = "";

			/*
			* Demarrage d'une nouvelle partie
			*
			*/
			this.init = function(){

				_this.message = "";
				_this.playerMove = true;


				_this.gameService.startNewGame().then(function(response) {
					_this.model = response.data.grid;
				}, function errorCallback(response) {
					console.log("Error :: ", response);
				});

			}

			/*
			* Action déclenchée par le click sur un des point de la grille
			*
			*/
			this.pointClicked = function(position, $event){

				var allowed = true;
				var elementClassList = $event.srcElement.classList;

				// Empêche le joueur de rejouer sur unpoint déjà joué
				for (var i = 0; i < elementClassList.length; i++) {
					if(elementClassList[i] == "played"){
						allowed = false;
						break;
					}

				};

				if(_this.playerMove === true && allowed === true){

					var targetPosition = position;
					var columnEntries = _.keys(_this.model).filter(function(key){ return key.charAt(0) === position.charAt(0) });
					
					// La position jouée sera l'emplacement vide le plus bas de la colonne
					for (i = 0; i < columnEntries.length; i++) {
						if (_this.model[columnEntries[i]] === 0) { 
							targetPosition = columnEntries[i];
							break; 
						}
					}

					// Appel au game-service
					_this.gameService.updateGameState(_this.model, targetPosition).then(function(response) {
						_this.model = response.data.grid;
						// _this.alertEndGame(response.data.end);
						if(response.data.end === false){
							_this.playerMove = false;
							_this.nextMove();
						} else if(response.data.end === true || response.data.end === "draw"){
							_this.alertEndGame(true);
						}
					}, function (response) {
						console.log("Error :: ", response);
					});

				}

			}

			/*
			* Callback de la fonction pointClicked
			* Appel le game-service afin qu'il lui restitue le coup joué par le robot
			*
			*/
			this.nextMove = function(){
				
				_this.gameService.getOpponenMove(_this.model).then(function(response) {
					_this.model = response.data.grid;
					// _this.playerMove = true;
					if(response.data.end === false){
						_this.playerMove = true;
					} else if(response.data.end === true){
						_this.alertEndGame(false);
					}
					

				}, function (response) {
					console.log("Error :: ", response);
				});

			}

			/*
			* Met à jour la classe css (materialize) d'un point de la grille en fonction de son état
			*
			*/
			this.updateClass = function(position){

				return colors[_this.model[position]];

			}

			/*
			* Action déclenchée lorsque la fin de la partie est détéctée
			*
			*/
			this.alertEndGame = function(win){

				_this.playerMove = false;
				if(win === "draw"){
					_this.message = "Egalité";	
				} else {
					_this.message = win === true ? "Gagné" : "Perdu";
				}

			}

			this.init();

		}]
	);


})();
