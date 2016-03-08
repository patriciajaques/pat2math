<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

    <div id="loading">
  		<img id="loading-image" src="/pat2math/images/Pat2Math_Load.gif" alt="Loading..." />
	</div>
	<div id="loadingWE">
  		<img id="loading-image" src="/pat2math/images/Pat2Math_Load.gif" alt="Loading..." />
	</div>
    
    <!-- <img id="loadingImage" src="img/loading.gif"/> -->
    
    <div id="topics" style="overflow: auto">
    	<div id="bar-header" >
    		<img src="/pat2math/images/logo_horizontal_pat2math.png" style="width: 50%;">
    	</div>
    	
    	<div class="left">
			<!-- <p><a href="account" class="white-link">Perfil</a></p> -->
			<p><a href="/pat2math/j_spring_security_logout"	><img src="/pat2math/images/logout.png" style="height: 15%; width: 15%; border-radius: 5px;" /></a></p>
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
		<div class="locked" id="lplan2" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(2)">Plano de Aula 1</span>
		<div id="tasks2" class="tasks"></div>
		<div class="locked" id="lplan3" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(3)">Plano de Aula 2</span>
		<div id="tasks3" class="tasks"></div>
		<div class="locked" id="lplan4" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(4)">Plano de Aula 3</span>
		<div id="tasks4" class="tasks"></div>
		<div class="locked" id="lplan5" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(5)">Plano de Aula 4</span>
		<div id="tasks5" class="tasks"></div>
		<div class="locked" id="lplan6" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(6)">Plano de Aula 5</span>
		<div id="tasks6" class="tasks"></div>
		<div class="locked" id="lplan7" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(7)">Plano de Aula 6</span>
		<div id="tasks7" class="tasks"></div>
		<div class="locked" id="lplan8" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(8)">Plano de Aula 7</span>
		<div id="tasks8" class="tasks"></div>
		<div class="locked" id="lplan10" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(10)">Plano de Aula 8</span>
		<div id="tasks10" class="tasks"></div>
		<div class="locked" id="lplan11" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 	
		<span class="topic" onclick="loadTasks(11)">Plano de Aula 9</span>
		<div id="tasks11" class="tasks"></div>
		<div class="locked" id="lplan12" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(12)">Plano de Aula 10</span>
		<div id="tasks12" class="tasks"></div>
		<div class="locked" id="lplan13" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(13)">Plano de Aula 11</span>
		<div id="tasks13" class="tasks"></div>
		<div class="locked" id="lplan14" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(14)">Plano de Aula 12</span>
		<div id="tasks14" class="tasks"></div>
		<div class="locked" id="lplan15" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(15)">Plano de Aula 13</span>
		<div id="tasks15" class="tasks"></div>
		<div class="locked" id="lplan16" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(16)">Plano de Aula 14</span>
		<div id="tasks16" class="tasks"></div>
		<div class="locked" id="lplan17" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(17)">Plano de Aula 15</span>
		<div id="tasks17" class="tasks"></div>
		<div class="locked" id="lplan18" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(18)">Plano de Aula 16</span>
		<div id="tasks18" class="tasks"></div>
		<div class="locked" id="lplan19" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(19)">Plano de Aula 17</span>
		<div id="tasks19" class="tasks"></div>
		<div class="locked" id="lplan20" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(20)">Plano de Aula 18</span>
		<div id="tasks20" class="tasks"></div>
		<div class="locked" id="lplan21" onclick="padlockClick()"><img src="/pat2math/patequation/img/cadeado_fechado.png"></img></div> 
		<span class="topic" onclick="loadTasks(21)">Plano de Aula 19</span>
		<div id="tasks21" class="tasks"></div>
		
<%-- 		<%@ include file="./topicList.jsp"%> --%>
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
   			<div id="refresh_page" title="Atualizar a página"></div>
   			<div id="logo" title="PAT2Math =D"></div>

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
	<div id="help" title="Páginas de Ajuda" onclick="helpPage()"></div>
    <div id="mask" onclick="test56()"></div>
<!--     <div id="equationTour"></div> -->
<!--     <div id="tour" title="Tour Interativo" onclick="clickTour()"></div> -->
    <div id="reportBug" title="Reportar um problema no PAT2Math" onclick="reportBug()"></div>
	<div id="video-box"></div>
	<div id="help-box"></div>
	<div id="reportBug-box"></div>
	<div id="uploadImage-box"></div>
	<div id="quest-box"></div>
	<div id="workedExamplesBlock" title="Esta equação é um exemplo resolvido. Clique no botão play para continuar"></div>
	<div id="topicsAux"></div>
	<div id="tourAux"></div>
<!-- 	<div id="easter-egg-loupe-box"></div> -->
	
	
	<div class="modal" id="msg-box"></div>
<!-- 		<div id="calculatorIcon" title='Calculadora' onclick="showCalculator()"><img src=/pat2math/patequation/img/calculadora.png border=0></div> -->
<!-- 		<div id="calculator" title='Digite a expressão desejada e clique em "="'> -->
<!-- 	<form name="calculator" > <input type="textfield" name="ans" value=""> -->
<!-- <input type="button" value="=" onClick="document.calculator.ans.value=eval(document.calculator.ans.value)"> -->
<!-- </form> -->
<!-- 	</div> -->
	
