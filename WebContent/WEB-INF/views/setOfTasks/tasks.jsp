<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<c:forEach items="${tasks}" var="task">
	<c:if test="${task.content.type eq 'video'}">
		<c:if test="${task.performed}">
			<span class="task" onclick="watchVideo(${task.content.id})">
				${task.content.name}
			</span>
			<i style="margin-right: 6px" class="icon-film icon-white"></i>
			<i class="icon-ok icon-white"></i>
			<br>
		</c:if>
		<c:if test="${!task.performed}">
			<span class="task" onclick="watchVideo(${task.content.id})">
				${task.content.name}
			</span>
			<i style="margin-right: 6px" class="icon-film icon-white"></i>
			<i class="icon-ok" style="visibility: hidden;"></i>
			<br>
		</c:if>
	</c:if>
	
	<c:if test="${task.content.type eq 'equation'}">
		<c:if test="${task.performed}">
			<span class="task" onclick="paperClick()">
				${task.content.name}
			</span>
			<i style="margin-right: 6px" class="icon-pencil icon-white"></i>
			<i class="icon-ok  icon-white"></i>
			<br>
		</c:if>
		<c:if test="${!task.performed}">
			<span class="task" onclick="">
				${task.content.name}
			</span>
			<i style="margin-right: 6px" class="icon-pencil  icon-white"></i>
			<i class="icon-ok" style="visibility: hidden;"></i>
			<br>
		</c:if>
	</c:if>
</c:forEach>