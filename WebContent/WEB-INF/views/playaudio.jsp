<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<script src="/pat2math/patequation/js/index.js"></script>

<style>
     #audio {
                background: url("/pat2math/patequation/img/modal_audio.png") no-repeat scroll center center transparent;
                width: 633px;
                height: 446px;
            }
            
            #play {
                background: url("/pat2math/patequation/img/botao_play.png") no-repeat scroll center center transparent;
                width: 172px;
                height: 128px;   
                position: relative; 
                margin: auto; 
                top: -160px; 
                right: 0; 
                bottom: 0; 
                left: 0;
                cursor: pointer;
            }
            
            #barraProgresso {
                position: relative; 
                margin: auto; 
                top: -120px; 
                right: 0; 
                bottom: 0; 
                left: 0;
            }
            
            #player {
                visibility:hidden;
            }
     </style>
</head>
<body>
<script>
var i;

// $(document).ready(function() {	
// 	if (!isPopup ( ))
// 	    location.href = "/pat2math/audio";
// });

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
	
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/1.gif border=0>"', 29166);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/2.gif border=0>"', 58332);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/3.gif border=0>"', 87498);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/4.gif border=0>"', 116664);
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
	var pos = getCookie  ("pos");
	var cookieName = "playAudio" + pos;
	setCookieDays (cookieName, "false", 1);
	location.href="/pat2math/student/home";	
}

function playAudio ( ) {
	if (!isPopup ( )) {
	    location.href = "/pat2math/audio";
	} else if (tipoAudio === 1) {
		var display = document.getElementById('play').style.display;
		document.getElementById('play').style.display = 'none';
		document.getElementById('player').innerHTML = '<iframe width="560" height="315" src="//www.youtube.com/embed/zCfGR1u06Rs?autoplay=1" frameborder="0" allowfullscreen></iframe>';
		mostraProgressoAudio1();
		setTimeout('endAudio()', 352000);
	} else {
		var display = document.getElementById('play').style.display;
		document.getElementById('play').style.display = 'none';
		document.getElementById('player').innerHTML = '<iframe width="560" height="315" src="//www.youtube.com/embed/-sa-Gq3OM5A?autoplay=1" frameborder="0" allowfullscreen></iframe>';
		mostraProgressoAudio2();
		setTimeout('endAudio()', 350000);
	}
}



</script>

        <div id="audio" class="box"></div>
        <div id="play" onclick="playAudio()"></div>
        <div id="progresso"></div>
        <div id="barraProgresso"></div>
        <div id="player"></div>

</body>
</html>