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