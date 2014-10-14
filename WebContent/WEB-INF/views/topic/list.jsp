<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<script>
	function addTopics() {
		var ids = "";
		$("input[type=checkbox]").each(
			function() {
				if($(this).attr("checked") == "checked") {
					ids += $(this).attr("id") + ", ";
				}
			}
		);
		$.ajax({
			url: "topic/",			
		});
	}
</script>

<c:forEach items="${sets}" var="set">
	<p>
		<input type="checkbox" id="${set.id}" />
		<a href="/pat2math/sets/${set.id}">${set.name}</a>
	</p>
</c:forEach>

<a onclick="addTopics()" type="submit" class="btn btn-large">Adicionar Tópicos</a>