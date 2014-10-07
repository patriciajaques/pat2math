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
    
    <!-- <img id="loadingImage" src="img/loading.gif"/> -->
    <div id="topics">
		<br>
		<c:forEach items="${topics}" var="topic">
			<span class="topic" onclick="loadTasks(${topic.set.id})">
				${topic.set.name}
			</span>
			<div id="tasks${topic.set.id}" class="tasks"></div>
		</c:forEach>
		
		<br><br><br>
		<div class="left">
			<!-- <p><a href="account" class="white-link">Perfil</a></p> -->
			<p><a href="/pat2math/j_spring_security_logout" class="white-link">Logout</a></p><br><br><br>
		</div>
		<br>
	</div>
	
	<p><span class="hide-menu"><</span></p>
	
	<div id="note">
        <span id="amountPoins">0 de 0 pontos</span>
        <br><br>
        <span>Barra de progresso:</span>

        <div id="progressBar" class="progress progress-striped">
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
	
    <div id="mask" onclick="test56()"></div>
	<div id="video-box"></div>
	
	<div class="modal" id="msg-box"></div>
</body>
</html>