<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="box block left">
	<h2 class="left">${teacher.email}</h2>
	<br>
	<%-- <div class="left">
		<a href="/pat2math/topic/new/${plan.id}" class="btn btn-large">adicionar tópico</a>
	</div>
	<br> --%>
	
	<%-- <table class="table table-striped table-bordered">
	    <thead>
		    <tr>
		    	<th><p>Nome</p></th>
		    	<th><p>Ordem</p></th>
	    	</tr>
	    	
	    </thead>

	    <tbody>
	    	 <c:forEach items="${plan.topics}" var="topic">
			    <tr>
			    	<td>
			    		<a href="/pat2math/sets/${topic.set.id}">${topic.set.name}</a>
			    	</td>
			    	<td>
			    		${topic.sequence}
			    	</td>
			    </tr> 
			  </c:forEach>
	    </tbody>
    </table>
     --%>
</div>