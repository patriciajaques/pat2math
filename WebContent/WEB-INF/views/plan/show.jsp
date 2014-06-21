<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>

<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>

<script>
	$(function() {
		$("#sortable").sortable({
			start: function(event, ui) {
		   	    var start_pos = ui.item.index();
		        ui.item.data('start_pos', start_pos);
		    },
			update: function (event, ui) {
			    var start_pos = ui.item.data('start_pos');
			    var end_pos = ui.item.index();
			    var plan_id = $("#plan-id").html();
			    $.ajax({
			    	url: "/pat2math/topic/change",
			    	data: {"idPlan": plan_id, "position1": start_pos, "position2": end_pos}
			    });
			}
		});
		$("#sortable").disableSelection();
	});
</script>

<div id="plan-id" style="display: none">${plan.id}</div>

<div class="block left">
	<h2 class="left">${plan.name}</h2>
	<p>Plano pertencente ao professor <b>${plan.teacher.firstName} ${plan.teacher.lastName}</b></p>
	<br><br><br>
	
	<security:authorize access="principal.isOwnerOfPlan('${plan.id}')">
		<a href="/pat2math/topic/new/${plan.id}" class="btn btn-large">
			adicionar tópico
		</a>
	</security:authorize><br><br>
	
   	<ul id="sortable" class="list">
   		<c:forEach items="${plan.topics}" var="topic">
			<li class="item">
	    		<a href="/pat2math/sets/${topic.set.id}">
	    			${topic.set.name}
	    		</a>
	    	</li>
	    </c:forEach>
	</ul>
	<c:if test="${empty plan.topics}"><br><p>Este plano ainda não possui nenhum tópico</p><br></c:if>
</div>