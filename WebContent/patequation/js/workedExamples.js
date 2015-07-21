function tutorialWorkedExamples ( ) {
	$.guider({
		name: "start",
		next: "start2",
		title: "Exemplos Resolvidos",
		description: "Para melhorar o seu aprendizado, o PAT2Math conta com o sistema de Exemplos Resolvidos. Você entenderá como ele funciona a seguir. ",
	    alignButtons: "right", 
	    buttons: {
	    	Próximo: {
                click: true,
                className: "primary"
            }
	    }
		}).show();
	
	$().guider({
		name: "start2",
		next: "start3",
		title: "O que são Exemplos Resolvidos",
		description: "Consiste em um procedimento no qual o programa resolve um problema passo-a-passo, e o usuário vai acompanhando o andamento da resolução.",
		alignButtons: "right",
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$().guider({
		name: "start3",
		next: "start4",
		title: "Como os Exemplos Resolvidos funcionam no PAT2Math",
		description: "No nosso caso, os problemas são as equações. O sistema irá resolver a primeira equação de cada um dos planos de aula, e você acompanhará esse processo passo-a-passo.",
		alignButtons: "right",
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$().guider({
		name: "start4",
		next: "start5",
		title: "O que devo fazer para acompanhar a resolução de uma equação",
		description: "O procedimento realmente é muito simples.A lupa foi substituída pelo botão play; ao clicar nele, o próximo passo da equação é resolvido.",
		alignButtons: "right",
		buttons: {
			Voltar: true,
			Próximo: {
				click: true,
				className: "primary"
			}
		}
	});
	
	$("#button").guider({
		name: "start5",
		title: "Experimente!",
		description: "Clique no botão play para dar início ao seu primeiro Exemplo Resolvido.",
		alignButtons: "right",
		position: "left",
		buttons: {
			Voltar: true,
			OK: {
				click: true,
				className: "primary"
			}
		}
	});
}

function finishTutorial ( ) {
	$.guider({
		name: "finish",
		next: "finish2",
		title: "Primeiro passo da equação resolvido com sucesso!",
		description: "Agora você deve analisar o que foi feito. Quando estiver pronto, clique novamente no botão play para resolver o próximo passo. ",
	    alignButtons: "right", 
	    buttons: {
	    	Próximo: {
                click: true,
                className: "primary"
            }
	    }
		}).show();
	
	$.guider({
    	name: "finish2",
    	title: "Muito bem!",
		description: "Você já está pronto para prosseguir sozinho. Clique no botão abaixo para concluir este tutorial.",
		alignButtons: "right",
		closable: true, 
		buttons: {
			Finalizar: {
               click: true,
               className: "primary"
            }
		}
    	});
}

function showExplanation ( ) {
	var regra = regras[regraWE];
	
	$.guider({
		title: regra.nome,
		description: regra.explicacao,
	    alignButtons: "center", 
	    buttons: {
	    	OK: {
				click: true,
				className: "primary"
			}
	    }
		}).show();
}

var regras = new Array ( );
regras["AD"] = new Regra ("Soma", "explicação");
regras["SB"] = new Regra ("Subtração", "explicação");
regras["DV"] = new Regra ("Divisão", "explicação");
regras["MT"] = new Regra ("Multiplicação", "explicação");
regras["MM"] = new Regra ("Mínimo Múltiplo Comum (MMC)", "explicação");
regras["DM"] = new Regra ("Distributiva", "explicação");
regras["FC"] = new Regra ("Fator Comum", "explicação");
regras["QS"] = new Regra ("Quadrado da Soma", "explicação");
regras["QD"] = new Regra ("Quadrado da Diferença", "explicação");
regras["PS"] = new Regra ("Produto da Soma pela Diferença", "explicação");
regras["BK"] = new Regra ("Bháskara", "explicação");
regras["OI"] = new Regra ("Operação Inversa", "explicação");
regras["SP"] = new Regra ("Simplificação", "explicação");
regras["RC"] = new Regra ("Racionalização", "explicação");
regras["FT"] = new Regra ("Fatoração", "explicação");
regras["RZ"] = new Regra ("Raiz", "explicação");
regras["PT"] = new Regra ("Potenciação", "explicação");
regras["RE"] = new Regra ("Reescrever Equação", "explicação");
regras["PA"] = new Regra ("Princípio Aditivo", "explicação");
regras["PM"] = new Regra ("Princípio Multiplicativo", "explicação");
regras["AF"] = new Regra ("Soma ou Subtração de Frações", "explicação");
regras["MF"] = new Regra ("Multiplicação de Frações", "explicação");
regras["DF"] = new Regra ("Divisão de Frações", "explicação");