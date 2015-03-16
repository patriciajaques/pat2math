<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

    <div id="loading">
  		<img id="loading-image" src="/pat2math/images/Pat2Math_Load.gif" alt="Loading..." />
	</div>
    
    <!-- <img id="loadingImage" src="img/loading.gif"/> -->
    <div id="topics" style="overflow: auto">
    	<div id="bar-header" >
    		<img src="/pat2math/images/logo_horizontal_pat2math.png" style="width: 50%;">
    	</div>
    	
    	<div class="left">
			<!-- <p><a href="account" class="white-link">Perfil</a></p> -->
			<p><a href="javascript:window.close()"	><img src="/pat2math/images/logout.png" style="height: 15%; width: 15%; border-radius: 5px;" /></a></p>
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
            <div class="bar" role="progressbar" style="width: 0%;">
                <span class="label"></span>
            </div>
        </div>

        <button id="hint" class="btn">D i c a</button>
    </div>
    
    <div id="hintBox">
        <div id="hintText"></div>
    </div>
    
     <div id="papers" style="text-align: center; margin-top: -119px">
   		<div id="paper-1"  style="display: inline-block;">
   			<div id="refresh_page" title="Recarregar página"></div>
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
                        <div class="hLine" id="linha3"></div>
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
	
	<div id="help" title="Páginas de Ajuda" onclick="helpPage()"></div>
    <div id="mask" onclick="test56()"></div>
<!--     <div id="equationTour"></div> -->
    <div id="tour" title="Tour Interativo" onclick="clickTour()"></div>
	<div id="video-box"></div>
	<div id="help-box"></div>
	<div id="topicsAux"></div>
<!-- 	<div id="easter-egg-loupe-box"></div> -->
	
	
	<div class="modal" id="msg-box"></div>