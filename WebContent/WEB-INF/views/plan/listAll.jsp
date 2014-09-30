<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<div class="left">
	<a href="list?page=0" class="btn btn-large">listar meus planos</a>
	<a href="new" class="btn btn-large">novo plano</a>
</div>	
<br>

<table class="table table-bordered">
    <thead>
	    <tr>
	    	<th><p>Planos de aula</p></th>
    	</tr>
    </thead>
	<tbody>
		<c:forEach items="${plans}" var="plan">
    		<tr>
		    	<td>
		    		<a href="${plan.id}">${plan.name}</a>
		    	</td>
		    </tr>
		</c:forEach>	
    </tbody>
</table>


<c:forEach items="${pages}" var="page" varStatus="i">
   	<c:if test="${currentPage != page.number}">
   		<a class="btn" href="listAll?page=${i.count - 1}">
   			${i.count}
   		</a>
   	</c:if>
   	<c:if test="${currentPage == page.number}">
   		<a class="btn btn-primary" href="listAll?page=${i.count - 1}">
   			${i.count}
   		</a>
	 </c:if>
</c:forEach>