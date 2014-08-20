<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<form:form class="box" action="/pat2math/user/changePassword" modelAttribute="passwordRecoveryForm" accept-charset="utf-8">
	
	<form:password path="password" placeholder="Nova senha" />
	<p>
		<form:errors path="password">
			<form:errors path="password" htmlEscape="false" class="error" />
		</form:errors>
	</p>
	
	<form:password path="passwordConfirmation" placeholder="Confirme a senha" />
	<p>
		<form:errors path="passwordConfirmation">
			<form:errors path="passwordConfirmation" htmlEscape="false" class="error" />
		</form:errors>
	</p>
	
	<form:hidden path="token" />
	<form:hidden path="idUser" />
	<br>
	<input type="submit" class="btn btn-large" value="Alterar senha" />
</form:form>