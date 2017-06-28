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
		<div id="loginWithFacebook" style="visibility: hidden; font-size: 25px">Entrando com o Facebook...</div>
		<input id="email" placeholder="email" type='text' class="focus" name='j_username' />
	</p>
	
	<p>
		<input id="password" placeholder="senha" type='password' name='j_password'>			
	</p>
	
	<br>

	<!-- 	<input type="checkbox" name="_spring_security_remember_me" /> Lembrar-me -->
	<input class="btn btn-large" id="loginButton" value="Login" type="submit">
	
	<br><br>
		
	<fb:login-button size="large" scope="public_profile,email" onlogin="checkLoginState();" <span class="_4z_f fwb"> Entre com o Facebook </span>
    </fb:login-button>
	
	<c:if test="${param.failed == true}">
		<p class="error" style="font-size: 16px;margin-top: 15px"">Usuário ou senha inválidos</p>
	</c:if>
	
	<br><br>
	
	<p class="left"><a href="/pat2math/student/new">Cadastre-se</a></p> 
 	<p class="left"><a href="user/forgotPassword">Esqueci minha senha</a></p>
 	
 	<br>
 	
 	<div id="facebookButtonLike" style="text-align: center" class="box">
 		<p>
 			<h3 style="color: black"> Curta nossa página no Facebook </h3>
 		</p>
 		<div style="text-align: center; width: 250px;" class="fb-like" data-href="https://www.facebook.com/Pat2Math" data-layout="standard" data-action="like" data-size="large" data-show-faces="true" data-share="false"></div>
 	</div>
</form>

<div id="mask" onclick="test56()"></div>

<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
<script>
	
	FB.init({
	    appId      : '669959713214349',
	    xfbml      : true,
	    version    : 'v2.9'
	  });
	
	function fazLogin(response) {
		document.getElementById('email').style.visibility = "hidden";
		document.getElementById('password').style.visibility = "hidden";
		document.getElementById('loginButton').style.visibility = "hidden";
		document.getElementById('loginWithFacebook').style.visibility = "visible";
		document.getElementById('email').value = ""+response.email;
		document.getElementById('password').value = ""+response.id;
		FB.logout();
		document.getElementById('loginButton').click(); 
	}
	function statusChangeCallback(response){
		console.log('statusChangeCallback');
		console.log(response);
		if(response.status === 'connected'){
			usuarioConectado();
			login();
		}else if (response.status === 'not_authorized'){
			document.getElementById('status').innerHTML = 'Faça login no app';
		}else{
			document.getElementById('status').innerHTML = 'Faça login no Facebook';
		}
	}
	
	function checkLoginState(){
		FB.getLoginStatus(function(response){
			statusChangeCallback(response);
		});		
	}
	
	window.fbAsyncInit = function() {
	    FB.init({
	      appId      : '669959713214349',
	      xfbml      : true,
	      version    : 'v2.9'
	    });
	    FB.AppEvents.logPageView();
	  };

	  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "//connect.facebook.net/en_US/sdk.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));
	  
	  function usuarioConectado(){
		  FB.api('/me', {fields: 'name,email'}, function(response){
			  console.log(response.name + "Email:"+ response.email);
			  
			  $.ajax({
					type: "GET",
					url: appContext + "student/new_facebook_student",
					data: {"name" : response.name, "email" : response.email, "id" : response.id}, 
					success:
						function(data) {
							console.log(data);
						},
					error:
						 function(XMLHttpRequest, textStatus, errorThrown) {
					     	//alert("Perdão, obtivemos um erro ao processar esta ação.");
					 	}
					});	
			  
			  document.getElementById("info").innerHTML =
					  'Nome: '+response.name +
					  '<br> ID: ' +response.id;
		  });
	  }	
	  
	  function login(){
		  FB.login(function(response) {
			   if (response.authResponse) {
			     var access_token =   FB.getAuthResponse()['accessToken'];
			     FB.api('/me', {fields: 'name,email'}, function(response) {
			    	 //session.setAttribute( "user", response );
			     	fazLogin(response);
			     });
			   } else {
			     console.log('User cancelled login or did not fully authorize.');
			   }
			 }, {scope: 'email'});
	  }
	  
	  //function logout(){
		//FB.logout(function(response) {
			   // Person is now logged out
			//});  
	  //}

</script>
