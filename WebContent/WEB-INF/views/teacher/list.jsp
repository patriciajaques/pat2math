<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<p class="left">
	<a href="new" class="btn btn-large">novo professor</a>
</p>
<br>

<table class="table table-bordered">
    <thead>
	    <tr>
	    	<th><p>Professores</p></th>
    	</tr>
    </thead>

    <tbody>
    	<c:forEach items="${teachers}" var="teacher">
		    <tr>
		    	<td>
		    		<a href="${teacher.id}">${teacher.email}</a>
		    	</td>
		    </tr> 
		  </c:forEach>
    </tbody>
</table>