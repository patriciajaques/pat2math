function resolutionEquation(resolutionStep, idStep, skipLine) {
	var line = $(selectedSheet + " .hLineAux").next().next();
	var elements = "<ul><li id='" + idStep + "' style='opacity: 0.75; margin-left: -50%;'>" + resolutionStep + "</li></ul>";
    
    if (skipLine > 0) {
    	line.html(line.html() + elements);
    	
    	if (skipLine === 2) {
    		var mt = (35 * contWE) + "px";
    		document.getElementById(idStep).style.marginTop = mt;
    		contWE++;
    	}
    }
	
    else
    	line.html(elements);
}

function resolutionEquationChangeOpacity(resolutionStep, idStep, skipLine, opacity) {
	resolutionEquation(resolutionStep, idStep, skipLine);
	document.getElementById(idStep).style.opacity = opacity;
}

function getResolutionEquation(idPlan) {
	loadExerciseWE(equationsWE[idPlan], pointsWE[idPlan]);
	isWorkedExample = false;
	blockMenu = false;
	
	document.getElementById("currentEquation").style.opacity = "0.5";
	
	var resolution = resolutionsWE[idPlan].split(";");
	
	if (idPlan < 12)
		for (var i = 0; i < resolution.length; i++)
			resolutionEquationChangeOpacity(resolution[i], "step" + (i+1), 1, "0.5");
		
	else {
		//Verifica se a equação do plano atual não possui números fracionários
		if (equationsWE[idPlan].indexOf("/" === -1))
			resolutionEquationChangeOpacity(resolution[0], "step1", 1, "0.5");
		
		else
			resolutionEquationChangeOpacity(resolution[0], "step1", 2, "0.5");
		
		for (var i = 1; i < resolution.length; i++) {
			//Verifica se o passo anterior da resolução não possui números fracionários
			if (resolution[i-1].indexOf("span") === -1)
				resolutionEquationChangeOpacity(resolution[i], "step" + (i+1), 1, "0.5");
			
			else
				resolutionEquationChangeOpacity(resolution[i], "step" + (i+1), 2, "0.5");
		}
	}
	
	var idFinalStep = "step" + resolution.length;
	document.getElementById(idFinalStep).style.opacity = "0.75";
	document.getElementById(idFinalStep).style.color = "blue";
}

function exitWorkedExample() {
	isWorkedExample = false; 
	blockMenu = false; 
	
	var currentWE = getCookie("currentWE");
	setCookieDays (cookieName, "", 0); 
	
	//Cria um cookie que indica que o usuário já visualizou o exemplo trabalhado atual
	var cookieName = "visualizedWE" + currentWE;
	setCookieMinutes(cookieName, "visualized", 10);
	
	$("#topics").fadeIn(); 
	$("#topicsAux").hide();
}

function showArrow() {
	var line = $(selectedSheet + " .hLineAux").next().next();
	line.html(line.html() + '<div id="arrow" style="margin-top:-64px; margin-left:327px; position: absolute;"><img src=/pat2math/patequation/img/arrow_green.png></div>');
}

function blink9(show, numBlinks) {
	if (numBlinks !== 0) {
		if (show) {
			document.getElementById("step3").innerHTML = "- x <font color='red'>* (-1)</font> = 9";
			setTimeout(function(){blink9(false, (numBlinks-1));}, 800);
		}

		else {
			document.getElementById("step3").innerHTML = "- x <font color='red'>* (-1)</font> =";
			setTimeout(function(){blink9(true, (numBlinks-1));}, 800);
		}
	}
}

function showQuestionsMultiplication() {
	showQuestion1();
}

function showQuestion1() {
	var botao;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao = {
				"Menos" : function() {showIncorrectMessage1();},
				"Mais": {click : function() {showQuestion2();}, className : "primary"}
			}
			break;
		case("es-ES"):
			botao = {
				"Menos" : function() {showIncorrectMessage1();},
				"Más": {click : function() {showQuestion2();}, className : "primary"}
			}
			break;
		case("en-GB"):
			botao = {
				"Less" : function() {showIncorrectMessage1();},
				"Plus": {click : function() {showQuestion2();},	className : "primary"}
			}
			break;
	}
	$.guider({
		title : "+ . + = ?",
		description : weuTXT[0],
		width : 218,
		alignButtons : "center",
		buttons : botao
	}).show();
}

function showQuestion2() {
	var botao;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao = {
				"Menos" : function() {showQuestion3();},
				"Mais": {click : function() {showIncorrectMessage2();}, className : "primary"}
			}
			break;
		case("es-ES"):
			botao = {
				"Menos" : function() {showQuestion3();},
				"Más": {click : function() {showIncorrectMessage2();}, className : "primary"}
			}
			break;
		case("en-GB"):
			botao = {
				"Less" : function() {showQuestion3();},
				"Plus": {click : function() {showIncorrectMessage2();}, className : "primary"}
			}
			break;
	}
	$.guider({
		title : "+ . - = ?",
		description : weuTXT[1],
		width : 218,
		alignButtons : "center",
		buttons : botao
	}).show();
}

function showQuestion3() {
	var botao;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao = {
				"Menos" : function() {showQuestion4();},
				"Mais": {click : function() {showIncorrectMessage3();}, className : "primary"}
			}
			break;
		case("es-ES"):
			botao = {
				"Menos" : function() {showQuestion4();},
				"Más": {click : function() {showIncorrectMessage3();}, className : "primary"}
			}
			break;
		case("en-GB"):
			botao = {
				"Less" : function() {showQuestion4();},
				"Plus": {click : function() {showIncorrectMessage3();}, className : "primary"}
			}
			break;
	}
	$.guider({
		title : "- . + = ?",
		description : weuTXT[2],
		width : 218,
		alignButtons : "center",
		buttons : botao
	}).show();
}

function showQuestion4() {
	var botao;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao = {
				"Menos" : function() {showIncorrectMessage4();},
				"Mais": {click : function() {continueClassPlan7();}, className : "primary"}
			}
			break;
		case("es-ES"):
			botao = {
				"Menos" : function() {showIncorrectMessage4();},
				"Más": {click : function() {continueClassPlan7();}, className : "primary"}
			}
			break;
		case("en-GB"):
			botao = {
				"Less" : function() {showIncorrectMessage4();},
				"Plus": {click : function() {continueClassPlan7();}, className : "primary"}
			}
			break;
	}

	$.guider({
		title : "- . - = ?",
		description : weuTXT[3],
		width : 218,
		alignButtons : "center",
		buttons : botao
	}).show();
}

function showIncorrectMessage1() {
	var botao;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao = {"Próximo": {click : function(){showQuestion2();}, className : "primary"}}
			break;
		case("es-ES"):
			botao = {"Siguiente": {click : function(){showQuestion2();}, className : "primary"}}
			break;
		case("en-GB"):
			botao = {"Next": {click : function(){showQuestion2();}, className : "primary"}}
			break;
	}
	$.guider({
		title : weuTXT[4],
		description : weuTXT[5],
		width : 310,
		alignButtons : "right",
		buttons : botao
	}).show();
}

function showIncorrectMessage2() {
	var botao;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao = {"Próximo": {click : function(){showQuestion3();}, className : "primary"}}
			break;
		case("es-ES"):
			botao = {"Siguiente": {click : function(){showQuestion3();}, className : "primary"}}
			break;
		case("en-GB"):
			botao = {"Next": {click : function(){showQuestion3();}, className : "primary"}}
			break;
	}
	$.guider({
		title : weuTXT[6],
		description : weuTXT[7],
		width : 310,
		alignButtons : "right",
		buttons : botao
	}).show();
}

function showIncorrectMessage3() {
	var botao;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao = {"Próximo": {click : function(){showQuestion4();}, className : "primary"}}
			break;
		case("es-ES"):
			botao = {"Siguiente": {click : function(){showQuestion4();}, className : "primary"}}
			break;
		case("en-GB"):
			botao = {"Next": {click : function(){showQuestion4();}, className : "primary"}}
			break;
	}
	$.guider({
		title : weuTXT[8],
		description : weuTXT[9],
		width : 310,
		alignButtons : "right",
		buttons : botao
	}).show();
}

function showIncorrectMessage4() {
	var botao;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao = {"Próximo": {click : function(){continueClassPlan7();}, className : "primary",}}
			break;
		case("es-ES"):
			botao = {"Siguiente": {click : function(){continueClassPlan7();}, className : "primary",}}
			break;
		case("en-GB"):
			botao = {"Next": {click : function(){continueClassPlan7();}, className : "primary",}}
			break;
	}
	$.guider({
		title : weuTXT[10],
		description : weuTXT[11],
		width : 310,
		alignButtons : "right",
		buttons : botao
	}).show();
}

function continueClassPlan7() {
	var botao1, botao2;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {"Próximo": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botao1 = {"Siguiente": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botao1 = {"Next": {click : true, className : "primary",}}
			botao2 = {"Finish": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name : "1",
		next : "2",
		title : weuTXT[12],
		description : weuTXT[13],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	}).show();
	
	$("#line7").guider({
		name : "2",
		title : weuTXT[14],
		description : weuTXT[15],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = - 9</font>", "step5", 1); exitWorkedExample();},	
		buttons : botao2
	});
}

//function fractionToUserInterface(fraction) {
//	var elementsFrac = fraction.split("/");
//	var fractionUI = '<span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator">' + elementsFrac[1] + '</div><div class="numerator">' + elementsFrac[0] + '</div><div class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>';
//	
//	return fractionUI;
//}
//
//function fractionToUserInterface(fraction, colorDenominator, idDenominator) {
//	var elementsFrac = fraction.split("/");
//	var fractionUI = '<span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"> <font color="' + colorDenominator + '">' elementsFrac[1] + '</font></div><div class="numerator">' + elementsFrac[0] + '</div><div id="' + idDenominator + '" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>';
//	
//	return fractionUI;
//}
//
//function scratchedFractionToUserInterface(fraction) {
//	var elementsFrac = fraction.split("/");
//	var fractionUI = '<span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><s>' + elementsFrac[1] + '</s></div><div class="numerator"><s>' + elementsFrac[0] + '</s></div><div class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>';
//	
//	return fractionUI;
//}