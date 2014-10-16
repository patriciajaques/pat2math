<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
 
<div class="box block">
	<h2 class="left">${set.name}</h2>
	<p class="left">${set.description}</p>
</div>	

<p class="left">
	<a href="/pat2math/task/new/${set.id}" class="btn btn-large">adicionar tarefa</a>
</p>

<ul id="sortable" class="list">
	<c:forEach items="${set.tasks}" var="task">
		<li class="item">
    		<a href="/pat2math/content/${task.content.id}">
    			${task.content.name}
    		</a>
			<a style="float: right" href="#"><i class="icon-remove"></i></a>
    	</li>
    </c:forEach>
</ul>