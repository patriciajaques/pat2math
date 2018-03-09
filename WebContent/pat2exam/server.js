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

            if (type === 'n') {  //for new equation
            	
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

                var verification = next.split("=");
                var v1 = verification[0] === "x";
                var v2 = $.isNumeric(verification[1]);
                
                if (split[3] === "true" || (v1 && v2)) {
                    var step = new Step(next, NORMAL_SOLUTION);
                    selectedEquation.currentStep = "";
                    $(".verticalTape").hide('blind', 200);
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
                        	
                        	var divName = "#tasks" + unlockedPlans;
                        	$(divName).slideUp(700);
                        }
                        
                        else 
                        	addProgressValue(1);
                        
                        selectedEquation.isComplete = true;            	
                    	
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
                        selectedEquation.lastStep = null;

                        var x = $(".cool:last").offset().left;
                        var y = $(".cool:last").offset().top;

                        var scrollTop = $(document).scrollTop();
                    }
                    selectedEquation.steps.push(step);

                    //element.remove();
//                element.parent().removeClass("canMove");
//                alert("Resposta Correta! =D");
                }           	
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

                    $(".verticalTape").hide('blind', 500);

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

                    $(element).replaceWith("<div class='coolExam coolAlign'></div>");
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
            
            
            
        }});      	  
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
	$.ajax({url: "/pat2math/getOneStep",
			data: {"lastStep": equation},
			success: function(data){
				var temp = data.split (";");
				stepWE = temp[1];
				regraWE = temp[0];
			}
	});
}