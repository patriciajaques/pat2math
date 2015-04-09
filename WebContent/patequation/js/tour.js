var cStepTour = "stepTour" + currentPos;
var cFunctionTour = "functionTour" + currentPos;

function openTour ( ) {
	isTourInterativo = true;
	blockMenu = true;	
	
	
	var cookieName = "tour" + currentPos;
	setCookieDays (cookieName, "", 0);
	cookieName = "tourIsInProgress" + currentPos;
	setCookieMinutes (cookieName, "true", 5);
	
	$("#topics").fadeIn();
	$("#topicsAux").hide();

	$.guider({
		next : "start2",
		title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Bem-vindo! </center>",
		description : "<center>Você deseja passar pelo nosso tour interativo antes de começar?</center>",
		overlay : "dark",
		width : 600,
		alignButtons : "center",
		buttons : {
			"Não, obrigado." : {
			click : function() {noThanks();}
			},
			"Só se for agora!" : {
				click : true,
				className : "primary",
				focus : true
			}
		}
	}).show();
	
	$().guider({
		name: "start2",
		next: "start3",
		title: "Ótimo! Você verá que é muito fácil e divertido utilizar esse programa",
		description: 'A qualquer momento você pode sair deste tour pressionando <font color="red">ESC</font>',                             
        hashable: true,
		position: "right",
		alignButtons: "center",
        overlay: "dark",
        onShow: function() {setCookieMinutes (cStepTour, "start2", 5); setCookieMinutes (cFunctionTour, "openTour", 5);},
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
		onShow: function() {setCookieMinutes (cStepTour, "start3", 5); setCookieMinutes (cFunctionTour, "openTour", 5);},
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
		onShow: function() {setCookieMinutes (cStepTour, "start4", 5); setCookieMinutes (cFunctionTour, "openTour", 5);},
		buttons: {
			Voltar: true,
			OK: {
				click: true,
				className: "primary"
			}
		}
	}); 
}

function continueTour ( ) {
	isTourInterativo = true;
	blockMenu = true;	
	
	
	var cookieName = "tour" + currentPos;
	setCookieDays (cookieName, "", 0);
	cookieName = "tourIsInProgress" + currentPos;
	setCookieMinutes (cookieName, "true", 5);
	
	$("#topics").fadeIn();
	$("#topicsAux").hide();

	$.guider({
		next : "start2",
		title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Parece que tivemos problemas na sessão anterior </center>",
		description : "Vamos passar pelo tour novamente?",
		overlay : "dark",
		width : 600,
		alignButtons : "center",
		buttons : {
			"Não, obrigado." : {
			click : function() {noThanks();}
			},
			"Sim, por favor." : {
				click : true,
				className : "primary",
				focus : true
			}
		}
	}).show();
	
	$().guider({
		name: "start2",
		next: "start3",
		title: "É isso aí!",
		description: 'Lembre-se que você pode sair deste tour pressionando <font color="red">ESC</font> a qualquer momento.',                             
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
		buttons: {
			Voltar: true,
			OK: {
				click: true,
				className: "primary"
			}
		}
	}); 
}

function clickTour ( ) {
	isTourInterativo = true;
	blockMenu = true;	
	
	
	var cookieName = "tour" + currentPos;
	setCookieDays (cookieName, "", 0);
	cookieName = "tourIsInProgress" + currentPos;
	setCookieMinutes (cookieName, "true", 5);
	
	$("#topics").fadeIn();
	$("#topicsAux").hide();

	$.guider({
		next : "start2",
		title : "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Olá! </center>",
		description : "<center>Você deseja passar pelo nosso tour interativo para entender as principais funcionalidades do Pat2Math?</center>",
		overlay : "dark",
		width : 600,
		alignButtons : "center",
		buttons : {
			"Não, obrigado." : {
			click : function() {noThanks();}
			},
			"Só se for agora!" : {
				click : true,
				className : "primary",
				focus : true
			}
		}
	}).show();
	
	$().guider({
		name: "start2",
		next: "start3",
		title: "Ótimo! Você verá que é muito fácil e divertido utilizar esse programa",
		description: 'A qualquer momento você pode sair deste tour pressionando <font color="red">ESC</font>',                             
        hashable: true,
		position: "right",
		alignButtons: "center",
        overlay: "dark",
        onShow: function() {setCookieMinutes (cStepTour, "start2", 5); setCookieMinutes (cFunctionTour, "clickTour", 5);},
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
		onShow: function() {setCookieMinutes (cStepTour, "start3", 5); setCookieMinutes (cFunctionTour, "clickTour", 5);},
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
		onShow: function() {setCookieMinutes (cStepTour, "start4", 5); setCookieMinutes (cFunctionTour, "clickTour", 5);},
		buttons: {
			Voltar: true,
			OK: {
				click: true,
				className: "primary"
			}
		}
	}); 
}
function noThanks ( ) {
	 $.guider({
		title : "Tudo bem!",
		next : "exit2",
		description : 'Confira a seguir as nossas considerações finais.',
		alignButtons : "right",
		buttons : {
			Próximo : {
				click : true,
				className : "primary"
			}
		}
	}).show();

	$("#help").guider({
		name : "exit2",
	    next : "exit3",
		title : 'Teclas utilizadas',
		description : 'Caso tenha dúvidas referentes às teclas utilizadas no Pat2Math, clique neste botão para conferir a lista completa.',
		position : "left",
		alignButtons : "right",
		width : 600,
		buttons : {
			Próximo : {
			click : true,
		    className : "primary"
			}
		}
	});

	$("#tour").guider({
		name : "exit3",
		title : 'Se você mudar de ideia',
		description : 'Clique neste botão para acessar a este tour novamente.',
		position : "left",
		alignButtons : "right",
		width : 600,
		buttons : {
			Entendi : {
				click : true,
				className : "primary"
			}
		}
	});

	exit();
}
function exit ( ) {
	isTourInterativo = false; 
	blockMenu = false;
	
	if (selectedEquation !== null) {
	    $("#topics").fadeOut();
        $("#topicsAux").show();
	}
    
    
	var cookieName = "tour" + currentPos;
	setCookieDays (cookieName, "false", 7);
	cookieName = "tourIsInProgress" + currentPos;
	setCookieMinutes (cookieName, "false", 5);
}
function exitEsc ( ) {
	$.guider({
		title: "Você pressionou esc e saiu do tour.",
                next: "exit2",
		description: 'Confira a seguir as nossas considerações finais.',
                closable: true,
                alignButtons: "right",
		buttons: {
                     Próximo: {
                         click: true,
                         className: "primary"
                     }
		}
		}).show();
                
            $("#help").guider({
                name: "exit2",
                next: "exit3",
		title: 'Teclas utilizadas',
                description: 'Caso tenha dúvidas referentes às teclas utilizadas no Pat2Math, clique neste botão para conferir a lista completa.',
                closable: true,
                position: "left",
                alignButtons: "right",
		buttons: {
                     Próximo: {
                         click: true,
                         className: "primary"
                     }
		}
		});
                
        $("#tour").guider({
                name: "exit3",             
		title: 'Se você mudar de ideia',
                description: 'Clique neste botão para acessar a este tour novamente.',
                closable: true,
                position: "left",
                alignButtons: "right",
		buttons: {
                     Entendi: {
                         click: true,
                         className: "primary"
                     }
		}
		});    
        
        exit();
}
function clickEquation ( ) {
	$.guider({
		name: "main",
		next: "main2",
		title: "Esta é a sua interface principal",
		description: "Aqui estão as principais funcionalidades que você utilizará para resolver as equações do Pat2Math.<br>Continue com o tour para descobrir!",
	    alignButtons: "right", 
	    onShow: function() {setCookieMinutes (cStepTour, "main", 5); setCookieMinutes (cFunctionTour, "clickEquation", 5);},
	    buttons: {
	    	Próximo: {
                click: true,
                className: "primary"
            }
	    }
		}).show();
	
	$("#topicsAux").guider({
		name: "main2",
		next: "main3",
		title: "O menu principal sumiu!",
		description: "Sem problemas. Apenas passe o mouse neste local que ele reaparecerá!",    
		position: "right",
		alignButtons: "right",
		onShow: function() {setCookieMinutes (cStepTour, "main2", 5); setCookieMinutes (cFunctionTour, "clickEquation", 5);},
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
		onShow: function() {setCookieMinutes (cStepTour, "main3", 5); setCookieMinutes (cFunctionTour, "clickEquation", 5);},
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
		onShow: function() {setCookieMinutes (cStepTour, "main4", 5); setCookieMinutes (cFunctionTour, "clickEquation", 5);},
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
		onShow: function() {setCookieMinutes (cStepTour, "main5", 5); setCookieMinutes (cFunctionTour, "clickEquation", 5);},
		buttons: {
			Voltar: true,
			OK: {
				click: true,
				className: "primary"
			}
		}
	});
}

function clickEquationSlim ( ) {
	$.guider({
		name: "smain",
		next: "smain2",
		title: "Verificamos que a equação já foi resolvida",
		description: "Vamos avançar um pouco no nosso tour para verificar outros detalhes importantes. ",
	    alignButtons: "right", 
	    onShow: function() {setCookieMinutes (cStepTour, "smain", 5); setCookieMinutes (cFunctionTour, "clickEquationSlim", 5);},
	    buttons: {
	    	Próximo: {
                click: true,
                className: "primary"
            }
	    }
		}).show();
	
	$("#topicsAux").guider({
		name: "smain2",
		next: "smain3",
		title: "O menu principal sumiu!",
		description: "Sem problemas. Apenas passe o mouse neste local que ele reaparecerá!",    
		position: "right",
		alignButtons: "right",
		onShow: function() {setCookieMinutes (cStepTour, "smain2", 5); setCookieMinutes (cFunctionTour, "clickEquationSlim", 5);},
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
		onShow: function() {setCookieMinutes (cStepTour, "smain3", 5); setCookieMinutes (cFunctionTour, "clickEquationSlim", 5);},
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
		onShow: function() {setCookieMinutes (cStepTour, "smain4", 5); setCookieMinutes (cFunctionTour, "clickEquationSlim", 5);},
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
		onShow: function() {setCookieMinutes (cStepTour, "smain5", 5); setCookieMinutes (cFunctionTour, "clickEquationSlim", 5);},
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
		onShow: function() {setCookieMinutes (cStepTour, "smain6", 5); setCookieMinutes (cFunctionTour, "clickEquationSlim", 5);},
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
		onShow: function() {setCookieMinutes (cStepTour, "smain7", 5); setCookieMinutes (cFunctionTour, "clickEquationSlim", 5);},
		buttons: {
			Voltar: true,
			Finalizar: {
                click: true,
                className: "primary"
            }
		}
	});
}

function clickEquationPartiallyResolved ( ) {
	$.guider({
		name: "pmain",
		next: "pmain2",
		title: "Esta é a sua interface principal",
		description: "Aqui estão as principais funcionalidades que você utilizará para resolver as equações do Pat2Math.<br>Continue com o tour para descobrir!",
	    alignButtons: "right", 
	    onShow: function() {setCookieMinutes (cStepTour, "pmain", 5); setCookieMinutes (cFunctionTour, "clickEquationPartiallyResolved", 5);},
	    buttons: {
	    	Próximo: {
                click: true,
                className: "primary"
            }
	    }
		}).show();
	
	$("#topicsAux").guider({
		name: "pmain2",
		next: "pmain3",
		title: "O menu principal sumiu!",
		description: "Sem problemas. Apenas passe o mouse neste local que ele reaparecerá!",    
		position: "right",
		alignButtons: "right",
		onShow: function() {setCookieMinutes (cStepTour, "pmain2", 5); setCookieMinutes (cFunctionTour, "clickEquationPartiallyResolved", 5);},
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
		onShow: function() {setCookieMinutes (cStepTour, "pmain3", 5); setCookieMinutes (cFunctionTour, "clickEquationPartiallyResolved", 5);},
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
    	onShow: function() {setCookieMinutes (cStepTour, "pmain4", 5); setCookieMinutes (cFunctionTour, "clickEquationPartiallyResolved", 5);},
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
    			onShow: function() {setCookieMinutes (cStepTour, "pmain5", 5); setCookieMinutes (cFunctionTour, "clickEquationPartiallyResolved", 5);},
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
    			onShow: function() {setCookieMinutes (cStepTour, "pmain6", 5); setCookieMinutes (cFunctionTour, "clickEquationPartiallyResolved", 5);},
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
    	    	onShow: function() {setCookieMinutes (cStepTour, "pmain7", 5); setCookieMinutes (cFunctionTour, "clickEquationPartiallyResolved", 5);},
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
    			onShow: function() {setCookieMinutes (cStepTour, "pmain8", 5); setCookieMinutes (cFunctionTour, "clickEquationPartiallyResolved", 5);},
    			buttons: {
    				Voltar: true,
    				OK: {
    					click: true,
    					className: "primary"
    				}
    			}
    		});
}
function clickPlan ( ) {
	$.guider({
		name: "plan",
		next: "plan2",
		title: "Planos de Aula",
		description: "Os planos de aula são como as fases de um jogo.<br>Cada fase é composta por uma série de equações. ",
	    alignButtons: "right", 
	    onShow: function() {setCookieMinutes (cStepTour, "plan", 5); setCookieMinutes (cFunctionTour, "clickPlan", 5);},
	    buttons: {
	    	Próximo: {
                click: true,
                className: "primary"
            }
	    }
		}).show();
	
	$().guider({
		name: "plan2",
		next: "plan3",
		title: "Passando de Fase",
		description: "Ao resolver todas as equações de um plano de aula, você libera o próximo.<br>Essas equações podem ser resolvidas na ordem que você quiser.",
		alignButtons: "right",
		onShow: function() {setCookieMinutes (cStepTour, "plan2", 5); setCookieMinutes (cFunctionTour, "clickPlan", 5);},
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$().guider({
		name: "plan3",
		next: "plan4",
		title: "Níveis de Dificuldade",
		description: "Conforme você passa de fase, o nível de dificuldade vai aumentando gradualmente.<br>Mas não se preocupe: se ficar muito difícil, nós podemos ajudar!",
		alignButtons: "right",
		width: 610,
		onShow: function() {setCookieMinutes (cStepTour, "plan3", 5); setCookieMinutes (cFunctionTour, "clickPlan", 5);},
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$().guider({
		name: "plan4",
		title: "Clique na equação x+15=45-2x",
		description: "Vamos resolvê-la passo-a-passo para entender as principais funcionalidades do Pat2Math.",
		alignButtons: "right",
		onShow: function() {setCookieMinutes (cStepTour, "plan4", 5); setCookieMinutes (cFunctionTour, "clickPlan", 5);},
		buttons: {
			Voltar: true,
			OK: {
				click: true,
				className: "primary"
			}
		}
	});
}



function firstStepTour ( ) {
    $.guider({
    	name: "fstep",
    	next: "fstep2",
    	title: "Muito bem!",
    	description: "Por acertar este passo da equação, você ganhou 10 pontos.",
    	alignButtons: "right",
    	onShow: function() {setCookieMinutes (cStepTour, "fstep", 5); setCookieMinutes (cFunctionTour, "firstStepTour", 5);},
    	buttons: {
    		Próximo: {
    			click: true,
    			className: "primary"
    		}
    	}
    	            
    	}).show();            
    	    
    $("#note").guider({
    	name: "fstep2",
    	next: "fstep3",
    	title: "Observe este painel",
    	description: "Ele contém o seu progresso na resolução das equações e mostra a sua pontuação da página atual.",
    	position: "left",
    	alignButtons: "right",
    	onShow: function() {setCookieMinutes (cStepTour, "fstep2", 5); setCookieMinutes (cFunctionTour, "firstStepTour", 5);},
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
    			onShow: function() {setCookieMinutes (cStepTour, "fstep3", 5); setCookieMinutes (cFunctionTour, "firstStepTour", 5);},
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
    			onShow: function() {setCookieMinutes (cStepTour, "fstep4", 5); setCookieMinutes (cFunctionTour, "firstStepTour", 5);},
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
    	    	onShow: function() {setCookieMinutes (cStepTour, "fstep5", 5); setCookieMinutes (cFunctionTour, "firstStepTour", 5);},
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
    			onShow: function() {setCookieMinutes (cStepTour, "fstep6", 5); setCookieMinutes (cFunctionTour, "firstStepTour", 5);},
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
    	description: "O plano de aula 1 foi desbloqueado e você já está pronto para utilizar o Pat2Math.",
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
               click: true,
               className: "primary"
            }
		}
    	});
	
	exit();
}

function alternativeFinalStepTour ( ) {
	$.guider({
		name: "fstep",
    	next: "fstep2",
    	title: "Parabéns! O plano de aula 1 foi desbloqueado",
    	description: "Confira a seguir as nossas considerações finais.",
    	alignButtons: "right",
    	onShow: function() {setCookieMinutes (cStepTour, "fstep", 5); setCookieMinutes (cFunctionTour, "alternativeFinalStepTour", 5);},
    	buttons: {
    		Próximo: {
    			click: true,
    			className: "primary"
    		}
    	}
    	            
    	}).show();            
    	    
    $("#note").guider({
    	name: "fstep2",
    	next: "fstep3",
    	title: "Observe este painel",
    	description: "Ele contém o seu progresso na resolução das equações e mostra a sua pontuação da página atual.",
    	position: "left",
    	alignButtons: "right",
    	onShow: function() {setCookieMinutes (cStepTour, "fstep2", 5); setCookieMinutes (cFunctionTour, "alternativeFinalStepTour", 5);},
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
    			onShow: function() {setCookieMinutes (cStepTour, "fstep3", 5); setCookieMinutes (cFunctionTour, "alternativeFinalStepTour", 5);},
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
    			onShow: function() {setCookieMinutes (cStepTour, "fstep4", 5); setCookieMinutes (cFunctionTour, "alternativeFinalStepTour", 5);},
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
    	    	onShow: function() {setCookieMinutes (cStepTour, "fstep5", 5); setCookieMinutes (cFunctionTour, "alternativeFinalStepTour", 5);},
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
    	                click: true,
    	                className: "primary"
    	            }
    			}
    		});
    	    
    	    exit();
}

// function openTour ( ) {
// isTourInterativo = true;
//    
// if (topicIsOpen) {
// if (equationTourIsResolved)
// openTourSlimWithTopicOpen();
//    	
// else
// openTourWithTopicOpen();
// }
//    
// else {

//            

//
//function openTourSlim ( ) {
//	isTourInterativo = true;
//	
//	$.guider({
//		next: "second",
//		title: "Verificamos que a equação já foi resolvida",
//		description: "Vamos avançar um pouco no nosso tour para verificar outros detalhes importantes. ",
//	    alignButtons: "right", 
//	    buttons: {
//	    	Próximo: {
//                click: true,
//                className: "primary"
//            }
//	    }
//		}).show();
//	
//    $("#note").guider({
//		name: "second",
//		next: "third",
//		title: "Observe este painel",
//		description: "Ele contém o seu progresso na resolução das equações e mostra a sua pontuação da página atual.",
//		position: "left",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//    
//    $("#note").guider({
//		name: "third",
//		next: "fourth",
//		title: "Pontuação",
//		description: "Ao acertar um passo na equação, você ganha 10 pontos.<br><br>E se errar, você perde 5 pontos e recebe uma dica.",
//		position: "left",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//    
//    $("#hint").guider({
//		name: "fourth",
//		next: "fiveth",
//		title: "Pedindo dicas",
//		description: "Sempre que você estiver perdido em algum passo de uma equação, sinta-se à vontade de solicitar ajuda, clicando neste botão.",
//		position: "bottom",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//    
//    $("#help").guider({
//		name: "fiveth",
//		next: "sixth",
//		title: "Teclas utilizadas",
//		description: "Caso tenha dúvidas referentes às teclas utilizadas nas operações e interações com o programa, clique neste botão para conferir a lista completa.",
//		position: "left",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//    
//    $("#tour").guider({
//		name: "sixth",
//		title: "Você está liberado!",
//		description: "Se desejar, você pode acessar a este tour novamente clicando neste botão.",
//		position: "left",
//		alignButtons: "center",
//		closable: true, 
//		buttons: {
//			Finalizar: {
//                                click: true,
//                                className: "primary"
//                            }
//		}
//	});
//    
//    isTourInterativo = false;
//}
//
//function openTourWithTopicOpen ( ) {
//	isTourInterativo = true;
//	
//	$.guider({
//		next: "second",
//		title: "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Bem-vindo!  </center>",
//		description: "<center>Você deseja passar pelo nosso Tour interativo antes de começar?</center>",
//                    closable: true,
//		overlay: "dark",
//		width: 600,
//                    alignButtons: "center",
//		buttons: {
//                            "Não, obrigado.": {
//                                click: function () {
//                                    $.guider({
//	title: "Tudo bem!",
//            next: "secondExit",
//	description: 'Confira a seguir as nossas considerações finais.',
//            closable: true,
//            alignButtons: "right",
//	buttons: {
//                 Próximo: {
//                     click: true,
//                     className: "primary"
//                 }
//	}
//	}).show();
//            
//        $("#help").guider({
//            name: "secondExit",
//            next: "thirdExit",
//	title: 'Teclas utilizadas',
//            description: 'Caso tenha dúvidas referentes às teclas utilizadas no Pat2Math, clique neste botão para conferir a lista completa.',
//            closable: true,
//            position: "left",
//            alignButtons: "right",
//            width: 600,
//	buttons: {
//                 Próximo: {
//                     click: true,
//                     className: "primary"
//                 }
//	}
//	}); 
//            
//
//    $("#tour").guider({
//            name: "thirdExit",             
//	title: 'Se você mudar de ideia',
//            description: 'Clique neste botão para acessar a este tour novamente.',
//            closable: true,
//            position: "left",
//            alignButtons: "right",
//            width: 600,
//	buttons: {
//                 Entendi: {
//                     click: true,
//                     className: "primary"
//                 }
//	}
//	}); 
//            
//        isTourInterativo = false; 
//                                }
//                            },
//			"Só se for agora!": {
//				click: true,
//				className: "primary",
//				focus: true                                       
//			}
//		}
//	}).show();
//            
//	$().guider({
//		name: "second",
//		next: "third",
//		title: "Ótimo! Você verá que é muito fácil e divertido utilizar esse programa",
//		description: 'A qualquer momento você pode sair deste tour pressionando <font color="red">ESC</font>',
//                                  
//                    hashable: true,
//		position: "right",
//		alignButtons: "center",
//                    overlay: "dark",
//                    
//		buttons: {
//			"Vamos começar!": {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//	
//	$("#equationTour").guider({
//		name: "third",
//		next: "fourth",
//		title: "Este é o menu principal",
//		description: "Aqui você pode selecionar os planos de aula e suas respectivas equações para resolver.",       
//		position: "right",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//	
//	$.guider({
//		name: "fourth",
//		next: "fiveth",
//		title: "Planos de Aula",
//		description: "Os planos de aula são como as fases de um jogo.<br><br>Cada fase é composta por uma série de equações. ",
//	    alignButtons: "right", 
//	    buttons: {
//	    	Próximo: {
//                click: true,
//                className: "primary"
//            }
//	    }
//		});
//	
//	$().guider({
//		name: "fiveth",
//		next: "sixth",
//		title: "Passando de Fase",
//		description: "Ao resolver todas as equações de um plano de aula, você libera o próximo.<br><br>Essas equações podem ser resolvidas na ordem que você quiser.",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//	
//	$().guider({
//		name: "sixth",
//		next: "seventh",
//		title: "Níveis de Dificuldade",
//		description: "Conforme você passa de fase, o nível de dificuldade vai aumentando gradualmente.<br><br>Mas não se preocupe: se ficar muito difícil, nós podemos ajudar!",
//		alignButtons: "right",
//		closable: true, 
//		width: 610,
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//	
//	$("#equationTour").guider({
//		name: "seventh",
//		title: "Clique nesta equação",
//		description: "Vamos resolver juntos passo-a-passo para você entender as principais funcionalidades do Pat2Math.",
//		position: "right",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			OK: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//}
//
//function openTourSlim ( ) {
//	isTourInterativo = true;
//	
//	$.guider({
//		next: "second",
//		title: "Verificamos que a equação já foi resolvida",
//		description: "Vamos avançar um pouco no nosso tour para verificar outros detalhes importantes. ",
//	    alignButtons: "right", 
//	    buttons: {
//	    	Próximo: {
//                click: true,
//                className: "primary"
//            }
//	    }
//		}).show();
//	
//    $("#note").guider({
//		name: "second",
//		next: "third",
//		title: "Observe este painel",
//		description: "Ele contém o seu progresso na resolução das equações e mostra a sua pontuação da página atual.",
//		position: "left",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//    
//    $("#note").guider({
//		name: "third",
//		next: "fourth",
//		title: "Pontuação",
//		description: "Ao acertar um passo na equação, você ganha 10 pontos.<br><br>E se errar, você perde 5 pontos e recebe uma dica.",
//		position: "left",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//    
//    $("#hint").guider({
//		name: "fourth",
//		next: "fiveth",
//		title: "Pedindo dicas",
//		description: "Sempre que você estiver perdido em algum passo de uma equação, sinta-se à vontade de solicitar ajuda, clicando neste botão.",
//		position: "bottom",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//    
//    $("#help").guider({
//		name: "fiveth",
//		next: "sixth",
//		title: "Teclas utilizadas",
//		description: "Caso tenha dúvidas referentes às teclas utilizadas nas operações e interações com o programa, clique neste botão para conferir a lista completa.",
//		position: "left",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//    
//    $("#tour").guider({
//		name: "sixth",
//		title: "Você está liberado!",
//		description: "Se desejar, você pode acessar a este tour novamente clicando neste botão.",
//		position: "left",
//		alignButtons: "center",
//		closable: true, 
//		buttons: {
//			Finalizar: {
//                                click: true,
//                                className: "primary"
//                            }
//		}
//	});
//    
//    isTourInterativo = false;
//}
//
//function openTourSlimAlternative ( ) {
//	isTourInterativo = true;
//	
//	$.guider({
//		next: "second",
//		title: "Planos de Aula",
//		description: "Os planos de aula são como as fases de um jogo.<br><br>Cada fase é composta por uma série de equações. ",
//	    alignButtons: "right", 
//	    buttons: {
//	    	Próximo: {
//                click: true,
//                className: "primary"
//            }
//	    }
//		}).show();
//	
//	$().guider({
//		name: "second",
//		next: "third",
//		title: "Passando de Fase",
//		description: "Ao resolver todas as equações de um plano de aula, você libera o próximo.<br><br>Essas equações podem ser resolvidas na ordem que você quiser.",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//	
//	$().guider({
//		name: "third",
//		next: "fourth",
//		title: "Níveis de Dificuldade",
//		description: "Conforme você passa de fase, o nível de dificuldade vai aumentando gradualmente.<br><br>Mas não se preocupe: se ficar muito difícil, nós podemos ajudar!",
//		alignButtons: "right",
//		closable: true, 
//		width: 610,
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//	
//	$.guider({
//		name: "fourth",
//		next: "fiveth",
//		title: "Verificamos que a equação já foi resolvida",
//		description: "Vamos avançar um pouco no nosso tour para verificar outros detalhes importantes. ",
//	    alignButtons: "right", 
//	    buttons: {
//	    	Próximo: {
//                click: true,
//                className: "primary"
//            }
//	    }
//		});
//	
//    $("#note").guider({
//		name: "fiveth",
//		next: "sixth",
//		title: "Observe este painel",
//		description: "Ele contém o seu progresso na resolução das equações e mostra a sua pontuação da página atual.",
//		position: "left",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//    
//    $("#note").guider({
//		name: "sixth",
//		next: "seventh",
//		title: "Pontuação",
//		description: "Ao acertar um passo na equação, você ganha 10 pontos.<br><br>E se errar, você perde 5 pontos e recebe uma dica.",
//		position: "left",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//    
//    $("#hint").guider({
//		name: "seventh",
//		next: "eighth",
//		title: "Pedindo dicas",
//		description: "Sempre que você estiver perdido em algum passo de uma equação, sinta-se à vontade de solicitar ajuda, clicando neste botão.",
//		position: "bottom",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//    
//    $("#help").guider({
//		name: "eighth",
//		next: "ninth",
//		title: "Teclas utilizadas",
//		description: "Caso tenha dúvidas referentes às teclas utilizadas nas operações e interações com o programa, clique neste botão para conferir a lista completa.",
//		position: "left",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//    
//    $("#tour").guider({
//		name: "ninth",
//		title: "Você está liberado!",
//		description: "Se desejar, você pode acessar a este tour novamente clicando neste botão.",
//		position: "left",
//		alignButtons: "center",
//		closable: true, 
//		buttons: {
//			Finalizar: {
//                                click: true,
//                                className: "primary"
//                            }
//		}
//	});
//    
//    isTourInterativo = false;
//}
//function openTourSlimWithTopicOpen ( ) {
//	isTourInterativo = true;
//	
//	$.guider({
//		next: "second",
//		title: "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Bem-vindo!  </center>",
//		description: "<center>Você deseja passar pelo nosso Tour interativo antes de começar?</center>",
//                    closable: true,
//		overlay: "dark",
//		width: 600,
//                    alignButtons: "center",
//		buttons: {
//                            "Não, obrigado.": {
//                                click: function () {
//                                    $.guider({
//	title: "Tudo bem!",
//            next: "secondExit",
//	description: 'Confira a seguir as nossas considerações finais.',
//            closable: true,
//            alignButtons: "right",
//	buttons: {
//                 Próximo: {
//                     click: true,
//                     className: "primary"
//                 }
//	}
//	}).show();
//            
//        $("#help").guider({
//            name: "secondExit",
//            next: "thirdExit",
//	title: 'Teclas utilizadas',
//            description: 'Caso tenha dúvidas referentes às teclas utilizadas no Pat2Math, clique neste botão para conferir a lista completa.',
//            closable: true,
//            position: "left",
//            alignButtons: "right",
//            width: 600,
//	buttons: {
//                 Próximo: {
//                     click: true,
//                     className: "primary"
//                 }
//	}
//	}); 
//            
//
//    $("#tour").guider({
//            name: "thirdExit",             
//	title: 'Se você mudar de ideia',
//            description: 'Clique neste botão para acessar a este tour novamente.',
//            closable: true,
//            position: "left",
//            alignButtons: "right",
//            width: 600,
//	buttons: {
//                 Entendi: {
//                     click: true,
//                     className: "primary"
//                 }
//	}
//	}); 
//            
//        isTourInterativo = false; 
//                                }
//                            },
//			"Só se for agora!": {
//				click: true,
//				className: "primary",
//				focus: true                                       
//			}
//		}
//	}).show();
//            
//	$().guider({
//		name: "second",
//		next: "third",
//		title: "Ótimo! Você verá que é muito fácil e divertido utilizar esse programa",
//		description: 'A qualquer momento você pode sair deste tour pressionando <font color="red">ESC</font>',
//                                  
//                    hashable: true,
//		position: "right",
//		alignButtons: "center",
//                    overlay: "dark",
//                    
//		buttons: {
//			"Vamos começar!": {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//	
//	$("#equationTour").guider({
//		name: "third",
//		next: "fourth",
//		title: "Este é o menu principal",
//		description: "Aqui você pode selecionar os planos de aula e suas respectivas equações para resolver.",       
//		position: "right",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//	
//	$.guider({
//		name: "fourth",
//		next: "fiveth",
//		title: "Planos de Aula",
//		description: "Os planos de aula são como as fases de um jogo.<br><br>Cada fase é composta por uma série de equações. ",
//	    alignButtons: "right", 
//	    buttons: {
//	    	Próximo: {
//                click: true,
//                className: "primary"
//            }
//	    }
//		});
//	
//	$().guider({
//		name: "fiveth",
//		next: "sixth",
//		title: "Passando de Fase",
//		description: "Ao resolver todas as equações de um plano de aula, você libera o próximo.<br><br>Essas equações podem ser resolvidas na ordem que você quiser.",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//	
//	$().guider({
//		name: "sixth",
//		next: "seventh",
//		title: "Níveis de Dificuldade",
//		description: "Conforme você passa de fase, o nível de dificuldade vai aumentando gradualmente.<br><br>Mas não se preocupe: se ficar muito difícil, nós podemos ajudar!",
//		alignButtons: "right",
//		closable: true, 
//		width: 610,
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//	
//	$.guider({
//		name: "seventh",
//		next: "eighth",
//		title: "Verificamos que a equação já foi resolvida",
//		description: "Vamos avançar um pouco no nosso tour para verificar outros detalhes importantes. ",
//	    alignButtons: "right", 
//	    buttons: {
//	    	Próximo: {
//                click: true,
//                className: "primary"
//            }
//	    }
//		});
//	
//    $("#note").guider({
//		name: "eighth",
//		next: "ninth",
//		title: "Observe este painel",
//		description: "Ele contém o seu progresso na resolução das equações e mostra a sua pontuação da página atual.",
//		position: "left",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//    
//    $("#note").guider({
//		name: "ninth",
//		next: "tenth",
//		title: "Pontuação",
//		description: "Ao acertar um passo na equação, você ganha 10 pontos.<br><br>E se errar, você perde 5 pontos e recebe uma dica.",
//		position: "left",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//    
//    $("#hint").guider({
//		name: "tenth",
//		next: "eleventh",
//		title: "Pedindo dicas",
//		description: "Sempre que você estiver perdido em algum passo de uma equação, sinta-se à vontade de solicitar ajuda, clicando neste botão.",
//		position: "bottom",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//    
//    $("#help").guider({
//		name: "eleventh",
//		next: "twelfth",
//		title: "Teclas utilizadas",
//		description: "Caso tenha dúvidas referentes às teclas utilizadas nas operações e interações com o programa, clique neste botão para conferir a lista completa.",
//		position: "left",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//    
//    $("#tour").guider({
//		name: "twelfth",
//		title: "Você está liberado!",
//		description: "Se desejar, você pode acessar a este tour novamente clicando neste botão.",
//		position: "left",
//		alignButtons: "center",
//		closable: true, 
//		buttons: {
//			Finalizar: {
//                                click: true,
//                                className: "primary"
//                            }
//		}
//	});
//    
//    isTourInterativo = false;
//}
//function exitTour ( ) {
//	$.guider({
//		title: "Você pressionou esc e saiu do tour.",
//                next: "secondExit",
//		description: 'Confira a seguir as nossas considerações finais.',
//                closable: true,
//                alignButtons: "right",
//		buttons: {
//                     Próximo: {
//                         click: true,
//                         className: "primary"
//                     }
//		}
//		}).show();
//                
//            $("#help").guider({
//                name: "secondExit",
//                next: "thirdExit",
//		title: 'Teclas utilizadas',
//                description: 'Caso tenha dúvidas referentes às teclas utilizadas no Pat2Math, clique neste botão para conferir a lista completa.',
//                closable: true,
//                position: "left",
//                alignButtons: "right",
//		buttons: {
//                     Próximo: {
//                         click: true,
//                         className: "primary"
//                     }
//		}
//		}); 
//                
//
//        $("#tour").guider({
//                name: "thirdExit",             
//		title: 'Se você mudar de ideia',
//                description: 'Clique neste botão para acessar a este tour novamente.',
//                closable: true,
//                position: "left",
//                alignButtons: "right",
//		buttons: {
//                     Entendi: {
//                         click: true,
//                         className: "primary"
//                     }
//		}
//		}); 
//                
//            isTourInterativo = false; 
//}
//
//function checkEquationTour ( ) {
//	var id = 201;
//	
//	$.ajax({
//		type: 'POST',
//		url: appContext + "student/loadExercise",
//		data: {"exerciseId" : id},
//		success: function(data) {
//			if (data != null) {
//				equation = new Equation(data.equation, 100);
//				equation.id = data.id;
//				for(var j = 0; j < data.steps.length; j++) {
//					equation.steps[j] = new Step(data.steps[j], 0);
//				}
//					
//				if (data.performed) {
//					equationTourIsResolved = true;
//					return;
//				}
//				newEquations[0] = equation;
//			}
//		}
//	});
//}
//function resolutionPart1 (equation) {
//	var formaCompleta = equation === "x+2x+15=45-2x+2x" || equation === "x+15+2x=45-2x+2x"; 
//    var formaDireta = equation === "x+2x+15=45" || equation === "x+15+2x=45";
//    
//    if (formaCompleta || formaDireta) {
//        

//    
//    var descricao = 'Subtraia o "15" nos dois lados da equação e simplifique a expressão "-2x+2x" do lado direito.';
//    
//    if (formaDireta)
//        descricao = 'Subtraia o "15" nos dois lados da equação.';
//    
//    $("#linha4").guider({
//name: "fiveth",
//title: "Pois bem, vamos continuar a nossa resolução",
//description: descricao,
//
//position: "bottom",
//alignButtons: "center",
//closable: true, 
//buttons: {
//	OK: { 
//                        click: true,
//                        className: "primary"
//                    }
//}
//});       
//    } else {
//        $.guider({
//title: "Ops! Acho que você digitou algo errado",
//description: "Digite x+2x+15=45-2x+2x e tecle Enter (ou clique em<img src=/pat2math/patequation/img/lupa.png></img>) para continuarmos a resolução da equação.",
//            closable: true,
//            alignButtons: "center",
//buttons: {
//                    OK: { 
//                        click: true,
//                        className: "primary"
//                    }	
//}
//}).show();
//       return;   
//
//    }
//}
//
//function resolutionPart2 (equation) {
//	var formaCompleta = equation === "x+2x+15-15=45-15" || equation === "x+15+2x-15=45-15" || equation === "x+15-15+2x=45-15";
//    var formaDireta = equation === "x+2x=45-15";
//    if (formaCompleta) {
//        $.guider({
//title: "É isso aí!",
//description: 'Resolva agora as duas contas de adição e subtração para continuarmos, simplificando também a expressão "+15-15" do lado esquerdo.',
//            closable: true,
//            alignButtons: "center",
//buttons: {
//                    OK: { 
//                        click: true,
//                        className: "primary"
//                    }			
//}
//            
//}).show();
//    }
//    
//    else if (formaDireta) {
//        $.guider({
//title: "É isso aí!",
//description: 'Resolva agora as duas contas de adição e subtração para continuarmos.',
//            closable: true,
//            alignButtons: "center",
//buttons: {
//                    OK: { 
//                        click: true,
//                        className: "primary"
//                    }			
//}
//            
//}).show();
//    } else {
//        $.guider({
//title: "Ops! Acho que você digitou algo errado",
//description: "Digite x+2x+15-15=45-15 e tecle Enter (ou clique em<img src=/pat2math/patequation/img/lupa.png></img>) para continuarmos a resolução da equação.",
//            closable: true,
//            alignButtons: "center",
//buttons: {
//                    OK: { 
//                        click: true,
//                        className: "primary"
//                    }	
//}
//}).show();
//        return;
//    }
//}
//
//function resolutionPart3 (equation) {
//	if (equation === "3x=30") {
//        $.guider({
//title: "Ótimo!",
//description: 'Sabendo que o sinal da divisão é representado pela barra "/", resolva este passo da equação.',
//            closable: true,
//            alignButtons: "center",
//buttons: {
//                    OK: { 
//                        click: true,
//                        className: "primary"
//                    }			
//}
//            
//}).show();                  
//    } else {
//        $.guider({
//title: "Ops! Acho que você digitou algo errado",
//description: "Digite 3x=30 e tecle Enter (ou clique em<img src=/pat2math/patequation/img/lupa.png></img>) para continuarmos a resolução da equação.",
//            closable: true,
//            alignButtons: "center",
//buttons: {
//                    OK: { 
//                        click: true,
//                        className: "primary"
//                    }	
//}
//}).show();
//        return;
//    }  
//}
//
//function resolutionPart4 (equation) {
//	if (equation === "x=(30)/(3)") {
//        $.guider({
//title: "Perfeito!",
//description: "Para terminar, resolva esta divisão para descobrir o valor de X.",
//            closable: true,
//            alignButtons: "center",
//buttons: {
//                    OK: { 
//                        click: true,
//                        className: "primary"
//                    }			
//}                        
//}).show();
//    } else {
//        $.guider({
//title: "Ops! Acho que você digitou algo errado",
//description: "Digite x=30/3 e tecle Enter (ou clique em</pat2math/patequation/img src=img/lupa.png></img>) para continuarmos a resolução da equação.",
//            closable: true,
//            alignButtons: "center",
//buttons: {
//                    OK: { 
//                        click: true,
//                        className: "primary"
//                    }	
//}
//}).show();
//        return;
//    }
//}
//
//function resolutionPart5 (equation) {
//	if (equation === "x=10") {
//		equationTourIsResolved = true;
//        $.guider({
//title: "Parabéns! Você já está pronto para utilizar o Pat2Math!",
//            next: "second",
//description: "Confira a seguir as nossas considerações finais:",
//            closable: true,
//            alignButtons: "right",
//buttons: {
//                    Próximo: {
//		click: true,
//		className: "primary"
//	}
//}
//            
//}).show();
//

//    
//    $("#tour").guider({
//		name: "third",
//		title: "Você está liberado!",
//		description: "Se desejar, você pode acessar a este tour novamente clicando neste botão.",
//		position: "left",
//		alignButtons: "center",
//		closable: true, 
//		buttons: {
//			Finalizar: {
//                                click: true,
//                                className: "primary"
//                            }
//		}
//	});
//    isTourInterativo = false;
//    } else {
//        $.guider({
//title: "Ops! Acho que você digitou algo errado",
//description: "Digite x=10 e tecle Enter (ou clique em <img src=/pat2math/patequation/img/lupa.png> </img>) para terminar a resolução da equação.",
//            closable: true,
//            alignButtons: "center",
//buttons: {
//                    OK: { 
//                        click: true,
//                        className: "primary"
//                    }
//                    
//}
//}).show();
//        return;
//    }   
//}
//

//
//function clickEquation ( ) {	
//	if (equationTourIsResolved)
//		openTourSlim();
//	
//	else {
	
//}