//x+2=10

function classPlan1() {
	var botoes;
	switch(idioma) {
		default:
		case("pt-BR"):
			botoes = {"Próximo": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botoes = {"Siguiente": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botoes = {"Next": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		next: "1",
		title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> " + weTXT[194] + " </center>",
		description : "<center>" + weTXT[195] + "</center>",
		overlay : "dark",
		width : 600,
		alignButtons : "right",
		buttons : botoes
	}).show();
	
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[196],
		description : weTXT[197],
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : botoes
	});

	$.guider({
		name: "2",
		next : "3",
		title : weTXT[198],
		description : weTXT[199],
		width : 600,
		alignButtons : "right",
		buttons : botoes
	});
	
	$.guider({
		name: "3",
		next : "4",
		title : weTXT[200],
		description : weTXT[201],
		width : 600,
		alignButtons : "right",
		buttons : botoes
	});
	
	$("#line2").guider({
		name: "4",
		next : "5",
		title : weTXT[202],
		description : weTXT[203],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		buttons : botoes
	});
	
	$("#line3").guider({
		name: "5",
		next : "6",
		title : weTXT[204],
		description : weTXT[205],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x + 2 <font color='red'>- 2 </font> = 10", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botoes
	});
	
	$("#line3").guider({
		name: "6",
		next : "7",
		title : weTXT[206],
		description : weTXT[207],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x + 2 <font color='red'>- 2 </font> = 10 <font color='red'>- 2 </font>", "step2", 0);},
		buttons : botoes
	});
	
	$("#line4").guider({
		name: "7",
		next : "8",
		title : weTXT[208],
		description : weTXT[209],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x <font color='red'>+ 0 </font> = 10 <font color='red'>- 2 </font>", "step3", 1);},
		buttons : botoes
	});
	
	$("#line5").guider({
		name: "8",
		next : "9",
		title : weTXT[210],
		description : weTXT[211],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x = 10 - 2", "step4", 1);},
		buttons : botoes
	});
	
	switch(idioma) {
		default:
		case("pt-BR"):
			botoes = {"Iniciar o tour": {click : function() {introduction(""); isTourInterativo = true; loadTasks(0); loadExercise(0);}, className : "primary"}}
			break;
		case("es-ES"):
			botoes = {"Iniciar el tour": {click : function() {introduction(""); isTourInterativo = true; loadTasks(0); loadExercise(0);}, className : "primary"}}
			break;
		case("en-GB"):
			botoes = {"Start Tour": {click : function() {introduction(""); isTourInterativo = true; loadTasks(0); loadExercise(0);}, className : "primary"}}
			break;
	}
	$("#line6").guider({
		name: "9",
		title : weTXT[212],
		description : weTXT[213],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'> x = 8 </font>", "step5", 1); isWorkedExample = false},
		buttons : botoes
	});
}

//x+4=10
function classPlan2() {
	var botoes;
	switch(idioma) {
		default:
		case("pt-BR"):
			botoes = {"Próximo": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botoes = {"Siguiente": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botoes = {"Next": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[0],
		description : weTXT[1],
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : botoes
	}).show();
	
	$("#line3").guider({
		name: "2",
		next : "3",
		title : weTXT[2],
		description : weTXT[3],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x + 4 <font color='red'>- 4 </font> = 10 <font color='red'>- 4 </font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botoes
	});
	
	$("#line4").guider({
		name: "3",
		next : "4",
		title : weTXT[4],
		description : weTXT[5],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x <font color='red'>+ 0 </font> = 10 <font color='red'>- 4 </font>", "step2", 1);},
		buttons : botoes
	});
	
	$("#line4").guider({
		name: "4",
		next : "5",
		title : weTXT[6],
		description : weTXT[7],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {document.getElementById("step1").innerHTML = "<s>x + 4 - 4 = 10 - 4</s>"; document.getElementById("step1").style.opacity = "0.5";  document.getElementById("step2").innerHTML = "<s>x + 0 = 10 - 4</s>"; document.getElementById("step2").style.opacity = "0.5";},
		buttons : botoes
	});
	
	$("#line5").guider({
		name: "5",
		next : "6",
		title : weTXT[8],
		description : weTXT[9],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x = 10 <font color='red'>- 4 </font>", "step3", 1);},		
		buttons : botoes
	});
	
	switch(idioma) {
		default:
		case("pt-BR"):
			botoes = {"Finalizar": {click : true, className : "primary"}}
			break;
		case("es-ES"):
			botoes = {"Finalizar": {click : true, className : "primary"}}
			break;
		case("en-GB"):
			botoes = {"Finish": {click : true, className : "primary"}}
			break;
	}
	$("#line6").guider({
		name: "6",
		title : weTXT[10],
		description : weTXT[11],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = 6</font>", "step4", 1); exitWorkedExample();},		
		buttons : botoes
	});
}

//x-4=8
function classPlan3() {		
	
	setCookieDays ("currentWE", "3", 1); 

	switch(idioma) {
		default:
		case("pt-BR"):
			botoes = {"Próximo": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botoes = {"Siguiente": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botoes = {"Next": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[214],
		description : weTXT[215],
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : botoes
	}).show();
	
	$.guider({
		name: "2",
		next : "3",
		title : weTXT[216],
		description : weTXT[217],
		width : 600,
		alignButtons : "right",
		buttons : botoes
	});
	
	$("#line3").guider({
		name: "3",
		next : "4",
		title : weTXT[2],
		description : weTXT[3],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x - 4 <font color='red'>+ 4</font> = 8 <font color='red'>+ 4</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botoes
	});
	
	$("#line4").guider({
		name: "4",
		next : "5",
		title : weTXT[4],
		position: "bottom",
		description : weTXT[5],
		onShow: function() {resolutionEquation("x - 4 <font color='red'>+ 0</font> = 8 <font color='red'>+ 4</font>", "step2", 1);},
		width : 600,
		alignButtons : "right",
		buttons : botoes
	});
	
	$("#line4").guider({
		name: "5",
		next : "6",
		title : weTXT[6],
		description : weTXT[7],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {document.getElementById("step1").innerHTML = "<s>x - 4 + 4 = 8 + 4</s>"; document.getElementById("step1").style.opacity = "0.5";  document.getElementById("step2").innerHTML = "<s>x + 0 = 8 + 4</s>"; document.getElementById("step2").style.opacity = "0.5";},
		buttons : botoes
	});
	
	$("#line5").guider({
		name: "6",
		next : "7",
		title : weTXT[8],
		description : weTXT[9],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x = 8 <font color='red'>+ 4 </font>", "step3", 1);},		
		buttons : botoes
	});
	
	switch(idioma) {
		default:
		case("pt-BR"):
			botoes = {"Finalizar": {click : true, className : "primary"}}
			break;
		case("es-ES"):
			botoes = {"Finalizar": {click : true, className : "primary"}}
			break;
		case("en-GB"):
			botoes = {"Finish": {click : true, className : "primary"}}
			break;
	}
	$("#line6").guider({
		name: "7",
		title : weTXT[10],
		description : weTXT[11],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = 12</font>", "step4", 1); exitWorkedExample();},		
		buttons : botoes
	});
}

//x+4=-2
function classPlan4() {
	
	setCookieDays ("currentWE", "4", 1); 

	var botoes;
	switch(idioma) {
		default:
		case("pt-BR"):
			botoes = {"Próximo": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botoes = {"Siguiente": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botoes = {"Next": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[218],
		description : weTXT[219],
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : botoes
	}).show();
	
	$("#line3").guider({
		name: "2",
		next : "3",
		title : weTXT[220],
		description : weTXT[221],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x = - 2 <font color='red'>- 4</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botoes
	});
	
	$("#line3").guider({
		name: "3",
		next : "4",
		title : weTXT[222],
		description : weTXT[223],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {showArrow();},
		buttons : botoes
	});
	
	switch(idioma) {
		default:
		case("pt-BR"):
			botoes = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botoes = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botoes = {"Finish": {click : true, className : "primary",}}
			break;
	}
	$("#line4").guider({
		name: "4",
		title : weTXT[224],
		description : weTXT[225],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {document.getElementById("arrow").innerHTML = ""; resolutionEquation("<font color='blue'>x = - 6</font>", "step2", 1); exitWorkedExample();},
		buttons : botoes
	});
}

//x-3=-6
function classPlan5() {
	
	setCookieDays ("currentWE", "5", 1); 

	var botoes;
	switch(idioma) {
		default:
		case("pt-BR"):
			botoes = {"Próximo": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botoes = {"Siguiente": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botoes = {"Next": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[226],
		description : weTXT[227],
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : botoes
	}).show();
	
	$("#line3").guider({
		name: "2",
		next : "3",
		title : weTXT[228],
		description : weTXT[229],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("x = - 6 <font color='red'>+ 3</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botoes
	});
	
	switch(idioma) {
		default:
		case("pt-BR"):
			botoes = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botoes = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botoes = {"Finish": {click : true, className : "primary",}}
			break;
	}
	$("#line4").guider({
		name: "3",
		title : weTXT[230],
		description : weTXT[231],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = - 3</font>", "step2", 1); exitWorkedExample();},
		buttons : botoes
	});
}

//-x+1=10
function classPlan7() {
	
	setCookieDays ("currentWE", "7", 1); 

	var botao1, botao2
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {"Próximo": {click : true, className : "primary",}}
			botao2 = {"Começar": {click : function(){showQuestionsMultiplication();}, className : "primary",}}
			break;
		case("es-ES"):
			botao1 = {"Siguiente": {click : true, className : "primary",}}
			botao2 = {"Comenzar": {click : function(){showQuestionsMultiplication();}, className : "primary",}}
			break;
		case("en-GB"):
			botao1 = {"Next": {click : true, className : "primary",}}
			botao2 = {"Begin": {click : function(){showQuestionsMultiplication();}, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[12],
		description : weTXT[13],
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : botao1
	}).show();
	
	$("#line3").guider({
		name: "2",
		next : "3",
		title : weTXT[14],
		description : weTXT[15],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x = 10 <font color='red'>- 1</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botao1
	});
	
	$("#line4").guider({
		name: "3",
		next : "4",
		title : weTXT[16],
		description : weTXT[17],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x = 9", "step2", 1);},
		buttons : botao1
	});
	
	$("#line5").guider({
		name: "4",
		next : "5",
		title : weTXT[18],
		description : weTXT[19],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x <font color='green'>* (-1)</font> = 9", "step3", 1); blink9(true, 15);},
		buttons : botao1
	});
	
	$("#line6").guider({
		name: "5",
		next : "6",
		title : weTXT[20],
		description : weTXT[21],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x <font color='green'>* (-1)</font> = 9 <font color='green'>* (-1)</font>", "step4", 1);},
		buttons : botao1
	});
	
	$.guider({
		name: "6",
		title : weTXT[22],
		description : weTXT[23],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		buttons : botao2
	});
}

//-x-10=7
function classPlan8() {
	
	setCookieDays ("currentWE", "8", 1);
	
	var botao1, botao2;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {"Próximo": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botao1 = {"Siguiente": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botao1 = {"Next": {click : true, className : "primary",}}
			botao2 = {"Finish": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[232],
		description : weTXT[233],
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : botao1
	}).show();
	
	$("#line3").guider({
		name: "2",
		next : "3",
		title : weTXT[234],
		description : weTXT[235],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x = 7 <font color='red'>+ 10</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botao1
	});
	
	$("#line4").guider({
		name: "3",
		next : "4",
		title : weTXT[236],
		description : weTXT[237],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x = 17", "step2", 1);},
		buttons : botao1
	});
	
	$("#line5").guider({
		name: "4",
		next : "5",
		title : weTXT[238],
		description : weTXT[239],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x <font color='red'>* (-1)</font>= 17 <font color='red'>* (-1)</font>", "step3", 1);},
		buttons : botao1
	});
	
	$("#line6").guider({
		name : "5",
		title : weTXT[240],
		description : weTXT[241],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = - 17</font>", "step4", 1); exitWorkedExample();},	
		buttons : botao2
	});
}
	
//-x+4=-8
function classPlan9() {
	
		setCookieDays ("currentWE", "9", 1); 
		
		var botao1, botao2;
		switch(idioma) {
			default:
			case("pt-BR"):
				botao1 = {"Próximo": {click : true, className : "primary",}}
				botao2 = {"Finalizar": {click : true, className : "primary",}}
				break;
			case("es-ES"):
				botao1 = {"Siguiente": {click : true, className : "primary",}}
				botao2 = {"Finalizar": {click : true, className : "primary",}}
				break;
			case("en-GB"):
				botao1 = {"Next": {click : true, className : "primary",}}
				botao2 = {"Finish": {click : true, className : "primary",}}
				break;
		}
		$.guider({
			name: "1",
			next : "2",
			title : weTXT[242],
			description : weTXT[243],
			width : 600,
			alignButtons : "right",
			onShow: function() {window.scrollTo(0, 50);},
			buttons : botao1
		}).show();
		
		$("#line3").guider({
			name: "2",
			next : "3",
			title : weTXT[244],
			description : weTXT[245],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("- x = - 8 <font color='red'>- 4</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
			buttons : botao1
		});
		
		$("#line4").guider({
			name: "3",
			next : "4",
			title : weTXT[246],
			description : weTXT[247],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("- x = - 12", "step2", 1);},
			buttons : botao1
		});
		
		$("#line5").guider({
			name: "4",
			next : "5",
			title : weTXT[248],
			description : weTXT[249],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("- x <font color='red'>* (-1)</font>= - 12 <font color='red'>* (-1)</font>", "step3", 1);},
			buttons : botao1
		});
		
		$("#line6").guider({
			name: "5",
			title : weTXT[250],
			description : weTXT[251],
			position: "bottom",
			width : 600,
			position: "bottom",
			alignButtons : "right",
			onShow: function() {resolutionEquation("<font color='blue'>x = 12</font>", "step4", 1); exitWorkedExample();},		
			buttons : botao2
		});
}

//-x-15=-9
function classPlan10() {
	
	setCookieDays ("currentWE", "10", 1); 

	var botao1, botao2;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {"Próximo": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botao1 = {"Siguiente": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botao1 = {"Next": {click : true, className : "primary",}}
			botao2 = {"Finish": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[252],
		description : weTXT[253],
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : botao1
	}).show();
	
	$("#line3").guider({
		name: "2",
		next : "3",
		title : weTXT[254],
		description : weTXT[255],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x = - 9 <font color='red'>+ 15</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botao1
	});
	
	$("#line4").guider({
		name: "3",
		next : "4",
		title : weTXT[256],
		description : weTXT[257],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x = 6", "step2", 1);},
		buttons : botao1
	});
	
	$("#line5").guider({
		name: "4",
		next : "5",
		title : weTXT[258],
		description : weTXT[259],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x <font color='red'>* (-1)</font> = 6 <font color='red'>* (-1)</font>", "step3", 1);},
		buttons : botao1
	});
	
	$("#line6").guider({
		name: "5",
		title : weTXT[260],
		description : weTXT[261],
		width : 600,
		position: "bottom",
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = - 6</font>", "step4", 1); exitWorkedExample();},		
		buttons : botao2
	});
}

//2x=10
function classPlan12() {
	contWE = 1;
	
	setCookieDays ("currentWE", "12", 1); 
	var botao1, botao2;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {"Próximo": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botao1 = {"Siguiente": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botao1 = {"Next": {click : true, className : "primary",}}
			botao2 = {"Finish": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[24],
		description : weTXT[25],
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : botao1
	}).show();
	
	$.guider({
		name: "2",
		next : "3",
		title : weTXT[26],
		description : weTXT[27],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "3",
		next : "4",
		title : weTXT[28],
		description : weTXT[29],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "4",
		next : "5",
		title : weTXT[30],
		description : weTXT[31],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$("#line4").guider({
		name: "5",
		next : "6",
		title : weTXT[32],
		description : weTXT[33],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">2</font></div><div class="numerator">10</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step1", 1); document.getElementById("lineFrac1").style.color = "green"; document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botao1
	});
	
	$("#line6").guider({
		name: "6",
		next : "7",
		title : weTXT[34],
		description : weTXT[35],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation('<span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">2</font></div><div class="numerator">2x</div><div id="lineFrac2" class="frac-line-aux"><span id="lineFrac2" class="frac-line"></span></div><span class="baseline-fix"></span></span></span> = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">2</font></div><div class="numerator">10</div><div id="fracLine3" class="frac-line-aux"><span id="lineFrac3" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step2", 2); document.getElementById("lineFrac2").style.color = "green"; document.getElementById("lineFrac3").style.color = "green";},
		buttons : botao1
	});
	
	$("#line7").guider({
		name: "7",
		title : weTXT[36],
		description : weTXT[37],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {document.getElementById("step2").innerHTML = '<span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><s>2</s></div><div class="numerator"><s>2x</s></div><div class="frac-line-aux"><span class="frac-line"></span></div><span class="baseline-fix"></span></span></span> = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><s>2</s></div><div class="numerator"><s>10</s></div><div class="frac-line-aux"><span class="frac-line"></span></div><span class="baseline-fix"></span></span></span>'; document.getElementById("step2").style.opacity = "0.5"; resolutionEquation("<font color='blue'>x = 5</font>", "step3", 2); exitWorkedExample();},	
		buttons : botao2
	});
} 

//5x=-30
function classPlan13() {
	contWE = 1;
	
	setCookieDays ("currentWE", "13", 1); 
	
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {"Próximo": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botao1 = {"Siguiente": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botao1 = {"Next": {click : true, className : "primary",}}
			botao2 = {"Finish": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[262],
		description : weTXT[263],
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : botao1
	}).show();
	
	$("#line4").guider({
		name: "2",
		next : "3",
		title : weTXT[264],
		description : weTXT[265],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">5</font></div><div class="numerator">- 30</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step1", 1); document.getElementById("lineFrac1").style.color = "green"; document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botao1
	});
	
	$("#line4").guider({
		name: "3",
		next : "4",
		title : weTXT[266],
		description : weTXT[267],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$("#line4").guider({
		name: "4",
		next : "5",
		title : weTXT[268],
		description : weTXT[269],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$("#line5").guider({
		name: "5",
		title : weTXT[270],
		description : weTXT[271],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = - 6</font>", "step2", 2); exitWorkedExample();},
		buttons : botao2
	});	
}

//-3x=15
function classPlan14() {
	contWE = 1;
	
	setCookieDays ("currentWE", "14", 1); 

	var botao1, botao2;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {"Próximo": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botao1 = {"Siguiente": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botao1 = {"Next": {click : true, className : "primary",}}
			botao2 = {"Finish": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[38],
		description : weTXT[39],
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : botao1
	}).show();
	
	$("#line4").guider({
		name: "2",
		next : "3",
		title : weTXT[40],
		description : weTXT[41],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">- 3</font></div><div class="numerator">15</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step1", 1); document.getElementById("lineFrac1").style.color = "green"; document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botao1
	});
	
	$("#line5").guider({
		name: "3",
		title : weTXT[42],
		description : weTXT[43],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = - 5</font>", "step2", 2); exitWorkedExample();},
		buttons : botao2
	});	
}

//-4x=-28
function classPlan15() {
	contWE = 1;
	
	setCookieDays ("currentWE", "15", 1); 
	
	var botao1, botao2;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {"Próximo": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botao1 = {"Siguiente": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botao1 = {"Next": {click : true, className : "primary",}}
			botao2 = {"Finish": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[272],
		description : weTXT[273],
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : botao1
	}).show();
	
	$("#line4").guider({
		name: "2",
		next : "3",
		title : weTXT[274],
		description : weTXT[275],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">- 4</font></div><div class="numerator">- 28</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step1", 1); document.getElementById("lineFrac1").style.color = "green"; document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botao1
	});
	
	$("#line5").guider({
		name: "3",
		title : weTXT[276],
		description : weTXT[277],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = 7</font>", "step2", 2); exitWorkedExample();},
		buttons : botao2
	});	
}

//(x)/(4)=20
function classPlan17() {
	contWE = 1;
	
	setCookieDays ("currentWE", "17", 1); 
	
	var botao1, botao2;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {"Próximo": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botao1 = {"Siguiente": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botao1 = {"Next": {click : true, className : "primary",}}
			botao2 = {"Finish": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[44],
		description : weTXT[45],
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : botao1
	}).show();
	
	$.guider({
		name: "2",
		next : "3",
		title : weTXT[46],
		description : weTXT[47],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "3",
		next : "4",
		title : weTXT[48],
		description : weTXT[49],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$("#line4").guider({
		name: "4",
		next : "5",
		title : weTXT[50],
		description : weTXT[51],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation("x = 20 <font color='green'>* 4</font>", "step1", 2); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botao1
	});
	
	$("#line5").guider({
		name: "5",
		title : weTXT[52],
		description : weTXT[53],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("<font color='blue'>x = 80</font>", "step2", 2); exitWorkedExample();},
		buttons : botao2
	});	
}

//(x)/(7)=-49
function classPlan18() {
		contWE = 1;
	
		setCookieDays ("currentWE", "18", 1); 

		var botao1, botao2;
		switch(idioma) {
			default:
			case("pt-BR"):
				botao1 = {"Próximo": {click : true, className : "primary",}}
				botao2 = {"Finalizar": {click : true, className : "primary",}}
				break;
			case("es-ES"):
				botao1 = {"Siguiente": {click : true, className : "primary",}}
				botao2 = {"Finalizar": {click : true, className : "primary",}}
				break;
			case("en-GB"):
				botao1 = {"Next": {click : true, className : "primary",}}
				botao2 = {"Finish": {click : true, className : "primary",}}
				break;
		}
		$.guider({
			name: "1",
			next : "2",
			title : weTXT[278],
			description : weTXT[279],
			width : 600,
			alignButtons : "right",
			onShow: function() {window.scrollTo(0, 50);},
			buttons : botao1
		}).show();
		
		$("#line4").guider({
			name: "2",
			next : "3",
			title : weTXT[280],
			description : weTXT[281],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("x = - 49 <font color='green'>* 7</font>", "step1", 2); document.getElementById("currentEquation").style.opacity = "0.5";},
			buttons : botao1
		});
		
		$("#line5").guider({
			name: "3",
			title : weTXT[282],
			description : weTXT[283],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {contWE = 1; resolutionEquation("<font color='blue'>x = - 343</font>", "step2", 2); exitWorkedExample();},
			buttons : botao2
		});	
}

//(x)/(-6)=42
function classPlan19() {
	
		var botao1, botao2;
		switch(idioma) {
			default:
			case("pt-BR"):
				botao1 = {"Próximo": {click : true, className : "primary",}}
				botao2 = {"Finalizar": {click : true, className : "primary",}}
				break;
			case("es-ES"):
				botao1 = {"Siguiente": {click : true, className : "primary",}}
				botao2 = {"Finalizar": {click : true, className : "primary",}}
				break;
			case("en-GB"):
				botao1 = {"Next": {click : true, className : "primary",}}
				botao2 = {"Finish": {click : true, className : "primary",}}
				break;
		}
		$.guider({
			name: "1",
			next : "2",
			title : weTXT[54],
			description : weTXT[55],
			width : 600,
			alignButtons : "right",
			onShow: function() {window.scrollTo(0, 50);},
			buttons : botao1
		}).show();
		
		$.guider({
			name: "2",
			next : "3",
			title : weTXT[56],
			description : weTXT[57],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			buttons : botao1
		});
		
		$("#line4").guider({
			name: "3",
			next : "4",
			title : weTXT[294],
			description : weTXT[295],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("x = 42 <font color='green'>* (-6)</font>", "step1", 2); document.getElementById("currentEquation").style.opacity = "0.5";},
			buttons : botao1
		}).show();
		
		$("#line5").guider({
			name: "4",
			title : weTXT[296],
			description : weTXT[297],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {contWE = 1; resolutionEquation("<font color='blue'>x = - 252</font>", "step2", 2); exitWorkedExample();},
			buttons : botao2
		});	
		
		
}

function classPlan19a() {
	
	var botao1, botao2;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {"Próximo": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botao1 = {"Siguiente": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botao1 = {"Next": {click : true, className : "primary",}}
			botao2 = {"Finish": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[284],
		description : weTXT[285],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	}).show();
	
	$("#line4").guider({
		name: "2",
		next : "3",
		title : weTXT[286],
		description : weTXT[287],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x = 42 <font color='green'>* 6</font>", "step1", 2); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botao1
	});
	
	$("#line5").guider({
		name: "3",
		next : "4",
		title : weTXT[288],
		description : weTXT[289],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("- x = 252", "step2", 2);},
		buttons : botao1
	});
	
	$("#line6").guider({
		name: "4",
		next : "5",
		title : weTXT[290],
		description : weTXT[291],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("- x <font color='green'>* (-1)</font>= 252 <font color='green'>* (-1)</font>", "step3", 2);},
		buttons : botao1
	});
	
	$("#line7").guider({
		name: "5",
		title : weTXT[292],
		description : weTXT[293],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("<font color='blue'>x = - 252</font>", "step4", 2); exitWorkedExample();},
		buttons : botao2
	});	
}

//-(x)/(4)=-100
function classPlan20() {
	contWE = 1;
	
	setCookieDays ("currentWE", "20", 1); 

	var botao1, botao2;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {"Próximo": {click : true, className : "primary",}}
			botao2 = {
				"Manter o sinal negativo em X": function() {classPlan20a();},				
				"Passar o sinal negativo para o outro lado": function() {classPlan20b();}
			}
			break;
		case("es-ES"):
			botao1 = {"Siguiente": {click : true, className : "primary",}}
			botao2 = {
				"Mantener la señal negativa en X.": function() {classPlan20a();},				
				"Pasar la señal negativa al otro lado": function() {classPlan20b();}
			}
			break;
		case("en-GB"):
			botao1 = {"Next": {click : true, className : "primary",}}
			botao2 = {
				"Keep the negative sign in X": function() {classPlan20a();},				
				"Pass the negative sign to the other side": function() {classPlan20b();}
			}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[298],
		description : weTXT[299],
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : botao1
	}).show();
	
	$.guider({
		name: "2",
		title : weTXT[300],
		description : weTXT[301],
		position: "bottom",
		width : 600,
		alignButtons : "center",
		buttons : botao2
	});
}

function classPlan20a() {
	
	var botao1, botao2;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {"Próximo": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botao1 = {"Siguiente": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botao1 = {"Next": {click : true, className : "primary",}}
			botao2 = {"Finish": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[302],
		description : weTXT[303],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	}).show();
	
	$("#line4").guider({
		name: "2",
		next : "3",
		title : weTXT[304],
		description : weTXT[305],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation("- x = - 100 <font color='green'>* 4</font>", "step1", 2); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botao1
	});
	
	$("#line5").guider({
		name: "3",
		next : "4",
		title : weTXT[306],
		description : weTXT[307],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("- x = - 400", "step2", 2);},
		buttons : botao1
	});
	
	$("#line6").guider({
		name: "4",
		next : "5",
		title : weTXT[308],
		description : weTXT[309],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("- x <font color='green'>* (-1)</font>= - 400 <font color='green'>* (-1)</font>", "step3", 2);},
		buttons : botao1
	});
	
	$("#line7").guider({
		name: "5",
		title : weTXT[310],
		description : weTXT[311],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("<font color='blue'>x = 400</font>", "step4", 2); exitWorkedExample();},
		buttons : botao2
	});	
}

function classPlan20b() {
	
	var botao1, botao2;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {"Próximo": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botao1 = {"Siguiente": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botao1 = {"Next": {click : true, className : "primary",}}
			botao2 = {"Finish": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[312],
		description : weTXT[313],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	}).show();
	
	$("#line4").guider({
		name: "2",
		next : "3",
		title : weTXT[314],
		description : weTXT[315],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation("x = - 100 <font color='green'>* (-4)</font>", "step1", 2); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botao1
	});
	
	$("#line5").guider({
		name: "3",
		title : weTXT[316],
		description : weTXT[317],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("<font color='blue'>x = 400</font>", "step2", 2); exitWorkedExample();},
		buttons : botao2
	});	
}

//4x-10=8
function classPlan22() {
		contWE = 1;
	
		setCookieDays ("currentWE", "22", 1); 

		var botao1, botao2;
		switch(idioma) {
			default:
			case("pt-BR"):
				botao1 = {"Próximo": {click : true, className : "primary",}}
				botao2 = {"Finalizar": {click : true, className : "primary",}}
				break;
			case("es-ES"):
				botao1 = {"Siguiente": {click : true, className : "primary",}}
				botao2 = {"Finalizar": {click : true, className : "primary",}}
				break;
			case("en-GB"):
				botao1 = {"Next": {click : true, className : "primary",}}
				botao2 = {"Finish": {click : true, className : "primary",}}
				break;
		}
		$.guider({
			name: "1",
			next : "2",
			title : weTXT[62],
			description : weTXT[63],
			width : 600,
			alignButtons : "right",
			onShow: function() {window.scrollTo(0, 50);},
			buttons : botao1
		}).show();
		
		$.guider({
			name: "2",
			next : "3",
			title : weTXT[64],
			description : weTXT[65],
			width : 600,
			alignButtons : "right",
			buttons : botao1
		});
		
		$("#line3").guider({
			name: "3",
			next : "4",
			title : weTXT[66],
			description : weTXT[67],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("4x = 8 <font color='red'>+ 10</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
			buttons : botao1
		});
		
		$("#line4").guider({
			name: "4",
			next : "5",
			title : weTXT[68],
			description : weTXT[69],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("4x = 18", "step2", 1);},
			buttons : botao1
		});
		
		$("#line5").guider({
			name: "5",
			next : "6",
			title : weTXT[70],
			description : weTXT[71],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">4</font></div><div class="numerator">18</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step3", 1); document.getElementById("lineFrac1").style.color = "green";},
			buttons : botao1
		});
		
		$("#line7").guider({
			name: "6",
			title : weTXT[72],
			description : weTXT[73],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation('<font color="blue">x = </font><span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="blue">2</font></div><div class="numerator"><font color="blue">9</font></div><div id="lineFrac2" class="frac-line-aux"><span id="lineFrac2" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step4", 2); document.getElementById("lineFrac2").style.color = "blue"; exitWorkedExample();},
			buttons : botao2
		});
		
}

//-3x+9=-27
function classPlan23() {
		contWE = 1;
	
		setCookieDays ("currentWE", "23", 1); 
	
		var botao1, botao2;
		switch(idioma) {
			default:
			case("pt-BR"):
				botao1 = {"Próximo": {click : true, className : "primary",}}
				botao2 = {"Finalizar": {click : true, className : "primary",}}
				break;
			case("es-ES"):
				botao1 = {"Siguiente": {click : true, className : "primary",}}
				botao2 = {"Finalizar": {click : true, className : "primary",}}
				break;
			case("en-GB"):
				botao1 = {"Next": {click : true, className : "primary",}}
				botao2 = {"Finish": {click : true, className : "primary",}}
				break;
		}
		$.guider({
			name: "1",
			next : "2",
			title : weTXT[74],
			description : weTXT[75],
			width : 600,
			alignButtons : "right",
			onShow: function() {window.scrollTo(0, 50);},
			buttons : botao1
		}).show();
		
		$.guider({
			name: "2",
			next : "3",
			title : weTXT[76],
			description : weTXT[77],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			buttons : botao1
		});
		
		$("#line3").guider({
			name: "3",
			next : "4",
			title : weTXT[78],
			description : weTXT[79],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("- 3x = - 27 <font color='red'>- 9</font>", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
			buttons : botao1
		});
		
		$("#line4").guider({
			name: "4",
			next : "5",
			title : weTXT[80],
			description : weTXT[81],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("- 3x = - 36", "step2", 1);},
			buttons : botao1
		});
		
		$("#line5").guider({
			name: "5",
			next : "6",
			title : weTXT[82],
			description : weTXT[83],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">-3</font></div><div class="numerator">-36</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step3", 1); document.getElementById("lineFrac1").style.color = "green";},
			buttons : botao1
		});
		
		$("#line7").guider({
			name: "6",
			title : weTXT[84],
			description : weTXT[85],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation('<font color="blue">x = 12</font>', "step4", 2); exitWorkedExample();},
			buttons : botao2
		});
		
}

//5x+8-2x=10+x
function classPlan24() {
	contWE = 1;
	
	setCookieDays ("currentWE", "23", 1); 

	var botao1, botao2;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {"Próximo": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botao1 = {"Siguiente": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botao1 = {"Next": {click : true, className : "primary",}}
			botao2 = {"Finish": {click : true, className : "primary",}}
			break;
	}
		$.guider({
			name: "1",
			next : "2",
			title : weTXT[86],
			description : weTXT[87],
			width : 600,
			alignButtons : "right",
			onShow: function() {window.scrollTo(0, 50);},
			buttons : botao1
		}).show();
		
		$.guider({
			name: "2",
			next : "3",
			title : weTXT[88],
			description : weTXT[89],
			width : 600,
			alignButtons : "right",
			buttons : botao1
		});
		
		$.guider({
			name: "3",
			next : "4",
			title : weTXT[90],
			description : weTXT[91],
			width : 600,
			alignButtons : "right",
			buttons : botao1
		});
		
		$("#line3").guider({
			name: "4",
			next : "5",
			title : weTXT[92],
			description : weTXT[93],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("3x + 8 = 10 + x", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
			buttons : botao1
		});
		
		$("#line4").guider({
			name: "5",
			next : "6",
			title : weTXT[94],
			description : weTXT[95],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("3x = 10 + x <font color='red'>- 8</font>", "step2", 1);},
			buttons : botao1
		});
		
		$("#line5").guider({
			name: "6",
			next : "7",
			title : weTXT[96],
			description : weTXT[97],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("3x = 2 + x", "step3", 1);},
			buttons : botao1
		});
		
		$("#line6").guider({
			name: "7",
			next : "8",
			title : weTXT[98],
			description : weTXT[99],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("3x <font color='red'> - x</font> = 2", "step4", 1);},
			buttons : botao1
		});
		
		$("#line7").guider({
			name: "8",
			next : "9",
			title : weTXT[100],
			description : weTXT[101],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("2x = 2", "step5", 1);},
			buttons : botao1
		});
		
		$("#line8").guider({
			name: "9",
			next : "10",
			title : weTXT[102],
			description : weTXT[103],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">2</font></div><div class="numerator">2</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step6", 1); document.getElementById("lineFrac1").style.color = "green";},
			buttons : botao1
		});
		
		$("#line10").guider({
			name: "10",
			title : weTXT[104],
			description : weTXT[105],
			position: "bottom",
			width : 600,
			alignButtons : "right",
			onShow: function() {resolutionEquation("<font color='blue'>x = 1</font>", "step7", 2); exitWorkedExample();},
			buttons : botao2
		});	
}

function classPlan27() {
	contWE = 1;
	
	var botao1, botao2;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {"Próximo": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botao1 = {"Siguiente": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botao1 = {"Next": {click : true, className : "primary",}}
			botao2 = {"Finish": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[106],
		description : weTXT[107],
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : botao1
	}).show();
	
	$.guider({
		name: "2",
		next : "3",
		title : weTXT[108],
		description : weTXT[109],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "3",
		next : "4",
		title : weTXT[110],
		description : weTXT[111],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "4",
		next : "5",
		title : weTXT[112],
		description : weTXT[113],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "5",
		next : "6",
		title : weTXT[114],
		description : weTXT[115],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "6",
		next : "7",
		title : weTXT[116],
		description : weTXT[117],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "7",
		next : "8",
		title : weTXT[118],
		description : weTXT[119],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "8",
		next : "9",
		title : weTXT[120],
		description : weTXT[121],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "9",
		next : "10",
		title : weTXT[122],
		description : weTXT[123],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "10",
		next : "11",
		title : weTXT[124],
		description : weTXT[125],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "11",
		next : "12",
		title : weTXT[126],
		description : weTXT[127],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$("#line3").guider({
		name: "12",
		next : "13",
		title : weTXT[128],
		description : weTXT[129],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation("5 * 2 + 5x = 4(2x-3)", "step1", 1); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botao1
	});
	
	$("#line3").guider({
		name: "13",
		next : "14",
		title : weTXT[130],
		description : weTXT[131],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$("#line4").guider({
		name: "14",
		next : "15",
		title : weTXT[132],
		description : weTXT[133],
		position: "bottom",
		width : 600,
		onShow: function() {resolutionEquation("5 * 2 + 5x = 4 * 2x - 4 * 3", "step2", 1);},
		alignButtons : "right",
		buttons : botao1
	});
	
	$("#line5").guider({
		name: "15",
		next : "16",
		title : weTXT[134],
		description : weTXT[135],
		position: "bottom",
		width : 600,
		onShow: function() {resolutionEquation("10 + 5x = 8x - 12", "step3", 1);},
		alignButtons : "right",
		buttons : botao1
	});
	
	$("#line5").guider({
		name: "16",
		next : "17",
		title : weTXT[136],
		description : weTXT[137],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$("#line6").guider({
		name: "17",
		next : "18",
		title : weTXT[138],
		description : weTXT[139],
		position: "bottom",
		width : 600,
		onShow: function() {resolutionEquation("5x - 8x = -12 - 10", "step4", 1);},
		alignButtons : "right",
		buttons : botao1
	});
	
	$("#line7").guider({
		name: "18",
		next : "19",
		title : weTXT[140],
		description : weTXT[141],
		position: "bottom",
		width : 600,
		onShow: function() {resolutionEquation("-3x = -22", "step5", 1);},
		alignButtons : "right",
		buttons : botao1
	});
	
	$("#line8").guider({
		name: "19",
		next : "20",
		title : weTXT[142],
		description : weTXT[143],
		position: "bottom",
		width : 600,
		onShow: function() {resolutionEquation("3x = 22", "step6", 1);},
		alignButtons : "right",
		buttons : botao1
	});
	
	$("#line9").guider({
		name: "20",
		title : weTXT[144],
		description : weTXT[145],
		position: "bottom",
		width : 600,
		onShow: function() {resolutionEquation('<font color="blue">x = </font> <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="blue">3</font></div><div class="numerator"><font color="blue">22</font></div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step7", 1); exitWorkedExample();},
		alignButtons : "right",
		buttons : botao2
	});
}

function classPlan28() {
	contWE = 1;
	
	var botao1, botao2;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {"Próximo": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botao1 = {"Siguiente": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botao1 = {"Next": {click : true, className : "primary",}}
			botao2 = {"Finish": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[146],
		description : weTXT[147],
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : botao1
	}).show();
	
	$.guider({
		name: "2",
		next : "3",
		title : weTXT[148],
		description : weTXT[149],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$("#line5").guider({
		name: "3",
		next : "4",
		title : weTXT[150],
		description : weTXT[151],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation('<span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="green">x</font></div><div class="numerator">10</div><div class="frac-line-aux"><span class="frac-line"></span></div><span class="baseline-fix"></span></span></span> = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="blue">-6</font></div><div class="numerator">5</div><div class="frac-line-aux"><span class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step1", 2); document.getElementById("currentEquation").style.opacity = "0.5";},
		buttons : botao1
	});
	
	$("#line5").guider({
		name: "4",
		next : "5",
		title : weTXT[152],
		description : weTXT[153],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$("#line6").guider({
		name: "5",
		next : "6",
		title : weTXT[154],
		description : weTXT[155],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {resolutionEquation('10 <font color="blue">* (-6)</font> = 5 <font color="green">* x</font>', "step2", 2);},
		buttons : botao1
	});
	
	$("#line7").guider({
		name: "6",
		next : "7",
		title : weTXT[156],
		description : weTXT[157],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 2; resolutionEquation('-60 = 5x', "step3", 2);},
		buttons : botao1
	});
	
	$("#line8").guider({
		name: "7",
		next : "8",
		title : weTXT[158],
		description : weTXT[159],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 2; resolutionEquation('5x = -60', "step4", 2);},
		buttons : botao1
	});
	
	$("#line10").guider({
		name: "8",
		next : "9",
		title : weTXT[160],
		description : weTXT[161],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 2; resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator">5</div><div class="numerator">-60</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step5", 2);},
		buttons : botao1
	});
	
	$("#line11").guider({
		name: "9",
		title : weTXT[162],
		description : weTXT[163],
		position: "bottom",
		width : 670,
		alignButtons : "right",
		onShow: function() {resolutionEquation("<font color='blue'>x = -12</font>", "step6", 2); exitWorkedExample();},
		buttons : botao2
	});
}

function classPlan29() {
	contWE = 1;
	
	var botao1, botao2;
	switch(idioma) {
		default:
		case("pt-BR"):
			botao1 = {"Próximo": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("es-ES"):
			botao1 = {"Siguiente": {click : true, className : "primary",}}
			botao2 = {"Finalizar": {click : true, className : "primary",}}
			break;
		case("en-GB"):
			botao1 = {"Next": {click : true, className : "primary",}}
			botao2 = {"Finish": {click : true, className : "primary",}}
			break;
	}
	$.guider({
		name: "1",
		next : "2",
		title : weTXT[164],
		description : weTXT[165],
		width : 600,
		alignButtons : "right",
		onShow: function() {window.scrollTo(0, 50);},
		buttons : botao1
	}).show();
	
	$.guider({
		name: "2",
		next : "3",
		title : weTXT[166],
		description : weTXT[167],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "3",
		next : "4",
		title : weTXT[168],
		description : weTXT[169],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "4",
		next : "5",
		title : weTXT[170],
		description : weTXT[171],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "5",
		next : "6",
		title : weTXT[172],
		description : weTXT[173],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "6",
		next : "7",
		title : weTXT[174],
		description : weTXT[175],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "7",
		next : "8",
		title : weTXT[176],
		description : weTXT[177],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$.guider({
		name: "8",
		next : "9",
		title : weTXT[178],
		description : weTXT[179],
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$("#line4").guider({
		name: "9",
		next : "10",
		title : weTXT[180],
		description : weTXT[181],
		position: "bottom",
		width : 600,
		onShow: function() {resolutionEquation("2 * 3x - 1x - 4 * 10 = 4 * 5x", "step1", 2); document.getElementById("currentEquation").style.opacity = "0.5";},
		alignButtons : "right",
		buttons : botao1
	});
	
	$("#line5").guider({
		name: "10",
		next : "11",
		title : weTXT[182],
		description : weTXT[183],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("6x - x - 40 = 20x", "step2", 2);},
		buttons : botao1
	});
	
	$("#line6").guider({
		name: "11",
		next : "12",
		title : weTXT[184],
		description : weTXT[185],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("5x - 20x = 40", "step3", 2);},
		buttons : botao1
	});
	
	$("#line7").guider({
		name: "12",
		next : "13",
		title : weTXT[186],
		description : weTXT[187],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation("-15x = 40", "step4", 2);},
		buttons : botao1
	});
	
	$("#line9").guider({
		name: "13",
		next : "14",
		title : weTXT[188],
		description : weTXT[189],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		onShow: function() {contWE = 1; resolutionEquation('x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator">-15</div><div class="numerator">40</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step5", 2);},
		buttons : botao1
	});
	
	$("#line9").guider({
		name: "14",
		next : "15",
		title : weTXT[190],
		description : weTXT[191],
		position: "bottom",
		width : 600,
		alignButtons : "right",
		buttons : botao1
	});
	
	$("#line11").guider({
		name: "15",
		title : weTXT[192],
		description : weTXT[193],
		position: "bottom",
		width : 600,
		onShow: function() {contWE = 2; resolutionEquation('<font color="blue">x = - </font> <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator"><font color="blue">5</font></div><div class="numerator"><font color="blue">8</font></div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>', "step6", 2); exitWorkedExample();},
		alignButtons : "right",
		buttons : botao2
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
