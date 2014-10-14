<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div class="block left">
	<a href="new" class="btn btn-large">nova turma</a>
</div>
<br>
<table class="table table-bordered">
    <thead>
	    <tr>
	    	<th><p>Meus grupos</p></th>
	    	<th><p>Opções</p></th>
    	</tr>
    </thead>
	<tbody>
		<c:forEach items="${groups}" var="group">
    		<tr>
		    	<td>
					<a href="${group.id}">${group.name}</a>
		    	</td>
		    	<td>
					<a title="editar" href="edit/${group.id}"><i class="icon-edit"></i></a>
					<%-- <a title="editar" href="delete/${group.id}"><i class="icon-remove"></i></a> --%>
		    	</td>
		    	
		    </tr>
		</c:forEach>	
    </tbody>
</table>

<c:if test="${empty groups}">
	<p>Não foi encontrado nenhum plano de ensino para ser exibido.</p><br>
</c:if>