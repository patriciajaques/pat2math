// Variáveis que apontam para os Arrays contendo os textos do idioma selecionado
var guiderKeysTXT;					//	pat2math/WebContent/patequation/js/guider-2.1.0.min.js
var text;

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
		guiderKeysTXT = guiderKeys_enUK;
		text = text_enUK;
		break;
	case ("es-ES"):
		isTXT = "Seleccione un idioma para el pat2math";
		guiderKeysTXT = guiderKeys_esES;
		text = text_esES;
		break;
	default:
	case ("pt-BR"):
		isTXT = "Escolha um idioma para o pat2math";
		guiderKeysTXT = guiderKeys_ptBR;
		text = text_ptBR;
}


if(document.getElementById("elem0") != null)
	document.getElementById("elem0").innerHTML = text[0];
if(document.getElementById("elem1") != null)
	document.getElementById("elem1").innerHTML = text[1];
document.getElementById("loginWithFacebook").innerHTML = text[2];
document.getElementById("email").placeholder = text[3];
document.getElementById("password").placeholder = text[4];
document.getElementById("fbLoginButton").innerHTML = text[5];
document.getElementById("elem2").innerHTML = text[6];
if(document.getElementById("elem3") != null)
	document.getElementById("elem3").innerHTML = text[7];
document.getElementById("elem4").innerHTML = text[8];
document.getElementById("elem5").innerHTML = text[9];
document.getElementById("elem6").innerHTML = text[10];
document.getElementById("loginButton").value = text[14];

document.getElementById("currentFlag").innerHTML = '<img src="/pat2math/images/' + idioma + '.png" onclick="languageSelection()" style="width:6%; margin-right:-330px"/>';
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
