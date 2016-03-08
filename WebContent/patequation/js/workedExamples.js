function classPlan1(nextStep) {
	$.guider({
		name: "1",
		next : "2",
		title : "Qual é o nosso objetivo?",
		description : "Descobrir o valor de X.",
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 30);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	}).show();

	
	$.guider({
		name: "2",
		next : "3",
		title : "O que é determinar o valor de X?",
		description : "É descobrir o número que faz com que ambos os lados da igualdade fiquem com o mesmo valor.",
		width : 600,
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$.guider({
		name: "3",
		next : "4",
		title : "Como fazer para descobrir o valor de X?",
		description : "Nós temos que isolar X, ou seja, deixar X sozinho em um dos lados da equação.",
		width : 600,
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line2").guider({
		name: "4",
		next : "5",
		title : "Como fazemos para deixar o X isolado?",
		description : "Fazendo o 2 sair daqui e passando ele para o outro lado da igualdade. ",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line3").guider({
		name: "5",
		next : "6",
		title : "Como faço para tirar o 2 daqui?",
		description : "Eu posso diminuir por -2, o que dá 0: 2-2=0",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x + 2 <font color='red'>- 2 </font> = 10", true);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line3").guider({
		name: "6",
		next : "7",
		title : "Mas atenção! ",
		description : "Se eu diminuir o 2 do lado esquerdo, eu tenho que diminuir 2 do outro lado para permanecer a igualdade.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x + 2 <font color='red'>- 2 </font> = 10 <font color='red'>- 2 </font>", false);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line4").guider({
		name: "7",
		next : "8",
		title : "Pronto! ",
		description : "Conseguimos isolar o X. Agora só falta resolver a subtração 10 - 2. ",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x = 10 - 2", true);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line5").guider({
		name: "8",
		title : "Terminamos!",
		description : "Agora você já sabe como resolver equações simples de primeiro grau.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'> x = 8 </font>", true); setCookieDays (stepWE, "8", 1);},
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
}

function resolutionEquation(resolutionStep, skipLine) {
	var line = $(selectedSheet + " .hLineAux").next().next();
	var elements = "<ul><li>" + resolutionStep + "</li></ul>";
    
    if (skipLine)
    	line.html(line.html() + elements);
	
    else
    	line.html(elements);
    
    line.addClass("canCopy");
    centralizeCanCopy();
    line.removeClass("canCopy");
}