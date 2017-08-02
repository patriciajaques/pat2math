var stages = new Array();
stage[1] = "O início";
stage[2] = "Existem letras negativas?";
stage[3] = "Coeficientes";
stage[4] = "Não esqueça dos sinais";
stage[5] = "Final (do primeiro nivel)";
stage[6] = "Para onde foram os coeficientes?";
stage[7] = "Sempre lembre dos sinais";
stage[8] = "ax + b = c";
stage[9] = "O que significa a fórmula anterior?";
stage[10] = "É o formato padrão de equações de 1º grau";
stage[11] = "Muitos termos!";
stage[12] = "Propriedade Distributiva (PD)";
stage[13] = "Razão e Proporção (RP)";
stage[14] = "Você percebeu que RP pode envolver PD?";
stage[15] = "Frações...";
stage[16] = "...e mais frações!";
stage[17] = "Parabéns! Você está quase lá!";
stage[18] = "Está preparado para o desafio final?";
stage[19] = "42";

function getNameStage(number) {
	return "Fase " + number + ": " + stage[number];
}

function generateLevels() {
	var html = '<span class="topic" onclick="generateStages(1);">Básico</span> <div id="tasksLevel1" class="tasks"></div>' +
				 '<div class="locked" id="lockLevel2" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div>' +
				 '<span class="topic" onclick="generateStages(2);">Intermediário</span> <div id="tasksLevel2" class="tasks"></div>' +
				 '<div class="locked" id="lockLevel3" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div>' +
				 '<span class="topic" onclick="generateStages(3);">Avançado</span> <div id="tasksLevel3" class="tasks"></div>' +
				 '<div class="locked" id="lockLevel4" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div>' +
				 '<span class="topic" onclick="generateStages(4);">Expert</span> <div id="tasksLevel4" class="tasks"></div>' +
				 '<div class="locked" id="lockLevel5" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div>' +
				 '<span class="topic" onclick="generateStages(5);">Season Finale</span> <div id="tasksLevel5" class="tasks"></div>';
	
	document.getElementById("the_list").innerHTML = html;
}

//Fazer um sistema de as fases irem aparecendo uma por vez, e não aparecer todas com cadeados.
//Desta maneira, com exceção da primeira fase de cada nível, as outras deverão ter a visibilidade escondida (hidden)
//Há uma função JavaScript que faz o update na visibilidade facilmente, pela document.getElementById(ID).style.visibility = "inline"
//Assim que o usuário resolver a última equação da última fase, deverá voltar para a tela dos níveis automaticamente, e aparecer o cadeado aberto no próximo nível
//De forma similar aos planos de aula atuais. 
//Além disso, em cada um dos níveis, abaixo de todas as fases deverá ter um botão "Voltar para o nível anterior", pode ser apenas uma seta para a esquerda
//ou um botão no formato padrão dos planos com o escrito "Voltar à seleção de níveis"

function generateStages(level) {
	var firstStage, finalStage;
	
	if (level < 5) {
		if (level < 3) {
			firstStage = 1 + (level-1) * 5;
			finalStage = firstStage + 4;
		}
		
		else {
			firstStage = 11 + (level-3) * 4;
			finalStage = firstStage + 3;
		}
	}
	
	else {
		firstStage = finalStage = 19;
	}
	
	var currentPlanDataBase = level + 1000;
	
	var html = '<span class="topic" onclick="loadTasks(' + currentPlanDataBase + ')">' + getNameStage(firstStage) + '</span> <div id="tasks"' + currentPlanDataBase + 'class="tasks"></div>';
	
	for (var i = firstStage + 1; i <= finalStage; i++) {
		currentPlanDataBase++;
		html += '<span style="visibility: hidden" class="topic" onclick="loadTasks(' + currentPlanDataBase + ')">' + getNameStage(i) + '</span> <div id="tasks"' + currentPlanDataBase + 'class="tasks"></div>';
	}
	
	html += '<span class="topic" onclick="createLevels()">Voltar ao menu de níveis</span> <div class="tasks"></div>';
	
	return html;
	
}

function verifyUnlockedLevels() {
	
}

function verifyUnlockedStages(level) {
	
}
