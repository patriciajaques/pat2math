<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html lang="en">
<head>
<style>
     #audio {
                background: url("/pat2math/patequation/img/modal_audio.png") no-repeat scroll center center transparent;
                width: 633px;
                height: 446px;
/*                 margin: auto;  */
/*                 position: absolute;  */
/*                 top: 0;  */
/*                 right: 0;  */
/*                 bottom: 0;  */
/*                 left: 0; */
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
var tipoAudio = 0;

$(document).ready(function() {	
	var temp = 42;
	
	if (tipoAudio === 0)
	    location.href = "/pat2math/student/home";
});

function playAudio ( ) {
	if (tipoAudio === 1) {
		var display = document.getElementById('play').style.display;
	    document.getElementById('play').style.display = 'none';
// 		document.getElementById('audio').innerHTML= "<audio autoplay> <source src='/pat2math/patequation/audio/mindfulness.ogg' type='audio/ogg' preload='auto'> </audio>";	
		document.getElementById('player').innerHTML= '<iframe width="560" height="315" src="//www.youtube.com/embed/zCfGR1u06Rs?autoplay=1" frameborder="0" allowfullscreen></iframe>';	
		
		mostraProgressoAudio1();
		setTimeout('location.href="/pat2math/student/home"',352000); 
//	try {
//    $.guider({
//		description: "<div style='position:relative; top:0px; left:0px;'> <audio autoplay> <source src='/pat2math/patequation/audio/mindfulness.ogg' type='audio/ogg' preload='auto'> </audio>",
//                closable: false,
//                overlay: "dark",
//                alignButtons: "right",
//                width: 620
//		}).show();  

    
    //347000
//	} catch (e) {
//		window.location.reload();	
//	}
	} else if (tipoAudio === 2) {
		var display = document.getElementById('play').style.display;
	    document.getElementById('play').style.display = 'none';
// 		document.getElementById('audio').innerHTML= "<audio autoplay> <source src='/pat2math/patequation/audio/historia.ogg' type='audio/ogg' preload='auto'> </audio>";
        document.getElementById('player').innerHTML= '<iframe width="560" height="315" src="//www.youtube.com/embed/-sa-Gq3OM5A?autoplay=1" frameborder="0" allowfullscreen></iframe>';	
		mostraProgressoAudio2();
		setTimeout('location.href="/pat2math/student/home"',350000); 
//		try {
//	    $.guider({
//			description: "<div style='position:relative; top:0px; left:0px;'> <audio autoplay> <source src='/pat2math/patequation/audio/mindfulness.ogg' type='audio/ogg' preload='auto'> </audio>",
//	                closable: false,
//	                overlay: "dark",
//	                alignButtons: "right",
//	                width: 620
//			}).show();  
//
//	    
//	    //345000
//		} catch (e) {
//			window.location.reload();	
//		}
	} else { 
		location.href = "/pat2math/student/home";
	}
}
</script>
       <c:if test="${student.group.id == 2}"> 
    	 <script type="text/javascript">
    	 	tipoAudio = 1;
    	 	
    	</script>
   	</c:if>
    
    <c:if test="${student.group.id == 4}">
    	<script type="text/javascript">
    	   tipoAudio = 1;
    	   
    	</script>
    </c:if>
    
    <c:if test="${student.group.id == 3}">
    	<script type="text/javascript">
    	    tipoAudio = 2;
    	   
    	</script>
    </c:if>
    
    <c:if test="${student.group.id == 5}">
    	<script type="text/javascript">
    	    tipoAudio = 2;
    	    
    	</script>
    </c:if>

        <div id="audio" class="box"></div>
        <div id="play" onclick="playAudio()"></div>
        <div id="progresso"></div>
        <div id="barraProgresso"></div>
        <div id="player"></div>

</body>
</html>