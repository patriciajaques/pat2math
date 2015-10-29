//Colocar uma verificação se o passo digitado é do tipo x=[número]. Se for e estiver correto,
//deve ser identificado como solução da equação, às vezes isso não acontece.


function requestServer (type, last, next, typeOperation, element) {
    //type = 'd' -> hint
    //type = 'n' -> new equation
    //type = 'e' -> check the equation

	next = replaceAllMultiplications(next);
    var msg = "";
    if (type === 'd') { //for hint        
        msg = "cassio5;" + type + ";" + last;
    } else {  //for check and for new equation       
        msg = "cassio5;" + type + ";EI:" + last + "#OP:" + typeOperation + "#EXP:" + next;
    }
    //alert(msg);
    console.log("Mensagem enviada ao servidor >>>>> " + msg);
    msg = stringToUrl(msg);
    //console.log("Mensagem enviada ao servidor URL >>>>> " + msg);

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

                var hint = split[0];
                var codeAnim = undefined;

                if (split.length > 1) {
                    codeAnim = split[1];
                }

                element = $(selectedSheet + " .canCopy ul");

                nextLineServer;
                if (element.parent().html().indexOf("<mfrac") !== -1) {
                    nextLineServer = element.parent().next().next();
                } else {
                    nextLineServer = element.parent().next();
                }

                //é só comentar essa linha e descomentar a original, para voltar a versão anterior.
                //verifyHint(hint, codeAnim);
                //abaixo está o método original

                //////////////////// encontrar e substituir as equacoes por mathml

                //hint = "Os termos 3 e 2 estão ligados por uma operação de multiplicação.";

                var patt = /<eq( id=(([0-9]+)|((\"|\')[0-9]+(\,[0-9]+)*(\"|\'))))?>([0-9\(\)\+\-\*\/xr\^=])+<\/eq>/gi;
                var result = hint.match(patt);
                if (result !== null && result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        var aux = result[i];
                        var first = "";
                        var end = "";
                        first = aux.substring(0, aux.indexOf(">") + 1);
                        aux = aux.replace(first, "");
                        end = aux.substring(aux.indexOf("<"), aux.length);
                        aux = aux.replace(end, "");
                        //alert(result[i] + "\n" + aux);
                        var mathml = textToMathml(aux);
                        aux = "";
                        for (var j = 0; j < mathml.length; j++) {
                            aux = aux + mathml[j];
                        }
                        aux = "<math>" + aux + "</math>";
                        //aux = first + aux + end;
                        hint = hint.replace(result[i], aux);
                        //alert(aux);
                    }
                }
                //alert(result);


                //divaLiteTipAction(hint);
                showHint(hint);
                
                var x = $("#hint").offset().left;
                var y = $("#hint").offset().top;

                var scrollTop = $(document).scrollTop();

                $("#newPoints").css("left", (x + 80) + "px");
                $("#newPoints").css("top", (y + 5 - scrollTop) + "px");

                $("#newPoints").text("-2");
                $("#newPoints").css("color", "orange");

                $("#newPoints").show("puff", 500, callbackAddPoints(-2));


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


                if (newHtml.indexOf("<mfrac") !== -1) {
                    nextLineServer = element.parent().next().next();
                } else {
                    nextLineServer = element.parent().next();
                }
                nextLineServer.html(
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

                    //$("#hintBox").slideUp(); //.hide("clip", 1000);
                    $("#hintText").hide('blind', 200);
                    $(".verticalTape").hide('blind', 200);
                    $("#hintText").html("");

                    if (element.parent().html().indexOf("<mfrac") !== -1) {
                        nextLineServer = element.parent().next().next();
                    } else {
                        nextLineServer = element.parent().next();
                    }

                    $(selectedSheet + " .trash").remove();
                    if ((next.indexOf('d') === -1 && selectedEquation.twoAnswers === true && selectedEquation.nAnswers === 2)
                            || (next.indexOf('d') === -1 && selectedEquation.twoAnswers === false)
                            || (next.indexOf('d') === -1 && selectedEquation.twoAnswers === true && next.indexOf("±") !== -1)) {
//                        if ($(element).parent().html().indexOf("<mfrac>") === -1) {
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
                        	
                        	var divName = "#tasks" + numUnlockedPlans;
                        	$(divName).slideUp(700);
                        	
                        	if ((numUnlockedPlans > 0 && numUnlockedPlans < 8) || numUnlockedPlans >= 10)
                        		numUnlockedPlans++;
                        	
                        	else
                        		numUnlockedPlans = 10;
                        	
                        	divName = "lplan" + numUnlockedPlans;
                        	document.getElementById(divName).innerHTML = '<img src="/pat2math/patequation/img/cadeado_aberto.png"></img>';
       
                        	if (numUnlockedPlans == 2) {
                        		if (selectedEquation.steps.length === 0)
        	                		alternativeFirstStepTour(""); //se o usuário informou a resposta diretamente no primeiro passo da equação
                        	  
                        		else
                        		    mainMenu("");
                        	}
                        	
                        	else if (numUnlockedPlans == 3)
                        		plan2Explanation("");
                        	
                        	else {
                        		if (numUnlockedPlans > 10) {
                        			document.getElementById("lplan12").innerHTML = '<img src="/pat2math/patequation/img/cadeado_aberto.png"></img>';
                        			document.getElementById("lplan13").innerHTML = '<img src="/pat2math/patequation/img/cadeado_aberto.png"></img>';
                        			document.getElementById("lplan14").innerHTML = '<img src="/pat2math/patequation/img/cadeado_aberto.png"></img>';
                        			document.getElementById("lplan15").innerHTML = '<img src="/pat2math/patequation/img/cadeado_aberto.png"></img>';
                        			document.getElementById("lplan16").innerHTML = '<img src="/pat2math/patequation/img/cadeado_aberto.png"></img>';
                        			document.getElementById("lplan17").innerHTML = '<img src="/pat2math/patequation/img/cadeado_aberto.png"></img>';
                        			document.getElementById("lplan18").innerHTML = '<img src="/pat2math/patequation/img/cadeado_aberto.png"></img>';
                        			document.getElementById("lplan19").innerHTML = '<img src="/pat2math/patequation/img/cadeado_aberto.png"></img>';
                        			document.getElementById("lplan20").innerHTML = '<img src="/pat2math/patequation/img/cadeado_aberto.png"></img>';
                        			document.getElementById("lplan21").innerHTML = '<img src="/pat2math/patequation/img/cadeado_aberto.png"></img>';  
                        			setTimeout (function() {$("#lplan12").hide();}, 20000);
                        			setTimeout (function() {$("#lplan13").hide();}, 20000);
                        			setTimeout (function() {$("#lplan14").hide();}, 20000);
                        			setTimeout (function() {$("#lplan15").hide();}, 20000);
                        			setTimeout (function() {$("#lplan16").hide();}, 20000);
                        			setTimeout (function() {$("#lplan17").hide();}, 20000);
                        			setTimeout (function() {$("#lplan18").hide();}, 20000);
                        			setTimeout (function() {$("#lplan19").hide();}, 20000);
                        			setTimeout (function() {$("#lplan20").hide();}, 20000);
                        			setTimeout (function() {$("#lplan21").hide();}, 20000);
                        		}
                        			
                        	    setTimeout ("newPlan()", 2000);
                        	}
                        	
                        	divName = "#lplan" + numUnlockedPlans;
                        	setTimeout (function() {$(divName).hide();}, 20000);
                        }
                        else addProgressValue(progressvalue);
                        selectedEquation.isComplete = true;
                        
                      //Verifica se o ID da equação atual não é o da última equação de um dos planos de aula                                        162
                    	if (idEquation !== 26 && idEquation !== 49 && idEquation !== 63 && idEquation !== 120 && idEquation !== 143 && idEquation !== 167 && idEquation !== 178 && idEquation !== 200 && idEquation !== 201 && idEquation !== 219 && idEquation !== 256 && idEquation !== 240 && idEquation !== 299 && idEquation !== 257 && idEquation !== 269 && idEquation !== 320 && idEquation !== 292 && idEquation !== 312)                  		
                            showNextButton (nextLineServer);
                    	
                    	else 
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

                            $("#newPoints").css("left", (x - 50) + "px");
                            $("#newPoints").css("top", (y + 5 - scrollTop) + "px");

                            $("#newPoints").text("+10");
                            $("#newPoints").css("color", "green");

                            $("#newPoints").show("puff", 500, callbackAddPoints(10));
                        }
                        //$(".labelDefault").focus();
                    } else {
                        /*addProgressValue(10);*/
                        selectedEquation.lastStep = null;

                        var x = $(".cool:last").offset().left;
                        var y = $(".cool:last").offset().top;

                        var scrollTop = $(document).scrollTop();

                        $("#newPoints").css("left", (x - 50) + "px");
                        $("#newPoints").css("top", (y + 5 - scrollTop) + "px");

                        var result = selectedEquation.points - selectedEquation.userPoints - selectedEquation.userErrorPoints;

                        $("#newPoints").text("+" + result);
                        $("#newPoints").css("color", "green");


                        $("#newPoints").show("puff", 500, callbackAddPoints(result));

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

                    // $("#hintBox").slideUp(); // .hide("clip", 1000);
                    $("#hintText").hide('blind', 500);
                    $(".verticalTape").hide('blind', 500);
                    $("#hintText").html("");
//                    $("#hintBox").animate({
//                        'opacity': '1',
//                        'top': '0'
//                    }, 2000, function() {
//                        $(document).css('overflow', 'auto');
//                    });


                    if (element.parent().html().indexOf("<mfrac") !== -1) {
                        nextLineServer = element.parent().next().next();
                    } else {
                        nextLineServer = element.parent().next();
                    }
                    nextLineServer.html(
                            "<ul>" +
                            "<li class='labelDefault'><input type='text'></li>" +
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

                        $("#newPoints").css("left", (x - 50) + "px");
                        $("#newPoints").css("top", (y + 5 - scrollTop) + "px");

                        $("#newPoints").text("+10");
                        $("#newPoints").css("color", "green");

                        $("#newPoints").show("puff", 500, callbackAddPoints(10));
                        
                        if (isTourInterativo) {
                        	if (selectedEquation.steps.length === 1)
                        	    firstStepTour("", "Muito bem!", "Por acertar este passo da equação, você ganhou 10 pontos.");
                        }
                    }        
                }
                else if (split[1] === "false") {
                    $(element).css("background", "url('img/bad.png') no-repeat center");
                    $(element).effect("bounce", 500, setTimeout(function() {
                        $(element).removeAttr("style").hide().fadeIn();
                    }, 1000));

                    var hint;
                    if (split[5] !== "" && split[5] !== null && split[5]!== "null") {
                        hint = split[5];
                    } else {
                        hint = split[4];
                    }

                    // divaLiteTipAction(hint);
                    showHint(hint);

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

                    $("#newPoints").css("left", (x - 50) + "px");
                    $("#newPoints").css("top", (y + 5 - scrollTop) + "px");

                    $("#newPoints").text("-5");
                    $("#newPoints").css("color", "orange");

                    $("#newPoints").show("puff", 500, callbackAddPoints(-5));


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
                    	    firstStepTour("", "Oops!", "Por errar este passo da equação, você perdeu 5 pontos e recebeu uma dica.");
                    }

                }
                else if (split[1] === "true" && split[2] === "false") {
                    // operação errada
                }else if (split[0]=== "você não está logado!"){
                	showHint(split[0]);
                }
            }
            
            if (isWorkedExample) {
            	if (idEquation === 13) {
        		    var cookieName = "showTutorial" + currentPos;
        		    var numClicks = getCookie (cookieName);
        		    
        		    if (numClicks === "") {
        		        setCookieDays (cookieName, "1", 1);
        		        window.location.reload();
        		    }
        		    
        		    else {
        		    	if (numClicks === "1"){	    
        		    	    setCookieDays (cookieName, "finish", 1);
        		        }
        		    	
        		    	showExplanation();
        		    	
        		    }
        		}             	
            	window.location.reload();         	
            }
        }});
    
    if (isWorkedExample)
        setTimeout ('window.location.reload()', 2000);
    	
    
}

function showNextButton ( ) {
	 setTimeout(function(){ nextLineServer.html("<div class='final'></div><div id='next_equation' title='Próxima Equação' onclick='loadingShow(); nextEquationClick(); loadingHide();' ><img src=/pat2math/patequation/img/next_equation.png></div>"); }, 2000);
	
}

function getResolution (equation){
	requestResolution(equation);
}

function getStep(){
	requestStep(equation);
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
	$.ajax({url: "/pat2math/getOneStep",
			data: {"lastStep": equation},
			success: function(data){
				var temp = data.split (";");
				stepWE = temp[1];
				regraWE = temp[0];
			}
	});
}