<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div id="fb-root"></div>

<script>
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.10&appId=669959713214349';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
</script>

    <div id="loading">
  		<img id="loading-image" src="/pat2math/images/Pat2Math_Load.gif" alt="Loading..." />
	</div>
	<div id="loadingWE">
  		<img id="loading-image" src="/pat2math/images/Pat2Math_Load.gif" alt="Loading..." />
	</div>
    
    <!-- <img id="loadingImage" src="img/loading.gif"/> -->
    
    <div id="topics" style="overflow: auto">
    	<div id="bar-header" >
    		<img src="/pat2math/images/logo_horizontal_pat2math.png" style="width: 50%; margin-left: 60px">
    		<span id="idiomSelect" onclick="languageSelection()" title="htmlTXT-1"> 
	    		<img src="/pat2math/images/globe.png" style="width: 12%; margin-left:10px; margin-bottom:2px"/> 
			</span>
    		<span id="currentFlag" title="Flag"> 
				<img src="/pat2math/images/Brazil-Flag.png" style="width: 6%; margin-left:2px; margin-top:20px"> 
			</span>
    	</div>
    	
    	<div class="left">
			<!-- <p><a href="account" class="white-link">Perfil</a></p> -->
			<p><a href="/pat2math/j_spring_security_logout"><img src="/pat2math/images/logout.png" style="height: 15%; width: 15%; border-radius: 5px; margin-top: -96px; margin-left: 7px" /></a></p>
			<p><div class="generalScore" id="totalScore" style="margin-top: -26px;"></div>
			<p><div class="generalScore" id="levelScore"></div>
			<p><div class="generalScore" id="stageScore"></div>	
<!-- 			<p><a href="/pat2math/j_spring_security_logout"	><img src="/pat2math/images/logout.png" style="height: 15%; width: 15%; border-radius: 5px;" /><span id="exitText">&nbspSair</span></a></p> -->
<!--  			<p><button type="button" onclick="getResolution()">Teste Resolução</button></p> -->
<!-- 			<p><button type="button" onclick="getStep()">Teste Passo</button></p> -->
			
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
<%-- 		<%@ include file="./topicList.jsp"%> --%>
		</div>
		
		<br><br><br>
		
		<br>
	</div>
	
	<p><span class="hide-menu">
	 
	</span></p>
	
	<div id="note">
        <span id="amountPoins"></span>
        <br><br>

        <div id="progressBar" class="progress">
            <div class="bar" role="progressbar" style="width: 0%;">
                <span class="label"></span>
            </div>
        </div>

        <button id="hint" class="btn">D i c a</button>
        <div id="freeHints" style="width: 212px; margin-left: -20px; margin-top: 2px;"></div>    
    </div>
     <div id='hintBox'><div id='hintText'></div></div>
    
     <div id="papers" style="text-align: center;">
   		<div id="paper-1"  style="display: inline-block;"> 		    
   			<div id="refresh_page" title="htmlTXT-3" onclick="window.location.reload();"></div>
   			<div id="logo" title="PAT2Math =D"></div>
   			<div class="limitsHintsAndErrors" id="freeHintsOld"></div>
   			<div class="limitsHintsAndErrors" id="freeErrors"></div>

					<div style="display: none;" id="date">
				         <div id="dateDay" class="dates"></div>
				         <div id="dateMonthAux">
				             <div id="dateMonth" class="dates"></div> 
				         </div>
				         <div id="dateYear" class="dates"></div>
				     </div>

                    <div id="lines">

        	</div>       
     	</div>
	</div>
    
    <div style="position: fixed; top: 0; left: 0">
        <div class="dropdown">
            <!-- Link or button to toggle dropdown -->
            <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                <!--<li><a id="addLabel" tabindex="-1" onclick="addLabelDefault();" accesskey="a">Adicionar caixa</a></li>-->
                <li><a id="clearLine" tabindex="-1" onclick="clearLine('all');" accesskey="l">Limpar linha</a></li>
<!--                 <li class="divider"></li> -->
<!--                 <li><a id="abc" tabindex="-1" onclick="referenceToABC('', '', '', 'a');" accesskey="t">Encontrar a, b e c</a></li> -->
<!--                 <li><a id="delta" tabindex="-1" onclick="referenceToDelta();" accesskey="c">Calcular Delta</a></li> -->
<!--                 <li><a id="bhaskara" tabindex="-1" onclick="referenceToBhaskara();" accesskey="b">Calcular Bhaskara</a></li> -->
            </ul>
        </div>
    </div>

	<!-- <div id="noteBox">
        <div id="canvasDiv">
            <p id="clearCanvas">x</p>
        </div>
    </div> -->
	

	<div id="newPoints">+10</div>
	<div id="rewardWorkedExamples" title="htmlTXT-5" onclick="changeColor()"></div>
	<div id="help" title="htmlTXT-0" onclick="helpPage()"></div>
    <div id="mask" onclick="test56()"></div>
<!--     <div id="equationTour"></div> -->
    <div id="tour" title="htmlTXT-6" onclick="tourTCC()"></div>
    <div id="reportBug" title="htmlTXT-4" onclick="reportBug()"></div>
    <div id="ranking" title="htmlTXT-2" onclick="ranking()"></div>
	<div id="video-box"></div>
	<div id="help-box"></div>
	<div id="reportBug-box"></div>
	<div id="uploadImage-box"></div>
	<div id="quest-box"></div>
	<div id="topicsAux"></div>
	<div id="tourAux"></div>
	<div id="imLegend" title="I'm Legend"><img src= "/pat2math/patequation/img/ImLegend.jpg" height="310px" width="232px"></img></div>
<!-- 	<div id="plansAux" style='visibility: hidden'></div> -->
<!-- 	<div id="easter-egg-loupe-box"></div> -->
	
	
	<div class="modal" id="msg-box"></div>
	<div id="noticeHint" style="display: none;"><div id="noticeHintModal" class="jGuider ui-draggable ui-draggable-disabled ui-state-disabled" style="display: block; position: absolute; width: 581px; top: 43.967px; left: 473.15px;" id="jGuider_gamification2" aria-disabled="true"><div class="jgContent" style="background: #82C785;"><div class="jgTitle">Nós otimizamos o sistema de ajuda do PAT2Math</div><div class="jgNoDrag"><div class="jgClose"></div><div class="jgDesc">Clique neste botão sempre que precisar de ajuda, em qualquer um dos passos da equação selecionada. E não se preocupe se você não souber como prosseguir após a ajuda recebida: a cada clique adicional no botão de dica em um mesmo passo da equação, o texto de ajuda será mais objetivo. </div><div class="jgButtons jgAlignCenter"><button class="primary" onclick="document.getElementById('noticeHint').style.display='none';">Entendi</button></div></div></div><span class="jgArrow jg-left" style="border-width: 30px 0px 30px 30px; margin-top: -30px;"><span style="border-width: 30px 0px 30px 30px; top: -30px;"></span></span></div></div>
<!-- 		<div id="calculatorIcon" title='Calculadora' onclick="showCalculator()"><img src=/pat2math/patequation/img/calculadora.png border=0></div> -->
<!-- 		<div id="calculator" title='Digite a expressão desejada e clique em "="'> -->
<!-- 	<form name="calculator" > <input type="textfield" name="ans" value=""> -->
<!-- <input type="button" value="=" onClick="document.calculator.ans.value=eval(document.calculator.ans.value)"> -->
<!-- </form> -->
<!-- 	</div> -->

<script>
function compartilharFacebook(){
	FB.ui({
		method: 'feed',
		name: 'PAT2Math teste',
		link: 'pat2math.unisinos.br/pat2math/ranking',
		picture: 'http://pat2math.unisinos.br/pat2math/images/Pat2MathBETA.png',
		caption: 'LEGENDA',
		description: 'DESCRIÇÃO'
	});
}
</script>