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

<script src="/pat2math/login/texts/en-UK.js"></script>
<script src="/pat2math/login/texts/es-ES.js"></script>
<script src="/pat2math/login/texts/pt-BR.js"></script>
<script src="/pat2math/login/texts/idiomSelection.js"></script>
