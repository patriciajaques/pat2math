var appContext = "/pat2math/";
//var currentIds = null; //Array original atual das equações
//var currentIds2 = null; //Array ordenado atual das equações
//var stop = true; //Variável que controla se o aluno está resolvendo as equações em sequência. Se não estiver, a variável pos deverá ser atualizada 
//                      //quando clicar no botão da próxima equação.
//var pos = -1; //Posição da equação atual no array ordenado (currentIds2)

//OBS: o método funciona se não houverem frações dentro de frações, estudar uma forma de corrigir neste caso. 
//(x+2*(2+x))/(2+5)=10
function calculateLength (equation) {
	var length = equation.length;
	//Posição atual do símbolo de fração
	var posFrac = equation.indexOf ("/");
	//Array com todas as posições do símbolo de fração
	var posFracArray = new Array ( );
	
	//posFrac é diferente de -1 se houverem uma ou mais frações na equação
	while (posFrac !== -1) {
		posFracArray[posFracArray.length] = posFrac;
		posFrac = equation.indexOf ("/", posFrac + 1);
	}
	
	//Se o array de posições tiver pelo menos um registro, existe uma ou mais frações na equação
	if (posFracArray.length > 0) {
		//Converte a String em um array de caracteres
		var equationArray = equation.split ("");
		//Na primeira execução, first é o início da equação e last é a posição do primeiro símbolo de fração
		var first = 0, last = posFracArray[0];
		//posArray recebe 1 pois a posição 0 já foi utilizada acima
		var posArray = 1;
		//O próximo laço while deverá ser executado enquanto o último símbolo de fração da equação não foi verificado
		var continua = last !== undefined;
		
		while (continua) {
			//Controlam o balanceamento de parênteses abertos e fechados
			var cont1 = 0, cont2 = 0;
			//length1 é o tamanho do numerador e length2 do denominador da fração
			var length1, length2;
			//O primeiro for começará de trás para frente, a partir do primeiro caracter que não seja o símbolo de fração nem o parênteses que fecha o numerador
			var i = last - 2;
			//Para os parênteses estarem balanceados, cont2 deve ser o número sucessor a cont1
			for (; cont1 !== cont2 + 1; i--) {
				if (equationArray[i] === "(")
					cont1++;
				//Se este parêntese for encontrado, é que haviam parênteses internos no numerador da fração, como por exemplo 5*(x+2)
				else if (equationArray[i] === ")")
					cont2++;
			}
			
			length1 = last - i + 1; //seria -1+2, onde 2 são os parênteses que abrem e fecham a fração, os quais não deverão ser contados no tamanho final
			//O -1 é porque, antes de sair do laço for, ou seja, quando a condição for falsa, i é decrementado mais uma vez
			
			first = last + 1;
			last = posFracArray[posArray];
			
			if (last !== undefined)
				posArray++;
			//Se last for undefined, é que chegou ao último símbolo de fração, que está na última posição do array de caracteres
			else {
				last = equation.length - 1;
				continua = false;
			}
			//No segundo for ocorre o processo inverso em relação ao primeiro
			cont1 = 0; cont2 = 0; i = first + 1;
			
			for (; cont1 !== cont2 + 1; i++) {
				if (equationArray[i] === ")")
					cont1++;
				//Se este parêntese for encontrado, é que haviam parênteses internos no denominador da fração, como por exemplo 5*(x+2)
				else if (equationArray[i] === "(")
					cont2++;
			}
			
			length2 = i - first + 2; //2 são os parênteses que abrem e fecham a fração
			
			//Compara qual dos tamanhos é o menor, que deverá ser subtraído do tamanho total da equação (o que conta é o termo com mais caracteres)
			if (length2 < length1)
				length -= length2;
			
			else
				length -= length1;
		}
		
	}
	
	length -= posFracArray.length; //Referentes aos símbolos de divisão "/"

	pontuacaoAtual = length;
}

function calculateUsedLines ( ) {
	usedLines = 0;
	
	if (selectedEquation.equation.indexOf ("/") !== -1) {
		usedLines++;
	}
	
	var steps = selectedEquation.steps;
	
	for (var i = 0; i < steps.length; i++) {
		if (steps[i].step.indexOf ("/") === -1) {
			usedLines++;
		}
		
		else {
			usedLines += 2;
		}
	}
}

function enableContent(id) {
	$.post(
		appContext + "content/enable",
		{"idContent": id},
		function(data) {
			$("#content-" + id).html("Ok");
		}
	);
}


function loadTasks(id) {
	if (unlockAllPlans || numUnlockedPlans >= id) {
		if(id === 1 || id === 9  || id === 17 || id === 25 || id === 33){
			setBackgroundColor("#FFE1F8"); 
		}		
		else if(id === 2 || id === 10 || id === 18 || id === 26 || id === 34){
			setBackgroundColor("#EEE8AA"); 
		}
		else if(id === 3 || id === 11 || id === 19 || id === 27 || id === 35){
			setBackgroundColor("#E0FFFF"); 
		}
		else if(id === 4 || id === 12 || id === 20 || id === 28 || id === 36){
			setBackgroundColor("#E6E6FA"); 
		}
		else if(id === 5 || id === 13 || id === 21 || id === 29){
			setBackgroundColor("#FFECB7"); 
		}
		else if(id === 6 || id === 14 || id === 22 || id === 30){
			setBackgroundColor("#E0E0E0"); 
		}
		else if(id === 7 || id === 15 || id === 23 || id === 31){
			setBackgroundColor("#FFF0F5"); 
		}
		else if(id === 8 || id === 16 || id === 24 || id === 32){
			setBackgroundColor("#B0E0E6"); 
		}			
	
	var open = $("#tasks"+id).css("display");
	tasksRemaining=0;
	if(open == 'none') {
		if (planoAtual !== null) {
			$("#tasks"+planoAtual).slideUp(700);
			$("#tasks"+planoAtual).html("");
		}
		
		
		$.ajax({
			type: "GET",
			url: appContext + "student/showTopic",
			data: {"idSet" : id}, 
			success:
				function(data) {
					$("#tasks" + id).html(data);
					$("#tasks" + id).slideDown(700);	
					
					planoAtual = id;
					
					getPontuacaoPlano();
					numEquacoesPlanoAtual = getNumEquationsPlan();
					resetProgressBar();
					tasksRemaining = numEquacoesPlanoAtual;
					//here tasksremaining contains the number of equations
					/*alert("inicio: "+tasksRemaining);*/
					
					var taskSolved=$(".icon-ok.icon-white").length;
					/*alert("fim: "+taskSolved);*/
					tasksRemaining=tasksRemaining-taskSolved;
					/*alert("fim: "+tasksRemaining);*/
					if (tasksRemaining===0)
						addProgressValue(numEquacoesPlanoAtual);
					
					else 
						addProgressValue(taskSolved);
					
					if (enableWorkedExamples && id !== 6 && id !== 11 && id !== 16 && id !== 21 && id < 25) { //id !== 25 && id !== 29 && id !== 33 && id < 36 
						$("#tasks" + id).html('<span class="taskWE" onclick="getResolutionEquation(' + id + ')" id="taskWE"' + id + '>' + equationsWE[id] + '</span> <i style="margin-right: 6px" class="icon-pencil icon-white"></i> <i class="icon-ok  icon-white"></i><br>' + document.getElementById("tasks" + id).innerHTML);

						if (id > 2 && taskSolved === 0) {
							setTimeout(function() {loadExerciseWE(equationsWE[id], pointsWE[id]);}, 1000);
							setTimeout('classPlan' + id + '()', 1200);
						}
					}
			  	},
			 error:
				 function(XMLHttpRequest, textStatus, errorThrown) {
			     	alert("Perdão, obtivemos um erro ao processar esta ação.");
			     	return false;
			 	}
		});
		
		if (isTourInterativo && id === 1) 
			classPlan("");
		
		var cookieName = "currentPlan" + currentPos;
		setCookieDays (cookieName, id, 1);
//		try {
//			var limite = planoAtual * 200;
//			
//			for (var i = planoAtual * 100; i < limite; i++)
//				var equation = document.getElementById("task" + i).innerHTML;
//				equation = replaceAll(equation, "	", "");
//			
//				equationToUserInterface(i, equation);
//			} catch (e) {
//				i = limite;
//			}
			
		
	} else {
		$("#tasks"+id).slideUp(700);
		$("#tasks"+id).html("");
		planoAtual = null;
	    var cookieName = "currentPlan" + currentPos;
		setCookieDays (cookieName, "", 0);
		

	}
	
	}
	
	
	
	
}

function getNumEquationsPlan() {
	if (planoAtual < 19 && planoAtual !== 6 && planoAtual !== 11 && planoAtual !== 16)
		return 5;
	
	else if (planoAtual === 6 || planoAtual === 16 || (planoAtual > 20 && planoAtual < 36 && planoAtual !== 25 && planoAtual !== 29 && planoAtual!== 33))
		return 10;
	
	else if (planoAtual === 11)
		return 16;
	
	else if (planoAtual === 25 || planoAtual === 29 || planoAtual === 33)
		return 20;
	
	else if (planoAtual === 36)
		return 15;
	
	else 
		return 56;
	
}

function getPontuacaoPlano() {
	if (planoAtual !== 11 && planoAtual !== 16 && planoAtual !== 21 && planoAtual !== 25 && planoAtual !== 33 && planoAtual < 36) {
		if (planoAtual <= 6)
			pontuacaoPlano = 20;
		
		else if (planoAtual >= 7 && planoAtual <= 10)
			pontuacaoPlano = 25;
		
		else if (planoAtual === 12 || planoAtual === 13)
			pontuacaoPlano = 30;
		
		else if (planoAtual === 14 || planoAtual === 15)
			pontuacaoPlano = 35;
		
		else if (planoAtual === 17 || planoAtual === 18)
			pontuacaoPlano = 40;
		
		else if (planoAtual === 19 || planoAtual === 20)
			pontuacaoPlano = 50;
		
		else if (planoAtual >= 26 && planoAtual <= 29)
			pontuacaoPlano = 100;
		
		else if (planoAtual === 22)
			pontuacaoPlano = 50;
		
		else if (planoAtual === 23)
			pontuacaoPlano = 60;
		
		else if (planoAtual === 24)
			pontuacaoPlano = 80;
		
		else if (planoAtual === 30)
			pontuacaoPlano = 120;
		
		else if (planoAtual === 31)
			pontuacaoPlano = 140;
		
		else if (planoAtual === 32)
			pontuacaoPlano = 160;
		
		else if (planoAtual === 34)
			pontuacaoPlano = 200;
		
		else
			pontuacaoPlano = 300;	
	}
	
	else
		pontuacaoPlano = null;
	
}

function getPontuacaoEquacoes() {
	pontuacaoEquacoes = new Array();
	pontuacaoEquacoes[0] = 20;
	
	//----- PLANO DE AULA 11 -----//
	pontuacaoEquacoes[1100] = 20;
	pontuacaoEquacoes[1101] = 20;
	pontuacaoEquacoes[1102] = 20;
	pontuacaoEquacoes[1103] = 20;
	pontuacaoEquacoes[1104] = 20;
	pontuacaoEquacoes[1105] = 20;
	pontuacaoEquacoes[1106] = 20;
	pontuacaoEquacoes[1107] = 25;
	pontuacaoEquacoes[1108] = 25;
	pontuacaoEquacoes[1109] = 20;
	pontuacaoEquacoes[1110] = 25;
	pontuacaoEquacoes[1111] = 25;
	pontuacaoEquacoes[1112] = 25;
	pontuacaoEquacoes[1113] = 25;
	pontuacaoEquacoes[1114] = 25;
	pontuacaoEquacoes[1115] = 25;
	
	//----- PLANO DE AULA 16 -----//
	pontuacaoEquacoes[1600] = 30;
	pontuacaoEquacoes[1601] = 35;
	pontuacaoEquacoes[1602] = 35;
	pontuacaoEquacoes[1603] = 30;
	pontuacaoEquacoes[1604] = 35;
	pontuacaoEquacoes[1605] = 35;
	pontuacaoEquacoes[1606] = 30;
	pontuacaoEquacoes[1607] = 35;
	pontuacaoEquacoes[1608] = 30;
	pontuacaoEquacoes[1609] = 35;
}

function padlockClick ( ) {
	if (selectedEquation !== null)
		moveHint();

	$("#hintText").html("Para desbloquear este plano de aula, você deve resolver todas as equações do plano anterior.");
	$("#hintText").show('blind', 500);
	$(".verticalTape").show('fold', 500);
}

function loadExerciseWE(eq, points) {
	isWorkedExample = true;
	blockMenu = true;
	
	$("#topics").fadeOut();
    $("#topicsAux").show();
    
	var equation = new Equation(eq, points);
	newEquations[0] = equation;
	reloadPaper(1);
}

function loadExercise(id) {	
//	setCurrentEquation (id);	
	loadingShow();
	
	var cookieName = "linesHeight" + currentPos + "" + id;
	
	if (getCookie (cookieName) !== "")
		insertLines(true, id);
	
	if (isTourInterativo === false)
		blockMenu = false;
	
	$.ajax({
		type: 'GET',
		url: appContext + "student/loadExercise",
		data: {"exerciseId" : id},
		dataType: 'json',
		success: function(data) {
			if(data != null) {
				//Verificar neste momento se a primeira equação já está resolvida e atualizar no array de equações (atualizar nos cookies e localmente).
				//Para avançar às próximas equações, a primeira deve estar resolvida obrigatoriamente. Se o usuário tentar acessar outra equação do mesmo plano,
				//será redirecionado mesmo assim para a primeira equação.
				var equation;
				
				if (pontuacaoPlano !== null) 
					equation = new Equation(data.equation, pontuacaoPlano);
						
				else {
					equation = new Equation(data.equation, pontuacaoEquacoes[id]);
				}
				
				equation.id = data.id;
				for(var j = 0; j < data.steps.length; j++) {
					equation.steps[j] = new Step(data.steps[j], 0);
				}
					
				idEquation=id;
				
				if(data.performed) {
					equation.isComplete = true;

					
					if (isTourInterativo === false)
					    setTimeout(function(){ $("#topics").fadeIn(); blockMenu = true; }, 2000);
				}
				
				newEquations[0] = equation;
			}
			reloadPaper(1);
			
			
			var cookieName = "currentEquation" + currentPos;
			setCookieDays (cookieName, idEquation, 1);
			
//			cookieName = "numLines" + currentPos + idEquation;
//			
//			if (getCookie (cookieName) === "")
//				setCookieDays (cookieName, "20", 1);

			
//			stop = true; //Essa variável recebe false em seguida se o usuário clicou no botão de próxima equação		
			
			
//			var eq = loadEquation(0);
//			
//			if (currentPlan === -1 || currentEquation === -1) 
//				for (var i = 0; i < planos.length; i++)
//					for (var j = 0; j < planos[i].length; j++)
//						if (planos[i][j] === eq) {
//							currentPlan = i;
//							currentEquation = eq;
//						}
			
			
			
			
		}
	});
	
	if (isTourInterativo && id >= 100)
		clickEquation("");
		
	else
		blockMenu = false;
	
	setTimeout ('calculateUsedLines()', 1000);
	loadingHide();
	
	
}

function loadExerciseTest(id) {
	loadingShow();

    var cookieName = "linesHeight" + currentPos + "" + id;
    
	if (getCookie (cookieName) !== "")
		insertLines(true, id);
	
	if (isTourInterativo === false)
		blockMenu = false;
	
	$.ajax({
		type: 'GET',
		url: appContext + "student/loadExerciseTest",
		data: {"exerciseId" : id},
		dataType: 'text',
		success: function(data) {
			if(data != null) {
				data = data.split(";");
				equation = new Equation(data[1], 100);
				equation.id = data[0];
				for(var j = 3; j < data.length; j++) {
					equation.steps[j-3] = new Step(data[j], 0);
				}
				
				if(data[2] == "1") {
					equation.isComplete = true;
					
					if (isTourInterativo === false)
					    setTimeout(function(){ $("#topics").fadeIn(); blockMenu = true; }, 2000);
				}
				newEquations[0] = equation;
			}
			reloadPaper(1);
			idEquation=id;
			
			var cookieName = "currentEquation" + currentPos;
			setCookieDays (cookieName, idEquation, 1);
            
            
			
//			stop = true; //Essa variável recebe false em seguida se o usuário clicou no botão de próxima equação
			
			
//            var eq = loadEquation(0);
//			
//			if (currentPlan === -1 || currentEquation === -1) 
//				for (var i = 0; i < planos.length; i++)
//					for (var j = 0; j < planos[i].length; j++)
//						if (planos[i][j] === eq) {
//							currentPlan = i;
//							currentEquation = eq;
//						}
		}
	});
	
	if (isTourInterativo && id >= 100)
		clickEquation("");
	
	setTimeout ('calculateUsedLines()', 1000);
	loadingHide();
}

function loadingShow(){
	$('#loading').fadeIn();
	$("#topics").fadeOut();
}

function loadingShowWE() {
	$('#loadingWE').fadeIn();
	$("#topics").fadeOut();
}

function loadingHide(){
	$('#loading').fadeOut();
//	$("#topics").show("slide", { direction: "left" }, 500);
//	$('.hide-menu').fadeIn();
	
}



function changePlan(idGroup, idPlan) {
	$.post(
		appContext + "group/changePlan",
		{"idGroup": idGroup, "idPlan": idPlan},
		function(data) {
			$(".item").attr("class", "item2");
			$("#plan" + data).attr("class", "item");
		}
	);
}

function changeGroup(idGroup) {
	$.post(
		appContext + "student/changeGroup",
		{"idGroup": idGroup},
		function(data) {
			$(".item").attr("class", "item2");
			$("#group" + data).attr("class", "item");
		}
	);
}

function test56() {
	$(".modal").hide();
	$("#mask").hide();
}

function hideMenu() {
	$("#topics").hide();
}

function watchVideo(id) {
	$.post(
		appContext + "video/watch",
		{"id" : id},
		function(data) {
			$("#video-box").html(data);
			$("#mask").fadeIn(700);
			$("#video-box").fadeIn(700);
		}
	);
	idTaskVideo=id;
}

function msgBox(id, msg, action) {
	if(confirm(msg)) {
		location.href = action + "?group.id=" + id;
	} else {
		//nothing
	}
}

//function getStringEquations ( ) {
//	stringEquation = new Array ( );
//	stringEquation[201] = "x+15=45-2x";
//	stringEquation[13] = "x+4=10";
//	stringEquation[14] = "x+1=23";
//	stringEquation[15] = "x+5=34";
//	stringEquation[16] = "x+8=12";
//	stringEquation[107] = "x-1=11";
//	stringEquation[108] = "x-6=12";
//	stringEquation[109] = "x-9=30";
//	stringEquation[110] = "x-8=19";
//	stringEquation[21] = "10+x=56";
//	stringEquation[22] = "18+x=20";
//	stringEquation[23] = "15+x=21";
//	stringEquation[24] = "120+x=220";
//	stringEquation[25] = "100+x=300";
//	stringEquation[26] = "99+x=180";
//	stringEquation[29] = "4x=-28";
//	stringEquation[30] = "9x=18";
//	stringEquation[31] = "4x=-16";
//	stringEquation[32] = "5x=-20";
//	stringEquation[33] = "12x=6";
//	stringEquation[34] = "18x=9";
//	stringEquation[35] = "7x=-21";
//	stringEquation[36] = "8x=0";
//	stringEquation[37] = "8x=32";
//	stringEquation[38] = "48x=12";
//	stringEquation[39] = "35x=-70";
//	stringEquation[40] = "6x=32";
//	stringEquation[41] = "8x=10";
//	stringEquation[42] = "5x=-100";
//	stringEquation[43] = "32x=-8";
//	stringEquation[44] = "-7x=-42";
//	stringEquation[45] = "-8x=-24";
//	stringEquation[46] = "-20x=-4";
//	stringEquation[47] = "-60=-2x";
//	stringEquation[48] = "45=-5x";
//	stringEquation[49] = "90=2x";
//	stringEquation[58] = "(x)/(2)=12";
//	stringEquation[59] = "(x)/(2)=8";
//	stringEquation[60] = "(x)/(2)=-5";
//	stringEquation[61] = "(x)/(3)=9";
//	stringEquation[62] = "(x)/(4)=-5";
//	stringEquation[55] = "(3x)/(4)=9";
//	stringEquation[56] = "(2x)/(5)=-4";
//	stringEquation[57] = "(2x)/(3)=-10";
//	stringEquation[63] = "(x)/(4)=-30";
//	stringEquation[64] = "3x+10=91";
//	stringEquation[65] = "4x+7=x+25";
//	stringEquation[111] = "6x-19=71";
//	stringEquation[67] = "2x+3=9";
//	stringEquation[68] = "5x+10=50";
//	stringEquation[112] = "6x-1=11";
//	stringEquation[70] = "7x-1=13";
//	stringEquation[71] = "2x+5=27";
//	stringEquation[72] = "7x+1=6x+6";
//	stringEquation[113] = "4x-7=3x+9";
//	stringEquation[114] = "4x-8=2x+6";
//	stringEquation[115] = "5x-3=2x-9";
//	stringEquation[116] = "2x-20=x+80";
//	stringEquation[117] = "9x-10=170";
//	stringEquation[80] = "5x-10=70";
//	stringEquation[81] = "6x=2x+28";
//	stringEquation[118] = "5x-2=18+3x";
//	stringEquation[119] = "6x-10=2x+14";
//	stringEquation[83] = "4x+8=2x+12";
//	stringEquation[84] = "9x+10=8x-7";
//	stringEquation[120] = "5x-18=4x+30";
//	stringEquation[121] = "3(2x-1)=2(x+1..";
//	stringEquation[122] = "3(x+3)-1=2";
//	stringEquation[123] = "3(x+2)=2(x-7)";
//	stringEquation[125] = "5(2x+7)-1=4..";
//	stringEquation[126] = "2(x-1)+3(x+1)..";
//	stringEquation[127] = "2(x+1)+5(x-1)..";
//	stringEquation[128] = "8(x-1)=7(x+2)";
//	stringEquation[129] = "9(x+1)=8(x-2)";
//	stringEquation[130] = "7(x-1)=6(x-1)";
//	stringEquation[131] = "5(x+2)=4(x-1)";
//	stringEquation[132] = "5(x-2)=4(x+3)";
//	stringEquation[124] = "3(x+2)-1=2..";
//	stringEquation[135] = "3(x-1)+5(x-1)..";
//	stringEquation[101] = "2(2x+3)+5(x+1)..";
//	stringEquation[136] = "11(x-7)-7(x+1)..";
//	stringEquation[137] = "3(x+5)=2(x-2)";
//	stringEquation[138] = "3(x+1)+2(2x-3)..";
//	stringEquation[105] = "8(x-2)=7(x+2)";
//	stringEquation[139] = "9(x-3)=7(x-1)";
//	stringEquation[140] = "8x-2(x+5)=20";
//	stringEquation[141] = "10(x-3)=9(x+2)";
//	stringEquation[142] = "8(x+4)=7(x-2)";
//	stringEquation[143] = "2(2x+7)+3(3x..";
//	stringEquation[144] = "4(x+1)=12";
//	stringEquation[145] = "9(x-3)+1=18";
//	stringEquation[146] = "5(3-x)=4x+18";
//	stringEquation[147] = "9x-3(2x+2)=15";
//	stringEquation[148] = "5(3-x)=2(x-4..";
//	stringEquation[149] = "3(2x-1)=-2(x..";
//	stringEquation[150] = "3(x-2)-5(x-1..";
//	stringEquation[151] = "4(x+10)-2(x-5..";
//	stringEquation[152] = "6(x-2)=-3(x+2)";
//	stringEquation[153] = "15+3(x+2)=-7..";
//	stringEquation[154] = "-5(-x-4)=-5";
//	stringEquation[155] = "2x-3=7-2(2x..";
//	stringEquation[156] = "-2(2x+1)-3(x..";
//	stringEquation[157] = "-5(x-1)-2(x+2..";
//	stringEquation[158] = "-3(x+4)+4(x-9..";
//	stringEquation[159] = "x-3(4-x)=7x..";
//	stringEquation[160] = "10+2(x-2)=5..";
//	stringEquation[180] = "2(9x-2)+3(2x..";
//	stringEquation[162] = "x+3(x-1)-2-3..";
//	stringEquation[163] = "6x-4(x-5)-3..";
//	stringEquation[166] = "7x+23-x=2x..";
//	stringEquation[167] = "7x-2(x+2)=10";
//	stringEquation[168] = "x+(x)/(4)=20";
//	stringEquation[169] = "x-(x)/(5)=10";
//	stringEquation[170] = "x+(x)/(6)=20";
//	stringEquation[171] = "(x)/(3)+(x)/(2)=15";
//	stringEquation[172] = "x-(x)/(2)=1";
//	stringEquation[173] = "(3x)/(2)-5x=-7";
//	stringEquation[174] = "(x)/(2)-(x)/(4)=12";
//	stringEquation[176] = "(3x)/(4)-(x)/(2)=-2";
//	stringEquation[177] = "(x)/(2)+(x)/(3)=1";
//	stringEquation[178] = "(x)/(2)+(x)/(7)=12";
//	stringEquation[187] = "3-2(x+3)=x-18";
//	stringEquation[188] = "3(x-4)=-1..";
//	stringEquation[189] = "50+(3x-4)=2..";
//	stringEquation[190] = "(x)/(2)+4x=15-(-x..";
//	stringEquation[191] = "2(2x-4)=5-((x)/(2)..";
//	stringEquation[192] = "4(2x-5)=3..";
//	stringEquation[193] = "(x)/(4)+2=(x-3)/(2)";
//	stringEquation[194] = "(4)/(5)+(x)/(2)=(x)/(3)-1";
//	stringEquation[195] = "x+3=2(x-(1)/(2))";
//	stringEquation[196] = "(3(x-4))/(8)-1=x..";
//	stringEquation[197] = "(x)/(3)+(x)/(2)=(7+x)/(3)";
//	stringEquation[198] = "(x-2)/(3)+2x=(5x)/2";
//	stringEquation[199] = "(x-5)/(3)+(3x-1)/(2)=4";
//	stringEquation[200] = "3(6x-8)+10=5..";
//	stringEquation[202] = "(x-1)/(5)=x-(2x-1)/(3)";
//	stringEquation[203] = "3x-2(x-5)..";
//	stringEquation[204] = "(x-1)/(2)+(x-3)/(3)=6";
//	stringEquation[205] = "(x-2)/(3)-(x+1)/(4)=4";
//	stringEquation[206] = "x-(2x-1)/(3)=(x-1)/(5)";
//	stringEquation[207] = "(x-3)/(7)=(x-1)/(4)";
//	stringEquation[208] = "(x+3)/(4)-5=x+1";
//	stringEquation[209] = "(2x)/(5)+(15x-1)/(20)=(1)/(3)";
//	stringEquation[210] = "x+7-x-2x=96..";
//	stringEquation[211] = "7x+23-x=2x..";
//	stringEquation[212] = "4(x-2)-2(x+1)..";
//	stringEquation[213] = "10(x+1)-6=2(x..";
//	stringEquation[214] = "3x-(x+1)-1..";
//	stringEquation[215] = "(x-3)/(3)+(3)/(2)=(4x)/(3)";
//	stringEquation[216] = "6x-4(x-5)-(5..";
//	stringEquation[217] = "2(x-2)+3(2x+2)..";
//	stringEquation[218] = "x-(x)/(3)=6+(x)/(2)";
//	stringEquation[219] = "10(x-6)=9(x+3)";
//	stringEquation[220] = "9-2(x+3)=x-18";
//	stringEquation[221] = "4(x-4)=-1..";
//	stringEquation[222] = "40+(3x-4)=2..";
//	stringEquation[223] = "5(2x-5)=3..";
//	stringEquation[224] = "2(6x-8)+10=3..";
//	stringEquation[225] = "3x+2(1-x)=10";
//	stringEquation[226] = "x-(3-x)=1";
//	stringEquation[227] = "x+3(x-1)-(x..";
//	stringEquation[228] = "10=3(x-2)-(x..";
//	stringEquation[229] = "2(7x-1)-3(4..";
//	stringEquation[230] = "(x)/(4)-2=(x-3)/(2)";
//	stringEquation[231] = "(4)/(5)+(x)/(2)=(x)/(3)-2";
//	stringEquation[232] = "(4x+16)/(4)-(x)/(2)=6+x";
//	stringEquation[233] = "(2x+4)/(5)-(x-10)/(6)=2";
//	stringEquation[234] = "(2x+9)/(7)-(x+1)/(4)=x+2";
//	stringEquation[235] = "(4x+9)/(9)-(x)/(15)=2x..";
//	stringEquation[236] = "x-(x)/(2)=2x+1";
//	stringEquation[237] = "(x)/(2)+(x-1)/(3)=3";
//	stringEquation[238] = "(x-2)/(4)+2x=(5x)/(2)";
//	stringEquation[239] = "(x)/(3)+(2x+2)/(4)=3x+7";
//	stringEquation[240] = "(x-1)/(7)-(2x+6)/(8)..";
//	stringEquation[241] = "2(2x-4)=5-((x)/(2)..";
//	stringEquation[243] = "(3(x-4))/(4)-1=x..";
//	stringEquation[244] = "4x-2(x-5)..";
//	stringEquation[245] = "(2x-1)/(4)-(x-1)/(3)..";
//	stringEquation[246] = "(x)/(2)-(x-1)/(3)+(17)/(12)..";
//	stringEquation[247] = "(2x-3)/(5)-(11-x)/(3)=(29)/(30)";
//	stringEquation[248] = "(x-1)/(2)+(x+1)/(3)=(2x+3)/(5)";
//	stringEquation[249] = "(3x+1)/(13)-(2-x)/(2)..";
//	stringEquation[250] = "(2x-1)/(3)-(5x-10)/(4)..";
//	stringEquation[251] = "x+8x-2x=81-2x";
//	stringEquation[252] = "7x+44-x=2x+20";
//	stringEquation[253] = "6x-2(x-3)-(12..";
//	stringEquation[254] = "10(x+1)-6=3..";
//	stringEquation[255] = "6(x-2)-2(x..";
//	stringEquation[256] = "6x-(x+1)-1..";
//	stringEquation[257] = "(x-1)/(2)=x-(2x-1)/(3)";
//	stringEquation[258] = "(x-2)/(3)-(x+1)/(4)=10";
//	stringEquation[259] = "(x-1)/(7)-(x+3)/(4)=1";
//	stringEquation[260] = "(x-3)/(5)=(x-1)/(4)";
//	stringEquation[261] = "(x+1)/(3)+(3x-1)/(2)..)";
//	stringEquation[262] = "(x)/(2)+4x=15-2..";
//	stringEquation[263] = "(1-x)/(2)=(x+1)/(2)+x";
//	stringEquation[264] = "(x)/(6)+(x)/(9)=(x-1)/(2)+2";
//	stringEquation[265] = "(x-3)/(3)-(3)/(2)=(4x)/(3)";
//	stringEquation[266] = "(x+3)/(2)+(x)/(3)=10";
//	stringEquation[267] = "(x+3)/(2)+(x+2)/(3)=12";
//	stringEquation[268] = "(x-1)/(2)=(x+1)/(3)";
//	stringEquation[269] = "(x-2)/(10)=(x-1)/(2)";
//	stringEquation[270] = "9-2(x+3)=x-18";
//	stringEquation[271] = "4(x-4)=-1..";
//	stringEquation[272] = "40+(3x-4)=2..";
//	stringEquation[273] = "5(2x-5)=3..";
//	stringEquation[274] = "2(6x-8)+10=3..";
//	stringEquation[275] = "3x+2(1-x)=10";
//	stringEquation[276] = "x-(3-x)=1";
//	stringEquation[277] = "x+3(x-1)-(x..";
//	stringEquation[278] = "10=3(x-2)-(x..";
//	stringEquation[279] = "(x)/(3)-(7)/(8)=(x)/(4)-1";
//	stringEquation[280] = "(3x-5)/(2)-(x-2)/(5)=7";
//	stringEquation[281] = "x-3=2(x-(1)/(2))";
//	stringEquation[282] = "(x+5)/(2)=(8+2x)/(5)";
//	stringEquation[283] = "(5x-10)/(2)=10-(5x-5)/(3)";
//	stringEquation[284] = "(x+3)/(8)=(5)/(4)";
//	stringEquation[285] = "(x)/(2)-5=x+(3)/(4)";
//	stringEquation[286] = "(5x-3)/(4)-(3x+8)/(2)..";
//	stringEquation[287] = "(x+4)/(5)-(x-10)/(6)=2";
//	stringEquation[288] = "(x-2)/(3)-(x+1)/(4)=4";
//	stringEquation[289] = "(2x-3)/(4)-(2-x)/(3)=(x-1)/(3)";
//	stringEquation[290] = "x-(x)/(2)=2x+(1)/(3)";
//	stringEquation[291] = "(x+2)/(2)-(2x-3)/(3)=(3x+1)/(4)";
//	stringEquation[292] = "(x-1)/(5)-(5-2x)/(3)=x";
//	stringEquation[293] = "4x-2(x-5)=-x-5";
//	stringEquation[294] = "4(2-x)-3(2x..";
//	stringEquation[295] = "5x-(x-2)=2..";
//	stringEquation[296] = "x+7x-5x=80-5x";
//	stringEquation[297] = "3(x-1)-9x-30..";
//	stringEquation[298] = "6(x-2)-(x+1)=40";
//	stringEquation[299] = "6x-(x+1)-1..";
//	stringEquation[300] = "(5x-1)/(10)-(1)/(2)=1-(2-x)/(5)";
//	stringEquation[301] = "x-(2x+1)/(3)=(x-2)/(2)";
//	stringEquation[302] = "(x-2)/(5)-(x+1)/(4)=10";
//	stringEquation[303] = "(x-2)/(4)+(1)/(3)=x-(2x-1)/(3)";
//	stringEquation[304] = "(x-2)/(5)=(x-1)/(4)";
//	stringEquation[305] = "(5-x)/(9)-(x-1)/(6)..";
//	stringEquation[306] = "(x-1)/(2)+(x+1)/(3)=(x+3)/(2)";
//	stringEquation[307] = "(2x+2)/(3)+(3x-5)/(2)=9";
//	stringEquation[308] = "1-(x-1)/(2)=x-(x+2)/(3)";
//	stringEquation[309] = "(x)/(2)+(x)/(3)=(7+2x)/(3)";
//	stringEquation[310] = "(3x-2)/(4)-(4-x)/(2)..";
//	stringEquation[311] = "(x-1)/(3)-(3)/(2)=(4x)/(3)";
//	stringEquation[312] = "(1+7x)/(7)-1=(3)/(7)..";
//	stringEquation[313] = "(30x)/(60)+x=225";
//	stringEquation[314] = "(35x)/(10)-3x=-(15)/(10)";
//	stringEquation[315] = "(25x)/(2)-(21x)/(2)=(17)/(5)";
//	stringEquation[316] = "6x-(5x)/(10)=110";
//	stringEquation[317] = "7x-(x)/(2)=26";
//	stringEquation[318] = "4x-10=(5x)/(10)+(75)/(10)";
//	stringEquation[319] = "(3)/(5)+x=(x+3)/(5)-(x-5)/(3)";
//	stringEquation[320] = "x+(3x-9)/(5)..";
//	stringEquation[321] = "11-(x+3)=x..";
//	stringEquation[322] = "4(5x-3)=1..";
//	stringEquation[323] = "9+2(x-4)=-1..";
//	stringEquation[324] = "4x=20-2(-x..";
//	stringEquation[325] = "9(x-4)=-2(x..";
//	stringEquation[326] = "4(2x-5)=10..";
//	stringEquation[327] = "6(x-3)-2(x+2)..";
//	stringEquation[328] = "10x=2(x-2)-(x..";
//	stringEquation[329] = "10-3(x-1)-(x..";
//	stringEquation[330] = "8x-(3-x)=-2..";
//	stringEquation[331] = "4x-2(1+x)=10..";
//	stringEquation[332] = "-4(3x-8)+10..";
//	stringEquation[333] = "(x-1)/(5)-(1-2x)/(2)=x";
//	stringEquation[334] = "(x-2)/(2)-(x-3)/(3)..";
//	stringEquation[335] = "2x-(x)/(2)=2x+(1)/(3)";
//	stringEquation[336] = "(x-3)/(4)-(2-x)/(3)..";
//	stringEquation[337] = "(3x-2)/(4)-(4-x)/(2)..";
//	stringEquation[338] = "(x-1)/(2)-(3x+2)/(5)=12";
//	stringEquation[339] = "(x-1)/(2)+(x+1)/(3)..";
//	stringEquation[340] = "(x)/(2)-(x)/(3)-(x)/(4)=14";
//	stringEquation[341] = "(3x+8)/(4)-4x=-11";
//	stringEquation[342] = "(x)/(5)+(x)/(7)=12";
//	stringEquation[343] = "(x+1)/(4)+(3x+1)/(2)=13";
//	stringEquation[344] = "(7x-2)/(2)-2x=10";
//	stringEquation[345] = "(x+2)/(2)+(x+1)/(3)=8";
//	stringEquation[346] = "x-3=4(x-(1)/(2))";
//
//}

//function getEquationsPlan ( ) {
//	equationPlan = new Array ( );	
//	equationPlan[9] = new EquationPlan (201, 2);
//	equationPlan[2] = new EquationPlan (13, 3);
//	equationPlan[3] = new EquationPlan (29, 4);
//	equationPlan[4] = new EquationPlan (58, 5);
//	equationPlan[5] = new EquationPlan (64, 6);
//	equationPlan[6] = new EquationPlan (121, 7);
//	equationPlan[7] = new EquationPlan (144, 8);
//	equationPlan[8] = new EquationPlan (168, 10);
//	equationPlan[10] = new EquationPlan (187, 11);
//	equationPlan[11] = new EquationPlan (202, 12);
//	equationPlan[12] = new EquationPlan (220, 13);
//	equationPlan[13] = new EquationPlan (230, 14);
//	equationPlan[14] = new EquationPlan (241, 15);
//	equationPlan[15] = new EquationPlan (251, 16);
//	equationPlan[16] = new EquationPlan (257, 17);
//	equationPlan[17] = new EquationPlan (270, 18);
//	equationPlan[18] = new EquationPlan (279, 19);
//	equationPlan[19] = new EquationPlan (293, 20);
//	equationPlan[19] = new EquationPlan (300, 21);
//	equationPlan[19] = new EquationPlan (313, null);
//}

