'use strict';

/* App Module */
/* se crea el modulo del aplicativo
/* se inicializa nuestros controladores
/* se inicializan los services, para posteriormente inyectarlos a nuestros controladores  */
var weatherApp = angular.module('weatherApp', [
  'weatherAppControllers'
]).directive('ngWeather', function() {
	return {
		restric: 'A', //restriccion de uso TIPO A : solo se puede llamar de la siguiente manera <div ng-clock></div>
		scope:{
			getCity: '='  // Definimos el Scope, es decir el parametro de entrada para nuestra directiva
		},
		template: '<h1 class="title forecast-font"> El Clima en: {{getCity.name}}</h1>' +
					'<div class="title">' +
						'<div class="normal-font">' +
							'<ul class="cast">' + 
								'<span class="danger-font">Coordenadas</span>' +
								'<dl>' +
									'<dt>Latitud:</dt>' +
									'<dd>{{weather.coord.lat}}</dd>' +
									'<dt>Longitud:</dt>' +
									'<dd>{{weather.coord.lon}}</dd>' +
								'</dl>' +
								'<span class="danger-font">Informacion:</span>' +
								'<dl>' +
									'<dt>Pais:</dt>' +
									'<dd>{{weather.sys.country}}</dd>' +
								'</dl>' +
								'<span class="danger-font">Clima</span>' +
								'<dl>' +
									'<dt>Descripcion:</dt>' +
									'<dd>{{weather.weather[0].description}}</dd>' +
								'</dl>' +
								'<span class="danger-font">Temperaturas y humedad</span>' +
								'<dl>' +
									'<dt>Temperatura promedio:</dt>' +
									'<dd>{{weather.main.temp}} &#176C</dd>' +
									'<dt>Temperatura Maxima:</dt>' +
									'<dd>{{weather.main.temp_max}} &#176C</dd>' +
									'<dt>Temperatura Minima:</dt>' +
									'<dd>{{weather.main.temp_min}} &#176C</dd>' +
									'<dt>Humedad:</dt>' +
									'<dd>{{weather.main.humidity}} %</dd>' +
									'<dt>Presion atmosferica:</dt>' +
									'<dd>{{weather.main.pressure}} hpa</dd>' +
								'</dl>' +
								'<span class="danger-font">Viento</span>' +
								'<dl>' +
									'<dt>Velocidad:</dt>' +
									'<dd>{{weather.wind.speed}} m/s</dd>' +
								'</dl>' +
							'</ul>' +
						'</div>' +
				   	'</div>', //El template es lo que se ve al momento de invokar la directiva en el DOM
		controller:['$scope','$http','$interval', function($scope, $http, $interval){ //El controlador le da funcionalidad a nuestra directiva, es decir la logica de nuestro reloj
			var url = "http://api.openweathermap.org/data/2.5/weather?id=";
			//esta funcion nos permite optener la informacion del clima, proveniente del API de OpenWeatherMap
			$scope.getWeather = function(cityCode){

				var lang = '&lang=es'; //Definimos el idioma de la prediccion del clima
				var metric = '&units=metric' //Definimos el tipo de unidad

				var full_url = url + cityCode + lang + metric;

				$http.get(full_url)
				.success(function(data, status, headers, config) {

					$scope.weather = data;

				}).error(function(data, status, headers, config) {

	  				$scope.weather = "no se encontro clima";
		  		});
			};
			
		}],
		link: function(scope, iElement, iAttrs, ctrl) {
			scope.getWeather(scope.getCity.code);
		}
	};
});

 