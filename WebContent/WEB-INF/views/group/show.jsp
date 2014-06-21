<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="block left">
<h2>${group.name}</h2>
	<p>${group.description}</p>
	</div>
	
	<br><br>
	<br>
	
<div class="block">
	
	<div class="row-fluid">
	
		<div class="span6">
			<a class="btn btn-primary btn-large">Adicionar aluno</a>
		</div>
	
		<div class="span6">
			<select>
				<c:forEach items="${plans}" var="plan">
					<c:if test="${plan.id eq group.plan.id}">
						<p>
							<select id="plan${plan.id}" onclick="changePlan(${group.id}, ${plan.id})">
								${plan.name}
							</span>
					</p>
					</c:if>
				</c:forEach>
			</select>
		</div>
			
	</div>
</div>