<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<script>
	$(document).ready(
		function() {
			$(".search-button").on("click", 
				function() {
					$.ajax({
						url: "/pat2math/sets/search",
						data: {"name": $(".search-set").val()},
						type: "get",
						success: function(data) { $(".sets").html(data); }
					});
				}
			);
		}
	);
</script>

<input class="search-set" type="text" placeholder="procure por nome/equação..." />
<a class="btn btn-large search-button">
	<i class="icon-search"></i>
</a>

<div class="sets"></div>