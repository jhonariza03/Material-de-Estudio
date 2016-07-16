'use strict';
var carAppControllers = angular.module('carAppControllers', ['carAppServices']);
carAppControllers.controller('CarListCtrl',  function($scope,Car){
	$scope.cars = [{
		'name':'NEW QASHQAI',
		'snippet':'MADE WITH YOU IN MIND TO GIVE YOU THE HIGHEST QUALITY.'
	},
	{
		'name': 'Veloster',
		'snippet':'SPORTY LIKE A COUPE. ROOMY LIKE A SEDAM.'
	},
	{
		'name': 'Navara',
		'snippet': 'The Navara is all about freedom including freedom of chioce.'
	}];
	Car.notify('prueba');
});
