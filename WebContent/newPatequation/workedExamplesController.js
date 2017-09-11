var tryResolveByMyself = false; //Fluxo alternativo dos exemplos trabalhados, quando o usuário seleciona que não tem certeza e quer tentar resolver sozinho
var alreadyReceivedSpecialReward = false; // Aqui deverá ser a verificação se o aluno já ganhou uma vez essa recompensa especial, se sim ele não pode ganhar novamente


function addWorkedExampleInEquationsMenu() {
	var idTasks = "tasks" + planoAtual;
	var numWorkedExample = planoAtual - 1000;
	
	var html = '<span class="taskWE" onclick="accessWorkedExample(' + numWorkedExample + ');" id="taskWE"' + planoAtual + '>' + equationsWE[numWorkedExample] + '</span><i style="margin-right: 6px" class="icon-pencil icon-white"></i> <i class="icon-ok  icon-white"></i><br>';
	document.getElementById(idTasks).innerHTML = html + document.getElementById(idTasks).innerHTML;
}

function accessWorkedExample(number) {
	var functionName = "classPlan" + number + "();";
	
	if (levelGamification === "full") {
		$.guider({
			title: "Você deseja conferir este exercício resolvido?",
			description: "A visualização custará apenas 8 pontos (lembre-se que você tem direito à uma exibição gratuíta no início de cada plano de aula)",
	        alignButtons: "center",
	    	buttons: {
	    		"Sim": {
	    			click: function() {addOrRemoveScore(-8); loadExerciseWE(equationsWE[number], 0); setTimeout(functionName, 100);},
	    			className: "primary"
	    		},
	    		
	    		"Não": function() {$.guider({}).hideAll();}
	    	}
	    	            
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
	var numberCurrentPlan = planoAtual - 1000;
	
	loadExercise(idFirstEquation);
	
	$.guider({
    	name: "firstPlanAccess",
		title: "Você sabe resolver essa equação?",
        alignButtons: "center",
        onShow: function() {document.getElementById("jGuider_firstPlanAccess").style.top = "250px";},
    	buttons: {
    		"Não": function() {loadExerciseWE(equationsWE[numberCurrentPlan], 0); var functionName = "classPlan" + numberCurrentPlan + "();"; setTimeout(functionName, 100);},
    		"Sim": function() {$.guider({}).hideAll(); $("#topics").fadeIn(); $("#topicsAux").hide();},
    		"Não tenho certeza": function() {imNotSure(numberCurrentPlan);}
    	}
    	            
    	}).show();
	}
}

function imNotSure(plan) {
	$.guider({
    	title: "Deseja tentar resolver sozinho a primeira equação ou conferir um exercício resolvido?",
        alignButtons: "center",
    	buttons: {
    		"Quero ver um exercício resolvido": function() {loadExerciseWE(equationsWE[plan], 0); var functionName = "classPlan" + plan + "();"; setTimeout(functionName, 100);},
    		"Quero tentar resolver sozinho": function() {tryResolveByMyself = true; $.guider({}).hideAll(); $("#topics").fadeIn(); $("#topicsAux").hide();}
    	}
    	            
    	}).show();
}



function firstErrorOrHint() {
	tryResolveByMyself = false;
	var numberCurrentPlan = planoAtual - 1000;
	
	$.guider({
    	title: "Você gostaria de conferir um exercício resolvido antes de continuar?",
		description: "Recomendamos que sim para facilitar na resolução de suas dúvidas",
        alignButtons: "center",
    	buttons: {
    		"Sim": { 			
    			click: function() {loadExerciseWE(equationsWE[numberCurrentPlan], 0); var functionName = "classPlan" + numberCurrentPlan + "();"; setTimeout(functionName, 100);},
    			className: "primary"
    		},
    		"Não": function() {if (levelGamification === "full" && alreadyReceivedSpecialReward === false) {questionSpecialReward(numberCurrentPlan);} else {$.guider({}).hideAll();}}
    	} 	            
    	}).show();
}

function questionSpecialReward(plan) {
	$.guider({
		title: "Tem certeza?",
		description: "Se você conferir o exercício resolvido, lhe daremos uma recompensa especial",
		alignButtons: "center",
		onShow: function() {setCookieDays ("stepTour", "plan2Start", 1); setCookieDays ("functionTour", "plan2Explanation", 1);},
		buttons: {
			"Quero conferir e ganhar a recompensa! :D": {
				click: function() {getSpecialReward(plan);},
				className: "primary"
			},
		
			"Não, obrigado.": true
		}
	}).show();
}

function getSpecialReward(plan) {
	workedExamplesReward();
	saveWorkedExamplesReward();
	loadExerciseWE(equationsWE[plan], 0);
	var functionName = "classPlan" + plan + "();"; setTimeout(functionName, 100);
	
	setTimeout(functionName, 100);
	
}
