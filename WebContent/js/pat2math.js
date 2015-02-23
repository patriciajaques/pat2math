var appContext = "/pat2math/";
//var currentIds = null; //Array original atual das equações
//var currentIds2 = null; //Array ordenado atual das equações
//var stop = true; //Variável que controla se o aluno está resolvendo as equações em sequência. Se não estiver, a variável pos deverá ser atualizada 
//                      //quando clicar no botão da próxima equação.
//var pos = -1; //Posição da equação atual no array ordenado (currentIds2)

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
					
					$(".task").each(
						function() {
							var text = $(this).html();
							
							if(text.length > 30) {
								$(this).html($(this).html().substring(0, 23) + "...");
							}
						}
					);
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
		
		if (isTourInterativo && id === 9) 
			clickPlan();
	} else {
		if (isTourInterativo && id === 9) 		
			clickPlan();
		
		else
		    $("#tasks"+id).slideUp(700);
	}
}

function loadExercise(id) {	
//	setCurrentEquation (id);
	loadingShow();
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
					
				if(data.performed) 
					equation.isComplete = true;
				
				if (isTourInterativo && id === 201) {
					blockMenu = false;
						
					if (equation.isComplete === true)
						clickEquationSlim();
					
					else {
						var pos = getCookie  ("pos");
	                	var cookieName = "isPartiallyResolved" + pos;
	                	var temp = getCookie (cookieName);
	                	
					    if (temp === "")
						    clickEquation();
					
					    else
						    clickEquationPartiallyResolved();
					}
				}
				
				newEquations[0] = equation;
			}
			reloadPaper(1);
			idEquation=id;
			var pos = getCookie ("pos");
			var cookieName = "currentEquation" + pos;
			setCookieDays (cookieName, idEquation, 1);
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
	loadingHide();	
}

function loadExerciseTest(id) {
//	if (isTourInterativo && id === 3) 
//		clickEquation();
	
	loadingShow();
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
				}
				newEquations[0] = equation;
			}
			reloadPaper(1);
			idEquation=id;
			var pos = getCookie ("pos");
			var cookieName = "currentEquation" + pos;
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
	loadingHide();
}

function loadingShow(){
	$('#loading').fadeIn();
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
		loadExercise (ids[newPos]);
		loadEquation (0);
		//pos++; //Avança uma posição do array ordenado
	}
	
	else {
		loadExercise (idEquation + 1);
		loadEquation (0);
	}
	
	
	
//	stop = false; //Como o usuário clicou no botão da próxima equação, ele está resolvendo-as sequencialmente.
	/* Verifica se:
	 * É a primeira vez que o usuário clica no botão ou
	 * O usuário está resolvendo as equações de forma sequencial utilizando o botão (caso ele pulou para outra equação no mesmo plano, a variável pos deverá ser atualizada);
	 * O usuário está no mesmo plano de aula da equação anterior.
	 */
//	if (stop || binarySearch (currentIds2, idEquation) === -1) {
//		//Verifica se a equação está no Plano de Aula 1 (ids0)
//		pos = binarySearch (ids0, idEquation);
//		
//		//Caso a pesquisa retorne -1, é que não encontrou a equação atual. Assim, continua verificando todos os planos até encontrar o da equação atual.
//		if (pos === -1) {
//			pos = binarySearch (ids1, idEquation);
//			
//			if (pos === -1) {
//				pos = binarySearch (ids2, idEquation);
//				
//				if (pos === -1) {
//					pos = binarySearch (ids3, idEquation);
//					
//					if (pos === -1) {
//						pos = binarySearch (ids4, idEquation);
//						
//						if (pos === -1) {
//							pos = binarySearch (ids5, idEquation);
//							
//							if (pos === -1) {
//								pos = binarySearch (ids6, idEquation);
//								
//								if (pos === -1) {
//									pos = binarySearch (ids7, idEquation);
//									
//									if (pos === -1) {
//										pos = binarySearch (ids8, idEquation);
//
//										currentIds = ids08;
//										currentIds2 = ids8;
//									}
//									else {
//									    currentIds = ids07;
//									    currentIds2 = ids7;
//									}
//								}
//								else {
//								    currentIds = ids06;
//								    currentIds2 = ids6;
//								}
//							}
//							else {
//							    currentIds = ids05;
//							    currentIds2 = ids5;
//							}						    
//						}
//						else {
//						    currentIds = ids04;
//						    currentIds2 = ids4;
//						}
//					}
//					else {
//					    currentIds = ids03;
//					    currentIds2 = ids3;
//					}
//				}
//				else {
//				    currentIds = ids02;
//				    currentIds2 = ids2;
//				}
//			}
//			else {
//			    currentIds = ids01;
//			    currentIds2 = ids1;
//			}
//		}
//		
//		else {
//		    currentIds = ids00;	
//		    currentIds2 = ids0;
//		}
//	}
	
//	var pos = binarySearch (sortedIds0, idEquation);
//	
//	if (pos === -1) {
//		pos = binarySearch (sortedIds1, idEquation);
//		
//		if (pos === -1) {
//			pos = binarySearch (sortedIds2, idEquation);
//			
//			if (pos === -1) {
//				pos = binarySearch (sortedIds3, idEquation);
//				
//				if (pos === -1) {
//					pos = binarySearch (sortedIds4, idEquation);
//					
//					if (pos === -1) {
//						pos = binarySearch (sortedIds5, idEquation);
//						
//						if (pos === -1) {
//							pos = binarySearch (sortedIds6, idEquation);
//							
//							for (var i = 0; i < ids6.length; i++)
//								if (idEquation === ids6[i]) {
//									pos = i;
//									break;
//								}
//							
//							loadExercise (ids6[pos + 1]);
//							loadEquation (0);
//						}
//						
//						else {
//							for (var i = 0; i < ids5.length; i++)
//								if (idEquation === ids5[i]) {
//									pos = i;
//									break;
//								}
//							
//							loadExercise (ids5[pos + 1]);
//							loadEquation (0);
//						}
//					}
//					
//					else {
//						for (var i = 0; i < ids4.length; i++)
//							if (idEquation === ids4[i]) {
//								pos = i;
//								break;
//							}
//						
//						loadExercise (ids4[pos + 1]);
//						loadEquation (0);
//					}
//				}
//				
//				else {
//					for (var i = 0; i < ids3.length; i++)
//						if (idEquation === ids3[i]) {
//							pos = i;
//							break;
//						}
//					
//					loadExercise (ids3[pos + 1]);
//					loadEquation (0);
//				}
//			}
//			
//			else {
//				for (var i = 0; i < ids2.length; i++)
//					if (idEquation === ids2[i]) {
//						pos = i;
//						break;
//					}
//						
//				loadExercise (ids2[pos + 1]);
//				loadEquation (0);
//			}
//		}
//		
//		else {
//			for (var i = 0; i < ids1.length; i++)
//				if (idEquation === ids1[i]) {
//					pos = i;
//					break;
//				}
//			
//			loadExercise (ids1[pos + 1]);
//			loadEquation (0);
//		}
//	}
//	
//	else {
//		for (var i = 0; i < ids0.length; i++)
//			if (idEquation === ids0[i]) {
//				pos = i;
//				break;
//			}
//	}
	
	
}

function EquationId (id, pos, plan) {
	this.id = id; //ID da equação
	this.pos = pos; //Posição em que ela está no array original (não ordenado)
	this.plan = plan; //ID do plano em que a equação está
}

//Array original das equações
var ids = [13, 14, 15, 16, 107, 108, 109, 110, 21, 22, 23, 24, 25, 26,
           29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
           58, 59, 60, 61, 62, 55, 56, 57, 63,
           64, 65, 111, 67, 68, 112, 70, 71, 72, 113, 114, 115, 116, 117, 80, 81, 118, 119, 83, 84, 120,
           121, 122, 123, 125, 126, 127, 128, 129, 130, 131, 132, 124, 125, 126, 135, 101, 136, 137, 138, 105, 139, 140, 141, 142, 143,
           144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 180, 162,
           168, 169, 170, 171, 172, 173, 174, 176, 177, 178,
           187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200,
           202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219];

var sortedIds = new Array ( );
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
sortedIds[125] = new EquationId (125, 77, 6);
sortedIds[126] = new EquationId (126, 69, 6);
sortedIds[126] = new EquationId (126, 78, 6);
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
sortedIds[168] = new EquationId (168, 109, 8);
sortedIds[169] = new EquationId (169, 110, 8);
sortedIds[170] = new EquationId (170, 111, 8);
sortedIds[171] = new EquationId (171, 112, 8);
sortedIds[172] = new EquationId (172, 113, 8);
sortedIds[173] = new EquationId (173, 114, 8);
sortedIds[174] = new EquationId (174, 115, 8);
sortedIds[176] = new EquationId (176, 116, 8);
sortedIds[177] = new EquationId (177, 117, 8);
sortedIds[178] = new EquationId (178, 118, 8);
sortedIds[180] = new EquationId (180, 107, 7);
sortedIds[187] = new EquationId (187, 119, 10);
sortedIds[188] = new EquationId (188, 120, 10);
sortedIds[189] = new EquationId (189, 121, 10);
sortedIds[190] = new EquationId (190, 122, 10);
sortedIds[191] = new EquationId (191, 123, 10);
sortedIds[192] = new EquationId (192, 124, 10);
sortedIds[193] = new EquationId (193, 125, 10);
sortedIds[194] = new EquationId (194, 126, 10);
sortedIds[195] = new EquationId (195, 127, 10);
sortedIds[196] = new EquationId (196, 128, 10);
sortedIds[197] = new EquationId (197, 129, 10);
sortedIds[198] = new EquationId (198, 130, 10);
sortedIds[199] = new EquationId (199, 131, 10);
sortedIds[200] = new EquationId (200, 132, 10);
sortedIds[202] = new EquationId (202, 133, 11);
sortedIds[203] = new EquationId (203, 134, 11);
sortedIds[204] = new EquationId (204, 135, 11);
sortedIds[205] = new EquationId (205, 136, 11);
sortedIds[206] = new EquationId (206, 137, 11);
sortedIds[207] = new EquationId (207, 138, 11);
sortedIds[208] = new EquationId (208, 139, 11);
sortedIds[209] = new EquationId (209, 140, 11);
sortedIds[210] = new EquationId (210, 141, 11);
sortedIds[211] = new EquationId (211, 142, 11);
sortedIds[212] = new EquationId (212, 143, 11);
sortedIds[213] = new EquationId (213, 144, 11);
sortedIds[214] = new EquationId (214, 145, 11);
sortedIds[215] = new EquationId (215, 146, 11);
sortedIds[216] = new EquationId (216, 147, 11);
sortedIds[217] = new EquationId (217, 148, 11);
sortedIds[218] = new EquationId (218, 149, 11);
sortedIds[219] = new EquationId (219, 150, 11);

//var ids0 = [new EquationId (13, 0), 
//            new EquationId (14, 1), 
//            new EquationId (15, 2), 
//            new EquationId (16, 3), 
//            new EquationId (21, 8), 
//            new EquationId (22, 9), 
//            new EquationId (23, 10), 
//            new EquationId (24, 11), 
//            new EquationId (25, 12), 
//            new EquationId (26, 13), 
//            new EquationId (107, 4), 
//            new EquationId (108, 5), 
//            new EquationId (109, 6), 
//            new EquationId (110, 7)];
//
//var ids1 = [new EquationId (29, 0), 
//            new EquationId (30, 1), 
//            new EquationId (31, 2), 
//            new EquationId (32, 3), 
//            new EquationId (33, 4), 
//            new EquationId (34, 5), 
//            new EquationId (35, 6), 
//            new EquationId (36, 7), 
//            new EquationId (37, 8), 
//            new EquationId (38, 9), 
//            new EquationId (39, 10), 
//            new EquationId (40, 11), 
//            new EquationId (41, 12), 
//            new EquationId (42, 13), 
//            new EquationId (43, 14), 
//            new EquationId (44, 15), 
//            new EquationId (45, 16), 
//            new EquationId (46, 17), 
//            new EquationId (47, 18), 
//            new EquationId (48, 19), 
//            new EquationId (49, 20)];
//
//var ids2 = [new EquationId (55, 5), 
//            new EquationId (56, 6), 
//            new EquationId (57, 7), 
//            new EquationId (58, 0), 
//            new EquationId (59, 1), 
//            new EquationId (60, 2), 
//            new EquationId (61, 3), 
//            new EquationId (62, 4), 
//            new EquationId (63, 8)];
//
//var ids3 = [new EquationId (64, 0), 
//            new EquationId (65, 1), 
//            new EquationId (67, 3), 
//            new EquationId (68, 4), 
//            new EquationId (70, 6), 
//            new EquationId (71, 7), 
//            new EquationId (72, 8), 
//            new EquationId (80, 14), 
//            new EquationId (81, 15), 
//            new EquationId (83, 18), 
//            new EquationId (84, 19), 
//            new EquationId (111, 2), 
//            new EquationId (112, 5), 
//            new EquationId (113, 9), 
//            new EquationId (114, 10), 
//            new EquationId (115, 11), 
//            new EquationId (116, 12), 
//            new EquationId (117, 13), 
//            new EquationId (118, 16), 
//            new EquationId (119, 17), 
//            new EquationId (120, 20)];
//
//var ids4 = [new EquationId (101, 15), 
//            new EquationId (105, 19), 
//            new EquationId (121, 0), 
//            new EquationId (122, 1), 
//            new EquationId (123, 2), 
//            new EquationId (124, 11), 
//            new EquationId (125, 3), 
//            new EquationId (125, 3), 
//            new EquationId (126, 4), 
//            new EquationId (126, 4), 
//            new EquationId (127, 5), 
//            new EquationId (128, 6), 
//            new EquationId (129, 7), 
//            new EquationId (130, 8), 
//            new EquationId (131, 9), 
//            new EquationId (132, 10), 
//            new EquationId (135, 14), 
//            new EquationId (136, 16), 
//            new EquationId (137, 17), 
//            new EquationId (138, 18), 
//            new EquationId (139, 20), 
//            new EquationId (140, 21), 
//            new EquationId (141, 22), 
//            new EquationId (142, 23), 
//            new EquationId (143, 24)];
//
//var ids5 = [new EquationId (144, 0), 
//            new EquationId (145, 1), 
//            new EquationId (146, 2), 
//            new EquationId (147, 3), 
//            new EquationId (148, 4), 
//            new EquationId (149, 5), 
//            new EquationId (150, 6), 
//            new EquationId (151, 7), 
//            new EquationId (152, 8), 
//            new EquationId (153, 9), 
//            new EquationId (154, 10), 
//            new EquationId (155, 11), 
//            new EquationId (156, 12), 
//            new EquationId (157, 13), 
//            new EquationId (158, 14), 
//            new EquationId (159, 15), 
//            new EquationId (160, 16), 
//            new EquationId (162, 18), 
//            new EquationId (180, 17)];
//
//var ids6 = [new EquationId (168, 0), 
//            new EquationId (169, 1), 
//            new EquationId (170, 2), 
//            new EquationId (171, 3), 
//            new EquationId (172, 4), 
//            new EquationId (173, 5), 
//            new EquationId (174, 6), 
//            new EquationId (176, 7), 
//            new EquationId (177, 8), 
//            new EquationId (178, 9)];
//
//var ids7 = [new EquationId (187, 0), 
//            new EquationId (188, 1), 
//            new EquationId (189, 2), 
//            new EquationId (190, 3), 
//            new EquationId (191, 4), 
//            new EquationId (192, 5), 
//            new EquationId (193, 6), 
//            new EquationId (194, 7), 
//            new EquationId (195, 8), 
//            new EquationId (196, 9), 
//            new EquationId (197, 10), 
//            new EquationId (198, 11), 
//            new EquationId (199, 12), 
//            new EquationId (200, 13)];

//Arrays originais das equações
//ids00 = [13, 14, 15, 16, 107, 108, 109, 110, 21, 22, 23, 24, 25, 26];
//ids01 = [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
//ids02 = [58, 59, 60, 61, 62, 55, 56, 57, 63];
//ids03 = [64, 65, 111, 67, 68, 112, 70, 71, 72, 113, 114, 115, 116, 117, 80, 81, 118, 119, 83, 84, 120];
//ids04 = [121, 122, 123, 125, 126, 127, 128, 129, 130, 131, 132, 124, 125, 126, 135, 101, 136, 137, 138, 105, 139, 140, 141, 142, 143];
//ids05 = [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 180, 162];
//ids06 = [168, 169, 170, 171, 172, 173, 174, 176, 177, 178];
//ids07 = [187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200];


//
//



//var plano1 = 
//	[
//	"x+4=10",
//	"x+1=23",
//	"x+5=34",
//	"x+8=12",
//	"x–1=11",
//	"x–6=12",
//	"x–9=30",
//	"x–8=19",
//	"10+x=56",
//	"18+x=20",
//	"15+x=21",
//	"120+x=220",
//	"100+x=300",
//	"99+x=180"	
//	];
//
//var plano2 =
//	[
//	"4x=-28",
//	"9x=18",
//	"4x=-16",
//	"5x=-20",
//	"12x=6",
//	"18x=9",
//	"7x=-21",
//	"8x=0",
//	"8x=32",
//	"48x=12",
//	"35x=-70",
//	"6x=32",
//	"8x=10",
//	"5x=-100",
//	"32x=-8",
//	"-7x=-42",
//	"-8x=-24",
//	"-20x=-4",
//	"-60=-2x",
//	"45=-5x",
//	"90=2x" 
//	];
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




//var finalEquations = [plano1[plano1.length - 1], plano2[plano2.length - 1], plano3[plano3.length - 1], plano4[plano4.length - 1], plano5[plano5.length - 1], plano6[plano6.length - 1], plano7[plano7.length - 1]];
//var planos = [plano1, plano2, plano3, plano4, plano5, plano6, plano7];