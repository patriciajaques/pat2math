<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script src="/pat2math/patequation/js/index.js"></script>
<script>
function verifyID() {
	var currentID = "" + ${student.id};

	var isLastUser = false;
	//Os cookies do tipo lastUsersN salvam os ids dos usuários que acessaram o Pat2Math no dia
	var cookieName = "lastUsers0";	
	var i = 0;
	
	//Verifica se o ID atual já está salvo em algum cookie, senão descobre a posição livre para salvar este ID.
	while (getCookie (cookieName) !== "" && isLastUser === false) {
		if (currentID === getCookie ("lastUsers" + i))
			isLastUser = true;
		
		else {
		    i++;
		    cookieName = "lastUsers" + i;
		}
	}
	
	//Posição que o ID atual está
	setCookieDays ("pos", i, 1);
	currentPos = i;
	
	//Caso o ID atual não for encontrado nos cookies, ele deverá ser salvo
	if (isLastUser === false)
		setCookieDays (cookieName, currentID, 1);
	
	var id = parseInt (currentID);
	
	checkGroup(id);
}

function checkGroup(id) {
// 	if (id >= 520 && id <= 553) //Grupo de controle
// 		setCookieDays ("enableWE", "false", 1);
	
// 	else //Grupo experimental
// 		setCookieDays ("enableWE", "", 0);
	
	if ((id >= 729 && id <= 760) || (id >= 797 && id <= 806)) 
		redirectPage("/pat2math/translator"); //Versão experimental
	
	else if ((id >= 762 && id <= 788) || (id >= 807 && id <= 816)) 
		redirectPage("/pat2math/translator2"); //Versão controle
	
	else 
		redirectPage("/pat2math/student/home");
	
}

function redirectPage(url) {
	var cookieName = "playAudio" + currentPos;
	setCookieDays (cookieName, "false", 1);
	setTimeout ("location.href= '" + url + "';", 2000); 
	setTimeout ("document.getElementById('go').style.visibility = 'visible';", 5000);
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