var totalScore;
var levelScore = new Array();
var stageScore = new Array();

//Para diminuir a pontuação, a quantidade passada por parâmetro deve ser negativa
function addOrRemoveScore(amount) {
	totalScore += amount;
	levelScore[currentLevel] += amount;
	stageScore[currentStage] += amount;
	
	updateScoreUI();
	updateScoreCookies();
	updateScoreDataBase();
	
}

function updateScoreUI() {
	document.getElementById("totalScore").innerHTML = "Pontuação total: " + totalScore;
	document.getElementById("levelScore").innerHTML = "Pontuação no nível atual: " + levelScore[currentLevel];
	document.getElementById("stageScore").innerHTML = "Pontuação na fase atual: " + stageScore[currentStage];
}
function updateScoreCookies() {
	setCookieDays("totalScore", totalScore, 1);
	
	var splitLevel = getCookie("levelScore").split(";");
	var splitStage = getCookie("stageScore").split(";");
	
	splitLevel[currentLevel-1] = levelScore[currentLevel];
	splitStage[currentStage-1] = stageScore[currentStage];
	
	var newCookieLevel = splitLevel[0];
	var newCookieStage = splitStage[0];
	var i = 1;
	
	for (; i < splitLevel.length; i++) {
		newCookieLevel += ";" + splitLevel[i];
		newCookieStage += ";" + splitStage[i];
	}
	
	for (; i < splitStage.length; i++) {
		newCookieStage += ";" + splitStage[i];
	}
	
	setCookieDays("levelScore", newCookieLevel, 1);
	setCookieDays("stageScore", newCookieStage, 1);
	
	var cookieEquationScore = selectedEquation.userPoints + ";" + selectedEquation.userErrorPoints;
	
	setCookieDays("equationScore", cookieEquationScore, 1);
}

function updateScoreDataBase() {
	//Neste momento deverão ser salvos no banco de dados na tabela correspondente todas as pontuações (total, por nível, por fase e por equação (a por equação está na variável selectedEquation, e deverá ser salvo no banco de dados também a pontuação perdida por equação, adicionar essa coluna na tabela))
}

function reloadTotalScore() {
	totalScore = parseInt(getCookie("totalScore"));
	document.getElementById("totalScore").innerHTML = "Pontuação total: " + totalScore;
}

function reloadLevelsScore() {
	var split = getCookie("levelScore").split(";");
	
	for (var i = 0; i < split.length; i++) {
		levelScore[i+1] = parseInt(split[i]);
	}
}

function reloadStagesScore() {
	var split = getCookie("stageScore").split(";");
	
	for (var i = 0; i < split.length; i++) {
		stageScore[i+1] = parseInt(split[i]);
	}
}