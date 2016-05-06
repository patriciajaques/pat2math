function resolutionEquation(resolutionStep, idStep, skipLine) {
	var line = $(selectedSheet + " .hLineAux").next().next();
	var elements = "<ul><li id='" + idStep + "'>" + resolutionStep + "</li></ul>";
    
    if (skipLine)
    	line.html(line.html() + elements);
	
    else
    	line.html(elements);
    
    line.addClass("canCopy");
    centralizeCanCopy();
    line.removeClass("canCopy");
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
	$.guider({
		title : "+ . + = ?",
		description : "Mais vezes mais dá?",
		width : 218,
		alignButtons : "center",
		buttons : {
			Menos: function() {showIncorrectMessage1();},
			Mais: {
				click : function() {showQuestion2();},
				className : "primary"
			}
		}
	}).show();
}

function showQuestion2() {
	$.guider({
		title : "+ . - = ?",
		description : "Mais vezes menos dá?",
		width : 218,
		alignButtons : "center",
		buttons : {
			Menos: function() {showQuestion3();},
			Mais: {
				click : function() {showIncorrectMessage2();},
				className : "primary"
			}
		}
	}).show();
}

function showQuestion3() {
	$.guider({
		title : "- . + = ?",
		description : "Menos vezes mais dá?",
		width : 218,
		alignButtons : "center",
		buttons : {
			Menos: function() {showQuestion4();},
			Mais: {
				click : function() {showIncorrectMessage3();},
				className : "primary"
			}
		}
	}).show();
}

function showQuestion4() {
	$.guider({
		title : "- . - = ?",
		description : "Menos vezes menos dá?",
		width : 218,
		alignButtons : "center",
		buttons : {
			Menos: function() {showIncorrectMessage4();},
			Mais: {
				click : function() {continueClassPlan6();},
				className : "primary"
			}
		}
	}).show();
}

function showIncorrectMessage1() {
	$.guider({
		title : "Oops!",
		description : "Na verdade, mais vezes mais dá mais.",
		width : 310,
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : function(){showQuestion2();},
				className : "primary"
			}
		}
	}).show();
}

function showIncorrectMessage2() {
	$.guider({
		title : "Oops!",
		description : "Na verdade, mais vezes menos dá menos.",
		width : 310,
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : function(){showQuestion3();},
				className : "primary"
			}
		}
	}).show();
}

function showIncorrectMessage3() {
	$.guider({
		title : "Oops!",
		description : "Na verdade, menos vezes mais dá menos.",
		width : 310,
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : function(){showQuestion4();},
				className : "primary"
			}
		}
	}).show();
}

function showIncorrectMessage4() {
	$.guider({
		title : "Oops!",
		description : "Na verdade, menos vezes menos dá mais.",
		width : 310,
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : function(){continueClassPlan6();},
				className : "primary"
			}
		}
	}).show();
}

function continueClassPlan6() {
	$.guider({
		name : "1",
		next : "2",
		title : "Resumindo",
		description : "Se temos uma multiplicação de sinais iguais, temos mais no final;<br>" +
					  "Se temos uma multiplicação de sinais diferentes, temos menos no final.",
		width : 600,
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	}).show();
	
	$("#line7").guider({
		name : "2",
		title : "Terminamos!",
		description : "Conseguimos resolver a equação com sucesso e você aprendeu sobre o jogo de sinais na multiplicação.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = - 9</font>", "step5", true); isWorkedExample = false; blockMenu = false; $("#topics").fadeIn(); $("#topicsAux").hide();},	
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
}