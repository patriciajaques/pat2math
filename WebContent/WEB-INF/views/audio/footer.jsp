<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script>
function verifyID() {
	var currentID = "" + ${student.id};
	var previousUser = getCookie("previousUser");
	
	if (previousUser !== "") {
		if (previousUser !== currentID) {
			deleteAllCookies();
			setCookieDays("previousUser", currentID, 1);
		}
	}
	
	else
		setCookieDays("previousUser", currentID, 1);
	
	
	var id = parseInt (currentID);
	
	//Usuário de teste da Patrícia
	if (id === 1226) {
		setCookieDays("gift", "true", 1);
	}
	
	checkGroup(id);
}

function checkGroup(id) {
// 	var isNewPatequation = true;
	
// 	if ((id >= 1146 && id <= 1170) || (id >= 1177 && id <= 1179) || (id >= 1224 && id <= 1240)) {
// 		setCookieDays("levelGamification", "full", 1);
// 		//alert("Todos os problemas da sessão passada foram corrigidos! Lembrando novamente que o sistema de dicas está mais otimizado, e que a cada clique no botão de dica, a dica mostrada é mais específica (poderá haver desconto na sua pontuação se você não tiver dicas gratuitas disponíveis).");
// 	}
	
// 	else if ((id >= 1102 && id <= 1123) || (id >= 1171 && id <= 1173) || (id >= 1241 && id <= 1257)) {
// 		setCookieDays("levelGamification", "low", 1);
// 		//alert("Todos os problemas da sessão passada foram corrigidos! Lembrando novamente que o sistema de dicas está mais otimizado, e que a cada clique no botão de dica, a dica mostrada é mais específica (a cada solicitação de dica você perde apenas 2 pontos).");

// 	}
	
// 	else if ((id >= 1124 && id <= 1145) || (id >= 1174 && id <= 1176) || (id >= 1258 && id <= 1273)) {
// 		setCookieDays("levelGamification", "without", 1);
// 		//alert("Todos os problemas da sessão passada foram corrigidos! Lembrando novamente que o sistema de dicas está mais otimizado, e que a cada clique no botão de dica, a dica mostrada é mais específica.");

// 	}
	
// 	else {
// 		isNewPatequation = false;
// 	}
	
//  	if (isNewPatequation)
// 		redirectPage("/pat2math/newpatequation");
// 		redirectPage("/pat2math/pat2exam");
	redirectPage("newpatequation");
	
//  	else
//  		redirectPage("/pat2math/student/home");
}

function redirectPage(url) {
	setTimeout ("location.href='/pat2math/" + url + "';", 2000); 
	//setTimeout ("document.getElementById('go').style.visibility = 'visible';", 5000);
}

verifyID();
// function verificaAudio ( ) {
// // 	var idGroup = ${student.group.id};
// 	var cookieName = "playAudio" + currentPos;
	
// // 	if (getCookie (cookieName) !== "false") { //idGroup === 2 || idGroup === 3
// //         if (id < 239 || id === 274 || id === 290 || id === 291)
// //             setCookieDays ("tipoAudio", "1", 1);
            
// //         else
// //         	setCookieDays ("tipoAudio", "2", 1);
        
// //         location.href= '/pat2math/playaudio';
// //     }
    
// //     else 
//     	location.href= '/pat2math/student/home'; 
// }




// function helpPageCookies ( ) {
// 	$("#helpCookiesPopups-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/images/cookies_01.png border=0><div style='position:absolute; top:194px; left:5px;'><div style='position:absolute; top:0; left:542px;'> <a href=# onclick=helpPageCookies2()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:200px; left:-23px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit_text.png></img></a>");
// 	$("#mask").fadeIn(700);
// 	$("#helpCookiesPopups-box").fadeIn(700);
// }

// function helpPageCookies2 ( ) {
// 	$("#helpCookiesPopups-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/images/cookies_02.png border=0><div style='position:absolute; top:194px; left:5px;'> <a href=# onclick=helpPageCookies()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0; left:542px;'> <div style='position:absolute; top:200px; left:-23px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit_text.png></img></a>");
// 	$("#mask").fadeIn(700);
// 	$("#helpCookiesPopups-box").fadeIn(700);
// }

// function helpPagePopups ( ) {
// 	$("#helpCookiesPopups-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/images/popups_01.png border=0><div style='position:absolute; top:194px; left:2px;'> <div style='position:absolute; top:0; left:551px;'> <a href=# onclick=helpPagePopups2()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:200px; left:-23px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit_text.png></img></a>");
// 	$("#mask").fadeIn(700);
// 	$("#helpCookiesPopups-box").fadeIn(700);
// }

// function helpPagePopups2 ( ) {
// 	$("#helpCookiesPopups-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/images/popups_02.png border=0><div style='position:absolute; top:194px; left:2px;'> <a href=# onclick=helpPagePopups()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0; left:551px;'> <a href=# onclick=helpPagePopups3()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:200px; left:-23px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit_text.png></img></a>");
// 	$("#mask").fadeIn(700);
// 	$("#helpCookiesPopups-box").fadeIn(700);
// }

// function helpPagePopups3 ( ) {
// 	$("#helpCookiesPopups-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/images/popups_03.png border=0><div style='position:absolute; top:194px; left:2px;'> <a href=# onclick=helpPagePopups2()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0; left:551px;'> <a href=# onclick=helpPagePopups4()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:200px; left:-23px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit_text.png></img></a>");
// 	$("#mask").fadeIn(700);
// 	$("#helpCookiesPopups-box").fadeIn(700);
// }

// function helpPagePopups4 ( ) {
// 	$("#helpCookiesPopups-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/images/popups_04.png border=0><div style='position:absolute; top:194px; left:2px;'> <a href=# onclick=helpPagePopups3()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0; left:551px;'> <a href=# onclick=helpPagePopups5()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:200px; left:-23px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit_text.png></img></a>");
// 	$("#mask").fadeIn(700);
// 	$("#helpCookiesPopups-box").fadeIn(700);
// }

// function helpPagePopups5 ( ) {
// 	$("#helpCookiesPopups-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/images/popups_05.png border=0><div style='position:absolute; top:194px; left:2px;'> <a href=# onclick=helpPagePopups4()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0; left:551px;'> <div style='position:absolute; top:200px; left:-23px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit_text.png></img></a>");
// 	$("#mask").fadeIn(700);
// 	$("#helpCookiesPopups-box").fadeIn(700);
// }

// function closeWindow ( ) {
// 	$("#mask").fadeOut(700);
// 	$("#helpCookiesPopups-box").fadeOut(700);
// }

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