<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<style>
	
	section {
		margin-top: 30px;
	}
	
</style>

<div class="block">
	<h2>${student.email}</h2>
	
	<br><br>
	<c:forEach items="${groups}" var="group">
		
		<c:if test="${group.id eq student.group.id}">
			<p>
				<span id="group${group.id}" class="item" onclick="changeGroup(${group.id})">
					${group.name}
				</span>
			</p>
		</c:if>
		
		<c:if test="${group.id ne student.group.id}">
			<p>
				<span id="group${group.id}" class="item2" onclick="changeGroup(${group.id})">
					${group.name}
				</span>
			</p>
		</c:if>
		
	</c:forEach>
	
	<br><br><br>
	<a href="/pat2math/student/home" class="btn btn-large">home</a>
	
</div>