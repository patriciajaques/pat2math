<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div class="block">
	<p class="right">
		<a href="new" class="btn btn-large">novo tópico</a>
	</p>
	<br>
	<table class="table table-bordered table-striped">
	    <thead>
		    <tr>
		    	<th><p><spring:message code="topic" /></p></th>
	    	</tr>
	    </thead>

	    <tbody>
	    	<c:forEach items="${sets}" var="set">
			    <tr>
			    	<td>
			    		<a href="${set.id}">${set.name}</a>
			    	</td>
			    </tr> 
			  </c:forEach>
	    </tbody>
    </table>
</div>