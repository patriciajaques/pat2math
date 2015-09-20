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

	return length;
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
//	if (id === 9 || numUnlockedPlans >= id) {
	var open = $("#tasks"+id).css("display");
	tasksRemaining=0;
	if(open == 'none') {	
		$.ajax({
			type: "GET",
			url: appContext + "student/showTopic",
			data: {"idSet" : id}, 
			success:
				function(data) {
					$("#tasks" + id).html(data);
					$("#tasks" + id).slideDown(700);				
					tasksRemaining=$(".task").length;
					
					if (id !== 9) {
					    var firstEquation = firstEquations[id];
					    getResolution (firstEquation);
					}
					
					planoAtual=id;
					
					$(".task").each(
						function() {
							var text = $(this).html();
							
//							if (text.indexOf ("5*(2x") !== -1 || text.indexOf("2*(x") !== -1) {
//								var eq;
//								
//								if (text.indexOf ("5*(2x") !== -1) 
//									eq = "5(2x+7)-1=4..";
//		
//								else 
//									eq = "2(x-1)+3(x+1)..";
//								
//								var temp = textToMathml (eq);
//								var equation = "<math>" + temp[0];
//								
//								for (var i = 1; i < temp.length; i++)
//									equation += temp[i];
//								
//								equation += "</math>..";
//								
//								$(this).html (equation);
//							}
							
						}
					);
					
//					$(".task").each(
//							function() {
//								var text = $(this).html();
//								
//								if(text.length > 30) {
//									$(this).html($(this).html().substring(0, 23) + "...");
//								}
//							}
//						);
					resetProgressBar();
					//here tasksremaining contains the number of equations
					progressvalue=100/tasksRemaining;
					progressvalue=Math.trunc(progressvalue);
					/*alert("inicio: "+tasksRemaining);*/
					var taskSolved=$(".icon-ok.icon-white").length;
					/*alert("fim: "+taskSolved);*/
					tasksRemaining=tasksRemaining-taskSolved;
					/*alert("fim: "+tasksRemaining);*/
					if (tasksRemaining===0)addProgressValue(100);
					else addProgressValue(progressvalue*taskSolved);
			  	},
			 error:
				 function(XMLHttpRequest, textStatus, errorThrown) {
			     	alert("Perdão, obtivemos um erro ao processar esta ação.");
			 }
		});
		
//		checkEquationTour();
		
		if (isTourInterativo && id === 2) 
			classPlan("");
		
		
	} else {
		$("#tasks"+id).slideUp(700);
	    var cookieName = "currentPlan" + currentPos;
		setCookieDays (cookieName, "", 0);

	}
	
//	}
	var cookieName = "currentPlan" + currentPos;
	setCookieDays (cookieName, id, 1);
}

function padlockClick ( ) {
	if (selectedEquation !== null)
		moveHint();

	$("#hintText").html("Para desbloquear este plano de aula, você deve resolver todas as equações do plano anterior.");
	$("#hintText").show('blind', 500);
	$(".verticalTape").show('fold', 500);
}

function loadExercise(id) {	
//	setCurrentEquation (id);	
	loadingShow();
	
	var cookieName = "linesHeight" + currentPos + "" + id;
	
	if (getCookie (cookieName) !== "")
		insertLines(true, id);
	
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
				equation = new Equation(data.equation, 100);
				equation.id = data.id;
				for(var j = 0; j < data.steps.length; j++) {
					equation.steps[j] = new Step(data.steps[j], 0);
				}
					
				idEquation=id;
				
				if(data.performed) {
					equation.isComplete = true;
					
					if (isWorkedExample) {
					    isWorkedExample = false;
					    $("#workedExamplesBlock").hide();
					    var cookieName = "regraWE" + currentPos;
					    setCookieDays (cookieName, "", 0);	
					}
					
					if (isTourInterativo == false)
					    setTimeout(function(){ $("#topics").fadeIn(); blockMenu = true; }, 2000);
				}
				
				newEquations[0] = equation;
			}
			reloadPaper(1);
			
			
			var cookieName = "currentEquation" + currentPos;
			setCookieDays (cookieName, idEquation, 1);
			cookieName = "isWorkedExample" + currentPos;
			
			if (enableWorkedExample) {
			    if (idEquation === 29 || idEquation === 58 || idEquation === 64 || idEquation === 121 || idEquation === 144 || idEquation === 168 || idEquation === 187 || idEquation === 202 || idEquation === 220 || idEquation === 230 || idEquation === 241 || idEquation === 257) {
        	        setCookieDays (cookieName, "true", 1);   
        	        isWorkedExample = true;
        	        $("#workedExamplesBlock").show();
        	    
        	        var play = document.getElementById ('button');
        	        play.style.width = '25px';
        	    	play.style.height = '25px';
        	        play.style.background = 'url("/pat2math/patequation/img/play_25x25.png")';
        	        
        	        if (selectedEquation.lastStep !== null)
        	    	    requestStep (selectedEquation.lastStep.step);
        	    
        	        else
        	            requestStep (selectedEquation.equation);
        	        
        	       // idEquation === 29 && 
        	        if (selectedEquation.isComplete === false) { 
        	        	var cookieName = "showTutorial" + currentPos;
        	        	
        	        	if (getCookie (cookieName) === "")
        	        	    tutorialWorkedExamples();
        	        	
        	        	else if (getCookie (cookieName) === "1")
        	        		finishTutorial();
        	        }
        	        
        	        else if (showPlan2Explanation !== "false" && idEquation >= 29 && idEquation <= 49) {
                    	plan2();
                        var cookieName = "splan2" + currentPos;
                        setCookieDays (cookieName, "false", 7);                    
                    }
		    	}
			
			    else {
			    	if (showPlan2Explanation !== "false" && idEquation >= 29 && idEquation <= 49) {
                    	plan2();
                        var cookieName = "splan2" + currentPos;
                        setCookieDays (cookieName, "false", 7);                
                    }
			    	
			    	setCookieDays (cookieName, "", 0); 
			    	
			    	if (isWorkedExample) {
					    isWorkedExample = false;
					    $("#workedExamplesBlock").hide();
					    cookieName = "regraWE" + currentPos;
					    setCookieDays (cookieName, "", 0);	
					}
			    }
			}
			
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
	
	if (isTourInterativo && id !== 201)
		clickEquation("");
		
	else
		blockMenu = false;
	
	setTimeout ('calculateUsedLines()', 1000);
	loadingHide();	
	
	
}

function loadNextExercise(id) {	
	if (isTourInterativo)
		blockMenu = false;
	$.ajax({
		type: 'GET',
		url: appContext + "student/loadExercise",
		data: {"exerciseId" : id},
		dataType: 'json',
		success: function(data) {
			if(data != null) {
				equation = new Equation(data.equation, 100);
				equation.id = data.id;
				for(var j = 0; j < data.steps.length; j++) {
					equation.steps[j] = new Step(data.steps[j], 0);
				}
					
				idEquation=id;
				
				if(data.performed) {
					nextEquationClick();
					return;				
				}				
				
				newEquations[0] = equation;
			}
			reloadPaper(1);
					
			var cookieName = "currentEquation" + currentPos;
			setCookieDays (cookieName, idEquation, 1);
			cookieName = "isWorkedExample" + currentPos;
		}
	});
	
	
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
					
					if (isWorkedExample) {
					    isWorkedExample = false;
					    $("#workedExamplesBlock").hide();
					    var cookieName = "regraWE" + currentPos;
					    setCookieDays (cookieName, "", 0);	
					}
					
					if (isTourInterativo == false)
					    setTimeout(function(){ $("#topics").fadeIn(); blockMenu = true; }, 2000);
				}
				newEquations[0] = equation;
			}
			reloadPaper(1);
			idEquation=id;
			
			var cookieName = "currentEquation" + currentPos;
			setCookieDays (cookieName, idEquation, 1);
            cookieName = "isWorkedExample" + currentPos;
            
            if (enableWorkedExample) {
			    if (idEquation === 29 || idEquation === 58 || idEquation === 64 || idEquation === 121 || idEquation === 144 || idEquation === 168 || idEquation === 187 || idEquation === 202 || idEquation === 220 || idEquation === 230 || idEquation === 241 || idEquation === 257) {
        	        setCookieDays (cookieName, "true", 1);   
        	        isWorkedExample = true;
        	        $("#workedExamplesBlock").show();
        	    
        	        var play = document.getElementById ('button');
        	        play.style.width = '25px';
        	    	play.style.height = '25px';
        	        play.style.background = 'url("/pat2math/patequation/img/play_25x25.png")';
        	        
        	        if (selectedEquation.lastStep !== null)
        	    	    requestStep (selectedEquation.lastStep.step);
        	    
        	        else
        	            requestStep (selectedEquation.equation);
        	        
        	        if (idEquation === 29) {
        	        	var cookieName = "showTutorial" + currentPos;
        	        	
        	        	if (getCookie (cookieName) === "")
        	        	    tutorialWorkedExamples();
        	        	
        	        	else if (getCookie (cookieName) === "1")
        	        		finishTutorial();
        	        }
        	        
        	        else if (showPlan2Explanation !== "false" && idEquation >= 29 && idEquation <= 49) {
                    	plan2();
                        var cookieName = "splan2" + currentPos;
                        setCookieDays (cookieName, "false", 7);                      
                    }
		    	}
			
			    else {
			    	if (showPlan2Explanation !== "false" && idEquation >= 29 && idEquation <= 49) {
                    	plan2();
                        var cookieName = "splan2" + currentPos;
                        setCookieDays (cookieName, "false", 7);                
                    }
			    	
				    setCookieDays (cookieName, "", 0); 
				    
				    if (isWorkedExample) {
					    isWorkedExample = false;
					    $("#workedExamplesBlock").hide();
					    cookieName = "regraWE" + currentPos;
					    setCookieDays (cookieName, "", 0);	
					}
				    
				    
			    }
			}
            
            
			
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
	
	if (isTourInterativo && id !== 201)
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


function nextEquationClick ( ) {
	//Os ids das equações estão na posição correspondente no array ordenado.
    //Por exemplo, o id 42 está na posição 42, o 100 na posição 100, e assim por diante.
	
	//Posição da próxima equação. Ela é obtida da seguinte forma:
	//Seleciona a equação atual no array ordenado, e verifica a sua posição no array original. 
	//Esta variável recebe a posição seguinte da equação no array original.	
	
	if (idEquation < 29 || (idEquation > 49 && idEquation < 144) || idEquation === 160 || idEquation === 180) {
		var newPos = sortedIds[idEquation].pos + 1;
		loadNextExercise (ids[newPos]);
		loadEquation (0);
		//pos++; //Avança uma posição do array ordenado
	}
	
	else {
		loadNextExercise (idEquation + 1);
		loadEquation (0);
	}
	
}

//Array original das equações
var ids = [13, 14, 15, 16, 107, 108, 109, 110, 21, 22, 23, 24, 25, 26,
           29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
           58, 59, 60, 61, 62, 55, 56, 57, 63,
           64, 65, 111, 67, 68, 112, 70, 71, 72, 113, 114, 115, 116, 117, 80, 81, 118, 119, 83, 84, 120,
           121, 122, 123, 125, 126, 127, 128, 129, 130, 131, 132, 124, 125, 126, 135, 101, 136, 137, 138, 105, 139, 140, 141, 142, 143,
           144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 180, 162, 163, 166, 167,
           168, 169, 170, 171, 172, 173, 174, 176, 177, 178,
           187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200,
           202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219,
           220, 221, 222, 223, 224, 225, 226, 227, 228, 229,
           230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240,
           241, 242, 243, 244, 245, 246, 247, 248, 249, 250,
           251, 252, 253, 254, 255, 256,
           257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269,
           270, 271, 272, 273, 274, 275, 276, 277, 278,
           279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292,
           293, 294, 295, 296, 297, 298, 299,
           300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312,
           313, 314, 315, 316, 317, 318, 319, 320];
 



//Arrays originais das equações
//ids00 = [13, 14, 15, 16, 107, 108, 109, 110, 21, 22, 23, 24, 25, 26];
//ids01 = [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
//ids02 = [58, 59, 60, 61, 62, 55, 56, 57, 63];
//ids03 = [64, 65, 111, 67, 68, 112, 70, 71, 72, 113, 114, 115, 116, 117, 80, 81, 118, 119, 83, 84, 120];
//ids04 = [121, 122, 123, 125, 126, 127, 128, 129, 130, 131, 132, 124, 125, 126, 135, 101, 136, 137, 138, 105, 139, 140, 141, 142, 143];
//ids05 = [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 180, 162];
//ids06 = [168, 169, 170, 171, 172, 173, 174, 176, 177, 178];
//ids07 = [187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200];

function getSortedIds ( ) {
	sortedIds = new Array ( );
	sortedIds[13] = new EquationId (13, 0, 2);
	sortedIds[14] = new EquationId (14, 1, 2);
	sortedIds[15] = new EquationId (15, 2, 2);
	sortedIds[16] = new EquationId (16, 3, 2);
	sortedIds[21] = new EquationId (21, 8, 2);
	sortedIds[22] = new EquationId (22, 9, 2);
	sortedIds[23] = new EquationId (23, 10, 2);
	sortedIds[24] = new EquationId (24, 11, 2);
	sortedIds[25] = new EquationId (25, 12, 2);
	sortedIds[26] = new EquationId (26, 13, 2);
	sortedIds[29] = new EquationId (29, 14, 3);
	sortedIds[30] = new EquationId (30, 15, 3);
	sortedIds[31] = new EquationId (31, 16, 3);
	sortedIds[32] = new EquationId (32, 17, 3);
	sortedIds[33] = new EquationId (33, 18, 3);
	sortedIds[34] = new EquationId (34, 19, 3);
	sortedIds[35] = new EquationId (35, 20, 3);
	sortedIds[36] = new EquationId (36, 21, 3);
	sortedIds[37] = new EquationId (37, 22, 3);
	sortedIds[38] = new EquationId (38, 23, 3);
	sortedIds[39] = new EquationId (39, 24, 3);
	sortedIds[40] = new EquationId (40, 25, 3);
	sortedIds[41] = new EquationId (41, 26, 3);
	sortedIds[42] = new EquationId (42, 27, 3);
	sortedIds[43] = new EquationId (43, 28, 3);
	sortedIds[44] = new EquationId (44, 29, 3);
	sortedIds[45] = new EquationId (45, 30, 3);
	sortedIds[46] = new EquationId (46, 31, 3);
	sortedIds[47] = new EquationId (47, 32, 3);
	sortedIds[48] = new EquationId (48, 33, 3);
	sortedIds[49] = new EquationId (49, 34, 3);
	sortedIds[55] = new EquationId (55, 40, 4);
	sortedIds[56] = new EquationId (56, 41, 4);
	sortedIds[57] = new EquationId (57, 42, 4);
	sortedIds[58] = new EquationId (58, 35, 4);
	sortedIds[59] = new EquationId (59, 36, 4);
	sortedIds[60] = new EquationId (60, 37, 4);
	sortedIds[61] = new EquationId (61, 38, 4);
	sortedIds[62] = new EquationId (62, 39, 4);
	sortedIds[63] = new EquationId (63, 43, 4);
	sortedIds[64] = new EquationId (64, 44, 5);
	sortedIds[65] = new EquationId (65, 45, 5);
	sortedIds[67] = new EquationId (67, 47, 5);
	sortedIds[68] = new EquationId (68, 48, 5);
	sortedIds[70] = new EquationId (70, 50, 5);
	sortedIds[71] = new EquationId (71, 51, 5);
	sortedIds[72] = new EquationId (72, 52, 5);
	sortedIds[80] = new EquationId (80, 58, 5);
	sortedIds[81] = new EquationId (81, 59, 5);
	sortedIds[83] = new EquationId (83, 62, 5);
	sortedIds[84] = new EquationId (84, 63, 5);
	sortedIds[101] = new EquationId (101, 80, 6);
	sortedIds[105] = new EquationId (105, 84, 6);
	sortedIds[107] = new EquationId (107, 4, 2);
	sortedIds[108] = new EquationId (108, 5, 2);
	sortedIds[109] = new EquationId (109, 6, 2);
	sortedIds[110] = new EquationId (110, 7, 2);
	sortedIds[111] = new EquationId (111, 46, 5);
	sortedIds[112] = new EquationId (112, 49, 5);
	sortedIds[113] = new EquationId (113, 53, 5);
	sortedIds[114] = new EquationId (114, 54, 5);
	sortedIds[115] = new EquationId (115, 55, 5);
	sortedIds[116] = new EquationId (116, 56, 5);
	sortedIds[117] = new EquationId (117, 57, 5);
	sortedIds[118] = new EquationId (118, 60, 5);
	sortedIds[119] = new EquationId (119, 61, 5);
	sortedIds[120] = new EquationId (120, 64, 5);
	sortedIds[121] = new EquationId (121, 65, 6);
	sortedIds[122] = new EquationId (122, 66, 6);
	sortedIds[123] = new EquationId (123, 67, 6);
	sortedIds[124] = new EquationId (124, 76, 6);
	sortedIds[125] = new EquationId (125, 68, 6);
	sortedIds[126] = new EquationId (126, 69, 6);
	sortedIds[127] = new EquationId (127, 70, 6);
	sortedIds[128] = new EquationId (128, 71, 6);
	sortedIds[129] = new EquationId (129, 72, 6);
	sortedIds[130] = new EquationId (130, 73, 6);
	sortedIds[131] = new EquationId (131, 74, 6);
	sortedIds[132] = new EquationId (132, 75, 6);
	sortedIds[135] = new EquationId (135, 79, 6);
	sortedIds[136] = new EquationId (136, 81, 6);
	sortedIds[137] = new EquationId (137, 82, 6);
	sortedIds[138] = new EquationId (138, 83, 6);
	sortedIds[139] = new EquationId (139, 85, 6);
	sortedIds[140] = new EquationId (140, 86, 6);
	sortedIds[141] = new EquationId (141, 87, 6);
	sortedIds[142] = new EquationId (142, 88, 6);
	sortedIds[143] = new EquationId (143, 89, 6);
	sortedIds[144] = new EquationId (144, 90, 7);
	sortedIds[145] = new EquationId (145, 91, 7);
	sortedIds[146] = new EquationId (146, 92, 7);
	sortedIds[147] = new EquationId (147, 93, 7);
	sortedIds[148] = new EquationId (148, 94, 7);
	sortedIds[149] = new EquationId (149, 95, 7);
	sortedIds[150] = new EquationId (150, 96, 7);
	sortedIds[151] = new EquationId (151, 97, 7);
	sortedIds[152] = new EquationId (152, 98, 7);
	sortedIds[153] = new EquationId (153, 99, 7);
	sortedIds[154] = new EquationId (154, 100, 7);
	sortedIds[155] = new EquationId (155, 101, 7);
	sortedIds[156] = new EquationId (156, 102, 7);
	sortedIds[157] = new EquationId (157, 103, 7);
	sortedIds[158] = new EquationId (158, 104, 7);
	sortedIds[159] = new EquationId (159, 105, 7);
	sortedIds[160] = new EquationId (160, 106, 7);
	sortedIds[162] = new EquationId (162, 108, 7);
	sortedIds[163] = new EquationId (163, 109, 7);
	sortedIds[166] = new EquationId (166, 110, 7);
	sortedIds[167] = new EquationId (167, 111, 7);
	sortedIds[168] = new EquationId (168, 112, 8);
	sortedIds[169] = new EquationId (169, 113, 8);
	sortedIds[170] = new EquationId (170, 114, 8);
	sortedIds[171] = new EquationId (171, 115, 8);
	sortedIds[172] = new EquationId (172, 116, 8);
	sortedIds[173] = new EquationId (173, 117, 8);
	sortedIds[174] = new EquationId (174, 118, 8);
	sortedIds[176] = new EquationId (176, 119, 8);
	sortedIds[177] = new EquationId (177, 120, 8);
	sortedIds[178] = new EquationId (178, 121, 8);
	sortedIds[180] = new EquationId (180, 107, 7);
	sortedIds[187] = new EquationId (187, 122, 10);
	sortedIds[188] = new EquationId (188, 123, 10);
	sortedIds[189] = new EquationId (189, 124, 10);
	sortedIds[190] = new EquationId (190, 125, 10);
	sortedIds[191] = new EquationId (191, 126, 10);
	sortedIds[192] = new EquationId (192, 127, 10);
	sortedIds[193] = new EquationId (193, 128, 10);
	sortedIds[194] = new EquationId (194, 129, 10);
	sortedIds[195] = new EquationId (195, 130, 10);
	sortedIds[196] = new EquationId (196, 131, 10);
	sortedIds[197] = new EquationId (197, 132, 10);
	sortedIds[198] = new EquationId (198, 133, 10);
	sortedIds[199] = new EquationId (199, 134, 10);
	sortedIds[200] = new EquationId (200, 135, 10);
	sortedIds[201] = new EquationId (201, 0, 9);
	sortedIds[202] = new EquationId (202, 136, 11);
	sortedIds[203] = new EquationId (203, 137, 11);
	sortedIds[204] = new EquationId (204, 138, 11);
	sortedIds[205] = new EquationId (205, 139, 11);
	sortedIds[206] = new EquationId (206, 140, 11);
	sortedIds[207] = new EquationId (207, 141, 11);
	sortedIds[208] = new EquationId (208, 142, 11);
	sortedIds[209] = new EquationId (209, 143, 11);
	sortedIds[210] = new EquationId (210, 144, 11);
	sortedIds[211] = new EquationId (211, 145, 11);
	sortedIds[212] = new EquationId (212, 146, 11);
	sortedIds[213] = new EquationId (213, 147, 11);
	sortedIds[214] = new EquationId (214, 148, 11);
	sortedIds[215] = new EquationId (215, 149, 11);
	sortedIds[216] = new EquationId (216, 150, 11);
	sortedIds[217] = new EquationId (217, 151, 11);
	sortedIds[218] = new EquationId (218, 152, 11);
	sortedIds[219] = new EquationId (219, 153, 11);
	sortedIds[220] = new EquationId (220, 154, 12);
	sortedIds[221] = new EquationId (221, 155, 12);
	sortedIds[222] = new EquationId (222, 156, 12);
	sortedIds[223] = new EquationId (223, 157, 12);
	sortedIds[224] = new EquationId (224, 158, 12);
	sortedIds[225] = new EquationId (225, 159, 12);
	sortedIds[226] = new EquationId (226, 160, 12);
	sortedIds[227] = new EquationId (227, 161, 12);
	sortedIds[228] = new EquationId (228, 162, 12);
	sortedIds[229] = new EquationId (229, 163, 12);
	sortedIds[230] = new EquationId (230, 164, 13);
	sortedIds[231] = new EquationId (231, 165, 13);
	sortedIds[232] = new EquationId (232, 166, 13);
	sortedIds[233] = new EquationId (233, 167, 13);
	sortedIds[234] = new EquationId (234, 168, 13);
	sortedIds[235] = new EquationId (235, 169, 13);
	sortedIds[236] = new EquationId (236, 170, 13);
	sortedIds[237] = new EquationId (237, 171, 13);
	sortedIds[238] = new EquationId (238, 172, 13);
	sortedIds[239] = new EquationId (239, 173, 13);
	sortedIds[240] = new EquationId (240, 174, 13);
	sortedIds[241] = new EquationId (241, 175, 14);
	sortedIds[242] = new EquationId (242, 176, 14);
	sortedIds[243] = new EquationId (243, 177, 14);
	sortedIds[244] = new EquationId (244, 178, 14);
	sortedIds[245] = new EquationId (245, 179, 14);
	sortedIds[246] = new EquationId (246, 180, 14);
	sortedIds[247] = new EquationId (247, 181, 14);
	sortedIds[248] = new EquationId (248, 182, 14);
	sortedIds[249] = new EquationId (249, 183, 14);
	sortedIds[250] = new EquationId (250, 184, 14);
	sortedIds[251] = new EquationId (251, 185, 15);
	sortedIds[252] = new EquationId (252, 186, 15);
	sortedIds[253] = new EquationId (253, 187, 15);
	sortedIds[254] = new EquationId (254, 188, 15);
	sortedIds[255] = new EquationId (255, 189, 15);
	sortedIds[256] = new EquationId (256, 190, 15);
	sortedIds[257] = new EquationId (257, 191, 16);
	sortedIds[258] = new EquationId (258, 192, 16);
	sortedIds[259] = new EquationId (259, 193, 16);
	sortedIds[260] = new EquationId (260, 194, 16);
	sortedIds[261] = new EquationId (261, 195, 16);
	sortedIds[262] = new EquationId (262, 196, 16);
	sortedIds[263] = new EquationId (263, 197, 16);
	sortedIds[264] = new EquationId (264, 198, 16);
	sortedIds[265] = new EquationId (265, 199, 16);
	sortedIds[266] = new EquationId (266, 200, 16);
	sortedIds[267] = new EquationId (267, 201, 16);
	sortedIds[268] = new EquationId (268, 202, 16);
	sortedIds[269] = new EquationId (269, 203, 16);
	sortedIds[270] = new EquationId (270, 204, 17);
	sortedIds[271] = new EquationId (271, 205, 17);
	sortedIds[272] = new EquationId (272, 206, 17);
	sortedIds[273] = new EquationId (273, 207, 17);
	sortedIds[274] = new EquationId (274, 208, 17);
	sortedIds[275] = new EquationId (275, 209, 17);
	sortedIds[276] = new EquationId (276, 210, 17);
	sortedIds[277] = new EquationId (277, 211, 17);
	sortedIds[278] = new EquationId (278, 212, 17);
	sortedIds[279] = new EquationId (279, 213, 18);
	sortedIds[280] = new EquationId (280, 214, 18);
	sortedIds[281] = new EquationId (281, 215, 18);
	sortedIds[282] = new EquationId (282, 216, 18);
	sortedIds[283] = new EquationId (283, 217, 18);
	sortedIds[284] = new EquationId (284, 218, 18);
	sortedIds[285] = new EquationId (285, 219, 18);
	sortedIds[286] = new EquationId (286, 220, 18);
	sortedIds[287] = new EquationId (287, 221, 18);
	sortedIds[288] = new EquationId (288, 222, 18);
	sortedIds[289] = new EquationId (289, 223, 18);
	sortedIds[290] = new EquationId (290, 224, 18);
	sortedIds[291] = new EquationId (291, 225, 18);
	sortedIds[292] = new EquationId (292, 226, 18);
	sortedIds[293] = new EquationId (293, 227, 19);
	sortedIds[294] = new EquationId (294, 228, 19);
	sortedIds[295] = new EquationId (295, 229, 19);
	sortedIds[296] = new EquationId (296, 230, 19);
	sortedIds[297] = new EquationId (297, 231, 19);
	sortedIds[298] = new EquationId (298, 232, 19);
	sortedIds[299] = new EquationId (299, 233, 19);
	sortedIds[300] = new EquationId (300, 234, 20);
	sortedIds[301] = new EquationId (301, 235, 20);
	sortedIds[302] = new EquationId (302, 236, 20);
	sortedIds[303] = new EquationId (303, 237, 20);
	sortedIds[304] = new EquationId (304, 238, 20);
	sortedIds[305] = new EquationId (305, 239, 20);
	sortedIds[306] = new EquationId (306, 240, 20);
	sortedIds[307] = new EquationId (307, 241, 20);
	sortedIds[308] = new EquationId (308, 242, 20);
	sortedIds[309] = new EquationId (309, 243, 20);
	sortedIds[310] = new EquationId (310, 244, 20);
	sortedIds[311] = new EquationId (311, 245, 20);
	sortedIds[312] = new EquationId (312, 246, 20);
	sortedIds[313] = new EquationId (313, 247, 21);
	sortedIds[314] = new EquationId (314, 248, 21);
	sortedIds[315] = new EquationId (315, 249, 21);
	sortedIds[316] = new EquationId (316, 250, 21);
	sortedIds[317] = new EquationId (317, 251, 21);
	sortedIds[318] = new EquationId (318, 252, 21);
	sortedIds[319] = new EquationId (319, 253, 21);
	sortedIds[320] = new EquationId (320, 254, 21);

}

//function getFirstEquations ( ) {
//	firstEquations = new Array ( );
//	firstEquations[2] = "x+4=10";
//	firstEquations[3] = "4x=-28";
//	firstEquations[4] = "(x)/(2)=12";
//	firstEquations[5] = "3x+10=91";
//	firstEquations[6] = "3*(2x-1)=2*(x+1)+3";
//	firstEquations[7] = "4*(x+1)=12";
//	firstEquations[8] = "x+(x)/(4)=20";
//	firstEquations[10] = "3-2*(x+3)=x-18";
//	firstEquations[11] = "(x-1)/(5)=x-(2x-1)/(3)";
//}

function getStringEquations ( ) {
	stringEquation = new Array ( );
	stringEquation[201] = "x+15=45-2x";
	stringEquation[13] = "x+4=10";
	stringEquation[14] = "x+1=23";
	stringEquation[15] = "x+5=34";
	stringEquation[16] = "x+8=12";
	stringEquation[107] = "x-1=11";
	stringEquation[108] = "x-6=12";
	stringEquation[109] = "x-9=30";
	stringEquation[110] = "x-8=19";
	stringEquation[21] = "10+x=56";
	stringEquation[22] = "18+x=20";
	stringEquation[23] = "15+x=21";
	stringEquation[24] = "120+x=220";
	stringEquation[25] = "100+x=300";
	stringEquation[26] = "99+x=180";
	stringEquation[29] = "4x=-28";
	stringEquation[30] = "9x=18";
	stringEquation[31] = "4x=-16";
	stringEquation[32] = "5x=-20";
	stringEquation[33] = "12x=6";
	stringEquation[34] = "18x=9";
	stringEquation[35] = "7x=-21";
	stringEquation[36] = "8x=0";
	stringEquation[37] = "8x=32";
	stringEquation[38] = "48x=12";
	stringEquation[39] = "35x=-70";
	stringEquation[40] = "6x=32";
	stringEquation[41] = "8x=10";
	stringEquation[42] = "5x=-100";
	stringEquation[43] = "32x=-8";
	stringEquation[44] = "-7x=-42";
	stringEquation[45] = "-8x=-24";
	stringEquation[46] = "-20x=-4";
	stringEquation[47] = "-60=-2x";
	stringEquation[48] = "45=-5x";
	stringEquation[49] = "90=2x";
	stringEquation[58] = "(x)/(2)=12";
	stringEquation[59] = "(x)/(2)=8";
	stringEquation[60] = "(x)/(2)=-5";
	stringEquation[61] = "(x)/(3)=9";
	stringEquation[62] = "(x)/(4)=-5";
	stringEquation[55] = "(3x)/(4)=9";
	stringEquation[56] = "(2x)/(5)=-4";
	stringEquation[57] = "(2x)/(3)=-10";
	stringEquation[63] = "(x)/(4)=-30";
	stringEquation[64] = "3x+10=91";
	stringEquation[65] = "4x+7=x+25";
	stringEquation[111] = "6x-19=71";
	stringEquation[67] = "2x+3=9";
	stringEquation[68] = "5x+10=50";
	stringEquation[112] = "6x-1=11";
	stringEquation[70] = "7x-1=13";
	stringEquation[71] = "2x+5=27";
	stringEquation[72] = "7x+1=6x+6";
	stringEquation[113] = "4x-7=3x+9";
	stringEquation[114] = "4x-8=2x+6";
	stringEquation[115] = "5x-3=2x-9";
	stringEquation[116] = "2x-20=x+80";
	stringEquation[117] = "9x-10=170";
	stringEquation[80] = "5x-10=70";
	stringEquation[81] = "6x=2x+28";
	stringEquation[118] = "5x-2=18+3x";
	stringEquation[119] = "6x-10=2x+14";
	stringEquation[83] = "4x+8=2x+12";
	stringEquation[84] = "9x+10=8x-7";
	stringEquation[120] = "5x-18=4x+30";
	stringEquation[121] = "3(2x-1)=2(x+1..";
	stringEquation[122] = "3(x+3)-1=2";
	stringEquation[123] = "3(x+2)=2(x-7)";
	stringEquation[125] = "5(2x+7)-1=4..";
	stringEquation[126] = "2(x-1)+3(x+1)..";
	stringEquation[127] = "2(x+1)+5(x-1)..";
	stringEquation[128] = "8(x-1)=7(x+2)";
	stringEquation[129] = "9(x+1)=8(x-2)";
	stringEquation[130] = "7(x-1)=6(x-1)";
	stringEquation[131] = "5(x+2)=4(x-1)";
	stringEquation[132] = "5(x-2)=4(x+3)";
	stringEquation[124] = "3(x+2)-1=2..";
	stringEquation[135] = "3(x-1)+5(x-1)..";
	stringEquation[101] = "2(2x+3)+5(x+1)..";
	stringEquation[136] = "11(x-7)-7(x+1)..";
	stringEquation[137] = "3(x+5)=2(x-2)";
	stringEquation[138] = "3(x+1)+2(2x-3)..";
	stringEquation[105] = "8(x-2)=7(x+2)";
	stringEquation[139] = "9(x-3)=7(x-1)";
	stringEquation[140] = "8x-2(x+5)=20";
	stringEquation[141] = "10(x-3)=9(x+2)";
	stringEquation[142] = "8(x+4)=7(x-2)";
	stringEquation[143] = "2(2x+7)+3(3x..";
	stringEquation[144] = "4(x+1)=12";
	stringEquation[145] = "9(x-3)+1=18";
	stringEquation[146] = "5(3-x)=4x+18";
	stringEquation[147] = "9x-3(2x+2)=15";
	stringEquation[148] = "5(3-x)=2(x-4..";
	stringEquation[149] = "3(2x-1)=-2(x..";
	stringEquation[150] = "3(x-2)-5(x-1..";
	stringEquation[151] = "4(x+10)-2(x-5..";
	stringEquation[152] = "6(x-2)=-3(x+2)";
	stringEquation[153] = "15+3(x+2)=-7..";
	stringEquation[154] = "-5(-x-4)=-5";
	stringEquation[155] = "2x-3=7-2(2x..";
	stringEquation[156] = "-2(2x+1)-3(x..";
	stringEquation[157] = "-5(x-1)-2(x+2..";
	stringEquation[158] = "-3(x+4)+4(x-9..";
	stringEquation[159] = "x-3(4-x)=7x..";
	stringEquation[160] = "10+2(x-2)=5..";
	stringEquation[180] = "2(9x-2)+3(2x..";
	stringEquation[162] = "x+3(x-1)-2-3..";
	stringEquation[163] = "6x-4(x-5)-3..";
	stringEquation[166] = "7x+23-x=2x..";
	stringEquation[167] = "7x-2(x+2)=10";
	stringEquation[168] = "x+(x)/(4)=20";
	stringEquation[169] = "x-(x)/(5)=10";
	stringEquation[170] = "x+(x)/(6)=20";
	stringEquation[171] = "(x)/(3)+(x)/(2)=15";
	stringEquation[172] = "x-(x)/(2)=1";
	stringEquation[173] = "(3x)/(2)-5x=-7";
	stringEquation[174] = "(x)/(2)-(x)/(4)=12";
	stringEquation[176] = "(3x)/(4)-(x)/(2)=-2";
	stringEquation[177] = "(x)/(2)+(x)/(3)=1";
	stringEquation[178] = "(x)/(2)+(x)/(7)=12";
	stringEquation[187] = "3-2(x+3)=x-18";
	stringEquation[188] = "3(x-4)=-1..";
	stringEquation[189] = "50+(3x-4)=2..";
	stringEquation[190] = "(x)/(2)+4x=15-(-x..";
	stringEquation[191] = "2(2x-4)=5-((x)/(2)..";
	stringEquation[192] = "4(2x-5)=3..";
	stringEquation[193] = "(x)/(4)+2=(x-3)/(2)";
	stringEquation[194] = "(4)/(5)+(x)/(2)=(x)/(3)-1";
	stringEquation[195] = "x+3=2(x-(1)/(2))";
	stringEquation[196] = "(3(x-4))/(8)-1=x..";
	stringEquation[197] = "(x)/(3)+(x)/(2)=(7+x)/(3)";
	stringEquation[198] = "(x-2)/(3)+2x=(5x)/2";
	stringEquation[199] = "(x-5)/(3)+(3x-1)/(2)=4";
	stringEquation[200] = "3(6x-8)+10=5..";
	stringEquation[202] = "(x-1)/(5)=x-(2x-1)/(3)";
	stringEquation[203] = "3x-2(x-5)..";
	stringEquation[204] = "(x-1)/(2)+(x-3)/(3)=6";
	stringEquation[205] = "(x-2)/(3)-(x+1)/(4)=4";
	stringEquation[206] = "x-(2x-1)/(3)=(x-1)/(5)";
	stringEquation[207] = "(x-3)/(7)=(x-1)/(4)";
	stringEquation[208] = "(x+3)/(4)-5=x+1";
	stringEquation[209] = "(2x)/(5)+(15x-1)/(20)=(1)/(3)";
	stringEquation[210] = "x+7-x-2x=96..";
	stringEquation[211] = "7x+23-x=2x..";
	stringEquation[212] = "4(x-2)-2(x+1)..";
	stringEquation[213] = "10(x+1)-6=2(x..";
	stringEquation[214] = "3x-(x+1)-1..";
	stringEquation[215] = "(x-3)/(3)+(3)/(2)=(4x)/(3)";
	stringEquation[216] = "6x-4(x-5)-(5..";
	stringEquation[217] = "2(x-2)+3(2x+2)..";
	stringEquation[218] = "x-(x)/(3)=6+(x)/(2)";
	stringEquation[219] = "10(x-6)=9(x+3)";
	stringEquation[220] = "9-2(x+3)=x-18";
	stringEquation[221] = "4(x-4)=-1..";
	stringEquation[222] = "40+(3x-4)=2..";
	stringEquation[223] = "5(2x-5)=3..";
	stringEquation[224] = "2(6x-8)+10=3..";
	stringEquation[225] = "3x+2(1-x)=10";
	stringEquation[226] = "x-(3-x)=1";
	stringEquation[227] = "x+3(x-1)-(x..";
	stringEquation[228] = "10=3(x-2)-(x..";
	stringEquation[229] = "2(7x-1)-3(4..";
	stringEquation[230] = "(x)/(4)-2=(x-3)/(2)";
	stringEquation[231] = "(4)/(5)+(x)/(2)=(x)/(3)-2";
	stringEquation[232] = "(4x+16)/(4)-(x)/(2)=6+x";
	stringEquation[233] = "(2x+4)/(5)-(x-10)/(6)=2";
	stringEquation[234] = "(2x+9)/(7)-(x+1)/(4)=x+2";
	stringEquation[235] = "(4x+9)/(9)-(x)/(15)=2x..";
	stringEquation[236] = "x-(x)/(2)=2x+1";
	stringEquation[237] = "(x)/(2)+(x-1)/(3)=3";
	stringEquation[238] = "(x-2)/(4)+2x=(5x)/(2)";
	stringEquation[239] = "(x)/(3)+(2x+2)/(4)=3x+7";
	stringEquation[240] = "(x-1)/(7)-(2x+6)/(8)=(4x-14)/(14)-1";
	stringEquation[241] = "2(2x-4)=5-((x)/(2)+4)";
	stringEquation[242] = "x+3=2(x-(1)/(2))";
	stringEquation[243] = "(3(x-4))/(4)-1=x..";
	stringEquation[244] = "4x-2(x-5)..";
	stringEquation[245] = "(2x-1)/(4)-(x-1)/(3)..";
	stringEquation[246] = "(x)/(2)-(x-1)/(3)+(17)/(12)..";
	stringEquation[247] = "(2x-3)/(5)-(11-x)/(3)=(29)/(30)";
	stringEquation[248] = "(x-1)/(2)+(x+1)/(3)=(2x+3)/(5)";
	stringEquation[249] = "(3x+1)/(13)-(2-x)/(2)..";
	stringEquation[250] = "(2x-1)/(3)-(5x-10)/(4)..";
	stringEquation[251] = "x+8x-2x=81-2x";
	stringEquation[252] = "7x+44-x=2x+20";
	stringEquation[253] = "6x-2(x-3)-(12..";
	stringEquation[254] = "10(x+1)-6=3..";
	stringEquation[255] = "6(x-2)-2(x..";
	stringEquation[256] = "6x-(x+1)-1..";
	stringEquation[257] = "(x-1)/(2)=x-(2x-1)/(3)";
	stringEquation[258] = "(x-2)/(3)-(x+1)/(4)=10";
	stringEquation[259] = "(x-1)/(7)-(x+3)/(4)=1";
	stringEquation[260] = "(x-3)/(5)=(x-1)/(4)";
	stringEquation[261] = "(x+1)/(3)+(3x-1)/(2)..)";
	stringEquation[262] = "(x)/(2)+4x=15-2..";
	stringEquation[263] = "(1-x)/(2)=(x+1)/(2)+x";
	stringEquation[264] = "(x)/(6)+(x)/(9)=(x-1)/(2)+2";
	stringEquation[265] = "(x-3)/(3)-(3)/(2)=(4x)/(3)";
	stringEquation[266] = "(x+3)/(2)+(x)/(3)=10";
	stringEquation[267] = "(x+3)/(2)+(x+2)/(3)=12";
	stringEquation[268] = "(x-1)/(2)=(x+1)/(3)";
	stringEquation[269] = "(x-2)/(10)=(x-1)/(2)";
	stringEquation[270] = "9-2(x+3)=x-18";
	stringEquation[271] = "4(x-4)=-1..";
	stringEquation[272] = "40+(3x-4)=2..";
	stringEquation[273] = "5(2x-5)=3..";
	stringEquation[274] = "2(6x-8)+10=3..";
	stringEquation[275] = "3x+2(1-x)=10";
	stringEquation[276] = "x-(3-x)=1";
	stringEquation[277] = "x+3(x-1)-(x..";
	stringEquation[278] = "10=3(x-2)-(x..";
	stringEquation[279] = "(x)/(3)-(7)/(8)=(x)/(4)-1";
	stringEquation[280] = "(3x-5)/(2)-(x-2)/(5)=7";
	stringEquation[281] = "x-3=2(x-(1)/(2))";
	stringEquation[282] = "(x+5)/(2)=(8+2x)/(5)";
	stringEquation[283] = "(5x-10)/(2)=10-(5x-5)/(3)";
	stringEquation[284] = "(x+3)/(8)=(5)/(4)";
	stringEquation[285] = "(x)/(2)-5=x+(3)/(4)";
	stringEquation[286] = "(5x-3)/(4)-(3x+8)/(2)..";
	stringEquation[287] = "(x+4)/(5)-(x-10)/(6)=2";
	stringEquation[288] = "(x-2)/(3)-(x+1)/(4)=4";
	stringEquation[289] = "(2x-3)/(4)-(2-x)/(3)=(x-1)/(3)";
	stringEquation[290] = "x-(x)/(2)=2x+(1)/(3)";
	stringEquation[291] = "(x+2)/(2)-(2x-3)/(3)=(3x+1)/(4)";
	stringEquation[292] = "(x-1)/(5)-(5-2x)/(3)=x";
	stringEquation[293] = "4x-2(x-5)=-x-5";
	stringEquation[294] = "4(2-x)-3(2x..";
	stringEquation[295] = "5x-(x-2)=2..";
	stringEquation[296] = "x+7x-5x=80-5x";
	stringEquation[297] = "3(x-1)-9x-30..";
	stringEquation[298] = "6(x-2)-(x+1)=40";
	stringEquation[299] = "6x-(x+1)-1..";
	stringEquation[300] = "(5x-1)/(10)-(1)/(2)=1-(2-x)/(5)";
	stringEquation[301] = "x-(2x+1)/(3)=(x-2)/(2)";
	stringEquation[302] = "(x-2)/(5)-(x+1)/(4)=10";
	stringEquation[303] = "(x-2)/(4)+(1)/(3)=x-(2x-1)/(3)";
	stringEquation[304] = "(x-2)/(5)=(x-1)/(4)";
	stringEquation[305] = "(5-x)/(9)-(x-1)/(6)..";
	stringEquation[306] = "(x-1)/(2)+(x+1)/(3)=(x+3)/(2)";
	stringEquation[307] = "(2x+2)/(3)+(3x-5)/(2)=9";
	stringEquation[308] = "1-(x-1)/(2)=x-(x+2)/(3)";
	stringEquation[309] = "(x)/(2)+(x)/(3)=(7+2x)/(3)";
	stringEquation[310] = "(3x-2)/(4)-(4-x)/(2)..";
	stringEquation[311] = "(x-1)/(3)-(3)/(2)=(4x)/(3)";
	stringEquation[312] = "(1+7x)/(7)-1=(3)/(7)..";
	stringEquation[313] = "(30x)/(60)+x=225";
	stringEquation[314] = "(35x)/(10)-3x=-(15)/(10)";
	stringEquation[315] = "(25x)/(2)-(21x)/(2)=(17)/(5)";
	stringEquation[316] = "6x-(5x)/(10)=110";
	stringEquation[317] = "7x-(x)/(2)=26";
	stringEquation[318] = "4x-10=(5x)/(10)+(75)/(10)";
	stringEquation[319] = "(3)/(5)+x=(x+3)/(5)-(x-5)/(3)";
	stringEquation[320] = "x+(3x-9)/(5)..";
}

function getEquationsPlan ( ) {
	equationPlan = new Array ( );	
	equationPlan[9] = new EquationPlan (201, 2);
	equationPlan[2] = new EquationPlan (13, 3);
	equationPlan[3] = new EquationPlan (29, 4);
	equationPlan[4] = new EquationPlan (58, 5);
	equationPlan[5] = new EquationPlan (64, 6);
	equationPlan[6] = new EquationPlan (121, 7);
	equationPlan[7] = new EquationPlan (144, 8);
	equationPlan[8] = new EquationPlan (168, 10);
	equationPlan[10] = new EquationPlan (187, 11);
	equationPlan[11] = new EquationPlan (202, 12);
	equationPlan[12] = new EquationPlan (220, 13);
	equationPlan[13] = new EquationPlan (230, 14);
	equationPlan[14] = new EquationPlan (241, 15);
	equationPlan[15] = new EquationPlan (251, 16);
	equationPlan[16] = new EquationPlan (257, 17);
	equationPlan[17] = new EquationPlan (270, 18);
	equationPlan[18] = new EquationPlan (279, 19);
	equationPlan[19] = new EquationPlan (293, 20);
	equationPlan[19] = new EquationPlan (300, 21);
	equationPlan[19] = new EquationPlan (313, null);
}

//var plano1 = 
//[
//"x+4=10",
//"x+1=23",
//"x+5=34",
//"x+8=12",
//"x–1=11",
//"x–6=12",
//"x–9=30",
//"x–8=19",
//"10+x=56",
//"18+x=20",
//"15+x=21",
//"120+x=220",
//"100+x=300",
//"99+x=180"	
//];
//
//var plano2 =
//[
//"4x=-28",
//"9x=18",
//"4x=-16",
//"5x=-20",
//"12x=6",
//"18x=9",
//"7x=-21",
//"8x=0",
//"8x=32",
//"48x=12",
//"35x=-70",
//"6x=32",
//"8x=10",
//"5x=-100",
//"32x=-8",
//"-7x=-42",
//"-8x=-24",
//"-20x=-4",
//"-60=-2x",
//"45=-5x",
//"90=2x" 
//];
//	
//var plano3 =
//[
//"(x)/(2)=12",
//"(x)/(2)=8",
//"(x)/(2)=-5",
//"(x)/(3)=9",
//"(x)/(4)=-5",
//"(3x)/(4)=9",
//"(2x)/(5)=-4",
//"(2x)/(3)=-10",
//"(x)/(4)=-30"
//];
//
//var plano4 =
//[
//"3x+10=91",
//"4x+7=x+25",
//"6x-19=71",
//"2x+3=9",
//"5x+10=50",
//"6x-1=11",
//"7x-1=13",
//"2x+5=27",
//"7x+1=6x+6",
//"4x-7=3x+9",
//"4x-8=2x+6",
//"5x-3=2x-9",
//"2x-20=x+80",
//"9x-10=170",
//"5x-10=70",
//"6x=2x+28",
//"5x-2=18+3x",
//"6x-10=2x+14",
//"4x+8=2x+12",
//"9x+10=8x-7",
//"5x-18=4x+30"
//];
//
//var plano5 =
//[
//"3*(2x-1)=2*(x+1)+3",
//"3*(x+3)-1=2",
//"3*(x+2)=2*(x-7)",
//"5*(2x+7)-1=4*(x-5)+9",
//"2*(x-1)+3*(x+1)=4*(x+2)",
//"2*(x+1)+5*(x-1)=7",
//"8*(x-1)=7*(x+2)",
//"9*(x+1)=8*(x-2)",
//"7*(x-1)=6*(x-1)",
//"5*(x+2)=4*(x-1)",
//"5*(x-2)=4*(x+3)",
//"3*(x+2)-1=2*(x+3)-7",
//"5*(2x+7)-1=4*(x-5)+9",
//"2*(x-1)+3*(x+1)=4*(x+2)",
//"3*(x-1)+5*(x-1)=16",
//"2*(2x+3)+5*(x+1)=12",
//"11*(x-7)-7*(x+1)=11-x",
//"3*(x+5)=2*(x-2)",
//"3*(x+1)+2*(2x-3)=5*(x-1)+8",
//"8*(x-2)=7*(x+2)",
//"9*(x-3)=7*(x-1)",
//"8x-2*(x+5)=20",
//"10*(x-3)=9*(x+2)",
//"8*(x+4)=7*(x-2)",
//"2*(2x+7)+3*(3x-5)=3*(4x+5)-1"
//];
//
//var plano6 =
//[
//"4*(x+1)=12",
//"9*(x-3)+1=18",
//"5*(3-x)=4x+18",
//"9x-3*(2x+2)=15",
//"5*(3-x)=2*(x-4)+15",
//"3*(2x-1)=-2*(x+3)",
//"3*(x-2)-5*(x-1)=-7",
//"4*(x+10)-2*(x-5)=0",
//"6*(x-2)=-3*(x+2)",
//"15+3*(x+2)=-7+2*(x+1)",
//"-5*(-x-4)=-5",
//"2x-3=7-2*(2x-13)",
//"-2*(2x+1)-3*(x-5)=-8",
//"-5*(x-1)-2*(x+2)=0",
//"-3*(x+4)+4*(x-9)=12",
//"x-3*(4-x)=7x-2*(x-1)",
//"10+2*(x-2)=5-3*(x-4)",
//"2*(9x-2)+3*(2x+2)=-5*(2-x)",
//"x+3*(x-1)-2-3*(x-3)=0",
//"6x-4*(x-5)-3*(x-1)=0",
//"7x+23-x=2x+20",
//"7x-2*(x+2)=10"
//];
//
//var plano7 =
//[
//"x+(x)/(4)=20",
//"x-(x)/(5)=10",
//"x+(x)/(6)=20",
//"(x)/(3)+(x)/(2)=15",
//"x-(x)/(2)=1",
//"(3x)/(2)-5x=-7",
//"(x)/(2)-(x)/(4)=12",
//"(3x)/(4)-(x)/(2)=-2",
//"(x)/(2)+(x)/(3)=1",
//"(x)/(2)+(x)/(7)=12"
//];
//
//var plano8 =
//[
//"3-2*(x+3)=x-18",
//"3*(x-4)=-1-(3x-1)",
//"50+(3x-4)=2*(3x-4)+26",
//"(x)/(2)+4x=15-(-x-6)",
//"2*(2x-4)=5-((x)/(2)+4)",
//"4*(2x-5)=3-(-2x+1)",
//"(x)/(4)+2=(x-3)/(2)",
//"(4)/(5)+(x)/(2)=(x)/(3)-1",
//"x+3=2*(x-(1)/(2))",
//"(3*(x-4))/(8)-1=x-(4-x)/(6)",
//"(x)/(3)+(x)/(2)=(7+x)/(3)",
//"(x-2)/(3)+2x=(5x)/2",
//"(x-5)/(3)+(3x-1)/(2)=4",
//"3*(6x-8)+10=5*(x-2)-(-4+3x)"
//];
//
//var plano9 =
//[
//"(x-1)/(5)=x-(2x-1)/(3)",
//"3x-2*(x-5)+(3x-5)/(2)=0",
//"(x-1)/(2)+(x-3)/(3)=6",
//"(x-2)/(3)-(x+1)/(4)=4",
//"x-(2x-1)/(3)=(x-1)/(5)",
//"(x-3)/(7)=(x-1)/(4)",
//"(x+3)/(4)-5=x+1",
//"(2x)/(5)+(15x-1)/(20)=(1)/(3)",
//"x+7-x-2x=96+2x",
//"7x+23-x=2x+20",
//"4*(x-2)-2*(x+1)=4",
//"10*(x+1)-6=2*(x-3)-10",
//"3x-(x+1)-1=-x+4*(2-x)",
//"(x-3)/(3)+(3)/(2)=(4x)/(3)",
//"6x-4*(x-5)-(5-3x)=0",
//"2*(x-2)+3*(2x+2)=-5*(2-x)",
//"x-(x)/(3)=6+(x)/(2)",
//"10*(x-6)=9*(x+3)" 
//];







//var finalEquations = [plano1[plano1.length - 1], plano2[plano2.length - 1], plano3[plano3.length - 1], plano4[plano4.length - 1], plano5[plano5.length - 1], plano6[plano6.length - 1], plano7[plano7.length - 1]];
//var planos = [plano1, plano2, plano3, plano4, plano5, plano6, plano7];