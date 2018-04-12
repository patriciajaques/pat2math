<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

    <div id="loading">
  		<img id="loading-image" src="/pat2math/images/Pat2Math_Load.gif" alt="Loading..." />
	</div>
	<div id="loadingWE">
  		<img id="loading-image" src="/pat2math/images/Pat2Math_Load.gif" alt="Loading..." />
	</div>
    
    <!-- <img id="loadingImage" src="img/loading.gif"/> -->
    

     <div id="papers" style="text-align: center;">
   		<div id="paper-1"  style="display: inline-block;"> 		    
   			<div id="refresh_page" title="Atualizar a página" onclick="window.location.reload();"></div>
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
	
	<button id="startTest" onclick="knowledgeTest()"> Iniciar teste</button>
    <div id="mask" onclick="test56()"></div>

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
