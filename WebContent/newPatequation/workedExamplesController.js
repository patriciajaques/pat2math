var tryResolveByMyself = false; //Fluxo alternativo dos exemplos trabalhados, quando o usuário seleciona que não tem certeza e quer tentar resolver sozinho
var alreadyReceivedSpecialReward = false; // Aqui deverá ser a verificação se o aluno já ganhou uma vez essa recompensa especial, se sim ele não pode ganhar novamente

function firstPlanAccess() {
	var idFirstEquation = planoAtual * 100;
	var numberCurrentPlan = planoAtual - 1000;
	
	loadExercise(idFirstEquation);
	
	$.guider({
    	description: "Você sabe resolver essa equação?",
        alignButtons: "right",
    	buttons: {
    		"Não": function() {var functionName = "classPlan" + numberCurrentPlan + "();"; setTimeout(functionName, 100);},
    		"Sim": true,
    		"Não tenho certeza": function() {imNotSure(numberCurrentPlan);}
    	}
    	            
    	}).show();
}

function imNotSure(plan) {
	$.guider({
    	description: "Deseja tentar resolver sozinho a primeira equação ou conferir um exercício resolvido?",
        alignButtons: "right",
    	buttons: {
    		"Quero ver um exercício resolvido": function() {var functionName = "classPlan" + plan + "();"; setTimeout(functionName, 100);},
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
        alignButtons: "right",
    	buttons: {
    		"Sim": { 			
    			click: function() {var functionName = "classPlan" + numberCurrentPlan + "();"; setTimeout(functionName, 100);},
    			className: "primary"
    		},
    		"Não": function() {if (alreadyReceivedSpecialReward === false) {questionSpecialReward(numberCurrentPlan);} else {$.guider({}).hideAll();}}
    	} 	            
    	}).show();
}

function questionSpecialReward(plan) {
	$.guider({
		title: "Tem certeza?",
		description: "Se você conferir o exercício resolvido, lhe daremos uma recompensa especial",
		alignButtons: "right",
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
	var functionName = "classPlan" + numberCurrentPlan + "();"; 
	setTimeout(functionName, 100);
	
}
