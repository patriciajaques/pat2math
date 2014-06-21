<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<form:form action="." modelAttribute="set" accept-charset="utf-8">

	<div class="box block left">
		<form:errors path="*">
			<div class="error-global">
				<spring:message code="error.global" />
			</div>
		</form:errors>
	
		<label>Nome</label>
		<p>
			<form:input path="name" cssClass="focus" cssErrorClass="input-error" />
		</p>
		<p>
			<form:errors path="name">
				<form:errors path="name" htmlEscape="false" class="error" />
			</form:errors>
		</p>
		
		<label>Descrição</label>
		<p>
			<form:textarea path="description" cssClass="textarea" cssErrorClass="input-error" />
		</p>
		<p>
			<form:errors path="description">
				<form:errors path="description" htmlEscape="false" class="error" />
			</form:errors>
		</p>
		<br>
		<input type="submit" class="btn btn-large" value="Criar Tópico" />
	</div>
	
</form:form>