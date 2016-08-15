'use strict';
var myAppControllers = angular.module('myAppControllers', []);
myAppControllers.controller('controllerInicio', function($scope){
	$scope.pageClass = 'pagina-inicio';
});

myAppControllers.controller('controllerAcercaDe', function($scope){
	$scope.pageClass = 'pagina-acercaDe';
});

myAppControllers.controller('controllerContactenos', function($scope){
	$scope.pageClass = 'pagina-contactenos';
});