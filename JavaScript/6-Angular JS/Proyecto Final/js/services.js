'use strict';
var motoAppServices = angular.module('motoAppServices', ['ngResource']);
motoAppServices.factory('Moto', ['$resource',
	function($resource){
		return $resource('motos/:motoId.json',{},{
			query:{method:'GET',params:{motoId: 'motos'}, isArray:true}
		});
}]);