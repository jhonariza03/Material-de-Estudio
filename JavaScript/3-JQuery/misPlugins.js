//http://html5facil.com/tutoriales/como-crear-plugins-para-jquery/
// Forma 1 para crear plugins en jquery
jQuery.fn.plugin_hide1 = function(){
	this.each(function(){
		elemento = $(this);
		elemento.hide(2000);
	});
};

// Forma 2 para crear plugins en jquery
(function($){
	$.fn.extend({
		plugin_hide2: function(){
			this.each(function(){
				elemento = $(this);
				elemento.hide(1000);
			});
		}
	})
})(jQuery);

$(document).ready(function(){
	$('#eliminar1').click(function(){
		$('#parrafo1').plugin_hide1();
	});

	$('#eliminar2').click(function(){
		$('#parrafo2').plugin_hide2();
	});
});