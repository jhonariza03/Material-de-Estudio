'use strict';

var myAPPController = angular.module('myAPPController', []);
myAPPController.controller('controllerInicio',  function($scope, $rootScope, $location){
	$scope.irRegistroEmpleado = function(){
		$location.url('/registroEmpleado');
	}

	$scope.irListadoEmpleados = function(){
		if(localStorage.getItem('empleados') == null)
		{
			$rootScope.empleados = [];
		}
		else
		{
			$rootScope.empleados = JSON.parse(localStorage.getItem('empleados'));
		}

		$location.url('/listaEmpleados');
	}
});

myAPPController.controller('controllerRegistroEmpleado',  function($scope, $rootScope, $location){
	$scope.irInicio = function()
	{
		$location.url('/');
	}
	$scope.guardarEmpleado = function()
	{
		if(localStorage.getItem('empleados') == null)
		{
			$rootScope.empleados = [];
		}
		else
		{
			$rootScope.empleados = JSON.parse(localStorage.getItem('empleados'));
		}
		$rootScope.empleados.push(
		{
			nombre: $scope.nuevoEmpleado.nombre,
			apellido: $scope.nuevoEmpleado.apellido,
			salario: $scope.nuevoEmpleado.salario,
			telefono: $scope.nuevoEmpleado.telefono,
			email: $scope.nuevoEmpleado.email
		});

		localStorage.setItem('empleados',JSON.stringify($rootScope.empleados));
		$scope.nuevoEmpleado = null;
	}
});

myAPPController.controller('controllerListaEmpleados', function($scope, $rootScope, $location){
	$scope.irInicio = function(){
		$location.url('/');
	}
});