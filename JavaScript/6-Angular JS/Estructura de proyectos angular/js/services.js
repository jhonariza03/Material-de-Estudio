'use strict';
var carAppServices = angular.module('carAppServices', []);
carAppServices.factory('Car', [ function(){
	return {
		notify : function(msg)
		{
			alert(msg);
		}
	};
}]);