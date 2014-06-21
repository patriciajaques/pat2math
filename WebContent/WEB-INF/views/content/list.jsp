<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>

<div class="block">

	<security:authorize access="hasRole('ROLE_ADMIN')">
		
		<div class="row-fluid">
			<div class="span6" style="text-align: left">
				<input style="margin-top: 1px" type="text" placeholder="procure por nome..." />
				<a href="/pat2math/exercise/new" class="btn btn-large">
					<i class="icon-search"></i>
				</a>
			</div>
			<div class="span6" style="text-align: right">
				<a href="/pat2math/video/new" class="btn btn-large">novo video</a>
				<a href="/pat2math/exercise/new" class="btn btn-large">novo exercício</a>
			</div>
		</div>
		
		<br>
		<ul id="myTab" class="nav nav-pills">
	   		<li class="active"><a href="#enabled" data-toggle="tab">conteúdos ativos</a></li>
	   		<li><a href="#disabled" data-toggle="tab">conteúdos pendentes</a></li>
	   	</ul>
		<br>
		
		<div class="tab-content">
		
			<div class="tab-pane" id="enabled">
				<table class="table table-bordered table-striped">
				    <thead>
					    <tr>
					    	<th><p>Conteúdo</p></th>
					    	<th><p>Tipo</p></th>
					    	<th><p>Descrição</p></th>
					    	<th><p></p></th>
				    	</tr>
				    </thead>
			
				    <tbody>
				    	<c:forEach items="${enabledContents}" var="content">
						    <tr>
						    	<td>
						    		<p><a href="${content.id}">${content.name}</a></p>
						    	</td>
						    	<td>
						    		<p>${content.type}</p>
						    	</td>
						    	<td>
						    		<p>${content.description}</p>
						    	</td>
						    	<td>
						    		<p>
						    			<span class="link" onclick="enableContent(${content.id})">excluir</span>
						    		</p>
						    	</td>
						    </tr> 
						 </c:forEach>
				    </tbody>
			    </table>
	    
			</div>
			
			<div class="tab-pane" id="disabled">
				 <table class="table table-bordered table-striped">
				    <thead>
					    <tr>
					    	<th><p>Conteúdo</p></th>
					    	<th><p>Tipo</p></th>
					    	<th><p>Descrição</p></th>
					    	<th><p></p></th>
				    	</tr>
				    </thead>
			
				    <tbody>
				    	<c:forEach items="${disabledContents}" var="content">
						    <tr>
						    	<td>
						    		<p><a href="disabled/${content.id}">${content.name}</a></p>
						    	</td>
						    	<td>
						    		<p>${content.type}</p>
						    	</td>
						    	<td>
						    		<p>${content.description}</p>
						    	</td>
						    	<td>
						    		<p id="content-${content.id}">
						    			<span class="link" onclick="enableContent(${content.id})">aceitar</span>
						    		</p>
						    	</td>
						    </tr> 
						 </c:forEach>
				    </tbody>
	    		</table>
			</div>
		</div>
	</security:authorize>
	
	<security:authorize access="hasRole('ROLE_TEACHER')">
		<h2>Ajude a construir o PAT2Math enviando conteúdos</h2>
		<a href="/pat2math/video/new" class="btn btn-large">enviar video</a>
		<a href="/pat2math/exercise/new" class="btn btn-large">enviar exercício</a>
	</security:authorize>

</div>