<script>
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
</script>
<script>
function helpPopups(title, description, width) {
	$.guider({
		name: "helpPopups",
		title: title,
		description: description,
		overlay : "dark",
		width : width,    
		alignButtons: "center",
		onShow : function() {document.getElementById("jGuider_helpPopups").style.top = "15px"},
		buttons: {
			OK: {
				click: true,
				className: "primary"
			}
	}
	}).show();
}
</script>

<script src="/pat2math/newPatequation/texts/en-UK.js"></script>
<script src="/pat2math/newPatequation/texts/es-ES.js"></script>
<script src="/pat2math/newPatequation/texts/pt-BR.js"></script>
<script src="/pat2math/newPatequation/texts/idiomSelection.js"></script>

<script>

//	atualiza os textos dos elementos HTML
if(document.getElementById("loginElem0") != null)
	document.getElementById("loginElem0").innerHTML = loginTXT[0];
if(document.getElementById("loginElem1") != null)
	document.getElementById("loginElem1").innerHTML = loginTXT[1];
document.getElementById("loginWithFacebook").innerHTML = loginTXT[2];
document.getElementById("email").placeholder = loginTXT[3];
document.getElementById("password").placeholder = loginTXT[4];
document.getElementById("fbLoginButton").innerHTML = loginTXT[5];
document.getElementById("loginElem2").innerHTML = loginTXT[6];
if(document.getElementById("loginElem3") != null)
	document.getElementById("loginElem3").innerHTML = loginTXT[7];
document.getElementById("loginElem4").innerHTML = loginTXT[8];
document.getElementById("loginElem5").innerHTML = loginTXT[9];
document.getElementById("loginElem6").innerHTML = loginTXT[10];
document.getElementById("loginButton").value = loginTXT[14];

//	Atualiza a bandeira do botão de alteração de idioma
document.getElementById("loginCurrentFlag").innerHTML = '<img src="/pat2math/images/' + idioma + '.png" onclick="languageSelection()" style="width:6%; margin-right:-330px"/>';
document.getElementById("loginCurrentFlag").title = idioma;
</script>
