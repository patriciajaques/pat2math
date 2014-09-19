<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<form:form action="../" modelAttribute="task" accept-charset="utf-8">
	
	<div class="box block left">
		<form:errors path="*">
			<div class="error-global">
				<spring:message code="error.global" />
			</div>
		</form:errors>
		
		<h3>Escolha um conteúdo para a tarefa: </h3>
		<div>
			<c:forEach items="${contents}" var="content">
				<p>
					<c:if test="${content.type eq 'video'}">
						<form:radiobutton path="content.id" value="${content.id}" />
						<a href="/pat2math/content/${content.id}">${content.name}</a>	
					</c:if>
					<c:if test="${content.type eq 'equation'}">
						<form:radiobutton path="content.id" value="${content.id}" />
						<a href="/pat2math/content/${content.id}">${content.equation}</a>	
					</c:if>
				</p>
			</c:forEach>
		</div>
		
		<br>
		<form:hidden path="set.id" value="${idSet}" />
		<input type="submit" class="btn btn-large" value="Criar Tarefa" />
	</div>
	
</form:form>