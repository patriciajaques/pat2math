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