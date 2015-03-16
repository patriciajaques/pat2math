<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script src="/pat2math/patequation/js/index.js"></script>
<script>
	
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
	
	//Caso o ID atual não for encontrado nos cookies, ele deverá ser salvo
	if (isLastUser === false)
		setCookieDays (cookieName, currentID, 1);
		
	verificaAudio ( );


function openPopup (url) {
	var popup = window.open (url , ' null' , ' width = 1920, height = 1080, toolbar = no , scrollbars = yes , location = no, resizable = no ');
	
	popup.onbeforeunload = function() {
		location.href="/pat2math/login";	
	}
}


function verificaAudio ( ) {
	var pos = getCookie  ("pos");
	var playAudio = getCookie ("playAudio" + pos);   
	
	if ((tipoAudio != 1 && tipoAudio != 2) || playAudio === "false") 
		openPopup (' /pat2math/student/home ');
		
	else 
		openPopup (' /pat2math/audio ');
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