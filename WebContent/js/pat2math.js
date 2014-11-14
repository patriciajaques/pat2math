var appContext = "/pat2math/";
var currentIds = null; //Array original atual das equações
var currentIds2 = null; //Array ordenado atual das equações
var stop = true; //Variável que controla se o aluno está resolvendo as equações em sequência. Se não estiver, a variável pos deverá ser atualizada 
                      //quando clicar no botão da próxima equação.
var pos = -1; //Posição da equação atual no array ordenado (currentIds2)


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
//		topicIsOpen = true;
		
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
		
//		if (isTourInterativo && id === 9) //1
//			clickPlan();
	} else {
		topicIsOpen = false;
		$("#tasks"+id).slideUp(700);
	}
}

function loadExercise(id) {
//	if (isTourInterativo && id === 201) //3
//		clickEquation();
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
					
				if(data.performed) {
					equation.isComplete = true;
				}
				newEquations[0] = equation;
			}
			reloadPaper(1);
			idEquation=id;
			stop = true; //Essa variável recebe false em seguida se o usuário clicou no botão de próxima equação
			loadingHide();
			
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
			stop = true; //Essa variável recebe false em seguida se o usuário clicou no botão de próxima equação
			loadingHide();
			
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
}

function loadingShow(){
	$('#loading').fadeIn();
	$("#topics").hide("slide", { direction: "left" }, 500);
	$('.hide-menu').fadeOut();
	
}

function loadingHide(){
	$('#loading').fadeOut();
	$("#topics").show("slide", { direction: "left" }, 500);
	$('.hide-menu').fadeIn();
	
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
	
	/* Verifica se:
	 * É a primeira vez que o usuário clica no botão ou
	 * O usuário está resolvendo as equações de forma sequencial utilizando o botão (caso ele pulou para outra equação no mesmo plano, a variável pos deverá ser atualizada);
	 * O usuário está no mesmo plano de aula da equação anterior.
	 */
	if (stop || binarySearch (currentIds2, idEquation) === -1) {
		//Verifica se a equação está no Plano de Aula 1 (ids0)
		pos = binarySearch (ids0, idEquation);
		
		//Caso a pesquisa retorne -1, é que não encontrou a equação atual. Assim, continua verificando todos os planos até encontrar o da equação atual.
		if (pos === -1) {
			pos = binarySearch (ids1, idEquation);
			
			if (pos === -1) {
				pos = binarySearch (ids2, idEquation);
				
				if (pos === -1) {
					pos = binarySearch (ids3, idEquation);
					
					if (pos === -1) {
						pos = binarySearch (ids4, idEquation);
						
						if (pos === -1) {
							pos = binarySearch (ids5, idEquation);
							
							if (pos === -1) {
								pos = binarySearch (ids6, idEquation);
								
								if (pos === -1) {
									pos = binarySearch (ids7, idEquation);
									
									if (pos === -1) {
										pos = binarySearch (ids8, idEquation);

										currentIds = ids08;
										currentIds2 = ids8;
									}
									else {
									    currentIds = ids07;
									    currentIds2 = ids7;
									}
								}
								else {
								    currentIds = ids06;
								    currentIds2 = ids6;
								}
							}
							else {
							    currentIds = ids05;
							    currentIds2 = ids5;
							}						    
						}
						else {
						    currentIds = ids04;
						    currentIds2 = ids4;
						}
					}
					else {
					    currentIds = ids03;
					    currentIds2 = ids3;
					}
				}
				else {
				    currentIds = ids02;
				    currentIds2 = ids2;
				}
			}
			else {
			    currentIds = ids01;
			    currentIds2 = ids1;
			}
		}
		
		else {
		    currentIds = ids00;	
		    currentIds2 = ids0;
		}
	}
	
	//Posição da próxima equação. Ela é obtida da seguinte forma:
	//Seleciona a equação atual no array ordenado, e verifica a sua posição no array original. 
	//Esta variável recebe a posição seguinte da equação no array original.
	var newPos = currentIds2[pos].pos + 1;
	pos++; //Avança uma posição do array ordenado
	loadExercise (currentIds[newPos]);
	loadEquation (0);
	stop = false; //Como o usuário clicou no botão da próxima equação, ele está resolvendo-as sequencialmente.
	
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

function binarySearch (ids, id) {
	var inf = 0;
	var sup = ids.length - 1;
	
	while (sup >= inf) {
		var med = Math.floor((inf + sup) / 2);
		
		if (id === ids[med].id)
			return med;
		
		else if (id < ids[med].id)
			sup = med - 1;
		
		else
			inf = med + 1;
	}
	
	return -1;
}

function EquationId (id, pos) {
	this.id = id; //ID da equação
	this.pos = pos; //Posição em que ela está no array original (não ordenado)
}

var ids0 = [new EquationId (13, 0), 
            new EquationId (14, 1), 
            new EquationId (15, 2), 
            new EquationId (16, 3), 
            new EquationId (21, 8), 
            new EquationId (22, 9), 
            new EquationId (23, 10), 
            new EquationId (24, 11), 
            new EquationId (25, 12), 
            new EquationId (26, 13), 
            new EquationId (107, 4), 
            new EquationId (108, 5), 
            new EquationId (109, 6), 
            new EquationId (110, 7)];

var ids1 = [new EquationId (29, 0), 
            new EquationId (30, 1), 
            new EquationId (31, 2), 
            new EquationId (32, 3), 
            new EquationId (33, 4), 
            new EquationId (34, 5), 
            new EquationId (35, 6), 
            new EquationId (36, 7), 
            new EquationId (37, 8), 
            new EquationId (38, 9), 
            new EquationId (39, 10), 
            new EquationId (40, 11), 
            new EquationId (41, 12), 
            new EquationId (42, 13), 
            new EquationId (43, 14), 
            new EquationId (44, 15), 
            new EquationId (45, 16), 
            new EquationId (46, 17), 
            new EquationId (47, 18), 
            new EquationId (48, 19), 
            new EquationId (49, 20)];

var ids2 = [new EquationId (55, 5), 
            new EquationId (56, 6), 
            new EquationId (57, 7), 
            new EquationId (58, 0), 
            new EquationId (59, 1), 
            new EquationId (60, 2), 
            new EquationId (61, 3), 
            new EquationId (62, 4), 
            new EquationId (63, 8)];

var ids3 = [new EquationId (64, 0), 
            new EquationId (65, 1), 
            new EquationId (67, 3), 
            new EquationId (68, 4), 
            new EquationId (70, 6), 
            new EquationId (71, 7), 
            new EquationId (72, 8), 
            new EquationId (80, 14), 
            new EquationId (81, 15), 
            new EquationId (83, 18), 
            new EquationId (84, 19), 
            new EquationId (111, 2), 
            new EquationId (112, 5), 
            new EquationId (113, 9), 
            new EquationId (114, 10), 
            new EquationId (115, 11), 
            new EquationId (116, 12), 
            new EquationId (117, 13), 
            new EquationId (118, 16), 
            new EquationId (119, 17), 
            new EquationId (120, 20)];

var ids4 = [new EquationId (101, 15), 
            new EquationId (105, 19), 
            new EquationId (121, 0), 
            new EquationId (122, 1), 
            new EquationId (123, 2), 
            new EquationId (124, 11), 
            new EquationId (125, 3), 
            new EquationId (125, 3), 
            new EquationId (126, 4), 
            new EquationId (126, 4), 
            new EquationId (127, 5), 
            new EquationId (128, 6), 
            new EquationId (129, 7), 
            new EquationId (130, 8), 
            new EquationId (131, 9), 
            new EquationId (132, 10), 
            new EquationId (135, 14), 
            new EquationId (136, 16), 
            new EquationId (137, 17), 
            new EquationId (138, 18), 
            new EquationId (139, 20), 
            new EquationId (140, 21), 
            new EquationId (141, 22), 
            new EquationId (142, 23), 
            new EquationId (143, 24)];

var ids5 = [new EquationId (144, 0), 
            new EquationId (145, 1), 
            new EquationId (146, 2), 
            new EquationId (147, 3), 
            new EquationId (148, 4), 
            new EquationId (149, 5), 
            new EquationId (150, 6), 
            new EquationId (151, 7), 
            new EquationId (152, 8), 
            new EquationId (153, 9), 
            new EquationId (154, 10), 
            new EquationId (155, 11), 
            new EquationId (156, 12), 
            new EquationId (157, 13), 
            new EquationId (158, 14), 
            new EquationId (159, 15), 
            new EquationId (160, 16), 
            new EquationId (162, 18), 
            new EquationId (180, 17)];

var ids6 = [new EquationId (168, 0), 
            new EquationId (169, 1), 
            new EquationId (170, 2), 
            new EquationId (171, 3), 
            new EquationId (172, 4), 
            new EquationId (173, 5), 
            new EquationId (174, 6), 
            new EquationId (176, 7), 
            new EquationId (177, 8), 
            new EquationId (178, 9)];

var ids7 = [new EquationId (187, 0), 
            new EquationId (188, 1), 
            new EquationId (189, 2), 
            new EquationId (190, 3), 
            new EquationId (191, 4), 
            new EquationId (192, 5), 
            new EquationId (193, 6), 
            new EquationId (194, 7), 
            new EquationId (195, 8), 
            new EquationId (196, 9), 
            new EquationId (197, 10), 
            new EquationId (198, 11), 
            new EquationId (199, 12), 
            new EquationId (200, 13)];

//Arrays originais das equações
ids00 = [13, 14, 15, 16, 107, 108, 109, 110, 21, 22, 23, 24, 25, 26];
ids01 = [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
ids02 = [58, 59, 60, 61, 62, 55, 56, 57, 63];
ids03 = [64, 65, 111, 67, 68, 112, 70, 71, 72, 113, 114, 115, 116, 117, 80, 81, 118, 119, 83, 84, 120];
ids04 = [121, 122, 123, 125, 126, 127, 128, 129, 130, 131, 132, 124, 125, 126, 135, 101, 136, 137, 138, 105, 139, 140, 141, 142, 143];
ids05 = [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 180, 162];
ids06 = [168, 169, 170, 171, 172, 173, 174, 176, 177, 178];
ids07 = [187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200];
//
//
//sortedIds0 = [13, 14, 15, 16, 21, 22, 23, 24, 25, 26, 107, 108, 109, 110];
//sortedIds1 = [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
//sortedIds2 = [55, 56, 57, 58, 59, 60, 61, 62, 63];
//sortedIds3 = [64, 65, 67, 68, 70, 71, 72, 80, 81, 83, 84, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120];
//sortedIds4 = [101, 105, 121, 122, 123, 124, 125, 125, 126, 126, 127, 128, 129, 130, 131, 132, 135, 136, 137, 138, 139, 140, 141, 142, 143];
//sortedIds5 = [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 162, 180];
//sortedIds6 = [168, 169, 170, 171, 172, 173, 174, 176, 177, 178];
//sortedIds7 = [187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200];


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