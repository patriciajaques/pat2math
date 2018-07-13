<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:if test="${confirmed == true}">
	<p id="elem0" class="msg"></p>
</c:if>
<c:if test="${param.recovery == true}">
	<p id="elem1" class="msg"></p>
</c:if>

<form class="box" action="/pat2math/j_spring_security_check" method="post" accept-charset="utf-8">
	<p>
		<img src="/pat2math/images/Pat2MathBETA.png" />
	</p>
	<div id="currentFlag"></div>
	
	<br>
	
	<p>
		<div id="loginWithFacebook" style="visibility: hidden; font-size: 25px"></div>
		<input id="email" placeholder="email" type='text' class="focus" name='j_username' />
	</p>
	
	<p>
		<input id="password" placeholder="senha" type='password' name='j_password'>			
	</p>
	
	<br>

	<!-- 	<input type="checkbox" name="_spring_security_remember_me" /> Lembrar-me -->
	<input class="btn btn-large" id="loginButton" type="submit">
	
	<br><br>
		
	<fb:login-button id="fbLoginButton" size="large" scope="public_profile,email" onlogin="checkLoginState();"<span class="_4z_f fwb"></span>
    </fb:login-button>
    <br>
    <br>
    <p id="elem2" style="color: black"></p>
	<c:if test="${param.failed == true}">
		<p id="elem3" class="error" style="font-size: 16px;margin-top: 15px""></p>
	</c:if>
	
	<br>
	
	<p class="left"><a id="elem4" href="/pat2math/student/new"></a></p> 
 	<p class="left"><a id="elem5" href="user/forgotPassword"></a></p>
 	
 	<br>
 	
 	<div id="facebookButtonLike" style="text-align: center" class="box">
 		<p>
 			<h3 id="elem6" style="color: black"></h3>
 		</p>
 		<div style="text-align: center; width: 250px;" class="fb-like" data-href="https://www.facebook.com/Pat2Math" data-width="250" data-layout="standard" data-action="like" data-size="large" data-show-faces="true" data-share="false"></div>
 	</div>
</form>

<div id="mask" onclick="test56()"></div>

<div id="helpPopups-box">
	
</div>

<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
<script>
	
	function popupBlocked(){
		if(navigator.userAgent.indexOf("Edge")!=-1){
			helpPopups(text[11], "<img src=/pat2math/img/edge.png border=0 width=98% height=90%>", "45%");
		}
		else if(navigator.userAgent.indexOf("OPR")!=-1){
			helpPopups(text[11], "<img src=/pat2math/img/opera.png border=0 width=98% height=90%> <br><br> <img src=/pat2math/img/opera2.png border=0 width=98% height=90%>", "45%");
		}
		else if(navigator.userAgent.indexOf("Firefox")!=-1){
			helpPopups(text[11], "<img src=/pat2math/img/firefox.png border=0 width=98% height=90%> <br><br> <img src=/pat2math/img/firefox2.png border=0 width=98% height=90%>" ,"45%");
		}
		else if(navigator.userAgent.indexOf("Version")!=-1){
			helpPopups(text[11], "<img src=/pat2math/img/safari.png border=0 width=98% height=90%> <br><br> <img src=/pat2math/img/safari2.png border=0 width=98% height=90%>", "45%");
		}
		else if(navigator.userAgent.indexOf(".NET")!=-1){
			document.getElementById("helpPopups-box").style.height = "50%";
			helpPopups(text[11], "<img src=/pat2math/img/ie.png border=0 width=98% height=90%> <br><br> <img src=/pat2math/img/ie2.png border=0 width=98% height=90%>", "45%");
		}
		else{
			helpPopups(text[11], "<img src=/pat2math/img/chrome.png border=0 width=98% height=90%> <br><br> <img src=/pat2math/img/chrome2.png border=0 width=98% height=90%>", "45%");
		}
				
	}
	
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
			document.getElementById('status').innerHTML = text[12];
		}else{
			document.getElementById('status').innerHTML = text[13];
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
</script>