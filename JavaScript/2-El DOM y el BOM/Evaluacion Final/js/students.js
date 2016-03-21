var jsonStudents = [
	{"code":"002","name":"Katerine Guacheta","qualify":"4.0"},
	{"code":"003","name":"Adriana Patricia Quevedo","qualify":"3.8"},
	{"code":"004","name":"Jorge Ernesto Ariza","qualify":"4.2"},
	{"code":"001","name":"Jhon Edison Ariza","qualify":"5.0"},
	{"code":"005","name":"Edgar Eduardo Piñeros","qualify":"3.1"},
	{"code":"006","name":"Andres Jose Perilla","qualify":"3.6"},
	{"code":"007","name":"Laura Valentina Solano","qualify":"2.5"},
	{"code":"010","name":"Sandra Patricia Gonzalez","qualify":"1.5"},
	{"code":"008","name":"Jorge Alejandro Barahona","qualify":"3.6"},
	{"code":"009","name":"Diego Mauricio Cruz","qualify":"4.7"}
];

var saveStudent = document.getElementById('saveStudent');
var studentList = document.getElementById('studentList');
var studentAverage = document.getElementById('studentAverage');
var bestQualifyb = document.getElementById('bestQualify');
var badQualifyb = document.getElementById('badQualify');

saveStudent.addEventListener('click',saveStudents);
studentList.addEventListener('click',showStudents);
studentAverage.addEventListener('click',average);
bestQualifyb.addEventListener('click',bestQualify);
badQualifyb.addEventListener('click',badQualify);

function showStudents()
{
	createTableStudents(jsonStudents);
}

function average()
{
	calculateQualifyAverage(jsonStudents);
}

function bestQualify()
{
	bestStudent(jsonStudents);
}

function badQualify()
{
	badStudent(jsonStudents);
}

function showStudentsPass()
{
	createTableStudentsPass(jsonStudents);
}

function createTableStudents(json)
{
	var tableStudents = document.getElementById("resultContent");
	var trTitle = document.createElement('tr');
	trTitle.className='studentTitle';
	var tdTitleCode = document.createElement('td');
	var tdTitleName = document.createElement('td');
	var tdTitleQualify = document.createElement('td');
	tdTitleCode.textContent = 'Código';
	tdTitleName.textContent = 'Nombre';
	tdTitleQualify.textContent = 'Calificación';
	tableStudents.appendChild(trTitle);
	trTitle.appendChild(tdTitleCode);
	trTitle.appendChild(tdTitleName);
	trTitle.appendChild(tdTitleQualify);
	for (var i = 0; i < json.length; i++) {
		var trContent = document.createElement('tr');
		var tdCode = document.createElement('td');
		var tdName = document.createElement('td');
		var tdQualify = document.createElement('td');
		tdCode.textContent = json[i].code;
		tdName.textContent = json[i].name;
		tdQualify.textContent = json[i].qualify;
		trContent.appendChild(tdCode);
		trContent.appendChild(tdName);
		trContent.appendChild(tdQualify);
		tableStudents.appendChild(trContent);
	};
	document.getElementById('studentList').disabled = true;
}

function calculateQualifyAverage(json)
{
	var average = 0.0;
	for (var i = 0; i < json.length; i++) {
		average += parseFloat(json[i].qualify);
	}
	average = average / json.length;
	alert ('El Promedio de Notas de los estudiantes es: '+  average.toFixed(2));
}

function bestStudent(json)
{
	var maxQualifyPos = 0;
	for (var i = 1;i < json.length; i++) {
		if(parseFloat(json[i].qualify) > parseFloat(json[maxQualifyPos].qualify))
		{
			maxQualifyPos = i;
		}
	}

	alert('El estudiante con mayor nota es: '+ json[maxQualifyPos].name);
}

function badStudent(json)
{
	var minQualifyPos = 0;
	for (var i = 1;i < json.length; i++) {
		if(parseFloat(json[i].qualify) < parseFloat(json[minQualifyPos].qualify))
		{
			minQualifyPos = i;
		}
	}

	alert('El estudiante con menor nota es: '+ json[minQualifyPos].name);
}

function createTableStudentsPass(json)
{
	var tableStudents = document.getElementById("resultContentPass");
	var trTitle = document.createElement('tr');
	trTitle.className='studentTitle';
	var tdTitleCode = document.createElement('td');
	var tdTitleName = document.createElement('td');
	var tdTitleQualify = document.createElement('td');
	tdTitleCode.textContent = 'Código';
	tdTitleName.textContent = 'Nombre';
	tdTitleQualify.textContent = 'Calificación';
	tableStudents.appendChild(trTitle);
	trTitle.appendChild(tdTitleCode);
	trTitle.appendChild(tdTitleName);
	trTitle.appendChild(tdTitleQualify);
	for (var i = 0; i < json.length; i++) {
		if(parseFloat(json[i].qualify) >= 3.0 )
		{
			var trContent = document.createElement('tr');
			var tdCode = document.createElement('td');
			var tdName = document.createElement('td');
			var tdQualify = document.createElement('td');
			tdCode.textContent = json[i].code;
			tdName.textContent = json[i].name;
			tdQualify.textContent = json[i].qualify;
			trContent.appendChild(tdCode);
			trContent.appendChild(tdName);
			trContent.appendChild(tdQualify);
			tableStudents.appendChild(trContent);
		}
	};
	document.getElementById('aprovedStudent').disabled = true;
}

function saveStudents()
{

	var newCode = document.getElementById('code').value;
	var newName = document.getElementById('name').value;
	var newQualify = document.getElementById('qualify').value;

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
		var student = {};
		student.code = newCode;
		student.name = newName;
		student.qualify =  newQualify;
		jsonStudents.push(student);
		if(document.getElementById('resultContent').childNodes.length > 1)
		{
			var tableStudents = document.getElementById('resultContent');
			var row =  tableStudents.insertRow(jsonStudents.length);
			var cell1 = row.insertCell(0);
		    var cell2 = row.insertCell(1);
		    var cell3 = row.insertCell(2);
		    cell1.innerHTML = student.code ;
		    cell2.innerHTML = student.name;
		    cell3.innerHTML = student.qualify;
		}
		else
		{
			createTableStudents(jsonStudents);
		}

		if(document.getElementById('resultContentPass').childNodes.length > 1)
		{
			if(parseFloat(student.qualify) >= 3.0)
			{
				var tableStudentsPass = document.getElementById('resultContentPass');
				var row =  tableStudentsPass.insertRow(tableStudentsPass.childNodes.length - 1);
				var cell1 = row.insertCell(0);
			    var cell2 = row.insertCell(1);
			    var cell3 = row.insertCell(2);
			    cell1.innerHTML = student.code ;
			    cell2.innerHTML = student.name;
			    cell3.innerHTML = student.qualify;
			}
		}

		document.getElementById('studentForm').reset();
		alert('El estudiante a sido ingresado');
	}
}