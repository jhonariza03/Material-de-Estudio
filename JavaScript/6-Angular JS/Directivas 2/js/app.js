'use strict';

var weatherApp = angular.module('weatherApp', [
	'weatherAppControllers'
	]).directive('ngWeather',function(){
		return {
			restric:'A',
			scope:{
				getCity: '='
			},
			template: '<h1 class="title forecast-font">El clima en: {{getCity.name}}</h1>'+
					  	'<div class="title">'+
					  		'<div class="normal-font">'+
					 			 '<ul class="cast">'+
						 			 '<span class="danger-font">Coordenadas</span>'+
						  			 '<dl>'+
						  			 	 '<dt>Latitud:</dt>'+
							  			 '<dd>{{weather.cord.lat}}</dd>'+
							  			 '<dt>Longitud:</dt>'+
							  			 '<dd>{{weather.cord.lon}}</dd>'+
						  			 '</dl>'+
						  			 '<span class="danger-font">Información:</span>'+
						  			 '<dl>'+
						  			 	 '<dt>País:</dt>'+
							  			 '<dd>{{weather.sys.country}}</dd>'+
						  			 '</dl>'+
						  			 '<span class="danger-font">Clima:</span>'+
						  			 '<dl>'+
						  			 	 '<dt>Descripción:</dt>'+
							  			 '<dd>{{weather.weather[0].description}}</dd>'+
						  			 '</dl>'+
						  			 '<span class="danger-font">Temperaturas y Humedad:</span>'+
						  			 '<dl>'+
						  			 	 '<dt>Temperatura promedio:</dt>'+
							  			 '<dd>{{weather.main.temp}} °C</dd>'+
							  			 '<dt>Temperatura Máxima:</dt>'+
							  			 '<dd>{{weather.main.temp_max}} °C</dd>'+
							  			 '<dt>Temperatura Mínima:</dt>'+
							  			 '<dd>{{weather.main.temp_min}} °C</dd>'+
							  			 '<dt>Humedad:</dt>'+
							  			 '<dd>{{weather.main.humidity}} °C</dd>'+
							  			 '<dt>Presión Atmosférica:</dt>'+
							  			 '<dd>{{weather.main.pressure}} °C</dd>'+
						  			 '</dl>'+
						  			 '<span class="danger-font">Viento:</span>'+
						  			 '<dl>'+
						  			 	 '<dt>Velocidad:</dt>'+
							  			 '<dd>{{weather.wind.speed}} m/s</dd>'+
						  			 '</dl>'+
						  		'</ul>'+
						  	'</div>'+
						  '</div>',
			controller:['$scope', '$http', '$interval', function($scope, $http, $interval){
				var url = 'http://api.openweathermap.org/data/2.5/weather?id=';
				$scope.getWeather = function(cityCode){
					var lang = '&lang=es';
					var metric='&units=metric';
					var full_url = url + cityCode + lang + metric;
					$http.get(full_url).success(function(data, status, headers, config){
						$scope.weather = data;
					}).error(function(data, status, headers, config){
						$scope.weather = 'No se encontró el clima.';
					});
				}
			}],
			link: function(scope, iElement, iAttrs, crtl){
				scope.getWeather(scope.getCity.code);
			}			 
		};
	});