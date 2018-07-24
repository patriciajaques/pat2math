<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<form:form class="box" action="sendChangePassword" modelAttribute="user" accept-charset="utf-8">
	<img  src="/pat2math/images/recover_password.png" width="70%" height="70%" >
	<h3 id="fPElem0"></h3>
	<form:input id="fPElem1" path="email"/>
	
	<p>
		<form:errors path="email">
			<form:errors path="email" htmlEscape="false" class="error" />
		</form:errors>
	</p>
	
	<br>
	<input id="fPElem2" type="submit" class="btn btn-large"/><a id="fPElem3" href="/pat2math/login" class="btn btn-large" style="margin-left: 15px"></a>
</form:form>

<script src="/pat2math/newPatequation/texts/en-GB.js"></script>
<script src="/pat2math/newPatequation/texts/es-ES.js"></script>
<script src="/pat2math/newPatequation/texts/pt-BR.js"></script>
<script src="/pat2math/newPatequation/texts/idiomSelection.js"></script>

<script>
//a	tualiza os textos dos elementos HTML
document.getElementById("fPElem0").innerHTML = forgotPasswordTXT[0];
document.getElementById("fPElem1").placeholder = forgotPasswordTXT[1];
document.getElementById("fPElem2").value = forgotPasswordTXT[2];
document.getElementById("fPElem3").innerHTML = forgotPasswordTXT[3];
</script>