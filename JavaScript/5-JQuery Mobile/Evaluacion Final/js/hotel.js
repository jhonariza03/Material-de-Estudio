function changePage(page) {

    $.mobile.changePage("#" + page, {
        transition: "none"
    });

}
var hotels = [];
var mapRegister;
$(document).ready(function() {
 	var latlngBegin = new google.maps.LatLng(4.716974612329769, -74.06696057812502); 
 	var marketRegister;
 	
    var latitudPunto;
    var longitudPunto;
    var directionsDisplay;
	var directionsService = new google.maps.DirectionsService();
	
  	$("#btnHotelRegister").click(function() {
        changePage("hotelRegisterPage");
        showRegisterMap();
    });

    $('.btnBack').click(function(){
    	 changePage("homePage");
    });

	$('#btnHotelList').click(function(){
    	 changePage("hotelsListPage");
    	 createHotelsList();
    });

    $('#backList').click(function(){
    	 changePage("hotelsListPage");
    	 createHotelsList();
    });


    $('#btnRoute').click(function(){
    	getCurrentPosition();
    });

	$('#btnSaveRegister').click(function(){
	 	var hotel = {            
            name: $("#name").val(),
            latitud: latitudPunto,
            longitud: longitudPunto,
            address: $("#address").val(),
            phone:$("#phone").val(),
            stars:$("#stars").val()          
        };
        hotels.push(hotel);
        alert("El Hotel fue registrado exitosamente!!!");
        $("#name").val('');
        $("#address").val('');
        $("#phone").val('');
        $("#stars").val('');
        marketRegister.setPosition(latlngBegin);
        mapRegister.setCenter(latlngBegin);
	});

    function showRegisterMap() {       
        var options = {            
            zoom: 5,
            center: latlngBegin,
            mapTypeId: google.maps.MapTypeId.ROADMAP        
        };                 
         mapRegister = new google.maps.Map(document.getElementById("divRegisterMap"), options);   

         marketRegister = new google.maps.Marker({            
            position: latlngBegin,
            map: mapRegister,
            draggable: true,
            title: "Mi punto!!"        
        });

        google.maps.event.addListener(marketRegister, 'dragend', function(event) {
            latitudPunto = event.latLng.lat();
            longitudPunto = event.latLng.lng();
            getMarkerAddress();
        });                  
    }


     function getMarkerAddress() {
        var geocoder = new google.maps.Geocoder();
        var latlngN = new google.maps.LatLng(latitudPunto, longitudPunto); 
        $.mobile.loading("show", {            
            text: "Convirtiendo Dirección...",
                        textVisible: true,
                        theme: "a",
                        textonly: false,
                        html: ''    
        });

        geocoder.geocode({
            'latLng': latlngN
        }, function(resultados, estado) {
            if (estado == google.maps.GeocoderStatus.OK) {
               $("#address").val(resultados[0].formatted_address);
                $.mobile.loading("hide");
            } else {
                $.mobile.loading("hide");
                alert('Error en el servicio!!: ' + estado);
            }
        });
    }

    function createHotelsList(){
	 	$('#hotelList').empty();
        for (var i = 0; i < hotels.length; i++) {
            var hotel = "";
            hotel += '<a href="#" class="ui-btn" onclick="showHotel('+i+')">';
            hotel += '<h3>' +hotels[i].name+ '</h3>';
            hotel += '<p>' + hotels[i].address + '</p>';
            hotel += '</a>';
            var item = "<li>" + hotel + "</li>";
            $("#hotelList").append(item);
        }
        $('#hotelList').listview('refresh');
    }

	
	function getCurrentPosition()
	{
		if(navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(exito,fallido,{
				maximumAge: 500000,
				enableHighAccuracy: true,
				timeout :6000
			});
		}
	}

	function exito(pos)
	{
		var marcador1;
		var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
		var positionHotel = new google.maps.LatLng($('#latitudView').val(), $('#longitudView').val());
		marcador1 = new google.maps.Marker({
			position: latlng,
			map: mapRegister,
			title:'Mi Punto Actual'
		});


		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(mapRegister);

		var peticion = {
			origin : latlng,
			destination: positionHotel,
			travelMode : google.maps.TravelMode.DRIVING
		};

		directionsService.route(peticion, function(respuesta, estado){
			if(estado == google.maps.DirectionsStatus.OK)
			{
				directionsDisplay.setDirections(respuesta);
				directionsDisplay.setOptions({
					suppressMarkers:true
				});
			}
			else
			{
				alert('Error en el servicio: '+estado);
			}
		});


	}

	function fallido(error)
	{
		if(error.code == 0)
		{
			alert('!Ops, No se puede obtener la posicion actual');
		}
		if(error.code == 1)
		{
			alert('!Ops, Algo salio mal');
		}
		if(error.code == 2)
		{
			alert('!Ops, No has aceptado compartir tu posicion');
		}
	}
   
});


function showHotel(position)
{
	changePage("hotelDataPage");
	var latlngBegin = new google.maps.LatLng(hotels[position].latitud, hotels[position].longitud); 
	var options = {            
            zoom: 5,
            center: latlngBegin,
            mapTypeId: google.maps.MapTypeId.ROADMAP        
        };                 
    mapRegister = new google.maps.Map(document.getElementById("divRegisterMapView"), options);   

    var marketRegister = new google.maps.Marker({            
        position: latlngBegin,
        map: mapRegister,
        title: hotels[position].name        
    }); 

    $("#nameView").val(hotels[position].name);
    $("#addressView").val(hotels[position].address);
    $("#phoneView").val(hotels[position].phone);
    $("#starsView").val(hotels[position].stars); 
    $("#latitudView").val(hotels[position].latitud);   
    $("#longitudView").val(hotels[position].longitud);    
}

