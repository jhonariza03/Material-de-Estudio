'use strict';
var moviesBDApp = angular.module('moviesBDApp', [])
.run(function($rootScope){
	$rootScope.orderProp = 'name';
	$rootScope.reverse = false;

	$rootScope.movies = [
		{
			name: 'The Shawshank Redemtion',
			director: 'Frank Darabont',
			review : 9.3,
			publishYear: 1994
		},
		{
			name: 'Pulp Fiction',
			director: 'Quentin Tarantino',
			review : 8.9,
			publishYear: 1995
		},
		{
			name: 'Interstellar',
			director: 'Christopher Nolan',
			review : 8.9,
			publishYear: 2014
		},
		{
			name: 'The Matrix',
			director: 'Andy Wachowski',
			review : 8.7,
			publishYear: 1999
		},
		{
			name: 'City of God',
			director: 'Fernando Meirelles',
			review : 9.5,
			publishYear: 2011
		},
		{
			name: 'Forest Gump',
			director: 'Robert Zemeckis',
			review : 8.8,
			publishYear: 2002
		},
		{
			name: 'Saving Private Ryan',
			director: 'Steven Spielberg',
			review : 8.6,
			publishYear: 1998
		}
	]
});
