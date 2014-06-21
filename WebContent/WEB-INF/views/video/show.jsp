<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="box block left">
	<h2>${video.name}</h2>
	<p>${video.description}</p>
	
	<br><br>
	
	<p>
		<object height="350" width="600" data="${video.url}" type="application/x-shockwave-flash">
			<param name="wmode" value="transparent" />
			<param name="quality" value="height" />
			<param name="src" value="${video.url}" />	
		</object>
	</p>
</div>