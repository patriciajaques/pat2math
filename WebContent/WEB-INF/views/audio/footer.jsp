<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script src="/pat2math/patequation/js/index.js"></script>
<script>
	
	var currentID = "" + ${student.id};

	var isLastUser = false;
	//Os cookies do tipo lastUsersN salvam os ids dos usu�rios que acessaram o Pat2Math no dia
	var cookieName = "lastUsers0";	
	var i = 0;
	
	//Verifica se o ID atual j� est� salvo em algum cookie, sen�o descobre a posi��o livre para salvar este ID.
	while (getCookie (cookieName) !== "" && isLastUser === false) {
		if (currentID === getCookie ("lastUsers" + i))
			isLastUser = true;
		
		else {
		    i++;
		    cookieName = "lastUsers" + i;
		}
	}
	
	//Posi��o que o ID atual est�
	setCookieDays ("pos", i, 1);
	currentPos = i;
	
	//Caso o ID atual n�o for encontrado nos cookies, ele dever� ser salvo
	if (isLastUser === false)
		setCookieDays (cookieName, currentID, 1);
	
	verificaAudio();
	

function verificaAudio ( ) {
	var idGroup = ${student.group.id};
	
	if (getCookie ("playAudio" + currentPos) !== "false" && (idGroup === 2 || idGroup === 3)) {
        if (idGroup === 2)
            setCookieDays ("tipoAudio", "1", 1);
            
        else
        	setCookieDays ("tipoAudio", "2", 1);
        
        openPopup ('/pat2math/playaudio');
    }
    
    else
        openPopup ('/pat2math/student/home'); 
}

function openPopup (url) {
	var popup = window.open (url , ' null' , ' width = 1920, height = 1080, toolbar = no , scrollbars = yes , location = no, resizable = no ');
	
	popup.onbeforeunload = function() {
		
		location.href="/pat2math/login";	
	}
}



function helpPageCookies ( ) {
	$("#helpCookiesPopups-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/images/cookies_01.png border=0><div style='position:absolute; top:194px; left:5px;'><div style='position:absolute; top:0; left:542px;'> <a href=# onclick=helpPageCookies2()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:200px; left:-23px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit_text.png></img></a>");
	$("#mask").fadeIn(700);
	$("#helpCookiesPopups-box").fadeIn(700);
}

function helpPageCookies2 ( ) {
	$("#helpCookiesPopups-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/images/cookies_02.png border=0><div style='position:absolute; top:194px; left:5px;'> <a href=# onclick=helpPageCookies()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0; left:542px;'> <div style='position:absolute; top:200px; left:-23px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit_text.png></img></a>");
	$("#mask").fadeIn(700);
	$("#helpCookiesPopups-box").fadeIn(700);
}

function helpPagePopups ( ) {
	$("#helpCookiesPopups-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/images/popups_01.png border=0><div style='position:absolute; top:194px; left:2px;'> <div style='position:absolute; top:0; left:551px;'> <a href=# onclick=helpPagePopups2()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:200px; left:-23px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit_text.png></img></a>");
	$("#mask").fadeIn(700);
	$("#helpCookiesPopups-box").fadeIn(700);
}

function helpPagePopups2 ( ) {
	$("#helpCookiesPopups-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/images/popups_02.png border=0><div style='position:absolute; top:194px; left:2px;'> <a href=# onclick=helpPagePopups()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0; left:551px;'> <a href=# onclick=helpPagePopups3()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:200px; left:-23px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit_text.png></img></a>");
	$("#mask").fadeIn(700);
	$("#helpCookiesPopups-box").fadeIn(700);
}

function helpPagePopups3 ( ) {
	$("#helpCookiesPopups-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/images/popups_03.png border=0><div style='position:absolute; top:194px; left:2px;'> <a href=# onclick=helpPagePopups2()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0; left:551px;'> <a href=# onclick=helpPagePopups4()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:200px; left:-23px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit_text.png></img></a>");
	$("#mask").fadeIn(700);
	$("#helpCookiesPopups-box").fadeIn(700);
}

function helpPagePopups4 ( ) {
	$("#helpCookiesPopups-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/images/popups_04.png border=0><div style='position:absolute; top:194px; left:2px;'> <a href=# onclick=helpPagePopups3()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0; left:551px;'> <a href=# onclick=helpPagePopups5()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:200px; left:-23px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit_text.png></img></a>");
	$("#mask").fadeIn(700);
	$("#helpCookiesPopups-box").fadeIn(700);
}

function helpPagePopups5 ( ) {
	$("#helpCookiesPopups-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/images/popups_05.png border=0><div style='position:absolute; top:194px; left:2px;'> <a href=# onclick=helpPagePopups4()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0; left:551px;'> <div style='position:absolute; top:200px; left:-23px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit_text.png></img></a>");
	$("#mask").fadeIn(700);
	$("#helpCookiesPopups-box").fadeIn(700);
}

function closeWindow ( ) {
	$("#mask").fadeOut(700);
	$("#helpCookiesPopups-box").fadeOut(700);
}

</script>

<%--  <c:if test="${student.group.id == 2}">  --%>
<!--     	 <script type="text/javascript"> -->
<!-- //     	 	tipoAudio = 1; -->
    	 	
<!--     	</script> -->
<%--    	</c:if> --%>
    
<%--     <c:if test="${student.group.id == 4}"> --%>
<!--     	<script type="text/javascript"> -->
<!-- //     	   tipoAudio = 1; -->
    	   
<!--     	</script> -->
<%--     </c:if> --%>
    
<%--     <c:if test="${student.group.id == 3}"> --%>
<!--     	<script type="text/javascript"> -->
<!-- //     	    tipoAudio = 2; -->
    	   
<!--     	</script> -->
<%--     </c:if> --%>
    
<%--     <c:if test="${student.group.id == 5}"> --%>
<!--     	<script type="text/javascript"> -->
<!-- //     	    tipoAudio = 2; -->
    	    
<!--     	</script> -->
<%--     </c:if> --%>