<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="block left">
	<h2>${group.name}</h2>
	<p>${group.description}</p>

<select id="plan${plan.id}" onclick="changePlan(${group.id}, ${plan.id})">
	<c:forEach items="${plans}" var="plan">
		<c:if test="${plan.id eq group.plan.id}">
			<option selected="selected">${plan.name}</option>
		</c:if>
		<c:if test="${plan.id ne group.plan.id}">
			<option>${plan.name}</option>
		</c:if>
	</c:forEach>
</select>

<br><br>
<c:if test="${empty group.students}">
	<p>Nenhum aluno cadastrado nesta turma.</p>
</c:if>
<c:if test="${!empty group.students}">
	<p>Alunos:</p>
</c:if>
<c:forEach items="${group.students}" var="student">
	<p><a href="#">${student.firstName} ${student.lastName}</a></p>
</c:forEach>

<a class="btn btn-primary btn-large">Adicionar aluno</a>
</div>		