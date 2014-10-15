<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>

<html lang="en">    
   <head>
        <link href='http://fonts.googleapis.com/css?family=Petit+Formal+Script' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Iceland' rel='stylesheet' type='text/css'> 
        <link href='http://fonts.googleapis.com/css?family=Amatic+SC:400,700' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="/pat2math/patequation/css/guider-2.1.0.min.css" type="text/css" />
        <script src="/pat2math/patequation/js/guider-2.1.0.min.js"></script>
    	
    	<style>
    		input[type="text"] {
				text-align: center;
				font-size: 18px;
				font-weight: bold;
				margin-top: 0px;
				height: 20px;
			}
    	</style>
    </head>
    <body>
    
    <script>
    audio();
    
    function helpPage6 ( ) {
        $.guider({
		description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_06.png border=0> <div style='position:absolute; top:220px; left:-15px;'> <a href=# onclick=helpPage5()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0px; left:467px;'> <div style='position:absolute; top:242px; left:-30px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>",

                closable: true,
                overlay: "dark",
                alignButtons: "right"
		}).show();   
    }
    
    function helpPage5 ( ) {
        $.guider({
		description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_05.png border=0> <div style='position:absolute; top:220px; left:-15px;'> <a href=# onclick=helpPage4()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0px; left:467px;'> <a href=# onclick=helpPage6()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:242px; left:-30px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>",
                closable: true,
                overlay: "dark",
                alignButtons: "right"
		}).show();   
    }
    
    function helpPage4 ( ) {
        $.guider({
		description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_04.png border=0> <div style='position:absolute; top:220px; left:-15px;'> <a href=# onclick=helpPage3()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0px; left:467px;'> <a href=# onclick=helpPage5()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:242px; left:-30px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>",
                closable: true,
                overlay: "dark",
                alignButtons: "right"
		}).show();   
    }
    
    function helpPage3 ( ) {
        $.guider({
		description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_03.png border=0> <div style='position:absolute; top:220px; left:-15px;'> <a href=# onclick=helpPage2()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0px; left:467px;'> <a href=# onclick=helpPage4()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:242px; left:-30px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>",
                closable: true,
                overlay: "dark",
                alignButtons: "right"
		}).show();   
    }
    function helpPage2 ( ) {
        $.guider({
		description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_02.png border=0> <div style='position:absolute; top:220px; left:-15px;'> <a href=# onclick=helpPage()><img src=/pat2math/patequation/img/seta_left.png></img></a> <div style='position:absolute; top:0px; left:467px;'> <a href=# onclick=helpPage3()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:242px; left:-30px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>",
                closable: true,
                overlay: "dark",
                alignButtons: "right"
		}).show();   
    }
    function helpPage ( ) {
        $.guider({
		description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/pagina_01.png border=0> <div style='position:absolute; top:220px; left:452px;'> <a href=# onclick=helpPage2()><img src=/pat2math/patequation/img/seta_right.png></img></a> <div style='position:absolute; top:242px; left:-30px;'> <a href=# onclick=closeWindow()><img src=/pat2math/patequation/img/exit.png></img></a>",
                closable: true,
                overlay: "dark",
                alignButtons: "right"
		}).show();   
    }
    
    function closeWindow ( ) {
        $.guider({
            
        }).hideAll();
    }
    
    function playAudio ( ) {
        $.guider({
    		description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/modal_audio.png border=0> <audio autoplay> <source src='/pat2math/patequation/audio/audio1.ogg' type='audio/mpeg'> </audio>",
                    closable: true,
                    overlay: "dark",
                    alignButtons: "right",
                    width: 620
    		}).show();  

        setTimeout(function(){closeWindow();showSideBar();},345000); 
    }
    function audio ( ) {
        $.guider({
    		description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/modal_audio.png border=0><div style='position:absolute; top:330px; left:245px;'> <a href=# onclick=playAudio()><img src=/pat2math/patequation/img/botao_play.png></img></a>",
                    closable: true,
                    overlay: "dark",
                    alignButtons: "right",
                    width: 620
    		}).show();
        
    }

    function playAudio2 ( ) {
        $.guider({
    		description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/modal_audio.png border=0> <audio autoplay> <source src='/pat2math/patequation/audio/audio2.ogg' type='audio/mpeg'> </audio>",
                    closable: true,
                    overlay: "dark",
                    alignButtons: "right",
                    width: 620
    		}).show();  

        setTimeout(function(){closeWindow();showSideBar();},185000); 
    }
    function audio2 ( ) {
        $.guider({
    		description: "<div style='position:relative; top:0px; left:0px;'> <img src=/pat2math/patequation/img/modal_audio.png border=0><div style='position:absolute; top:335px; left:250px;'> <a href=# onclick=playAudio2()><img src=/pat2math/patequation/img/botao_play.png></img></a>",
                    closable: true,
                    overlay: "dark",
                    alignButtons: "right",
                    width: 620
    		}).show();  
    }
    
    function rel() {
    	   $.ajax({  
    		     type : "Get",   
    		     url : "/pat2math/student/reload_task",     
    		     success : function(response) { 
    		    	/* $('#the_list').html('Teste'); */
     		      	$('#the_list').html(response);   
    		     },  
    		     error : function(e) {  
    		      alert('Error: ' + e);   
    		     }  
    		    }); 
	}
    
    
    </script>
    
    <!-- <img id="loadingImage" src="img/loading.gif"/> -->
    <div id="topics" style="overflow: auto">
    	<div id="bar-header" >
    		<img src="/pat2math/images/logo_horizontal_pat2math.png" style="width: 50%;">
    	</div>
    	
    	<div class="left">
			<!-- <p><a href="account" class="white-link">Perfil</a></p> -->
			<p><a href="/pat2math/j_spring_security_logout" class="white-link">Logout</a></p>
<!-- 			<p><span class="white-link" onclick="rel()">Reload</span></p> -->
		</div>
    	
		<br>
		<%-- <c:forEach items="${topics}" var="topic">
			<span class="topic" onclick="loadTasks(${topic.set.id})">
				${topic.set.name}
			</span>
			<div id="tasks${topic.set.id}" class="tasks"></div>
		</c:forEach> 
		<%@ include file="./topicList.jsp"%>
		--%>
		
		
		<div id="the_list">
		<%@ include file="./topicList.jsp"%>
		</div>
		
		<br><br><br>
		
		<br>
	</div>
	
	<p><span class="hide-menu">
	 
	</span></p>
	
	<div id="note">
        <span id="amountPoins">0 de 0 pontos</span>
        <br><br>
        <span>Barra de progresso:</span>

        <div id="progressBar" class="progress">
            <div class="bar" role="progressbar" style="width: 100%;">
                <span class="label"></span>
            </div>
        </div>

        <button id="hint" class="btn">D i c a</button>
    </div>
    
    <div id="hintBox">
        <div id="hintText"></div>
    </div>
    
     <div id="papers" style="text-align: center;">
   		<div id="paper-1"  style="display: inline-block;">
   			<div id="logo" title="PAT2Math =D"></div>

					<div style="display: none;" id="date">
				         <div id="dateDay" class="dates"></div>
				         <div id="dateMonthAux">
				             <div id="dateMonth" class="dates"></div> 
				         </div>
				         <div id="dateYear" class="dates"></div>
				     </div>

                    <div id="lines">
                        <div class="hLineAux">.</div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
        	</div>       
     	</div>
	</div>
    
    <div style="position: fixed; top: 0; left: 0">
        <div class="dropdown">
            <!-- Link or button to toggle dropdown -->
            <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                <!--<li><a id="addLabel" tabindex="-1" onclick="addLabelDefault();" accesskey="a">Adicionar caixa</a></li>-->
                <li><a id="clearLine" tabindex="-1" onclick="clearLine('all');" accesskey="l">Limpar linha</a></li>
                <li class="divider"></li>
                <li><a id="abc" tabindex="-1" onclick="referenceToABC('', '', '', 'a');" accesskey="t">Encontrar a, b e c</a></li>
                <li><a id="delta" tabindex="-1" onclick="referenceToDelta();" accesskey="c">Calcular Delta</a></li>
                <li><a id="bhaskara" tabindex="-1" onclick="referenceToBhaskara();" accesskey="b">Calcular Bhaskara</a></li>
            </ul>
        </div>
    </div>

	<!-- <div id="noteBox">
        <div id="canvasDiv">
            <p id="clearCanvas">x</p>
        </div>
    </div> -->
	
	<div id="newPoints">+10</div>
	
	<div id="help" onclick="helpPage()"></div>
    <div id="mask" onclick="test56()"></div>
	<div id="video-box"></div>
	
	<div class="modal" id="msg-box"></div>
</body>
</html>