<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>	

<form:form action="." modelAttribute="video" accept-charset="utf-8" class="block left">
	<form:errors path="*">
		<div class="error-global">
			<spring:message code="error.global" />
		</div>
	</form:errors>
		
	<p>
		<form:input path="name" placeholder="nome" />
	</p>
	<p>
		<form:errors path="name">
			<form:errors path="name" htmlEscape="false" class="error" />
		</form:errors>
	</p>
	
	<p>
		<form:textarea path="description" rows="8" cols="25" placeholder="Descrição" />
	</p>
	<p>
		<form:errors path="description">
			<form:errors path="description" htmlEscape="false" class="error" />
		</form:errors>
	</p>
	
	<p>
		<form:input path="url" placeholder="URL" />
	</p>
	<p>
		<form:errors path="url">
			<form:errors path="url" htmlEscape="false" class="error" />
		</form:errors>
	</p>
	
	<br>
	<input type="submit" class="btn btn-large" value="Criar Video" />
</form:form>