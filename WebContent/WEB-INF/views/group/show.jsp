<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="box block left">
	<h2>${group.name}</h2>
	<p>${group.description}</p>
	<p>Plano de ensino: <b>${group.plan.name}</b></p>
</div>

<div class="block left">
	<a href="newStudent/${group.id}" class="btn btn-large">Adicionar aluno</a>
	
	<c:forEach items="${group.students}" var="student">
		<p class="item">
			<a href="#">${student.firstName} ${student.lastName}</a>
		</p>
	</c:forEach>
</div>