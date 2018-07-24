// Variáveis que apontam para os Arrays contendo os textos do idioma selecionado
var dlcpTXT;						//	pat2math/WebContent/newPatequation/withGamification/difficultLevelsAndClassPlans.js
var forgotPasswordTXT;				//	pat2math/WebContent/WEB-INF/views/user/forgotPassword.jsp
var guiderKeysTXT;					//	pat2math/WebContent/patequation/js/guider-2.1.0.min.js
var htmlTXT;						//	innerHTML de determinados elementos que contém texto
var indexTXT;						//	pat2math/WebContent/newPatequation/index.js
var levels;							//	pat2math/WebContent/newPatequation/withGamification/difficultLevelsAndClassPlans.js
var loginTXT;						//	pat2math/WebContent/WEB-INF/views/login/body.jsp --> elementos HTML
var newTXT;							//	pat2math/WebContent/WEB-INF/views/student
var p2mTXT;							//	pat2math/WebContent/js/pat2math.js
var scoreTXT;						//	pat2math/WebContent/newPatequation/withGamification/score.js
var serverTXT;						//	pat2Math/WebContent/newPatequation/server.js
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
		if (idioma.substring(0, 2) == "es")
			idioma = "es-ES";
		else if (idioma.substring(0, 2) == "en")
			idioma = "en-GB";
		else
			idioma = "pt-BR";
	}
	
// Seleciona os Arrays de texto corretos, dependendo do idioma selecionado
switch(idioma) {
	case ("en-GB"):
		dlcpTXT = dlcp_enGB;
		forgotPasswordTXT = forgotPassword_enGB;
		guiderKeysTXT = guiderKeys_enGB;
		htmlTXT = html_enGB;
		indexTXT = index_enGB;
		levels = levels_enGB;
		loginTXT = login_enGB;
		newTXT = new_enGB;
		p2mTXT = p2m_enGB;
		scoreTXT = score_enGB;
		serverTXT = server_enGB;
		srTXT = sr_enGB;
		stages = stages_enGB;
		stagesWithoutGamification = stagesWithoutGamification_enGB;
		tourTXT = tour_enGB;
		weTXT = we_enGB;
		wecTXT = wec_enGB;
		weuTXT = weu_enGB;
		break;
	case ("es-ES"):
		dlcpTXT = dlcp_esES;
		forgotPasswordTXT = forgotPassword_esES;
		guiderKeysTXT = guiderKeys_esES;
		htmlTXT = html_esES;
		indexTXT = index_esES;
		levels = levels_esES;
		loginTXT = login_esES;
		newTXT = new_esES;
		p2mTXT = p2m_esES;
		scoreTXT = score_esES;
		serverTXT = server_esES;
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
		dlcpTXT = dlcp_ptBR;
		forgotPasswordTXT = forgotPassword_ptBR;
		guiderKeysTXT = guiderKeys_ptBR;
		htmlTXT = html_ptBR;
		indexTXT = index_ptBR;
		levels = levels_ptBR;
		loginTXT = login_ptBR;
		newTXT = new_ptBR;
		p2mTXT = p2m_ptBR;
		scoreTXT = score_ptBR;
		serverTXT = server_ptBR;
		srTXT = sr_ptBR;
		stages = stages_ptBR;
		stagesWithoutGamification = stagesWithoutGamification_ptBR;
		tourTXT = tour_ptBR;
		weTXT = we_ptBR;
		wecTXT = wec_ptBR;
		weuTXT = weu_ptBR;
}


// Pede ao usuário que selecione o idioma, clicando na bandeira correspondente
function languageSelection() {
	var button;
	var title;
	switch(idioma){
		default:
		case("pt-BR"):
			title = "Escolha um idioma para o PAT2Math";
			button = {"Pronto": {click: function() { $.guider({}).hideAll() }, className: "primary"}}
			break;
		case("es-ES"):
			title = "Seleccione un idioma para el PAT2Math";
			button = {"Listo": {click: function() { $.guider({}).hideAll() }, className: "primary"}}
			break;
		case("en-GB"):
			title = "Select an idiom for PAT2Math"
			button = {"Done": {click: function() { $.guider({}).hideAll() }, className: "primary"}}
			break;
	}
	$.guider({
		title: title,
		alignButtons: "center",
		description: '<div id="idiomas"> '+
			'<span id="idiomSelection_ptBR" onclick="change_ptBR()" title="Português - Brasil"> <img src="/pat2math/images/pt-BR.png" style="width: 12%"/> </span>' + 
			'<span id="idiomSelection_esES" onclick="change_esES()" title="Español - España"> <img src="/pat2math/images/es-ES.png" style="width: 12%"/> </span>' + 
			'<span id="idiomSelection_enGB" onclick="change_enGB()" title="English - United Kingdom"> <img src="/pat2math/images/en-GB.png" style="width: 12%"/> </span>' + 
			'</div>',
		buttons: button,
		onShow: function() {$("#idiomSelection_ptBR").tooltip(); $("#idiomSelection_esES").tooltip(); $("#idiomSelection_enGB").tooltip();}
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

//Atualiza o cookie de idioma para "en-GB"
function change_enGB() {
	if (getCookie("idiomaEscolhido") == "en-GB")
		$.guider({
			alignButtons: "center",
			title: "Idiom alreay defined as English - United Kingdom",
			buttons: {"Oops": {click: function() { $.guider({}).hideAll() }, className: "primary"}}
		}).show();
	else {
		setCookieDays("idiomaEscolhido", "en-GB", 5);
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

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}