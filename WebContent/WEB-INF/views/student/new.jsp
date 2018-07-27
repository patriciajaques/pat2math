<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<div class="box">
	<form:form action="/pat2math/signUp" modelAttribute="formStudent" accept-charset="utf-8">
						
		<form:errors path="*" class="error-global">
			<div class="error-global">
				<spring:message code="error.global" />			
			</div>
		</form:errors>
		<br>
		<p>
			<form:input id="newElem0" path="firstName"/>
		</p>
		<p>
			<form:errors path="firstName">
				<form:errors path="firstName" htmlEscape="false" class="error" />
			</form:errors>
		</p>
		
		<p>
			<form:input id="newElem1" path="lastName"/>
		</p>
		<p>
			<form:errors path="lastName">
				<form:errors path="lastName" htmlEscape="false" class="error" />
			</form:errors>
		</p>
		
		<p>
			<form:input id="newElem2" path="email"/>
		</p>
		<p>
			<form:errors path="email">
			<form:errors path="email" htmlEscape="false" class="error" />
			</form:errors>
		</p>
		
		<p>
			<form:password id="newElem3" path="password"/>
		</p>
		<p>
			<form:errors path="password">
				<form:errors path="password" htmlEscape="false" class="error" />
			</form:errors>
		</p>
		
		<p>
			<form:password id="newElem4" path="passwordConfirm"/>
		</p>
		<br>
		<p id="newElem5" ></p>
		<p>
			<form:errors path="acceptTerms">
				<form:errors path="acceptTerms" htmlEscape="false" class="error" />
			</form:errors>
		</p>
		
		<br>
		<input id="newElem6" type="submit" class="btn btn-large"/><a id="newElem7" href="../login" class="btn btn-large" style="margin-left: 15px"></a>
	</form:form>
</div>

<script src="/pat2math/newPatequation/texts/en-GB.js"></script>
<script src="/pat2math/newPatequation/texts/es-ES.js"></script>
<script src="/pat2math/newPatequation/texts/pt-BR.js"></script>
<!-- <script src="/pat2math/newPatequation/texts/exemplo.js"></script> -->
<script src="/pat2math/newPatequation/texts/idiomSelection.js"></script>

<script>
//a	tualiza os textos dos elementos HTML
document.getElementById("newElem0").placeholder = newTXT[0];
document.getElementById("newElem1").placeholder = newTXT[1];
document.getElementById("newElem2").placeholder = newTXT[2];
document.getElementById("newElem3").placeholder = newTXT[3];
document.getElementById("newElem4").placeholder = newTXT[4];
document.getElementById("newElem5").innerHTML = newTXT[5];
document.getElementById("newElem6").value = newTXT[6];
document.getElementById("newElem7").innerHTML = newTXT[7];
</script>
