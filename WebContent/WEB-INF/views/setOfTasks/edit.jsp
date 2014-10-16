<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<form:form class="left" action="update" modelAttribute="set" accept-charset="utf-8">
    
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
		<form:textarea path="description" />
	</p>
	
	<p>
		<form:errors path="description">
			<form:errors path="description" htmlEscape="false" class="error" />
		</form:errors>				
	</p>
	
	<form:hidden path="id" />
	<input type="submit" class="btn btn-large" value="Salvar" />
</form:form>