var levelGamification = "without"; //Opções disponíveis: full, low, without
var tryResolveByMyself = false;
var finalAnswerCurrentEquation;
var isLoadEquation = false; //Verificador especial para, quando o usuário atualizar a página e estar com uma equação selecionada, não atualizar a pontuação total
var asyncAjax = getCookie("asyncAjax") !== "";
var freeHints;
var freeErrors;
var numPlanosAula = 33;
var numPlanosRevisao = 2;
var numPlanosIntroducao = 0;
var selectedSheet = "#paper-1";
var selectedEquation;
//var currentStepsFirstEquation;
var firstEquationIsComplete = getCookie ("firstEquationIsComplete");
var idEquation; // the id of the equation in database
var planoAtual; //id do plano que está selecionado
var numEquacoesPlanoAtual;
var idCurrentUser = getCookie("previousUser"); // the id of the current user logged on
var idTaskVideo;// the id of the video in database
var tasksRemaining; //the number of equations unsolved per topic
var tipoAudio;
var playAudio;
var unlockedPlans = 0;
var unlockAllPlans = true; //Alt + P habilita/desabilita
var enableAgent = getCookie ("enableAgent") !== ""; //F2 habilita/desabilita
//var numClicks;

// variables for the Step object
var NORMAL_STEP = 0;
var NORMAL_SOLUTION = 1;
var DELTA_SOLUTION = 2;
var x1_SOLUTION = 3;
var x2_SOLUTION = 4;

var newEquations = [new Equation("x=1", 0)];
var equations = [new Equation("x=1", 0)];
var stringEquation;
var equationPlan;
var concluded = 0;
var nextLineServer;
var enableIntroductionPlans = false;
var enableWorkedExamples = getCookie ("enableWE") === "";
var enableTourInterativo = false;
var isWorkedExample = false;
var isTourInterativo = false;
var openTourInterativo = false;
var blockMenu = false;
var openAndBlockMenu = "false";
var showNews = false;
var showPlan2Explanation = "true";
var contWE = 1; //Variável auxiliar para os exemplos trabalhados que envolvem frações
var numUnlockedPlans = 0;
var numLines = 20;
var heightSheet = 800;
var usedLines;
var pontuacaoPlano = null;
var pontuacaoEquacoes;
var equationsWE;
var pointsWE;
var resolutionsWE;
var colorsBackground;
var isIntroductionToEquationPlan = false; 
var idsExam = new Array();
var idsExamString = "";
var equationsExam = new Array();
var equationsExamString = "";
var notasParciais = new Array();
var notaGeral = 0;
var currentQuestion = 0;
var corrections = new Array();
var testeFinalizado = false;
var numEquations = 14; //Número de equações do teste
var respostasFinais = new Array();
var equacoesResolvidas = new Array();

function getNotaTeste() {
	$.ajax({
		async : false,
		type : "GET",
		url : "pat2exam/getNotaTeste",
		data : {

		},
		success : function(data) {
			notaGeral = parseFloat(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ocorreu um erro inesperado");
		}
	});
}

function saveNotaTeste() {
	$.ajax({
		type : "GET",
		url : "pat2exam/updateNotaTeste",
		data : {
			"nota" : notaGeral
		},
		success : function(data) {
			console.log(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ocorreu um erro inesperado");
		}
	});
}


function orientacoesIniciais() {
	$.guider({
		title: "Orientações para o teste",
		description: "Resolva as equações com calma e atenção. O teste é individual e sem consulta, e tem como objetivo verificar o quanto você sabe atualmente sobre o conteúdo de equações de primeiro grau. Não é permitido conversar com os seus outros colegas e nem abrir outros sites no navegador. <br><br><div style='font-weight: bold'>Se você responder corretamente às questões, ganhará vários pontos no PAT2Math! A sua pontuação será determinada a partir da sua nota neste teste, que será multiplicada por 200.</div><br><div id='fecharJanela' style='font-style: italic'>Você poderá fechar esta janela em <span id='contador'>10</span> segundos</div>",    
		alignButtons: "right",
		overlay : "dark",
		onShow: function() {$("#topics").fadeOut(); $("#topicsAux").show(); contadorOrientacoes(); var botao = document.getElementsByClassName("botaoEntendi"); botao[0].style.visibility = "hidden"; setTimeout(function() {document.getElementById("fecharJanela").style.display = "none"; botao[0].style.visibility = "visible";}, "10000")},
		next: "2",
		buttons: {
			Próximo: {
				click: true,
				className: "botaoEntendi"
			}
		}
	}).show();
	
	$("#topics").guider({
		name: "2",
		title: "Menu principal",
		description: "Aqui você tem acesso às equações do teste. Selecione qualquer uma delas para começar",       
		position: "right",
		alignButtons: "center",
		onShow: function() {setCookieDays("orientacoesIniciais", "true", 1); $("#topics").fadeIn(); $("#topicsAux").hide(); loadTasksExam();},
		buttons: {
			OK: {
				click: true,
				className: "primary"
			}

		}
	});
	
}

function tourPAT2Exam() {
	$.guider({
		next: "PAT2Exam2",
		title: "Equações iniciais",
		description: "As equações iniciais sempre estarão na primeira linha. Para resolvê-las, basta clicar nas caixas de texto nas linhas abaixo delas e digitar o próximo passo",    
		alignButtons: "right",
		onShow: function() {$("#topicsAux").show(); $("#topics").fadeOut();},
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	}).show();
	
	$("#topicsAux").guider({
		name: "PAT2Exam2",
		next: "PAT2Exam3",
		title: "O menu principal desaparece enquanto você está resolvendo uma equação",
		description: "Para ele reaparecer, passe o mouse neste local",    
		position: "right",
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
		name: "PAT2Exam3",
		next: "PAT2Exam4",
		position: "left",
		title: "Registrando um passo no sistema",
		description: "Clique neste botão depois de digitar um passo, ou simplesmente aperte Enter",    
		alignButtons: "right",
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$.guider({
		name: "PAT2Exam4",
		next: "PAT2Exam5",
		title: "Apagando um passo da resolução",
		description: "Você pode apagar passos já registrados no sistema se achar que está errado. Para isso, clique no ícone <img src=/pat2math/images/borracha24x24.png></img> que estará localizado ao lado direito do passo registrado",    
		alignButtons: "right",
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$.guider({
		name: "PAT2Exam5",
		next: "PAT2Exam6",
		title: "Finalizando o teste",
		description: "Clique em \"Finalizar teste\" localizado no final do menu principal quando você estiver pronto. Em seguida, o sistema fará a correção do seu teste",    
		alignButtons: "right",
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$.guider({
		name: "PAT2Exam6",
		next: "PAT2Exam7",
		title: "Resultados",
		description: "Após a correção, o sistema informará a sua nota. Você também poderá consultar a correção detalhada selecionando as equações desejadas no menu principal",    
		alignButtons: "right",
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$.guider({
		name: "PAT2Exam7",
		title: "Pontuação",
		description: "O PAT2Math conta com um sistema de pontuação, e você receberá um bônus inicial de acordo com a sua nota. Por isso, resolva o teste com muita calma e atenção, como se fosse uma prova normal da escola. ",    
		alignButtons: "right",
		onShow: function() {setCookieDays("tourPAT2Exam", "true", 1)},
		buttons: {
			Voltar: true,
			Finalizar: {
				click: true,
				className: "primary"
			}
		}
	});
}

function contadorOrientacoes() {
	setTimeout(function() {document.getElementById("contador").innerHTML = "9"}, "1000");
	setTimeout(function() {document.getElementById("contador").innerHTML = "8"}, "2000");
	setTimeout(function() {document.getElementById("contador").innerHTML = "7"}, "3000");
	setTimeout(function() {document.getElementById("contador").innerHTML = "6"}, "4000");
	setTimeout(function() {document.getElementById("contador").innerHTML = "5"}, "5000");
	setTimeout(function() {document.getElementById("contador").innerHTML = "4"}, "6000");
	setTimeout(function() {document.getElementById("contador").innerHTML = "3"}, "7000");
	setTimeout(function() {document.getElementById("contador").innerHTML = "2"}, "8000");
	setTimeout(function() {document.getElementById("contador").innerHTML = "1"}, "9000");
	
}

function calculaNotaParcial() {
	if (respostasFinais[idEquation] !== undefined)
		notasParciais[idEquation] = 10;
	
	else {
		var correction = corrections[idEquation];
		var notaParcial = 0.5;
		
		for (var i = 0; i < correction.length && notaParcial > 0; i++) {
			if (correction[i] === false)
				notaParcial -= 0.25;
		}
		
		notasParciais[idEquation] = notaParcial;
	}
	
	calculaNotaGeral();
}

function calculaNotaGeral() {
	notaGeral += notasParciais[idEquation] / idsExam.length;
	var notaString = "" + notaGeral;
	
	setCookieDays("notaGeral", notaString, 1);
	
	saveNotaTeste();
}

function finalizaTeste() {
	if (notasParciais.length < numEquations) {
		if (!confirm("Você tem certeza que deseja finalizar o teste agora? Ainda existem equações em aberto")) {
			return;
		}
		
	}
	testeFinalizado = true;
	
	var notaArredondada = notaGeral.toFixed(1);
	
	if (notaArredondada % 1 === 0)
		notaArredondada = parseInt(notaArredondada);
	
	var points = notaArredondada * 200;
	updateScoreTotalDataBase(points);
	var finalizarTesteSpan = document.getElementById("finalizarTeste");
	finalizarTesteSpan.innerHTML = "Fazer logout e Acessar o PAT2Math";
	finalizarTesteSpan.setAttribute("onclick","redirectPAT2Math();");
	
	$.guider({
		title: "Confira abaixo a sua nota:",
		//description: "<div style='font-size: 100px; margin-top: 26px'>" + notaArredondada + "</div><div style='margin-top: 42px'>Você pode conferir a correção completa por equação através do menu principal. Quando estiver pronto, clique no link \"Acessar o PAT2Math\" neste mesmo menu.</div>",    
		description: "<div style='font-size: 100px; margin-top: 26px'>" + notaArredondada + "</div><br>",    
		alignButtons: "center",
		width: 550,
		buttons: {
			"Fazer logout e acessar o PAT2Math": {
				click: function() {redirectPAT2Math();},
				className: "primary"
			}
		}
	}).show();
	

}
function deleteFinalStep() {
	$.ajax({
		type : 'GET',
		url : "deleteFinalStep",
		data : {
			"exerciseId" : idEquation
		},
		success : function(data) {
				window.location.reload();
		}
	});
}

function redirectPAT2Math() {
	location.href="/pat2math/login";
}
function finalizaQuestao() {
	calculaNotaParcial();
	equacoesResolvidas[idEquation] = "concluída";
	
	var cookie = "";
	
	for (var i = 0; i < idsExam.length; i++) {
		var id = idsExam[i];
		if (equacoesResolvidas[id] !== undefined) {
			if (cookie === "")
				cookie += id;
			
			else
				cookie += "," + id;
		}
	}
	
	setCookieDays("equacoesResolvidasExam", cookie, 1);
	window.location.reload();
}

function verifyMultiplicationsInX(expression) {
	expression = expression.toLowerCase();
	var pos = expression.indexOf("x");
	
	while (pos !== -1) {
		if (isNumber(expression[pos-1])) {
			var array = expression.split("");
			insertInArray(array, "*", pos);
			var toString = array.toString();
			expression = replaceAll(toString, ",", "");
			
			pos += 2;
		}
		
		else
			pos++;

		pos = expression.indexOf("x", pos);
	}
	
	return expression;
}

function correctEquation(answer) {
	answer = verifyMultiplicationsInX(answer);
	var verifyEquality = replaceAll(answer, "x", finalAnswerCurrentEquation);
	var ve = verifyEquality.split("=");
	var left = eval(ve[0]);
	var right = eval(ve[1]);
	
	return left === right;
}
//Máximo 15 equações para um período de 50 minutos
function generateTest() {
	var idsExamCookie = getCookie("idsExam");
	
	if (idsExamCookie !== "") {
		var equationsExamCookie = getCookie("equationsExam");
		
		var ids = idsExamCookie.split(",");
		var equations = equationsExamCookie.split(",");
		
		for (var i = 0; i < numEquations; i++) {
			idsExam[i] = parseInt(ids[i]);
			equationsExam[i] = equations[i];
		}
		
		var notaGeralCookie = getCookie("notaGeral");
		
		if (notaGeralCookie !== "") {
			notaGeral = parseFloat(notaGeralCookie);
			
			var parciais = getCookie("notasParciais").split(",");
			
			for (var i = 0; i < parciais.length; i++)
				notasParciais[i] = parseFloat(parciais[i]);		
		}
	}
	
	else 
		getEquationsDataBase();
	
	var html = '<span class="topic" style="width: 255px; margin-left: 5px; background: #82C785" onclick="loadTasksExam()"> Equações </span> <div id="tasks" class="tasks"></div><div id="tasksExam" class="tasks" style="display: none;"></div>';
	document.getElementById("the_list").innerHTML = html;
}

function saveSelectedEquationsInDataBase() {
	$.ajax({
		type : "GET",
		url : "saveSelectedEquationsInDataBase",
		data : {
			"ids" : idsExamString,
			"equations" : equationsExamString
		},
		success : function(data) {
			console.log(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ocorreu um erro inesperado");
		}
	});
}

function getEquationsDataBase() {
	$.ajax({
		type : "GET",
		url : "getEquationsExam",
		data : {
			
		},
		success : function(data) {
			equationsExamString = data;
			
			if (equationsExamString === "null") {
				equationsExamString = "";
				
				var idPlans = [30, 30, 27, 27, 24, 24, 23, 22, 22, 19, 17, 14, 12, 7, 2];
				var numEquationsPlans = [10, 10, 10, 10, 10, 10, 10, 10, 10, 6, 5, 5, 5, 5, 5];
				
				for (var i = 0; i < numEquations; i++) {
					var id = Math.floor((Math.random() * (numEquationsPlans[i] - 1) + 0)) + idPlans[i] * 100;
					idsExam[i] = id;
					idsExamString += id + ",";
					getEquationById(id, i);			
					
					if (idPlans[i] >= 24 || idPlans[i] === 22) {
						i++;
						
						if (i >= numEquations)
							break;
						
						var id2 = Math.floor((Math.random() * (numEquationsPlans[i] - 1) + 0)) + idPlans[i] * 100;
						
						while (id2 === id)
							id2 = Math.floor((Math.random() * (numEquationsPlans[i] - 1) + 0)) + idPlans[i] * 100;
						
						
						
						idsExam[i] = id2;
						idsExamString += id2 + ",";
						getEquationById(id2, i);		
					}
				}
				
				setCookieDays("idsExam", idsExamString, 1);
				setTimeout(function() {setCookieDays("equationsExam", equationsExamString, 1)}, "1000");
				saveSelectedEquationsInDataBase();
			}
			
			else {
				getIdsDataBase();
				
			}
			
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ocorreu um erro inesperado");
		}
	});
}

function getIdsDataBase() {
	$.ajax({
		type : "GET",
		url : "getIdsExam",
		data : {
			
		},
		success : function(data) {
			idsExamString = data;
			
			var ids = idsExamString.split(",");
			var equations = equationsExamString.split(",");
			
			for (var i = 0; i < numEquations; i++) {
				idsExam[i] = parseInt(ids[i]);
				equationsExam[i] = equations[i];
			}
			
			var notaGeralCookie = getCookie("notaGeral");
			
			if (notaGeralCookie !== "") {
				notaGeral = parseFloat(notaGeralCookie);
				
				var parciais = getCookie("notasParciais").split(",");
				
				for (var i = 0; i < parciais.length; i++)
					notasParciais[i] = parseFloat(parciais[i]);		
			}
			
			setCookieDays("idsExam", idsExamString, 1);
			setTimeout(function() {setCookieDays("equationsExam", equationsExamString, 1)}, "10000");
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ocorreu um erro inesperado");
		}
	});
}

function loadTasksExam() {
	var html = '<span class="task" onclick="loadExercise(' + idsExam[idsExam.length-1] + ')" id="task' + idsExam[idsExam.length-1] + '">' + equationsExam[equationsExam.length-1] + '</span>' +
			   '<i style="margin-right: 6px" class="icon-pencil  icon-white"></i>' +
			   '<i id="marktask' + idsExam[idsExam.length-1] + '" class="icon-ok" style="visibility: hidden;"></i>';
	
	for (var i = equationsExam.length - 2; i >= 0; i--) {
		html += '<span class="task" onclick="loadExercise(' + idsExam[i] + ')" id="task' + idsExam[i] + '">' + equationsExam[i] + '</span>' +
				'<i style="margin-right: 6px" class="icon-pencil  icon-white"></i>' +
				'<i id="marktask' + idsExam[i] + '" class="icon-ok" style="visibility: hidden;"></i>';
	}
	
	html += '<span id="finalizarTeste" class="task" onclick="finalizaTeste()" style="color: #fffc00; margin-left: -30px; width: 154px">Finalizar teste</span>';
	$("#tasksExam").html(html);
	$("#tasksExam").slideDown(700);
}

function createLines() {
	var lines = '<div class="hLineAux" id="line1">.</div>';
	
	for (var i = 2; i <= 22; i++) 
		lines += '<div class="hLine" id="line' + i + '"></div>';
	
	document.getElementById("lines").innerHTML = lines;
	
}

function tourTCC() {
	isTourInterativo = true;
	var next = "gamification1";
	
	if (levelGamification === "low")
		next = "lowGamification1";
	
	else if (levelGamification === "without")
		next = "withoutGamification1";
			
	$.guider({
		name: "start",
		next: next,
		title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Bem-vindo de volta! </center>",
		description : "<center>Fizemos uma série de atualizações e correções desde a sua última visita :D <br>Confira um breve tour antes de continuar.</center>",
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
	
	$("#levelScore").guider({
		name: "gamification1",
		next: "gamification2",
		position: "right",
		title: "Pontuação total e por nível",
		description: "Aqui você tem acesso à sua pontuação total (considerando o progresso em todas as equações já resolvidas) e a do nível atual (neste exemplo, o nível selecionado é o Básico). Além disso, agora as suas pontuações são salvas no sistema",    
		alignButtons: "right",
		onShow: function() {generateStages(1);},
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$("#hint").guider({
		name: "gamification2",
		next: "gamification3",
		title: "Dicas",
		position: "left",
		description: "Nós otimizamos o sistema de ajuda do PAT2Math. Clique neste botão sempre que precisar de ajuda, em qualquer um dos passos da equação selecionada",    
		alignButtons: "right",
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$.guider({
		name: "gamification3",
		next: "gamification4",
		title: "As dicas estão organizadas em níveis",
		description: "A cada vez que você solicita dicas em um mesmo passo, elas sobem de nível e se tornarão mais específicas. Utilize-as com responsabilidade, uma vez que a cada solicitação você perde 2 pontos. Por outro lado, não deixe de utilizá-las quando você estiver com dificuldades, o seu aprendizado é o fator mais importante",    
		alignButtons: "right",
		onShow: function() {loadTasks(1001);},
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$("#freeHints").guider({
		name: "gamification4",
		next: "gamification5",
		title: "Dicas gratuitas",
		position: "left",
		description: "Você possui dicas que podem ser solicitadas gratuitamente, isto é, sem a perda de pontos. Você pode verificar a quantidade de dicas gratuítas disponíveis neste painel",    
		alignButtons: "right",
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$("#freeErrors").guider({
		name: "gamification5",
		next: "gamification6",
		title: "Erros gratuitos",
		position: "bottom",
		description: "Assim como você pode pedir dicas gratuitas, você também pode errar e não perder pontos por isso. A quantidade de erros gratuitos pode ser visualizada aqui no cabeçalho do caderno",    
		alignButtons: "right",
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$.guider({
		name: "gamification6",
		next: "gamification7",
		title: "As quantidades disponíveis de dicas e erros gratuitos variam de acordo com a complexidade da fase atual",
		description: "Assim, quanto mais avançada for a fase e/ou mais equações ela tiver, mais dicas e erros gratuitos você receberá",    
		alignButtons: "right",
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$.guider({
		name: "gamification7",
		next: "gamification8",
		title: "Exercícios resolvidos",
		description: "O sistema de exercícios resolvidos também foi otimizado: agora você decide se quer ou não visualizar a cada fase desbloqueada. A cada nova fase que você desbloquear, o sistema perguntará se você sabe resolver a equação atual. Se disser que não ou que não tem certeza, poderá visualizar um exercício resolvido com as mesmas características",    
		alignButtons: "right",
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$.guider({
		name: "gamification8",
		next: "gamification9",
		title: "Se necessário, você poderá conferir novamente o exercício resolvido da fase atual",
		description: "Para tanto, clique na primeira equação da lista, que possui a cor amarela",    
		alignButtons: "right",
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$.guider({
		name: "gamification9",
		next: "finish",
		title: "Eu posso conferir um exercício resolvido sem perder pontos?",
		description: "Claro! Você tem direito a uma visualização gratuita por fase, a partir daquela mesma mensagem inicial que comentamos agora pouco. Mas não se preocupe: as visualizações adicionais custam apenas 8 pontos.",    
		alignButtons: "right",
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$("#hint").guider({
		name: "lowGamification1",
		next: "lowGamification2",
		title: "Dicas",
		description: "Nós otimizamos o sistema de ajuda do PAT2Math. Clique neste botão sempre que precisar de ajuda, em qualquer um dos passos da equação selecionada",    
		alignButtons: "right",
		position: "left",
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$.guider({
		name: "lowGamification2",
		next: "lowGamification3",
		title: "As dicas estão organizadas em níveis",
		description: "A cada vez que você solicita dicas em um mesmo passo, elas sobem de nível e se tornarão mais específicas. Utilize-as com responsabilidade, uma vez que a cada solicitação você perde 2 pontos. Por outro lado, não deixe de utilizá-las quando você estiver com dificuldades, o seu aprendizado é o fator mais importante.",    
		alignButtons: "right",
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$.guider({
		name: "lowGamification3",
		next: "lowGamification4",
		title: "Exercícios resolvidos",
		description: "O sistema de exercícios resolvidos também foi otimizado: agora você decide se quer ou não visualizar a cada fase desbloqueada. A cada nova fase que você desbloquear, o sistema perguntará se você sabe resolver a equação atual. Se disser que não ou que não tem certeza, poderá visualizar um exercício resolvido com as mesmas características",    
		alignButtons: "right",
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$.guider({
		name: "lowGamification4",
		next: "finish",
		title: "Se necessário, você poderá conferir novamente o exercício resolvido da fase atual",
		description: "Para tanto, clique na primeira equação da lista, que possui a cor amarela",    
		alignButtons: "right",
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$("#hint").guider({
		name: "withoutGamification1",
		next: "withoutGamification2",
		title: "Dicas",
		position: "left",
		description: "Nós otimizamos o sistema de ajuda do PAT2Math. Clique neste botão sempre que precisar de ajuda, em qualquer um dos passos da equação selecionada",    
		alignButtons: "right",
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$.guider({
		name: "withoutGamification2",
		next: "withoutGamification3",
		title: "As dicas estão organizadas em níveis",
		description: "A cada vez que você solicita dicas em um mesmo passo, elas sobem de nível e se tornarão mais específicas",    
		alignButtons: "right",
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});

	$.guider({
		name: "withoutGamification3",
		next: "withoutGamification4",
		title: "Exercícios resolvidos",
		description: "O sistema de exercícios resolvidos também foi otimizado: agora você decide se quer ou não visualizar em cada plano de aula. Quando você abrir um plano pela primeira vez, o sistema perguntará se você sabe resolver a equação atual. Se disser que não ou que não tem certeza, poderá visualizar um exercício resolvido com as mesmas características",    
		alignButtons: "right",
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$.guider({
		name: "withoutGamification4",
		next: "finish",
		title: "Se necessário, você poderá conferir novamente o exercício resolvido da fase atual",
		description: "Para tanto, clique na primeira equação da lista, que possui a cor amarela",    
		alignButtons: "right",
		position: "right",
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$("#tour").guider({
		name: "finish",
		title: "Terminamos!",
		description: "Se você desejar, poderá acessar o tour novamente clicando neste botão",    
		alignButtons: "right",
		position: "left",
		onShow: function() {completeTour();},
		buttons: {
			Finalizar: {
				click: true,
				className: "primary"
			}
		}
	});
}


function startNewPatequation() {
	verifyTourInterativo();
	getEquationsWE();
	getScoresStages();
	getFreeHintsAndErrors();
	
	if (levelGamification !== "without") {
		unlockedPlans = getCookie("unlockedPlans");
		if (unlockedPlans !== "") {
			unlockedPlans = parseInt(unlockedPlans);
			unlockedLevels = parseInt(getCookie("unlockedLevels"));
			generateLevels();
			
			if (levelGamification === "full") {
				var totalScoreCookie = getCookie("totalScore");
				
				if (totalScoreCookie !== "") {
					totalScore = parseInt(totalScoreCookie);
					updateScoreUI();
				}
				
				else
					getTotalScoreDataBase();
			}
		}
		
		else
			getLevelsAndPlansUnlockedDataBase();
		
		var cookieColor = getCookie("colorBackground");
		
		if (cookieColor !== "")
			setBackgroundColor(cookieColor);
		
		if (levelGamification === "full") {
			verifyWorkedExamplesReward();
			verifyFinalReward();
		}
	}
	
	else {
		unlockAllPlans = true;
		generateStagesWithoutGamification();
		document.getElementById("amountPoins").style.display = "none";
	}
	
	var cookiePlan = getCookie("currentPlan");
	
	if (cookiePlan !== "") {
		var idPlan = parseInt(cookiePlan);
		loadTasks(idPlan);
		
		var cookieEquation = getCookie("currentEquation");
		
		if (cookieEquation !== "") {		
			idEquation = parseInt(cookieEquation);
			loadExercise(idEquation);	
		}
		

		$("#topics").fadeIn();
	    $("#topicsAux").hide();
	}
	
//	if (getCookie("noticeHint") === "") {
//		setCookieDays("noticeHint", "false", 1);
//		
//		if (window.innerWidth > 1600)
//			document.getElementById("noticeHintModal").style.left = "752.15px";
//		
//		document.getElementById("noticeHint").style.display="inline";
//	}
}

function ranking(){
	$.ajax({
		type: "GET",
		url: "newPatequation/top10",
		data: {"id" : idCurrentUser, "rankingGeral" : false},
		success:
			function(data) {
				$.guider({
					name: "top10",
					title: "RANKING DA TURMA",
					description: data,									
					alignButtons: "center",
					position: "center",
					buttons: {
						Fechar: {
							click: true,
							className: "primary"
						}
					}
				}).show();
			},
		error:
			 function(XMLHttpRequest, textStatus, errorThrown) {
		     	alert("Perdão, obtivemos um erro ao processar esta ação.");
		 	}
		});
}

//Explica a limitação do resolvedor nas equações de razão e proporção
function reasonAndProportionNotice() {
	$.guider({
		name: "rpnotice",
		title : "<center> <img src=/pat2math/images/warning-icon.png></img><br> Atenção! </center>",
		description : "<center>Atualmente, o sistema possui uma pequena limitação com equações de razão e proporção. O primeiro passo que envolver uma multiplicação simples com X, você precisará colocar o sinal de vezes (asterisco) para o sistema corrigir como certo. <br><br>Por exemplo, se você chegar em uma multiplicação de 5 por X, terá que digitar 5 * x. Somente no próximo passo poderá escrever 5x.</center>",
		width: 600,
		overlay : "dark",
		alignButtons : "center",
		buttons : {
			Entendi: {
				click : true,
				className : "primary",
			}
		}
	}).show();
}

function verifyTour() {
	if (getCookie("tourViewed") === "") {
		$.ajax({
			type : "GET",
			url : "newPatequation/tour",
			data : {

			},
			success : function(data) {
				if (data === "false") {			
					tourTCC();
				}
				
				else {
					setCookieDays("tourViewed", "true", 1);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Ocorreu um erro inesperado");
			}
		});
	}
}

function completeTour() {
	isTourInterativo = false;
	
	if (levelGamification === "full")
		generateStages(1);
	
	setCookieDays("tourViewed", "true", 1);
	
	$.ajax({
		type : "GET",
		url : "newPatequation/setTour",
		data : {

		},
		success : function(data) {	
			console.log(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ocorreu um erro inesperado");
		}
	});
}

function verifyWorkedExamplesReward() {
	$.ajax({
		type : "GET",
		url : "newPatequation/rewardWorkedExamples",
		data : {

		},
		success : function(data) {
			if (data === "true") {			
				workedExamplesReward();
				
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ocorreu um erro inesperado");
		}
	});
	
}

function verifyFinalReward() {
	$.ajax({
		type : "GET",
		url : "newPatequation/rewardFinal",
		data : {

		},
		success : function(data) {
			if (data === "true") {			
				document.getElementById("imLegend").style.visibility = "visible";
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ocorreu um erro inesperado");
		}
	});
	
}
function verifyCookiesScore() {
	if (getCookie("totalScore") === "") 
		getTotalScoreDataBase();
	
	else 
		reloadTotalScore();
		
	if (getCookie("levelScore") === "") 
		getLevelsScoreDataBase();
	
	else 
		reloadLevelsScore();
	
//	if (getCookie("stageScore") === "")
//		setCookieDays("stageScore", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0");
	
//	if (getCookie("stageScore") === "") {
//		var database = false; //Aqui deverá ser a verificação da pontuação no banco de dados
//		
//		if (database) {
//			//Aqui deverá ser a verificação da pontuação no banco de dados e salvar nos cookies
//		}
//		
//		else 
//			setCookieDays("stageScore", "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0");		
//	}
//	
//	if (selectedEquation !== null) {
//		//No banco de dados deverá ser salva também a pontuação perdida em cada equação, é só acrescentar uma coluna na tabela correspondente do dump atual
//	}
}

function completePlan() {
	if (unlockedPlans === undefined || unlockedPlans === null)
		unlockedPlans = 1;
	
	unlockedPlans++;
	
	if (unlockedPlans > 33 && document.getElementById("imLegend").style.visibility === "hidden")
		finalReward();
	
	setCookieDays("unlockedPlans", unlockedPlans, 1);
	
	if (unlockedPlans < 12) 
		unlockedLevels = 1;
	
	else if (unlockedPlans < 22)
		unlockedLevels = 2;
	
	else if (unlockedPlans < 30)
		unlockedLevels = 3;
	
	else if (unlockedPlans < 34)
		unlockedLevels = 4;
	
	else if (unlockedPlans > 42) {
		unlockedLevels = 6;
		generateLevels();
	}
	
	else {
		unlockedLevels = 5;
		unlockedPlans = 42;
	}
	
	if (unlockedPlans === 7) {
		workedExamplesReward();
		saveWorkedExamplesReward();
		
		$.guider({
			title: "Parabéns! Você recebeu uma recompensa pelo seu progresso no PAT2Math",
			description: "Verifique o que mudou na tela do sistema.",    
			alignButtons: "center",
			overlay : "dark",
			buttons: {
				"Legal :D": {
					click: function() {$.guider({	}).hideAll();},
					className: "primary"
				}
			}
		}).show();
	}
	
	if (unlockedPlans === 12 || unlockedPlans === 22 || unlockedPlans === 30 || unlockedPlans === 34) {
		divName = "lockLevel" + unlockedLevels;
		document.getElementById(divName).innerHTML = '<img src="/pat2math/patequation/img/cadeado_aberto.png"></img>';
		divName = "level" + unlockedLevels;
		document.getElementById(divName).onclick = function() {generateStages(unlockedLevels)};
		setCookieDays("unlockedLevels", unlockedLevels, 1);
	}
	
	else {
		var divName = "lockStage" + unlockedPlans;
		document.getElementById(divName).innerHTML = '<img src="/pat2math/patequation/img/cadeado_aberto.png"></img>';
	
		setTimeout(function() {document.getElementById(divName).style.display = 'none'; divName = 'stage' + unlockedPlans; document.getElementById(divName).innerHTML = getNameStage(unlockedPlans);}, 2000);
	}
	
	
	
	
	completePlanDataBase();
}

function getFreeHintsAndErrors() {
	freeHints = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 6, 3, 3, 4, 4, 8, 8, 8, 8, 12, 15, 15, 15, 25, 20, 25, 28, 32, 40, 42];
	freeErrors = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 3, 3, 4, 4, 4, 4, 6, 8, 8, 8, 13, 10, 13, 14, 16, 20, 42];
	
	var cookieHints = getCookie("freeHints");
	
	if (cookieHints !== "") {
		var split = cookieHints.split(",");
		var pos = parseInt(split[1]);
		freeHints[pos] = parseInt(split[0]);
	}
		
	var cookieErrors = getCookie ("freeErrors");
	
	if (cookieErrors !== "") {
		var split = cookieErrors.split(",");
		var pos = parseInt(split[1]);
		freeErrors[pos] = parseInt(split[0]);
	}
}

function getScoresStages() {
	scoresStages[1] = 20;
	scoresStages[2] = 20;
	scoresStages[3] = 20;
	scoresStages[4] = 20;
	scoresStages[5] = 20;
	scoresStages[6] = 20;
	scoresStages[7] = 25;
	scoresStages[8] = 25;
	scoresStages[9] = 25;
	scoresStages[10] = 25;
	scoresStages[11] = 25;
	scoresStages[12] = 30;
	scoresStages[13] = 30;
	scoresStages[14] = 35;
	scoresStages[15] = 35;
	scoresStages[16] = 40;
	scoresStages[17] = 40;
	scoresStages[18] = 40;
	scoresStages[19] = 50;
	scoresStages[20] = 50;
	scoresStages[21] = 50;
	scoresStages[22] = 70;
	scoresStages[23] = 80;
	scoresStages[24] = 100;
	scoresStages[25] = 100;
	scoresStages[26] = 110;
	scoresStages[27] = 120;
	scoresStages[28] = 130;
	scoresStages[29] = 130;
	scoresStages[30] = 150;
	scoresStages[31] = 160;
	scoresStages[32] = 180;
	scoresStages[33] = 200;
	scoresStages[42] = 42;
	
}

function getLevelsAndPlansUnlockedDataBase() {
	$.ajax({
		type : "GET",
		url : "newPatequation/getLevelAndPlan",
		data : {
			
		},
		success : function(data) {
			var split = data.split(";");
			unlockedLevels = parseInt(split[0]);
			unlockedPlans = parseInt(split[1]);
			setCookieDays("unlockedLevels", unlockedLevels, 1);
			setCookieDays("unlockedPlans", unlockedPlans, 1);
			
			generateLevels();
			
			if (levelGamification === "full")
				getTotalScoreDataBase();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ocorreu um erro inesperado");
		}
	});
}

function completePlanDataBase() {
	$.ajax({
		type : "GET",
		url : "newPatequation/completePlan",
		data : {
			"level" : unlockedLevels,
			"plan" : unlockedPlans
		},
		success : function(data) {
			console.log(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ocorreu um erro inesperado");
		}
	});
}

//color é uma String em hexadecimal com # na frente
function setBackgroundColor (color) {
	var cookieColor = setCookieDays("colorBackground", color, 1);
	document.body.style.background = color;
}

function setPaperColor (color) {
	var paper = document.getElementById('paper-1');
	paper.style.backgroundColor = color;
}

function insertLines (verifyLinesHeight, idEquation) {
	var lines = document.getElementById('lines').innerHTML;
	var cookieName = "linesHeight" + idEquation;
	var linesHeight;
	var numLinesInserted;
	
	if (verifyLinesHeight) {
		linesHeight = getCookie (cookieName);
		var lh = linesHeight.split (" ");
		numLinesInserted = parseInt(lh[0]);
		heightSheet = parseInt(lh[1]);
		
		for (var i = 0; i < numLinesInserted; i+=2) 
			lines += '<div class="hLine"></div><div class="hLine"></div>';
			
		numLines += numLinesInserted;
	}
	
	else {		
		numLines += 2;
		numLinesInserted = numLines - 20;
		lines += '<div class="hLine"></div><div class="hLine"></div>';
		heightSheet += 64;	
		linesHeight = numLinesInserted + " " + heightSheet;
		
		setCookieDays (cookieName, linesHeight, 1);
	}
	
	document.getElementById('paper-1').style.height = heightSheet + 'px';
	document.getElementById('lines').innerHTML = lines;
}

function theRoadSoFar() {
	var solvedEquations = [0, 71, 133, 233, 283];
	var completedStages = [0, 11, 21, 29, 33];
	
	$.guider({
		title : "O Caminho Até Aqui",
		description : '<div style="text-align: left;">' +
					  'Equações resolvidas: ' + solvedEquations[currentLevel] + 
					  '\nFases concluídas: ' + completedStages[currentLevel] + 
					  '\nPontuação total: ' + totalScore + '</div>',
		overlay : "dark",
		width : 600,
		alignButtons : "center",
		buttons : {
			OK: {
				click : true,
				className : "primary",
			}
		}
	}).show();
	
	
}

function showCalculator ( ) {
    var calculatorDisplay = document.getElementById('calculator').style.display;
    
	if (calculatorDisplay === "" || calculatorDisplay === "none")
	    $("#calculator").fadeIn();
	
	else
		$("#calculator").fadeOut();
}
function helpPage6 ( ) {
	$("#help-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_06.png border=0> <div style='position:absolute; top:246px; left:1px;'> <a href=# onclick=helpPage5()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0px; left:494px;'> <div style='position:absolute; top:272px; left:-20px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>");
	$("#mask").fadeIn(700);
	$("#help-box").fadeIn(700);
//    $.guider({
//	description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_06.png border=0> <div style='position:absolute; top:220px; left:-15px;'> <a href=# onclick=helpPage5()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:255px; left:490px;'> <div style='position:absolute; top:264px; left:-17px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>",
//            closable: true,
//            overlay: "dark"
//	}).show();   
}

function helpPage5 ( ) {
	$("#help-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_05.png border=0> <div style='position:absolute; top:246px; left:1px;'> <a href=# onclick=helpPage4()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0; left:494px;'> <a href=# onclick=helpPage6()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:272px; left:-20px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>");
	$("#mask").fadeIn(700);
	$("#help-box").fadeIn(700);
//    $.guider({
//	description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_05.png border=0> <div style='position:absolute; top:220px; left:-15px;'> <a href=# onclick=helpPage4()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:255px; left:490px;'> <a href=# onclick=helpPage6()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:254px; left:-17px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>",
//            closable: true,
//            overlay: "dark"
//	}).show();   
}

function helpPage4 ( ) {
	$("#help-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_04.png border=0> <div style='position:absolute; top:246px; left:1px;'> <a href=# onclick=helpPage3()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0; left:494px;'> <a href=# onclick=helpPage5()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:272px; left:-20px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>");
	$("#mask").fadeIn(700);
	$("#help-box").fadeIn(700);
//    $.guider({
//	description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_04.png border=0> <div style='position:absolute; top:220px; left:-15px;'> <a href=# onclick=helpPage3()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:255px; left:490px;'> <a href=# onclick=helpPage5()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:264px; left:-17px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>",
//            closable: true,
//            overlay: "dark"
//	}).show();   
}


function helpPage3 ( ) {
	$("#help-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_03.png border=0> <div style='position:absolute; top:246px; left:1px;'> <a href=# onclick=helpPage2()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0; left:494px;'> <a href=# onclick=helpPage4()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:272px; left:-20px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>");
	$("#mask").fadeIn(700);
	$("#help-box").fadeIn(700);
//    $.guider({
//	description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_03.png border=0> <div style='position:absolute; top:220px; left:-15px;'> <a href=# onclick=helpPage2()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:255px; left:490px;'> <a href=# onclick=helpPage4()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:264px; left:-17px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>",
//            closable: true,
//            overlay: "dark"
//	}).show();   
}
function helpPage2 ( ) {
	$("#help-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_02.png border=0> <div style='position:absolute; top:246px; left:1px;'> <a href=# onclick=helpPage()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0; left:494px;'> <a href=# onclick=helpPage3()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:272px; left:-20px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>");
	$("#mask").fadeIn(700);
	$("#help-box").fadeIn(700);
//    $.guider({
//	description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_02.png border=0> <div style='position:absolute; top:264px; left:-17px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>",
//            closable: true,
//            overlay: "dark"
//	}).show();
}

function helpPage ( ) {
	$("#help-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_01.png border=0> <div style='position:absolute; top:246px; left:1px;'> <div style='position:absolute; top:0; left:494px;'> <a href=# onclick=helpPage2()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:272px; left:-20px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>");
	$("#mask").fadeIn(700);
	$("#help-box").fadeIn(700);
	
	if (openAndBlockMenu !== "true") {
		$("#topics").fadeOut();
	}
//	try {
//    $.guider({
//	description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_01.png border=0> <div style='position:absolute; top:220px; left:452px;'> <a href=# onclick=helpPage2()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:242px; left:-30px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>",
//            closable: true,
//            overlay: "dark"
//	}).show();
//    //setTimeout (function() {closeWindow(); setTimeout ('p1()', 10);}, 10);
//    
//	} catch (e) {
//		window.location.reload();
//	} 
}

function reportBug ( ) {
	var html = '<iframe src="https://docs.google.com/forms/d/1LX-zhGj-ogFZO-h7fABqSH26COqdT258Vs-Bws3hO2I/viewform?embedded=true" width="720" height="675" frameborder="0" marginheight="0" marginwidth="0" scrolling="no">Carregando...</iframe><div style="position:absolute; top:15px; left:677px;"> <a href=# onclick=closeWindowReportBug()><img src=/pat2math/patequation/img/exit.png></img></a><div style="position:absolute; top:570px; left:-460px;"> <a href=# onclick=uploadImage()><img src=/pat2math/patequation/img/upload_image.png></img></a> <div style="position:absolute; top:-571px; left:-168px;"> <img src=/pat2math/patequation/img/cabecalho_reportar_bug.png></img>';
	
	if (screen.height < 800)
		html = '<iframe src="https://docs.google.com/forms/d/1LX-zhGj-ogFZO-h7fABqSH26COqdT258Vs-Bws3hO2I/viewform?embedded=true" width="720" height="675" frameborder="0" marginheight="0" marginwidth="0">Carregando...</iframe><div style="position:absolute; top:18px; left:657px;"> <a href=# onclick=closeWindowReportBug()><img src=/pat2math/patequation/img/exit.png></img></a></div><div style="position:absolute; top:539px; left:555px;"> <a href=# onclick=uploadImage()><img src=/pat2math/patequation/img/upload_image.png></img></a></div> <div style="position:absolute; top:18px; left:48px;"> <img src=/pat2math/patequation/img/cabecalho_reportar_bug.png></img></div>';
	
	$("#reportBug-box").html (html);
	$("#mask").fadeIn(700);
	$("#reportBug-box").fadeIn(700);
	
	if (openAndBlockMenu !== "true") {
		$("#topics").fadeOut();
	}
}

function uploadImage ( ) {
	$("#uploadImage-box").html ('<iframe src="http://uploaddeimagens.com.br/" width="1000" height="460" SCROLLING="NO"></iframe> <div style="position:absolute; top:420px; left:930px;"> <a href=# onclick=closeWindowUploadImage()><img src=/pat2math/patequation/img/exit_text.png></img></a> <div style="position:absolute; top:-373px; left:-208px;"> <img src=/pat2math/patequation/img/fundo_branco.png></img>');
	$("#mask").fadeIn(700);
	$("#uploadImage-box").fadeIn(700);
	//http://www.brimg.com/
}



function closeWindowReportBug ( ) {
	$("#mask").fadeOut(700);
	$("#reportBug-box").fadeOut(700);
	
	if (selectedEquation !== null)
		$("#topicsAux").show();
	
	else
	    $("#topics").fadeIn();
}

function closeWindowUploadImage ( ) {
	$("#uploadImage-box").fadeOut(700);
}




function isIntro(equation){
	if(equation.indexOf > 0 && equation.indexOf < 7)
		isIntroductionToEquationPlan = true;
}

function verifyTourInterativo() {
	 $.ajax({  
	     type : "Get",   
	     url : "/pat2math/student/reload_task",
//	     async: false,
	     success : function(response) { 
	    	 if (enableTourInterativo && response.indexOf("Plano de aula 1") === -1) {
//	    	 if (enableTourInterativo && response.indexOf("Plano de aula 1") === -1 && response.indexOf("Introdução" + numPlanosIntroducao) !== -1) {
	    		 	if (getCookie ("stepTour") === "") {
	    		 		blockMenu = true;
	    		 		
	    		 		if (enableWorkedExamples) {
	    		 			loadExerciseWE("x+2=10", 20);
	    		 			classPlan1();	    	   
	    		 		}
	    		 		
	    		 		else {
	    		 			isTourInterativo = true;
	    		 			loadTasks(0);
	    		 			loadExercise(0);
	    		 			introductionWithWelcome("");
	    		 		}
	    			}
	    		 	
	    		 	else {
	    		 		isTourInterativo = true;
	    		 		loadTasks(0);
	    		 		loadExercise(0);		    		 		
	    		 		checkTour();
	    		 	}
	    	    }
	     },  
	     error : function(e) {  
	      alert('Error: ' + e);   
	     }  
	    }); 
}
function createIntroductionPlans() {
	var plans = '<span class="topic" onclick="loadTasks(1)">Introdução 1</span><div id="tasks1" class="tasks"></div>';

	if (unlockAllPlans) {
		for (var i = 2; i <= numPlanosIntroducao; i++) 
			plans += '<span class="topic" onclick="loadTasks(' + i + ')">Introdução ' + i + '</span> <div id="tasks' + i + '" class="tasks"></div>';	
	}
	
	else {
		plans = '<div class="locked" id="lplan1" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div>' + plans;
		
		for (var i = 2; i <= numPlanosIntroducao; i++) 
			plans += '<div class="locked" id="lplan' + i + '" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div><span class="topic" onclick="loadTasks(' + i + ')">Introdução ' + i + '</span> <div id="tasks' + i + '" class="tasks"></div>';			
	}
	
	document.getElementById("the_list").innerHTML = plans;
}

function createExperimentalPlan() {
	var plans = '<span class="topic" onclick="loadTasks(10033)">Equações</span><div id="tasks10033" class="tasks"></div>';
	document.getElementById("the_list").innerHTML = plans;
	unlockAllPlans = true;
	loadTasks(10033);

}

function createPlans() {
	var plans;
	
	if (enableIntroductionPlans) {
	var introPlans = '<span class="topic" onclick="createIndroductionPlans()">Planos de Introdução</span>';
	plans = introPlans + '<span class="topic" onclick="loadTasks(' + (numPlanosIntroducao + 1) + ')">Plano de Aula 1</span> <div id="tasks1" class="tasks"></div>';

	if (unlockAllPlans) {
		plans = '<span class="topic" onclick="createRevisionPlans()">Planos de revisão</span>' + plans;	
		
		for (var i = 2; i <= numPlanosAula; i++) 
			plans += '<span class="topic" onclick="loadTasks(' + (i + numPlanosIntroducao) + ')">Plano de Aula ' + i + '</span> <div id="tasks' + (i + numPlanosIntroducao) + '" class="tasks"></div>';	
	}
	
	else {
		plans = '<div class="locked" id="lplan' + (numPlanosIntroducao + 1) + '" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div>' + plans;
		
		for (var i = 2; i <= numPlanosAula; i++) 
			plans += '<div class="locked" id="lplan' + (i + numPlanosIntroducao) + '" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div><span class="topic" onclick="loadTasks(' + (i + numPlanosIntroducao) + ')">Plano de Aula ' + i + '</span> <div id="tasks' + (i + numPlanosIntroducao) + '" class="tasks"></div>';			
	}
	}
	
	else {
		plans = '<span class="topic" onclick="loadTasks(' + (1 + numPlanosIntroducao) + ')">Plano de Aula 1</span> <div id="tasks1" class="tasks"></div>';

		if (unlockAllPlans) {
			plans = '<span class="topic" onclick="createRevisionPlans()">Planos de revisão</span>' + plans;			

			for (var i = 2; i <= numPlanosAula; i++) 
				plans += '<span class="topic" onclick="loadTasks(' + (i + numPlanosIntroducao) + ')">Plano de Aula ' + i + '</span> <div id="tasks' + (i + numPlanosIntroducao) + '" class="tasks"></div>';	
		}	

		else {
			plans = '<div class="locked" id="lplan1" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div>' + plans;
			
			for (var i = 2; i <= numPlanosAula; i++) 
				plans += '<div class="locked" id="lplan' + (i + numPlanosIntroducao) + '" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div><span class="topic" onclick="loadTasks(' + (i + numPlanosIntroducao) + ')">Plano de Aula ' + i + '</span> <div id="tasks' + (i + numPlanosIntroducao) + '" class="tasks"></div>';			
		}

	}
	
	document.getElementById("the_list").innerHTML = plans;
	
}

function createRevisionPlans() {
	var plans = '<span class="topic" onclick="generateLevels()">Modo Campanha</span> <span class="topic" onclick="loadTasks(' + (numPlanosAula+1) + ')">' + indexTXT[54] + ' 1</span> <div id="tasks' + (numPlanosAula+1) + '" class="tasks"></div>';
	var numTotalPlanos = numPlanosAula + numPlanosRevisao;		
	
	for (var i = numPlanosAula + 2; i <= numTotalPlanos; i++) 
		plans += '<span class="topic" onclick="loadTasks(' + i + ')">' + indexTXT[54] + ' ' + (i-numPlanosAula) + '</span> <div id="tasks' + i + '" class="tasks"></div>';	

	
	document.getElementById("the_list").innerHTML = plans;
}



function getIdPlan(idEquation) {
	var idEquationString = "" + idEquation;
	var idPlan;
	
	if (idEquationString.length === 3) 
		idPlan = idEquationString.substring(0, 1);
			
	else 
		idPlan = idEquationString.substring(0, 2);		
	
	
	idPlan = parseInt(idPlan);	
	
	return idPlan;	
}

function p1 ( ) {
	$.guider({
		description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_01.png border=0> <div style='position:absolute; top:220px; left:452px;'> <a href=# onclick=helpPage2()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:242px; left:-30px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>",
	            closable: true,
	            overlay: "dark"            
		}).show();
}


function closeWindow ( ) {
	$("#mask").fadeOut(700);
	$("#help-box").fadeOut(700);
	
	if (selectedEquation !== null)
		$("#topicsAux").show();
	
	else
	    $("#topics").fadeIn();	
}


//function audio ( ) {
//	try {
//    $.guider({
//		description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/modal_audio.png border=0><div style='position:absolute; top:330px; left:266px;'> <a href=# onclick=playAudio()><img src=/pat2math/patequation/img/botao_play.png></img></a>",
//                closable: false,
//                overlay: "dark",
//                alignButtons: "right",
//                width: 620
//		}).show();
//	} catch (e) {
//		window.location.reload();
//	}
//}
//
//function playAudio2 ( ) {
//	try {
//    $.guider({
//		description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/modal_audio.png border=0> <audio autoplay> <source src='/pat2math/patequation/audio/historia.ogg' type='audio/ogg' preload='auto'> </audio>",
//                closable: false,
//                overlay: "dark",
//                alignButtons: "right",
//                width: 620
//		}).show();  
//
//    setTimeout(function(){closeWindow();showSideBar();},345000); 
//	} catch (e) {
//		window.location.reload();
//	}
//}
//function audio2 ( ) {
//	try {
//    $.guider({	
//		description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/modal_audio.png border=0><div style='position:absolute; top:335px; left:250px;'> <a href=# onclick=playAudio2()><img src=/pat2math/patequation/img/botao_play.png></img></a>",
//                closable: false,
//                overlay: "dark",
//                alignButtons: "right",
//                width: 620
//		}).show();  
//	} catch (e) {
//		window.location.reload();
//	}
//}


function verifyPlans() {
	//Fazer uma verificação especial do plano 1, se o resultado retornado em
	//verifyPlan(1) for igual ao número de equações do plano, é para exibir
	//o primeiro exemplo trabalhado e o tour
	
	var continua = true;
	
	for (var i = 2; i <= 22 && continua; i++) {
		$("#lplan" + i).hide();
		$.ajax({
			type: "GET",
			url: appContext + "student/showTopic",
			data: {"idSet" : i}, 
			success:
				function(data) {
					$("#plansAux").html(data);
					var numEquations = document.getElementsByClassName("task").length;
					var numEquationsSolved = document.getElementsByClassName("icon-ok").length;
					var result = numEquations - numEquationsSolved;	
					
					if (result !== 0)
						continua = false;
				},
			error:
				 function(XMLHttpRequest, textStatus, errorThrown) {
			     	alert("Perdão, obtivemos um erro ao processar esta ação.");
			 	}
			});	
		
	}
}


/*Criar um novo usuário no localhost para testar as novas funcionalidades:
 * Se ao resolver todas as equações do plano de aula 1 aparece as mensagens de "plan2()";
 * Se ao resolver todas as equações de qualquer plano de aula (inclusive o do tour) aparece o botão
 * de próxima equação que redireciona para a primeira equação do próximo plano.
 */
function rel() {
	   $.ajax({  
		     type : "Get",   
		     url : "/pat2math/student/reload_task",     
		     success : function(response) { 
		    	 unlockedPlans = response;

		    	 if (enableTourInterativo && response.indexOf("Plano de aula 1") === -1) {
//		    	 if (enableTourInterativo && response.indexOf("Plano de aula 1") === -1 && response.indexOf("Introdução" + numPlanosIntroducao) !== -1) {
		    		 	if (getCookie ("stepTour") === "") {
		    		 		blockMenu = true;
		    		 		
		    		 		if (enableWorkedExamples) {
		    		 			loadExerciseWE("x+2=10", 20);
		    		 			classPlan1();	    	   
		    		 		}
		    		 		
		    		 		else {
		    		 			isTourInterativo = true;
		    		 			loadTasks(0);
		    		 			loadExercise(0);
		    		 			introductionWithWelcome("");
		    		 		}
		    			}
		    		 	
		    		 	else {
		    		 		isTourInterativo = true;
		    		 		loadTasks(0);
		    		 		loadExercise(0);		    		 		
		    		 		checkTour();
		    		 	}
		    	    }
		    	 
		    	 else {
		    		 $("#lplan1").hide();
		    		 numUnlockedPlans = 1;
		    		 	    				    				    		 
		    		 if (unlockedPlans.indexOf("Plano de revisão 1") !== -1) {
		    			createRevisionPlans();	
		    	     }
		    			 
		    		else {		    			 
		    			var i = 2;

//		    			if (enableIntroductionPlans) {
//		    				for (; unlockedPlans.indexOf ("Introdução " + i) !== -1 && i <= numPlanosIntroducao; i++) 
//		    					$("#lplan" + i).hide();
//		    			}
		    				    			
		    			for (; unlockedPlans.indexOf ("Plano de aula " + i) !== -1; i++) 
		    				$("#lplan" + i).hide();    			 
		    		    
		    			//Deve ser colocado o -1 porque o laço for incrementa uma vez adicional após a execução da última instrução
		    			numUnlockedPlans = i - 1;		    			
		    		}
		        	
	    	         var currentPlanString = getCookie ("currentPlan");
	    	         if (currentPlanString !== "") {
	    	        		var currentPlan = parseInt (currentPlanString);
	    	        		loadTasks (currentPlan);
	    	        		 
	    		    	    var currentEquationString = getCookie ("currentEquation");
	    		    		
	    		    	    if (currentEquationString !== "") {		    	    	  
	    		    	    		var currentEquation = parseInt (currentEquationString);
	    		    	    		setTimeout(function() {loadExercise (currentEquation); if (openAndBlockMenu !== "true") { $("#topics").fadeOut(); $("#topicsAux").show();}}, 1000);      		    	    		 		
	    		    	    }
	    	         } 

		    	 }
		     },  
		     error : function(e) {  
		      alert('Error: ' + e);   
		     }  
		    }); 
}

function showNextPlanButton ( ) {
	setTimeout(function(){ nextLineServer.html("<div class='final'></div><div id='next_equation' title='Próximo Plano' onclick='loadingShow(); nextEquationPlanClick(); loadingHide();' ><img src=/pat2math/patequation/img/next_equation.png></div>"); }, 2000);	
}

function nextEquationPlanClick ( ) {
	
}

//Calcula a diferença entre dois tempos, na forma: hour1:minutes1 - hour2:minutes2
//Retorna o resultado em milisegundos
function subtractTime (hour1, minutes1, seconds1, hour2, minutes2, seconds2) {
	var time1MS = (hour1 * 3600000) + (minutes1 * 60000) + (seconds1 * 1000);
	var time2MS = (hour2 * 3600000) + (minutes2 * 60000) + (seconds2 * 1000);
	var result = time2MS - time1MS;
	
	return result;
}

//15:05 - 14:55 = 00:10 (600.000ms)
//54.300.000 - 53.700.000 = 

function getCurrentHour ( ) {
	return new Date().getHours();
}

function getCurrentMinutes ( ) {
	return new Date().getMinutes();
}

function getCurrentSeconds ( ) {
	return new Date().getSeconds();
}


function showSideBar(){
	$("#topics").show();
	$(".hide-menu").show();
}

function hideSideBar(){
	$("#topics").hide();
	$(".hide-menu").hide();
}

function reloadPaper(selected) {
	selectedSheet = "#paper-" + selected;
    loadPaper(selectedSheet);    
    loadEquation(selected - 1);

    centralizeCanMoveAndButton();
    sortable();
    draggable();
   trashHide();
    trashClick();
  //  trashDroppable();
    centralizeCanCopy();
    buttonClick();
    focus();
}

/**
 * @author Felipe de Morais
 * 
 * @description This function load a equation from the equations array. If the newEquations array 
 * contains the most recent equation, then the load is from the newEquations array. 
 * 
 * @param {int} index is a value between 0 and 9.
 * 
 * */

function loadEquation(index) {
	isLoadEquation = true;
	var newEquation = newEquations[index];
    selectedEquation = equations[index];
    var go = false;
    
    if (newEquation.equation !== selectedEquation.equation) {
        $(selectedSheet + " .hLine").each(
        	function() {
        		$(this).empty();
        		$(this).removeClass('canMove');
        		$(this).removeClass('canCopy');
        	}
        );
        equations[index] = newEquations[index];
        selectedEquation = equations[index];
        go = true;
    }

    if (go) {
        // get the firs valid line to put content
        var line = $(selectedSheet + " .hLineAux").next();

        var stack = textToUserInterface(selectedEquation.equationToString);

        var elements = "<ul id='currentEquation'>";
        
        //Verificação para as três primeiras equações que são da forma x=a+b. Dado que a+b=c, a interface gráfica deverá mostrar
        //__=c. Isso precisou ser feito porque o resolvedor não aceita digitar um passo igual à equação.
//        if (idEquation <= 102) {
//        	var expression = stack.pop();
//        	expression = stack.pop() + expression;
//        	expression = stack.pop() + expression;
//        	
//        	var result = eval(expression);
//        	stack.push("" + result); //A stack deve ter elementos String
//        }
        
        for (var i = 0; i < stack.length; i++) {
        	if (isIntroductionToEquationPlan) {
        		if (stack[i] === "x")
        			stack[i] = "__";
        		
        		else if (stack[i].indexOf("x</div>") !== -1)
        			stack[i] = replaceAll(stack[i], "x</div>", "  </div>");
        	}
        		
        	
        	elements = elements + "<li>" + stack[i] + "</li>";
        }

        elements = elements + "</ul>";
        line.html(line.html() + elements);

        line.addClass("canCopy");
        centralizeCanCopy();
        line.removeClass("canCopy");

        // if the current equation contains steps, then they have to be loaded together with the equation
        if (selectedEquation.steps !== null && selectedEquation.steps.length > 0) {
        	calculateUsedLines();
        	   	
            for (var i = 0; i < selectedEquation.steps.length; i++) {
                stack = textToUserInterface(selectedEquation.steps[i].step);
                selectedEquation.lastStep = selectedEquation.steps[i];

                elements = "<ul>";
                for (var j = 0; j < stack.length; j++) {
                    var elm = stack[j];
                    if (elm === "x") {
                        if (selectedEquation.lastStep.type === x1_SOLUTION) {
                            elm = "x\'";
                            selectedEquation.nAnswers++;
                            selectedEquation.twoAnswers = true;
                        } else if (selectedEquation.lastStep.type === x2_SOLUTION) {
                            elm = "x\'";
                        }
                    }
                    elements = elements + "<li>" + elm + "</li>";
                }


                line.find("li").css("opacity", "0.5");

                if (line.html().indexOf("frac") !== -1) {
                    line = line.next().next();
                } else {
                    line = line.next();
                }

                
                line.html(line.html() + elements);

                line.find("li").css("opacity", "0.75");
                
                if (testeFinalizado) {
                	requestFinalAnswer();
                	
                	var html = "</ul><div class='cool coolAlign'></div>";
                	
                	if (!correctEquation(selectedEquation.steps[i].step))
                		html = "</ul><div class='bad coolAlign'></div>";
                	
                	elements = elements + html;
                }

                if (selectedEquation.lastStep.type === DELTA_SOLUTION || selectedEquation.lastStep.type === x1_SOLUTION) {
                    //line.find("li").css("color", "blue");
                    if (selectedEquation.lastStep.type === DELTA_SOLUTION) {
                        selectedEquation.lastStep = selectedEquation.steps[0];
                    } else { //x1 solution
                        var find = false;
                        for (var j = i - 1; j >= 0; j--) {
                            if (selectedEquation.steps[j].step.indexOf('±') !== -1) {
                                selectedEquation.lastStep = selectedEquation.steps[j];
                                find = true;
                                break;
                            }
                        }
                        if (!find) {
                            selectedEquation.lastStep = selectedEquation.steps[0];
                        }
                    }
                }

                var equation = selectedEquation.steps[i].step;
                var passoAnterior = "";
                if (i > 0) {
                    passoAnterior = selectedEquation.steps[i - 1].step;
                } else {
                    passoAnterior = selectedEquation.initialEquation;
                }


                if (equation.indexOf('a') !== -1 || equation.indexOf('b') !== -1 || equation.indexOf('c') !== -1) {
                    selectedEquation.lastStep = null;
                }


                if (selectedEquation.steps[i].type !== NORMAL_STEP && selectedEquation.steps[i].type !== x2_SOLUTION && selectedEquation.steps[i].type !== NORMAL_SOLUTION) {
                    selectedEquation.lastStep = null;
                } else if (passoAnterior.indexOf("±") !== -1 && equation.indexOf("±") === -1) {
                    selectedEquation.initialEquation = passoAnterior;
                    selectedEquation.twoAnswers = true;
                }

                line.addClass("canCopy");
                centralizeCanCopy();
                line.removeClass("canCopy");
            }
        }

        line.addClass("canCopy");

        var nextLine;
        if (elements.indexOf("frac") !== -1) {
            nextLine = line.next().next();
        } else {
            nextLine = line.next();
        }

        if ($(selectedSheet).html().indexOf("final") === -1) {
            
        	if (selectedEquation.isComplete || (selectedEquation.lastStep !== null && (selectedEquation.lastStep.type === x2_SOLUTION || selectedEquation.lastStep.type === NORMAL_SOLUTION))) {
                //$(selectedSheet + " .canCopy li").css("color", "blue");
                $(selectedSheet + " .canCopy").removeClass("canCopy");
                //addProgressValue(10);
                //selectedEquation.lastStep = selectedEquation;
                nextLine.html("<div class='final'></div>");            
                
                var result = selectedEquation.points - selectedEquation.userPoints - selectedEquation.userErrorPoints;
                selectedEquation.addPoints(result);

            } else {
                nextLine.addClass("canMove");
                if (!enableWorkedExamples || !isWorkedExample)
                	clearLine('');
                //nextLine.html(
                  //      "<ul>" +
                    //    "<li class='labelDefault'><input type='text'></li>" + //autofocus='true'
                      //  "</ul>" +
                     //   "<div class='trash'></div>" +
                     //   "<button id='button'></button>");
                
//                centralizeCanMoveAndButton();
//                sortable();
//                draggable();
//                trashHide();
//                trashDroppable();
//                centralizeCanCopy();
//                buttonClick();
//                focus();
            }
        }
    }

    $("#hintText").hide('blind', 500);
    //$(".verticalTape").hide('blind', 500);
    $("#hintText").html("");
    
    if (idEquation !== undefined && idEquation !== null) {
    	if (corrections[idEquation] === undefined || corrections[idEquation] === null)
    		corrections[idEquation] = new Array();
    }
    
    if (equacoesResolvidas[idEquation] !== undefined) {
    	document.getElementById("inputMobile").style.display = "none";
    	document.getElementById("enviarParaCorrecao").style.display = "none";
    }
    
    if (testeFinalizado) {
    	var elements = document.getElementsByClassName("cool");
    	
    	for (var i = 0; i < elements.length; i++) {
    		elements[i].style.backgroundImage = "url('/pat2math/patequation/img/cool.png')";
    	}
    	
    	elements = document.getElementsByClassName("bad");
    	
    	for (var i = 0; i < elements.length; i++) {
    		elements[i].style.backgroundImage = "url('/pat2math/patequation/img/bad.png')";
    	}
    }
    return selectedEquation.equation;
}

function calculatePoints(equation) {
    $("#amountPoins").text(equation.userPoints + " de " + equation.points + " pontos");
}

function reloadProgressBar() {
    var aux = 0;
    for (var i in equations) {
        if (i.isComplete) {
            aux += 10;
        }
    }
    addProgressValue(aux);
}

function resetProgressBar(){
	concluded=0;
	addProgressValue(0);
}

function addProgressValue(value) {
    concluded += value;
    var widthBar = (concluded / numEquacoesPlanoAtual) * 100;
    widthBar = Math.trunc(widthBar);
    $("#progressBar div").css("width", widthBar + "%");
//    $("#progressBar .progress-bar .progress-bar-info").attr("aria-valuenow", concluded);
    $("#progressBar .label").text(concluded + " / " + numEquacoesPlanoAtual);
}

function addLabelDefault() {
    $(selectedSheet + " .canMove ul").append("<li class='labelDefault'><input type='text'></li>");

    centralizeCanMoveAndButton();
    sortable();
    trashHide();
    trashClick();
    trashDroppable();
    focus();

    $(".labelDefault:first input").focus();
}

function deleteStep() {
//	var temp = resolutions[idEquation];
//	temp.pop();
//	setCookieDays("resolutionCurrentEquation", temp.toString(), 1);
	var pos = searchResolutions(idEquation);
	resolutions[pos].steps.pop();
	
	var cookieName = "equation" + idEquation;
	setCookieDays(cookieName, resolutions[pos].steps.toString(), 1);
	
	window.location.reload();
}

function clearLine(option) {
    if (option === 'all') {
        selectedEquation.currentStep = "";
        selectedEquation.lastStep = null;
    }

    var html = $(selectedSheet + " .canMove").html();
    var svg = "";
    if (html.indexOf("svg") !== -1) {
        svg = html.substring(html.indexOf("<svg"), html.indexOf("</svg>") + 1);
    }

    $(selectedSheet + " .canMove").html(
            svg + "<ul>" +
            "<li class='labelDefault'><input type='text' id='inputMobile'></li>" +
            "</ul>" +
            "<div class='trash'><div id='enviarParaCorrecao'></div></div>" +
            "<button id='button'></button>");

    
    centralizeCanMoveAndButton();
    sortable();
    draggable();
   // trashHide();
    trashClick();
   // trashDroppable();
    buttonClick();
    focus();
    
    if(selectedEquation.steps !== null && selectedEquation.steps.length > 0)
    	document.getElementById("enviarParaCorrecao").innerHTML = "<button onclick='finalizaQuestao()'>Enviar para correção</button><button onclick='deleteFinalStep()'>Apagar último passo</button>"

    $(".labelDefault input").focus();
    
    
    
}

function referenceToDelta() {
    var html = $(selectedSheet + " .canMove").html();
    var svg = "";
    if (html.indexOf("svg") !== -1) {
        svg = html.substring(html.indexOf("<svg"), html.indexOf("</svg>") + 1);
    }
    selectedEquation.currentStep = "";
    //selectedEquation.lastStep = null;

    $(selectedSheet + " .canMove").html(
            svg + "<ul>" +
            "<li>Δ</li>" +
            "<li>=</li>" +
            "<li>b²</li>" +
            "<li>-</li>" +
            "<li>4</li>" +
            "<li>*</li>" +
            "<li>a</li>" +
            "<li>*</li>" +
            "<li>c</li>" +
            "</ul>");
//    +
//            "<div class='trash'></div>" +
//            "<button id='button'></button>"
    centralizeCanMoveAndButton();

    $(selectedSheet + " .canMove").addClass("formula");
    $(selectedSheet + " .canMove").next().addClass("canMove");

    $(selectedSheet + " .formula").removeClass("canMove");
    clearLine();

    $(selectedSheet + " .labelDefault input").attr("value", "d=");
    $(selectedSheet + " .labelDefault input").css("width", 48 + "px");
    //selectedEquation.lastStep = null;

    centralizeCanMoveAndButton();
    sortable();
    draggable();
    trashHide();
    trashClick();
    trashDroppable();
    buttonClick();
    focus();
    $(selectedSheet + ".labelDefault input").focus();
}

function referenceToABC(a, b, c, focused) {
    var html = $(selectedSheet + " .canMove").html();
    var svg = "";
    if (html.indexOf("svg") !== -1) {
        svg = html.substring(html.indexOf("<svg"), html.indexOf("</svg>") + 1);
    }
    selectedEquation.currentStep = "";
    //selectedEquation.lastStep = null;

    $(selectedSheet + " .canMove").html(
            svg + "<ul>" +
            "<li>a</li>" +
            "<li>=</li>" +
            "<li class='labelDefault'><input class='a' type='text' value=" + a + "></li>" +
            "<li>;</li>" +
            "<li>b</li>" +
            "<li>=</li>" +
            "<li class='labelDefault'><input class='b' type='text' value=" + b + "></li>" +
            "<li>;</li>" +
            "<li>c</li>" +
            "<li>=</li>" +
            "<li class='labelDefault'><input class='c' type='text'  value=" + c + "></li>" +
            "</ul>" +
            "<div class='trash'></div>" +
            "<button id='button'></button><div id='feedbackError'></div>");

    $(selectedSheet + " .labelDefault .a").css("width", (a.length + 1) * 16 + "px");
    $(selectedSheet + " .labelDefault .b").css("width", (b.length + 1) * 16 + "px");
    $(selectedSheet + " .labelDefault .c").css("width", (c.length + 1) * 16 + "px");
    centralizeCanMoveAndButton();
    sortable();
    draggable();
    trashHide();
    trashClick();
    trashDroppable();
    buttonClick();
    focus();
    $(selectedSheet + " .labelDefault ." + focused).focus();
}

function referenceToBhaskara() { //± = &PlusMinus;
    var html = $(selectedSheet + " .canMove").html();
    var svg = "";
    if (html.indexOf("svg") !== -1) {
        svg = html.substring(html.indexOf("<svg"), html.indexOf("</svg>") + 1);
    }
    //selectedEquation.lastStep = null;
    selectedEquation.currentStep = "";

    $(selectedSheet + " .canMove").html(
            svg + "<ul>" +
            "<li><math><mn>x</mn></math></li>" +
            "<li><math><mn>=</mn></math></li>" +
            "<li><math><mfrac><mrow><mo>-</mo><mn>b</mn><mo>±</mo><msqrt><mrow><mn>Δ</mn></mrow></msqrt></mrow><mrow><mn>2</mn><mo>*</mo><mn>a</mn></mrow></msqart></math></li>" +
            "</ul>");

    centralizeCanMoveAndButton();

    $(selectedSheet + " .canMove").addClass("formula");
    $(selectedSheet + " .canMove").next().next().addClass("canMove");

    $(selectedSheet + " .formula").removeClass("canMove");
    clearLine();

    $(selectedSheet + " .labelDefault input").attr("value", "x=");
    $(selectedSheet + " .labelDefault input").css("width", 48 + "px");
    //selectedEquation.lastStep = null;

    centralizeCanMoveAndButton();
    sortable();
    draggable();
    trashHide();
    trashClick();
    trashDroppable();
    buttonClick();
    focus();
}

function buttonClick() {
	$(selectedSheet + " #button").button().unbind('click');   
	$(selectedSheet + " #button").button().click(function() {    
		checkEquation();
    });
}

function getEquation(list) {
    var equation = "";
    for (var i = 0; i < list.length; i++) {
        var text = $(list[i]).html();
        if (text.indexOf("<math>") === -1) {
            equation = equation + text;
        } else {
            equation = equation + mathmlToText(text);
        }
    }
    return equation;
}


function trashClick(){
	
	
	
	//$("body").on("click", ".hide-menu", function() {
	
	$(".trash").on("click",function(){
		clearLine();
	});
}

function trashHide() {
    $(selectedSheet + " .trash").hide();
}

function trashHide() {
    $(selectedSheet + " .trash").show();
}

function trashDroppable() {
    $(selectedSheet + " .trash").droppable({
        hoverClass: "trashHover",
        tolerance: "touch",
        drop: function(event, ui) {
            ui.helper.hide("explode", 200);
            ui.helper.remove();
            $(selectedSheet + " .trash").hide("explode", 300);
            var text = $(selectedSheet + " .canMove li").text();
            text = text.replace(/^\s+|\s+$/g, "");//trim function

            if (text === "") {
                $(selectedSheet + " .canMove ul").html("<li class='labelDefault'><input type='text'></li>");
            }

//            if (text.indexOf("=") === (text.length - 1) && (!($(selectedSheet + " .canMove li").last().hasClass("labelDefault")) || $(selectedSheet + " .canMove li").last().css("visibility") === "hidden")) {
//                $(selectedSheet + " .canMove ul").append("<li class='labelDefault' contenteditable='true' ></li>");
//            }
//            if (text.indexOf("=") === 0 && (!($(selectedSheet + " .canMove li").first().hasClass("labelDefault")) || $(selectedSheet + " .canMove li").first().css("visibility") === "hidden")) {
//                $(selectedSheet + " .canMove ul").prepend("<li class='labelDefault' contenteditable='true' ></li>");
//            }
            focus();
        },
        over: function(event, ui) {
            ui.helper.css("text-shadow", "0 0 3px red");
        },
        out: function(event, ui) {
            ui.helper.css("text-shadow", "none");
        }
    });
}

function draggable() {
    $(selectedSheet + " .canCopy li").draggable({
        connectToSortable: selectedSheet + " .canMove ul",
        helper: "clone",
        containment: selectedSheet,
        revert: "invalid",
        distance: 10}).disableSelection();
}

function sortable() {
    $(selectedSheet + " .canMove ul").sortable({
        revert: "invalid",
        //        placeholder: "ui-state-highlight", //placeHolder
        containment: selectedSheet,
        distance: 10,
        start: function(event, ui) {
            //alert(ui.helper.html());
            if (ui.helper.parent().parent().hasClass("canMove")) {
                $(selectedSheet + " .trash").show("clip", 300); //show(300)
                centralizeCanMoveAndButton();
            }
//            $("#button").hide("slide", 300);
            //centralizeCanMoveAndButton();
        },
        stop: function(event, ui) {
            //alert(ui.item.html());
            centralizeCanMoveAndButton();
            //ui.item.attr("contenteditable", "true");
            $(selectedSheet + " .trash").hide("clip", 300); //hide(300)            
//            $("#button").show("slide", 300);            
            focus();
        }
    });
}

function focus() {

    $(selectedSheet + " .canMove li").unbind('click');

    $(selectedSheet + " .canMove li").click(function() {

        if ($(this).html().indexOf("input") === -1) {

            var text = $(this).parent().text();
            var a = $(selectedSheet + " .labelDefault .a").val();
            var b = $(selectedSheet + " .labelDefault .b").val();
            var c = $(selectedSheet + " .labelDefault .c").val();
            clearLine();
            if (text.indexOf("a=") !== -1 && text.indexOf("b=") !== -1 && text.indexOf("c=") !== -1) {
                var abc = identifyABC(text);
                if (abc.a === "") {
                    abc.a = a;
                }
                if (abc.b === "") {
                    abc.b = b;
                }
                if (abc.c === "") {
                    abc.c = c;
                }
                var clicked = "";
                var selected = $(this).index();
                var first = 3;
                var second = 7;
                if (abc.a.indexOf("-") !== -1) {
                    first++;
                    second++;
                }
                if (abc.b.indexOf("-") !== -1) {
                    second++;
                }
                if (selected <= first) {
                    clicked = "a";
                } else if (selected > first && selected <= second) {
                    clicked = "b";
                } else if (selected > second) {
                    clicked = "c";
                }
                referenceToABC(abc.a, abc.b, abc.c, clicked);
                selectedEquation.currentStep = text;
            } else {
                $(selectedSheet + " .labelDefault input").attr("value", selectedEquation.currentStep);
                $(selectedSheet + " .labelDefault input").css("width", (selectedEquation.currentStep.length + 1) * 16 + "px");
                centralizeCanMoveAndButton();
                focus();
            }
        }

    });

    $(selectedSheet + " .canMove li").unbind('keyup');

    $(selectedSheet + " .canMove li input").keyup(function(event) {

        $(this).stop().animate({
            width: ($(this).val().length + 1) * 16
        }, 100, centralizeCanMoveAndButton);

    });

    $(selectedSheet + " .canMove li input").unbind('blur');

    $(selectedSheet + " .canMove li input").blur(function() {
        if ($(selectedSheet + " .canMove ul").html().indexOf("ui-sortable-placeholder") === -1) {

            var naturalText = $(this).val();
            selectedEquation.currentStep = naturalText;

            if (naturalText !== "") {
                var stack = "";
                var result = "";

                result = naturalToText(naturalText);

                stack = textToUserInterface(result);

                var elements = "";
                for (var i = 0; i < stack.length; i++) {
                    elements = elements + "<li>" + stack[i] + "</li>";
                }
                $(this).parent().replaceWith(elements);
                focus();
                centralizeCanMoveAndButton();

            } else if (naturalText === "") {
                if ($(this).parent().next().hasClass("labelDefault") || $(this).parent().prev().hasClass("labelDefault")) {
                    $(this).parent().remove();
                } else {
                    $(this).parent().addClass("labelDefault");
                }
            }
        }
    });

    if (!$(selectedSheet + " .canMove li input:first").hasClass("a")) {
        $(selectedSheet + " .canMove li input:first").focus();
    }
}

function filterNatural(natural) {
    var newNatural = "";
    var split = natural.split(" ");
    for (var j = 0; j < split.length; j++) {
        natural = split[j];
        if (natural.indexOf("/") !== -1) {
            var indexBar = natural.indexOf(")/");
            while (indexBar > 0) {
                var index = -1;
                var cont = 0;
                for (var i = indexBar - 1; i >= 0; i--) { //numerator
                    if (natural[i] === "(") {
                        if (cont === 0) {
                            index = i;
                            break;
                        } else {
                            cont--;
                        }
                    } else if (natural[i] === ")") {
                        cont++;
                    }
                }
                if (index !== -1) {
                    var aux = natural.substring(0, index);
                    var aux2 = natural.substring(index + 1, natural.length);
                    if (aux !== "" && aux2 !== "") {
                        aux = aux + " ";
                    }
                    natural = aux + aux2;
                }
                natural = natural.replace(")/", "/");
                indexBar = natural.indexOf(")/");
            }
            indexBar = natural.indexOf("/(");
            while (indexBar > 0) {
                var index = -1;
                var cont = 0;
                for (var i = indexBar + 2; i < natural.length; i++) { //denominator
                    if (natural[i] === ")") {
                        if (cont === 0) {
                            index = i;
                            break;
                        } else {
                            cont--;
                        }
                    } else if (natural[i] === "(") {
                        cont++;
                    }
                }
                if (index !== -1) {
                    var aux = natural.substring(0, index);
                    var aux2 = natural.substring(index + 1, natural.length);
                    if (aux !== "" && aux2 !== "") {
                        aux = aux + " ";
                    }
                    natural = aux + aux2;
                }
                natural = natural.replace("/(", "/");
                indexBar = natural.indexOf("/(");
            }
            natural = replaceAll(natural, ")/", "/");
            natural = replaceAll(natural, "/(", "/");
        }
        if (newNatural !== "") {
            newNatural = newNatural + " " + natural;
        } else {
            newNatural = natural;
        }
    }
    return newNatural;
}

//coloca o canMove ul no centro da linha
function centralizeCanMoveAndButton() {
    if (!selectedEquation.isComplete) {
        var width = parseInt($(selectedSheet + " .canMove ul").css("width"));
        var x = parseInt($(selectedSheet + " .canMove").css("width"));
        var operation = 0;
//        if ($(selectedSheet + " .canMove").html().indexOf("operation") !== -1) {
//            operation = 20;
//        }
        var test = (x / 2) - (width / 2) - operation;
        $(selectedSheet + " .canMove ul").css("padding-left", test);
    }
//    $("#button").position({
//        of: $(".canMove"),
//        my: "right center",
//        at: "right center"
//    });
}

function centralizeCanCopy() {
    var width = parseInt($(selectedSheet + " .canCopy ul").css("width"));
    var x = parseInt($(selectedSheet + " .canCopy").css("width"));
    var test = (x / 2) - (width / 2);
    $(selectedSheet + " .canCopy ul").css("padding-left", test);
}

function centralizeCanCopyUI() {
    var width = parseInt($(selectedSheet + " .canCopy ul").css("width"));
    var x = parseInt($(selectedSheet + " .canCopy").css("width"));
    var test = (x / 2) - (width / 2);
//    $(selectedSheet + " .canCopy ul").css("padding-left", test);
}
function coolAlign() {
	levelXNegativeHint = 0;
    $(selectedSheet + " .coolAlign").position({
        of: $(selectedSheet + " .canCopy"),
        my: "right center",
        at: "right center"
    });
    $(selectedSheet + " .coolAlign").removeClass("coolAlign");
}

function stringToUrl(string) {
    string = replaceAll(string, '+', '%2B');
    string = replaceAll(string, '/', '%2F');
    string = replaceAll(string, '=', '%3d');
    string = replaceAll(string, '#', '%23');
    //string = replaceAll(string, '±', '%b1');
    string = replaceAll(string, '&', '%26');
    return string;
}

function moveHint() {
	//Reajustar esse código que às vezes não funciona, e as dicas aparecem em cima da caixa de input
//	var steps = selectedEquation.steps;
//	var top = 253;
//	
//	if (selectedEquation.equation.indexOf ("/") !== -1) {
//		top += 32;
//	}
//	
//	for (var i = 0; i < steps.length; i++) {
//		if (steps[i].step.indexOf ("/") === -1) {
//			top += 32;
//		}
//		
//		else {
//			top += 64;
//		}
//	}
//	
//	var maxHeight = heightSheet - top;
//
//	top = top + "px";
//	maxHeight = maxHeight + "px";
//	
//	document.getElementById('hintText').style.top = top;
//	document.getElementById('hintText').style.maxHeight = maxHeight;
}
function hint() {
	if (isLoadEquation)
		isLoadEquation = false;
	
	moveHint();

    if (!selectedEquation.isComplete) {
    	var equation;
    	
    	if (selectedEquation.lastStep !== null)
    		equation = selectedEquation.lastStep.step;
    	
    	else
    		equation = selectedEquation.equation;
    	
//        var equation = $(selectedSheet + " .canCopy li").toArray();
//        equation = getEquation(equation);
//        if (selectedEquation.twoAnswers === true) {
//            if (equation === "" || equation === null) {
//                equation = selectedEquation.initialEquation;
//            } else if (equation.indexOf('a') !== -1 || equation.indexOf('b') !== -1 || equation.indexOf('c') !== -1) {
//                equation = selectedEquation.initialEquation;
//            }
//        }
        requestServer('d', equation, "", "", null);
    } else {
        $("#hintText").html("*Equação já finalizada!");
        $("#hintText").show('blind', 500);
        $(".verticalTape").show('fold', 500);
    }
}

function newEquation() {
    requestServer('n', "", "", "", null);
}

//function resetNumClicks ( ) {
//	numClicks = 0;
//}
//
//function fiveClicksOnTheLoupe ( ) {
//	numClicks = 0;
//	
//	$("#easter-egg-loupe-box").html('<audio autoplay> <source src="horse.ogg" type="audio/ogg"> <source src="/pat2math/patequation/audio/quebra-da-lupa.mp3" type="audio/mpeg"> </audio><img src=/pat2math/patequation/img/lupa-quebrada.png border=0>');
//	$("#mask").fadeIn(700);
//	$("#easter-egg-loupe-box").fadeIn(700);
//	
//	setTimeout ('closeEasterEgg()', 10000);
//}

//function closeEasterEgg ( ) {
//	$("#mask").fadeOut(700);
//	$("#easter-egg-loupe-box").fadeOut(700);
//	
//}


function checkEquationOld() { 
	if (isLoadEquation)
		isLoadEquation = false;
	
	var button = document.getElementById('button');
	if (button.style.width !== '16px') {
		document.getElementById('button').style.visibility = "hidden";
    
	$(selectedSheet + " .canMove li input").blur();
	
  var equation = naturalToText(selectedEquation.currentStep);
  
  if (equation === "")
	  equation = " ";
  
  else if (equation.indexOf (".") !== -1 || equation.indexOf (",") !== -1) {
	  alert ('Por enquanto o PAT2Math não trabalha com números decimais, somente com frações. Tente refazer este passo utilizando números fracionários com a barra /.');
	  return false;
  }
  var passoAnterior = selectedEquation.lastStep;
  
  if (passoAnterior !== null) {
      passoAnterior = passoAnterior.step;         
  } else {
      passoAnterior = selectedEquation.initialEquation;       	  
  }

  var equationServer = equation;
  var mathml = getEquation($(selectedSheet + " .canMove li").toArray());
  if (mathml.indexOf('a') !== -1 || mathml.indexOf('b') !== -1 || mathml.indexOf('c') !== -1) {
      equation = mathml;
  }
  //alert(equation + "/n" + selectedEquation.currentStep);
  //selectedEquation.currentStep = equation;

  if (equation.indexOf('a') !== -1 || equation.indexOf('b') !== -1 || equation.indexOf('c') !== -1) {
      //check if the a, b and c are corrects!!!
      //selectedEquation.currentStep = equation;
      equation = replaceAll(equation, ';', '&'); //split the equation to get the a, b and c value
      passoAnterior = selectedEquation.initialEquation;
  }


  if (equation.indexOf("d") !== -1 && passoAnterior.indexOf("d") === -1 || passoAnterior === "" || passoAnterior === null) {
      passoAnterior = selectedEquation.initialEquation;
  } else if (passoAnterior.indexOf("±") !== -1 && equation.indexOf("±") === -1) {
      selectedEquation.initialEquation = passoAnterior;
      selectedEquation.twoAnswers = true;
  }
  
  var pos = searchResolutions(idEquation);
  
  if (pos !== -1) 
	  resolutions[pos].steps.push(equationServer);
  
  else {
	  pos = resolutions.length;
	  var newResolution = new ResolutionEquation(idEquation);
	  newResolution.steps.push(equationServer);
	  resolutions.push(newResolution);
  }
  
  var cookieName = "equation" + idEquation;
  setCookieDays(cookieName, resolutions[pos].steps.toString(), 1);
  
//  if (resolutions[idEquation] === undefined)
//	  resolutions[idEquation] = new Array();
//  
//  var temp = resolutions[idEquation];
//  temp.push(equationServer);
//  
//  if (selectedEquation.steps === null || selectedEquation.steps === undefined) {
//	  selectedEquation.steps = new Array();
//  }
  
//  setCookieDays("resolutionCurrentEquation", temp.toString(), 1);

  var verification = equationServer.split("=");
  var v1 = verification[0] === "x";
  var v2 = $.isNumeric(verification[1]);
  
//Verificação especial para frações que não resultam em um número inteiro
  if (v1 && !v2) {
	  var split = verification[1].split("/");
	  
	  if (split.length === 2) {
		  split[0] = replaceAll(split[0], "(", "");
		  split[0] = replaceAll(split[0], ")", "");
		  split[1] = replaceAll(split[1], "(", "");
		  split[1] = replaceAll(split[1], ")", "");
		  
		  if ($.isNumeric(split[0]) && $.isNumeric(split[1])) {
			  var expression = split[0] + "/" + split[1];
			  var result = eval(expression);
		  
			  if (result % 1 !== 0)
				  v2 = true;
		  }
	  }
  }

  var element = $(selectedSheet + " #button");

  $(selectedSheet + " .trash").remove();

  $(".verticalTape").hide('blind', 500);

  if (element.parent().html().indexOf("frac") !== -1) {
      nextLineServer = element.parent().next().next();
  } else {
      nextLineServer = element.parent().next();
  }

  var idBorrachaAnterior = "borracha" + selectedEquation.steps.length;
  document.getElementById(idBorrachaAnterior).style.visibility = "hidden";
  
  var htmlLine = "<ul>" +
  "<li class='labelDefault'><input type='text' id='inputMobile'></li>" +
  "</ul>" +
  "<div class='borracha' id='borracha" + (selectedEquation.steps.length+1) + "' title='Apagar passo' onclick='deleteStep()'></div>" +
  "<button id='button'></button>";
  
//  if (selectedEquation.steps === null || selectedEquation.steps === undefined || selectedEquation.steps.length === 0) {
//	  htmlLine = "<ul>" +
//      "<li class='labelDefault'><input type='text' id='inputMobile'></li>" +
//      "</ul>" +
//      "<div id='borracha' title='Apagar passo' onclick='deleteStep()'></div>" +
//      "<button id='button'></button>";
//  }
  
//  else {
//	  var marginTop = $('#borracha').css('margin-top');
//	  marginTop = marginTop.replace("px", "");
//	  marginTop = parseInt(marginTop);
//	  var newMarginTop = marginTop + 33;
//	  newMarginTop = newMarginTop + "px";
//	  $('#borracha').css('margin-top', newMarginTop);
//  }
  nextLineServer.html(htmlLine);
  
  $("#borracha").tooltip();
  
  
  $(selectedSheet + " .canCopy li").draggable("disable");
  $(selectedSheet + " .canCopy li").css("opacity", "0.5");
  $(selectedSheet + " .formula li").css("opacity", "0.5");
  $(selectedSheet + " .canCopy").removeClass("canCopy");
  $(selectedSheet + " .canMove ul").sortable("disable");
  //$(selectedSheet + " .canMove li").attr("contenteditable", "false");
  $(selectedSheet + " .canMove li").css("opacity", "0.75");
  nextLineServer.addClass("canMove");
  element.parent().removeClass("canMove");
  element.parent().addClass("canCopy");

  var idCool = "cool" + selectedEquation.steps.length;
  var divCool = "<div class='coolExam coolAlign' id='" + idCool + "'></div>";
  $(element).replaceWith(divCool);
  centralizeCanMoveAndButton();
  coolAlign();
  sortable();
  draggable();
//   trashHide();
//    trashDroppable();
  trashClick();
  buttonClick();
//  selectedEquation.lastStep = null;
  focus();
  
  document.getElementById(idCool).style.display = "none";
  
  if (v1 && v2) {
	  nextLineServer.html('<div id="finalizaQuestao"><button type="button" onclick="finalizaQuestao()">Enviar para avaliação</button></div><div class="borracha" id="borracha' + (selectedEquation.steps.length+1) + '" style="margin-top: -55px;" title="Apagar passo" onclick="deleteStep()"></div>');
	  var step = new Step(equationServer, NORMAL_SOLUTION);
	  selectedEquation.lastStep = step;
      selectedEquation.steps.push(step);
      selectedEquation.currentStep = "";
  }
  
  else {
	  selectedEquation.steps.push(new Step(equationServer, NORMAL_STEP));
	  selectedEquation.currentStep = "";
  }
  
	}
}

function checkEquation() { 
	if (isLoadEquation)
		isLoadEquation = false;
//	setTimeout ('resetNumClicks()', 3000);
//	
//	if (numClicks === undefined)
//		numClicks = 1;
//	
//	else
//		numClicks++;
//	
//	if (numClicks === 5)
//		fiveClicksOnTheLoupe();
	
	//var display = document.getElementById('button').style.display;
//	if (document.getElementById ('button') === null && idEquation >= 0) {
//		//Verifica se o ID da equação atual não é o da última equação de um dos planos de aula
//    	if (idEquation !== 26 && idEquation !== 49 && idEquation !== 63 && idEquation !== 120 && idEquation !== 143 && idEquation !== 162 && idEquation !== 178 && idEquation !== 200 && idEquation !== 201 && idEquation !== 219)       
//		    nextEquationClick();
//	}
	
//	else {
	var button = document.getElementById('button');
	if (button.style.width !== '16px') {
	button.style.width = '16px';
	button.style.height = '16px';
	button.style.top = '4px';
	button.style.right = '7px';
	button.style.background = 'url("/pat2math/images/solve_loading.gif")';

    
	$(selectedSheet + " .canMove li input").blur();
//  var passoAnterior = $(selectedSheet + " .canCopy li").toArray();
//  passoAnterior = getEquation(passoAnterior);
	
  var equation = naturalToText(selectedEquation.currentStep);
  
  if (equation === "")
	  equation = " ";
  
  else if (equation.indexOf (".") !== -1 || equation.indexOf (",") !== -1)
	  alert ('Por enquanto o PAT2Math não trabalha com números decimais, somente com frações. Tente refazer este passo utilizando números fracionários com a barra /.');
  
  
  
  
//  if (isTourInterativo) {
//      if (cont === 0) {
//      	resolutionPart1(equation);
//      } else if (cont === 1) {
//      	resolutionPart2(equation);
//      } else if (cont === 2) {
//      	resolutionPart3(equation);
//      } else if (cont === 3) {
//      	resolutionPart4(equation);
//      } else if (cont === 4) {
//      	resolutionPart5(equation);  
//      } cont++;
//  }
  
  
  
  var passoAnterior = selectedEquation.lastStep;
  
  if (passoAnterior !== null) {
      passoAnterior = passoAnterior.step;         
  } else {
      passoAnterior = selectedEquation.initialEquation;       	  
  }
  
  

  //alert(passoAnterior + " -> " + selectedEquation.initialEquation);

//  if (selectedEquation.initialEquation === "") {
//      selectedEquation.initialEquation = passoAnterior;
//  }

  var equationServer = equation;
  var mathml = getEquation($(selectedSheet + " .canMove li").toArray());
  if (mathml.indexOf('a') !== -1 || mathml.indexOf('b') !== -1 || mathml.indexOf('c') !== -1) {
      equation = mathml;
  }
  //alert(equation + "/n" + selectedEquation.currentStep);
  //selectedEquation.currentStep = equation;

  if (equation.indexOf('a') !== -1 || equation.indexOf('b') !== -1 || equation.indexOf('c') !== -1) {
      //check if the a, b and c are corrects!!!
      //selectedEquation.currentStep = equation;
      equation = replaceAll(equation, ';', '&'); //split the equation to get the a, b and c value
      passoAnterior = selectedEquation.initialEquation;
  }


  if (equation.indexOf("d") !== -1 && passoAnterior.indexOf("d") === -1 || passoAnterior === "" || passoAnterior === null) {
      passoAnterior = selectedEquation.initialEquation;
  } else if (passoAnterior.indexOf("±") !== -1 && equation.indexOf("±") === -1) {
      selectedEquation.initialEquation = passoAnterior;
      selectedEquation.twoAnswers = true;
  }
  
//  if (window.location.href.indexOf("knowledgeTest") === -1)
	  requestServer('e', passoAnterior, equationServer, "OG", $(selectedSheet + " #button"));

//  else
//	  requestServerKnowledgeTest('e', passoAnterior, equationServer, "OG", $(selectedSheet + " #button"));

  //document.getElementById('button').style.display = 'inline';
//}
}
}

function identifyABC(step) {
    var a, b, c;
    var a = step.substring(step.indexOf('a=') + 2, step.indexOf(';'));
    step = step.substring(step.indexOf(';') + 1, step.length);
    var b = step.substring(step.indexOf('b=') + 2, step.indexOf(';'));
    step = step.substring(step.indexOf(';') + 1, step.length);
    var c = step.substring(step.indexOf('c=') + 2, step.length);
    return {a: a, b: b, c: c};
}

//function nextEquationClick() {
////    $(".nextEquation").click(function() {
//    var sheet = parseInt(selectedSheet.replace("#paper-", "")) + 1;
//    if (sheet > 10) {
//        sheet = 1;  ////// return to Pat2Math page
//    }
//
//    $(".nextEquation").fadeOut();
//    setTimeout(function() {
//        $("#aPaper" + sheet).click();
//    }, 500);
////                        });
//}

function callbackAddPoints(value) {
    var x = $("#amountPoins").offset().left - 20;
    var y = $("#amountPoins").offset().top - 40;
    var scrollTop = $(document).scrollTop();

    setTimeout(function() {
        $("#newPoints:visible").animate({
            left: (x + 60) + "px",
            top: (y + 40 - scrollTop) + "px"
        }, 1000);
        $("#newPoints:visible").fadeOut();
        setTimeout(function() {
            selectedEquation.addPoints(value);
        }, 1000);

    }, 1000);
}

function showHint(hint) {
	//Caso a dica contenha um ponto final e seja a que mostra ao aluno o próximo passo completo, este ponto é removido para facilitar a cópia do passo.
	if (hint.indexOf("próximo passo") && hint.charAt(hint.length-1) === ".") {
		hint = hint.substring(0, hint.length-1);
	}
	
	if (hint === "null" || hint.indexOf("Infelizmente") !== -1) {
		var lastCorrectStep = selectedEquation.lastStep.step;
		var split = lastCorrectStep.split("=");
		

		//Verifica se a dica é do tipo -x=[constante], caso não previsto no banco de dicas
		//Se ocorrer exceção, é que não é desse tipo 
		try {
			var constant = parseInt(split[1]);
			
			if (split[0] === "-x" || split[0] === "-X") {
				hint = xNegativeHint[levelXNegativeHint];
			
				if (levelXNegativeHint === 3 || levelXNegativeHint === 4) 
					hint = hint.replace("[CONSTANT]", constant);
					
				if (levelXNegativeHint < 4)
					levelXNegativeHint++;
			}
			
		} catch (e) {
			hint = "Infelizmente não há mais dicas disponíveis";
		}
		
		
	}
	
	//Verifica se a dica é de uma propriedade distributiva e se não é a dica de nível 3, que não precisa
	//ser manipulada
	else if (hint.indexOf(")*(") === -1 && hint.indexOf("*(") !== -1 && hint.indexOf("Você sabia que a multiplicação") === -1) {
		//Variável que salva o operador da propriedade distributiva (+ ou -)
		var operator = "+";
		//Os comandos abaixo ajustam o visual da propriedade distributiva. Por exemplo, na expressão
		//2(x+5), o resolvedor interpreta como (2*(x+5)) 
		var newHint = hint.split("*");
		newHint[0] = newHint[0].replace("(", "");
		newHint[1] = newHint[1].replace(")", "");
		
		//Caso em que a propriedade distributiva envolve um sinal de menos.
		//Ao invés de utilizar a - b, o resolvedor utiliza a + (-b)
		if (newHint[1].indexOf("+(-") !== -1) {
			operator = "-";
			newHint[1] = replaceAll(newHint[1], "(", "");
			newHint[1] = newHint[1].replace(")", "");
			newHint[1] = newHint[1].replace("+-", "-");
			newHint[1] = "(" + newHint[1];
		}
		
		//O back-end apresentou problemas para gerar o passo da dica de nível 3 da propriedade
		//distributiva, assim essa dica será gerada pela front-end
		//A dica recebida pelo sistema é a expressão de propriedade distributiva atual
    	var resolution = "";
		var multiplier = "";
		if (hint.indexOf("<") === 0) {
    		var expression = newHint[1].replace("(", "");
    		expression = expression.replace(")", "");
    		expression = expression.replace("</eq>", "");
    		
    		var terms = expression.split(operator);
    		
    		var posMultiplier = newHint[0].indexOf(">") + 1;
    		multiplier = newHint[0].substring(posMultiplier);
    		
    		//a(b+/-c)
    		if (expression.charAt(0) !== "-" && terms.length === 2)
    			resolution = multiplier + "*" + terms[0] + operator + multiplier + "*" + terms[1];
    		
    		//-a(+/-b+/-c)
    		else if (multiplier.charAt(0) === "-") {
    			//-a(-b+/-c)
    			if (expression.charAt(0) === "-") {
    				terms[1] = "-" + terms[1];
        			resolution = multiplier + "*" + terms[1] + multiplier + "*" + operator + terms[2];
    			}
    			
    			//-a(b+/-c)
    			else 
    				resolution = multiplier + "*" + terms[0] + multiplier + "*" + operator + terms[1];			    		
    		}
    		
    		//a(-b+/-c)
    		else {
    			terms[1] = "-" + terms[1];
    			resolution = multiplier + "*" + terms[1] + operator + multiplier + "*" + terms[2];
    		}
		}
		
    	if (resolution === "")
    		hint = newHint[0] + newHint[1];
    	
    	else {
    		var passoAnterior;
    		
    		if (selectedEquation.lastStep === null)
    			passoAnterior = selectedEquation.initialEquation;
    		
    		else
    			passoAnterior = selectedEquation.lastStep.step;
    		
    		var expression = multiplier + "*" + newHint[1].replace("</eq>", "");
    		resolution = adjustExpression(resolution);
    		
    		hint = "Se você resolver a expressão " + newHint[0] + newHint[1] + ", o próximo passo (a linha inteira) da equação fica " + passoAnterior.replace(expression, resolution);   		
    	}   	
	}
	
	moveHint();
	
	var lastHint = "";
	
	if (hint.indexOf("gratuíta") === -1)
		lastHint = $("#hintText").html();
    
    if (lastHint !== "") {	
        lastHint = "<br><br>" + lastHint;
    }
    
    $("#hintText").hide('blind', 200);
    $("#hintText").html(hint + lastHint);
    $("#hintText").show('blind', 500);
}

function verifyFreeHints() {
	var hintsAvailable = freeHints[planoAtual];
	
	if (hintsAvailable > 0) {
		var text = " dicas gratuitas disponíveis";
		
		if (hintsAvailable === 1)
			text = " dica gratuíta disponível";
		
		document.getElementById("freeHints").innerHTML = hintsAvailable + text;
	}
	
	else {
		document.getElementById("freeHints").innerHTML = "";
	}
}

function verifyFreeErrors() {
	var freeErrorsAvailable = freeErrors[planoAtual];
	
	if (freeErrorsAvailable > 0) {
		document.getElementById("logo").style.marginLeft = "153px";
		document.getElementById("freeErrors").style.display = "block";
		document.getElementById("freeErrors").innerHTML = "Erros gratuitos disponíveis: " + freeErrorsAvailable;
	}
	
	else {
		document.getElementById("freeErrors").style.display = "none";
	}
}
function showFeedbackError(hint) {
	if (hint.indexOf("Infelizmente") !== -1) {
		//Se não encontrou um feedback de erro, deverá exibir uma dica normal
		var equation;
    	
    	if (selectedEquation.lastStep !== null)
    		equation = selectedEquation.lastStep.step;
    	
    	else
    		equation = selectedEquation.equation;
    	
		requestServer('d', equation, "", "", "feedbackError");
	}
	
	else {
		//Caso a dica contenha um ponto final e seja a que mostra ao aluno o próximo passo completo, este ponto é removido para facilitar a cópia do passo.
		if (hint.indexOf("próximo passo") && hint.charAt(hint.length-1) === ".") {
			hint = hint.substring(0, hint.length-1);
		}
		
		var lastHint = $("#feedbackError").html();
    
		if (lastHint !== "") {	
			lastHint = "<br><br>" + lastHint;
		}
    
		$("#feedbackError").hide('blind', 200);
		$("#feedbackError").html(hint + lastHint);
		$("#feedbackError").show('blind', 500);
	}
}

//Função chamada pelo servidor quando não há mais feedbacks de erro disponíveis, aí mostra uma dica
function showFeedbackError2(hint) {
	//Caso a dica contenha um ponto final e seja a que mostra ao aluno o próximo passo completo, este ponto é removido para facilitar a cópia do passo.
	if (hint.indexOf("próximo passo") && hint.charAt(hint.length-1) === ".") {
		hint = hint.substring(0, hint.length-1);
	}
	
    var lastHint = $("#feedbackError").html();
    
    if (lastHint !== "") {	
        lastHint = "<br><br>" + lastHint;
    }
    
    $("#feedbackError").hide('blind', 200);
    $("#feedbackError").html(hint + lastHint);
    $("#feedbackError").show('blind', 500);
}
function adjustExpression(expression) {	
	var pos = expression.indexOf("*-");
	expression = adjustExpressionAux(expression, pos, "*-", "*(-");
	pos = expression.indexOf("--");
	
	expression = adjustExpressionAux(expression, pos, "*+", "*");
	pos = expression.indexOf("--");
	expression = adjustExpressionAux(expression, pos, "--", "-(-");
	pos = expression.indexOf("+-");
	expression = adjustExpressionAux(expression, pos, "+-", "-");

	return expression;
}

function adjustExpressionAux(expression, pos, text, newText) {
	var firstDigitIsNumber = expression.charAt(0) !== "-";
	
	if (!firstDigitIsNumber)
		expression = expression.replace("-", "");
		
	while (pos !== -1) {
		expression = expression.replace(text, newText);
		
		if (firstDigitIsNumber)
			pos += 4;
		
		else
			pos += 3;
		
		var currentDigit = "" + expression.charAt(pos);
		
		while (currentDigit !== "" && isNumberOrIncognita(currentDigit)) {
			pos++;
			currentDigit = "" + expression.charAt(pos);
		}
		
		expression = expression.substring(0, pos) + ")" + expression.substring(pos);
		
		
		pos = expression.indexOf(text);
	}
	
	if (!firstDigitIsNumber)
		expression = "-" + expression;
	
	return expression;
}

function writeInput(text) {
	document.getElementById('inputMobile').value += text;
}

function getEquationsWE() {
	equationsWE = new Array();
	pointsWE = 100;
	
	equationsWE[1] = "x+2=10";
	equationsWE[2] = "x+4=10"
	equationsWE[3] = "x-4=8";
	equationsWE[4] = "x+4=-2"
	equationsWE[5] = "x-3=-6";
	equationsWE[7] = "-x+1=10"
	equationsWE[8] = "-x-10=7"
	equationsWE[9] = "-x+4=-8"
	equationsWE[10] = "-x-15=-9"
	equationsWE[12] = "2x=10"
	equationsWE[13] = "5x=-30"
	equationsWE[14] = "-3x=15"
	equationsWE[15] = "-4x=-28"
	equationsWE[17] = "(x)/(4)=20"
	equationsWE[18] = "(x)/(7)=-49"
	equationsWE[19] = "-(x)/(6)=42"
	equationsWE[20] = "-(x)/(4)=-100"
	equationsWE[22] = "4x-10=8";
	equationsWE[23] = "-3x+9=-27";
	equationsWE[24] = "5x+8-2x=10+x";
	equationsWE[26] = "x-(3-2x)=2+(-4+2x)"; //ver se mantenho esta equação
	equationsWE[27] = "2(x+3)-5=5(x+2)";
	equationsWE[28] = "(x+3)/(3)=(4)/(9)";
	equationsWE[30] = "(x)/(4)+5=(2)/(3)-(5x)/(8)";
	equationsWE[31] = "(x+2)/(5)+8=(x-3)/(4+2)";
	equationsWE[32] = "(4(x+3))/(7)+5=(-2(-x-1))/(5+8)";
	equationsWE[34] = "(4)/(x)+(2)/(3)-5=(8)/(6x)";
	equationsWE[35] = "(5)/(4x-2)+9=(10)/(-4(x-3))";
	
//	equationsWE[1] = "x+4=10"
//	equationsWE[2] = "-x+1=10"
//	equationsWE[3] = "2x=10"
//	equationsWE[4] = "-3x=15"
//	equationsWE[6] = "(x)/(4)=20"
//	equationsWE[7] = "(x)/(-6)=42"
//	equationsWE[8] = "4x-10=8";
//	equationsWE[9] = "-3x+9=-27";
//	equationsWE[11] = "5x+8-2x=10+x";
//	equationsWE[12] = "5(2+x)=4(2x-3)";
//	equationsWE[13] = "(10)/(x)=(500)/(-600)";
//	equationsWE[15] = "(3x)/(2)-(x)/(4)-10=5x";
}

//function getColorsBackground() {
//	//----- Muito Fácil: Verde Claro -----//
//	colorsBackground[1] = "#DEFFDE";
//	colorsBackground[2] = "#DEFFDE";
//	colorsBackground[3] = "#DEFFDE";
//	colorsBackground[4] = "#DEFFDE";
//	colorsBackground[5] = "#DEFFDE";
//
//	//----- Fácil-1: Azul Celeste -----//
//	colorsBackground[7] = "#E0FFFF";
//	colorsBackground[8] = "#E0FFFF";
//	colorsBackground[9] = "#E0FFFF";
//	colorsBackground[10] = "#E0FFFF";
//	
//	//----- Fácil-2: Verde -----//
//	colorsBackground[12] = "#E0FFFF";
//	colorsBackground[13] = "#E0FFFF";
//	//----- Planos de Revisão -----//
//	colorsBackground[6] = "#DEFFDE"; //Verde Claro
//}

function gift() {
	if (getCookie("gift") !== "") {
		document.getElementById("refresh_page").style.backgroundImage = "url('/pat2math/images/Gift.png')";
		document.getElementById("refresh_page").title = "???";
		$("#refresh_page").tooltip();
		document.getElementById("refresh_page").onclick = function() {
			$.guider({
				title : "Resultados de uma pesquisa estatística",
				description : "Uma pesquisa envolvendo uma população - 1 de todas as pessoas do meu dia a dia teve o seu início em 2013 e foi concluída nesses dias. Essa pesquisa teve como objetivo identificar o acontecimento mais importante da minha época de graduação da Unisinos que envolveu ao mesmo tempo a minha vida acadêmica, profissional e pessoal. 100% das pessoas envolvidas concordaram que esse acontecimento foi no dia 17 de Março de 2014 às 10:45.",
				overlay : "dark",
				width : 600,
				alignButtons : "center",
				buttons : {
					"O que aconteceu no dia 17/03/2014 às 10:45?": {
						click : function(){$.guider({
							title : "Voltando para 10/03/2014 às 10:45",
							description : '<iframe src="https://giphy.com/embed/xT8qB45TTnypO1h6KY" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/doctor-who-opening-intro-xT8qB45TTnypO1h6KY"></a></p>',
							overlay : "dark",
							width : 600,
							onShow: function() {setTimeout(function() {$.guider({
								title : "Chegamos!",
								description : 'Agora também será explicado o porquê de ser uma "população - 1", a única pessoa que não participou da pesquisa foi o próprio resultado :D<br><img src="/pat2math/images/17-03-2014 10-45.png"></img><br><br>Muito obrigado por essa grande oportunidade, que proporcionou uma excelente amizade além do projeto de trabalho. Também nunca vou esquecer da participação especial do Rafael Ávila, que além de ser uma ótima pessoa e professor, foi graças a ele que essa oportunidade tornou-se possível.',
								overlay : "dark",
								width : 935,
								alignButtons : "center",
								buttons : {
									"Voltar para o dia de hoje": {
										click : function(){$.guider({
											description : 'Espero que tenha gostado dessa "viagem no tempo" e da montagem como um todo, assim como gostou da primeira :D E só por curiosidade, o GIF que coloquei na janela intermediária é do seriado Doctor Who criado pela BBC e que está no ar desde 1963, e aquele objeto que estava voando no espaço é a TARDIS (Time And Relative Dimension(s) In Space), a nave especial desse doutor que consegue manipular o tempo e espaço e viajar para onde ele quiser. Se tu ainda não conheces esse seriado recomendo muito assistir, o bom é que os episódios não tem uma ligação tão direta entre eles, aí tu podes assistir como se fossem filmes separados.',
											overlay : "dark",
											width : 600,
											alignButtons : "center",
											buttons : {
												"Concluir a viagem no tempo :D": {
													click : function(){$.guider({	}).hideAll();},
													className : "primary",
												}
											}
										}).show();},
										className : "primary",
									}
								}
							}).show();}, 6000);}
						}).show();},
						className : "primary",
					}
				}
			}).show();
		}
	}
}
function searchArray (elemento, array) {
	for (var i = 0; i < array.length; i++)
		if (array[i] === elemento)
			return i;
	
	return -1;	
}

function searchResolutions(id) {
	for (var i = 0; i < resolutions.length; i++) {
		if (resolutions[i].id === id)
			return i;
	}
	
	return -1;
}

function insertInArray(array, element, pos) {
	if (array[pos] !== undefined) {
		for (var i = array.length - 1; i >= pos; i--)
			array[i+1] = array[i];
	}
	
	array[pos] = element;
}

$(document).ready(function() {	
	isPAT2Exam = true;
	
	var cookieEquacoesResolvidas = getCookie("equacoesResolvidasExam");
	
	if (cookieEquacoesResolvidas !== "") {
		var ids = cookieEquacoesResolvidas.split(",");
		
		for (var i = 0; i < ids.length; i++) {
			var id = parseInt(ids[i]);
			equacoesResolvidas[id] = "concluída";
		}
	}
	loadEquation(0);

    centralizeCanMoveAndButton();
    sortable();
    draggable();
    //trashHide();
    trashClick();
    //trashDroppable();
    centralizeCanCopy();
    buttonClick();
    focus();
    
    $(document).keyup(function(event) {
        var key = event.which;
        if (key === 13) { //enter key

            if ($(selectedSheet + " .nextEquation").css("cursor") === "pointer" && $(selectedSheet + " .nextEquation").css("display") !== "none") {
                $(".nextEquation").click();
            } else {
                checkEquation();
            }

        } 
    });
    
    $("#topics").mouseleave (function() {
    	if (selectedEquation !== null && selectedEquation.equation !== "x=1" && blockMenu === false && openAndBlockMenu !== "true") {
    	    $("#topics").fadeOut();
    	    $("#topicsAux").show();
    	}
    });
    
    $("#topicsAux").mouseover (function() {
    	if (blockMenu === false && openAndBlockMenu !== "true") {
    	    $("#topics").fadeIn();
    	    $("#topicsAux").hide();
    	}
    });
    
	$(selectedSheet + " #logo").tooltip();
	$("#topics").fadeIn();
	createLines();
	
	var currentQuestionCookie = getCookie("currentQuestion");
	
	if (currentQuestionCookie !== "") 
		currentQuestion = parseInt(currentQuestionCookie);
	
	generateTest(5);
	
	var currentEquation = getCookie("currentEquation");
	
	if (currentEquation !== "") {
		idEquation = parseInt(currentEquation);
		var cookieName = "equation" + idEquation;
		var resolutionCookie = getCookie(cookieName);
	
		if (resolutionCookie !== "") {
			var steps = resolutionCookie.split(",");
			var resolution = new ResolutionEquation(idEquation);

			for (var i = 0; i < steps.length; i++)
				resolution.steps.push(steps[i]);
			
			resolutions.push(resolution);
		}
		
		loadTasksExam();
		loadExerciseExam(idEquation);
	}
	 
	// if (getCookie("orientacoesIniciais") === "")
		 //orientacoesIniciais();
});