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
	
	setCookieDays ("currentWE", "3", 1); 

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
		description : "Seguindo essa dica, nós eliminamos alguns passos e podemos aplicar direto a operação inversa do outro lado.",
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
	
	setCookieDays ("currentWE", "4", 1); 

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
	
	setCookieDays ("currentWE", "5", 1); 

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
	
	setCookieDays ("currentWE", "7", 1); 

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
	
	setCookieDays ("currentWE", "8", 1); 

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
	
	setCookieDays ("currentWE", "9", 1); 

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
	
	setCookieDays ("currentWE", "10", 1); 

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
	
	setCookieDays ("currentWE", "12", 1); 

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
	
	setCookieDays ("currentWE", "13", 1); 
	
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
	
	setCookieDays ("currentWE", "14", 1); 

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
	
	setCookieDays ("currentWE", "15", 1); 
	
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
	
	setCookieDays ("currentWE", "17", 1); 

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
	
	setCookieDays ("currentWE", "18", 1); 

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

//(x)/(-6)=42
function classPlan19() {
		$.guider({
			name: "1",
			next : "2",
			title : "Atenção agora!",
			description : "Esta equação é um pouco diferente das anteriores, pois estamos trabalhando com denominador negativo.",
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
					click : function() {classPlan19b();},
					className : "primary"
				}
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
	}).show();
	
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
	
	setCookieDays ("currentWE", "20", 1); 

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
	
	setCookieDays ("currentWE", "22", 1); 

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
	
	setCookieDays ("currentWE", "23", 1); 

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
	
	setCookieDays ("currentWE", "23", 1); 

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
			name: "6",
			next : "7",
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
			name: "7",
			next : "8",
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
			name: "8",
			next : "9",
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
			name: "9",
			next : "10",
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
			name: "10",
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

function classPlan27() {
	contWE = 1;
	$.guider({
		name: "1",
		next : "2",
		title : "Apresentamos as equações com propriedade distributiva",
		description : "Essas equações são mais fáceis do que parecem. Vamos explicar passo-a-passo para você entender direitinho",
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
		title : "O que é a propriedade distributiva?",
		description : "É uma propriedade da multiplicação que nos diz que, na multiplicação de números quaisquer, podemos converter qualquer um deles em uma soma ou subtração que o resultado permanecerá o mesmo",
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
		title : "Vamos conferir um exemplo na prática",
		description : "Considere a multiplicação 5 * 7 = 35. Existem várias maneiras de escrever o número 7 na forma de adição ou subtração. Uma delas é 4 + 3",
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
		title : "Dessa maneira, temos 5(4 + 3) = 35",
		description : "Como estamos trabalhando com números definidos, a opção mais fácil seria somar primeiro 4 + 3, e depois multiplicar por 5",
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
		title : "Qual seria a outra forma de resolver?",
		description : "Podemos distribuir essa multiplicação em uma soma de produtos. Essa distribuição é realizada em duas etapas",
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
		name: "6",
		next : "7",
		title : "Primeira etapa (exemplo 5(4 + 3) = 35)",
		description : "Multiplicar o número que está fora dos parênteses pelo primeiro termo dentro dos parênteses. Neste exemplo temos 5 * 4",
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
		name: "7",
		next : "8",
		title : "Segunda etapa (exemplo 5(4 + 3) = 35)",
		description : "Multiplicar o número que está fora dos parênteses pelo segundo termo dentro dos parênteses, mantendo o sinal da expressão (no nosso exemplo é o sinal de mais). Assim, temos 5 * 4 + 5 * 3",
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
		name: "8",
		next : "9",
		title : "Agora é só calcular a nova expressão",
		description : "Temos que 5 * 4 = 20 e 5 * 3 = 15. Somando os dois resultados temos 20 + 15 = 35, exatamente o valor da multiplicação 5 * 7",
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
		name: "9",
		next : "10",
		title : "Vamos aplicar os conceitos aprendidos na nossa equação",
		description : "Vamos começar pela primeira propriedade distributiva, que é 5(2 + x). Mesmo trabalhando com incógnitas, as regras não mudam",
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
		name: "10",
		next : "11",
		title : "Primeira etapa",
		description : "Multiplicar o número que está fora dos parênteses pelo primeiro termo dentro dos parênteses. Neste caso temos 5 * 2",
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
		name: "11",
		next : "12",
		title : "Segunda etapa",
		description : "Multiplicar o número que está fora dos parênteses pelo segundo termo dentro dos parênteses, mantendo o sinal da expressão (no nosso exemplo é o sinal de mais). Assim, temos 5 * 2 + 5x",
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
		name: "12",
		next : "13",
		title : "Agora faremos a mesma coisa na próxima propriedade distributiva",
		description : "Não esqueça que, como estamos trabalhando com equações, precisamos reescrever o lado esquerdo para manter a igualdade",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation("5 * 2 + 5x = 4(2x-3)", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line3").guider({
		name: "13",
		next : "14",
		title : "Vamos tentar resolver as duas etapas em único passo?",
		description : "Relembrando as instruções: Multiplicar o número que está fora dos parênteses pelo primeiro termo dentro dos parênteses. Em seguida, multiplicar o número que está fora dos parênteses pelo segundo termo dentro dos parênteses, mantendo o sinal da expressão",
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
		name: "14",
		next : "15",
		title : "Dessa maneira, temos: 4(2x - 3) = 4 * 2x - 4 * 3",
		description : "Observe que a única diferença em relação à primeira expressão é que temos uma subtração. Nesse caso é só substituir o sinal de mais pelo sinal de menos",
		position: "bottom",
		width : 600,
		onShow: function() {resolutionEquation("5 * 2 + 5x = 4 * 2x - 4 * 3", "step2", 1);},
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line5").guider({
		name: "15",
		next : "16",
		title : "Agora resolvemos todas as multiplicações pendentes",
		description : "Quando você estiver mais familiarizado com a propriedade distributiva, poderá inclusive calcular direto as duas multiplicações. Observe: 4(2x - 3) = 8x - 12",
		position: "bottom",
		width : 600,
		onShow: function() {resolutionEquation("10 + 5x = 8x - 12", "step3", 1);},
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line5").guider({
		name: "16",
		next : "17",
		title : "Agora nós temos uma equação já conhecida do plano de aula anterior",
		description : "É uma equação de primeiro grau com vários termos",
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
	
	$("#line6").guider({
		name: "17",
		next : "18",
		title : "Passamos os termos em função de X para o lado esquerdo, e os demais números para o lado direito",
		description : "Lembre-se da regra das operações inversas: Se temos uma adição de um lado, teremos uma subtração do outro. Se temos uma multiplicação de um lado, teremos uma divisão do outro",
		position: "bottom",
		width : 600,
		onShow: function() {resolutionEquation("5x - 8x = -12 - 10", "step4", 1);},
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line7").guider({
		name: "18",
		next : "19",
		title : "Temos que 5x - 8x = - 3x e -12 - 10 = -22",
		description : "Observe que os dois lados da equação são negativos. Você lembra daquela multiplicação por -1 que utilizamos várias vezes no segundo plano de aula? Podemos aplicar ela aqui também para facilitar o nosso cálculo",
		position: "bottom",
		width : 600,
		onShow: function() {resolutionEquation("-3x = -22", "step5", 1);},
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line8").guider({
		name: "19",
		next : "20",
		title : "Multiplicando por - 1 os dois lados da equação, ambos se tornam positivos",
		description : "Agora só falta passar o 3 para o lado direito dividindo o 22 para concluir a resolução",
		position: "bottom",
		width : 600,
		onShow: function() {resolutionEquation("3x = 22", "step6", 1);},
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line9").guider({
		name: "20",
		title : "Terminamos!",
		description : "Observe que a fração-resultado já está em seu formato irredutível, portanto não precisamos simplificar. E não se preocupe se você esquecer alguma etapa da propriedade distributiva: Você pode pedir dicas a qualquer momento ou até mesmo conferir novamente este exercício resolvido",
		position: "bottom",
		width : 600,
		onShow: function() {resolutionEquation('<font color="blue">x = </font> <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="blue">3</font></div><div class="numerator"><font color="blue">22</font></div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step7", 1); exitWorkedExample();},
		alignButtons : "right",
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
}

function classPlan28() {
	contWE = 1;
	$.guider({
		name: "1",
		next : "2",
		title : "Vamos resolver essa equação agora?",
		description : "Observe que há uma igualdade de frações. Essa igualdade é chamada de razão e proporção",
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
		title : "Como resolvemos uma razão e proporção?",
		description : "Basicamente utilizaremos duas vezes a regra da operação inversa da divisão. Mas antes disso, vamos analisar melhor a nossa equação.",
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
		name: "3",
		next : "4",
		title : "Você percebeu que a fração do lado direito pode ser simplificada?",
		description : "Podemos dividir por 100 o seu numerador e denominador, o que facilitará bastante para a próxima etapa",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation('<span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">x</font></div><div class="numerator">10</div><div class="frac-line-aux"><span class="frac-line"></span></div><span class="baseline-fix"></span></span></span> = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="blue">-6</font></div><div class="numerator">5</div><div class="frac-line-aux"><span class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step1", 2); document.getElementById("currentEquation").style.opacity = "0.5";},
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
		title : "Agora observe os termos destacados em verde e azul",
		description : "São os denominadores das duas frações, e a partir deles que aplicaremos a regra da operação inversa. Você deve ter notado que a incógnita X está em um denominador, mas veremos no próximo passo que isso não será um problema",
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
	
	$("#line6").guider({
		name: "5",
		next : "6",
		title : "Sabemos que a operação inversa da divisão é a multiplicação",
		description : "Assim, podemos passar o primeiro denominador para o outro lado multiplicando o numerador da segunda fração, e vice-versa. Cuidado: O segundo denominador era negativo. Quando trabalhamos com multiplicação e divisão, o sinal é preservado",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation('10 <font color="blue">* (-6)</font> = 5 <font color="green">* x</font>', "step2", 2);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line7").guider({
		name: "6",
		next : "7",
		title : "Agora resolvemos as multiplicações: 10 * (-6) = -60 e 5 * x = 5x",
		description : "Observe que a incógnita X está no lado direito da equação. Como é uma igualdade simples de dois termos, podemos trocá-los de lado sem modificar nenhuma operação ou sinal",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 2; resolutionEquation('-60 = 5x', "step3", 2);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line8").guider({
		name: "7",
		next : "8",
		title : "Estamos quase lá",
		description : "Falta somente dividir -60 por 5, que é o coeficiente de X",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 2; resolutionEquation('5x = -60', "step4", 2);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line10").guider({
		name: "8",
		next : "9",
		title : "Observe que os números 60 e 5 são múltiplos entre si",
		description : "Portanto, podemos simplficar esta fração e chegar em um número inteiro como resultado",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 2; resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator">5</div><div class="numerator">-60</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step5", 2);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line11").guider({
		name: "9",
		title : "Terminamos!",
		description : "Lembre-se sempre de três coisas quando for resolver razões e proporções:<br>1º) Verifique se é possível simplificar uma ou as duas frações para facilitar nos cálculos<br>2º) Você sempre passará os denominadores para os outros lados multiplicando os numeradores<br>3º) Os numeradores podem ser compostos por uma expressão de adição ou subtração, como por exemplo 2x + 3. Nesse caso, a multiplicação deverá ser realizada nos dois termos dessa expressão",
		position: "bottom",
		width : 670,
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = -12</font>", "step6", 2); exitWorkedExample();},
		buttons : {
			Finalizar: {
				click : function() {if (planoAtual === 1013) reasonAndProportionNotice();},
				className : "primary"
			}
		}
	});
}

function classPlan29() {
	contWE = 1;
	$.guider({
		name: "1",
		next : "2",
		title : "Atenção agora!",
		description : "Vamos trabalhar pela primeira vez com equações que envolvem adição e subtração de frações com denominadores diferentes",
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
		title : "O primeiro passo é a aplicação do Mínimo Múltiplo Comum (MMC) em todos os denominadores",
		description : "Lembre-se que os denominadores são os números de baixo das frações",
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
		title : "O que acontece com os termos que não são frações?",
		description : "Teremos que considerá-los como uma fração inteira. Todos os números inteiros podem ser representados como uma fração de denominador 1",
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
		title : "Essa mesma regra também é válida para a variável X e seu coeficiente",
		description : "Nessa equação, os termos inteiros são -10 e 5x. Dessa maneira, temos -10/1 e -5x/1",
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
		title : "Agora vamos calcular o Mínimo Múltiplo Comum de todos os denominadores",
		description : "Assim, temos MMC(2, 4, 1, 1). Você pode fazer esse cálculo no caderno ou mentalmente se já tiver mais prática ",
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
		name: "6",
		next : "7",
		title : "Calculando o MMC(2, 4, 1, 1) chegamos ao número 4",
		description : "O próximo passo é aplicar uma propriedade para transformar todos os termos da equação em números inteiros",
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
		name: "7",
		next : "8",
		title : "Como funciona essa propriedade?",
		description : "Ela nos diz que, para transformar uma fração em um número inteiro, dividimos o resultado do MMC pelo denominador dela, e em seguida multiplicamos pelo seu numerador. CUIDADO: Essa propriedade utiliza conceitos de operação inversa e só pode ser aplicada em equações",
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
		name: "8",
		next : "9",
		title : "Vamos conferir um exemplo na prática",
		description : "Observe a primeira fração (3x/2). O resultado do MMC neste exercício é o 4, então teríamos 4 : 2 * 3x. Lembre-se que o PAT2Math não permite esse operador de divisão, assim precisamos calcular a divisão e digitar diretamente 2 * 3x.",
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
		name: "9",
		next : "10",
		title : "Agora nós aplicamos essa propriedade em todos os termos da equação",
		description : "Cuidado: todos os sinais devem ser preservados. ",
		position: "bottom",
		width : 600,
		onShow: function() {resolutionEquation("2 * 3x - 1x - 4 * 10 = 4 * 5x", "step1", 2); document.getElementById("currentEquation").style.opacity = "0.5";},
		alignButtons : "right",
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line5").guider({
		name: "10",
		next : "11",
		title : "O próximo passo é resolver todas as multiplicações pendentes",
		description : "Você lembra das regras das expressões numéricas? Sempre que tivermos uma conta de multiplicação ou divisão, ela deve ser resolvida primeiro. Nesse caso nós temos mais de uma conta nessas condições e não há parênteses, assim podemos resolver todas essas multiplicações ao mesmo tempo. Só precisamos cuidar os sinais ",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("6x - x - 40 = 20x", "step2", 2);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line6").guider({
		name: "11",
		next : "12",
		title : "Chegamos em uma equação normal com múltiplos termos",
		description : "Como já estamos mais experientes em equações desse tipo, podemos aplicar mais de uma propriedade em um único passo. Neste exercício, podemos unir os termos semelhantes 6x - x e ajustar os demais termos daquela maneira já conhecida: termos que envolvem X no lado esquerdo, demais números no lado direito. Somente precisamos cuidar para aplicar corretamente as operações inversas",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("5x - 20x = 40", "step3", 2);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line7").guider({
		name: "12",
		next : "13",
		title : "Estamos quase lá",
		description : "Agora só falta aplicar a última regra de operação inversa",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("-15x = 40", "step4", 2);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line9").guider({
		name: "13",
		next : "14",
		title : "Utilizando a operação inversa da multiplicação, passamos o -15 para o outro lado dividindo o 40",
		description : "Relembramos mais uma vez: ao trabalhar com operações inversas de multiplicação e divisão, o sinal é preservado.",
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator">-15</div><div class="numerator">40</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step5", 2);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary"
			}
		}
	});
	
	$("#line9").guider({
		name: "14",
		next : "15",
		title : "Será que já terminamos?",
		description : "Ainda não. Observe que os números 40 e -15 são múltiplos entre si, assim ainda podemos simplificar esta fração. Você lembra dos critérios de divisibilidade? O do 5 é o seguinte: qualquer número que termine em 5 ou em 0 é divisível por 5. Assim, podemos dividir por 5 o numerador e o denominador dessa fração, e colocaremos o resultado no próximo passo",
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
	
	$("#line11").guider({
		name: "15",
		title : "Agora sim!",
		description : "O número 8 não termina em 5 ou 0, portanto chegamos à etapa final da simplificação e resolvemos a equaçaõ com sucesso",
		position: "bottom",
		width : 600,
		onShow: function() {contWE = 2; resolutionEquation('<font color="blue">x = - </font> <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="blue">5</font></div><div class="numerator"><font color="blue">8</font></div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step6", 2); exitWorkedExample();},
		alignButtons : "right",
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
	
	
}
//Planos de conteúdo que faltam: 26, 27, 28, 30, 31 e 32

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
