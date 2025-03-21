<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>	

<form:form action="/pat2math/group/update" modelAttribute="group" accept-charset="utf-8" class="box block left">
	
	<form:errors path="*">
		<div class="error-global">
			<spring:message code="error.global" />
		</div>
	</form:errors>
	
	<label>Nome</label>
	<p>
		<form:input path="name" placeholder="nome" class="focus" />
	</p>
	<p>
		<form:errors path="name">
			<form:errors path="name" htmlEscape="false" class="error" />
		</form:errors>
	</p>
	
	<label>Descrição</label>
	<p>
		<form:textarea path="description" rows="8" cols="25" placeholder="descrição" />
	</p>
	<p>
		<form:errors path="description">
			<form:errors path="description" htmlEscape="false" class="error" />
		</form:errors>
	</p>
	
	<label>Plano de ensino</label>
	<p>
		<form:select path="plan.id" items="${plans}" itemValue="id" itemLabel="name" />
	</p>
	
	<form:hidden path="id" />
	
	<br>
	<input type="submit" class="btn btn-large" value="Atualizar Turma" />
</form:form>