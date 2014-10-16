<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>	

<form:form action="." modelAttribute="exercise" accept-charset="utf-8" class="box block left">
	<form:errors path="*">
		<div class="error-global">
			<spring:message code="error.global" />
		</div>
	</form:errors>
	
	<label>Equação</label>
	<p>
		<form:input path="equation" />
	</p>
	<p>
		<form:errors path="equation">
			<form:errors path="equation" htmlEscape="false" class="error" />
		</form:errors>
	</p>
	
	<form:hidden path="description" />
	<form:hidden path="name" />
	<br>
	<input type="submit" class="btn btn-large" value="Criar Exercício" />
</form:form>