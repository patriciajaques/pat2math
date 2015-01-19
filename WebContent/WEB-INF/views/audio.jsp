<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html lang="en">
<head>
<script src="/pat2math/patequation/js/index.js"></script>
</head>
<body>
<script>
var i;
var playAudio;


$(document).ready(function() {	
	
	var currentID = "" + ${student.id};
	var isLastUser = false;
	//Os cookies do tipo lastUsersN salvam os ids dos usuários que acessaram o Pat2Math no dia
	var cookieName = "lastUsers0";	
	i = 0;
	
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
	
	//Caso o ID atual não for encontrado nos cookies, ele deverá ser salvo
	if (isLastUser === false)
		setCookieDays (cookieName, currentID, 1);
	
	//Verifica se o usuário deve ouvir o rádio
	playAudio = getCookie ("playAudio" + i);   
	
	verificaAudio ( );
});

function verificaAudio ( ) {
	if (tipoAudio === 0 || playAudio === "false") {
		var cookieName = "playAudio" + i;
		setCookieDays (cookieName, "false", 1);
		window.open (' /pat2math/student/home ', ' null' , ' width = 1920, height = 1080, toolbar = no , scrollbars = yes , location = no, resizable = no ');
	}
	
	else {
		window.open (' /pat2math/playaudio ', ' null' , ' width = 1920, height = 1080, toolbar = no , scrollbars = yes , location = no, resizable = no ');
	}
}


</script>

<div onclick="verificaAudio()">Para o Pat2Math funcionar corretamente, você deve permitir cookies em seu navegador e desbloquear popups para o nosso site. Uma nova janela deverá ser aberta automaticamente, se isso não acontecer clique aqui.</div>

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


</body>
</html>