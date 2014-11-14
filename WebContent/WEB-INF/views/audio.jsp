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
     </style>
</head>
<body>
<script>

function mostraProgressoAudio1 ( ) {
	document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/0.gif border=0>";
	
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/1.gif border=0>"', 28916);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/2.gif border=0>"', 57832);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/3.gif border=0>"', 86748);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/4.gif border=0>"', 115664);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/5.gif border=0>"', 144580);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/6.gif border=0>"', 173496);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/7.gif border=0>"', 202412);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/8.gif border=0>"', 231328);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/9.gif border=0>"', 260244);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/10.gif border=0>"', 289160);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/11.gif border=0>"', 318076);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/12.gif border=0>"', 346992);
} 

function mostraProgressoAudio2 ( ) {
	document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/0.gif border=0>";
	
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/1.gif border=0>"', 28750);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/2.gif border=0>"', 57500);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/3.gif border=0>"', 86250);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/4.gif border=0>"', 115000);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/5.gif border=0>"', 143750);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/6.gif border=0>"', 172500);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/7.gif border=0>"', 201250);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/8.gif border=0>"', 230000);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/9.gif border=0>"', 258750);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/10.gif border=0>"', 287500);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/11.gif border=0>"', 316250);
	setTimeout ('document.getElementById("barraProgresso").innerHTML = "<img src=/pat2math/images/12.gif border=0>"', 345000);

}
var tipoAudio = 0;
var play = true; //Se play estiver como false, é porque o botão já foi pressionado e não deve acontecer nada se pressionar novamente.

function playAudio ( ) {
	if (play) {
	if (tipoAudio === 1) {
		play = false;
		var display = document.getElementById('play').style.display;
	    document.getElementById('play').style.display = 'none';
		document.getElementById('audio').innerHTML= "<audio autoplay> <source src='/pat2math/patequation/audio/mindfulness.ogg' type='audio/ogg' preload='auto'> </audio>";	
		mostraProgressoAudio1();
		setTimeout('location.href="/pat2math/student/home"',347000); 
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
		play = false;
		var display = document.getElementById('play').style.display;
	    document.getElementById('play').style.display = 'none';
		document.getElementById('audio').innerHTML= "<audio autoplay> <source src='/pat2math/patequation/audio/historia.ogg' type='audio/ogg' preload='auto'> </audio>";
		mostraProgressoAudio2();
		setTimeout('location.href="/pat2math/student/home"',345000); 
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

</body>
</html>