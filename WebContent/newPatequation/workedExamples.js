function classPlan1() {
	$.guider({
		name: "1",
		next : "2",
		title : "Vamos rever como resolver uma equação",
		description : "O nosso objetivo é isolar o X no lado esquerdo da igualdade, e para fazer isso a gente subtrai por 4 nos dois lados.",
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

function classPlan2() {
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

function classPlan3() {
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

function classPlan4() {
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

function classPlan6() {
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

function classPlan7() {
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
				click : function() {classPlan7b();},
				className : "primary"
			}
		}
	});
	
	
}

function classPlan7b() {
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

function classPlan8() {
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
function classPlan9() {
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
function classPlan11() {
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

function classPlan12() {
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
		onShow: function() {resolutionEquation('<font color="blue">x = </font> <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="blue">3</font></div><div class="numerator"><font color="blue">22</font></div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step7", 1);},
		alignButtons : "right",
		buttons : {
			Finalizar: {
				click : true,
				className : "primary"
			}
		}
	});
}