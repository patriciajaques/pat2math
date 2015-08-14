function openTour (nextStep, exitEsc) {	
	if (nextStep !== "" && exitEsc === false) {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Parece que tivemos problemas na sessão anterior </center>",
			description : "Vamos continuar o tour de onde paramos?",
			overlay : "dark",
			width : 600,
			alignButtons : "center",
			buttons : {
				"Não, obrigado." : {
				click : function() {exit();}
				},
				"Desejo recomeçar o tour." : {
					click: function() {restartTour("", false);},
				},
				"Sim, por favor." : {
					click : true,
					className : "primary",
					focus : true
				}
			}
		}).show();
	}
	
	else if (nextStep !== "" && exitEsc === true) {
		$.guider({
			next : nextStep,
			title : "É isso aí!",
			description : "Vamos continuar o tour a partir do ponto em que paramos.",
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
	}
	
	else {
	$.guider({
		next : "start2",
		title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Bem-vindo! </center>",
		description : "<center>Você deseja passar pelo nosso tour interativo antes de começar?</center>",
		overlay : "dark",
		width : 600,
		alignButtons : "center",
		buttons : {
			"Não, obrigado." : {
			click : function() {exit();}
			},
			"Só se for agora!" : {
				click : true,
				className : "primary",
				focus : true
			}
		}
	}).show();
	}
	
	$().guider({
		name: "start2",
		next: "start3",
		title: "Ótimo! Você verá que é muito fácil e divertido utilizar esse programa",
		description: 'A qualquer momento você pode sair deste tour pressionando <font color="red">ESC</font>',                             
        hashable: true,
		position: "right",
		alignButtons: "center",
        overlay: "dark",
		buttons: {
			"Vamos começar!": {
				click: true,
				className: "primary"
			}
		}
	});
	
	$("#topics").guider({
		name: "start3",
		next: "start4",
		title: "Este é o menu principal",
		description: "Aqui você pode selecionar os planos de aula e suas respectivas equações para resolver.",       
		position: "right",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "start3", 1); setCookieDays (cFunctionTour, "openTour", 1);},
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$(".topic").guider({
		name: "start4",
		title: "Acesso às Equações",
		description: "Clique neste botão para conferir a equação do plano de aula especial do tour.",     
		position: "right",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "start4", 1); setCookieDays (cFunctionTour, "openTour", 1);},
		buttons: {
			Voltar: true,
			OK: {
				click: true,
				className: "primary"
			}
		}
	}); 
}

function clickTour (nextStep, exitEsc) {	
	isTourInterativo = true;
	blockMenu = true;	
	$("#topics").fadeIn();
	$("#topicsAux").hide();
	
	if (nextStep !== "" && exitEsc === false) {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Parece que tivemos problemas na sessão anterior </center>",
			description : "Vamos continuar o tour de onde paramos?",
			overlay : "dark",
			width : 600,
			closable: true,
			alignButtons : "center",
			buttons : {
				"Não, obrigado." : {
				    click : function() {exit();}
				},
				"Desejo recomeçar o tour." : {
					click: function() {restartTour("", false);},
				},
				"Sim, por favor." : {
					click : true,
					className : "primary",
					focus : true
				}		
			}
		}).show();
	}
	
	else if (nextStep !== "" && exitEsc === true) {
		$.guider({
			next : nextStep,
			title : "É isso aí!",
			description : "Vamos continuar o tour a partir do ponto em que paramos.",
			width : 600,
			alignButtons : "right",
			buttons : {
				Próximo: {
					click : true,
					className : "primary",
				}
			}
		}).show();
	}

	else {
	$.guider({
		next : "start2",
		title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Olá! </center>",
		description : "<center>Você deseja passar pelo nosso tour interativo para entender as principais funcionalidades do PAT2Math?</center>",
		overlay : "dark",
		width : 600,
		alignButtons : "center",
		buttons : {
			"Não, obrigado." : {
			click : function() {exit();}
			},
			"Só se for agora!" : {
				click : true,
				className : "primary",
				focus : true
			}
		}
	}).show();
	}
	
	$().guider({
		name: "start2",
		next: "start3",
		title: "Ótimo! Você verá que é muito fácil e divertido utilizar esse programa",
		description: 'A qualquer momento você pode sair deste tour pressionando <font color="red">ESC</font>',                             
        hashable: true,
		position: "right",
		alignButtons: "center",
        overlay: "dark",
        onShow: function() {setCookieDays (cStepTour, "start3", 1); setCookieDays (cFunctionTour, "clickTour", 1);},
		buttons: {
			"Vamos começar!": {
				click: true,
				className: "primary"
			}
		}
	});
	
	$("#topics").guider({
		name: "start3",
		next: "start4",
		title: "Este é o menu principal",
		description: "Aqui você pode selecionar os planos de aula e suas respectivas equações para resolver.",       
		position: "right",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "start3", 1); setCookieDays (cFunctionTour, "clickTour", 1); var cookieName = "openTour" + currentPos; setCookieDays (cookieName, "", 0);},
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$(".topic").guider({
		name: "start4",
		title: "Acesso às Equações",
		description: "Clique neste botão para conferir a equação do plano de aula especial do tour.",     
		position: "right",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "start4", 1); setCookieDays (cFunctionTour, "clickTour", 1);},
		buttons: {
			Voltar: true,
			OK: {
				click: true,
				className: "primary"
			}
		}
	}); 
}

function restartTour (nextStep, exitEsc) {	
	isTourInterativo = true;
	blockMenu = true;	
	$("#topics").fadeIn();
	$("#topicsAux").hide();
	
	$.guider({
		next : "restart2",
		title : "Ótimo! Você verá que é muito fácil e divertido utilizar esse programa",
		description : 'A qualquer momento você pode sair deste tour pressionando <font color="red">ESC</font>',  
		overlay : "dark",
		alignButtons : "center",
		buttons : {
			"Vamos começar!" : {
				click : true,
				className : "primary"
			}
		}
	}).show();
	
	$("#topics").guider({
		name: "restart2",
		next: "restart3",
		title: "Este é o menu principal",
		description: "Aqui você pode selecionar os planos de aula e suas respectivas equações para resolver.",       
		position: "right",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "start3", 1); setCookieDays (cFunctionTour, "clickTour", 1); var cookieName = "openTour" + currentPos; setCookieDays (cookieName, "", 0);},
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$(".topic").guider({
		name: "restart3",
		title: "Acesso às Equações",
		description: "Clique neste botão para conferir a equação do plano de aula especial do tour.",     
		position: "right",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "start4", 1); setCookieDays (cFunctionTour, "clickTour", 1);},
		buttons: {
			Voltar: true,
			OK: {
				click: true,
				className: "primary"
			}
		}
	}); 
}

function exit ( ) {
	$.guider({	
	}).hideAll();
	
	isTourInterativo = false; 
	blockMenu = false;
	
	if (selectedEquation !== null) {
	    $("#topics").fadeOut();
        $("#topicsAux").show();
	}
    
    var pos = getCookie ("pos");
	var cookieName = "stepTour" + pos;
	setCookieDays (cookieName, "", 0);
	cookieName = "functionTour" + pos;
	setCookieDays (cookieName, "", 0);
	cookieName = "openTour" + pos;
	setCookieDays (cookieName, "false", 7);
}

function checkTour (exitEsc) {
	isTourInterativo = true;
	var pos = getCookie ("pos");
	var cookieName = "stepTour" + pos;
	var nextStep = getCookie (cookieName);
    cookieName = "functionTour" + pos;
    var functionTour = getCookie (cookieName);
    
    if (functionTour === "" || functionTour === "openTour" || functionTour === "clickTour" || functionTour === "clickPlan") {
    	blockMenu = true;	
    	$("#topics").fadeIn();
    	$("#topicsAux").hide();
    	
    	if (functionTour === "" || functionTour === "openTour")
    	    openTour (nextStep, exitEsc);
    	
    	else if (functionTour === "clickTour") 
    	    clickTour (nextStep, exitEsc);
    	
    	else
        	clickPlan (nextStep, exitEsc);	    
    }
       
    else if (functionTour === "clickEquation") 
    	clickEquation (nextStep, exitEsc);
    
    else if (functionTour === "clickEquationSlim") 
    	clickEquationSlim (nextStep, exitEsc);
    
    else if (functionTour === "clickEquationPartiallyResolved") 
    	clickEquationPartiallyResolved (nextStep, exitEsc);
     
    else if (functionTour === "firstStepTour") 
    	firstStepTour (nextStep, exitEsc);
    
    else if (functionTour === "alternativeFinalStepTour")
    	alternativeFinalStepTour (nextStep, exitEsc);
    
    else {
    	alert ("Os cookies em seu navegador não estão habilitados corretamente.");
    	exit();
    }
}

function exitEsc ( ) {
	$.guider({
		title: "A tecla esc foi pressionada",
		description: "Você realmente deseja sair do tour?",
                closable: true,
                alignButtons: "center",
		buttons: {
			"Sim" : {
			click : function() {exit();}
			},
			"Não, quero continuar" : {
				click : function() {checkTour(true);},
				className : "primary",
				focus : true
			}
                     }
		}).show();      
}
function clickEquation (nextStep, exitEsc) {
	if (nextStep !== "" && exitEsc === false) {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Parece que tivemos problemas na sessão anterior </center>",
			description : "Vamos continuar o tour de onde paramos?",
			overlay : "dark",
			width : 600,
			alignButtons : "center",
			buttons : {
				"Não, obrigado." : {
				click : function() {exit();}
				},
				"Desejo recomeçar o tour." : {
					click: function() {restartTour("", false);},
				},
				"Sim, por favor." : {
					click : true,
					className : "primary",
					focus : true
				}
			}
		}).show();
	}
	
	else if (nextStep !== "" && exitEsc === true) {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> É isso aí!",
			description : "Vamos continuar o tour a partir do ponto em que paramos.",
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
	}
	
	else if (nextStep === "" || nextStep === "main"){
	$.guider({
		name: "main",
		next: "main2",
		title: "Esta é a sua interface principal",
		description: "Aqui estão as principais funcionalidades que você utilizará para resolver as equações do PAT2Math.<br>Continue com o tour para descobrir!",
	    alignButtons: "right", 
	    onShow: function() {setCookieDays (cStepTour, "main", 1); setCookieDays (cFunctionTour, "clickEquation", 1);},
	    buttons: {
	    	Próximo: {
                click: true,
                className: "primary"
            }
	    }
		}).show();
	}
	
	$("#topicsAux").guider({
		name: "main2",
		next: "main3",
		title: "O menu principal sumiu!",
		description: "Sem problemas. Apenas passe o mouse neste local que ele reaparecerá!",    
		position: "right",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "main2", 1); setCookieDays (cFunctionTour, "clickEquation", 1);},
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$("#linha3").guider({
		name: "main3",
		next: "main4",
		title: "As equações iniciais sempre estarão na primeira linha",
		description: "Para resolvê-las, basta clicar nas caixas de texto nas linhas abaixo delas e digitar o próximo passo.",    
		position: "bottom",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "main3", 1); setCookieDays (cFunctionTour, "clickEquation", 1);},
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$("#linha3").guider({
		name: "main4",
        next: "main5",
		title: "Agora, nós vamos resolver esta equação passo-a-passo",
		description: 'Você pode começar a resolução da forma que preferir, mas sugerimos que adicione "+2x" nos dois lados da equação para simplificar o segundo lado e manter a equação balanceada.',  
		width: 600,
		position: "bottom",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "main4", 1); setCookieDays (cFunctionTour, "clickEquation", 1);},
		buttons: {
            Voltar: true,
			Próximo: {
               click: true,
               className: "primary"
            }
		}
	});
            
    $("#linha3").guider({
		name: "main5",
		title: "Veja como é fácil",
		description: 'Digite x+2x+15=45-2x+2x e tecle enter ou clique no ícone<img src=/pat2math/patequation/img/lupa.png></img> localizado ao final da linha.',    
		width: 620,
		position: "bottom",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "main5", 1); setCookieDays (cFunctionTour, "clickEquation", 1);},
		buttons: {
			Voltar: true,
			OK: {
				click: true,
				className: "primary"
			}
		}
	});
}

function clickEquationSlim (nextStep, exitEsc) {
	if (nextStep !== "" && exitEsc === false) {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Parece que tivemos problemas na sessão anterior </center>",
			description : "Vamos continuar o tour de onde paramos?",
			overlay : "dark",
			width : 600,
			alignButtons : "center",
			buttons : {
				"Não, obrigado." : {
				click : function() {exit();}
				},
				"Desejo recomeçar o tour." : {
					click: function() {restartTour("", false);},
				},
				"Sim, por favor." : {
					click : true,
					className : "primary",
					focus : true
				}
			}
		}).show();
	}
	
	else if (nextStep !== "" && exitEsc === true) {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> É isso aí!",
			description : "Vamos continuar o tour a partir do ponto em que paramos.",
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
	}
	
	else if (nextStep === "" || nextStep === "smain"){
	$.guider({
		name: "smain",
		next: "smain2",
		title: "Verificamos que a equação já foi resolvida",
		description: "Vamos avançar um pouco no nosso tour para verificar outros detalhes importantes. ",
	    alignButtons: "right", 
	    onShow: function() {setCookieDays (cStepTour, "smain", 1); setCookieDays (cFunctionTour, "clickEquationSlim", 1);},
	    buttons: {
	    	Próximo: {
                click: true,
                className: "primary"
            }
	    }
		}).show();
	}
	
	$("#topicsAux").guider({
		name: "smain2",
		next: "smain3",
		title: "O menu principal sumiu!",
		description: "Sem problemas. Apenas passe o mouse neste local que ele reaparecerá!",    
		position: "right",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "smain2", 1); setCookieDays (cFunctionTour, "clickEquationSlim", 1);},
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
    $("#note").guider({
		name: "smain3",
		next: "smain4",
		title: "Observe este painel",
		description: "Ele contém o seu progresso na resolução das equações e mostra a sua pontuação da página atual.",
		position: "left",
		alignButtons: "right",
		closable: true, 
		onShow: function() {setCookieDays (cStepTour, "smain3", 1); setCookieDays (cFunctionTour, "clickEquationSlim", 1);},
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
    
    $("#note").guider({
		name: "smain4",
		next: "smain5",
		title: "Pontuação",
		description: "Ao acertar um passo na equação, você ganha 10 pontos.<br>E se errar, você perde 5 pontos e recebe uma dica.",
		position: "left",
		alignButtons: "right",
		closable: true, 
		onShow: function() {setCookieDays (cStepTour, "smain4", 1); setCookieDays (cFunctionTour, "clickEquationSlim", 1);},
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
    
    $("#hint").guider({
		name: "smain5",
		next: "smain6",
		title: "Pedindo dicas",
		description: "Sempre que você estiver perdido em algum passo de uma equação, sinta-se à vontade de solicitar ajuda, clicando neste botão.",
		position: "bottom",
		alignButtons: "right",
		closable: true,
		onShow: function() {setCookieDays (cStepTour, "smain5", 1); setCookieDays (cFunctionTour, "clickEquationSlim", 1);},
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
    
    $("#help").guider({
		name: "smain6",
		next: "smain7",
		title: "Teclas utilizadas",
		description: "Caso tenha dúvidas referentes às teclas utilizadas nas operações e interações com o programa, clique neste botão para conferir a lista completa.",
		position: "left",
		alignButtons: "right",
		closable: true, 
		onShow: function() {setCookieDays (cStepTour, "smain6", 1); setCookieDays (cFunctionTour, "clickEquationSlim", 1);},
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
    
    $("#tour").guider({
		name: "smain7",
		title: "Você está liberado!",
		description: "Se desejar, você pode acessar a este tour novamente clicando neste botão.",
		position: "left",
		alignButtons: "right",
		closable: true, 
		onHide: function() {exit();},
		onShow: function() {setCookieDays (cStepTour, "smain7", 1); setCookieDays (cFunctionTour, "clickEquationSlim", 1);},
		buttons: {
			Voltar: true,
			Finalizar: {
                click: true,
                className: "primary"
            }
		}
	});
}

function clickEquationPartiallyResolved (nextStep, exitEsc) {
	if (nextStep !== "" && exitEsc === false) {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Parece que tivemos problemas na sessão anterior </center>",
			description : "Vamos continuar o tour de onde paramos?",
			overlay : "dark",
			width : 600,
			alignButtons : "center",
			buttons : {
				"Não, obrigado." : {
				click : function() {exit();}
				},
				"Desejo recomeçar o tour." : {
					click: function() {restartTour("", false);},
				},
				"Sim, por favor." : {
					click : true,
					className : "primary",
					focus : true
				}
			}
		}).show();
	}
	
	else if (nextStep !== "" && exitEsc === true) {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> É isso aí!",
			description : "Vamos continuar o tour a partir do ponto em que paramos.",
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
	}
	
	else if (nextStep === "" || nextStep === "pmain"){
	$.guider({
		name: "pmain",
		next: "pmain2",
		title: "Esta é a sua interface principal",
		description: "Aqui estão as principais funcionalidades que você utilizará para resolver as equações do PAT2Math.<br>Continue com o tour para descobrir!",
	    alignButtons: "right", 
	    onShow: function() {setCookieDays (cStepTour, "pmain", 1); setCookieDays (cFunctionTour, "clickEquationPartiallyResolved", 1);},
	    buttons: {
	    	Próximo: {
                click: true,
                className: "primary"
            }
	    }
		}).show();
	}
	
	$("#topicsAux").guider({
		name: "pmain2",
		next: "pmain3",
		title: "O menu principal sumiu!",
		description: "Sem problemas. Apenas passe o mouse neste local que ele reaparecerá!",    
		position: "right",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "pmain2", 1); setCookieDays (cFunctionTour, "clickEquationPartiallyResolved", 1);},
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$.guider({
		name: "pmain3",
		next: "pmain4",
		title: "As equações iniciais sempre estarão na primeira linha",
		description: "Para resolvê-las, basta clicar nas caixas de texto nas linhas abaixo delas e digitar o próximo passo.",    
		position: "bottom",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "pmain3", 1); setCookieDays (cFunctionTour, "clickEquationPartiallyResolved", 1);},
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$("#note").guider({
    	name: "pmain4",
    	next: "pmain5",
    	title: "Observe este painel",
    	description: "Ele contém o seu progresso na resolução das equações e mostra a sua pontuação da página atual.",
    	position: "left",
    	alignButtons: "right",
    	onShow: function() {setCookieDays (cStepTour, "pmain4", 1); setCookieDays (cFunctionTour, "clickEquationPartiallyResolved", 1);},
    	buttons: {
    		Voltar: true,
    		Próximo: {
    			click: true,
    			className: "primary"
    		}
    	}
    	});
    	    
    	    $("#note").guider({
    			name: "pmain5",
    			next: "pmain6",
    			title: "Pontuação",
    			description: "Toda vez que acertar um passo na equação, você ganha 10 pontos.<br>E se errar, você perde 5 pontos e recebe uma dica.",
    			position: "left",
    			alignButtons: "right",
    			onShow: function() {setCookieDays (cStepTour, "pmain5", 1); setCookieDays (cFunctionTour, "clickEquationPartiallyResolved", 1);},
    			buttons: {
    				Voltar: true,
    				Próximo: {
    					click: true,
    					className: "primary"
    				}
    			}
    		});
    	    
    	    $("#hint").guider({
    			name: "pmain6",
    			next: "pmain7",
    			title: "Pedindo dicas",
    			description: "Sempre que você estiver perdido em algum passo de uma equação, sinta-se à vontade de solicitar ajuda, clicando neste botão.",
    			position: "bottom",
    			alignButtons: "right",
    			onShow: function() {setCookieDays (cStepTour, "pmain6", 1); setCookieDays (cFunctionTour, "clickEquationPartiallyResolved", 1);},
    			buttons: {
    				Voltar: true,
    				Próximo: {
    					click: true,
    					className: "primary"
    				}
    			}
    		});
    	    
    	    $("#help").guider({
    	    	name: "pmain7",
    			next: "pmain8",
    	    	title: "Teclas utilizadas",
    	    	description: "Caso tenha dúvidas referentes às teclas utilizadas nas operações e interações com o programa, clique neste botão para conferir a lista completa.",
    	    	position: "left",
    	    	alignButtons: "right",
    	    	closable: true, 
    	    	onShow: function() {setCookieDays (cStepTour, "pmain7", 1); setCookieDays (cFunctionTour, "clickEquationPartiallyResolved", 1);},
    	    	buttons: {
    	    		Voltar: true,
    	    		Próximo: {
    	    			click: true,
    	    			className: "primary"
    	    		}
    	    	}
    	    	});
    	    
    	    $.guider({
    			name: "pmain8",
    			title: "Agora é com você",
    			description: "Continue resolvendo a equação da forma que preferir. Quando terminar, nós lhe passaremos mais algumas orientações.",
    			alignButtons: "right",
    			onShow: function() {setCookieDays (cStepTour, "pmain8", 1); setCookieDays (cFunctionTour, "clickEquationPartiallyResolved", 1);},
    			buttons: {
    				Voltar: true,
    				OK: {
    					click: true,
    					className: "primary"
    				}
    			}
    		});
}
function clickPlan (nextStep, exitEsc) {
	if (nextStep !== "" && exitEsc === false) {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Parece que tivemos problemas na sessão anterior </center>",
			description : "Vamos continuar o tour de onde paramos?",
			overlay : "dark",
			width : 600,
			alignButtons : "center",			
			buttons : {
				"Não, obrigado." : {
				click : function() {exit();}
				},
				"Desejo recomeçar o tour." : {
					click: function() {restartTour("", false);},
				},
				"Sim, por favor." : {
					click : true,
					className : "primary",
					focus : true
				}
			}
		}).show();
	}
	
	else if (nextStep !== "" && exitEsc === true) {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> É isso aí!",
			description : "Vamos continuar o tour a partir do ponto em que paramos.",
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
	}
	
	else if (nextStep === "" || nextStep === "plan"){
	$.guider({
		name: "plan",
		next: "plan2",
		title: "Planos de Aula",
		description: "Os planos de aula são como as fases de um jogo. Cada plano possui várias equações, que podem ser resolvidas na ordem que você quiser. ",
	    alignButtons: "right", 
	    onShow: function() {setCookieDays (cStepTour, "plan", 1); setCookieDays (cFunctionTour, "clickPlan", 1);},
	    buttons: {
	    	Próximo: {
                click: true,
                className: "primary"
            }
	    }
		}).show();
	}
	
	$("#tasks9").guider({
		name: "plan2",
		title: "Clique nesta equação",
		description: "Vamos resolvê-la passo-a-passo para entender as principais funcionalidades do PAT2Math.",
		alignButtons: "right",
		position: "right",
		onShow: function() {setCookieDays (cStepTour, "plan2", 1); setCookieDays (cFunctionTour, "clickPlan", 1);},
		buttons: {
			Voltar: true,
			OK: {
				click: true,
				className: "primary"
			}
		}
	});
}



function firstStepTour (nextStep, exitEsc) {
	if (nextStep !== "" && exitEsc === false) {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Parece que tivemos problemas na sessão anterior </center>",
			description : "Vamos continuar o tour de onde paramos?",
			overlay : "dark",
			width : 600,
			alignButtons : "center",
			buttons : {
				"Não, obrigado." : {
				click : function() {exit();}
				},
				"Desejo recomeçar o tour." : {
					click: function() {restartTour("", false);},
				},
				"Sim, por favor." : {
					click : true,
					className : "primary",
					focus : true
				}
			}
		}).show();
	}
	
	else if (nextStep !== "" && exitEsc === true) {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> É isso aí!",
			description : "Vamos continuar o tour a partir do ponto em que paramos.",
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
	}
	
	else if (nextStep === "" || nextStep === "fstep"){
    $.guider({
    	name: "fstep",
    	next: "fstep2",
    	title: "Muito bem!",
    	description: "Por acertar este passo da equação, você ganhou 10 pontos.",
    	alignButtons: "right",
    	onShow: function() {setCookieDays (cStepTour, "fstep", 1); setCookieDays (cFunctionTour, "firstStepTour", 1);},
    	buttons: {
    		Próximo: {
    			click: true,
    			className: "primary"
    		}
    	}
    	            
    	}).show();
	}
    	    
    $("#note").guider({
    	name: "fstep2",
    	next: "fstep3",
    	title: "Observe este painel",
    	description: "Ele contém o seu progresso na resolução das equações e mostra a sua pontuação da página atual.",
    	position: "left",
    	alignButtons: "right",
    	onShow: function() {setCookieDays (cStepTour, "fstep2", 1); setCookieDays (cFunctionTour, "firstStepTour", 1);},
    	buttons: {
    		Voltar: true,
    		Próximo: {
    			click: true,
    			className: "primary"
    		}
    	}
    	});
    	    
    	    $("#note").guider({
    			name: "fstep3",
    			next: "fstep4",
    			title: "Pontuação",
    			description: "Toda vez que acertar um passo na equação, você ganha 10 pontos.<br>E se errar, você perde 5 pontos e recebe uma dica.",
    			position: "left",
    			alignButtons: "right",
    			onShow: function() {setCookieDays (cStepTour, "fstep3", 1); setCookieDays (cFunctionTour, "firstStepTour", 1);},
    			buttons: {
    				Voltar: true,
    				Próximo: {
    					click: true,
    					className: "primary"
    				}
    			}
    		});
    	    
    	    $("#hint").guider({
    			name: "fstep4",
    			next: "fstep5",
    			title: "Pedindo dicas",
    			description: "Sempre que você estiver perdido em algum passo de uma equação, sinta-se à vontade de solicitar ajuda, clicando neste botão.",
    			position: "bottom",
    			alignButtons: "right",
    			onShow: function() {setCookieDays (cStepTour, "fstep4", 1); setCookieDays (cFunctionTour, "firstStepTour", 1);},
    			buttons: {
    				Voltar: true,
    				Próximo: {
    					click: true,
    					className: "primary"
    				}
    			}
    		});
    	    
    	    $("#help").guider({
    	    	name: "fstep5",
    	    	next: "fstep6",
    	    	title: "Teclas utilizadas",
    	    	description: "Caso tenha dúvidas referentes às teclas utilizadas nas operações e interações com o programa, clique neste botão para conferir a lista completa.",
    	    	position: "left",
    	    	alignButtons: "right",
    	    	closable: true, 
    	    	onShow: function() {setCookieDays (cStepTour, "fstep5", 1); setCookieDays (cFunctionTour, "firstStepTour", 1);},
    	    	buttons: {
    	    		Voltar: true,
    	    		Próximo: {
    	    			click: true,
    	    			className: "primary"
    	    		}
    	    	}
    	    	});
    	    
    	    $.guider({
    			name: "fstep6",
    			title: "Agora é com você",
    			description: "Continue resolvendo a equação da forma que preferir.",
    			alignButtons: "right",
    			onShow: function() {setCookieDays (cStepTour, "fstep6", 1); setCookieDays (cFunctionTour, "firstStepTour", 1);},
    			buttons: {
    				Voltar: true,
    				OK: {
    					click: true,
    					className: "primary"
    				}
    			}
    		});
    	    	    
}

function finalStepTour ( ) {
	$.guider({
    	next: "fstep2",
    	title: "Parabéns!",
    	description: "O plano de aula 1 foi desbloqueado e você já está pronto para utilizar o PAT2Math.",
        alignButtons: "right",
    	buttons: {
    		Próximo: {
    			click: true,
    			className: "primary"
    		}
    	}
    	            
    	}).show();
	
	$("#tour").guider({
    	name: "fstep2",
    	title: "Você está liberado!",
		description: "Se desejar, você pode acessar a este tour novamente clicando neste botão.",
		position: "left",
		alignButtons: "right",
		closable: true, 
		buttons: {
			Finalizar: {
               click: function() {exit();},
               className: "primary"
            }
		}
    	});
}

function alternativeFinalStepTour (nextStep, exitEsc) {
	if (nextStep !== "" && exitEsc === false) {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Parece que tivemos problemas na sessão anterior </center>",
			description : "Vamos continuar o tour de onde paramos?",
			overlay : "dark",
			width : 600,
			alignButtons : "center",
			buttons : {
				"Não, obrigado." : {
				click : function() {exit();}
				},
				"Desejo recomeçar o tour." : {
					click: function() {restartTour("", false);},
				},
				"Sim, por favor." : {
					click : true,
					className : "primary",
					focus : true
				}
			}
		}).show();
	}
	
	else if (nextStep !== "" && exitEsc === true) {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> É isso aí!",
			description : "Vamos continuar o tour a partir do ponto em que paramos.",
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
	}
	
	else if (nextStep === "" || nextStep === "fstep"){
	$.guider({
		name: "fstep",
    	next: "fstep2",
    	title: "Parabéns! O plano de aula 1 foi desbloqueado",
    	description: "Confira a seguir as nossas considerações finais.",
    	alignButtons: "right",
    	onShow: function() {setCookieDays (cStepTour, "fstep", 1); setCookieDays (cFunctionTour, "alternativeFinalStepTour", 1);},
    	buttons: {
    		Próximo: {
    			click: true,
    			className: "primary"
    		}
    	}
    	            
    	}).show();  
	}
    	    
    $("#note").guider({
    	name: "fstep2",
    	next: "fstep3",
    	title: "Observe este painel",
    	description: "Ele contém o seu progresso na resolução das equações e mostra a sua pontuação da página atual.",
    	position: "left",
    	alignButtons: "right",
    	onShow: function() {setCookieDays (cStepTour, "fstep2", 1); setCookieDays (cFunctionTour, "alternativeFinalStepTour", 1);},
    	buttons: {
    		Voltar: true,
    		Próximo: {
    			click: true,
    			className: "primary"
    		}
    	}
    	});
    	    
    	    $("#note").guider({
    			name: "fstep3",
    			next: "fstep4",
    			title: "Pontuação",
    			description: "Toda vez que acertar um passo na equação, você ganha 10 pontos.<br>E se errar, você perde 5 pontos e recebe uma dica.",
    			position: "left",
    			alignButtons: "right",
    			onShow: function() {setCookieDays (cStepTour, "fstep3", 1); setCookieDays (cFunctionTour, "alternativeFinalStepTour", 1);},
    			buttons: {
    				Voltar: true,
    				Próximo: {
    					click: true,
    					className: "primary"
    				}
    			}
    		});
    	    
    	    $("#hint").guider({
    			name: "fstep4",
    			next: "fstep5",
    			title: "Pedindo dicas",
    			description: "Sempre que você estiver perdido em algum passo de uma equação, sinta-se à vontade de solicitar ajuda, clicando neste botão.",
    			position: "bottom",
    			alignButtons: "right",
    			onShow: function() {setCookieDays (cStepTour, "fstep4", 1); setCookieDays (cFunctionTour, "alternativeFinalStepTour", 1);},
    			buttons: {
    				Voltar: true,
    				Próximo: {
    					click: true,
    					className: "primary"
    				}
    			}
    		});
    	    
    	    $("#help").guider({
    	    	name: "fstep5",
    	    	next: "fstep6",
    	    	title: "Teclas utilizadas",
    	    	description: "Caso tenha dúvidas referentes às teclas utilizadas nas operações e interações com o programa, clique neste botão para conferir a lista completa.",
    	    	position: "left",
    	    	alignButtons: "right",
    	    	closable: true, 
    	    	onShow: function() {setCookieDays (cStepTour, "fstep5", 1); setCookieDays (cFunctionTour, "alternativeFinalStepTour", 1);},
    	    	buttons: {
    	    		Voltar: true,
    	    		Próximo: {
    	    			click: true,
    	    			className: "primary"
    	    		}
    	    	}
    	    	});
    	    
    	    $("#tour").guider({
    			name: "fstep6",
    			title: "Você está liberado!",
    			description: "Se desejar, você pode acessar a este tour novamente clicando neste botão.",
    			position: "left",
    			alignButtons: "right",
    			closable: true, 
    			buttons: {
    				Voltar: true,
    				Finalizar: {
    					click: function() {exit();},
    	                className: "primary"
    	            }
    			}
    		});
}

function plan2 ( ) {
	$().guider({
		next: "plan2",
		title: "Passando de Fase",
		description: "Ao resolver todas as equações de um plano de aula, você libera o próximo.<br>Essas equações podem ser resolvidas na ordem que você quiser.",
		alignButtons: "right",
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	}).show();
	
	$().guider({
		name: "plan2",
		title: "Níveis de Dificuldade",
		description: "Conforme você passa de fase, o nível de dificuldade vai aumentando gradualmente.<br>Mas não se preocupe: se ficar muito difícil, nós podemos ajudar!",
		alignButtons: "right",
		width: 610,
		buttons: {
			Entendi: {
				click: true,
				className: "primary"
			}
		}
	});
}