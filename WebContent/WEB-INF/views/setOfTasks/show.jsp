<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<form:form class="left" action="update" modelAttribute="set" accept-charset="utf-8">
    
	<form:errors path="*">
		<div class="error-global">
			<spring:message code="error.global" />
		</div>
	</form:errors>
		
	<label>Nome</label>
	<p>
		<form:input path="name" />
	</p>
	<p>
		<form:errors path="name">
			<form:errors path="name" htmlEscape="false" class="error" />
		</form:errors>
	</p>

	<label>Descrição</label>
	<p>
		<form:textarea path="description" />
	</p>
	
	<p>
		<form:errors path="description">
			<form:errors path="description" htmlEscape="false" class="error" />
		</form:errors>				
	</p>
	
	<form:hidden path="id" />
	<input type="submit" class="btn btn-large" value="Salvar" />
</form:form>

<h3>Tarefas</h3>	

<%-- <div class="right">
	<a href="/pat2math/task/new/${set.id}" class="btn btn-large">adicionar tarefa</a>
</div>
 --%>
	
<table class="table table-striped table-bordered">
    <thead>
	    <tr>

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