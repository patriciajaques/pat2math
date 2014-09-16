<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>

<html lang="en">    
    <head>
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
			<p><a href="account" class="white-link">Perfil</a></p>
			<p><a href="/pat2math/j_spring_security_logout" class="white-link">Logout</a></p><br><br><br>
			<p><a href="#" id="hide-menu" class="white-link">Esconder o menu</a></p>
		</div>
		<br>
	</div>
	
	<p id="show-menu">
		<a id="show-menu-link" href="#">Mostrar o menu</a>
	</p>
	
	<!-- <img id="loadingImage" src="img/loading.gif"/> -->
	
	<div id="hintBox">
        	<div id="hintText"></div>
    </div>
   <div id="papers" style="text-align: center;">
   		
   		
   		<div id="paper-1"  style="display: inline-block;">
             		<p id="points">
             			<span>0 de 0 pontos</span>
    	         		<a id="hint" class="btn btn-large">Dica</a>
             		</p>                  
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
                <li><a id="bhaskara" tabindex="-1" onclick="referenceToBhaskara();" accesskey="b">Calcular BhÃ¡skara</a></li>
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