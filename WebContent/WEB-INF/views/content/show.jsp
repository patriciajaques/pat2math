<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div class="box block left">

	<c:if test="${content.type eq 'video'}">
		<h2>${content.name}</h2>
		<p>${content.description}</p>
		<br><br>
		
		<p>
			<object height="350" width="600" data="${content.url}" type="application/x-shockwave-flash">
				<param name="wmode" value="transparent" />
				<param name="quality" value="height" />
				<param name="src" value="${content.url}" />	
			</object>
		</p>	
	</c:if>
	
	<c:if test="${content.type eq 'equation'}">
		<h2>${content.name}</h2>
		<p>${content.description}</p>
		<p>${content.equation}</p>
		
	</c:if>
	
</div>