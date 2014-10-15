<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<form:form class="box" action="sendChangePassword" modelAttribute="user" accept-charset="utf-8">
	<img  src="/pat2math/images/recover_password.png" width="70%" height="70%" >
	<h3>Informe o seu email para que possamos redefinir a sua senha</h3>
	<form:input path="email" placeholder="email" />
	
	<p>
		<form:errors path="email">
			<form:errors path="email" htmlEscape="false" class="error" />
		</form:errors>
	</p>
	
	<br>
	<input type="submit" class="btn btn-large" value="enviar" /><a href="/pat2math/login" class="btn btn-large" style="margin-left: 15px">voltar</a>
</form:form>