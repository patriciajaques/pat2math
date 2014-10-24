//function openTour ( ) {
//    isTourInterativo = true;
//    
//    if (topicIsOpen) {
//    	if (equationTourIsResolved)
//    		openTourSlimWithTopicOpen();
//    	
//    	else
//    		openTourWithTopicOpen();
//    }
//    
//    else {
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
//	$(".hide-menu").guider({
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
//	$(".topic").guider({
//		name: "fourth",
//		title: "Acesso às Equações",
//		description: "Clique neste botão para conferir as equações do plano de aula especial do tour.",     
//		position: "right",
//		alignButtons: "center",
//		closable: true,
//		buttons: {
//			OK: {
//				click: true,
//				className: "primary"
//			}
//		}
//	}); 
//    }
//		
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
//    $.guider({
//next: "second",
//title: "Muito bem!",
//description: "Por acertar este passo da equação, você ganhou 10 pontos.",
//            closable: true,
//            alignButtons: "right",
//buttons: {
//	Próximo: {
//		click: true,
//		className: "primary"
//	}
//}
//            
//}).show();            
//    
//    $("#note").guider({
//name: "second",
//next: "third",
//title: "Observe este painel",
//description: "Ele contém o seu progresso na resolução das equações e mostra a sua pontuação da página atual.",
//position: "left",
//alignButtons: "right",
//closable: true, 
//buttons: {
//	Voltar: true,
//	Próximo: {
//		click: true,
//		className: "primary"
//	}
//}
//});
//    
//    $("#note").guider({
//		name: "third",
//		next: "fourth",
//		title: "Pontuação",
//		description: "Toda vez que acertar um passo na equação, você ganha 10 pontos.<br><br>E se errar, você perde 5 pontos e recebe uma dica.",
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
//    $("#help").guider({
//name: "second",
//next: "third",
//title: "Teclas utilizadas",
//description: "Caso tenha dúvidas referentes às teclas utilizadas nas operações e interações com o programa, clique neste botão para conferir a lista completa.",
//
//position: "left",
//alignButtons: "right",
//closable: true, 
//buttons: {
//	Voltar: true,
//	Próximo: {
//		click: true,
//		className: "primary"
//	}
//}
//});
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
//function clickPlan ( ) {
//	if (equationTourIsResolved) 
//		openTourSlimAlternative();
//	
//	else {
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
//	$().guider({
//		name: "fourth",
//		title: "Clique na equação",
//		description: "Vamos resolver juntos passo-a-passo para você entender as principais funcionalidades do Pat2Math.",
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
//	}
//}
//
//function clickEquation ( ) {	
//	if (equationTourIsResolved)
//		openTourSlim();
//	
//	else {
//	$.guider({
//		next: "second",
//		title: "Esta é a sua interface principal",
//		description: "Aqui estão as principais funcionalidades que você utilizará para resolver as equações do Pat2Math.<br><br>Continue com o tour para descobrir!",
//	    alignButtons: "right", 
//	    buttons: {
//	    	Próximo: {
//                click: true,
//                className: "primary"
//            }
//	    }
//		}).show();
//	
//	$("#linha3").guider({
//		name: "second",
//		next: "third",
//		title: "As equações iniciais sempre estarão na primeira linha",
//		description: "Para resolvê-las, basta clicar nas caixas de texto nas linhas abaixo delas e digitar o próximo passo.",    
//		position: "bottom",
//		alignButtons: "right",
//		buttons: {
//			Voltar: true,
//			Próximo: {
//				click: true,
//				className: "primary"
//			}
//		}
//	});
//	
//	$("#linha3").guider({
//		name: "third",
//        next: "fourth",
//		title: "Agora, nós vamos resolver esta equação passo-a-passo",
//		description: 'Para começar, adicione "+2x" nos dois lados da equação, para simplificar o segundo lado e manter a equação balanceada.',
//    
//		width: 600,
//		position: "bottom",
//		alignButtons: "right",
//		closable: true, 
//		buttons: {
//                            Voltar: true,
//			Próximo: {
//                                click: true,
//                                className: "primary"
//                            }
//		}
//	});
//            
//        $("#linha3").guider({
//		name: "fourth",
//		title: "Veja como é fácil",
//		description: 'Digite x+2x+15=45-2x+2x e tecle enter ou clique no ícone<img src=/pat2math/patequation/img/lupa.png></img> localizado ao final da linha.',    
//		width: 620,
//		position: "bottom",
//		alignButtons: "center",
//		closable: true, 
//		buttons: {
//			OK: {
//                                click: true,
//                                className: "primary"
//                            }
//		}
//	});
//	}
//}