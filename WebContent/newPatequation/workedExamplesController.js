var tryResolveByMyself = false; //Fluxo alternativo dos exemplos trabalhados, quando o usuário seleciona que não tem certeza e quer tentar resolver sozinho
var alreadyReceivedSpecialReward = false; // Aqui deverá ser a verificação se o aluno já ganhou uma vez essa recompensa especial, se sim ele não pode ganhar novamente


function addWorkedExampleInEquationsMenu() {
	var idTasks = "tasks" + planoAtual;
	var numWorkedExample = planoAtual;
	
	var html = '<span class="taskWE" onclick="accessWorkedExample(' + numWorkedExample + ');" id="taskWE"' + planoAtual + '>' + equationsWE[numWorkedExample] + '</span><i style="margin-right: 6px" class="icon-pencil icon-white"></i> <i class="icon-ok  icon-white"></i><br>';
	document.getElementById(idTasks).innerHTML = html + document.getElementById(idTasks).innerHTML;
}

function accessWorkedExample(number) {
	var functionName = "classPlan" + number + "();";
	
	if (levelGamification === "full") {
		var botoes;
		switch(idioma) {
			default:
			case("pt-BR"):
				botoes= {
					"Sim": {click: function() {addOrRemoveScore(-8); loadExerciseWE(equationsWE[number], 0); setTimeout(functionName, 100);}, className: "primary" },
					"Não": function() {$.guider({}).hideAll();}
				}
				break;
			case("es-ES"):
				botoes= {
					"Sí": {click: function() {addOrRemoveScore(-8); loadExerciseWE(equationsWE[number], 0); setTimeout(functionName, 100);}, className: "primary" },
					"No": function() {$.guider({}).hideAll();}
				}
				break;
			case("en-GB"):
				botoes= {
					"Yes": {click: function() {addOrRemoveScore(-8); loadExerciseWE(equationsWE[number], 0); setTimeout(functionName, 100);}, className: "primary" },
					"No": function() {$.guider({}).hideAll();}
				}
				break;
		}
		$.guider({
			title: wecTXT[0],
			description: wecTXT[1],
		    alignButtons: "center",
			buttons: botoes
		}).show();
		
	}
	else {
		loadExerciseWE(equationsWE[number]); 
		setTimeout(functionName, 100);
	}
}

function firstPlanAccess() {
	
	if (isTourInterativo === false) {
		
		$("#topics").fadeOut();
	    $("#topicsAux").show();
	    
		var idFirstEquation = planoAtual * 100;
		var numberCurrentPlan = planoAtual;
		
		loadExercise(idFirstEquation);
		
		var botoes;
		switch(idioma) {
			default:
			case("pt-BR"):
				botoes = {
			    	"Não": function() {loadExerciseWE(equationsWE[numberCurrentPlan], 0); var functionName = "classPlan" + numberCurrentPlan + "();"; setTimeout(functionName, 100);},
			    	"Sim": function() {$.guider({}).hideAll(); $("#topics").fadeIn(); $("#topicsAux").hide(); if (planoAtual === 1013) reasonAndProportionNotice();},
			    	"Não tenho certeza": function() {imNotSure(numberCurrentPlan);}
			    }
				break;
			case("es-ES"):
				botoes = {
			    	"No": function() {loadExerciseWE(equationsWE[numberCurrentPlan], 0); var functionName = "classPlan" + numberCurrentPlan + "();"; setTimeout(functionName, 100);},
			    	"Sí": function() {$.guider({}).hideAll(); $("#topics").fadeIn(); $("#topicsAux").hide(); if (planoAtual === 1013) reasonAndProportionNotice();},
			    	"No estoy seguro": function() {imNotSure(numberCurrentPlan);}
			    }
				break;
			case("en-GB"):
				botoes = {
			    	"No": function() {loadExerciseWE(equationsWE[numberCurrentPlan], 0); var functionName = "classPlan" + numberCurrentPlan + "();"; setTimeout(functionName, 100);},
			    	"Yes": function() {$.guider({}).hideAll(); $("#topics").fadeIn(); $("#topicsAux").hide(); if (planoAtual === 1013) reasonAndProportionNotice();},
			    	"I'm not sure": function() {imNotSure(numberCurrentPlan);}
			    }
				break;
		}
		$.guider({
	    	name: "firstPlanAccess",
			title: wecTXT[2],
	        alignButtons: "center",
	        onShow: function() {document.getElementById("jGuider_firstPlanAccess").style.top = "250px";},
	    	buttons: botoes
	    	}).show();
	}
}

function imNotSure(plan) {
	
	var botoes;
	switch(idioma) {
		default:
		case("pt-BR"):
			botoes = {
				"Quero ver um exercício resolvido": function() {loadExerciseWE(equationsWE[plan], 0); var functionName = "classPlan" + plan + "();"; setTimeout(functionName, 100);},
		    	"Quero tentar resolver sozinho": function() {tryResolveByMyself = true; $.guider({}).hideAll(); $("#topics").fadeIn(); $("#topicsAux").hide(); if (planoAtual === 1013) reasonAndProportionNotice();}
		   	}
			break;
		case("es-ES"):
			botoes = {
				"Quiero ver un ejercicio resuelto": function() {loadExerciseWE(equationsWE[plan], 0); var functionName = "classPlan" + plan + "();"; setTimeout(functionName, 100);},
				"Quiero intentar resolver solo": function() {tryResolveByMyself = true; $.guider({}).hideAll(); $("#topics").fadeIn(); $("#topicsAux").hide(); if (planoAtual === 1013) reasonAndProportionNotice();}
		   	}
			break;
		case("en-GB"):
			botoes = {
				"I want to check a solved exercise": function() {loadExerciseWE(equationsWE[plan], 0); var functionName = "classPlan" + plan + "();"; setTimeout(functionName, 100);},
				"I want to try to solve it by myself": function() {tryResolveByMyself = true; $.guider({}).hideAll(); $("#topics").fadeIn(); $("#topicsAux").hide(); if (planoAtual === 1013) reasonAndProportionNotice();}
		   	}
			break;
	}
	
	$.guider({
    	title: wecTXT[3],
        alignButtons: "center",
    	buttons: botoes
    	            
    	}).show();
}



function firstErrorOrHint() {
	
	tryResolveByMyself = false;
	var numberCurrentPlan = planoAtual;
	
	var botoes;
	switch(idioma) {
		default:
		case("pt-BR"):
			botoes = {
		   		"Sim": {click: function() {loadExerciseWE(equationsWE[numberCurrentPlan], 0); var functionName = "classPlan" + numberCurrentPlan + "();"; setTimeout(functionName, 100);}, className: "primary"},
		   		"Não": function() {if (levelGamification === "full" && alreadyReceivedSpecialReward === false) {questionSpecialReward(numberCurrentPlan);} else {$.guider({}).hideAll();}}
		    }
			break;
		case("es-ES"):
			botoes = {
		   		"Sí": {click: function() {loadExerciseWE(equationsWE[numberCurrentPlan], 0); var functionName = "classPlan" + numberCurrentPlan + "();"; setTimeout(functionName, 100);}, className: "primary"},
		    	"No": function() {if (levelGamification === "full" && alreadyReceivedSpecialReward === false) {questionSpecialReward(numberCurrentPlan);} else {$.guider({}).hideAll();}}
		    }
			break;
		case("en-GB"):
			botoes = {
	    		"Yes": {click: function() {loadExerciseWE(equationsWE[numberCurrentPlan], 0); var functionName = "classPlan" + numberCurrentPlan + "();"; setTimeout(functionName, 100);}, className: "primary"},
	    		"No": function() {if (levelGamification === "full" && alreadyReceivedSpecialReward === false) {questionSpecialReward(numberCurrentPlan);} else {$.guider({}).hideAll();}}
	    	}
			break;
	}
	$.guider({
    	title: wecTXT[4],
		description: wecTXT[5],
        alignButtons: "center",
    	buttons: botoes	            
    	}).show();
}

function questionSpecialReward(plan) {
	
	var botoes;
	switch(idioma) {
		default:
		case("pt-BR"):
			botoes = {
				"Quero conferir e ganhar a recompensa! :D": {click: function() {getSpecialReward(plan);}, className: "primary"},
				"Não, obrigado.": function() {$.guider({}).hideAll();}
			}
			break;
		case("es-ES"):
			botoes = {
				"¡Quiero ver y ganar la recompensa! :D": {click: function() {getSpecialReward(plan);}, className: "primary"},
				"No, gracias.": function() {$.guider({}).hideAll();}
			}
			break;
		case("en-GB"):
			botoes = {
				"I want to check and win the reward! :D": {click: function() {getSpecialReward(plan);}, className: "primary"},
				"No, thanks.": function() {$.guider({}).hideAll();}
			}
			break;
	}
	$.guider({
		title: wecTXT[6],
		description: wecTXT[7],
		alignButtons: "center",
		onShow: function() {setCookieDays ("stepTour", "plan2Start", 1); setCookieDays ("functionTour", "plan2Explanation", 1);},
		buttons: botoes
	}).show();
}

function getSpecialReward(plan) {
	workedExamplesReward();
	saveWorkedExamplesReward();
	loadExerciseWE(equationsWE[plan], 0);
	var functionName = "classPlan" + plan + "();"; setTimeout(functionName, 100);
	
	setTimeout(functionName, 100);
	
}
