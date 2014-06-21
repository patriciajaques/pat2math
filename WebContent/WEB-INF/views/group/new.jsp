<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>	

<form:form action="." modelAttribute="group" accept-charset="utf-8" class="block left">
	<form:errors path="*">
		<div class="error-global">
			<spring:message code="error.global" />
		</div>
	</form:errors>
	<br>
	<p>
		<form:input path="name" placeholder="nome" class="focus" />
	</p>
	<p>
		<form:errors path="name">
			<form:errors path="name" htmlEscape="false" class="error" />
		</form:errors>
	</p>

	<p>
		<form:textarea path="description" rows="8" cols="25" placeholder="descrição" />
	</p>
	<p>
		<form:errors path="description">
			<form:errors path="description" htmlEscape="false" class="error" />
		</form:errors>
	</p>
	
	<p>
		<form:password path="password" placeholder="senha" />
	</p>
	<p>
		<form:errors path="password">
			<form:errors path="password" htmlEscape="false" class="error" />
		</form:errors>
	</p>

	<p>
		<form:input path="maxOfStudents" placeholder="Número de alunos" />
	</p>
	<p>
		<form:errors path="maxOfStudents">
			<form:errors path="maxOfStudents" htmlEscape="false" class="error" />
		</form:errors>
	</p>
	
	<br>
	<input type="submit" class="btn btn-large" value="Criar Turma" />
</form:form>