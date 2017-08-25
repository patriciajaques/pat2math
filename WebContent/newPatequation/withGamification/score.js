var totalScore;
var levelScore = new Array();
var stageScore = new Array();

//Para diminuir a pontuação, a quantidade passada por parâmetro deve ser negativa
function addOrRemoveScore(amount) {
	totalScore += amount;
	levelScore[currentLevel] += amount;
//	stageScore[currentStage] += amount;
	
	updateScoreUI();
//	updateScoreCookies();
	updateScoreDataBase(amount);
	
}
function updateScoreUI() {
	document.getElementById("totalScore").innerHTML = "Pontuação total: " + totalScore;
	
	if (currentLevel !== undefined)
		document.getElementById("levelScore").innerHTML = "Pontuação no nível atual: " + levelScore[currentLevel];
//	document.getElementById("stageScore").innerHTML = "Pontuação na fase atual: " + stageScore[currentStage];
}
function updateScoreCookies() {
	setCookieDays("totalScore", totalScore, 1);
	
	var splitLevel = getCookie("levelScore").split(";");
//	var splitStage = getCookie("stageScore").split(";");
	
	splitLevel[currentLevel-1] = levelScore[currentLevel];
//	splitStage[currentStage-1] = stageScore[currentStage];
	
	var newCookieLevel = splitLevel[0];
//	var newCookieStage = splitStage[0];
	var i = 1;
	
	for (; i < splitLevel.length; i++) {
		newCookieLevel += ";" + splitLevel[i];
//		newCookieStage += ";" + splitStage[i];
	}
	
//	for (; i < splitStage.length; i++) {
//		newCookieStage += ";" + splitStage[i];
//	}
	
	setCookieDays("levelScore", newCookieLevel, 1);
//	setCookieDays("stageScore", newCookieStage, 1);
	
	var cookieEquationScore = selectedEquation.userPoints + ";" + selectedEquation.userErrorPoints;
	var cookieName = "equationScore" + idEquation;
	setCookieMinutes(cookieName, cookieEquationScore, 10);
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

function getTotalScoreDataBase() {
	$.ajax({
		type : "GET",
		url : "newPatequation/getScore",
		data : {
			"level" : 0
		},
		success : function(data) {
			totalScore = parseInt(data);
			updateScoreUI();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ocorreu um erro inesperado");
		}
	});
}

function getLevelsScoreDataBase() {
	$.ajax({
		type : "GET",
		url : "newPatequation/getScore",
		data : {
			"level" : 1
		},
		success : function(data) {
			var split = data.split(";");
			levelScore[currentLevel] = parseInt(split[currentLevel-1]);
			updateScoreUI();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ocorreu um erro inesperado");
		}
	});
}

function updateScoreDataBase(amount) {
	$.ajax({
		type : "GET",
		url : "newPatequation/updateScore",
		data : {
			"amount" : amount,
			"level" : currentLevel
		},
		success : function(data) {
			console.log(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Ocorreu um erro inesperado");
		}
	});
}