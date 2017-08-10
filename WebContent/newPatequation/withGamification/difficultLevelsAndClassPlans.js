var numLevels = 5;
var currentLevel;
var currentStage;
var numUnlockedLevels;
var numUnlockedStages;

var levels = new Array();
levels[1] = "Básico";
levels[2] = "Intermediário";
levels[3] = "Avançado";
levels[4] = "Expert";
levels[5] = "Season Finale";

var stages = new Array();
stages[1] = "O início";
stages[2] = "Existem letras negativas?";
stages[3] = "Coeficientes";
stages[4] = "Não esqueça dos sinais";
stages[5] = "Final (do primeiro nivel)";
stages[6] = "Para onde foram os coeficientes?";
stages[7] = "Sempre lembre dos sinais";
stages[8] = "ax + b = c";
stages[9] = "O que significa a fórmula anterior?";
stages[10] = "É o formato padrão de equações de 1º grau";
stages[11] = "Muitos termos!";
stages[12] = "Propriedade Distributiva (PD)";
stages[13] = "Razão e Proporção (RP)";
stages[14] = "Você percebeu que RP pode envolver PD?";
stages[15] = "Frações...";
stages[16] = "...e mais frações!";
stages[17] = "Parabéns! Você está quase lá!";
stages[18] = "Está preparado para o desafio final?";
stages[19] = "42";

var colorsLevels = new Array();
colorsLevels[1] = "#82C785"; //Verde
colorsLevels[2] = "#76bdda"; //Azul
colorsLevels[3] = "#F9A31B"; //Laranja
colorsLevels[4] = "#E4392C"; //Vermelho ou #E2233C
colorsLevels[5] = "#1E120D"; //Preto

var colorsTextLevels = new Array();
colorsTextLevels[1] = "darkgreen"; //Verde escuro
colorsTextLevels[2] = "#3b6577"; //Azul escuro
colorsTextLevels[3] = "#9c6500"; //Laranja escuro
colorsTextLevels[4] = "darkred"; //Vermelho escuro
colorsTextLevels[5] = "#ababab"; //Cinza claro

var colorsStagesPerLevel= new Array();
colorsStagesPerLevel[1] = "#3acf3ab3"; //Verde com um pouco de transparência
colorsStagesPerLevel[2] = "#c6c600b3"; //Amarelo Escuro com um pouco de transparência
colorsStagesPerLevel[3] = "#DA8E16CC"; //Laranja com um pouco de transparência
colorsStagesPerLevel[4] = "#a50000b3"; //Vermelho Escuro com um pouco de transparência
colorsStagesPerLevel[5] = "#292929cc"; //Preto com um pouco de transparência

function getNameStage(number) {
	if (number < stages.length -1) 
		return "Fase " + number + ": " + stages[number];
	
	else
		return stages[number];
}

function generateLevels() {
	var html = '<span class="topic" style="background: ' + colorsLevels[1] + '; color: ' + colorsTextLevels[1] + '; margin-bottom: 10px;" onclick="generateStages(1);">' + levels[1] + '</span> <div id="tasksLevel1" class="tasks"></div>';
	
	for (var i = 2; i < levels.length; i++) {
		html += '<div class="locked" id="lockLevel' + i + '" onclick="padlockClickLevel()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div>' +
				'<span class="topic" style="background: ' + colorsLevels[i] + '; color: ' + colorsTextLevels[i] + '; margin-bottom: 10px;" onclick="generateStages(' + i + ');">' + levels[i] + '</span> <div id="tasksLevel' + i + '" class="tasks"></div>';
	}

	document.getElementById("the_list").innerHTML = html;
}

function generateOthersLevels(levelOpened, htmlLevelOpened) {
	var html = '';
	
	if (levelOpened === 5) {
		html = htmlLevelOpened;
	}
	
	else {
		for (var i = 1; i < levels.length; i++) {
			var htmlLevel = '<span class="topic" style="margin-bottom: 10px; background: ' + colorsLevels[i] + ';" onclick="generateStages(' + i + ');">' + levels[i] + '</span> <div id="tasksLevel' + i + '" class="tasks"></div>';
		
			if (i === levelOpened) {
				htmlLevel = htmlLevel.replace("10px", "2px");
				html += htmlLevel + htmlLevelOpened;
			}
		
			else if (numUnlockedLevels <= i) {
				html += '<div class="locked" id="lockLevel' + i + '" onclick="padlockClickLevel()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div>' + htmlLevel;
			}
		}
	}
	
 	document.getElementById("the_list").innerHTML = html;
}

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
	
	var currentPlanDataBase = firstStage + 1000;
	
	var html;
	
	if (firstStage === 19)
		html = '<span class="topic" style="width: 255px; margin-left: 5px; background: ' + colorsLevels[level] + '" onclick="loadTasks(' + currentPlanDataBase + ')">' + getNameStage(firstStage) + '</span> <div id="tasks"' + currentPlanDataBase + 'class="tasks"></div>';

	else {
		html = '<span class="topic" style="width: 255px; margin-left: 5px; background: ' + colorsStagesPerLevel[level] + '" onclick="loadTasks(' + currentPlanDataBase + ')">' + getNameStage(firstStage) + '</span> <div id="tasks"' + currentPlanDataBase + 'class="tasks"></div>';
	
		for (var i = firstStage + 1; i < finalStage; i++) {
			currentPlanDataBase++;
			html += '<div class="locked" style="margin-left: 122px;" id="lockStage' + i + '" onclick="padlockClickStage()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div>' +
					'<span class="topic" style="width: 255px; margin-left: 5px; background: ' + colorsStagesPerLevel[level] + '" onclick="loadTasks(' + currentPlanDataBase + ')">&nbsp</span> <div id="tasks"' + currentPlanDataBase + 'class="tasks"></div>';
		}
	
		html += '<div class="locked" style="margin-left: 122px;" id="lockStage' + finalStage + '" onclick="padlockClickStage()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div>' +
		'<span class="topic" style="width: 255px; margin-left: 5px; margin-bottom: 10px; background: ' + colorsStagesPerLevel[level] + '" onclick="loadTasks(' + (currentPlanDataBase+1) + ')">&nbsp</span> <div id="tasks"' + (currentPlanDataBase+1) + 'class="tasks"></div>';
	}
	
	generateOthersLevels(level, html);
}

function click42() {
	window.open("https://www.google.com.br/search?q=resposta+para+a+vida%2C+o+universo+e+tudo+mais");
}
function verifyUnlockedLevels() {
	
}

function verifyUnlockedStages(level) {
	
}
