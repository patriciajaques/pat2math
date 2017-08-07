var totalScore;
var levelScore = new Array();
var stageScore = new Array();
var equationScore = new Array();

function getTotalScore() {
	try {
		totalScore = parseInt(getCookie("totalScore"));
	} catch (e) {
		//Se ocorreu uma exceção no comando acima, significa que não há um cookie salvo, portanto deverá verificar no banco de dados
		var database = false;
		
		//Este comando deverá ser atualizado com métodos que acessam o banco de dados para recuperar a pontuação do usuário
		if (database) {
			
		}
		
		//Se chegou até aqui, é porque o usuário é novo no sistema e ainda não resolveu nenhuma equação
		else 
			totalScore = 0;	
	}
}

function getLevelsScore() {
	
}