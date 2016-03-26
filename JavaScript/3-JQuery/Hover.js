$(document).ready(function(){
	$('li').filter(':odd').hide().end().filter(':even').hover(function(){
		$(this).toggleClass('active').next().stop(true,true).slideToggle();
	});
});

//:odd hace referencia a los elementos pares de un lista de objetos
//:even hace referencia a los elementos inpares de una lista de objetos
//.end() sirve para encadenar acciones sobre un mismo objeto
//.stop() detiene la animacion de los elementos seleccionados