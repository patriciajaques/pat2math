function tutorialWorkedExamples ( ) {
	var cookieName = "showTutorial" + currentPos;
	setCookieDays (cookieName, "1", 1);
	
	$.guider({
		name: "start",
		next: "start2",
		title: "Exemplos Resolvidos",
		description: "Para melhorar o seu aprendizado, o PAT2Math conta com o sistema de Exemplos Resolvidos. Para cada plano, o sistema mostra para você como resolver a primeira equação passo-a-passo.",
	    alignButtons: "right", 
	    buttons: {
	    	Próximo: {
                click: true,
                className: "primary"
            }
	    }
		}).show();
	
	$().guider({
		name: "start2",
		next: "start3",
		title: "O que devo fazer para acompanhar a resolução de uma equação",
		description: "Para a primeira equação de cada plano, o ícone<img src=/pat2math/patequation/img/lupa.png></img> foi substituído pelo botão <img src=/pat2math/patequation/img/play_18x18.png></img>. Ao clicar nele, o PAT2Math resolve o próximo passo da equação.",
		alignButtons: "right",
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$("#button").guider({
		name: "start3",
		title: "Experimente!",
		description: "Clique no botão <img src=/pat2math/patequation/img/play_18x18.png></img> para dar início ao seu primeiro Exemplo Resolvido.",
		alignButtons: "right",
		position: "left",
		buttons: {
			Voltar: true,
			OK: {
				click: true,
				className: "primary"
			}
		}
	});
}

function finishTutorial ( ) {
	var cookieName = "showTutorial" + currentPos;
	setCookieDays (cookieName, "2", 1);
	
	$.guider({
		name: "finish",
		next: "finish2",
		title: "Primeiro passo da equação resolvido com sucesso!",
		description: "A explicação de qual operação o PAT2Math usou para resolver este passo você vê no post-it abaixo da caixa de texto.",
	    alignButtons: "right", 
	    buttons: {
	    	Próximo: {
                click: true,
                className: "primary"
            }
	    }
		}).show();
	
	$.guider({
    	name: "finish2",
    	title: "Muito bem!",
		description: "Você já está pronto para prosseguir sozinho. Quando estiver pronto, clique novamente no botão play para resolver o próximo passo.",
		alignButtons: "right",
		closable: true, 
		buttons: {
			Finalizar: {
               click: true,
               className: "primary"
            }
		}
    	});
}


function showExplanation (regrasCookie) {
	var r = regrasCookie.split (" ");
	var regraPos = r[r.length-1];
	var regra = regras[regraPos];
	var texto = "<b>" + regra.nome.toUpperCase() + "<br>" + regra.explicacao + "</b>";
	
	for (var i = r.length - 2; i >= 0; i--) {
		regraPos = r[i];
		regra = regras[regraPos];
		var temp = regra.nome.toUpperCase() + "<br>" + regra.explicacao;
		texto += "<br><br>" + temp;
	}
	
	moveHint();
	
	$("#hintText").html(texto);
    $("#hintText").show('blind', 500);
    $(".verticalTape").show('fold', 500);
    
//	$.guider({
//		title: regra.nome,
//		description: regra.explicacao,
//	    alignButtons: "center", 
//	    onHide: function() {window.location.reload();},
//	    buttons: {
//	    	OK: {
//				click: true,
//				className: "primary"
//			}
//	    }
//		}).show();
}

function getRegras ( ) {
	regras = new Array ( );
	regras["AD"] = new Regra ("Soma", "Consiste em somar os termos semelhantes.");
	regras["SB"] = new Regra ("Subtração", "Consiste em subtrair os termos semelhantes.");
	regras["DV"] = new Regra ("Divisão", "Consiste em dividir os termos semelhantes.");
	regras["UT"] = new Regra ("Unir Termos Semelhantes", "Consiste em aproximar os termos que são semelhantes, ou seja, os termos que podem ser calculados. Exemplos de termos semelhantes: 4+2 e 7x+3x.");
	regras["MT"] = new Regra ("Multiplicação", "Consiste em multiplicar os termos semelhantes.");
	regras["MM"] = new Regra ("Mínimo Múltiplo Comum (MMC)", "Consiste em determinar um denominador comum para as frações, tornando possível realizar os cálculos de soma e subtração entre elas.");
	regras["DM"] = new Regra ("Propriedade Distributiva", 'Consiste em "abrir" uma multiplicação da forma a(b+c+...), efetuando os cálculos da seguinte maneira: a(b+c+...) = ab + ac + a...');
	regras["FC"] = new Regra ("Fator Comum", "Consiste em fatorar uma expressão através de seu fator comum. Por exemplo: na expressão 2x+xy o fator comum é x, portanto temos 2x+xy=x(2+y)");
	regras["QS"] = new Regra ("Quadrado da Soma", "É um produto notável. Sua resposta é definida por: (a+b)² = a² + 2ab + b²");
	regras["QD"] = new Regra ("Quadrado da Diferença", "É um produto notável. Sua resposta é definida por: (a-b)² = a² - 2ab + b²");
	regras["PS"] = new Regra ("Produto da Soma pela Diferença", "É um produto notável. Sua resposta é definida por: (a+b)(a-b) = a² - b²");
	regras["BK"] = new Regra ("Bháskara", "explicação");
	regras["OI"] = new Regra ("Operação Inversa", "explicação");
	regras["SP"] = new Regra ("Simplificação", "Utilizada em frações, consiste em resolver os cálculos de uma fração para torná-la o mais simplificada possível. ");
	regras["RC"] = new Regra ("Racionalização", "Consiste em racionalizar o denominador de uma fração, ou seja, tornar este número racional ao invés de irracional.");
	regras["FT"] = new Regra ("Fatoração", "Consiste em manipular uma expressão de soma e subtração, transformando-a em uma multiplicação.");
	regras["RZ"] = new Regra ("Raiz", "explicação");
	regras["PT"] = new Regra ("Potenciação", "explicação");
	regras["RE"] = new Regra ("Reescrever Equação", "explicação");
	regras["PA"] = new Regra ("Princípio Aditivo", 'Também conhecida como "passar um termo para o outro lado invertendo o sinal", consiste em manipular a equação somando ou subtraindo por um termo nos dois lados para mantêla balanceada, possibilitando novos cálculos para chegar ao resultado final.');
	regras["PM"] = new Regra ("Princípio Multiplicativo", 'Também conhecida como "passar um termo para o outro lado multiplicando ou dividindo", consiste em manipular a equação multiplicando ou dividindo por um termo nos dois lados para mantêla balanceada, possibilitando novos cálculos para chegar ao resultado final.');
	regras["AF"] = new Regra ("Soma ou Subtração de Frações", "É a soma ou subtração de termos fracionários.");
	regras["MF"] = new Regra ("Multiplicação de Frações", "É a multiplicação de termos fracionários.");
	regras["DF"] = new Regra ("Divisão de Frações", "É a divisão de termos fracionários.");
}