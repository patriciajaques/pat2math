<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script>
function verifyID() {
	var currentID = "" + ${student.id};
	var isPreviousUser = getCookie("previousUser") === currentID;
	
	if (isPreviousUser === false) {
		deleteAllCookies();		
		setCookieDays("previousUser", currentID, 1);
	}
	
	var id = parseInt (currentID);
	
	checkGroup(id);
}

function checkGroup(id) {
	if (id >= 819 && id <= 828) { //Usuários de teste da Joice
		setCookieDays("enableWE", "false", 1);
		setCookieDays("enableTour", "false", 1);
	}
	
	else {
		setCookieDays("enableWE", "", 0);
		setCookieDays("enableTour", "", 0);
	}
	
	var isNewPatequation = true;
	
	if ((id >= 1146 && id <= 1170) || (id >= 1177 && id <= 1179)) {
		setCookieDays("levelGamification", "full", 1);
	}
	
	else if ((id >= 1102 && id <= 1123) || (id >= 1171 && id <= 1173)) {
		setCookieDays("levelGamification", "low", 1);
	}
	
	else if ((id >= 1124 && id <= 1145) || (id >= 1174 && id <= 1176)) {
		setCookieDays("levelGamification", "without", 1);
	}
	
	else {
		setCookieDays("levelGamification", "full", 1);
	}
	
	if (isNewPatequation)
		redirectPage("/pat2math/newpatequation");
	
	else
		redirectPage("/pat2math/student/home");
}

function redirectPage(url) {
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