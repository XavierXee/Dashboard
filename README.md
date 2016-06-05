------------------------------------------------------------------------------------------------------------------------

Puissance Quatre 


------------------------------------------------------------------------------------------------------------------------

Ce document à pour objet de décrire les étapes de conception et de réalisation d’un jeu de puissance quatre, sous forme d’application web, à l’aide de NodeJS.


------------------------------------------------------------------------------------------------------------------------

		1 - Règles du jeu
		2 - Analyse du besoin et recherche de solution
		3 - Conception de l’application
		4 - Réalisation de la partie front-end 

1 – Règles du jeu

	“Le but du jeu est d'aligner 4 pions sur une grille comptant 6 rangées et 7 colonnes. 
	Chaque joueur dispose de 21 pions d'une couleur (par convention, en général jaune ou rouge). 
	Tour à tour les deux joueurs placent un pion dans la colonne de leur choix, le pion coulisse 
	alors jusqu'à la position la plus basse possible dans ladite colonne à la suite de quoi 
	c'est à l'adversaire de jouer. Le vainqueur est le joueur qui réalise le premier un 
	alignement (horizontal, vertical ou diagonal) d'au moins quatre pions de sa couleur. 
	Si, alors que toutes les cases de la grille de jeu sont remplies, aucun des deux joueurs 
	n'a réalisé un tel alignement, la partie est déclarée nulle.” (Wikipédia)

2 – Analyse du besoin et recherche de solution

			- Démarrer une nouvelle partie 
	
	Une partie nécessite la mise en place dans une page html d’une grille de 
	jeu de 7 colonnes par 6 lignes. L’utilisateur, pour chaque tour devra pouvoir 
	cliquer sur une des positions de la grille.

	Nous représentons la partie comme une succession de coups, qui pourrons être effectués 
	tantôt par un joueur, tantôt par l’autre (ici un robot). Etant donné que lorsqu’un joueur 
	joue un pion, celui-ci coulisse jusqu’à la position la plus basse dans une colonne, 
	jouer un coup, ou placer un pion, revient à choisir une colonne.

			- Mettre à jour la grille de jeu
	
	A chaque action du joueur ou de l’adversaire, une position de la grille est modifiée. 
	On attribut à chaque position une valeur pour définir si elle a été jouée par le joueur, 
	par le bot ou si elle n’a pas encore été jouée.

			- Faire jouer l’ordinateur

	Le bot devra choisir, après chaque tour de l’utilisateur, quel est le meilleur choix 
	possible pour s’assurer la victoire. Pour se faire on permet au bot de simuler tour à 
	tour chaque coup possible en leur attribuant une valeur. La valeur la plus élevée sera 
	sélectionnée. Par ailleurs on demande également au bot de simuler tous les coups possibles 
	pour le prochain tour (celui du joueur adverse, l’utilisateur). Ainsi il sera capable de 
	contrer le joueur lorsque celui-ci sera en mesure de poser le quatrième jeton d’une ligne.

			- Détecter la fin de la partie

	Une partie de puissance quatre se termine soit quand un des deux joueurs a réalisé 
	un alignement de quatre pions concomitants soit quand toutes les positions de la 
	grille ont été jouées sans vainqueur.

3 – Conception de l’application

	L’application se divise en quatre entités principales pour assurer le corpus fonctionnel 
	du besoin. On a tout d’abord le cœur de l’application, reposant sur le framework « expressJS » 
	qui regroupe la configuration du server NodeJS ainsi que la gestion des requêtes http. 
	Ensuite viens les trois classes qui regroupent l’aspect fonctionnel pure du jeu de puissance 
	quatre. La première, le contrôleur du jeu, permet la mise  jour de la grille de jeu, le lancement 
	d’une nouvelle partie et la détection de la fin de la partie. La seconde classe encapsule les 
	fonctions relatives au comportement du robot. Enfin la dernière classe fonctionnelle est une 
	boite à outil proposant diverses fonctions de calculs.

4 - Réalisation de la partie front-end

	L’interface de jeu se présente sous la forme d’une application web monopage. La manipulation de
	la page HTML repose sur le framework « AngularJS » qui propose un modèle de développeur adaptatif et 
	modulaire. Ainsi l’IHM du jeu, simple et minimaliste repose sur 2 classes : un unique contrôleur 
	qui s’occupe de mettre à jour la vue, et un service distinct dans lequel sont regroupés les différents 
	appels au server. Pour finir, la structure du document HTML a faite grâce à la librairie « Materialize » 

