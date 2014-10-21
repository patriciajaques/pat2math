function openTour ( ) {
	isTourInterativo = true;
	
	$.guider({
		next: "second",
		title: "<center> <img src=/pat2math/patequation/img/logo200x166.png></img><br> Bem-vindo!  </center>",
		description: "<center>Você deseja passar pelo nosso Tour interativo antes de começar?</center>",
                    closable: true,
		overlay: "dark",
		width: 600,
                    alignButtons: "center",
		buttons: {
                            "Não, obrigado.": {
                                click: function () {
                                    $.guider({
	title: "Tudo bem!",
            next: "secondExit",
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
            name: "secondExit",
            next: "thirdExit",
	title: 'Teclas utilizadas',
            description: 'Caso tenha dúvidas referentes às teclas utilizadas no Pat2Math, clique neste botão para conferir a lista completa.',
            closable: true,
            position: "left",
            alignButtons: "right",
            width: 600,
	buttons: {
                 Próximo: {
                     click: true,
                     className: "primary"
                 }
	}
	}); 
            

    $("#tour").guider({
            name: "thirdExit",             
	title: 'Se você mudar de ideia',
            description: 'Clique neste botão para acessar a este tour novamente.',
            closable: true,
            position: "left",
            alignButtons: "right",
            width: 600,
	buttons: {
                 Entendi: {
                     click: true,
                     className: "primary"
                 }
	}
	}); 
            
        isTourInterativo = false; 
                                }
                            },
			"Só se for agora!": {
				click: true,
				className: "primary",
				focus: true                                       
			}
		}
	}).show();
            
	$().guider({
		name: "second",
		next: "third",
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
	
	$("#equationTour").guider({
		name: "third",
		next: "fourth",
		title: "Este é o menu principal",
		description: "Aqui você pode selecionar os planos de aula e suas respectivas equações para resolver.",       
		position: "right",
		alignButtons: "right",
		closable: true, 
		buttons: {
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$(".topic").guider({
		name: "fourth",
		title: "Acesso às Equações",
		description: "Clique neste botão para conferir as equações do Plano de Aula 1.",     
		position: "right",
		alignButtons: "center",
		closable: true,
		buttons: {
			OK: {
				click: true,
				className: "primary"
			}
		}
	}); 
		
}

function openTourSlim ( ) {
	$.guider({
		next: "second",
		title: "Verificamos que a equação já foi resolvida",
		description: "Vamos avançar um pouco no nosso tour para verificar outros detalhes importantes. ",
	    alignButtons: "right", 
	    buttons: {
	    	Próximo: {
                click: true,
                className: "primary"
            }
	    }
		}).show();
	
    $("#note").guider({
		name: "second",
		next: "third",
		title: "Observe este painel",
		description: "Ele contém o seu progresso na resolução das equações e mostra a sua pontuação da página atual.",
		position: "left",
		alignButtons: "right",
		closable: true, 
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
    
    $("#note").guider({
		name: "third",
		next: "fourth",
		title: "Pontuação",
		description: "Ao acertar um passo na equação, você ganha 10 pontos.<br><br>E se errar, você perde 5 pontos e recebe uma dica.",
		position: "left",
		alignButtons: "right",
		closable: true, 
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
    
    $("#hint").guider({
		name: "fourth",
		next: "fiveth",
		title: "Pedindo dicas",
		description: "Sempre que você estiver perdido em algum passo de uma equação, sinta-se à vontade de solicitar ajuda, clicando neste botão.",
		position: "bottom",
		alignButtons: "right",
		closable: true, 
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
    
    $("#help").guider({
		name: "fiveth",
		next: "sixth",
		title: "Teclas utilizadas",
		description: "Caso tenha dúvidas referentes às teclas utilizadas nas operações e interações com o programa, clique neste botão para conferir a lista completa.",
		position: "left",
		alignButtons: "right",
		closable: true, 
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
    
    $("#tour").guider({
		name: "sixth",
		title: "Você está liberado!",
		description: "Se desejar, você pode acessar a este tour novamente clicando neste botão.",
		position: "left",
		alignButtons: "center",
		closable: true, 
		buttons: {
			Finalizar: {
                                click: true,
                                className: "primary"
                            }
		}
	});
    
    isTourInterativo = false;
}
