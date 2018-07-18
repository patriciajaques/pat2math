//Colocar uma verificação se o passo digitado é do tipo x=[número]. Se for e estiver correto,
//deve ser identificado como solução da equação, às vezes isso não acontece.

function registerStepInDataBase (type, last, next, typeOperation, element) {
	var correction = correctEquation(next);
	
	$.ajax({
		type : "GET",
		url : "newPatequation/registerStep",
		data : {
			"step" : next,
			"correction" : correction
		},
		success : function(data) {
			console.log(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ocorreu um erro inesperado");
		}
	});
}

function requestServer (type, last, next, typeOperation, element) {
    //type = 'd' -> hint
    //type = 'n' -> new equation
    //type = 'e' -> check the equation

	//Arruma a multiplicação da fração para o servidor
	next = replaceAllMultiplications(next);
    var msg = "";
    if (type === 'd') { //for hint        
        msg = "cassio5;" + type + ";" + last;
    } else {  //for check and for new equation       
        msg = "cassio5;" + type + ";EI:" + last + "#OP:" + typeOperation + "#EXP:" + next;
    }
    //alert(msg);
    console.log("Mensagem enviada ao servidor >>>>> " + msg);
  //Passa os operadores (caracteres especiais) para linguagem URL
    msg = stringToUrl(msg);
    //console.log("Mensagem enviada ao servidor URL >>>>> " + msg);

    //Faz uma requisição no servidor via Java, vai para a classe ResolverController, essa requisição é passada em forma de texto (via URL)
    //e depois que esta informação retorna, passa pelos passos abaixo do ajax
    $.ajax({url: "../../pat2math/resolver?id=" + selectedEquation.id + "&echo="  + msg + "&callback=?", //200.188.161.124 server   //10.210.2.197:8080 cassio
        dataType: 'jsonp',
        success: function(data) {
            //alert(data[0]);
            console.log("Server answer ->  " + data[0]);
            var split = (data[0] + "").split(";");
          
 
            //split[0] = int - id do aluno (não está sendo utilizado)
            //split[1] = boolean - resposta certa
            //split[2] = boolean - operação certa
            //split[3] = boolean - fim da resolução
            //split[4] = String - Mensagem acerto ou erro
            //split[5] = String - Mensagem de feedback para resposta errada
            //split[6] = boolean - se no proximo passo deve ser solicitado a operação
            //split[7] = boolean - se ele pediu uma ajuda na ação anterior e depois acertou
            //split[8] = String - codigo de animacao do agente (tcc do igor)
            //split[9] = boolean - se esse passo pertence a uma equação de segundo grau

            if (split.length >= 10 && split[9] === "true") {
                selectedEquation.twoAnswers = true;
            }

            if (type === 'd') { //for hint        
                //split[0] = string - mensagem de dica             
                //split[1] = int - número de vezes que ele pediu dica por operação
                //split[2] = int - dicas consecutivas total num determinado intervalo (1 min)

            	if (element === null) {
            	if (tryResolveByMyself === true) {
            		firstErrorOrHint();
            	}
            	
            	else {
                var hint = split[0];
                var codeAnim = undefined;

                if (split.length > 1) {
                    codeAnim = split[1];
                }

                element = $(selectedSheet + " .canCopy ul");

                var nextLineServer;
                if (element.parent().html().indexOf("frac") !== -1) {
                    nextLineServer = element.parent().next().next();
                } else {
                    nextLineServer = element.parent().next();
                }

                if (enableAgent)
                	verifyHint(hint, codeAnim);
                //abaixo está o método original

                //////////////////// encontrar e substituir as equacoes por mathml

                //hint = "Os termos 3 e 2 estão ligados por uma operação de multiplicação.";

//                var patt = /<eq( id=(([0-9]+)|((\"|\')[0-9]+(\,[0-9]+)*(\"|\'))))?>([0-9\(\)\+\-\*\/xr\^=])+<\/eq>/gi;
//                var result = hint.match(patt);
//                if (result !== null && result.length > 0) {
//                    for (var i = 0; i < result.length; i++) {
//                        var aux = result[i];
//                        var first = "";
//                        var end = "";
//                        first = aux.substring(0, aux.indexOf(">") + 1);
//                        aux = aux.replace(first, "");
//                        end = aux.substring(aux.indexOf("<"), aux.length);
//                        aux = aux.replace(end, "");
//                        //alert(result[i] + "\n" + aux);
//                        var mathml = textToUserInterface(aux);
//                        aux = "";
//                        for (var j = 0; j < mathml.length; j++) {
//                            aux = aux + mathml[j];
//                        }
//                        //aux = first + aux + end;
//                        hint = hint.replace(result[i], aux);
//                        //alert(aux);
//                    }
//                }
//				  alert(result);


                if (enableAgent)
                	divaLiteTipAction(hint);
                
                else
                	showHint(hint);
                
                var x = $("#hint").offset().left;
                var y = $("#hint").offset().top;

                var scrollTop = $(document).scrollTop();

                if (levelGamification !== "without") {
                	var lostPoints = -2;
                	
                	if (levelGamification === "full") {      			
                		if (freeHints[planoAtual] > 0) {
                			freeHints[planoAtual]--;
                			lostPoints = 0;
                			
                			var contentCookie = freeHints[planoAtual] + "," + (planoAtual);
		        			
                			setCookieDays("freeHints", contentCookie, 1);
                			
                			verifyFreeHints();
                		}
                	}
                	
                	$("#newPoints").css("left", (x + 80) + "px");
                	$("#newPoints").css("top", (y + 5 - scrollTop) + "px");

                	$("#newPoints").text(lostPoints);
                	$("#newPoints").css("color", "orange");

                	$("#newPoints").show("puff", 500, callbackAddPoints(lostPoints));
                }

            }
            }
            
            else {
            	//Caso em que não há mais feedbacks de erro disponíveis, aí mostra uma dica no lugar dele
            	showFeedbackError2(split[0]);
            }
            } else if (type === 'n') {  //for new equation
            	//Se o aluno acertou o passo da equação, esse fluxo alternativo não deve ser executado
            	if (tryResolveByMyself === true) {
            		tryResolveByMyself = false;
            	}
            	
                var valores = splitEquation(data[0]);
                var newHtml = "<ul>";
                for (var i = 0; i < valores.length; i++) {
                    newHtml = newHtml + "<li>" + valores[i] + "</li>";
                }
                newHtml = newHtml + "</ul>";
                $(selectedSheet + ".canCopy").html(newHtml);
                centralizeCanCopy();
                draggable();
                element = $(selectedSheet + " .canCopy ul");


                if (newHtml.indexOf("frac") !== -1) {
                    nextLineServer = element.parent().next().next();
                } else {
                    nextLineServer = element.parent().next();
                }
                nextLineServer.html(
                		//Aqui pode ser o local de se basear para criar mais caixinhas de input ao pressionar "/"
                        "<ul>" +
                        "<li class='labelDefault'><input type='text'></li>" +
                        "</ul>" +
                        "<div class='trash'></div>" +
                        "<button id='button'></button><div id='feedbackError'></div>");
                $(selectedSheet + " .canCopy li").draggable("disable");
                $(selectedSheet + " .canCopy li").css("opacity", "0.5");
                $(selectedSheet + " .canCopy").removeClass("canCopy");
                $(selectedSheet + " .canMove ul").sortable("disable");
                //$(selectedSheet + " .canMove li").attr("contenteditable", "false");
                $(selectedSheet + " .canMove li").css("opacity", "0.75");
                nextLineServer.addClass("canMove");
                element.parent().removeClass("canMove");
                element.parent().addClass("canCopy");

                //element.remove();
                $(element).replaceWith("<div class='cool coolAlign'></div>");
                centralizeCanMoveAndButton();
                coolAlign();
                sortable();
                draggable();
               // trashHide();
                trashClick();
                trashShow();
             //   trashDroppable();
                buttonClick();
                focus();

            } else if (type === 'e') {  //for checking
                var isDelta = false;

                if (split[3] === "true") {
                    var step = new Step(next, NORMAL_SOLUTION);
                    selectedEquation.currentStep = "";

                    //$("#hintBox").slideUp(); //.hide("clip", 1000);
                    $("#hintText").hide('blind', 200);
                    $(".verticalTape").hide('blind', 200);
                    $("#hintText").html("");
                    $("#feedbackError").hide('blind', 200);
                    $("#feedbackError").html("");

                    if (element.parent().html().indexOf("frac") !== -1) {
                        nextLineServer = element.parent().next().next();
                    } else {
                        nextLineServer = element.parent().next();
                    }

                    $(selectedSheet + " .trash").remove();
                    if ((next.indexOf('d') === -1 && selectedEquation.twoAnswers === true && selectedEquation.nAnswers === 2)
                            || (next.indexOf('d') === -1 && selectedEquation.twoAnswers === false)
                            || (next.indexOf('d') === -1 && selectedEquation.twoAnswers === true && next.indexOf("±") !== -1)) {
//                        if ($(element).parent().html().indexOf("<m/>") === -1) {
//                            $(element).parent().next().html("<div class='final'></div>");
//                        } else {
//                            $(element).parent().next().next().html("<div class='final'></div>");
//                        }
                             	    
                    	
                   
                      $("#next_equation").tooltip();
                        $("#marktask"+idEquation).removeAttr("style"); 
                        $("#marktask"+idEquation).addClass("icon-white");
                        
                        tasksRemaining--;
                        
                        if (isTourInterativo)
                        	tasksRemaining = 0;
                        
                        if (tasksRemaining===0){
                        	addProgressValue(100);
                        	
                        	var divName = "#tasks" + unlockedPlans;
                        	$(divName).slideUp(700);
                        	
                        	if (selectedEquation.equation === "x+7=12") {
                        		if (enableKnowledgeTest) {
                        			if (selectedEquation.steps.length === 0)
                        				alternativeFirstStepTour(""); //se o usuário informou a resposta diretamente no primeiro passo da equação
                        	  
                        			else
                        				mainMenu("");
                        		}
                        		
                        		else {
                        			if (selectedEquation.steps.length === 0)
                        				alternativeFirstStepTourWithoutKnowledgeTest(""); //se o usuário informou a resposta diretamente no primeiro passo da equação
                        	  
                        			else
                        				mainMenuWithoutKnowledgeTest("");
                        		}
                        	}
                        	
                        	else if (levelGamification !== "without")
                        		completePlan();
                        	
//                        	else if (numUnlockedPlans == 2)
//                        		setTimeout('plan2Explanation("")', 2000);
                        }
                        
                        else 
                        	addProgressValue(1);
                        
                        selectedEquation.isComplete = true;

                    	nextLineServer.html("<div class='final'></div>");               	
                    	
//                    	var cookieName = "numLines" + currentPos + idEquation; 			           			
//            			setCookieDays (cookieName, "", 0);
                    	
                    	setTimeout(function(){ $("#topics").fadeIn(); blockMenu = true; }, 2000);
                    	     	
                    } else {
                        isDelta = true;
                        step.type = DELTA_SOLUTION;
                    }
                    if (selectedEquation.twoAnswers === true && next.indexOf('d') === -1) {
                        selectedEquation.nAnswers++;
                    }
//                $(".final").position({
//                    of: $(".canMove"),
//                    my: "right center",
//                    at: "right center"
//                });
                    $(element).replaceWith("<div class='cool coolAlign'></div>");
                    $(selectedSheet + " .coolAlign").position({
                        of: $(selectedSheet + " .canMove"),
                        my: "right center",
                        at: "right center"
                    });


                    $(selectedSheet + " .coolAlign").removeClass("coolAlign");

                    $(selectedSheet + " .canCopy li").draggable("disable");

                    if (selectedEquation.twoAnswers === true && next.indexOf("±") === -1) {
                        var html = $(selectedSheet + " .canMove ul").html();
                        if (selectedEquation.nAnswers === 2) {
                            html = html.replace("<mn>x</mn>", "<mn>x\'</mn>");
                            $(selectedSheet + " .canMove ul").html(html);
                            step.type = x1_SOLUTION;
                        } else {
                            html = html.replace("<mn>x</mn>", "<mn>x\"</mn>");
                            $(selectedSheet + " .canMove ul").html(html);
                            step.type = x2_SOLUTION;
                        }
                    }

                    $(selectedSheet + " .canMove li").css("color", "blue");
                    $(selectedSheet + " .canCopy").removeClass("canCopy");
                    $(selectedSheet + " .canMove ul").sortable("disable");
                    //$(selectedSheet + " .canMove li").attr("contenteditable", "false");
                    $(selectedSheet + " .canMove").removeClass("canMove");
                    if (isDelta) {
                        nextLineServer.addClass("canMove");
                        clearLine();

                        if (!selectedEquation.isAnswer()) {
                            selectedEquation.lastStep = null;

                            var x = $(".cool:last").offset().left;
                            var y = $(".cool:last").offset().top;

                            var scrollTop = $(document).scrollTop();

                            if (levelGamification !== "without") {
                            	var winPoints = 10;                      	
                            	$("#newPoints").css("left", (x - 50) + "px");
                            	$("#newPoints").css("top", (y + 5 - scrollTop) + "px");

                            	$("#newPoints").text(winPoints);
                            	$("#newPoints").css("color", "green");

                            	$("#newPoints").show("puff", 500, callbackAddPoints(winPoints));
                            }
                        }
                        //$(".labelDefault").focus();
                    } else {
                    	//Se o aluno acertou o passo da equação, esse fluxo alternativo não deve ser executado
                    	if (tryResolveByMyself === true) {
                    		tryResolveByMyself = false;
                    	}
                        /*addProgressValue(10);*/
                        selectedEquation.lastStep = null;

                        var x = $(".cool:last").offset().left;
                        var y = $(".cool:last").offset().top;

                        var scrollTop = $(document).scrollTop();

                        if (levelGamification !== "without") {
                        	$("#newPoints").css("left", (x - 50) + "px");
                        	$("#newPoints").css("top", (y + 5 - scrollTop) + "px");

                        	var result = selectedEquation.points - selectedEquation.userPoints - selectedEquation.userErrorPoints;
                        	
                        	if (result > 0) {
                        		$("#newPoints").text("+" + result);
                        		$("#newPoints").css("color", "green");                      	
                        		$("#newPoints").show("puff", 500, callbackAddPoints(result));
                        	}
                       }
                        //divaLiteAction("happy;Parabéns! Continue assim amigo...");
                    }
                    selectedEquation.steps.push(step);

                    //element.remove();
//                element.parent().removeClass("canMove");
//                alert("Resposta Correta! =D");
                }
                else if (split[1] === "true" && split[2] === "true") {
                	//Se o aluno acertou o passo da equação, esse fluxo alternativo não deve ser executado
                	if (tryResolveByMyself === true) {
                		tryResolveByMyself = false;
                	}
//                	var cookieName = "numLines" + currentPos + idEquation; 			
//        			var numLinesString = getCookie (cookieName);
//        			var numLines = parseInt (numLinesString);
//        			
//        			if (next.indexOf ("/") !== -1)
//        				numLines--;
//        			
//        			else
//        				numLines -= 2;
//        			
//        			if (numLines <= 1) {
//        				insertLines();
//        				numLines += 4;
//        			}
//        			
//        			setCookieDays (cookieName, numLines, 1);
                	
                    var step = new Step(next, NORMAL_STEP);
                    selectedEquation.lastStep = step;
                    selectedEquation.steps.push(step);
                    selectedEquation.currentStep = "";
                    
                    if (next.indexOf ("/") === -1)
                    	usedLines++;
                    
                    else
                    	usedLines += 2;
                    
                    if (usedLines >= (numLines - 4))
                    	insertLines(false, idEquation);

//                    if (next.indexOf("^2") !== -1) {
//                        selectedEquation.twoAnswers = true;
//                    }

                    if (next.indexOf("a") === -1 && next.indexOf("d") === -1 && selectedEquation.initialEquation === last && selectedEquation.twoAnswers === false) {
                        selectedEquation.initialEquation = next;
                    }

                    $(selectedSheet + " .trash").remove();

                    // $("#hintBox").slideUp(); // .hide("clip", 1000);
                    $("#hintText").hide('blind', 500);
                    $(".verticalTape").hide('blind', 500);
                    $("#hintText").html("");
                    $("#feedbackError").hide('blind', 200);
                    $("#feedbackError").html("");
//                    $("#hintBox").animate({
//                        'opacity': '1',
//                        'top': '0'
//                    }, 2000, function() {
//                        $(document).css('overflow', 'auto');
//                    });

                    if (element.parent().html().indexOf("frac") !== -1) {
                        nextLineServer = element.parent().next().next();
                    } else {
                        nextLineServer = element.parent().next();
                    }
                    nextLineServer.html(
                            "<ul>" +
                            "<li class='labelDefault'><input type='text' id='inputMobile'></li>" +
                            "</ul>" +
                            "<div class='trash'></div>" +
                            "<button id='button'></button><div id='feedbackError'></div>");
                    
                    
                    
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

                    //element.remove();
                    $(element).replaceWith("<div class='cool coolAlign'></div>");
                    centralizeCanMoveAndButton();
                    coolAlign();
                    sortable();
                    draggable();
                 //   trashHide();
                //    trashDroppable();
                    trashClick();
                    buttonClick();
//                    selectedEquation.lastStep = null;
                    focus();


                    if (!selectedEquation.isAnswer()) {

                        var x = $(".cool:last").offset().left;
                        var y = $(".cool:last").offset().top;

                        var scrollTop = $(document).scrollTop();

                        if (levelGamification !== "without") {
                        	var totalPoints = 10 + selectedEquation.userPoints + selectedEquation.userErrorPoints;
                            
                            if (totalPoints <= selectedEquation.points - 5) {
                            	$("#newPoints").css("left", (x - 50) + "px");
                            	$("#newPoints").css("top", (y + 5 - scrollTop) + "px");

                            	$("#newPoints").text("+10");
                            	$("#newPoints").css("color", "green");

                            	$("#newPoints").show("puff", 500, callbackAddPoints(10));
                            }
                        
                        }
                        
                        if (isTourInterativo) {
                        	if (selectedEquation.steps.length === 1)
                        	    firstStepTour("", serverTXT[0], serverTXT[1]);
                        }
                    }        
                }
                else if (split[1] === "false") {
                	if (tryResolveByMyself === true) {
                		firstErrorOrHint();
                	}
                	
                    $(element).css("background", "url('img/bad.png') no-repeat center");
                    $(element).effect("bounce", 500, setTimeout(function() {
                        $(element).removeAttr("style").hide().fadeIn();
                    }, 1000));

                    

//                    $("#hintText").hide('blind', 200);
//                    $(".verticalTape").hide('blind', 200);
//
//                    $("#hintText").html("*Dica: " + hint);
//
//                    $("#hintText").show('blind', 500);
//                    $(".verticalTape").show('fold', 500);


                    var x = $(element).offset().left;
                    var y = $(element).offset().top;

                    var scrollTop = $(document).scrollTop();

                    if (levelGamification !== "without") {
                    	var lostPoints = -5;
                    	
                    	if (levelGamification === "full") {
                    		if (freeErrors[planoAtual] > 0) {
                    			freeErrors[planoAtual]--;
                    			lostPoints = 0;
                    			
                    			var contentCookie = freeErrors[planoAtual] + "," + (planoAtual);
                    			        			
                    			setCookieDays("freeErrors", contentCookie, 1);
                    			verifyFreeErrors();                    		}
                    	}
             
                    	
                    	$("#newPoints").css("left", (x - 50) + "px");
                    	$("#newPoints").css("top", (y + 5 - scrollTop) + "px");

                    	$("#newPoints").text(lostPoints);
                    	$("#newPoints").css("color", "orange");

                    	$("#newPoints").show("puff", 500, callbackAddPoints(lostPoints));
                    }

                    if (selectedEquation.currentStep.indexOf('a') !== -1 && selectedEquation.currentStep.indexOf('b') !== -1 && selectedEquation.currentStep.indexOf('c') !== -1) {
                        var abc = identifyABC(selectedEquation.currentStep);
                        referenceToABC(abc.a, abc.b, abc.c);
                    } else {
                        clearLine();
                        $(selectedSheet + " .labelDefault input").attr("value", selectedEquation.currentStep);
                        $(selectedSheet + " .labelDefault input").css("width", (selectedEquation.currentStep.length + 1) * 16 + "px");
                        centralizeCanMoveAndButton();
                        focus();
                    }
                    
                    if (isTourInterativo) {
                    	if (selectedEquation.steps.length === 1)
                    	    firstStepTour("", serverTXT[2], serverTXT[3]);
                    }

                    document.getElementById('inputMobile').style.border = "1px solid red";
                
                	
                	var hint;
                    if (split[5] !== "" && split[5] !== null && split[5]!== "null") {
                        hint = split[5];
                    } else {
                        hint = split[4];
                    }

                    if (enableAgent)
                    	divaLiteTipAction(hint);
                    
                    else
                    	showFeedbackError(hint);
            	}
                else if (split[1] === "true" && split[2] === "false") {
                    // operação errada
                }else if (split[0] === "você não está logado!"){
                	showHint(split[0]);
                }
            }
            
            
            
        }});      	  
}

function requestServerKnowledgeTest (type, last, next, typeOperation, element) {
    //type = 'd' -> hint
    //type = 'n' -> new equation
    //type = 'e' -> check the equation

	//Arruma a multiplicação da fração para o servidor
	next = replaceAllMultiplications(next);
    var msg = "";
    if (type === 'd') { //for hint        
        msg = "cassio5;" + type + ";" + last;
    } else {  //for check and for new equation       
        msg = "cassio5;" + type + ";EI:" + last + "#OP:" + typeOperation + "#EXP:" + next;
    }
    //alert(msg);
    console.log("Mensagem enviada ao servidor >>>>> " + msg);
  //Passa os operadores (caracteres especiais) para linguagem URL
    msg = stringToUrl(msg);
    //console.log("Mensagem enviada ao servidor URL >>>>> " + msg);

    //Faz uma requisição no servidor via Java, vai para a classe ResolverController, essa requisição é passada em forma de texto (via URL)
    //e depois que esta informação retorna, passa pelos passos abaixo do ajax
    $.ajax({url: "../../pat2math/resolver?id=" + selectedEquation.id + "&echo="  + msg + "&callback=?", //200.188.161.124 server   //10.210.2.197:8080 cassio
        dataType: 'jsonp',
//        async: false,
        success: function(data) {
            //alert(data[0]);
            console.log("Server answer ->  " + data[0]);
            var split = (data[0] + "").split(";");
          
 
            //split[0] = int - id do aluno (não está sendo utilizado)
            //split[1] = boolean - resposta certa
            //split[2] = boolean - operação certa
            //split[3] = boolean - fim da resolução
            //split[4] = String - Mensagem acerto ou erro
            //split[5] = String - Mensagem de feedback para resposta errada
            //split[6] = boolean - se no proximo passo deve ser solicitado a operação
            //split[7] = boolean - se ele pediu uma ajuda na ação anterior e depois acertou
            //split[8] = String - codigo de animacao do agente (tcc do igor)
            //split[9] = boolean - se esse passo pertence a uma equação de segundo grau

            if (split.length >= 10 && split[9] === "true") {
                selectedEquation.twoAnswers = true;
            }

            if (type === 'd') { //for hint        
                //split[0] = string - mensagem de dica             
                //split[1] = int - número de vezes que ele pediu dica por operação
                //split[2] = int - dicas consecutivas total num determinado intervalo (1 min)

                var hint = split[0];
                var codeAnim = undefined;

                if (split.length > 1) {
                    codeAnim = split[1];
                }

                element = $(selectedSheet + " .canCopy ul");

                var nextLineServer;
                if (element.parent().html().indexOf("frac") !== -1) {
                    nextLineServer = element.parent().next().next();
                } else {
                    nextLineServer = element.parent().next();
                }

                if (enableAgent)
                	verifyHint(hint, codeAnim);
                //abaixo está o método original

                //////////////////// encontrar e substituir as equacoes por mathml

                //hint = "Os termos 3 e 2 estão ligados por uma operação de multiplicação.";

//                var patt = /<eq( id=(([0-9]+)|((\"|\')[0-9]+(\,[0-9]+)*(\"|\'))))?>([0-9\(\)\+\-\*\/xr\^=])+<\/eq>/gi;
//                var result = hint.match(patt);
//                if (result !== null && result.length > 0) {
//                    for (var i = 0; i < result.length; i++) {
//                        var aux = result[i];
//                        var first = "";
//                        var end = "";
//                        first = aux.substring(0, aux.indexOf(">") + 1);
//                        aux = aux.replace(first, "");
//                        end = aux.substring(aux.indexOf("<"), aux.length);
//                        aux = aux.replace(end, "");
//                        //alert(result[i] + "\n" + aux);
//                        var mathml = textToUserInterface(aux);
//                        aux = "";
//                        for (var j = 0; j < mathml.length; j++) {
//                            aux = aux + mathml[j];
//                        }
//                        //aux = first + aux + end;
//                        hint = hint.replace(result[i], aux);
//                        //alert(aux);
//                    }
//                }
                //alert(result);


                if (enableAgent)
                	divaLiteTipAction(hint);
                
                else
                	showHint(hint);
                
                var scrollTop = $(document).scrollTop();




            } else if (type === 'n') {  //for new equation

                var valores = splitEquation(data[0]);
                var newHtml = "<ul>";
                for (var i = 0; i < valores.length; i++) {
                    newHtml = newHtml + "<li>" + valores[i] + "</li>";
                }
                newHtml = newHtml + "</ul>";
                $(selectedSheet + ".canCopy").html(newHtml);
                centralizeCanCopy();
                draggable();
                element = $(selectedSheet + " .canCopy ul");


                if (newHtml.indexOf("frac") !== -1) {
                    nextLineServer = element.parent().next().next();
                } else {
                    nextLineServer = element.parent().next();
                }
                nextLineServer.html(
                		//Aqui pode ser o local de se basear para criar mais caixinhas de input ao pressionar "/"
                        "<ul>" +
                        "<li class='labelDefault'><input type='text'></li>" +
                        "</ul>" +
                        "<div class='trash'></div>" +
                        "<button id='button'></button>");
                $(selectedSheet + " .canCopy li").draggable("disable");
                $(selectedSheet + " .canCopy li").css("opacity", "0.5");
                $(selectedSheet + " .canCopy").removeClass("canCopy");
                $(selectedSheet + " .canMove ul").sortable("disable");
                //$(selectedSheet + " .canMove li").attr("contenteditable", "false");
                $(selectedSheet + " .canMove li").css("opacity", "0.75");
                nextLineServer.addClass("canMove");
                element.parent().removeClass("canMove");
                element.parent().addClass("canCopy");

                //element.remove();
                $(element).replaceWith("<div class='cool coolAlign'></div>");
                centralizeCanMoveAndButton();
                coolAlign();
                sortable();
                draggable();
               // trashHide();
                trashClick();
                trashShow();
             //   trashDroppable();
                buttonClick();
                focus();

            } else if (type === 'e') {  //for checking
                var isDelta = false;

                if (split[3] === "true") {
                    var step = new Step(next, NORMAL_SOLUTION);
                    selectedEquation.currentStep = "";

                    if (element.parent().html().indexOf("frac") !== -1) {
                        nextLineServer = element.parent().next().next();
                    } else {
                        nextLineServer = element.parent().next();
                    }

                    $(selectedSheet + " .trash").remove();
                    if ((next.indexOf('d') === -1 && selectedEquation.twoAnswers === true && selectedEquation.nAnswers === 2)
                            || (next.indexOf('d') === -1 && selectedEquation.twoAnswers === false)
                            || (next.indexOf('d') === -1 && selectedEquation.twoAnswers === true && next.indexOf("±") !== -1)) {
//                        if ($(element).parent().html().indexOf("<m/>") === -1) {
//                            $(element).parent().next().html("<div class='final'></div>");
//                        } else {
//                            $(element).parent().next().next().html("<div class='final'></div>");
//                        }
                             	    
                    	
                   
                      $("#next_equation").tooltip();
                        $("#marktask"+idEquation).removeAttr("style"); 
                        $("#marktask"+idEquation).addClass("icon-white");
                        
                        tasksRemaining--;
                        
             
                        if (tasksRemaining===0){
                        	addProgressValue(100);
                        	
                        	var divName = "#tasks" + numUnlockedPlans;
                        	$(divName).slideUp(700);
                        	
                        	numUnlockedPlans++;
                        	
                        	if (numUnlockedPlans === 7)
                            	window.location.reload();
                        	
                        	
                        	divName = "lplan" + numUnlockedPlans;
                        	document.getElementById(divName).innerHTML = '<img src="/pat2math/patequation/img/cadeado_aberto.png"></img>';
       
                        	if (numUnlockedPlans == 1) {
                        		if (enableKnowledgeTest) {
                        			if (selectedEquation.steps.length === 0)
                        				alternativeFirstStepTour(""); //se o usuário informou a resposta diretamente no primeiro passo da equação
                        	  
                        			else
                        				mainMenu("");
                        		}
                        		
                        		else {
                        			if (selectedEquation.steps.length === 0)
                        				alternativeFirstStepTourWithoutKnowledgeTest(""); //se o usuário informou a resposta diretamente no primeiro passo da equação
                        	  
                        			else
                        				mainMenuWithoutKnowledgeTest("");
                        		}
                        	}
                        	
//                        	else if (numUnlockedPlans == 2)
//                        		setTimeout('plan2Explanation("")', 2000);
                        	
//                        	else {
//                        		setTimeout ("newPlan()", 2000);
//                        	}
                        	
                        	divName = "#lplan" + numUnlockedPlans;
                        	setTimeout (function() {$(divName).hide();}, 20000);
                        }
                        
                        else 
                        	addProgressValue(1);
                        
                        selectedEquation.isComplete = true;

                    	nextLineServer.html("<div id='nextEquation' title='Próxima equação' onclick='verifyIdEquationKnowledgeTest()'></div>");               	
                    	
                    	$("#nextEquation").tooltip();
//                    	var cookieName = "numLines" + currentPos + idEquation; 			           			
//            			setCookieDays (cookieName, "", 0);
                    	
                    	setTimeout(function(){ $("#topics").fadeIn(); blockMenu = true; }, 2000);
                    	     	
                    } else {
                        isDelta = true;
                        step.type = DELTA_SOLUTION;
                    }
                    if (selectedEquation.twoAnswers === true && next.indexOf('d') === -1) {
                        selectedEquation.nAnswers++;
                    }
//                $(".final").position({
//                    of: $(".canMove"),
//                    my: "right center",
//                    at: "right center"
//                });
                    $(element).replaceWith("<div class='cool coolAlign'></div>");
                    $(selectedSheet + " .coolAlign").position({
                        of: $(selectedSheet + " .canMove"),
                        my: "right center",
                        at: "right center"
                    });


                    $(selectedSheet + " .coolAlign").removeClass("coolAlign");

                    $(selectedSheet + " .canCopy li").draggable("disable");

                    if (selectedEquation.twoAnswers === true && next.indexOf("±") === -1) {
                        var html = $(selectedSheet + " .canMove ul").html();
                        if (selectedEquation.nAnswers === 2) {
                            html = html.replace("<mn>x</mn>", "<mn>x\'</mn>");
                            $(selectedSheet + " .canMove ul").html(html);
                            step.type = x1_SOLUTION;
                        } else {
                            html = html.replace("<mn>x</mn>", "<mn>x\"</mn>");
                            $(selectedSheet + " .canMove ul").html(html);
                            step.type = x2_SOLUTION;
                        }
                    }

                    $(selectedSheet + " .canMove li").css("color", "blue");
                    $(selectedSheet + " .canCopy").removeClass("canCopy");
                    $(selectedSheet + " .canMove ul").sortable("disable");
                    //$(selectedSheet + " .canMove li").attr("contenteditable", "false");
                    $(selectedSheet + " .canMove").removeClass("canMove");
                    if (isDelta) {
                        nextLineServer.addClass("canMove");
                        clearLine();

                        if (!selectedEquation.isAnswer()) {
                            selectedEquation.lastStep = null;

                            var x = $(".cool:last").offset().left;
                            var y = $(".cool:last").offset().top;

                            var scrollTop = $(document).scrollTop();
                        }
                        //$(".labelDefault").focus();
                    } else {
                        /*addProgressValue(10);*/
                        selectedEquation.lastStep = null;

                        var x = $(".cool:last").offset().left;
                        var y = $(".cool:last").offset().top;

                        var scrollTop = $(document).scrollTop();

                        var result = selectedEquation.points - selectedEquation.userPoints - selectedEquation.userErrorPoints;



                        //divaLiteAction("happy;Parabéns! Continue assim amigo...");
                    }
                    selectedEquation.steps.push(step);

                    //element.remove();
//                element.parent().removeClass("canMove");
//                alert("Resposta Correta! =D");
                }
                else if (split[1] === "true" && split[2] === "true") {
//                	var cookieName = "numLines" + currentPos + idEquation; 			
//        			var numLinesString = getCookie (cookieName);
//        			var numLines = parseInt (numLinesString);
//        			
//        			if (next.indexOf ("/") !== -1)
//        				numLines--;
//        			
//        			else
//        				numLines -= 2;
//        			
//        			if (numLines <= 1) {
//        				insertLines();
//        				numLines += 4;
//        			}
//        			
//        			setCookieDays (cookieName, numLines, 1);
                	
                    var step = new Step(next, NORMAL_STEP);
                    selectedEquation.lastStep = step;
                    selectedEquation.steps.push(step);
                    selectedEquation.currentStep = "";
                    
                    if (next.indexOf ("/") === -1)
                    	usedLines++;
                    
                    else
                    	usedLines += 2;
                    
                    if (usedLines >= (numLines - 4))
                    	insertLines(false, idEquation);

//                    if (next.indexOf("^2") !== -1) {
//                        selectedEquation.twoAnswers = true;
//                    }

                    if (next.indexOf("a") === -1 && next.indexOf("d") === -1 && selectedEquation.initialEquation === last && selectedEquation.twoAnswers === false) {
                        selectedEquation.initialEquation = next;
                    }

                    $(selectedSheet + " .trash").remove();

                    if (element.parent().html().indexOf("frac") !== -1) {
                        nextLineServer = element.parent().next().next();
                    } else {
                        nextLineServer = element.parent().next();
                    }
                    nextLineServer.html(
                            "<ul>" +
                            "<li class='labelDefault'><input type='text' id='inputMobile'></li>" +
                            "</ul>" +
                            "<div class='trash'></div>" +
                            "<button id='button'></button>");
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

                    //element.remove();
                    $(element).replaceWith("<div class='cool coolAlign'></div>");
                    stepCorrect = true;
                    centralizeCanMoveAndButton();
                    coolAlign();
                    sortable();
                    draggable();
                 //   trashHide();
                //    trashDroppable();
                    trashClick();
                    buttonClick();
//                    selectedEquation.lastStep = null;
                    focus();


                    if (!selectedEquation.isAnswer()) {

                        var x = $(".cool:last").offset().left;
                        var y = $(".cool:last").offset().top;

                        var scrollTop = $(document).scrollTop();

                       }        
                }
                else if (split[1] === "false") {                	
                    $(element).css("background", "url('img/bad.png') no-repeat center");
                    stepCorrect = false;
                    $(element).effect("bounce", 500, setTimeout(function() {
                        $(element).removeAttr("style").hide().fadeIn();
                    }, 1000));

                    var hint;
                    if (split[5] !== "" && split[5] !== null && split[5]!== "null") {
                        hint = split[5];
                    } else {
                        hint = split[4];
                    }

                    var x = $(element).offset().left;
                    var y = $(element).offset().top;

                    var scrollTop = $(document).scrollTop();

                    
                    if (selectedEquation.currentStep.indexOf('a') !== -1 && selectedEquation.currentStep.indexOf('b') !== -1 && selectedEquation.currentStep.indexOf('c') !== -1) {
                        var abc = identifyABC(selectedEquation.currentStep);
                        referenceToABC(abc.a, abc.b, abc.c);
                    } else {
                        clearLine();
                        $(selectedSheet + " .labelDefault input").attr("value", selectedEquation.currentStep);
                        $(selectedSheet + " .labelDefault input").css("width", (selectedEquation.currentStep.length + 1) * 16 + "px");
                        centralizeCanMoveAndButton();
                        focus();
                    }
                    
                    document.getElementById('inputMobile').style.border = "1px solid red";
                    errosDisponiveisKnowledgeTest--;
                    if(errosDisponiveisKnowledgeTest==0){
                    	setCookieDays("planoAtualKnowledgeTest", planoAtualKnowledgeTest, 1);
                    	$.ajax({
        					type: "GET",
        					url: "newPatequation/setKnowledgeTest",
        					success:
        						function(data) {
        							console.log(data);
        						},
        					error:
        						 function(XMLHttpRequest, textStatus, errorThrown) {
        					     	alert("Perdão, obtivemos um erro ao processar esta ação.");
        					 	}
        					});	
                    	$.guider({

                			title: serverTXT[4],
                			description: serverTXT[5],    
                			alignButtons: "center",
                			buttons: {
                				OK: {
                					click: function() {location.href = "/pat2math/newpatequation"},
                					className: "primary"
                				}
                			}
                		}).show();
                    }
                }
                else if (split[1] === "true" && split[2] === "false") {
                    // operação errada
                }else if (split[0] === "você não está logado!"){
                	showHint(split[0]);
                }
            }
            
        }});      	  
}

function verifyIdEquationKnowledgeTest() {
	//alert(idEquation);
	//alert(idEquation2);
	if(!equation2){
		nextEquationKnowledgeTest(idEquation2);
	}else{
		knowledgeTest();
	}
}

function getResolution (equation){
	requestResolution(equation);
}

function getStep(){
	requestStep(equation);
}

function requestFinalAnswer() {
	$.ajax({url: "/pat2math/getSteps",
        data: {"lastStep":selectedEquation.equation},
        success: function(data) {
        	var steps = data.steps;
        	var finalStep = steps[0].split(";");
        	finalStep = finalStep[1].split("=");
        	finalAnswerCurrentEquation = finalStep[1];
        }
	});
}

function requestResolution ( ){
	 $.ajax({url: "/pat2math/getSteps",
	        data: {"lastStep":selectedEquation.equation},
	        success: function(data) {
	        	currentStepsFirstEquation = data.steps;
	        }
	 });
}

//Passar os parâmetros pelo data na função de responder as questões
function requestStep(equation){
	var step = "";
	
	$.ajax({url: "/pat2math/getOneStep",
			data: {"lastStep": equation},
			async: false,
			success: function(data){
				var temp = data.split (";");
				step = temp[1];
			}
	});
	
	return step;
}