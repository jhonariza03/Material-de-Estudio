'use strict';
var carAppControllers = angular.module('carAppControllers', ['carAppServices']);
carAppControllers.controller('CarListCtrl',  function($scope,Car,$http){
	$http.get('cars/cars.json').success(function(data) {
    		$scope.cars = data;
  		});
	
});
