//x+2=10
function classPlan1() {
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
		onShow: function() {resolutionEquation("x + 2 <font color='red'>- 2 </font> = 10", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
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
		onShow: function() {resolutionEquation("x + 2 <font color='red'>- 2 </font> = 10 <font color='red'>- 2 </font>", "step2", 0);},
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
		onShow: function() {resolutionEquation("x <font color='red'>+ 0 </font> = 10 <font color='red'>- 2 </font>", "step3", 1);},
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
		onShow: function() {resolutionEquation("x = 10 - 2", "step4", 1);},
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
		onShow: function() {resolutionEquation("<font color='blue'> x = 8 </font>", "step5", 1); isWorkedExample = false},
		buttons : {
			"Iniciar o tour": {
				click : function() {introduction(""); isTourInterativo = true; loadTasks(0); loadExercise(0);},
				className : "primary"
			}
		}
	});
}

//x+4=10
function classPlan2() {
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
		onShow: function() {resolutionEquation("x + 4 <font color='red'>- 4 </font> = 10 <font color='red'>- 4 </font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
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
		onShow: function() {resolutionEquation("x <font color='red'>+ 0 </font> = 10 <font color='red'>- 4 </font>", "step2", 1);},
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
		onShow: function() {resolutionEquation("x = 10 <font color='red'>- 4 </font>", "step3", 1);},		
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
		onShow: function() {resolutionEquation("<font color='blue'>x = 6</font>", "step4", 1); exitWorkedExample();},		
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
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "3", 1); 

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
		onShow: function() {resolutionEquation("x - 4 <font color='red'>+ 4</font> = 8 <font color='red'>+ 4</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
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
		onShow: function() {resolutionEquation("x - 4 <font color='red'>+ 0</font> = 8 <font color='red'>+ 4</font>", "step2", 1);},
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
		onShow: function() {resolutionEquation("x = 8 <font color='red'>+ 4 </font>", "step3", 1);},		
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
		onShow: function() {resolutionEquation("<font color='blue'>x = 12</font>", "step4", 1); exitWorkedExample();},		
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
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "4", 1); 

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
		onShow: function() {resolutionEquation("x = - 2 <font color='red'>- 4</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
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
		onShow: function() {document.getElementById("arrow").innerHTML = ""; resolutionEquation("<font color='blue'>x = - 6</font>", "step2", 1); exitWorkedExample();},
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
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "5", 1); 

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
		onShow: function() {resolutionEquation("x = - 6 <font color='red'>+ 3</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
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
		onShow: function() {resolutionEquation("<font color='blue'>x = - 3</font>", "step2", 1); exitWorkedExample();},
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
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "7", 1); 

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
		onShow: function() {resolutionEquation("- x = 10 <font color='red'>- 1</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
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
		onShow: function() {resolutionEquation("- x = 9", "step2", 1);},
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
		onShow: function() {resolutionEquation("- x <font color='green'>* (-1)</font> = 9", "step3", 1); blink9(true, 15);},
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
		onShow: function() {resolutionEquation("- x <font color='green'>* (-1)</font> = 9 <font color='green'>* (-1)</font>", "step4", 1);},
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
		description : "Em cada uma das perguntas a seguir, selecione a alternativa que você acha que é a resposta.",
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
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "8", 1); 

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
		onShow: function() {resolutionEquation("- x = 7 <font color='red'>+ 10</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
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
		onShow: function() {resolutionEquation("- x = 17", "step2", 1);},
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
		onShow: function() {resolutionEquation("- x <font color='red'>* (-1)</font>= 17 <font color='red'>* (-1)</font>", "step3", 1);},
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
		onShow: function() {resolutionEquation("<font color='blue'>x = - 17</font>", "step4", 1); exitWorkedExample();},	
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
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "9", 1); 

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
			onShow: function() {resolutionEquation("- x = - 8 <font color='red'>- 4</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
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
			onShow: function() {resolutionEquation("- x = - 12", "step2", 1);},
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
			onShow: function() {resolutionEquation("- x <font color='red'>* (-1)</font>= - 12 <font color='red'>* (-1)</font>", "step3", 1);},
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
			onShow: function() {resolutionEquation("<font color='blue'>x = 12</font>", "step4", 1); exitWorkedExample();},		
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
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "10", 1); 

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
		onShow: function() {resolutionEquation("- x = - 9 <font color='red'>+ 15</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
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
		onShow: function() {resolutionEquation("- x = 6", "step2", 1);},
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
		onShow: function() {resolutionEquation("- x <font color='red'>* (-1)</font> = 6 <font color='red'>* (-1)</font>", "step3", 1);},
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
		onShow: function() {resolutionEquation("<font color='blue'>x = - 6</font>", "step4", 1); exitWorkedExample();},		
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
}

//2x=10
function classPlan12() {
	contWE = 1;
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "12", 1); 

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
	
	$("#line4").guider({
		name: "5",
		next : "6",
		title : "Mas cuidado!",
		description : "O sinal de 2 não é alterado, permanece como um número positivo. O sinal só é modificado quando trabalhamos com adição e subtração, onde a operação inversa troca o sinal.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">2</font></div><div class="numerator">10</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step1", 1); document.getElementById("lineFrac1").style.color = "green"; document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line6").guider({
		name: "6",
		next : "7",
		title : "Observe que dividindo o 2 no lado direito, também estamos efetuando a divisão no lado esquerdo",
		description : "Mas conforme fizemos anteriormente, podemos aplicar direto a operação inversa, não sendo necessário passar por este passo.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation('<span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">2</font></div><div class="numerator">2x</div><div id="lineFrac2" class="frac-line-aux"><span id="lineFrac2" class="frac-line"></span></div><span class="baseline-fix"></span></span></span> = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">2</font></div><div class="numerator">10</div><div id="fracLine3" class="frac-line-aux"><span id="lineFrac3" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step2", 2); document.getElementById("lineFrac2").style.color = "green"; document.getElementById("lineFrac3").style.color = "green";},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line7").guider({
		name: "7",
		title : "Tudo pronto!",
		description : "Ao resolver a divisão do lado direito, descobrimos o valor de X e finalizamos a resolução da equação.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {document.getElementById("step2").innerHTML = '<span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><s>2</s></div><div class="numerator"><s>2x</s></div><div class="frac-line-aux"><span class="frac-line"></span></div><span class="baseline-fix"></span></span></span> = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><s>2</s></div><div class="numerator"><s>10</s></div><div class="frac-line-aux"><span class="frac-line"></span></div><span class="baseline-fix"></span></span></span>'; document.getElementById("step2").style.opacity = "0.5"; resolutionEquation("<font color='blue'>x = 5</font>", "step3", 2); exitWorkedExample();},	
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
} 

//5x=-30
function classPlan13() {
	contWE = 1;
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "13", 1); 
	
	$.guider({
		name: "1",
		next : "2",
		title : "Vamos resolver essa equação agora?",
		description : "Observe que esta equação também tem um coeficiente.",
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
	
	$("#line4").guider({
		name: "2",
		next : "3",
		title : "Utilizando a operação inversa, passamos o 5 para o outro lado dividindo o -30",
		description : "Lembre-se que seu sinal não deve ser alterado.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">5</font></div><div class="numerator">- 30</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step1", 1); document.getElementById("lineFrac1").style.color = "green"; document.getElementById("currentEquation").style.opacity = "0.5";},
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
		title : "Atenção agora!",
		description : "Temos a divisão de um número negativo por um número positivo.",
		position: "bottom",
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
		name: "4",
		next : "5",
		title : "A regra de sinais da multiplicação também é válida para a divisão",
		description : "Assim, a divisão de números de mesmos sinais resulta em um número positivo. Por outro lado, a divisão de números de sinais diferentes tem como resultado um número negativo.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line5").guider({
		name: "5",
		title : "Tudo pronto!",
		description : "Ao resolver a divisão do lado direito, descobrimos o valor de X e finalizamos a resolução da equação.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = - 6</font>", "step2", 2); exitWorkedExample();},
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});	
}

//-3x=15
function classPlan14() {
	contWE = 1;
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "14", 1); 

	$.guider({
		name: "1",
		next : "2",
		title : "Vamos ver agora essa outra equação",
		description : "Observe que X possui um coeficiente negativo.",
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
	
	$("#line4").guider({
		name: "2",
		next : "3",
		title : "Utilizando a operação inversa, passamos o -3 para o outro lado dividindo o 15",
		description : "Cuidado: o sinal negativo deve ser preservado",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">- 3</font></div><div class="numerator">15</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step1", 1); document.getElementById("lineFrac1").style.color = "green"; document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line5").guider({
		name: "3",
		title : "Terminamos!",
		description : "Lembre-se que ao dividir um número positivo por um negativo, temos como resultado um número negativo.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = - 5</font>", "step2", 2); exitWorkedExample();},
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});	
}

//-4x=-28
function classPlan15() {
	contWE = 1;
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "15", 1); 
	
	$.guider({
		name: "1",
		next : "2",
		title : "Atenção agora!",
		description : "Todos os termos da equação são negativos.",
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
	
	$("#line4").guider({
		name: "2",
		next : "3",
		title : "Utilizando a operação inversa, passamos o -4 para o outro lado dividindo o -28",
		description : "Lembre-se que o sinal negativo deve ser preservado",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">- 4</font></div><div class="numerator">- 28</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step1", 1); document.getElementById("lineFrac1").style.color = "green"; document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line5").guider({
		name: "3",
		title : "Terminamos!",
		description : "Você se lembra da regra dos sinais? A divisão de dois números negativos resulta em um número positivo.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = 7</font>", "step2", 2); exitWorkedExample();},
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});	
}

//(x)/(4)=20
function classPlan17() {
	contWE = 1;
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "17", 1); 

	$.guider({
		name: "1",
		next : "2",
		title : "Opa! Aqui temos mais uma novidade!",
		description : "Vamos trabalhar com frações pela primeira vez.",
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
		title : "A incógnita X encontra-se em uma fração",
		description : "Também podemos dizer que X possui um coeficiente fracionário, o número 1/4.",
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
		title : "Como fazemos para tirar o 4 daqui?",
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
	
	$("#line4").guider({
		name: "4",
		next : "5",
		title : "A operação inversa da divisão é a multiplicação",
		description : "Assim, devemos passar o 4 para o outro lado multiplicando o 20.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation("x = 20 <font color='green'>* 4</font>", "step1", 2); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line5").guider({
		name: "5",
		title : "Tudo pronto!",
		description : "Ao resolver a multiplicação do lado direito, descobrimos o valor de X e finalizamos a resolução da equação.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("<font color='blue'>x = 80</font>", "step2", 2); exitWorkedExample();},
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});	
}

//(x)/(7)=-49
function classPlan18() {
	contWE = 1;
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "18", 1); 

		$.guider({
			name: "1",
			next : "2",
			title : "Vamos resolver essa equação agora?",
			description : "Esta equação é bem parecida com a anterior, porém vamos trabalhar com um número negativo.",
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
		
		$("#line4").guider({
			name: "2",
			next : "3",
			title : "Utilizando a operação inversa, passamos o 7 para o outro lado multiplicando o -49",
			description : "Lembre-se que o seu sinal positivo deve ser preservado",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("x = - 49 <font color='green'>* 7</font>", "step1", 2); document.getElementById("currentEquation").style.opacity = "0.5";},
			buttons : {
				Próximo: {
					click : true,
					className : "primary"
				}
			}
		});
		
		$("#line5").guider({
			name: "3",
			title : "Terminamos!",
			description : "Lembre-se que a multiplicação de um número negativo por um positivo resulta em um número negativo",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {contWE = 1; resolutionEquation("<font color='blue'>x = - 343</font>", "step2", 2); exitWorkedExample();},
			buttons : {
				Finalizar: {
					click : true,
					className : "primary"
				}
			}
		});	
}

//-(x)/(6)=42
function classPlan19() {
	contWE = 1;
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "19", 1); 

		$.guider({
			name: "1",
			next : "2",
			title : "Atenção agora!",
			description : "Esta equação é um pouco diferente das anteriores, pois estamos trabalhando com uma fração negativa.",
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
			title : "Neste caso também vamos aplicar a operação inversa",
			description : "Porém, temos que cuidar o que faremos com o sinal negativo",
			position: "bottom",
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
			title : "Temos duas formas de resolver este problema",
			description : "A primeira seria passar o 6 para o outro lado, mantendo o sinal negativo em X",
			position: "bottom",
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
			title : "Mas também podemos passar o sinal negativo junto com o 6",
			description : "Dessa forma, passamos o 6 para o outro lado, mas como um número negativo.",
			position: "bottom",
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
			name: "5",
			next : "6",
			title : "Qual das duas opções você prefere?",
			description : "Selecione-a abaixo:",
			position: "bottom",
			width : 600,
			alignButtons : "center",
			buttons : {
				"Manter o sinal negativo em X": function() {classPlan19a();},				
				"Passar o sinal negativo para o outro lado": function() {classPlan19b();}
			}
		});
}

function classPlan19a() {
	$.guider({
		name: "1",
		next : "2",
		title : "Você escolheu manter o sinal negativo em X",
		description : "Confira a seguir os passos da resolução desta maneira:",
		width : 600,
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	}).show();
	
	$("#line4").guider({
		name: "2",
		next : "3",
		title : "Utilizando a operação inversa, passamos o 6 para o outro lado multiplicando o 42",
		description : "Observe que mantivemos o sinal de menos, deixando o X negativo",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x = 42 <font color='green'>* 6</font>", "step1", 2); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line5").guider({
		name: "3",
		next : "4",
		title : "Você se lembra como fazemos para deixar o X positivo?",
		description : "É só a gente multiplicar por -1 os dois lados da igualdade.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("- x = 252", "step2", 2);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line6").guider({
		name: "4",
		next : "5",
		title : "Pronto!",
		description : "Agora só falta resolvermos essas multiplicações para concluir a resolução da equação.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("- x <font color='green'>* (-1)</font>= 252 <font color='green'>* (-1)</font>", "step3", 2);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line7").guider({
		name: "5",
		title : "Terminamos!",
		description : "Conseguimos resolver a equação com sucesso.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("<font color='blue'>x = - 252</font>", "step4", 2); exitWorkedExample();},
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});	
}

function classPlan19b() {
	$.guider({
		name: "1",
		next : "2",
		title : "Você escolheu passar o sinal negativo para o outro lado",
		description : "Confira a seguir os passos da resolução desta maneira:",
		width : 600,
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	}).show();
	
	$("#line4").guider({
		name: "2",
		next : "3",
		title : "Utilizando a operação inversa, passamos o 6 para o outro lado multiplicando o 42",
		description : "Observe que neste caso o sinal de menos acompanha o número 6, o qual fica negativo do outro lado",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation("x = 42 <font color='green'>* (-6)</font>", "step1", 2); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line5").guider({
		name: "3",
		title : "Tudo pronto!",
		description : "Conseguimos resolver a equação com sucesso.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("<font color='blue'>x = - 252</font>", "step2", 2); exitWorkedExample();},
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});	
}

//-(x)/(4)=-100
function classPlan20() {
	contWE = 1;
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "20", 1); 

	$.guider({
		name: "1",
		next : "2",
		title : "Vamos ver agora essa outra equação",
		description : "Observe que ambos os lados da igualdade são negativos.",
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
		title : "Opa! Aqui nós também temos uma fração negativa",
		description : "Você se lembra que temos duas formas de resolver este problema? Selecione abaixo a que você preferir:",
		position: "bottom",
		width : 600,
		alignButtons : "center",
		buttons : {
			"Manter o sinal negativo em X": function() {classPlan20a();},				
			"Passar o sinal negativo para o outro lado": function() {classPlan20b();}
		}
	});
}

function classPlan20a() {
	$.guider({
		name: "1",
		next : "2",
		title : "Você escolheu manter o sinal negativo em X",
		description : "Confira a seguir os passos da resolução desta maneira:",
		width : 600,
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	}).show();
	
	$("#line4").guider({
		name: "2",
		next : "3",
		title : "Utilizando a operação inversa, passamos o 4 para o outro lado multiplicando o -100",
		description : "Observe que mantivemos o sinal de menos, deixando o X negativo",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x = - 100 <font color='green'>* 4</font>", "step1", 2); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line5").guider({
		name: "3",
		next : "4",
		title : "Você se lembra como fazemos para deixar o X positivo?",
		description : "É só a gente multiplicar por -1 os dois lados da igualdade.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("- x = - 400", "step2", 2);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line6").guider({
		name: "4",
		next : "5",
		title : "Pronto!",
		description : "Agora só falta resolvermos essas multiplicações para concluir a resolução da equação.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("- x <font color='green'>* (-1)</font>= - 400 <font color='green'>* (-1)</font>", "step3", 2);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line7").guider({
		name: "5",
		title : "Terminamos!",
		description : "Conseguimos resolver a equação com sucesso.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("<font color='blue'>x = 400</font>", "step4", 2); exitWorkedExample();},
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});	
}

function classPlan20b() {
	$.guider({
		name: "1",
		next : "2",
		title : "Você escolheu passar o sinal negativo para o outro lado",
		description : "Confira a seguir os passos da resolução desta maneira:",
		width : 600,
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	}).show();
	
	$("#line4").guider({
		name: "2",
		next : "3",
		title : "Utilizando a operação inversa, passamos o 4 para o outro lado multiplicando o -100",
		description : "Observe que neste caso o sinal de menos acompanha o número 4, que fica negativo do outro lado",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation("x = - 100 <font color='green'>* (-4)</font>", "step1", 2); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line5").guider({
		name: "3",
		title : "Tudo pronto!",
		description : "Conseguimos resolver a equação com sucesso.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("<font color='blue'>x = 400</font>", "step2", 2); exitWorkedExample();},
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});	
}

//4x-10=8
function classPlan22() {
	contWE = 1;
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "22", 1); 

		$.guider({
			name: "1",
			next : "2",
			title : "Opa! Aqui temos uma novidade muito importante!",
			description : "Esse é o formato padrão de equações de primeiro grau.",
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
			title : "Observe que será necessário aplicarmos mais de um tipo de operação inversa",
			description : "Temos uma multiplicação em X seguida de uma subtração.",
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
			title : "Vamos começar pela operação inversa da subtração, que é a adição",
			description : "Assim, passamos o -10 para o outro lado invertendo o seu sinal.",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("4x = 8 <font color='red'>+ 10</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
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
			title : "Resolvendo a soma do lado direito, obtemos o número 18",
			description : "Agora, o nosso próximo passo é isolar a incógnita X.",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("4x = 18", "step2", 1);},
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
			title : "Utilizando a operação inversa da multiplicação, passamos o 4 para o outro lado dividindo o 18",
			description : "Cuidado: estamos trabalhando com multiplicação e divisão, assim o 4 deve permanecer com o mesmo sinal (positivo).",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">4</font></div><div class="numerator">18</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step3", 1); document.getElementById("lineFrac1").style.color = "green";},
			buttons : {
				Próximo: {
					click : true,
					className : "primary"
				}
			}
		});
		
		$("#line7").guider({
			name: "6",
			title : "Podemos simplificar esta fração dividindo por 2 em cima e em baixo",
			description : "Assim chegamos ao resultado final da equação.",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation('<font color="blue">x = </font><span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="blue">2</font></div><div class="numerator"><font color="blue">9</font></div><div id="lineFrac2" class="frac-line-aux"><span id="lineFrac2" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step4", 2); document.getElementById("lineFrac2").style.color = "blue"; exitWorkedExample();},
			buttons : {
				Finalizar: {
					click : true,
					className : "primary"
				}
			}
		});
		
}

//-3x+9=-27
function classPlan23() {
	contWE = 1;
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "23", 1); 

		$.guider({
			name: "1",
			next : "2",
			title : "Vamos resolver essa equação agora?",
			description : "Esta equação é bem parecida com a anterior, porém X possui um coeficiente negativo e o termo do lado direito também é negativo.",
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
			title : "Observe que também será necessário aplicarmos mais de um tipo de operação inversa",
			description : "Temos uma multiplicação em X seguida de uma adição.",
			position: "bottom",
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
			title : "Vamos começar pela operação inversa da adição, que é a subtração",
			description : "Assim, passamos o +9 para o outro lado invertendo o seu sinal.",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("- 3x = - 27 <font color='red'>- 9</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
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
			title : "Resolvendo a subtração do lado direito, obtemos o número -36",
			description : "Agora, o nosso próximo passo é isolar a incógnita X.",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("- 3x = - 36", "step2", 1);},
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
			title : "Para eliminar alguns passos, vamos passar direto o -3 dividindo o -36 no outro lado",
			description : "Lembre-se que o sinal negativo deve ser preservado.",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">-3</font></div><div class="numerator">-36</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step3", 1); document.getElementById("lineFrac1").style.color = "green";},
			buttons : {
				Próximo: {
					click : true,
					className : "primary"
				}
			}
		});
		
		$("#line7").guider({
			name: "6",
			title : "Lembre-se que a divisão de dois números negativos resulta em um número positivo",
			description : "Tudo pronto! Conseguimos resolver a equação com sucesso.",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation('<font color="blue">x = 12</font>', "step4", 2); exitWorkedExample();},
			buttons : {
				Finalizar: {
					click : true,
					className : "primary"
				}
			}
		});
		
}

//5x+8-2x=10+x
function classPlan24() {
	contWE = 1;
	var cookieName = "currentWE" + currentPos; 
	setCookieDays (cookieName, "23", 1); 

		$.guider({
			name: "1",
			next : "2",
			title : "Opa! Aqui temos mais uma novidade!",
			description : "Vamos trabalhar pela primeira vez com expressões envolvendo mais de um termo de X.",
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
			title : "Neste caso, podemos dizer que temos termos semelhantes que podem ser somados ou subtraídos",
			description : "São eles: 5x, -2x e x",
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
			title : "Vamos começar resolvendo a subtração no lado esquerdo",
			description : "Quando temos uma diferença de termos semelhantes, conservamos a incógnita X e subtraímos seus coeficientes.",
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
			name: "4",
			next : "5",
			title : "Nesta equação, temos que 5x - 2x = (5 - 2)x = 3x",
			description : "O próximo passo é tirar o +8 daqui.",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("3x + 8 = 10 + x", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
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
			title : "A operação inversa da adição é a subtração",
			description : "Assim, passamos o +8 para o outro lado invertendo o seu sinal.",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("3x = 10 + x <font color='red'>- 8</font>", "step2", 1);},
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
			title : "Agora podemos resolver a subtração que temos no lado direito",
			description : "Ao mesmo tempo poderíamos passar o +x, mas vamos fazer um passo de cada vez.",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("3x = 2 + x", "step3", 1);},
			buttons : {
				Próximo: {
					click : true,
					className : "primary"
				}
			}
		});
		
		$("#line6").guider({
			name: "6",
			next : "7",
			title : "A operação inversa também vale para termos em função de X",
			description : "Dessa forma, passamos o +x para o lado esquerdo invertendo o seu sinal.",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("3x <font color='red'> - x</font> = 2", "step4", 1);},
			buttons : {
				Próximo: {
					click : true,
					className : "primary"
				}
			}
		});
		
		$("#line7").guider({
			name: "7",
			next : "8",
			title : "Ao resolver a subtração 3x - x, obtemos 2x",
			description : "Estamos quase terminando de resolver esta equação.",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("2x = 2", "step5", 1);},
			buttons : {
				Próximo: {
					click : true,
					className : "primary"
				}
			}
		});
		
		$("#line8").guider({
			name: "8",
			next : "9",
			title : "Utilizando a operação inversa, passamos o 2 para o outro lado dividindo o outro número 2",
			description : "Lembre-se que devemos preservar o seu sinal positivo.",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">2</font></div><div class="numerator">2</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step6", 1); document.getElementById("lineFrac1").style.color = "green";},
			buttons : {
				Próximo: {
					click : true,
					className : "primary"
				}
			}
		});
		
		$("#line10").guider({
			name: "9",
			title : "Tudo pronto!",
			description : "Simplificando esta fração, chegamos ao resultado 1 e concluímos o desenvolvimento da equação.",
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("<font color='blue'>x = 1</font>", "step7", 2); exitWorkedExample();},
			buttons : {
				Finalizar: {
					click : true,
					className : "primary"
				}
			}
		});	
}
//function openWorkedExample(id) {	
//	if (id === 26) {
//		loadExerciseWE("2(x+3)-5=5(x+2)", 100);
//		classPlan26();
//	}
//
//	if (id === 27) {
//		loadExerciseWE("(x+3)/(3)=(4)/(9)", 100);
//		classPlan27();
//	}
//
//	if (id === 29) {
//		loadExerciseWE("(x)/(4)+5=(2)/(3)-(5x)/(8)", 120);
//		classPlan29();
//	}
//
//	if (id === 30) {
//		loadExerciseWE("(x+2)/(5)+8=(x-3)/(4+2)", 140);
//		classPlan30();
//	}
//
//	if (id === 31) {
//		loadExerciseWE("(4(x+3))/(7)+5=(-2(-x-1))/(5+8)", 160);
//		classPlan31();
//	}
//
//	if (id === 33) {
//		loadExerciseWE("(4)/(x)+(2)/(3)-5=(8)/(6x)", 200);
//		classPlan33();
//	}
//
//	if (id === 34) {
//		loadExerciseWE("(5)/(4x-2)+9=(10)/(-4(x-3))", 300);
//		classPlan34();
//	}
	
	
//}
