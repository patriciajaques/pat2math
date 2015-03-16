<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:if test="${confirmed == true}">
	<p class="msg">Conta confirmada com sucesso</p>
</c:if>
<c:if test="${param.recovery == true}">
	<p class="msg">Senha atualizada com sucesso</p>
</c:if>

<form class="box" action="/pat2math/j_spring_security_check" method="post" accept-charset="utf-8">
	<p>
		<img src="/pat2math/images/Pat2MathBETA.png" />
	</p>
	<br><br>
	
	<p>
		<input placeholder="email" type='text' class="focus" name='j_username' />
	</p>
	
	<p>
		<input placeholder="senha" type='password' name='j_password'>
	</p>
	
	<br>

	<!-- 	<input type="checkbox" name="_spring_security_remember_me" /> Lembrar-me -->
	<input class="btn btn-large" value="login" type="submit">
	
	<c:if test="${param.failed == true}">
		<p class="error" style="font-size: 16px;margin-top: 15px"">Usuário ou senha inválidos</p>
	</c:if>
	
	<p class="left"><a href="/pat2math/student/new">cadastrar</a></p> 
 	<p class="left"><a href="user/forgotPassword">esqueci minha senha</a></p>
</form>

<div id="mask" onclick="test56()"></div>
<div id="firefox-box"></div>