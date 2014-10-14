<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<script type="text/javascript" src="/pat2math/js/swfobject.js"></script>    

<div style="display: inline-block;">
	<div id="ytapiplayer">
		You need Flash player 8+ and JavaScript enabled to view this video.
	</div>
</div>
<div style="display:none" id="url">${video.url}</div>
<div style="display:none" id="idVideo">${video.id}</div>

<script type="text/javascript">
	function onYouTubePlayerReady(playerId) {
		ytplayer = document.getElementById("myytplayer");
		ytplayer.addEventListener("onStateChange", "change");
	}

	function change(state) {
		if(state == 0) {
			var idVideo = $("#idVideo").html();
			$.post(
				"/pat2math/video/finished",
				{"idVideo" : idVideo},
				function(data) {
					
				}
			);
			$("#marktask"+idTaskVideo).removeAttr("style"); 
            $("#marktask"+idTaskVideo).addClass("icon-white");
            tasksRemaining--;
            if (tasksRemaining===0){
            	rel();
            }
		}
	}

    var params = { allowScriptAccess: "always" };
    var atts = { id: "myytplayer" };
    var url = $("#url").html();
    swfobject.embedSWF(url+"?enablejsapi=1&playerapiid=ytplayer&version=3",
                       "ytapiplayer", "625", "356", "8", null, null, params, atts);
</script>