'use strict';
var motoAppControllers = angular.module('motoAppControllers', []);
motoAppControllers.controller('MotoListCtrl',  function($scope,Moto){
	$scope.motos = Moto.query();
	$scope.orderProp = 'model';
});

motoAppControllers.controller('MotoDetailCtrl', function($scope,$routeParams,Moto,$location)
{
	$scope.moto = Moto.get({motoId: $routeParams.motoId}, function(moto)
	{
		$scope.mainImageUrl = moto.images[0];
	});
	$scope.setImage = function(imageUrl)
	{
		$scope.mainImageUrl = imageUrl;
	};

	$scope.goMenuList = function(){
		$location.url('/motos');
	}
});
