'use strict';
var carListApp = angular.module('carListAppController', []);
carListApp.controller('ListController',  function($scope){
	$scope.appTitle = 'CarList App 2016';
	$scope.formHeader = 'Agregar un carro a tu lista';
	$scope.deleteText = 'Eliminar';
	$scope.addText = 'Agregar';
	$scope.formTextBrand = 'Marca';
	$scope.formTextYear = 'Año';
	$scope.brand;
	$scope.year;
	$scope.cars = [
		{
			brand: 'BMW M4 Coupe',
			year : '2014'
		},
		{
			brand: 'Chevrolet Corvette Stingray',
			year : '2013'
		},
		{
			brand: 'Ford Mustang',
			year : '2015'
		},
		{
			brand: 'McLaren F1',
			year : '2010'
		},
		{
			brand: 'Chevrolet Camaro SS',
			year : '2011'
		},
		{
			brand: 'Chevrolet Corvette Z06 ',
			year : '2014'
		},
		{
			brand: 'Ferrari Caliornia',
			year : '2008'
		}
	];

	$scope.addCar = function()
	{
		var car = {
					brand: $scope.brand, 
					year:$scope.year
				};
		$scope.cars.push(car);
	};
	$scope.deleteCar = function(idx)
	{
		$scope.cars.splice(idx,1);
	}
});