function init(){

	document.getElementById("settings_output").style.display = 'none';
	document.getElementById("workarea_output").style.display = 'none';
}

function addRow(Counter, ReferencePhrase, PhraseSwitch) {

	var table = document.getElementById("dataTable");
	var row = table.insertRow();
	row.insertCell().innerHTML = Counter;
	row.insertCell().innerHTML = ReferencePhrase;
	for (var e = 0; e < PhraseSwitch.length; e++){
		row.insertCell().innerHTML = PhraseSwitch[e];
	}

}

function sort() {

	var textArea = document.getElementById("InputArea").value;
	var textAreaClean = textArea.replace("'", "");
	//alert(textAreaClean);
	var allRows = textAreaClean.split('\n');

	// --------------------------------------------------------------------

	var howManyColumns = (allRows[0].split('\t')).length;
	console.log("INPUT: " + howManyColumns + " colonne");

	for (a = 0; a < howManyColumns; a++){
		eval("var column" + a + " = [];");
	}

	// --------------------------------------------------------------------

	console.log("Raccolgo in allValues i valori di tutte le celle e alimento un array per colonna:");

	var allValues = [];

	for (i = 0; i < allRows.length; i++){
		var cellsOfThisRow = allRows[i].split('\t');

		for (a = 0; a < howManyColumns; a++){
			var thisCell = cellsOfThisRow[a];
			eval("column" + a + ".push('" + thisCell + "');");
			allValues.push(thisCell);
		}
	}

	// --------------------------------------------------------------------
	// Tolgo l'intestazione fissa dagli array delle colonne





	for (a = 0; a < howManyColumns; a++){

		eval("var headingOfColumn" + a + " = column" + a + ".slice(0, rowsSettedAsHeader);");
		
		for (n=0;n<rowsSettedAsHeader;n++){
			eval("column" + a + ".shift();");
		}

	}

	//	alert(headingOfColumn);
	//	alert(column1);

	// --------------------------------------------------------------------

	// Ciclo le colonne, riordino e tolgo i duplicati
	for (a = 0; a < howManyColumns; a++){
		eval("column" + a + ".sort()");
		eval("column" + a + " =  column" + a + ".filter(function(elem, index, self) {return index == self.indexOf(elem);})");
		eval("console.log('Column"+a+" = ' + column"+a+");");
	}

	// Riordino allValues e gli tolgo i duplicati
	var allValues = allValues.filter(function(elem, index, self) {
		return index == self.indexOf(elem);
	})
	allValues.sort();
	console.log(allValues);
	var howManyRows = allValues.length;

	// --------------------------------------------------------------------

	console.log("--------------------");
	console.log("SWITCH VIEW");

	document.getElementById("workarea_input").style.display = 'none';
	document.getElementById("workarea_output").style.display = 'block';

	// --------------------------------------------------------------------
	var valoriRigaz = ["QQQ", "WWW"];

		for (n=0;n<rowsSettedAsHeader;n++){
			var actualRow = [];
			for (a = 0; a < howManyColumns; a++){
				eval("actualRow.push(headingOfColumn" + a + "[n])");
				//actualRow.push(y);
			}
			addRow("", "", actualRow);
		}


	// --------------------------------------------------------------------

	console.log("OUTPUT: " + howManyRows + " righe");


	// Nella prossima parte di codice devo fare gli indexof per poi fornire i valori delle singole righe per poi popolare la tabella

	for (r = 0; r < howManyRows; r++){

		referenceRowString = allValues[r];
		var howMany = 0;
		var actualRow = [];
		var indice = "-2";
		var createRow = false;

		for (c = 0; c < howManyColumns; c++){

			// Qui dentro va confrontato il valore di ogni cella con quello principale di riga.
			// Se il valore è presente (cioé ha un indexof >=0) il valore principale viene pushato nell'array, altrimenti viene pushata una stringa vuota.

			eval("var indice = column" + c + ".indexOf(referenceRowString);");
			var y = (indice >= 0 ? referenceRowString : "");
			if (indice >= 0) howMany++;
			if (y != "") createRow = true;

			actualRow.push(y);

		}
		if (createRow){
			addRow(howMany, allValues[r], actualRow);
		}
	}


	var els = document.getElementById("dataTable").getElementsByTagName("td");

	var headingCells = rowsSettedAsHeader * (howManyColumns + 2);
	for(var i=0;i<headingCells;i++){
	  els[i].style.background = "yellow";
	  els[i].style.fontWeight = "bold";
	}
	//document.getElementById("settings_input").style.display="none";
}


// -----------------------------------
var rowsSettedAsHeader = 0;
function setHeading(index){

	if (rowsSettedAsHeader == index) {
		document.getElementById("headingCover").style.display = 'none';
		rowsSettedAsHeader = 0;
		index = 0;
	} else {
		rowsSettedAsHeader = index;
		document.getElementById("headingCover").style.display = 'block';
	}

	for (var i = 1; i <= 7; i++){
		document.getElementById("headingScale"+i).style.backgroundColor = 'lightgray';
	}
	for (var i = 1; i <= index; i++){
		document.getElementById("headingScale"+i).style.backgroundColor = 'gray';
	}

	var headerCoverHeight = (index * 12) + 1;
	document.getElementById("headingCover").style.height = headerCoverHeight;

}