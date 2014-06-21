<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<form:form class="box" action="sendChangePassword" modelAttribute="user" accept-charset="utf-8">
	
	<form:input path="email" placeholder="email" />
	<p>
		<form:errors path="email">
			<form:errors path="email" htmlEscape="false" class="error" />
		</form:errors>
	</p>
	<br>	
	<input type="submit" class="btn btn-large" value="Enviar" />
	
</form:form>