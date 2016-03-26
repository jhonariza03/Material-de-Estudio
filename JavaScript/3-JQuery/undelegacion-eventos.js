$(document).ready(function(){
	$('body').delegate('p','click', function(){
		$('#parrafo_nuevo').append(' Este parrafo es nuevo y tiene el mismo evento.');
	});

	$('#undelegate').click(function(){
		$('body').undelegate();
	});
});