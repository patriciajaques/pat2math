<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<form:form action="/pat2math/topic/" modelAttribute="topic" accept-charset="utf-8">
	
	<div class="left">
		<form:errors path="*">
			<div class="error-global">
				<spring:message code="error.global" />
			</div>
		</form:errors>
		
		<div>
			<c:forEach items="${sets}" var="set">
				<p>
					<form:radiobutton path="set.id" value="${set.id}" />
					<a href="/pat2math/sets/${set.id}">${set.name}</a>
				</p>
			</c:forEach>
		</div>
		
		<br>
		<form:hidden path="plan.id" value="${idPlan}" />
		<input type="submit" class="btn btn-large" value="Adicionar Tópico" />
	</div>
	
</form:form>