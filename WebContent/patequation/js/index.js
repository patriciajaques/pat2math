var selectedSheet = "#paper-1";
var selectedEquation;
//var currentStepsFirstEquation;
var firstEquationIsComplete = getCookie ("firstEquationIsComplete");
var idEquation; // the id of the equation in database
var planoAtual; //id do plano que está selecionado
var numEquacoesPlanoAtual;
var idCurrentUser; // the id of the current user logged on
var idTaskVideo;// the id of the video in database
var tasksRemaining; //the number of equations unsolved per topic
var tipoAudio;
var playAudio;
var unlockedPlans;
var unlockAllPlans = false; //Alt + P habilita/desabilita
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
var enableWorkedExamples = getCookie ("enableWE") === "";
var isWorkedExample = false;
var isTourInterativo = false;
var blockMenu = false;
var showNews = false;
var currentPos = getCookie ("pos");
var showPlan2Explanation = "true";
var cStepTour = "stepTour" + currentPos;
var cFunctionTour = "functionTour" + currentPos;
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

//var cont = 0;
//var isFirstStepTour = true; //verifica se é a primeira vez que o usuário está resolvendo um passo da equação com o tour ativo

//function getEquations ( ) {
//	loadExercise (168);
//	loadEquation(0);
//	
//	setTimeout ("var a = 2;", 3000)
//	var string = '\\"' + selectedEquation.equation + '\\"';
//	
//	for (var i = 169; i < 179; i++) {
//		if (i !== 175) {
//		loadExercise (i);
//		loadEquation(0);
//		string += ' \\"' + selectedEquation.equation + '\\"';
//		}
//		
//		
//	}
//	
//	alert (string);
//}


//color é uma String em hexadecimal com # na frente
function setBackgroundColor (color) {
	document.body.style.background = color;
}

function setPaperColor (color) {
	var paper = document.getElementById('paper-1');
	paper.style.backgroundColor = color;
}

function news() {
	var cookieName = "news" + currentPos;
	setCookieDays (cookieName, "false", 1);
	
	$.guider({
		title : "Novidades",
		description : "Redistribuímos as equações dos planos de aula #10 ao #19 entre planos #10 ao #17 (adicionamos um ícone nos planos que foram alterados), para uma melhor organização das equações. Mas não se preocupe, todos os passos já resolvidos das equações foram preservados." +
				      "<br><br>Adicionamos os planos de aula #18 e #19 com equações inéditas." +
				      "<br><br>Agora, ao selecionar um plano de aula, a cor de fundo da página é alterada.",
		overlay : "dark",
		width : 600,
		alignButtons : "center",
		onShow: function() {setCookieDays (cStepTour, "start", 1); setCookieDays (cFunctionTour, "introduction", 1);},
		buttons : {
			Legal: {
				click : true,
				className : "primary",
			}
		}
	}).show();
}


function insertLines (verifyLinesHeight, idEquation) {
	var lines = document.getElementById('lines').innerHTML;
	var cookieName = "linesHeight" + currentPos + "" + idEquation;
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
	$("#topics").fadeOut();
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
	$("#topics").fadeOut();
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


function createLines() {
	var lines = '<div class="hLineAux" id="line1">.</div>';
	
	for (var i = 2; i <= 22; i++) 
		lines += '<div class="hLine" id="line' + i + '"></div>';
	
	document.getElementById("lines").innerHTML = lines;
	
}

function createPlans(numPlans) {
	var plans = '<div class="locked" id="lplan1" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> <span class="topic" onclick="loadTasks(1)">Plano de Aula 1</span> <div id="tasks1" class="tasks"></div>';
		
	for (var i = 2; i <= numPlans; i++) {
		plans += '<div class="locked" id="lplan' + i + '" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div><span class="topic" onclick="loadTasks(' + i + ')">Plano de Aula ' + i + '</span> <div id="tasks' + i + '" class="tasks"></div>';		
	}
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
function rel ( ) {
	   $.ajax({  
		     type : "Get",   
		     url : "/pat2math/student/reload_task",     
		     success : function(response) { 
		    	 unlockedPlans = response;

		    	 if (response.indexOf ("Plano de aula 1") === -1) {
		    		 	var cookieName = "stepTour" + currentPos;
		    			
		    		 	if (getCookie (cookieName) === "") {
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
		    		 
		    		 for (var i = 2; unlockedPlans.indexOf ("Plano de aula " + i) !== -1; i++) {
		    			 $("#lplan" + i).hide();
		    			 numUnlockedPlans = i;	    			 
		    		 }
		    		    		
		        	if (numUnlockedPlans < 3) {
		        		isTourInterativo = true;
		        		loadExercise(0);
		        		checkTour();
		        	}
		        	
		        	 var cookieName = "currentPlan" + currentPos;
	    	         var currentPlanString = getCookie (cookieName);
	    	         if (currentPlanString !== "") {
	    	        		var currentPlan = parseInt (currentPlanString);
	    	        		loadTasks (currentPlan);
	    	        		 
	    	        		cookieName = "currentEquation" + currentPos;
	    		    	    var currentEquationString = getCookie (cookieName);
	    		    		
	    		    	    if (currentEquationString !== "") {		    	    	  
	    		    	    		var currentEquation = parseInt (currentEquationString);
	    		    	    		setTimeout(function() {loadExercise (currentEquation); $("#topics").fadeOut(); $("#topicsAux").show();   }, 1000);      		    	    		 		
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
$(document).ready(function() {	    
//	$("body").on("click", ".hide-menu", function() {
//		$("#topics").hide("slide", { direction: "left" }, 1000);
//		$(this).removeClass("hide-menu");
//		$(this).addClass("show-menu");
//	});
//	
//	
//	
//	$("body").on("click", ".show-menu", function() {
//		$("#topics").show("slide", { direction: "left" }, 1000);
//		$(this).removeClass("show-menu");
//		$(this).addClass("hide-menu");
//	});
	var cookieName = "playAudio" + currentPos;
	
//	if (getCookie (cookieName) !== "false")
//		location.href="/pat2math/audio";	
	
	$("#papers").on("click", "#refresh_page", function() {
		window.location.reload();
	});
		getEquationsWE();
		getResolutionsWE();
		getPontuacaoEquacoes();
//		getColorsBackground();
		rel();
	
	$("#refresh_page").tooltip();
	$("#calculator").tooltip();
	$("#calculatorIcon").tooltip();
	//if(!useAudio)showSideBar();
	
	
    $("#loadingImage").hide();
    $("#book").show("clip", 500);
    

    $("#mask").click(
            function() {
                $("#video-box").hide();
                $("#mask").hide();
            }
    );
    
    //Desabilita o evento de voltar para a página anterior a partir da tecla backspace 
    $(document).unbind('keydown').bind('keydown', function (event) {
        var doPrevent = false;
        if (event.keyCode === 8) {
            var d = event.srcElement || event.target;
            if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' || d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE')) 
                 || d.tagName.toUpperCase() === 'TEXTAREA') {
                doPrevent = d.readOnly || d.disabled;
            }
            else {
                doPrevent = true;
            }
        }

        if (doPrevent) {
            event.preventDefault();
        }
    });
    
    $(document).keyup(function(event) {
        var key = event.which;

        if (key === 13) { //enter key

            if ($(selectedSheet + " .nextEquation").css("cursor") === "pointer" && $(selectedSheet + " .nextEquation").css("display") !== "none") {
                $(".nextEquation").click();
            } else {
                checkEquation();
            }

        } else if (key === 112) { //F1
        	insertLines (false, idEquation);
        } else if (key === 113) { //F2
//        	if (enableAgent === false) {
//        		setCookieDays ("enableAgent", "true", 1);
//        	} else {
//        		setCookieDays ("enableAgent", "", 0);
//        	}
//        	
//        	window.location.reload();
        } else if (key === 9) { //tab key
            $(".labelDefault:first").focus();
        } else if (event.altKey) {
            if (key === 66) { //alt + b
                $("#bhaskara").click();
            } else if (key === 67) { //alt + c
                $("#abc").click();
            } else if (key === 68) { //alt + d
                $("#delta").click();
            } else if (key === 76) { //alt + l
                $("#clearLine").click();
            } else if (key === 77) { //alt + m
            	$("#topics").fadeIn();
        	    $("#topicsAux").hide();
            } else if (key === 84) { //alt + t
                $("#addLabel").click();
            } else if (key === 0) { //alt + ?
                $("#hint").click();
            } else if (key == 80) { //alt + p
            	unlockAllPlans = unlockAllPlans === false;
            }
//        } else if (event.shiftKey) {
//        	if (key === 57) { //( key
//        		writeInput(")");
//        	}     	
        }
    });

    papers.oncontextmenu = function(e) {
        $(".dropdown").css("position", "absolute");
        $(".dropdown").css("left", e.pageX + "px");
        $(".dropdown").css("top", e.pageY - $(document).scrollTop() + "px");
        $(".dropdown").addClass("open");
        return false;
    };

    document.onclick = function(e) {
        if (e.which !== 3) {
            $(".dropdown").removeClass("open");
        }
    };

    /*$("#book").tabs({
        activate: function(event, ui) {
            //alert(ui.newTab.text() + " activated!");
        }
    }).addClass("ui-tabs-vertical ui-helper-clearfix");*/
    
    // $("#book .tabs li").removeClass("ui-corner-top").addClass("ui-corner-all");


    $(selectedSheet + " #logo").tooltip();
    //$("#progressBar").tooltip();
//    $("#helpSystem").tooltip();
    $("#imgInformation").tooltip();

//    $("#helpSystem").click(function() {
//        $("#boxHelpSystem").modal();
//        $(".collapse").removeClass("in");
//    });

    $(".canCopyTools li").draggable({
        connectToSortable: selectedSheet + " .canMove ul",
        helper: "clone",
        containment: "#book",
        appendTo: "body",
        revert: "invalid",
        start: function(e, ui) {
            $(ui.helper).addClass("ui-draggable-helper");
        },
        stop: function(e, ui) {
//            $(ui.helper).removeClass("ui-draggable-helper");
        }
    }).disableSelection();

   /* $("#newEquation").button().click(function() {
        newEquation();
    });
*/
    $("#hint").button().click(function() {
        hint();
    });

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
    
    $("#topics").mouseleave (function() {
    	if (selectedEquation !== null && selectedEquation.equation !== "x=1" && blockMenu === false) {
    	    $("#topics").fadeOut();
    	    $("#topicsAux").show();
    	}
    });
    
    $("#topicsAux").mouseover (function() {
    	if (blockMenu === false) {
    	    $("#topics").fadeIn();
    	    $("#topicsAux").hide();
    	}
    });
    
//    getEquationsPlan();
   
    
//	cookieName = "openQuest" + currentPos;
//
//	if (getCookie (cookieName) === "") {
//	    cookieName = "isQuestOpen" + currentPos;
//	
//	    if (getCookie (cookieName) === "true")
//		    openQuest();
//	
//	    else {
//	    	cookieName = "timeQuest" + currentPos;
//	    	var time = getCookie (cookieName);
//	    	
//	    	if (time === "") {
//	            time = Math.floor((Math.random() * 1500) + 1) * 1000; 
//	        
//	            var hour = getCurrentHour();
//	            cookieName = "lastHour" + currentPos;
//	            setCookieDays (cookieName, hour, 1);
//	        
//	            var minutes = getCurrentMinutes();  
//	            cookieName = "lastMinutes" + currentPos;
//	            setCookieDays (cookieName, minutes, 1);
//	            
//	            var seconds = getCurrentSeconds();
//	            cookieName = "lastSeconds" + currentPos;
//	            setCookieDays (cookieName, seconds, 1);
//	    	}
//	    	
//	    	else {
//	    		var currentHour = getCurrentHour();
//	    		var currentMinutes = getCurrentMinutes();
//	    		var currentSeconds = getCurrentSeconds();
//	    		
//	    		cookieName = "lastHour" + currentPos;
//	    		var lastHour = parseInt (getCookie (cookieName));
//	    		
//	    		cookieName = "lastMinutes" + currentPos;
//	    		var lastMinutes = parseInt (getCookie (cookieName));
//	    		
//	    		cookieName = "lastSeconds" + currentPos;
//	    		var lastSeconds = parseInt (getCookie (cookieName));
//	    		
//	    		var difference = subtractTime(lastHour, lastMinutes, lastSeconds, currentHour, currentMinutes, currentSeconds);
//	    		
//	    		time = parseInt (time);
//	    		time = time - difference;
//	    		
//	    		if (time < 0)
//	    			time = 2000;
//	    	}
//	        
//	    	cookieName = "timeQuest" + currentPos;
//	    	setCookieDays (cookieName, time, 1);
//	    	
//	        setTimeout ('openQuest()', time);
//	    }
//	}
	
	cookieName = "regraWE" + currentPos;
	var regrasCookie = getCookie (cookieName);
	
	if (regrasCookie !== "") {
		setTimeout (function() {showExplanation(regrasCookie);}, 1000);
	}
	
	if (showNews) {
		cookieName = "news" + currentPos;
		var news = getCookie (cookieName);
		
		if (news === "") {
		setTimeout ('news()', 5000);
		}
	}
	
	var widthResolution = screen.width;
	var widthWindow = window.innerWidth;
	
	if (widthResolution > 1440) {
		if (widthResolution <= 1600)
			document.getElementById('hintText').style.left = "38%";
	
		else
			document.getElementById('hintText').style.left = "40%";
	}
	
	if (widthWindow < 1366) 
		document.getElementById("paper-1").style.marginRight = (6 - 1366 + widthWindow) + "px";

	setTimeout (function(){if (selectedEquation.equation === "x=1") {$("#topics").fadeIn(); $("#topicsAux").hide();}}, 1000);

	createLines();
	createPlans(36);
	
	cookieName = "currentWE" + currentPos;
	var currentWE = getCookie(cookieName);
	
	if (currentWE !== "") {
		var idPlanWE = parseInt(currentWE);
		setTimeout(function() {loadExerciseWE(equationsWE[idPlanWE], pointsWE[idPlanWE]);}, 1000);
		setTimeout('classPlan' + idPlanWE + '()', 1200);
	}
		
	
	
	window.onresize = function(){
		var widthWindow = window.innerWidth;
		
		if (widthWindow < 1366) 
			document.getElementById("paper-1").style.marginRight = (6 - 1366 + widthWindow) + "px";
		
		else 
			document.getElementById("paper-1").style.marginRight = "6px";
	};
    // $("#hintText").hide();
    // $(".verticalTape").hide();
    // $("#newPoints").hide();
});

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
        for (var i = 0; i < stack.length; i++) {
            elements = elements + "<li>" + stack[i] + "</li>";
        }

        elements = elements + "</ul>";
        line.html(line.html() + elements);

        line.addClass("canCopy");
        centralizeCanCopy();
        line.removeClass("canCopy");

        // if the current equation contains steps, then they have to be loaded together with the equation
        if (selectedEquation.steps !== null && selectedEquation.steps.length > 0) {
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

                elements = elements + "</ul><div class='cool coolAlign'></div>";
                if (!selectedEquation.isAnswer()) {
                    selectedEquation.addPoints(10);
                }
                line.html(line.html() + elements);

                line.find("li").css("opacity", "0.75");

                if (selectedEquation.lastStep.type === DELTA_SOLUTION || selectedEquation.lastStep.type === x1_SOLUTION) {
                    line.find("li").css("color", "blue");
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
                coolAlign();
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
                $(selectedSheet + " .canCopy li").css("color", "blue");
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

    calculatePoints(selectedEquation);

    $("#hintText").hide('blind', 500);
    //$(".verticalTape").hide('blind', 500);
    $("#hintText").html("");
    
    
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
            "<div class='trash'></div>" +
            "<button id='button'></button>");

    centralizeCanMoveAndButton();
    sortable();
    draggable();
   // trashHide();
    trashClick();
   // trashDroppable();
    buttonClick();
    focus();

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
            "<button id='button'></button>");

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
	var steps = selectedEquation.steps;
	var top = 253;
	
	if (selectedEquation.equation.indexOf ("/") !== -1) {
		top += 32;
	}
	
	for (var i = 0; i < steps.length; i++) {
		if (steps[i].step.indexOf ("/") === -1) {
			top += 32;
		}
		
		else {
			top += 64;
		}
	}
	
	var maxHeight = heightSheet - top;

	top = top + "px";
	maxHeight = maxHeight + "px";
	
	document.getElementById('hintText').style.top = top;
	document.getElementById('hintText').style.maxHeight = maxHeight;
}
function hint() {
	moveHint();

    if (!selectedEquation.isComplete) {
        var equation = $(selectedSheet + " .canCopy li").toArray();
        equation = getEquation(equation);
        if (selectedEquation.twoAnswers === true) {
            if (equation === "" || equation === null) {
                equation = selectedEquation.initialEquation;
            } else if (equation.indexOf('a') !== -1 || equation.indexOf('b') !== -1 || equation.indexOf('c') !== -1) {
                equation = selectedEquation.initialEquation;
            }
        }
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


function checkEquation() { 	
	
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
  
  requestServer('e', passoAnterior, equationServer, "OG", $(selectedSheet + " #button"));

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
	moveHint();
	
    var lastHint = $("#hintText").html();
    if (lastHint !== "") {
        lastHint = "<br><br>" + lastHint;
    }
    $("#hintText").hide('blind', 200);
    $("#hintText").html("*Dica: " + hint + lastHint);
    $("#hintText").show('blind', 500);
}

function setCookieDays(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function setCookieMinutes(cname,cvalue,exminutes) {
    var d = new Date();
    d.setTime(d.getTime() + (exminutes*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function writeInput(text) {
	document.getElementById('inputMobile').value += text;
}

function getEquationsWE() {
	equationsWE = new Array();
	pointsWE = new Array();
	
	equationsWE[1] = "x+2=10";
	pointsWE[1] = 20;
	equationsWE[2] = "x+4=10"
	pointsWE[2] = 20;
	equationsWE[3] = "x-4=8";
	pointsWE[3] = 20;
	equationsWE[4] = "x+4=-2"
	pointsWE[4] = 20;
	equationsWE[5] = "x-3=-6";
	pointsWE[5] = 20;
	equationsWE[7] = "-x+1=10"
	pointsWE[7] = 25;
	equationsWE[8] = "-x-10=7"
	pointsWE[8] = 25;
	equationsWE[9] = "-x+4=-8"
	pointsWE[9] = 25;
	equationsWE[10] = "-x-15=-9"
	pointsWE[10] = 25;
	equationsWE[12] = "2x=10"
	pointsWE[12] = 30;
	equationsWE[13] = "5x=-30"
	pointsWE[13] = 30;
	equationsWE[14] = "-3x=15"
	pointsWE[14] = 35;
	equationsWE[15] = "-4x=-28"
	pointsWE[15] = 35;
	equationsWE[17] = "(x)/(4)=20"
	pointsWE[17] = 40;
	equationsWE[18] = "(x)/(7)=-49"
	pointsWE[18] = 40;
	equationsWE[19] = "-(x)/(6)=42"
	pointsWE[19] = 50;
	equationsWE[20] = "-(x)/(4)=-100"
	pointsWE[20] = 50;
	equationsWE[22] = "4x-10=8";
	pointsWE[22] = 50;
	equationsWE[23] = "-3x+9=-27";
	pointsWE[23] = 60;
	equationsWE[24] = "5x+8-2x=10+x";
	pointsWE[24] = 80;
	equationsWE[26] = "x-(3-2x)=2+(-4+2x)"; //ver se mantenho esta equação
	pointsWE[26] = 100;
	equationsWE[27] = "2(x+3)-5=5(x+2)";
	pointsWE[27] = 100;
	equationsWE[28] = "(x+3)/(3)=(4)/(9)";
	pointsWE[28] = 100;
	equationsWE[30] = "(x)/(4)+5=(2)/(3)-(5x)/(8)";
	pointsWE[30] = 120;
	equationsWE[31] = "(x+2)/(5)+8=(x-3)/(4+2)";
	pointsWE[31] = 140;
	equationsWE[32] = "(4(x+3))/(7)+5=(-2(-x-1))/(5+8)";
	pointsWE[32] = 160;
	equationsWE[34] = "(4)/(x)+(2)/(3)-5=(8)/(6x)";
	pointsWE[34] = 200;
	equationsWE[35] = "(5)/(4x-2)+9=(10)/(-4(x-3))";
	pointsWE[35] = 300;	
}

function getResolutionsWE() {
	resolutionsWE = new Array();
	
	resolutionsWE[1] = "x + 2 - 2 = 10 - 2;x + 0 = 10 - 2;x = 10 - 2;<font color='blue'> x = 8 </font>";
	resolutionsWE[2] = "x = 10 - 4;<font color='blue'>x = 6</font>";
	resolutionsWE[3] = "x = 8 + 4;<font color='blue'>x = 12</font>";
	resolutionsWE[4] = "x = - 2 - 4;<font color='blue'>x = - 6</font>";
	resolutionsWE[5] = "x = - 6 + 3;<font color='blue'>x = - 3</font>";
	resolutionsWE[7] = "- x = 10 - 1;- x = 9;- x * (-1) = 9 * (-1);<font color='blue'>x = - 9</font>";
	resolutionsWE[8] = "- x = 7 + 10;- x = 17;- x * (-1) = 17 * (-1);<font color='blue'>x = - 17</font>";
	resolutionsWE[9] = "- x = - 8 - 4;- x = - 12;<font color='blue'>x = 12</font>";
	resolutionsWE[10] = "- x = - 9 + 15;- x = 6;<font color='blue'>x = - 6</font>";
	resolutionsWE[12] = 'x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator">2</div><div class="numerator">10</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>;<font color="blue">x = 5</font>';
	resolutionsWE[13] = 'x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator">5</div><div class="numerator">- 30</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>;<font color="blue">x = - 6</font>';
	resolutionsWE[14] = 'x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator">- 3</div><div class="numerator">15</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>;<font color="blue">x = - 5</font>';
	resolutionsWE[15] = 'x = <span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator">- 4</div><div class="numerator">- 28</div><div id="lineFrac1" class="frac-line-aux"><span id="lineFrac1" class="frac-line"></span></div><span class="baseline-fix"></span></span></span>;<font color="blue">x = 7</font>'
	resolutionsWE[17] = "x = 20 * 4;x = 80";
	resolutionsWE[18] = "x = - 49 * 7;x = - 343";
	
	//Sorteia uma das formas de resolução das equações dos planos 19 e 20
	var selectSteps = Math.floor((Math.random() * 2) + 1);
	
	if (selectSteps === 1) {
		resolutionsWE[19] = "- x = 42 * 6;- x = 252;- x * (-1) = 252 * (-1);x = <font color='blue'>x = - 252</font>";
		resolutionsWE[20] = "- x = - 100 * 4;- x = - 400;- x * (-1) = - 400 * (-1);x = <font color='blue'>x = 400</font>";
	}
	
	else {
		resolutionsWE[19] = "x = 42 * (-6);<font color='blue'>x = - 252</font>";
		resolutionsWE[20] = "x = - 100 * (-4);<font color='blue'>x = 400</font>";
	}
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
function searchArray (elemento, array) {
	for (var i = 0; i < array.length; i++)
		if (array[i] === elemento)
			return i;
	
	return -1;	
}
