// Variáveis que apontam para os Arrays contendo os textos do idioma selecionado
var dlcpTXT;						//	pat2math/WebContent/newPatequation/withGamification/difficultLevelsAndClassPlans.js
var guiderKeysTXT;					//	pat2math/WebContent/patequation/js/guider-2.1.0.min.js
var indexTXT;						//	pat2math/WebContent/newPatequation/index.js
var htmlTXT;						//	innerHTML de determinados elementos que contém texto
var levels;							//	pat2math/WebContent/newPatequation/withGamification/difficultLevelsAndClassPlans.js
var p2mTXT;							//	pat2math/WebContent/js/pat2math.js
var scoreTXT;						//	pat2math/WebContent/newPatequation/withGamification/score.js
var srTXT;							//	pat2math/WebContent/newPatequation/withGamification/fullGamification/specialReward.js
var stages;							//	pat2math/WebContent/newPatequation/withGamification/difficultLevelsAndClassPlans.js
var stagesWithoutGamification;		//	pat2math/WebContent/newPatequation/withGamification/difficultLevelsAndClassPlans.js
var tourTXT;						//	pat2math/WebContent/patequation/js/tour.js
var weTXT;							//	pat2math/WebContent/patequation/js/workedExamples.js
var wecTXT;							//	pat2math/WebContent/newPatequation/workedExamplesControlles.js
var weuTXT;							//	pat2math/WebContent/patequation/js/workedExamplesUtil.js


var idioma = getCookie("idiomaEscolhido");
	if(idioma == "") {
		idioma = navigator.language;
		if (idioma == "es")
			idioma = "es-ES";
		else if (idioma == "en")
			idioma = "en-UK";
		else if (idioma == "pt")
			idioma = "pt-BR";
	}
	
// Seleciona os Arrays de texto corretos, dependendo do idioma selecionado
switch(idioma) {
	case ("en-UK"):
		isTXT = "Select an idiom for PAT2Math";
		dlcpTXT = dlcp_enUK;
		guiderKeysTXT = guiderKeys_enUK;
		indexTXT = index_enUK;
		htmlTXT = html_enUK;
		levels = levels_enUK;
		p2mTXT = p2m_enUK;
		scoreTXT = score_enUK;
		srTXT = sr_enUK;
		stages = stages_enUK;
		stagesWithoutGamification = stagesWithoutGamification_enUK;
		tourTXT = tour_enUK;
		weTXT = we_enUK;
		wecTXT = wec_enUK;
		weuTXT = weu_enUK;
		break;
	case ("es-ES"):
		isTXT = "Seleccione un idioma para el pat2math";
		dlcpTXT = dlcp_esES;
		guiderKeysTXT = guiderKeys_esES;
		indexTXT = index_esES;
		htmlTXT = html_esES;
		levels = levels_esES;
		p2mTXT = p2m_esES;
		scoreTXT = score_esES;
		srTXT = sr_esES;
		stages = stages_esES;
		stagesWithoutGamification = stagesWithoutGamification_esES;
		tourTXT = tour_esES;
		weTXT = we_esES;
		wecTXT = wec_esES;
		weuTXT = weu_esES;
		break;
	default:
	case ("pt-BR"):
		isTXT = "Escolha um idioma para o pat2math";
		dlcpTXT = dlcp_ptBR;
		guiderKeysTXT = guiderKeys_ptBR;
		indexTXT = index_ptBR;
		htmlTXT = html_ptBR;
		levels = levels_ptBR;
		p2mTXT = p2m_ptBR;
		scoreTXT = score_ptBR;
		srTXT = sr_ptBR;
		stages = stages_ptBR;
		stagesWithoutGamification = stagesWithoutGamification_ptBR;
		tourTXT = tour_ptBR;
		weTXT = we_ptBR;
		wecTXT = wec_ptBR;
		weuTXT = weu_ptBR;
}

// Texto de elementos HTML variados
document.getElementById("help").title = htmlTXT[0];
document.getElementById("idiomSelection").title = htmlTXT[1];
document.getElementById("ranking").title = htmlTXT[2];
document.getElementById("refresh_page").title = htmlTXT[3];
document.getElementById("reportBug").title = htmlTXT[4];
document.getElementById("rewardWorkedExamples").title = htmlTXT[5];
document.getElementById("tour").title = htmlTXT[6];
document.getElementById("hint").innerHTML = htmlTXT[7];

// Atualiza a bandeira do botão de alteração de idioma
document.getElementById("currentFlag").innerHTML = '<img src="/pat2math/images/' + idioma + '.png" style="width: 6%; margin-top:16px">';
document.getElementById("currentFlag").title = idioma;

// Pede ao usuário que selecione o idioma, clicando na bandeira correspondente
function languageSelection() {
	var button;
	switch(idioma){
		default:
		case("pt-BR"):
			button = {"Pronto": {click: function() { $.guider({}).hideAll() }, className: "primary"}}
			break;
		case("es-ES"):
			button = {"Listo": {click: function() { $.guider({}).hideAll() }, className: "primary"}}
			break;
		case("en-UK"):
			button = {"Done": {click: function() { $.guider({}).hideAll() }, className: "primary"}}
			break;
	}
	$.guider({
		title: isTXT,
		alignButtons: "center",
		description: '<div id="idiomas"> '+
			'<span id="idiomSelection_ptBR" onclick="change_ptBR()" title="Português - Brasil"> <img src="/pat2math/images/pt-BR.png" style="width: 12%"/> </span>' + 
			'<span id="idiomSelection_esES" onclick="change_esES()" title="Español - España"> <img src="/pat2math/images/es-ES.png" style="width: 12%"/> </span>' + 
			'<span id="idiomSelection_enUK" onclick="change_enUK()" title="English - United Kingdom"> <img src="/pat2math/images/en-UK.png" style="width: 12%"/> </span>' + 
			'</div>',
		buttons: button,
		onShow: function() {$("#idiomSelection_ptBR").tooltip(); $("#idiomSelection_esES").tooltip(); $("#idiomSelection_enUK").tooltip();}
	}).show();
}

// Atualiza o cookie de idioma para "pt-BR"
function change_ptBR() {
	if (getCookie("idiomaEscolhido") == "pt-BR")
		$.guider({
			alignButtons: "center",
			title: "Idioma já definido como Português - Brasil",
			buttons: {"Oops": {click: function() { $.guider({}).hideAll() }, className: "primary"}}
		}).show();
	else {
		setCookieDays("idiomaEscolhido", "pt-BR", 5);
		$.guider({
			alignButtons: "center",
			title: "Idioma atualizado com sucesso!",
			description: "A página será atualizada",
			buttons: {"Legal!": {click: function() { location.reload(); }, className: "primary"}}
		}).show();
	}
}

//Atualiza o cookie de idioma para "en-UK"
function change_enUK() {
	if (getCookie("idiomaEscolhido") == "en-UK")
		$.guider({
			alignButtons: "center",
			title: "Idiom alreay defined as English - United Kingdom",
			buttons: {"Oops": {click: function() { $.guider({}).hideAll() }, className: "primary"}}
		}).show();
	else {
		setCookieDays("idiomaEscolhido", "en-UK", 5);
		$.guider({
			alignButtons: "center",
			title: "Language updated successfully!",
			description: "The page will be updated",
			buttons: {"Nice!": {click: function() { location.reload(); }, className: "primary"}}
		}).show();
	}
}

//Atualiza o cookie de idioma para "es-ES"
function change_esES() {
	if (getCookie("idiomaEscolhido") == "es-ES")
			$.guider({
				alignButtons: "center",
				title: "Idioma ya está establecido en Español - España",
				buttons: {"Oops": {click: function() { $.guider({}).hideAll() }, className: "primary"}}
			}).show();
	else {
		setCookieDays("idiomaEscolhido", "es-ES", 5);
		$.guider({
			alignButtons: "center",
			title: "¡Idioma actualizado con éxito!",
			description: "La página se actualizará",
			buttons: {"¡Bueno!": {click: function() { location.reload(); }, className: "primary"}}
		}).show();
	}
}

// Função de teste para chamar os textos do servidor
function getTextFromServer(key){
	var retorno;
	$.ajax({
		type: "GET",
		async: false,
		url: "newPatequation/getText",
		data: {"key" : key, "idioma" : idioma},
		success:
			function(data) {
				retorno = data;
			},
		error:
			 function(XMLHttpRequest, textStatus, errorThrown) {
		     	alert(indexTXT[39]);
		 	}
		});
	return retorno;
}