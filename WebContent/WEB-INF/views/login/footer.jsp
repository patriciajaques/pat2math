<script>
checkBrowser();


	
function checkBrowser ( ) {
	var browser = navigator.userAgent.toLowerCase();
	
	if (browser.indexOf("mozilla") !== -1)
		if (browser.indexOf("firefox") !== -1) {
			var temp = navigator.userAgent.indexOf ("Firefox") + 8;
		    var versaoString = navigator.userAgent.substring (temp, temp + 6);
		    var versao = parseInt (versaoString);
		    
		    if (versao < 38) {
		    	
		    }
			
			return;
		}
	
	$("#firefox-box").html("<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/images/modal_firefox.png border=0> <div style='position:absolute; top:250px; left:225px;'> <a href='https://www.mozilla.org/pt-BR/'><img src=/pat2math/images/firefox_download.png></img></a> <div style='position:absolute; top:-246px; left:360px;'> <a href=# onclick=closeWindow()><img src=/pat2math/images/modal_exit.png></img></a>");
	$("#mask").fadeIn(700);
	$("#firefox-box").fadeIn(700);
	
// 	$.guider({
// 	    description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/images/modal_firefox.png border=0> <div style='position:absolute; top:250px; left:225px;'> <a href='https://www.mozilla.org/pt-BR/'><img src=/pat2math/images/firefox_download.png></img></a> <div style='position:absolute; top:-270px; left:360px;'> <a href=# onclick=closeWindow()><img src=/pat2math/images/modal_exit.png></img></a>",
// 	    closable: true,
// 	    overlay: "dark",
// 	    width: 624,
// 	    alignButtons: "right",
// 	    }).show();  
}

function closeWindow ( ) {
	$("#mask").fadeOut(700);
	$("#firefox-box").fadeOut(700);	
}

</script>