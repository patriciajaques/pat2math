<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="block left">
	<h2 class="left">${set.name}</h2>
	<p class="left">${set.description}</p>
	
	<br><br>
	<div class="right">
		<a href="/pat2math/task/new/${set.id}" class="btn btn-large">adicionar tarefa</a>
	</div>
	<br>
	
	<table class="table table-striped table-bordered">
	    <thead>
		    <tr>
		    	<th><p>Tarefas</p></th>
	    	</tr>
	    	
	    </thead>

	    <tbody>
	    	 <c:forEach items="${set.tasks}" var="task">
			    <tr>
			    	<td>
			    		<a href="/pat2math/video/${task.content.id}">${task.content.name}</a>
			    	</td>
			    </tr> 
			  </c:forEach>
	    </tbody>
    </table>
</div>