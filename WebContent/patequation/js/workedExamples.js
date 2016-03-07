function classPlan1(nextStep) {
	if (nextStep === "") {
		$.guider({
			name: "1",
			next : "2",
			title : "Qual é o nosso objetivo?",
			description : "Descobrir o valor de X.",
			width : 600,
			alignButtons : "right",
			onShow: function() {setCookieDays (stepWE, "1", 1); setCookieDays (functionWE, "classPlan1", 1);},
			buttons : {
				Próximo: {
					click : true,
					className : "primary",
				}
			}
		}).show();
	}
	
	else {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Parece que tivemos problemas na sessão anterior </center>",
			description : "Vamos continuar a explicação de onde paramos.",
			overlay : "dark",
			width : 600,
			alignButtons : "right",
			buttons : {
				Próximo: {
					click : true,
					className : "primary",
				}
			}
		}).show();
	}
	
	$.guider({
		name: "2",
		next : "3",
		title : "O que é determinar o valor de X?",
		description : "É descobrir o número que faz com que ambos os lados da igualdade fiquem com o mesmo valor.",
		width : 600,
		alignButtons : "right",
		onShow: function() {setCookieDays (stepWE, "2", 1); setCookieDays (functionWE, "classPlan1", 1);},
		buttons : {
			Voltar: true,
			Próximo: {
				click : true,
				className : "primary",
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
		onShow: function() {setCookieDays (stepWE, "3", 1); setCookieDays (functionWE, "classPlan1", 1);},
		buttons : {
			Voltar: true,
			Próximo: {
				click : true,
				className : "primary",
			}
		}
	});
	
	$.guider({
		name: "4",
		next : "5",
		title : "Como fazemos para deixar o X isolado?",
		description : "Fazendo o 2 sair daqui e passando ele para o outro lado da igualdade. ",
		width : 600,
		alignButtons : "right",
		onShow: function() {setCookieDays (stepWE, "4", 1); setCookieDays (functionWE, "classPlan1", 1);},
		buttons : {
			Voltar: true,
			Próximo: {
				click : true,
				className : "primary",
			}
		}
	});
	
	$.guider({
		name: "5",
		next : "6",
		title : "Como faço para tirar o 2 daqui?",
		description : "Eu posso diminuir por -2, o que dá 0: 2-2=0",
		width : 600,
		alignButtons : "right",
		onShow: function() {setCookieDays (stepWE, "5", 1); setCookieDays (functionWE, "classPlan1", 1);},
		buttons : {
			Voltar: true,
			Próximo: {
				click : true,
				className : "primary",
			}
		}
	});
	//A partir daqui será necessário manipular a equação, utilizando somente os recursos do HTML, sem requisitar ao servidor. 
	//A variável nextLineServer poderá ser útil para descobrir como colocar o passo logo abaixo do atual
	//Verificar como foi feito no momento de copiar os passos já resolvidos da equação, dá para se basear por aqui
	//É o método loadEquation, que está na linha 977 de index.js
	//Continuar seguindo o passo-a-passo que está no e-mail sinalizado no Outlook.com, o das anotações da Patrícia
}

function resolutionEquationOfPlan1() {
	var line = $(selectedSheet + " .hLineAux").next().next();
	var elements = "<ul><li>Teste</li>";

    elements = elements + "</ul>";
	line.html(line.html() + elements);
	line.addClass("canCopy");
    centralizeCanCopy();
    line.removeClass("canCopy");
}