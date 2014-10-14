<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<head>
	<script src="/pat2math/patequation/js/guider-2.1.0.min.js"></script>
	<link rel="stylesheet" href="/pat2math/patequation/css/guider-2.1.0.min.css" type="text/css" />
</head>

<style>
	section {
		margin-top: 30px;
	} 
</style>

<script>
checkBrowser();

function checkBrowser ( ) {
	var browser = navigator.userAgent.toLowerCase();
	
	if (browser.indexOf("mozilla") !== -1)
		if (browser.indexOf("firefox") !== -1)
			return;
	
	$.guider({
	    description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/images/modal_firefox.png border=0> <div style='position:absolute; top:250px; left:225px;'> <a href='https://www.mozilla.org/pt-BR/'><img src=/pat2math/images/firefox_download.png></img></a> <div style='position:absolute; top:-270px; left:360px;'> <a href=# onclick=closeWindow()><img src=/pat2math/images/modal_exit.png></img></a>",
	    closable: true,
	    overlay: "dark",
	    width: 624,
	    alignButtons: "right",
	    }).show();  
}

function closeWindow ( ) {
    $.guider({
        
    }).hideAll();
}

</script>
 
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
	<input type="checkbox" name="_spring_security_remember_me" /> Lembrar-me
	
	<c:if test="${param.failed == true}">
		<p class="error" style="font-size: 16px;">Usuário ou senha inválidos</p>
	</c:if>
	<input class="btn btn-large" value="login" type="submit"><br>
	<p class="left"><a href="/pat2math/student/new">cadastrar</a></p> 
 	<p class="left"><a href="user/forgotPassword">esqueci minha senha</a></p>
</form>