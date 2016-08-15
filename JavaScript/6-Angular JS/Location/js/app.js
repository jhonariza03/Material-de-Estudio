'use strict';

var myApp = angular.module('myApp', ['ngRoute','myAPPController']);
myApp.config(function($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'views/inicio.html',
		controller: 'controllerInicio'
	})
	.when('/listaEmpleados',{
		templateUrl: 'views/listaEmpleados.html',
		controller: 'controllerListaEmpleados'
	})
	.when('/registroEmpleado',{
		templateUrl: 'views/registroEmpleado.html',
		controller: 'controllerRegistroEmpleado'
	}).
	otherwise({redirectTo:'/'});
});