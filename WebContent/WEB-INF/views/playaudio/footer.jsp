<script src="/pat2math/patequation/js/index.js"></script>
<script src="/pat2math/patequation/js/guider-2.1.0.min.js"></script>

<script>
var currentPos = getCookie ("pos");
var cookieName = "playAudio" + currentPos;

if (getCookie (cookieName) === "false")
	location.href="/pat2math/student/home";	
	
var i;
var tipoAudio = getCookie ("tipoAudio");
var showConfirmation = true;
var tempoAudio = 352000;
setColor();

// if (tipoAudio === "2")
// 	setTimeout ('showNotification()', 1000);

	
function showNotification ( ) {
	$.guider({
    	title: "Adicionamos um novo áudio!",
    	description: "Clique no botão play para ouvir.",
        alignButtons: "center",
    	buttons: {
    		OK: {
				click: true,
				className: "primary"
			}
    	}   	            
    	}).show();
}

function setColor ( ) {
	var color = Math.floor((Math.random() * 2) + 1);
	
	if (tipoAudio === "1") {
		if (color === 1)
			document.body.style.background = "#FFD1EA";
		
		else
			document.body.style.background = "#D1E8FF";
	}
	
	else {
		if (color === 1)
			document.body.style.background = "#FFDEAE";
		
		else
			document.body.style.background = "#DFFFCC";
	}
}

function mostraProgressoAudio ( ) {
	document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/0.gif border=0>";
	var tamanhoBarraProgresso = 12;
	var parcelaTempo = Math.round(tempoAudio/(tamanhoBarraProgresso+1));
	
	for (var i = 1; i <= tamanhoBarraProgresso; i++) {
		var innerHTML = 'document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/' + i + '.gif border=0>"';
		var tempo = parcelaTempo * i;
		setTimeout (innerHTML, tempo);
	}
}
function mostraProgressoAudio1 ( ) {
	document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/0.gif border=0>";
	
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/1.gif border=0>"', 29333);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/2.gif border=0>"', 58666);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/3.gif border=0>"', 87999);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/4.gif border=0>"', 117332);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/5.gif border=0>"', 146665);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/6.gif border=0>"', 175998);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/7.gif border=0>"', 205331);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/8.gif border=0>"', 234664);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/9.gif border=0>"', 263997);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/10.gif border=0>"', 293330);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/11.gif border=0>"', 322663);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/12.gif border=0>"', 351996);
} 

function mostraProgressoAudio2 ( ) {	
	document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/0.gif border=0>";
	
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/1.gif border=0>"', 22692);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/2.gif border=0>"', 45384);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/3.gif border=0>"', 68076);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/4.gif border=0>"', 90768);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/5.gif border=0>"', 145830);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/6.gif border=0>"', 174996);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/7.gif border=0>"', 204162);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/8.gif border=0>"', 233328);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/9.gif border=0>"', 262494);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/10.gif border=0>"', 291660);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/11.gif border=0>"', 320826);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/12.gif border=0>"', 349992);

}

function endAudio ( ) {
	showConfirmation = false;
	currentPos = getCookie ("pos");
	var cookieName = "playAudio" + currentPos;
	setCookieDays (cookieName, "false", 1);
	location.href="/pat2math/student/home";	
}

function playAudio ( ) {	

		window.onbeforeunload = function () {
			if (showConfirmation) {
				return "confirmacaoSaida";
			}
		}
	
	if (tipoAudio === "1") {
		var display = document.getElementById('play').style.display;
		document.getElementById('play').style.display = 'none';
		document.getElementById('player').innerHTML = '<iframe width="560" height="315" src="//www.youtube.com/embed/zCfGR1u06Rs?autoplay=1" frameborder="0" allowfullscreen></iframe>';
		setTimeout('endAudio()', tempoAudio);
	} else {
		tempoAudio = 295000;
		var display = document.getElementById('play').style.display;
		document.getElementById('play').style.display = 'none';
		document.getElementById('player').innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/Ok7eZZ7OxWM?autoplay=1" frameborder="0" allowfullscreen></iframe>';	                                               
		setTimeout('endAudio()', tempoAudio);
	}
	
	mostraProgressoAudio();
}
</script>