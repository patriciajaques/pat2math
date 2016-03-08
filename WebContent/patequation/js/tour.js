function introduction (nextStep) {
	if (nextStep === "") {
		$.guider({
			name: "start",
			next : "start2",
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Bem-vindo! </center>",
			description : "<center>O PAT2Math é um programa que auxilia na resolução de equações algébricas. <br>Vamos conferir alguns funcionamentos básicos antes de começar.</center>",
			overlay : "dark",
			width : 600,
			alignButtons : "right",
			onShow: function() {setCookieDays (cStepTour, "start", 1); setCookieDays (cFunctionTour, "introduction", 1);},
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
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Parece que tivemos problemas na sessão anterior </center>",
			description : "Vamos continuar o tour de onde paramos.",
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
	
	$.guider({
		name: "start",
		next : "start2",
		title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Bem-vindo! </center>",
		description : "<center>O PAT2Math é um programa que auxilia na resolução de equações algébricas. <br>Vamos conferir alguns funcionamentos básicos antes de começar.</center>",
		overlay : "dark",
		width : 600,
		alignButtons : "right",
		onShow: function() {setCookieDays (cStepTour, "start", 1); setCookieDays (cFunctionTour, "introduction", 1);},
		buttons : {
			Próximo: {
				click : true,
				className : "primary",
			}
		}
	});
	
	$("#line3").guider({
		name: "start2",
		next: "start3",
		title: "Equações iniciais",
		description: "As equações iniciais sempre estarão na primeira linha. Para resolvê-las, basta clicar nas caixas de texto nas linhas abaixo delas e digitar o próximo passo.",    
		position: "bottom",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "start2", 1); setCookieDays (cFunctionTour, "introduction", 1);},
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$("#linha3").guider({
		name: "start3",
        next: "start4",
		title: "Resolvendo uma equação",
		description: 'Nós vamos resolver esta equação passo-a-passo. Você pode começar a resolução da forma que preferir, mas sugerimos que adicione "+2x" nos dois lados da equação para simplificar o segundo lado e manter a equação balanceada. Digite x+2x+15=45-2x+2x e tecle enter ou clique no ícone<img src=/pat2math/patequation/img/lupa.png></img>',  
		width: 600,
		position: "bottom",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "start3", 1); setCookieDays (cFunctionTour, "introduction", 1);},
		buttons: {
            Voltar: true,
			OK: {
               click: true,
               className: "primary"
            }
		}
	});         
}

//O título e a descrição devem variar se o usuário acertou o errou o passo
//Acertou: 
//title: "Muito bem!",
//description: "Por acertar este passo da equação, você ganhou 10 pontos.",

function firstStepTour (nextStep, title, description) {
	if (nextStep === "") {
		$.guider({
			name: "fstep",
	    	next: "fstep2",
	    	title: title,
	    	description: description,
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
	
	else {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Parece que tivemos problemas na sessão anterior </center>",
			description : "Vamos continuar o tour de onde paramos.",
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
	
	$.guider({
		name: "fstep",
    	next: "fstep2",
    	title: title,
    	description: description,
    	alignButtons: "right",
    	onShow: function() {setCookieDays (cStepTour, "fstep", 1); setCookieDays (cFunctionTour, "firstStepTour", 1);},
    	buttons: {
    		Próximo: {
    			click: true,
    			className: "primary"
    		}
    	}
    	            
    	});
    	    
    $("#note").guider({
    	name: "fstep2",
    	next: "fstep3",
    	title: "Painel de progresso",
    	description: "Observe este painel. Ele contém o seu progresso na resolução das equações e mostra a sua pontuação da página atual.",
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
    			description: "Sempre que você estiver perdido em algum passo de uma equação, sinta-se à vontade de solicitar ajuda, clicando neste botão. Você perde 2 pontos para cada dica que solicitar.",
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

function alternativeFirstStepTour (nextStep) {
	if (nextStep === "") {
		$.guider({
			name: "fstep",
	    	next: "fstep2",
	    	title: "Parabéns! O plano de aula 1 foi desbloqueado",
	    	description: "Confira a seguir mais algumas considerações.",
	    	alignButtons: "right",
	    	onShow: function() {setCookieDays (cStepTour, "fstep", 1); setCookieDays (cFunctionTour, "alternativeFirstStepTour", 1);},
	    	buttons: {
	    		Próximo: {
	    			click: true,
	    			className: "primary"
	    		}
	    	}
	    	            
	    	}).show();  
	}
	
	else {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Parece que tivemos problemas na sessão anterior </center>",
			description : "Vamos continuar o tour de onde paramos.",
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

	$.guider({
		name: "fstep",
    	next: "fstep2",
    	title: "Parabéns! O plano de aula 1 foi desbloqueado",
    	description: "Confira a seguir mais algumas considerações.",
    	alignButtons: "right",
    	onShow: function() {setCookieDays (cStepTour, "fstep", 1); setCookieDays (cFunctionTour, "alternativeFirstStepTour", 1);},
    	buttons: {
    		Próximo: {
    			click: true,
    			className: "primary"
    		}
    	}
    	            
    	});  
    	    
    $("#note").guider({
    	name: "fstep2",
    	next: "fstep3",
    	title: "Painel de Progresso",
    	description: "Observe este painel. Ele contém o seu progresso na resolução das equações e mostra a sua pontuação da página atual.",
    	position: "left",
    	alignButtons: "right",
    	onShow: function() {setCookieDays (cStepTour, "fstep2", 1); setCookieDays (cFunctionTour, "alternativeFirstStepTour", 1);},
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
    			onShow: function() {setCookieDays (cStepTour, "fstep3", 1); setCookieDays (cFunctionTour, "alternativeFirstStepTour", 1);},
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
    			description: "Sempre que você estiver perdido em algum passo de uma equação, sinta-se à vontade de solicitar ajuda, clicando neste botão. Você perde 2 pontos para cada dica que solicitar.",
    			position: "bottom",
    			alignButtons: "right",
    			onShow: function() {setCookieDays (cStepTour, "fstep4", 1); setCookieDays (cFunctionTour, "alternativeFirstStepTour", 1);},
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
    	    	onShow: function() {setCookieDays (cStepTour, "fstep5", 1); setCookieDays (cFunctionTour, "alternativeFirstStepTour", 1);},
    	    	buttons: {
    	    		Voltar: true,
    	    		Próximo: {
    	    			click: true,
    	    			className: "primary"
    	    		}
    	    	}
    	    	});
    	    
    	    $("#topics").guider({
    			name: "fstep6",
    			next: "fstep7",
    			title: "Menu principal",
    			description: "Aqui você pode selecionar os planos de aula e suas respectivas equações para resolver.",       
    			position: "right",
    			alignButtons: "right",
    			onShow: function() {setCookieDays (cStepTour, "fstep6", 1); setCookieDays (cFunctionTour, "alternativeFirstStepTour", 1);},
    			buttons: {
    				Próximo: {
    					click: true,
    					className: "primary"
    				}
    			}
    		});
    		
    		$(".topic").guider({
    			name: "fstep7",
    			title: "Acesso às Equações",
    			description: "Clique neste botão para conferir as equações do plano de aula 1.",     
    			position: "right",
    			alignButtons: "right",
    			onShow: function() {setCookieDays (cStepTour, "fstep5", 1); setCookieDays (cFunctionTour, "alternativeFirstStepTour", 1);},
    			buttons: {
    				Voltar: true,
    				OK: {
    					click: true,
    					className: "primary"
    				}
    			}
    		}); 
}

function mainMenu (nextStep) {
	$("#topics").fadeIn();
    $("#topicsAux").hide();
    
	if (nextStep === "") {
		$.guider({
			name: "mp",
	    	next: "mp2",
	    	title: "Parabéns!",
	    	description: "O plano de aula 1 foi desbloqueado e agora você tem acesso ao menu principal.",
	        alignButtons: "right",
	        onShow: function() {setCookieDays (cStepTour, "mp", 1); setCookieDays (cFunctionTour, "mainMenu", 1);},
	    	buttons: {
	    		Próximo: {
	    			click: true,
	    			className: "primary"
	    		}
	    	}
	    	            
	    	}).show();
	}
	
	else {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Parece que tivemos problemas na sessão anterior </center>",
			description : "Vamos continuar o tour de onde paramos.",
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
	
	$.guider({
		name: "mp",
    	next: "mp2",
    	title: "Parabéns!",
    	description: "O plano de aula 1 foi desbloqueado e agora você tem acesso ao menu principal.",
        alignButtons: "right",
        onShow: function() {setCookieDays (cStepTour, "mp", 1); setCookieDays (cFunctionTour, "mainMenu", 1);},
    	buttons: {
    		Próximo: {
    			click: true,
    			className: "primary"
    		}
    	}
    	            
    	});
	
	$("#topics").guider({
		name: "mp2",
		next: "mp3",
		title: "Menu principal",
		description: "Aqui você pode selecionar os planos de aula e suas respectivas equações para resolver.",       
		position: "right",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "mp2", 1); setCookieDays (cFunctionTour, "mainMenu", 1);},
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$(".topic").guider({
		name: "mp3",
		title: "Acesso às Equações",
		description: "Clique neste botão para conferir as equações do plano de aula 1.",     
		position: "right",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "mp3", 1); setCookieDays (cFunctionTour, "mainMenu", 1);},
		buttons: {
			Voltar: true,
			OK: {
				click: true,
				className: "primary"
			}
		}
	}); 
}

function classPlan (nextStep) {
	if (nextStep === "") {
		$.guider({
			name: "plan",
			next: "plan2",
			title: "Planos de Aula",
			description: "Os planos de aula são como as fases de um jogo. Cada plano possui várias equações, que podem ser resolvidas na ordem que você quiser.",
			alignButtons: "right", 
			onShow: function() {setCookieDays (cStepTour, "plan", 1); setCookieDays (cFunctionTour, "classPlan", 1);},
			buttons: {
				Próximo: {
					click: true,
					className: "primary"
				}
			}
		}).show();
	}
	
	else {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Parece que tivemos problemas na sessão anterior </center>",
			description : "Vamos continuar o tour de onde paramos.",
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
	
	$.guider({
		name: "plan",
		next: "plan2",
		title: "Planos de Aula",
		description: "Os planos de aula são como as fases de um jogo. Cada plano possui várias equações, que podem ser resolvidas na ordem que você quiser.",
		alignButtons: "right", 
		onShow: function() {setCookieDays (cStepTour, "plan", 1); setCookieDays (cFunctionTour, "classPlan", 1);},
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$("#tourAux").guider({
		name: "plan2",
		title: "Equações",
		description: "Aqui está a lista das equações do plano de aula 1. Selecione qualquer uma delas para começar.",
	    alignButtons: "right", 
	    onShow: function() {setCookieDays (cStepTour, "plan", 1); setCookieDays (cFunctionTour, "classPlan", 1);},
	    buttons: {
			Voltar: true,
			OK: {
				click: true,
				className: "primary"
			}
		}
		});
}

function clickEquation (nextStep) {
	isTourInterativo = false;
	blockMenu = false;
	setCookieDays (cStepTour, "", 0);
	setCookieDays (cFunctionTour, "", 0);
	
	$.guider({
		name: "click",
		next: "click2",
		title: "Ótimo!",
		description: "Agora a sua meta é resolver este plano de aula, começando pela equação selecionada.",
	    alignButtons: "right", 
	    buttons: {
	    	Próximo: {
                click: true,
                className: "primary"
            }
	    }
		}).show();
	
	$("#topicsAux").guider({
		name: "click2",
		title: "O menu principal sumiu!",
		description: "Sem problemas. Apenas passe o mouse neste local que ele reaparecerá!",    
		position: "right",
		alignButtons: "right",
		buttons: {
			Voltar: true,
			Entendi: {
				click: true,
				className: "primary"
			}
		}
	});
}

function plan2Explanation (nextStep) {
	if (nextStep === "") {
		$.guider({
			name: "plan2Start",
			next: "plan2",
			title: "Passando de Fase",
			description: "Ao resolver todas as equações de um plano de aula, você libera o próximo.",
			alignButtons: "right",
			onShow: function() {setCookieDays (cStepTour, "plan2Start", 1); setCookieDays (cFunctionTour, "plan2Explanation", 1);},
			buttons: {
				Próximo: {
					click: true,
					className: "primary"
				}
			}
		}).show();
	}
	
	else {
		$.guider({
			next : nextStep,
			title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Parece que tivemos problemas na sessão anterior </center>",
			description : "Vamos continuar o tour de onde paramos.",
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
	
	$.guider({
		name: "plan2Start",
		next: "plan2",
		title: "Passando de Fase",
		description: "Ao resolver todas as equações de um plano de aula, você libera o próximo.",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "plan2Start", 1); setCookieDays (cFunctionTour, "plan2Explanation", 1);},
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$.guider({
		name: "plan2",
		next: "finish",
		title: "Níveis de Dificuldade",
		description: "Conforme você passa de fase, o nível de dificuldade vai aumentando gradualmente.<br>Mas não se preocupe: se ficar muito difícil, nós podemos ajudar!",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "plan2", 1); setCookieDays (cFunctionTour, "plan2Explanation", 1);},
		width: 610,
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$.guider({
    	name: "finish",
    	title: "Você está liberado!",
		description: "Esperamos que você goste de utilizar o PAT2Math.",
		position: "left",
		alignButtons: "right",
		onShow: function() {setCookieDays (cStepTour, "", 0); setCookieDays (cFunctionTour, "", 0);},
		closable: true, 
		buttons: {
			Voltar: true,
			Finalizar: {
			   click : function() {exit();},
               className: "primary"
            }
		}
    });	
}

function exit ( ) {
	$.guider({	
	}).hideAll();
	
	isTourInterativo = false; 
	blockMenu = true;
	
	$("#topics").fadeIn();
	$("#topicsAux").hide();
//	if (selectedEquation !== null) {
//	    $("#topics").fadeOut();
//        $("#topicsAux").show();
//	}
    
    var pos = getCookie ("pos");
	var cookieName = "stepTour" + pos;
	setCookieDays (cookieName, "", 0);
	cookieName = "functionTour" + pos;
	setCookieDays (cookieName, "", 0);
	cookieName = "openTour" + pos;
	setCookieDays (cookieName, "false", 7);
}

function checkTour ( ) {
	var cookieName = "stepTour" + currentPos;
	var nextStep = getCookie (cookieName);
    cookieName = "functionTour" + currentPos;
    var functionTour = getCookie (cookieName);
    	
    if (numUnlockedPlans === 1) {
    	if (functionTour === "" || functionTour === "introduction")
    		introduction(nextStep);
    	
    	else if (functionTour === "firstStepTour") 
    		firstStepTour(nextStep); 
    
    	else if (functionTour === "mainMenu") 
    		mainMenu(nextStep);
    
    	else if (functionTour === "classPlan") 
    		classPlan(nextStep);
    
    	else if (functionTour == "alternativeFirstStepTour")
    		alternativeFirstStepTour(nextStep);
    }
    
    else if (numUnlockedPlans === 2 && functionTour === "clickEquation") 
		clickEquation(nextStep);
    
    else if (numUnlockedPlans === 3 && functionTour === "plan2Explanation") 
    	plan2Explanation(nextStep);
}

function newPlan ( ) {
	$.guider({
    	title: "Parabéns! Você passou de fase!",
    	description: "O próximo plano de aula contém equações um pouco mais desafiadoras. Lembre-se que você pode pedir uma dica sempre que achar necessário.",
        alignButtons: "center",
    	buttons: {
    		Legal: {
    			click: function(){$.guider({}).hideAll(); loadTasks(numUnlockedPlans);},
    			className: "primary"
    		}
    	}
    	            
    	}).show();
}
