//x+2=10
function classPlan1() {
	loadExerciseWE("x+2=10", 20);
	$.guider({
		next: "1",
		title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Bem-vindo! </center>",
		description : "<center>O PAT2Math é um programa que auxilia na resolução de equações algébricas. <br>Vamos conferir alguns conceitos básicos antes de começar.</center>",
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
	});

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
		description : "Agora, vamos conferir alguns funcionamentos básicos do PAT2Math.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'> x = 8 </font>", "step5", true); isWorkedExample = false},
		buttons : {
			"Iniciar o tour": {
				click : function() {introduction(""); isTourInterativo = true; loadExercise(0);},
				className : "primary"
			}
		}
	});
}

//x+4=10
function classPlan2() {
	loadExerciseWE("x+4=10", 20);
	$.guider({
		name: "1",
		next : "2",
		title : "Vamos rever como resolver uma equação",
		description : "Esta equação é do mesmo tipo que nós já vimos anteriormente. O nosso objetivo é isolar o X no lado esquerdo da igualdade, e para fazer isso a gente subtrai por 4 nos dois lados.",
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
		onShow: function() {resolutionEquation("<font color='blue'>x = 6</font>", "step4", true); isWorkedExample = false; blockMenu = false; var cookieName = "currentWE" + currentPos; setCookieDays (cookieName, "", 0); var cookieName = "currentWE" + currentPos; setCookieDays (cookieName, "", 0); $("#topics").fadeIn(); $("#topicsAux").hide();},		
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
}

//x-4=8
function classPlan3() {
	loadExerciseWE("x-4=8", 20);
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
		onShow: function() {resolutionEquation("<font color='blue'>x = 12</font>", "step4", true); isWorkedExample = false; blockMenu = false; var cookieName = "currentWE" + currentPos; setCookieDays (cookieName, "", 0); $("#topics").fadeIn(); $("#topicsAux").hide();},		
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
}

//x+4=-2
function classPlan4() {
	loadExerciseWE("x+4=-2", 20);
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
		onShow: function() {document.getElementById("arrow").innerHTML = ""; resolutionEquation("<font color='blue'>x = - 6</font>", "step2", true); isWorkedExample = false; blockMenu = false; var cookieName = "currentWE" + currentPos; setCookieDays (cookieName, "", 0); $("#topics").fadeIn(); $("#topicsAux").hide();},
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
}

//x-3=-6
function classPlan5() {
	loadExerciseWE("x-3=-6", 20);
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
		description : "A inversa da subtração é a soma. Então, vamos somar 3 no lado direito e eliminar o -3 do lado esquerdo.",
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
		onShow: function() {resolutionEquation("<font color='blue'>x = - 3</font>", "step2", true); isWorkedExample = false; blockMenu = false; var cookieName = "currentWE" + currentPos; setCookieDays (cookieName, "", 0); $("#topics").fadeIn(); $("#topicsAux").hide();},
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
}

//-x+1=10
function classPlan7() {
	loadExerciseWE("-x+1=10", 25);
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
		onShow: function() {resolutionEquation("- x <font color='red'>* (-1)</font> = 9", "step3", true); blink9(true, 15);},
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
		onShow: function() {resolutionEquation("- x <font color='red'>* (-1)</font> = 9 <font color='red'>* (-1)</font>", "step4", true);},
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

//-x-10=7
function classPlan8() {
	loadExerciseWE("-x-10=7", 25);
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
		title : "Assim como fizemos nas equações anteriores, vamos utilizar a operação inversa direto no lado direito",
		description : "Vamos somar 10 no lado direito e eliminar o -10 do lado esquerdo.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x = 7 <font color='red'>+ 10</font>", "step1", true);},
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
		title : "Observe que novamente temos um X negativo",
		description : "Para resolver esse problema, vamos multiplicar os dois lados da equação por -1.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x = 17", "step2", true);},
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
		title : "Lembre-se das regras dos sinais",
		description : "Menos vezes menos dá mais, e mais vezes menos dá menos.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x <font color='red'>* (-1)</font>= 17 <font color='red'>* (-1)</font>", "step3", true);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line6").guider({
		name : "5",
		title : "Terminamos!",
		description : "Conseguimos resolver a equação com sucesso.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = - 17</font>", "step4", true); isWorkedExample = false; blockMenu = false; var cookieName = "currentWE" + currentPos; setCookieDays (cookieName, "", 0); $("#topics").fadeIn(); $("#topicsAux").hide();},	
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
}
	
//-x+4=-8
function classPlan9() {
	loadExerciseWE("-x+4=-8", 25);
		$.guider({
			name: "1",
			next : "2",
			title : "Vamos resolver essa equação agora?",
			description : "Nós vamos aplicar novamente a operação inversa, dessa vez da adição.",
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
			title : "O nosso objetivo é eliminar o +4 do lado esquerdo",
			description : "Para tanto, vamos subtrair 4 do lado esquerdo. ",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("- x = - 8 <font color='red'>- 4</font>", "step1", true);},
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
			title : "Lembra-se o que fazemos agora?",
			description : "Temos que multiplicar -1 nos dois lados para obter o X positivo. ",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("- x = - 12", "step2", true);},
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
			title : "Relembrando as regras dos sinais",
			description : "Temos números negativos nos dois lados da equação, e menos vezes menos dá mais.",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("- x <font color='red'>* (-1)</font>= - 12 <font color='red'>* (-1)</font>", "step3", true);},
			buttons : {
				Próximo: {
					click : true,
					className : "primary"
				}
			}
		});
		
		$("#line6").guider({
			name: "5",
			title : "Tudo pronto!",
			description : "Conseguimos resolver a equação com sucesso.",
			position: "bottom",
			width : 600,
			position: "bottom",
			alignButtons : "right",
			onShow: function() {resolutionEquation("<font color='blue'>x = 12</font>", "step4", true); isWorkedExample = false; blockMenu = false; var cookieName = "currentWE" + currentPos; setCookieDays (cookieName, "", 0); $("#topics").fadeIn(); $("#topicsAux").hide();},		
			buttons : {
				Finalizar: {
					click : true,
					className : "primary"
				}
			}
		});
}

//-x-15=-9
function classPlan10() {
	loadExerciseWE("-x-15=-9", 25);
	$.guider({
		name: "1",
		next : "2",
		title : "Vamos ver agora essa outra equação",
		description : "Observe que todos os termos são negativos.",
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
		title : "A operação inversa da subtração é a soma",
		description : "Assim, somamos 15 no lado direito para eliminar o -15 do lado esquerdo.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x = - 9 <font color='red'>+ 15</font>", "step1", true);},
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
		title : "Agora nós temos o -X",
		description : "Mas lembre-se que queremos descobrir o valor de +X.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x = 6", "step2", true);},
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
		title : "Novamente temos um jogo de sinais",
		description : "Você se lembra das regras? Se temos uma multiplicação de sinais iguais, temos mais no final;<br>" +
					  "Se temos uma multiplicação de sinais diferentes, temos menos no final.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x <font color='red'>* (-1)</font>= 6 <font color='red'>* (-1)</font>", "step3", true);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line6").guider({
		name: "5",
		title : "Terminamos!",
		description : "Conseguimos resolver a equação com sucesso.",
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = - 6</font>", "step4", true); isWorkedExample = false; blockMenu = false; var cookieName = "currentWE" + currentPos; setCookieDays (cookieName, "", 0); $("#topics").fadeIn(); $("#topicsAux").hide();},		
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
}

//2x=10
/* É necessário um tratamento especial com as frações, já que ocupam duas linhas
 * Ver se preciso modificar o método resolutionEquation
 * É possível modificar a cor da linha pela propriedade "color" de "style", modificar pelo ID dela
 */
function classPlan12() {
	loadExerciseWE("2x=10", 25);
	$.guider({
		name: "1",
		next : "2",
		title : "Opa! Aqui temos uma novidade muito importante!",
		description : "X possui um coeficiente.",
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
		title : "O que é um coeficiente?",
		description : "É o número que multiplica X; neste caso, é o 2.",
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
		title : "Como fazemos para tirar o 2 daqui?",
		description : "Seguimos o mesmo princípio da operação inversa, conforme vimos anteriormente.",
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
		name: "4",
		next : "5",
		title : "A operação inversa da multiplicação é a divisão",
		description : "Assim, devemos passar o 2 para o outro lado dividindo o 10.",
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
		name: "5",
		next : "6",
		title : "Mas cuidado!",
		description : "O sinal de 2 não é alterado, permanece como um número positivo. O sinal só é modificado quando trabalhamos com adição e subtração, onde a operação inversa troca o sinal.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">2</font></div><div class="numerator">10</div><div class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step1", true);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line4").guider({
		name: "6",
		next : "7",
		title : "Observe que dividindo o 2 no lado direito, também estamos efetuando a divisão no lado esquerdo",
		description : "Mas conforme fizemos anteriormente, podemos aplicar direto a operação inversa, não sendo necessário passar por este passo.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation('<span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">2</font></div><div class="numerator">2x</div><div class="frac-line-aux"><span id="lineFrac2" class="frac-line"></span></div><span class="baseline-fix"></span></span></span> = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">2</font></div><div class="numerator">10</div><div class="frac-line-aux"><span id="lineFrac3" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step2", true);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line5").guider({
		name: "7",
		title : "Tudo pronto!",
		description : "Ao resolver a divisão do lado direito, descobrimos o valor de X e finalizamos a resolução da equação.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {document.getElementById("step2").innerHTML = '<span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green"><s>2</s></font></div><div class="numerator"><s>2x</s></div><div class="frac-line-aux"><span class="frac-line"></span></div><span class="baseline-fix"></span></span></span> = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><s>2</s></div><div class="numerator"><s>10</s></div><div class="frac-line-aux"><span class="frac-line"></span></div><span class="baseline-fix"></span></span></span>'; document.getElementById("step2").style.opacity = "0.5"; resolutionEquation("<font color='blue'>x = 5</font>", "step3", true); isWorkedExample = false; blockMenu = false; var cookieName = "currentWE" + currentPos; setCookieDays (cookieName, "", 0); $("#topics").fadeIn(); $("#topicsAux").hide();},	
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
} 
function openWorkedExample(id) {
	if (enableWorkedExamples) {
	if (id !== 1 && id !== 2 && id !== 6 && id !== 11 && id !== 16 && id !== 21 && id !== 25 && id !== 28 && id !== 32 && id !== 35 && id !== 36) {
	var cookieName = "currentWE" + currentPos;
	setCookieDays (cookieName, id, 1);
		
	if (id === 3) {
		loadExerciseWE("x-4=8", 20);
		classPlan3();
	}

	if (id === 4) {
		loadExerciseWE("x+4=-2", 20);
		classPlan4();
	}

	if (id === 5) {
		loadExerciseWE("x-3=-6", 20);
		classPlan5();
	}

	if (id === 7) {
		loadExerciseWE("-x+1=10", 25);
		classPlan7();
	}

	if (id === 8) {
		loadExerciseWE("-x-10=7", 25);
		classPlan8();
	}

	if (id === 9) {
		loadExerciseWE("-x+4=-8", 25);
		classPlan9();
	}

	if (id === 10) {
		loadExerciseWE("-x-15=-9", 25);
		classPlan10();
	}

	if (id === 12) {
		loadExerciseWE("2x=10", 30);
		classPlan12();
	}

	if (id === 13) {
		loadExerciseWE("5x=-30", 30);
		classPlan13();
	}

	if (id === 14) {
		loadExerciseWE("-3x=15", 35);
		classPlan14();
	}

	if (id === 15) {
		loadExerciseWE("-4x=-28", 35);
		classPlan15();
	}

	if (id === 17) {
		loadExerciseWE("(x)/(4)=20", 40);
		classPlan17();
	}

	if (id === 18) {
		loadExerciseWE("(x)/(7)=-49", 40);
		classPlan18();
	}

	if (id === 19) {
		loadExerciseWE("-(x)/6)=42", 50);
		classPlan19();
	}

	if (id === 20) {
		loadExerciseWE("-(x)/(4)=-100", 50);
		classPlan20();
	}

	if (id === 22) {
		loadExerciseWE("4x-10=8", 50);
		classPlan22();
	}

	if (id === 23) {
		loadExerciseWE("-3x+9=-27", 60);
		classPlan23();
	}

	if (id === 24) {
		loadExerciseWE("5x+8-2x=10+x", 80);
		classPlan24();
	}

	if (id === 26) {
		loadExerciseWE("2(x+3)-5=5(x+2)", 100);
		classPlan26();
	}

	if (id === 27) {
		loadExerciseWE("(x+3)/(3)=(4)/(9)", 100);
		classPlan27();
	}

	if (id === 29) {
		loadExerciseWE("(x)/(4)+5=(2)/(3)-(5x)/(8)", 120);
		classPlan29();
	}

	if (id === 30) {
		loadExerciseWE("(x+2)/(5)+8=(x-3)/(4+2)", 140);
		classPlan30();
	}

	if (id === 31) {
		loadExerciseWE("(4(x+3))/(7)+5=(-2(-x-1))/(5+8)", 160);
		classPlan31();
	}

	if (id === 33) {
		loadExerciseWE("(4)/(x)+(2)/(3)-5=(8)/(6x)", 200);
		classPlan33();
	}

	if (id === 34) {
		loadExerciseWE("(5)/(4x-2)+9=(10)/(-4(x-3))", 300);
		classPlan34();
	}
	}
	}
}
