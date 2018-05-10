function introduction (nextStep) {
	blockMenu = true;

	var botao1;
	var botao2;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {Próximo: {click: true, className: "primary"}}
			botao2 = {Voltar: true, OK: {click: true, className: "primary"}}
			break;
		case("es-ES"):
			botao1 = {Siguiente: {click: true, className: "primary"}};
			botao2 = {Volver: true, OK: {click: true, className: "primary"}}
			break;
		case("en-UK"):
			botao1 = {Next: {click: true, className: "primary"}}
			botao2 = {Back: true, OK: {click: true, className: "primary"}}
			break;
	}
	
	if (nextStep === "") {
		$.guider({
			name: "start",
			next: "start2",
			title: tourTXT[0],
			description: tourTXT[1],    
			alignButtons: "right",
			onShow: function() {isTourInterativo = true; loadExercise(3); setCookieDays ("stepTour", "start2", 1); setCookieDays ("functionTour", "introduction", 1);},
			buttons: botao1
		}).show();
	}
	
	else {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img>" + tourTXT[2] + "</center>",
			description : tourTXT[3],
			overlay : "dark",
			width : 600,
			alignButtons : "right",
			buttons : botao1
		}).show();
	}
	
	$.guider({
		name: "start",
		next: "start2",
		title: tourTXT[0],
		description: tourTXT[1],    
		alignButtons: "right",
		onShow: function() {setCookieDays ("stepTour", "start", 1); setCookieDays ("functionTour", "introduction", 1);},
		buttons: botao1
	});
		
	$("#line3").guider({
		name: "start2",
        next: "start3",
		title: tourTXT[4],
		description: tourTXT[5] + '<img src=/pat2math/patequation/img/lupa.png></img>',  
		width: 600,
		position: "bottom",
		alignButtons: "right",
		onShow: function() {setCookieDays ("stepTour", "start2", 1); setCookieDays ("functionTour", "introduction", 1);},
		buttons: botao2
	});         
}

function introductionWithWelcome (nextStep) {
	blockMenu = true;
	
	var botao1;
	var botao2;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {Próximo: {click: true, className: "primary"}}
			botao2 = {Voltar: true, OK: {click: true, className: "primary"}}
			break;
		case("es-ES"):
			botao1 = {Siguiente: {click: true, className: "primary"}};
			botao2 = {Volver: true, OK: {click: true, className: "primary"}}
			break;
		case("en-UK"):
			botao1 = {Next: {click: true, className: "primary"}}
			botao2 = {Back: true, OK: {click: true, className: "primary"}}
			break;
	}
	
	if (nextStep === "") {
		$.guider({
			name: "start",
			next: "start2",
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br>" + tourTXT[7] + "</center>",
			description : "<center>" + tourTXT[6] + "</center>",
			overlay : "dark",
			width : 600,
			alignButtons : "right",
			buttons : botao1
		}).show();
	}
	
	else {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img>" + tourTXT[2] + "</center>",
			description : tourTXT[3],
			overlay : "dark",
			width : 600,
			alignButtons : "right",
			buttons : botao1
		}).show();
	}
	
	$.guider({
		name: "start",
		next: "start2",
		title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br>" + tourTXT[7] + "</center>",
		description : "<center>" + tourTXT[6] + "</center>",
		overlay : "dark",
		width : 600,
		alignButtons : "right",
		buttons : botao1
	}).show();
	
	$.guider({
		name: "start2",
		next: "start3",
		title: tourTXT[0],
		description: tourTXT[1],    
		alignButtons: "right",
		onShow: function() {isTourInterativo = true; loadExercise(3); setCookieDays ("stepTour", "start2", 1); setCookieDays ("functionTour", "introduction", 1);},
		buttons: botao1
	});
	
	$.guider({
		name: "start3",
		next: "start4",
		title: tourTXT[0],
		description: tourTXT[1],    
		alignButtons: "right",
		onShow: function() {setCookieDays ("stepTour", "start", 1); setCookieDays ("functionTour", "introduction", 1);},
		buttons: botao1
	});
		
	$("#line3").guider({
		name: "start4",
		title: tourTXT[4],
		description: tourTXT[5] + '<img src=/pat2math/patequation/img/lupa.png></img>',  
		width: 600,
		position: "bottom",
		alignButtons: "right",
		onShow: function() {setCookieDays ("stepTour", "start2", 1); setCookieDays ("functionTour", "introduction", 1);},
		buttons: botao2
	});         
}

//O título e a descrição devem variar se o usuário acertou o errou o passo
//Acertou: 
//title: "Muito bem!",
//description: "Por acertar este passo da equação, você ganhou 10 pontos.",

function firstStepTour (nextStep, title, description) {
	
	var botao1;
	var botao2;
	var botao3;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {Próximo: {click: true, className: "primary"}}
			botao2 = {Voltar: true, Próximo: {click: true, className: "primary"}}
			botao3 = {Voltar: true, OK: {click: true, className: "primary"}}
			break;
		case("es-ES"):
			botao1 = {Siguiente: {click: true, className: "primary"}};
			botao2 = {Volver: true, Siguiente: {click: true, className: "primary"}}
			botao3 = {Volver: true, OK: {click: true, className: "primary"}}
			break;
		case("en-UK"):
			botao1 = {Next: {click: true, className: "primary"}}
			botao2 = {Back: true, Next: {click: true, className: "primary"}}
			botao3 = {Back: true, OK: {click: true, className: "primary"}}
			break;
	}
	
	if (nextStep === "") {
		$.guider({
			name: "fstep",
	    	next: "fstep2",
	    	title: title,
	    	description: description,
	    	alignButtons: "right",
	    	onShow: function() {setCookieDays ("stepTour", "fstep", 1); setCookieDays ("functionTour", "firstStepTour", 1);},
	    	buttons: botao1
	    }).show();
	}
	
	else {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img>" + tourTXT[2] + "</center>",
			description : tourTXT[3],
			overlay : "dark",
			width : 600,
			alignButtons : "right",
			buttons : botao1
		}).show();
	}
	
	$.guider({
		name: "fstep",
    	next: "fstep2",
    	title: title,
    	description: description,
    	alignButtons: "right",
    	onShow: function() {setCookieDays ("stepTour", "fstep", 1); setCookieDays ("functionTour", "firstStepTour", 1);},
    	buttons: botao1
    });
    	    
    $("#note").guider({
    	name: "fstep2",
    	next: "fstep3",
    	title: tourTXT[8],
    	description: tourTXT[9],
    	position: "left",
    	alignButtons: "right",
    	onShow: function() {setCookieDays ("stepTour", "fstep2", 1); setCookieDays ("functionTour", "firstStepTour", 1);},
    	buttons: botao2
    	});
    	    
    	    $("#note").guider({
    			name: "fstep3",
    			next: "fstep4",
    			title: tourTXT[10],
    			description: tourTXT[11],
    			position: "left",
    			alignButtons: "right",
    			onShow: function() {setCookieDays ("stepTour", "fstep3", 1); setCookieDays ("functionTour", "firstStepTour", 1);},
    			buttons: botao2
    		});

    		$.guider({
    			name: "fstep4",
    			next: "fstep5",
    			position: "right",
    			title: tourTXT[12],
    			description: tourTXT[13],    
    			alignButtons: "right",
    			onShow: function() {generateStages(1);},
    			buttons: botao1
    		});
    	    
    	    $("#hint").guider({
    			name: "fstep5",
    			next: "fstep6",
    			title: tourTXT[14],
    			description: tourTXT[15],
    			position: "bottom",
    			alignButtons: "right",
    			onShow: function() {setCookieDays ("stepTour", "fstep4", 1); setCookieDays ("functionTour", "firstStepTour", 1);},
    			buttons: botao2
    		});
    	    
    	    $("#freeHints").guider({
    			name: "fstep6",
    			next: "fstep7",
    			title: tourTXT[16],
    			description: tourTXT[17],
    			position: "left",
    			alignButtons: "right",
    			buttons: botao1
    		});
    		
    		$("#freeErrors").guider({
    			name: "fstep7",
    			next: "fstep8",
    			title: tourTXT[18],
    			position: "bottom",
    			description: tourTXT[19],    
    			alignButtons: "right",
    			buttons: botao1
    		});
    		
    		$.guider({
    			name: "fstep8",
    			next: "fstep9",
    			title: tourTXT[20],
    			description: tourTXT[21],    
    			alignButtons: "right",
    			buttons: botao1
    		});
    	    
    	    $("#help").guider({
    	    	name: "fstep9",
    	    	next: "fstep10",
    	    	title: tourTXT[22],
    	    	description: tourTXT[23],
    	    	position: "left",
    	    	alignButtons: "right",
    	    	closable: true, 
    	    	onShow: function() {setCookieDays ("stepTour", "fstep5", 1); setCookieDays ("functionTour", "firstStepTour", 1);},
    	    	buttons: botao2
    	    	});
    	    
    	    $.guider({
    			name: "fstep10",
    			title: tourTXT[24],
    			description: tourTXT[25],
    			alignButtons: "right",
    			onShow: function() {setCookieDays ("stepTour", "fstep6", 1); setCookieDays ("functionTour", "firstStepTour", 1);},
    			buttons: botao3
    		});
    	    	    
}

function alternativeFirstStepTour (nextStep) {
	
	var botao1;
	var botao2;
	var botao3;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {Próximo: {click: true, className: "primary"}}
			botao2 = {Voltar: true, Próximo: {click: true, className: "primary"}}
			botao3 = {Voltar: true, OK: {click: true, className: "primary"}}
			break;
		case("es-ES"):
			botao1 = {Siguiente: {click: true, className: "primary"}};
			botao2 = {Volver: true, Siguiente: {click: true, className: "primary"}}
			botao3 = {Volver: true, OK: {click: true, className: "primary"}}
			break;
		case("en-UK"):
			botao1 = {Next: {click: true, className: "primary"}}
			botao2 = {Back: true, Next: {click: true, className: "primary"}}
			botao3 = {Back: true, OK: {click: true, className: "primary"}}
			break;
	}
	
	if (nextStep === "") {
		$.guider({
			name: "fstep",
	    	next: "fstep2",
	    	title: tourTXT[26],
	    	description: tourTXT[27],
	    	alignButtons: "right",
	    	onShow: function() {setCookieDays ("stepTour", "fstep", 1); setCookieDays ("functionTour", "alternativeFirstStepTour", 1);},
	    	buttons: botao1
	    	            
	    	}).show();  
	}
	
	else {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img>" + tourTXT[2] + "</center>",
			description : tourTXT[3],
			overlay : "dark",
			width : 600,
			alignButtons : "right",
			buttons : botao1
		}).show();
	}

	$.guider({
		name: "fstep",
    	next: "fstep2",
    	title: tourTXT[28],
    	description: tourTXT[29],
    	alignButtons: "right",
    	onShow: function() {setCookieDays ("stepTour", "fstep", 1); setCookieDays ("functionTour", "alternativeFirstStepTour", 1);},
    	buttons: botao1
    	            
    	});  
    	    
    $("#note").guider({
    	name: "fstep2",
    	next: "fstep3",
    	title: tourTXT[8],
    	description: tourTXT[9],
    	position: "left",
    	alignButtons: "right",
    	onShow: function() {setCookieDays ("stepTour", "fstep2", 1); setCookieDays ("functionTour", "alternativeFirstStepTour", 1);},
    	buttons: botao2
    	});
    	    
    	    $("#note").guider({
    			name: "fstep3",
    			next: "fstep4",
    			title: tourTXT[10],
    			description: tourTXT[11],
    			position: "left",
    			alignButtons: "right",
    			onShow: function() {setCookieDays ("stepTour", "fstep3", 1); setCookieDays ("functionTour", "alternativeFirstStepTour", 1);},
    			buttons: botao2
    		});
    	    
    	    $.guider({
    			name: "fstep4",
    			next: "fstep5",
    			position: "right",
    			title: tourTXT[12],
    			description: tourTXT[13],    
    			alignButtons: "right",
    			onShow: function() {generateStages(1);},
    			buttons: botao1
    		});
    	    
    	    $("#hint").guider({
    			name: "fstep5",
    			next: "fstep6",
    			title: tourTXT[14],
    			description: tourTXT[15],
    			position: "bottom",
    			alignButtons: "right",
    			onShow: function() {setCookieDays ("stepTour", "fstep4", 1); setCookieDays ("functionTour", "firstStepTour", 1);},
    			buttons: botao2
    		});
    	    
    	    $("#freeHints").guider({
    			name: "fstep6",
    			next: "fstep7",
    			title: tourTXT[16],
    			description: tourTXT[17],
    			position: "left",
    			alignButtons: "right",
    			buttons: botao1
    		});
    		
    		$("#freeErrors").guider({
    			name: "fstep7",
    			next: "fstep8",
    			title: tourTXT[18],
    			position: "bottom",
    			description: tourTXT[19],    
    			alignButtons: "right",
    			buttons: botao1
    		});
    		
    		$.guider({
    			name: "fstep8",
    			next: "fstep9",
    			title: tourTXT[20],
    			description: tourTXT[21],    
    			alignButtons: "right",
    			buttons: botao1
    		});
    	    
    	    $("#help").guider({
    	    	name: "fstep9",
    	    	next: "fstep10",
    	    	title: tourTXT[22],
    	    	description: tourTXT[23],
    	    	position: "left",
    	    	alignButtons: "right",
    	    	closable: true, 
    	    	onShow: function() {setCookieDays ("stepTour", "fstep5", 1); setCookieDays ("functionTour", "alternativeFirstStepTour", 1);},
    	    	buttons: botao2
    	    	});
    	    
    	    $("#topics").guider({
    			name: "fstep10",
    			next: "fstep11",
    			title: tourTXT[30],
    			description: tourTXT[31],       
    			position: "right",
    			alignButtons: "right",
    			onShow: function() {setCookieDays ("stepTour", "fstep6", 1); setCookieDays ("functionTour", "alternativeFirstStepTour", 1);},
    			buttons: botao1
    		});
    		
    	    $.guider({
    			name: "fstep11",
    			title: tourTXT[32],
    			description: tourTXT[33],     
    			alignButtons: "right",
    			buttons: botao3
    		}); 
}

function mainMenu (nextStep) {
	$("#topics").fadeIn();
    $("#topicsAux").hide();
    
    var botao1;
	var botao2;
	var botao3;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {Próximo: {click: true, className: "primary"}}
			botao2 = {Voltar: true, Próximo: {click: true, className: "primary"}}
			botao3 = {Voltar: true, OK: {click: true, className: "primary"}}
		break;
		case("es-ES"):
			botao1 = {Siguiente: {click: true, className: "primary"}};
			botao2 = {Volver: true, Siguiente: {click: true, className: "primary"}}
			botao3 = {Volver: true, OK: {click: true, className: "primary"}}
			break;
		case("en-UK"):
			botao1 = {Next: {click: true, className: "primary"}}
			botao2 = {Back: true, Next: {click: true, className: "primary"}}
			botao3 = {Back: true, OK: {click: true, className: "primary"}}
			break;
	}
    
	if (nextStep === "") {
		$.guider({
			name: "mp",
	    	next: "mp2",
	    	title: tourTXT[34],
	    	description: tourTXT[35],
	        alignButtons: "right",
	        onShow: function() {setCookieDays ("stepTour", "mp", 1); setCookieDays ("functionTour", "mainMenu", 1);},
	    	buttons: botao1
	    	            
	    	}).show();
	}
	
	else {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img>" + tourTXT[2] + "</center>",
			description : tourTXT[3],
			overlay : "dark",
			width : 600,
			alignButtons : "right",
			buttons : botao1
		}).show();
	}
	
	$.guider({
		name: "mp",
    	next: "mp2",
    	title: tourTXT[34],
    	description: tourTXT[35],
        alignButtons: "right",
        onShow: function() {setCookieDays ("stepTour", "mp", 1); setCookieDays ("functionTour", "mainMenu", 1);},
    	buttons: botao1
    	            
    	});
	
	$("#topics").guider({
		name: "mp2",
		next: "mp3",
		title: tourTXT[30],
		description: tourTXT[31],       
		position: "right",
		alignButtons: "right",
		onShow: function() {setCookieDays ("stepTour", "mp2", 1); setCookieDays ("functionTour", "mainMenu", 1);},
		buttons: botao1
	});
	
	$.guider({
		name: "mp3",
		title: tourTXT[32],
		description: tourTXT[36],     
		alignButtons: "right",
		onShow: function() {exit();},
		buttons: botao3
	}); 
}

function classPlan (nextStep) {
	
	var botao1;
	var botao2;
	var botao3;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {Próximo: {click: true, className: "primary"}}
			botao2 = {Voltar: true, Próximo: {click: true, className: "primary"}}
			botao3 = {Voltar: true, OK: {click: true, className: "primary"}}
		break;
		case("es-ES"):
			botao1 = {Siguiente: {click: true, className: "primary"}};
			botao2 = {Volver: true, Siguiente: {click: true, className: "primary"}}
			botao3 = {Volver: true, OK: {click: true, className: "primary"}}
			break;
		case("en-UK"):
			botao1 = {Next: {click: true, className: "primary"}}
			botao2 = {Back: true, Next: {click: true, className: "primary"}}
			botao3 = {Back: true, OK: {click: true, className: "primary"}}
			break;
	}
	
	if (nextStep === "") {
		$.guider({
			name: "plan",
			next: "plan2",
			title: tourTXT[37],
			description: tourTXT[38],
			alignButtons: "right", 
			onShow: function() {setCookieDays ("stepTour", "plan", 1); setCookieDays ("functionTour", "classPlan", 1);},
			buttons: botao1
		}).show();
	}
	
	else {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img>" + tourTXT[2] + "</center>",
			description : tourTXT[3],
			overlay : "dark",
			width : 600,
			alignButtons : "right",
			buttons : botao1
		}).show();
	}
	
	$.guider({
		name: "plan",
		next: "plan2",
		title: tourTXT[37],
		description: tourTXT[38],
		alignButtons: "right", 
		onShow: function() {setCookieDays ("stepTour", "plan", 1); setCookieDays ("functionTour", "classPlan", 1);},
		buttons: botao1
	});
	
	$.guider({
		name: "plan2",
		title: tourTXT[39],
		description: tourTXT[40],
	    alignButtons: "right", 
	    onShow: function() {setCookieDays ("stepTour", "plan", 1); setCookieDays ("functionTour", "classPlan", 1);},
	    buttons: botao3
		});
}

function clickEquation (nextStep) {
	
	var botao1;
	var botao2;
	switch (idioma) {
		default:
		case("pt-BR"):
			botao1 = {Próximo: {click: true, className: "primary"}}
			botao2 = {Voltar: true, Entendi: {click: true, className: "primary"}}
		break;
		case("es-ES"):
			botao1 = {Siguiente: {click: true, className: "primary"}};
			botao2 = {Volver: true, Entendi: {click: true, className: "primary"}}
			break;
		case("en-UK"):
			botao1 = {Next: {click: true, className: "primary"}}
			botao2 = {Back: true, "Got it": {click: true, className: "primary"}}
			break;
	}
	
	isTourInterativo = false;
	blockMenu = false;
	setCookieDays ("stepTour", "", 0);
	setCookieDays ("functionTour", "", 0);
	
	$.guider({
		name: "click",
		next: "click2",
		title: tourTXT[41],
		description: tourTXT[42],
	    alignButtons: "right", 
	    buttons: botao1
		}).show();
	
	$("#topicsAux").guider({
		name: "click2",
		title: tourTXT[43],
		description: tourTXT[44],    
		position: "right",
		alignButtons: "right",
		buttons: botao2
	});
}

function plan2Explanation (nextStep) {
	
	var botao1;
	var botao2;
	switch (idioma) {
		default:
		case("pt-BR"):
			botao1 = {Próximo: {click: true, className: "primary"}}
			botao2 = {Voltar: true, Próximo: {click: function() {exit(); blockMenu = true; loadExerciseWE("x+4=10", 20); classPlan2(); setTimeout(function(){loadTasks(numUnlockedPlans);}, 2000)}, className: "primary"}}
		break;
		case("es-ES"):
			botao1 = {Siguiente: {click: true, className: "primary"}};
			botao2 = {Volver: true, Siguiente: {click: function() {exit(); blockMenu = true; loadExerciseWE("x+4=10", 20); classPlan2(); setTimeout(function(){loadTasks(numUnlockedPlans);}, 2000)}, className: "primary"}}
			break;
		case("en-UK"):
			botao1 = {Next: {click: true, className: "primary"}}
			botao2 = {Back: true, Next: {click: function() {exit(); blockMenu = true; loadExerciseWE("x+4=10", 20); classPlan2(); setTimeout(function(){loadTasks(numUnlockedPlans);}, 2000)}, className: "primary"}}
			break;
	}
	
	if (nextStep === "") {
		$.guider({
			name: "plan2Start",
			next: "plan2",
			title: tourTXT[45],
			description: tourTXT[46],
			alignButtons: "right",
			onShow: function() {setCookieDays ("stepTour", "plan2Start", 1); setCookieDays ("functionTour", "plan2Explanation", 1);},
			buttons: botao1
		}).show();
	}
	
	else {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img>" + tourTXT[2] + "</center>",
			description : tourTXT[3],
			overlay : "dark",
			width : 600,
			alignButtons : "right",
			buttons : botao1
		}).show();
	}
	
	$.guider({
		name: "plan2Start",
		next: "plan2",
		title: tourTXT[47],
		description: tourTXT[48],
		alignButtons: "right",
		onShow: function() {setCookieDays ("stepTour", "plan2Start", 1); setCookieDays ("functionTour", "plan2Explanation", 1);},
		buttons: botao1
	});
	
	$.guider({
		name: "plan2",
		title: tourTXT[49],
		description: tourTXT[50],
		alignButtons: "right",
		onShow: function() {setCookieDays ("stepTour", "plan2", 1); setCookieDays ("functionTour", "plan2Explanation", 1);},
		width: 610,
		buttons: botao2
	});
}

function exit ( ) {
	$.guider({	}).hideAll();
	setCookieDays("tourViewed", "true", 1);
	isTourInterativo = false; 
	blockMenu = true;
	
	$("#topics").fadeIn();
	$("#topicsAux").hide();
//	if (selectedEquation !== null) {
//	    $("#topics").fadeOut();
//        $("#topicsAux").show();
//	}
    
	setCookieDays ("stepTour", "", 0);
	setCookieDays ("functionTour", "", 0);
	setCookieDays ("openTour", "false", 7);
	
	$.ajax({
		type : "GET",
		url : "newPatequation/setTour",
		data : {

		},
		success : function(data) {	
			console.log(data);
			
			location.href='/pat2math/knowledgeTest';
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ocorreu um erro inesperado");
		}
	});
	
}

function startTour() {
	loadExerciseWE("x+2=10", 20);
	classPlan1();	   
//	var nextStep = getCookie ("stepTour");
//    var functionTour = getCookie ("functionTour");
//    	
//    if (numUnlockedPlans === 0) {
//    	if (functionTour === "" || functionTour === "introduction")
//    		introduction(nextStep);
//    	
//    	else if (functionTour === "firstStepTour") 
//    		firstStepTour(nextStep); 
//    
//    	else if (functionTour === "mainMenu") 
//    		mainMenu(nextStep);
//    
//    	else if (functionTour === "classPlan") 
//    		classPlan(nextStep);
//    
//    	else if (functionTour == "alternativeFirstStepTour")
//    		alternativeFirstStepTour(nextStep);
//    }
//    
//    else if (numUnlockedPlans === 1 && functionTour === "clickEquation") 
//		clickEquation(nextStep);
//    
//    else if (numUnlockedPlans === 2 && functionTour === "plan2Explanation") 
//    	plan2Explanation(nextStep);
}

function newPlan ( ) {
	
	var botao1;
	switch (idioma) {
		default:
		case("pt-BR"):
			botao1 = {Legal: {click: function(){$.guider({}).hideAll(); resetProgressBar();}, className: "primary"}}
		break;
		case("es-ES"):
			botao1 = {Legal: {click: function(){$.guider({}).hideAll(); resetProgressBar();}, className: "primary"}};
			break;
		case("en-UK"):
			botao1 = {Nice: {click: function(){$.guider({}).hideAll(); resetProgressBar();}, className: "primary"}}
			break;
	}
	
	$.guider({
    	title: tourTXT[51],
    	description: tourTXT[52],
        alignButtons: "center",
    	buttons: botao1
    }).show();
}
