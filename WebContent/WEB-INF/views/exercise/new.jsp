<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>	

<form:form action="." modelAttribute="exercise" accept-charset="utf-8" class="box block left">
	<form:errors path="*">
		<div class="error-global">
			<spring:message code="error.global" />
		</div>
	</form:errors>
		
	<label>Nome</label>
	<p>
		<form:input path="name" />
	</p>
	<p>
		<form:errors path="name">
			<form:errors path="name" htmlEscape="false" class="error" />
		</form:errors>
	</p>
	
	<label>Descrição</label>
	<p>
		<form:textarea path="description" rows="8" cols="25" />
	</p>
	<p>
		<form:errors path="description">
			<form:errors path="description" htmlEscape="false" class="error" />
		</form:errors>
	</p>
	
	<label>Equação</label>
	<p>
		<form:input path="equation" />
	</p>
	<p>
		<form:errors path="equation">
			<form:errors path="equation" htmlEscape="false" class="error" />
		</form:errors>
	</p>
	
	<br>
	<input type="submit" class="btn btn-large" value="Criar Exercício" />
</form:form>