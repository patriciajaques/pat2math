var tryResolveByMyself = false; //Fluxo alternativo dos exemplos trabalhados, quando o usuário seleciona que não tem certeza e quer tentar resolver sozinho
var alreadyReceivedSpecialReward = false; // Aqui deverá ser a verificação se o aluno já ganhou uma vez essa recompensa especial, se sim ele não pode ganhar novamente

function firstPlanAccess() {
	var idFirstEquation = planoAtual * 100;
	var numberCurrentPlan = planoAtual - 1000;
	
	loadExercise(idFirstEquation);
	
	$.guider({
    	name: "firstPlanAccess",
		title: "Você sabe resolver essa equação?",
        alignButtons: "center",
        onShow: function() {document.getElementById("jGuider_firstPlanAccess").style.top = "250px";},
    	buttons: {
    		"Não": function() {loadExerciseWE(equationsWE[numberCurrentPlan]); var functionName = "classPlan" + numberCurrentPlan + "();"; setTimeout(functionName, 100);},
    		"Sim": true,
    		"Não tenho certeza": function() {imNotSure(numberCurrentPlan);}
    	}
    	            
    	}).show();
}

function imNotSure(plan) {
	$.guider({
    	title: "Deseja tentar resolver sozinho a primeira equação ou conferir um exercício resolvido?",
        alignButtons: "center",
    	buttons: {
    		"Quero ver um exercício resolvido": function() {loadExerciseWE(equationsWE[plan]); var functionName = "classPlan" + plan + "();"; setTimeout(functionName, 100);},
    		"Quero tentar resolver sozinho": function() {tryResolveByMyself = true; $.guider({}).hideAll();}
    	}
    	            
    	}).show();
}

function firstErrorOrHint() {
	tryResolveByMyself = false;
	var numberCurrentPlan = planoAtual - 1000;
	
	$.guider({
    	title: "Você gostaria de conferir um exercício resolvido antes de continuar?",
		description: "Recomendamos que sim para facilitar na resolução de suas suas dúvidas",
        alignButtons: "center",
    	buttons: {
    		"Sim": { 			
    			click: function() {loadExerciseWE(equationsWE[numberCurrentPlan]); var functionName = "classPlan" + numberCurrentPlan + "();"; setTimeout(functionName, 100);},
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
	//Colocar aqui os comandos para o usuário ganhar a recompensa especial
	alert ("Ainda estamos trabalhando na sua recompensa especial. Para garantir, peça ajuda ao membro do projeto que está acompanhando esta seção e diga a ele o seu nome e que você deseja receber a recompensa especial");
	loadExerciseWE(equationsWE[plan]);
	var functionName = "classPlan" + plan + "();"; setTimeout(functionName, 100);
	
	setTimeout(functionName, 100);
	
}
