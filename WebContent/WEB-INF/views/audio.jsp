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
     </style>
</head>
<body>
<script>
var tipoAudio=0;
function playAudio ( ) {
	if (tipoAudio === 1) {
		var display = document.getElementById('play').style.display;
	    document.getElementById('play').style.display = 'none';
		document.getElementById('audio').innerHTML= "<audio autoplay> <source src='/pat2math/patequation/audio/mindfulness.ogg' type='audio/ogg' preload='auto'> </audio>";
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
		var display = document.getElementById('play').style.display;
	    document.getElementById('play').style.display = 'none';
		document.getElementById('audio').innerHTML= "<audio autoplay> <source src='/pat2math/patequation/audio/historia.ogg' type='audio/ogg' preload='auto'> </audio>";
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
    	    alert(tipoAudio);
    	</script>
    </c:if>

        <div id="audio" class="box"></div>
        <div id="play" onclick="playAudio()"></div>

</body>
</html>