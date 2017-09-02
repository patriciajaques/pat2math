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
function changeColor() {
	//Se tiver uma janela modal do tour em aberto, a recompensa ainda não poderá ser acessada
	if (document.getElementsByClassName("jGuider ui-draggable").length !== 0) {
		alert ("Termine de ver o exercício resolvido antes de abrir a sua recompensa :D");
	}
	
	else {
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
}

function setBackgroundAzulCiano() {
	setBackgroundColor("rgb(224, 255, 255) none repeat scroll 0% 0%");
}

function setBackgroundVerde() {
	setBackgroundColor("rgb(202, 255, 194) none repeat scroll 0% 0%");
}

function setBackgroundAmarelo() {
	setBackgroundColor("rgb(255, 252, 220) none repeat scroll 0% 0%");
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
function finalReward() {
	
}