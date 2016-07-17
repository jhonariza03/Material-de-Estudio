'use strict';
var smartExpressionApp = angular.module('oneTimeAppController', []);
smartExpressionApp.controller('SingleBindController',  function($scope){
	var counter = 0;
	$scope.names = [
		{
			name : 'Dana'
		},
		{
			name : 'Wolfran'
		},
		{
			name : 'Estefany'
		},
		{
			name : 'You'
		},
		{
			name : 'Jaraba'
		},
		{
			name : 'Miguel'
		},
		{
			name : 'Luis'
		}
	];

	$scope.nextName = function(clickEvent)
	{
		$scope.name = $scope.names[counter % $scope.names.length].name;
		counter++;
	}
});