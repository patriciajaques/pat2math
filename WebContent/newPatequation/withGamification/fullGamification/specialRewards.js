function workedExamplesReward() {
	document.getElementById("rewardWorkedExamples").style.display = "inline";
	$("#rewardWorkedExamples").tooltip();
}

function saveWorkedExamplesReward() {
	$.ajax({
		type : "GET",
		url : "newPatequation/saveRewardWorkedExamples",
		data : {

		},
		success : function(data) {
			console.log("Recompensa adquirida com sucesso");
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ocorreu um erro inesperado");
		}
	});
	
}

function finalReward() {
	$("#help-box").html("<img src='/pat2math/patequation/img/ImLegend2.png' width='358px' height='500px'></img><div style='cursor: pointer; margin-top: 42px; font-size: 74px; '><a href=# onclick=closeWindow() style='font-size: 74px;'>I'm Legend</a></div><div id='theEnd' style='cursor: pointer; visibility: hidden; margin-top: 68px; '><a href=# onclick='closeWindow()' style='font-size: 22px'>The End?</a></div> <script> setTimeout(function() {document.getElementById('theEnd').style.visibility = 'visible'}, 4000); </script>");
	$("#mask").fadeIn(700);
	$("#help-box").fadeIn(700);
	document.getElementById("imLegend").style.visibility = "visible";
	$.ajax({
		type : "GET",
		url : "newPatequation/saveRewardFinal",
		data : {

		},
		success : function(data) {
			console.log("Recompensa adquirida com sucesso");
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ocorreu um erro inesperado");
		}
	});
}

function changeColor() {
	var description = '<a href=# onclick="setBackgroundAzul()">Azul</a>' +
					  '<br><a href=# onclick="setBackgroundVerde()">Verde</a>' +
					  '<br><a href=# onclick="setBackgroundAmarelo()">Amarelo</a>' +
					  '<br><a href=# onclick="setBackgroundRosa()">Rosa</a>' +
					  '<br><a href=# onclick="setBackgroundAzulCiano()">Azul Ciano</a>' +
					  '<br><a href=# onclick="setBackgroundCinza()">Cinza</a>' +
					  '<br><a href=# onclick="setBackgroundBranco()">Branco</a>';
	
	$.guider({
		title: "Escolha uma cor de fundo para o PAT2Math",
        alignButtons: "center",
        description: description,
        buttons: {
    		"OK": { 			
    			click: true,
    			className: "primary"
    		}
        }           
    	}).show();
}

function setBackgroundAzulCiano() {
	setBackgroundColor("rgb(224, 255, 255) none repeat scroll 0% 0%");
}

function setBackgroundVerde() {
	setBackgroundColor("rgb(202, 255, 194) none repeat scroll 0% 0%");
}

function setBackgroundAmarelo() {
	setBackgroundColor("rgb(255, 247, 163) none repeat scroll 0% 0%");
}

function setBackgroundRosa() {
	setBackgroundColor("rgb(255, 225, 248) none repeat scroll 0% 0%");
}

function setBackgroundAzul() {
	setBackgroundColor("rgb(230, 230, 250) none repeat scroll 0% 0%");
}

function setBackgroundCinza() {
	setBackgroundColor("rgb(236, 236, 236) none repeat scroll 0% 0%");
}

function setBackgroundBranco() {
	setBackgroundColor("white");
}

