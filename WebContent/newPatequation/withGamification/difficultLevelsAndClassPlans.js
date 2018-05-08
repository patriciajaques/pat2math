var numLevels = 5;
var currentLevel;
var currentStage;
var unlockedLevels;
var levels;
var stages;
var stagesWithoutGamification;
	
var firstStagePerLevel = new Array();
firstStagePerLevel[1] = 1;
firstStagePerLevel[2] = 12;
firstStagePerLevel[3] = 22;
firstStagePerLevel[4] = 30;
firstStagePerLevel[5] = 42;

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



