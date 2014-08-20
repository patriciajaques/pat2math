<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<style>
	section {
		margin-top: 30px;
	}
</style>

<div class="block">
	<form:form action="update" modelAttribute="student">
		<p>Nome</p>
		<p><form:input path="firstName" /></p>
		<p>Sobrenome</p>
		<p><form:input path="lastName" /></p>
		
		<p>Turma</p>
		<form:select path="group">
			<c:forEach var="group" items="${groups}">
		    	<c:choose>
		       	 <c:when test="${student.group.name == group.name}">
		       	     <form:option path="group" selected="true" value="${group.id}">
		       	         ${group.name}
		       	     </form:option>
		       	 </c:when>
		       	 <c:otherwise>
		        	    <form:option value="${group.id}">
		    	        	${group.name}
		    	        </form:option>
		    	    </c:otherwise>
		    	</c:choose>
			</c:forEach>
		</form:select>
	</form:form>
	
	<p>Agente animado</p>
	<select>
		<option>sim</option>
		<option>não</option>
	</select>
	
	<p>Outer loop</p>
	<select>
		<option>aberto</option>
		<option>sequencial</option>
		<option>macroadaption</option>
	</select>
	
	<br><br>
	<p>
		<input type="submit" class="btn btn-large btn-primary" value="salvar" />
		<a class="btn btn-large" href="home">cancelar</a>
	</p>
</div>
