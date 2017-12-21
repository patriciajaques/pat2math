var numLevels = 5;
var currentLevel;
var currentStage;
var unlockedLevels;

var levels = new Array();
levels[1] = "Básico";
levels[2] = "Intermediário";
levels[3] = "Avançado";
levels[4] = "Expert";
levels[5] = "Season Finale";

var firstStagePerLevel = new Array();
firstStagePerLevel[1] = 1;
firstStagePerLevel[2] = 12;
firstStagePerLevel[3] = 22;
firstStagePerLevel[4] = 30;
firstStagePerLevel[5] = 42;

var stages = new Array();
stages[1] = "O início";
stages[2] = "A forma mais básica das equações";
stages[3] = "Uma pequena mudança";
stages[4] = "Resultado negativo";
stages[5] = "(Quase) Tudo negativo";
stages[6] = "Um pouco de cada";
stages[7] = "Existem letras negativas?";
stages[8] = "Na matemática existe!";
stages[9] = "A incógnita e o resultado negativos";
stages[10] = "Tudo negativo!";
stages[11] = "Uma revisão de tudo o que você viu até agora";
stages[12] = "Coeficientes";
stages[13] = "Coeficientes e resultado negativo";
stages[14] = "Não esqueça dos sinais";
stages[15] = "Tudo negativo! Versão 2.0";
stages[16] = "Uma fase sem nome";
stages[17] = "Para onde foram os coeficientes?";
stages[18] = "Sempre lembre dos sinais";
stages[19] = "Fração negativa";
stages[20] = "Fração negativa (e o resultado também!)";
stages[21] = "Tome cuidado com os sinais";
stages[22] = "ax + b = c";
stages[23] = "O que significa a fórmula anterior?";
stages[24] = "É o formato padrão de equações de 1º grau";
stages[25] = "Muitos termos (e equações)!";
stages[26] = "Muitos parênteses!";
stages[27] = "Propriedade Distributiva (PD)";
stages[28] = "Razão e Proporção (RP)";
stages[29] = "Você percebeu que RP pode envolver PD?";
stages[30] = "Frações...";
stages[31] = "...e mais frações!";
stages[32] = "Parabéns! Você está quase lá!";
stages[33] = "Está preparado para o desafio final?";
stages[42] = "42";

var stagesWithoutGamification = new Array();
stagesWithoutGamification[1] = "1. Relembrando o básico";
stagesWithoutGamification[2] = "2. X negativo";
stagesWithoutGamification[3] = "3. Coeficientes";
stagesWithoutGamification[4] = "4. Coeficientes negativos";
stagesWithoutGamification[5] = "5. Revisão dos planos anteriores";
stagesWithoutGamification[6] = "6. Coeficientes fracionários";
stagesWithoutGamification[7] = "7. Coeficientes fracionários com denominador negativo";
stagesWithoutGamification[8] = "8. Equações de primeiro grau completas";
stagesWithoutGamification[9] = "9. Equações de primeiro grau completas com coeficiente negativo";
stagesWithoutGamification[10] = "10. Revisão dos planos anteriores";
stagesWithoutGamification[11] = "11. Equações de primeiro grau completas com vários termos";
stagesWithoutGamification[12] = "12. Propriedade Distributiva";
stagesWithoutGamification[13] = "13. Razão e Proporção";
stagesWithoutGamification[14] = "14. Revisão dos planos anteriores";
stagesWithoutGamification[15] = "15. Frações simples";
stagesWithoutGamification[16] = "16. Frações compostas";
stagesWithoutGamification[17] = "17. Frações + propriedade distributiva";
stagesWithoutGamification[18] = "18. Revisão dos planos anteriores";
stagesWithoutGamification[19] = "19. Revisão final";

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
colorsStagesPerLevel[1] = "rgba(58, 207, 58, 0.7) none repeat scroll 0% 0%"; //Verde com um pouco de transparência
colorsStagesPerLevel[2] = "rgba(118, 189, 218, 0.7) none repeat scroll 0% 0%"; //Azul com um pouco de transparência
colorsStagesPerLevel[3] = "rgba(218, 142, 22, 0.8) none repeat scroll 0% 0%"; //Laranja com um pouco de transparência
colorsStagesPerLevel[4] = "rgba(165, 0, 0, 0.7) none repeat scroll 0% 0%"; //Vermelho Escuro com um pouco de transparência
//colorsStagesPerLevel[5] = "#292929cc"; //Preto com um pouco de transparência

function getNameStage(number) {
	if (number < stages.length -1) 
		return "Fase " + number + ": " + stages[number];
	
	else
		return stages[number];
}

function generateLevels() {
	var html = '<span id="level1" class="topicLevels" style="background: ' + colorsLevels[1] + '; color: ' + colorsTextLevels[1] + '; margin-bottom: 10px;" onclick="generateStages(1);">' + levels[1] + '</span> <div id="tasksLevel1" class="tasks"></div>';
	
	for (var i = 2; i < levels.length; i++) {
		if (unlockedLevels >= i) 
			html += '<span id="level' + i + '" class="topicLevels" style="background: ' + colorsLevels[i] + '; color: ' + colorsTextLevels[i] + '; margin-bottom: 10px;" onclick="generateStages(' + i + ');">' + levels[i] + '</span> <div id="tasksLevel' + i + '" class="tasks"></div>';
		
		else {
			html += '<div class="locked" id="lockLevel' + i + '" onclick="padlockClickLevel()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div>';
			html += '<span id="level' + i + '" class="topicLevels" style="background: ' + colorsLevels[i] + '; color: ' + colorsTextLevels[i] + '; margin-bottom: 10px;" onclick="padlockClickLevel()">' + levels[i] + '</span> <div id="tasksLevel' + i + '" class="tasks"></div>';
		}
	}
	
	if (unlockedLevels === 6) {
		unlockAllPlans = true;
		html += '<span class="topic" onclick="createRevisionPlans()">Modo Infinito</span>';
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
			var htmlLevel = '<span id="level' + i + '"class="topicLevels" style="background: ' + colorsLevels[i] + '; color: ' + colorsTextLevels[i] + '; margin-bottom: 10px; background: ' + colorsLevels[i] + ';" onclick="generateStages(' + i + ');">' + levels[i] + '</span> <div id="tasksLevel' + i + '" class="tasks"></div>';
		
			if (i === levelOpened) {
				htmlLevel = htmlLevel.replace("10px", "2px");
				html += htmlLevel + htmlLevelOpened;
			}
		
			else if (unlockedLevels < i) {
				html += '<div class="locked" id="lockLevel' + i + '" onclick="padlockClickLevel()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div>' +
				'<span id="level' + i + '" class="topicLevels" style="background: ' + colorsLevels[i] + '; color: ' + colorsTextLevels[i] + '; margin-bottom: 10px; background: ' + colorsLevels[i] + ';" onclick="padlockClickLevel()">' + levels[i] + '</span> <div id="tasksLevel' + i + '" class="tasks"></div>';;
			}
			
			else
				html += htmlLevel;
		}
	}
	
 	document.getElementById("the_list").innerHTML = html;
 	
 	var elementsStages = document.getElementsByClassName("topic");
 	
 	if (levelOpened < 5) {
 		for (var i = 0; i < elementsStages.length; i++) 
 			elementsStages[i].style.background = colorsStagesPerLevel[levelOpened];
 	}
}

function generateStagesWithoutGamification() {
	var html = "";
	for (var i = 1001; i <= 1018; i++) {
		html += '<span class="topic" style="width: 255px; margin-left: 5px; background: ' + colorsStagesPerLevel[1] + '" onclick="loadTasks(' + i + ')">' + stagesWithoutGamification[i-1000] + '</span> <div id="tasks' + i + '" class="tasks"></div>';	
	}
	
	document.getElementById("the_list").innerHTML = html;
}

function generateStages(level) {
	currentLevel = level;
	
	if (levelGamification === "full") {
		var cookieLevelScore = getCookie("levelScore");
		
		if (cookieLevelScore !== "")
			levelScore[currentLevel] = parseInt(cookieLevelScore);
		
		else
			getLevelsScoreDataBase();
		
	}
	
	if (unlockedPlans === 12 || unlockedPlans === 22 || unlockedPlans === 30 || unlockedPlans >= 34)
		theRoadSoFar();
	
	var firstStage = firstStagePerLevel[level];
	var finalStage;
	
	if (level < 5) {
		if (level < 4) 
			finalStage = firstStagePerLevel[level+1] - 1;
		
		else 
			finalStage = 33;	
	}
	
	else {
		firstStage = finalStage = 42;
	}
	
	var html;
	
	if (firstStage === 42)
		html = '<span class="topic" style="width: 255px; margin-left: 5px; background: ' + colorsLevels[level] + '" onclick="loadTasks(' + 42 + ')">' + getNameStage(firstStage) + '</span> <div id="tasks42" class="tasks"></div>';

	else {
		html = '<span class="topic" style="width: 255px; margin-left: 5px;" onclick="loadTasks(' + firstStage + ')">' + getNameStage(firstStage) + '</span> <div id="tasks' + firstStage + '" class="tasks"></div>';
	
		for (var i = firstStage + 1; i <= finalStage; i++) {
			if (unlockedPlans < i) {
				html += '<div class="locked" style="margin-left: 122px;" id="lockStage' + i + '" onclick="padlockClickStage()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div>' +		
				'<span id="stage' + i + '" class="topic" style="width: 255px; margin-left: 5px;" onclick="loadTasks(' + i + ')">&nbsp</span> <div id="tasks' + i + '" class="tasks"></div>';
			}
			
			else {
				html += '<span class="topic" style="width: 255px; margin-left: 5px;" onclick="loadTasks(' + i + ')">' + getNameStage(i) + '</span> <div id="tasks' + i + '" class="tasks"></div>';
			}
		}
	
//		if (unlockedPlans < 5)
//			html += '<div class="locked" style="margin-left: 122px;" id="lockStage' + finalStage + '" onclick="padlockClickStage()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div>';
		
//		html += '<span class="topic" style="width: 255px; margin-left: 5px; margin-bottom: 10px; background: ' + colorsStagesPerLevel[level] + '" onclick="loadTasks(' + (currentPlanDataBase+1) + ')">&nbsp</span> <div id="tasks"' + (currentPlanDataBase+1) + 'class="tasks"></div>';
	}
	
	if (levelGamification === "full")
		document.getElementById("levelScore").innerHTML = "Pontuação no nível atual: " + levelScore[level];
	
	generateOthersLevels(level, html);
}

function click42() {
	window.open("https://www.google.com.br/search?q=resposta+para+a+vida%2C+o+universo+e+tudo+mais");
}



