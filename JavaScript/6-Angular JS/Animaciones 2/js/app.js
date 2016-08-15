'use strict';

var myApp = angular.module('myApp', ['ngRoute','ngAnimate','myAppControllers']);
myApp.config(function($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'pagina-inicio.html',
		controller: 'controllerInicio'
	})
	.when('/acercaDe',{
		templateUrl: 'pagina-acercaDe.html',
		controller: 'controllerAcercaDe'
	})
	.when('/contactenos',{
		templateUrl: 'pagina-contactenos.html',
		controller: 'controllerContactenos'
	});
})