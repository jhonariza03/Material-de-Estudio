'use strict';
var motoApp = angular.module('motoApp', [
	'ngRoute',
	'motoAppAnimations',
	'motoAppControllers',
	'motoAppServices'
	]);

motoApp.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
		when('/motos', {
			templateUrl:'partials/moto-list.html',
			controller: 'MotoListCtrl'
		}).
		when('/motos/:motoId',{
			templateUrl:'partials/moto-detail.html',
			controller:'MotoDetailCtrl'
		}).
		otherwise({
		redirectTo : '/motos'
	});
}])