<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<div class="block">

	<div class="row-fluid">
		
		<div class="span6" style="text-align: left">
			.
		</div>	
		
		<div class="span6" style="text-align: right">
			<p class="right">
				<a href="list?page=0" class="btn btn-large">listar meus planos</a>
				<a href="new" class="btn btn-large">novo plano</a>
			</p>
		</div>
		
	</div>
	
	<br>
	<div class="">
   	<c:forEach items="${plans}" var="plan">
	    <p style="padding: 5px 20px; border-bottom: 1px solid #ccc"><a href="${plan.id}">${plan.name}</a></p>
	</c:forEach>
  	</div>
  	<br>
  	
    <div class="left">
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
	</div>
</div>