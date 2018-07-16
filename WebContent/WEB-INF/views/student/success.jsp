<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<style>
	section {
		margin-top: 30px;
	}
</style>

<div class="box">
	<p><img src="/pat2math/images/Pat2MathBETA.png" /></p>
	<br><br>
	<h2 id="newElem8" class="left"></h2>
	<p id="newElem9" class="left"></p>
</div>

<script src="/pat2math/newPatequation/texts/en-UK.js"></script>
<script src="/pat2math/newPatequation/texts/es-ES.js"></script>
<script src="/pat2math/newPatequation/texts/pt-BR.js"></script>
<script src="/pat2math/newPatequation/texts/idiomSelection.js"></script>

<script>
//	atualiza os textos dos elementos HTML
document.getElementById("newElem8").innerHTML = newTXT[8];
document.getElementById("newElem9").innerHTML = newTXT[9];
</script>