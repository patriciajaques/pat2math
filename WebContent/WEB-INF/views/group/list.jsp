<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div class="block">
	<p class="right">
		<a href="new" class="btn btn-large">nova turma</a>
	</p>
	<br>
	
	<c:if test="${empty groups}"><p>Você não tem nenhuma turma cadastrada</p><br><br><br><br><br></c:if>
	
	<c:forEach items="${groups}" var="group">
		<p style="padding: 5px 20px; border-bottom: 1px solid #ccc">
	    	<a href="${group.id}">${group.name}</a>
	    </p>
	</c:forEach>
</div>