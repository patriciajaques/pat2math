<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<p class="left">
	<a href="listAll?page=0" class="btn btn-large">listar todos planos</a>
	<a href="new" class="btn btn-large">novo plano</a>
</p>

<table class="table table-bordered">
    <thead>
	    <tr>
	    	<th><p>Meus planos de aula</p></th>
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

<c:if test="${empty plans}"><p>Não foi encontrado nenhum plano de ensino para ser exibido.</p><br><br><br><br><br></c:if>

<c:forEach items="${pages}" var="page" varStatus="i">
	<c:if test="${currentPage != page.number}">
   		<a class="btn" href="list?page=${i.count - 1}">
   			${i.count}
   		</a>
   	</c:if>
   	<c:if test="${currentPage == page.number}">
   		<a class="btn btn-primary" href="list?page=${i.count - 1}">
   			${i.count}
   		</a>
   	</c:if>
</c:forEach>	