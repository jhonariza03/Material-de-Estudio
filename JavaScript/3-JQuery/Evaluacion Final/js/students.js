$(document).ready(function(){
    $('div').focusin(function(){
		$(this).find('span').css('display','inline').fadeOut(2000);
		$(this).find('span').css('color','red');
	});
    studentList();
    studentPassList();
	
	$('#bottonReg').click(function(e){
		e.preventDefault();
		var newCode = $('#code').val();
		var newName = $('#name').val();
		var newQualify = $('#qualify').val();

		if(newCode == "")
		{
			alert('Debe digitar el codigo del estudiante');
			return;
		}
		if(newName == "")
		{
			alert('Debe digitar el nombre del estudiante');
			return;
		}
		if(newQualify == "")
		{
			alert('Debe digitar la calificación del estudiante');
			return;
		}
		else if( parseFloat(newQualify) > 5)
		{
			alert('La nota debe ser de 0 a 5');
			return;
		}

		if(confirm('Esta seguro de ingresar el nuevo estudiante?'))
		{
			var code = $('#code').val();
			var name = $('#name').val();
			var qualify = $('#qualify').val();
			var student = {
				code: code,
				name: name,
				qualify: qualify
			};
			localStorage.setItem(code, JSON.stringify(student));
			restart();
			studentList();
			studentPassList();
			restart();
			alert('Estudiante Registrado');
		}
	});

	$('#studentAverage').click(function(e){
		e.preventDefault();
		var average = 0.0;
		for (var i = 0; i < localStorage.length; i++) {
			var clave = localStorage.key(i);
        	var student = $.parseJSON(localStorage.getItem(clave));
			average += parseFloat(student.qualify);
		}
		average = average / localStorage.length;
		alert ('El Promedio de Notas de los estudiantes es: '+  average.toFixed(2));
	});

	$('#bestQualify').click(function(e){
		e.preventDefault();
		var maxQualifyPos = 0;
		var clave = localStorage.key(maxQualifyPos);
        var student = $.parseJSON(localStorage.getItem(clave));
		for (var i = 1; i < localStorage.length; i++) {
			var claveNew = localStorage.key(i);
        	var studentNew = $.parseJSON(localStorage.getItem(claveNew));
			if(parseFloat(studentNew.qualify) > parseFloat(student.qualify))
			{
				student = studentNew;
				maxQualifyPos = i;
			}
		}
		clave = localStorage.key(maxQualifyPos);
        student = $.parseJSON(localStorage.getItem(clave));
		alert('El estudiante con mayor nota es: '+ student.name);
	});

	$('#badQualify').click(function(e){
		e.preventDefault();
		var maxQualifyPos = 0;
		var clave = localStorage.key(maxQualifyPos);
        var student = $.parseJSON(localStorage.getItem(clave));
		for (var i = 1; i < localStorage.length; i++) {
			var claveNew = localStorage.key(i);
        	var studentNew = $.parseJSON(localStorage.getItem(claveNew));
			if(parseFloat(studentNew.qualify) < parseFloat(student.qualify))
			{
				student = studentNew;
				maxQualifyPos = i;
			}
		}
		clave = localStorage.key(maxQualifyPos);
        student = $.parseJSON(localStorage.getItem(clave));
		alert('El estudiante con menor nota es: '+ student.name);
	});

});

function editStudent(code) {
    var student;
    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        if (clave == code) {
            student = $.parseJSON(localStorage.getItem(clave));
            $("#code").val(student.code);
            $("#name").val(student.name);
            $("#qualify").val(student.qualify);
        }
    }
}

function deleteStudent(code) {
    localStorage.removeItem(code);
    studentList();
    studentPassList();
}

function studentList(){
	var table = "";
    var content = $("#students");
    table += '<table border="1" class="studentsTable">';
    table += '<tr class="studentTitle">';
    table += '<th>Codigo</th>';
    table += '<th>Nombre</th>';
    table += '<th>Nota</th>';
    table += '<th>Editar</th>';
    table += '<th>Eliminar</th>';
    table += '</tr>';
    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        var student = $.parseJSON(localStorage.getItem(clave));
        table += '<tr>';
        table += '<td>' + student.code + '</td>';
        table += '<td>' + student.name + '</td>';
        table += '<td>' + student.qualify + '</td>';
        table += '<td><button onclick="editStudent(\'' + student.code + '\');">Editar</button></td>';
        table += '<td><button onclick="deleteStudent(\'' + student.code + '\');">Eliminar</button></td>';
        table += '</tr>';
    }
    table += '</table>';
    $(content).html(table);
}

function studentPassList(){
	var table = "";
    var content = $("#studentsPass");
    table += '<table border="1" class="studentsTable">';
    table += '<tr class="studentTitle">';
    table += '<th>Codigo</th>';
    table += '<th>Nombre</th>';
    table += '<th>Nota</th>';
    table += '</tr>';
    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        var student = $.parseJSON(localStorage.getItem(clave));
        if(parseFloat(student.qualify) >= 3.0 )
        {
	        table += '<tr>';
	        table += '<td>' + student.code + '</td>';
	        table += '<td>' + student.name + '</td>';
	        table += '<td>' + student.qualify + '</td>';
	        table += '</tr>';
    	}
    }
    table += '</table>';
    $(content).html(table);
}

function restart() {
    $("#code").val("");
    $("#name").val("");
    $("#qualify").val("");
}