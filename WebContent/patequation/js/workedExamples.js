function classPlan1() {
	$.guider({
		name: "1",
		next : "2",
		title : "Qual é o nosso objetivo?",
		description : "Descobrir o valor de X.",
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
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
		onShow: function() {resolutionEquation("x + 2 <font color='red'>- 2 </font> = 10", "step1", true);},
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
		onShow: function() {resolutionEquation("x + 2 <font color='red'>- 2 </font> = 10 <font color='red'>- 2 </font>", "step2", false);},
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
		title : 'A expressão "+0" não é mais necessária',
		description : "Assim, podemos removê-la no próximo passo.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x <font color='red'>+ 0 </font> = 10 <font color='red'>- 2 </font>", "step3", true);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line5").guider({
		name: "8",
		next : "9",
		title : "Pronto! ",
		description : "Conseguimos isolar o X. Agora só falta resolver a subtração 10 - 2. ",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x = 10 - 2", "step4", true);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line6").guider({
		name: "9",
		title : "Terminamos!",
		description : "Agora você já sabe como resolver equações simples de primeiro grau.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'> x = 8 </font>", "step5", true);},
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
}

function classPlan2() {
	$.guider({
		name: "1",
		next : "2",
		title : "Vamos rever como resolvemos uma equação",
		description : "Esta equação é do mesmo tipo que nós já vimos anteriormente. O nosso objetivo é isolar o X no lado esquerda da igualdade, e para fazer a isso a gente subtrai por 4 nos dois lados.",
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	}).show();
	
	$("#line3").guider({
		name: "2",
		next : "3",
		title : "Observe o que fizemos aqui",
		description : "Nós aplicamos a operação inversa, tínhamos o 4 somando ao X.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x + 4 <font color='red'>- 4 </font> = 10 <font color='red'>- 4 </font>", "step1", true);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line4").guider({
		name: "3",
		next : "4",
		title : "Utilizando a operação inversa, eu diminuo 4 de ambos os lados",
		description : "Isso sempre vai dar 0 somado ao x do lado esquerdo da igualdade.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x <font color='red'>+ 0 </font> = 10 <font color='red'>- 4 </font>", "step2", true);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line4").guider({
		name: "4",
		next : "5",
		title : "Dica",
		description : "Não é necessário escrever estes dois primeiros passos, então podemos removê-los da resolução.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {document.getElementById("step1").innerHTML = "<s>x + 4 - 4 = 10 - 4</s>"; document.getElementById("step1").style.opacity = "0.5";  document.getElementById("step2").innerHTML = "<s>x + 0 = 10 - 4</s>"; document.getElementById("step2").style.opacity = "0.5";},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line5").guider({
		name: "5",
		next : "6",
		title : "Dica",
		description : "Seguindo essa dica, nós eliminamos alguns passos e podemos ir direto aplicando a operação inversa do outro lado.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x = 10 <font color='red'>- 4 </font>", "step3", true);},		
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line6").guider({
		name: "6",
		title : "Tudo pronto!",
		description : "Conseguimos resolver a equação com sucesso.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = 6</font>", "step4", true); isWorkedExample = false;},		
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
}

function classPlan3() {
	$.guider({
		name: "1",
		next : "2",
		title : "Vamos resolver essa equação agora?",
		description : "Nós vamos aplicar novamente a operação inversa. Mas cuidado: a operação inversa da subtração é a adição.",
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
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
		title : "Vamos resolver essa equação agora?",
		description : "Lembre-se que o objetivo é fazer sumir o -4 somando ele com outro número cujo resultado dê zero.",
		width : 600,
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line3").guider({
		name: "3",
		next : "4",
		title : "Observe o que fizemos aqui",
		description : "Nós aplicamos a operação inversa, tínhamos o 4 subtraindo ao X.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x - 4 <font color='red'>+ 4</font> = 8 <font color='red'>+ 4</font>", "step1", true);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line4").guider({
		name: "4",
		next : "5",
		title : "Utilizando a operação inversa, eu somo 4 de ambos os lados",
		position: "bottom",
		description : "Isso sempre vai dar zero somado ao x do lado esquerdo da igualdade.",
		onShow: function() {resolutionEquation("x - 4 <font color='red'>+ 0</font> = 8 <font color='red'>+ 4</font>", "step2", true);},
		width : 600,
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line4").guider({
		name: "5",
		next : "6",
		title : "Dica",
		description : "Não é necessário escrever estes dois primeiros passos, então podemos removê-los da resolução.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {document.getElementById("step1").innerHTML = "<s>x - 4 + 4 = 8 + 4</s>"; document.getElementById("step1").style.opacity = "0.5";  document.getElementById("step2").innerHTML = "<s>x + 0 = 8 + 4</s>"; document.getElementById("step2").style.opacity = "0.5";},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line5").guider({
		name: "6",
		next : "7",
		title : "Dica",
		description : "Seguindo essa dica, nós eliminamos alguns passos e podemos ir direto aplicando a operação inversa do outro lado.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x = 8 <font color='red'>+ 4 </font>", "step3", true);},		
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line6").guider({
		name: "7",
		title : "Tudo pronto!",
		description : "Conseguimos resolver a equação com sucesso.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = 12</font>", "step4", true); isWorkedExample = false;},		
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
}

function classPlan4() {
	$.guider({
		name: "1",
		next : "2",
		title : "Vamos ver agora essa outra equação",
		description : "O 4 está somando ao X.",
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	}).show();
	
	$("#line3").guider({
		name: "2",
		next : "3",
		title : "Para eliminar alguns passos, vamos utilizar a operação inversa direto no lado direito",
		description : "Assim, vamos diminuir 4 do outro lado",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x = - 2 <font color='red'>- 4</font>", "step1", true);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line3").guider({
		name: "3",
		next : "4",
		title : "Atenção",
		description : "Observe que nós já tínhamos anteriormente do lado direito da igualdade um número negativo.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {showArrow();},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line4").guider({
		name: "4",
		title : "Mas a resolução é parecida",
		description : "A diferença é que teremos que operar com um número negativo.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {document.getElementById("arrow").innerHTML = ""; resolutionEquation("<font color='blue'>x = - 6</font>", "step2", true); isWorkedExample = false;},
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
}

function classPlan5() {
	$.guider({
		name: "1",
		next : "2",
		title : "Atenção agora!",
		description : "Vamos voltar a trabalhar com a operação inversa da subtração.",
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	}).show();
	
	$("#line3").guider({
		name: "2",
		next : "3",
		title : "Para eliminar alguns passos, vamos utilizar a operação inversa direto no lado direito",
		description : "A inversa da subtração é a soma. Então, vamos somar 3 do lado direito e eliminar o -3 do lado esquerdo.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x = - 6 <font color='red'>+ 3</font>", "step1", true);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line4").guider({
		name: "3",
		title : "Tudo pronto!",
		description : "Conseguimos resolver a equação com sucesso.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = - 3</font>", "step2", true); isWorkedExample = false;},
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
}

function classPlan6() {
	$.guider({
		name: "1",
		next : "2",
		title : "Vamos ver agora essa outra equação",
		description : "Novamente, queremos isolar o X do lado esquerdo.",
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	}).show();
	
	$("#line3").guider({
		name: "2",
		next : "3",
		title : "Para eliminar alguns passos, vamos utilizar a operação inversa direto no lado direito",
		description : "Vamos diminuir 1 do lado direito e eliminar o +1 do lado esquerdo.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x = 10 <font color='red'>- 1</font>", "step1", true);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line4").guider({
		name: "3",
		next : "4",
		title : "Opa! Aqui nós temos uma novidade!",
		description : "Temos o -X, só que não estamos procurando o valor de -X, e sim de +X.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x = 9", "step2", true);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line5").guider({
		name: "4",
		next : "5",
		title : "Como tornar esse -X positivo?",
		description : "Podemos multiplicar ele por -1, aí ele fica +X.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x <font color='red'>* (-1)</font> = 9", "step3", true); blink9(true, false);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line6").guider({
		name: "5",
		next : "6",
		title : "Mas atenção!",
		description : "Se nós multiplicarmos -1 do lado esquerdo, temos que multiplicar do lado direito também.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x <font color='red'>* (-1)</font> = 9 <font color='red'>* (-1)</font>", "step3", true); blink9(true, true);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$.guider({
		name: "6",
		title : "Vamos nos lembrar das regras de sinais da multiplicação",
		description : "Em cada uma das perguntas a seguir, selecione a alternativa que achar que é a resposta.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		buttons : {
			Começar: {
				click : function(){showQuestionsMultiplication();},
				className : "primary"
			}
		}
	});
}