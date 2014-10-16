<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>

<div class="block">

	<security:authorize access="hasRole('ROLE_ADMIN')">
		
		<p class="left">
			<a href="/pat2math/video/new" class="btn btn-large">novo video</a>
			<a href="/pat2math/exercise/new" class="btn btn-large">novo exercício</a>
		</p>
		
		<table class="table table-bordered">
			<thead>
			    <tr>
			    	<th><p>Conteúdo</p></th>
			    	<th><p>Tipo</p></th>
			    	<th><p></p></th>
		    	</tr>
			</thead>
			
			<tbody>
				<c:forEach items="${disabledContents}" var="content">
				    <tr>
				    	<td>
				    		<a href="disabled/${content.id}">${content.name}</a>
				    	</td>
				    	<td>
				    		${content.type}
				    	</td>
				    	<td>
				    		<span id="content-${content.id}">
				    			<span class="link" onclick="enableContent(${content.id})">aceitar</span>
				    		</span>
				    	</td>
				    </tr> 
				 </c:forEach>
				<c:forEach items="${enabledContents}" var="content">
				    <tr>
				    	<td>
				    		<a href="${content.id}">${content.name}</a>
				    	</td>
				    	<td>
				    		${content.type}
				    	</td>
				    	<td>
				    		<span class="link" onclick="enableContent(${content.id})">excluir</span>
				    	</td>
				    </tr> 
				 </c:forEach>
		    </tbody>
		</table>
	</div>
</security:authorize>
	
<security:authorize access="hasRole('ROLE_TEACHER')">
	<h2>Ajude a construir o PAT2Math enviando conteúdos</h2>
	<a href="/pat2math/video/new" class="btn btn-large">enviar video</a>
	<a href="/pat2math/exercise/new" class="btn btn-large">enviar exercício</a>
</security:authorize>