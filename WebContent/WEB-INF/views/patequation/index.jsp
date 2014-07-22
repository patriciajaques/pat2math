<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>

<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="author" content="Felipe de Morais">
        <title>..:: PAT2Math ::.. </title> 

        <link rel="shortcut icon" href="img/iconeLogo.ico" type="image/x-icon">

        <!-- <script src="/pat2math/patequation/js/loader.js" type="text/javascript" charset="utf-8"></script> -->

        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="/pat2math/patequation/assets/css/bootstrap-responsive.css" rel="stylesheet">
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
			<a href="account" class="white-link">Perfil</a></p>
			<p><a href="/pat2math/j_spring_security_logout" class="white-link">Logout</a></p><br><br><br>
			<!-- <p><a href="/pat2math/j_spring_security_logout" class="white-link">Esconder esta aba</a></p> -->
		</div>
		<br>
	</div>
	
    <center>
        <img id="loadingImage" src="img/loading.gif"/>
        <div id="book">

            <ul class="tabs">
                <li><a id="aPaper1" href="#paper-1" onclick="reloadPaper(1);" accesskey="1">1</a></li>
                <li><a id="aPaper2" href="#paper-2" onclick="reloadPaper(2);" accesskey="2">2</a></li>
                <li><a id="aPaper3" href="#paper-3" onclick="reloadPaper(3);" accesskey="3">3</a></li>
                <li><a id="aPaper4" href="#paper-4" onclick="reloadPaper(4);" accesskey="4">4</a></li>
                <li><a id="aPaper5" href="#paper-5" onclick="reloadPaper(5);" accesskey="5">5</a></li>
                <li><a id="aPaper6" href="#paper-6" onclick="reloadPaper(6);" accesskey="6">6</a></li>
                <li><a id="aPaper7" href="#paper-7" onclick="reloadPaper(7);" accesskey="7">7</a></li>
                <li><a id="aPaper8" href="#paper-8" onclick="reloadPaper(8);" accesskey="8">8</a></li>
                <li><a id="aPaper9" href="#paper-9" onclick="reloadPaper(9);" accesskey="9">9</a></li>
                <li><a id="aPaper10" href="#paper-10" onclick="reloadPaper(10);" accesskey="0">10</a></li>
                <li id="liHelpSystem"><a id="aPaperHelp" href="#paper-help" onclick="reloadPaper('help');" accesskey="?">?</a></li>
            </ul>

            <div id="papers">                
                <div id="note">
                    <span id="amountPoins">0 de 0 pontos</span>
                    <br><br>
                    <span>Barra de progresso:</span>

                    <div id="progressBar" class="progress progress-striped">
                        <div class="bar" role="progressbar" style="width: 100%;">
                            <span class="label"></span>
                        </div>
                    </div>

                    <!--                    <button id="newEquation">New Equation</button>                    -->
                    <button id="hint" class="btn btn-info">D i c a</button>
                </div>
                <div class="tape"></div> 
                <!--<div id="helpSystem" title="Ajuda com o sistema"></div>-->
                <div id="hintBox">
                    <div class="verticalTape"></div>
                    <div id="hintText"></div>
                </div>

                <div id="paper-1">

                    <div id="date">
                        <div id="dateDay" class="dates"></div>
                        <div id="dateMonthAux">
                            <div id="dateMonth" class="dates"></div> 
                        </div>
                        <div id="dateYear" class="dates"></div>
                    </div>

                    <div id="logo" title="PAT2Math =D"></div>

                    <!--        class="canCopy" // os elementos podem ser copiados, apenas draggable
                                class="canMove" //os elementos pode ser trocados de lugar, sortable-->   
                    <!--                    <div class="container-fluid">
                                            <div class="row-fluid">
                                                <div class="span1">
                                                    Sidebar content --- holes
                                                </div>
                                                <div class="span11">
                                                    Body content --- lines 
                                                </div>
                                            </div>
                                        </div>-->

                    <div id="lines">
                        <div class="hLineAux">.</div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad1)" />
                            </svg>                        
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad1)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad1)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad1)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                    </div>               
                </div>


                <div id="paper-2">

                    <div id="date">
                        <div id="dateDay" class="dates"></div>
                        <div id="dateMonthAux">
                            <div id="dateMonth" class="dates"></div> 
                        </div>
                        <div id="dateYear" class="dates"></div>
                    </div>

                    <div id="logo" title="PAT2Math =D"></div>

                    <!--        class="canCopy" // os elementos podem ser copiados, apenas draggable
                                class="canMove" //os elementos pode ser trocados de lugar, sortable-->   

                    <div id="lines">
                        <div class="hLineAux">.</div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad2)" />
                            </svg>
                        </div>
                        <div class="hLine">                        
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad2)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad2)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad2)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                    </div>               
                </div>

                <div id="paper-3">

                    <div id="date">
                        <div id="dateDay" class="dates"></div>
                        <div id="dateMonthAux">
                            <div id="dateMonth" class="dates"></div> 
                        </div>
                        <div id="dateYear" class="dates"></div>
                    </div>

                    <div id="logo" title="PAT2Math =D"></div>

                    <!--        class="canCopy" // os elementos podem ser copiados, apenas draggable
                                class="canMove" //os elementos pode ser trocados de lugar, sortable-->   

                    <div id="lines">
                        <div class="hLineAux">.</div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad3)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad3)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad3)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad3)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                    </div>               
                </div>

                <div id="paper-4">

                    <div id="date">
                        <div id="dateDay" class="dates"></div>
                        <div id="dateMonthAux">
                            <div id="dateMonth" class="dates"></div> 
                        </div>
                        <div id="dateYear" class="dates"></div>
                    </div>

                    <div id="logo" title="PAT2Math =D"></div>

                    <!--        class="canCopy" // os elementos podem ser copiados, apenas draggable
                                class="canMove" //os elementos pode ser trocados de lugar, sortable-->   

                    <div id="lines">
                        <div class="hLineAux">.</div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad4)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad4)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad4)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad4)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                    </div>               
                </div>

                <div id="paper-5">

                    <div id="date">
                        <div id="dateDay" class="dates"></div>
                        <div id="dateMonthAux">
                            <div id="dateMonth" class="dates"></div> 
                        </div>
                        <div id="dateYear" class="dates"></div>
                    </div>

                    <div id="logo" title="PAT2Math =D"></div>

                    <!--        class="canCopy" // os elementos podem ser copiados, apenas draggable
                                class="canMove" //os elementos pode ser trocados de lugar, sortable-->   

                    <div id="lines">
                        <div class="hLineAux">.</div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad5)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad5)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad5)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad5)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                    </div>               
                </div>

                <div id="paper-6">

                    <div id="date">
                        <div id="dateDay" class="dates"></div>
                        <div id="dateMonthAux">
                            <div id="dateMonth" class="dates"></div> 
                        </div>
                        <div id="dateYear" class="dates"></div>
                    </div>

                    <div id="logo" title="PAT2Math =D"></div>

                    <!--        class="canCopy" // os elementos podem ser copiados, apenas draggable
                                class="canMove" //os elementos pode ser trocados de lugar, sortable-->   

                    <div id="lines">
                        <div class="hLineAux">.</div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad6)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad6)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad6)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad6)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                    </div>               
                </div>

                <div id="paper-7">

                    <div id="date">
                        <div id="dateDay" class="dates"></div>
                        <div id="dateMonthAux">
                            <div id="dateMonth" class="dates"></div> 
                        </div>
                        <div id="dateYear" class="dates"></div>
                    </div>

                    <div id="logo" title="PAT2Math =D"></div>

                    <!--        class="canCopy" // os elementos podem ser copiados, apenas draggable
                                class="canMove" //os elementos pode ser trocados de lugar, sortable-->   

                    <div id="lines">
                        <div class="hLineAux">.</div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad7)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad7)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad7)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad7)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                    </div>               
                </div>

                <div id="paper-8">

                    <div id="date">
                        <div id="dateDay" class="dates"></div>
                        <div id="dateMonthAux">
                            <div id="dateMonth" class="dates"></div> 
                        </div>
                        <div id="dateYear" class="dates"></div>
                    </div>

                    <div id="logo" title="PAT2Math =D"></div>

                    <!--        class="canCopy" // os elementos podem ser copiados, apenas draggable
                                class="canMove" //os elementos pode ser trocados de lugar, sortable-->   

                    <div id="lines">
                        <div class="hLineAux">.</div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad8)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad8)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad8)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad8)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                    </div>               
                </div>

                <div id="paper-9">

                    <div id="date">
                        <div id="dateDay" class="dates"></div>
                        <div id="dateMonthAux">
                            <div id="dateMonth" class="dates"></div> 
                        </div>
                        <div id="dateYear" class="dates"></div>
                    </div>

                    <div id="logo" title="PAT2Math =D"></div>

                    <!--        class="canCopy" // os elementos podem ser copiados, apenas draggable
                                class="canMove" //os elementos pode ser trocados de lugar, sortable-->   

                    <div id="lines">
                        <div class="hLineAux">.</div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad9)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad9)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad9)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad9)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                    </div>               
                </div>

                <div id="paper-10">

                    <div id="date">
                        <div id="dateDay" class="dates"></div>
                        <div id="dateMonthAux">
                            <div id="dateMonth" class="dates"></div> 
                        </div>
                        <div id="dateYear" class="dates"></div>
                    </div>

                    <div id="logo" title="PAT2Math =D"></div>

                    <!--        class="canCopy" // os elementos podem ser copiados, apenas draggable
                                class="canMove" //os elementos pode ser trocados de lugar, sortable-->   

                    <div id="lines">
                        <div class="hLineAux">.</div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad10)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad10)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad10)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#grad10)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                    </div>               
                </div>

                <div id="paper-help">

                    <div id="date">
                        <div id="dateDay" class="dates"></div>
                        <div id="dateMonthAux">
                            <div id="dateMonth" class="dates"></div> 
                        </div>
                        <div id="dateYear" class="dates"></div>
                    </div>

                    <div id="logo" title="PAT2Math =D"></div>

                    <!--        class="canCopy" // os elementos podem ser copiados, apenas draggable
                                class="canMove" //os elementos pode ser trocados de lugar, sortable-->   
                    <!--                    <div class="container-fluid">
                                            <div class="row-fluid">
                                                <div class="span1">
                                                    Sidebar content --- holes
                                                </div>
                                                <div class="span11">
                                                    Body content --- lines 
                                                </div>
                                            </div>
                                        </div>-->

                    <div id="lines">
                        <div class="hLineAux">.</div>
                        <div class="hLine">
                            <h4>Ajuda com o sistema</h4>
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#gradHelp)" />
                            </svg>                        
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <table class="systemHelp">
                                <tr>
                                    <td class="example">
                                        5+x <b>-></b> 5+x
                                    </td>
                                    <td>
                                        Operação de adição: tecla <span class="kbd">+</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="hLine">
                            <table class="systemHelp">
                                <tr>
                                    <td class="example">
                                        x-6 <b>-></b> x-6
                                    </td>
                                    <td>
                                        Operação de subtração: tecla <span class="kbd">-</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="hLine">
                            <table class="systemHelp">
                                <tr>
                                    <td class="example">
                                        4*3 <b>-></b> 4*3
                                    </td>
                                    <td>
                                        Operação de multiplicação: tecla <span class="kbd">*</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="hLine">
                            <table class="systemHelp">
                                <tr>
                                    <td class="example">
                                        8+3/x+5 <b>-></b> <math><mn>8</mn><mo>+</mo><mfrac><mn>3</mn><mn>x</mn></mfrac><mo>+</mo><mn>5</mn></math>
                                    </td>
                                    <td>
                                        Operação de divisão (um elemento): tecla <span class="kbd">/</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">
                            <circle cx="15" cy="15" r="12" fill="url(#gradHelp)" />
                            </svg>
                            <table class="systemHelp">
                                <tr>
                                    <td class="example">
                                        (7+x)/(x*4) <b>-></b> <math><mfrac><mrow><mn>7</mn><mo>+</mo><mn>x</mn></mrow><mrow><mn>x</mn><mo>*</mo><mn>4</mn></mrow></mfrac></math>
                                    </td>
                                    <td>
                                        Operação de divisão (vários elementos): teclas <span class="kbd">/</span> e <span class="kbd">(</span> <span class="kbd">)</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <table class="systemHelp">
                                <tr>
                                    <td class="example">
                                        x=+-7 <b>-></b> <math><mn>x</mn><mo>=</mo><mo>±</mo><mn>7</mn></math>
                                    </td>
                                    <td>
                                        Operação de mais e menos: teclas <span class="kbd">+</span> e <span class="kbd">-</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="hLine">
                            <table class="systemHelp">
                                <tr>
                                    <td class="example">
                                        r4+x <b>-></b> <math><msqrt><mn>4</mn></msqrt><mo>+</mo><mn>x</mn></math>
                                    </td>
                                    <td>
                                        Operação de raíz quadrada (um elemento): tecla <span class="kbd">r</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="hLine">
                            <table class="systemHelp">
                                <tr>
                                    <td class="example">
                                        r(5+x) <b>-></b> <math><msqrt><mrow><mn>5</mn><mo>+</mo><mn>x</mn></mrow></msqrt></math>
                                    </td>
                                    <td>
                                        Operação de raí­z quadrada (vários elementos): tecla <span class="kbd">r</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="hLine">
                            <table class="systemHelp">
                                <tr>
                                    <td class="example">
                                        3-x^2 <b>-></b> <math><msup><mn>x</mn><mn>2</mn></msup></math>
                                    </td>
                                    <td>
                                        Operação de potenciação (um elemento): teclas <span class="kbd">^</span> + <span class="kbd">2</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="hLine">
                            <table class="systemHelp">
                                <tr>
                                    <td class="example">
                                        (3-x)^2  <b>-></b> <math><msup><mrow><mo>(</mo><mn>3</mn><mo>-</mo><mn>x</mn><mo>)</mo></mrow><mn>2</mn></msup></math>
                                    </td>
                                    <td>
                                        Operação de potenciaçãoo (vários elementos): teclas <span class="kbd">^</span> + <span class="kbd">2</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="hLine">
                            <svg class="hole">                
                            <circle cx="15" cy="15" r="12" fill="url(#gradHelp)" />
                            </svg>
                        </div>
                        <div class="hLine">
                            <h4>Pontuação</h4>
                        </div>
                        <div class="hLine">
                            <table class="systemHelp">
                                <tr>
                                    <td class="examplePoints">
                                        + pontos
                                    </td>
                                    <td>
                                        Acertar os passos e a resposta final da equação (+10 pontos ou mais).
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="hLine">
                            <table class="systemHelp">
                                <tr>
                                    <td class="examplePoints">
                                        - pontos
                                    </td>
                                    <td>
                                        Errar um passo (-5 pontos) e pedir uma dica (-2 pontos).
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine"></div>
                        <div class="hLine">
                            <svg class="hole">
                            <circle cx="15" cy="15" r="12" fill="url(#gradHelp)" />
                            </svg>
                        </div>
                        <div class="hLine"></div>
                    </div>               
                </div>

            </div>
            <div id="calculatorAccess"> </div>
            <div id="noteAccess"> </div>
        </div>
    </center>
    
    <div style="position: fixed; top: 0; left: 0">
        <svg>
        <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="70%" fy="60%">
        <stop offset="40%" style="stop-color:#F0F0F0;stop-opacity:1" /> <!-- branco rgb(240,240,240)-->
        <stop offset="100%" style="stop-color:#BDB76B; stop-opacity:1" /> <!-- cor da linha  rgb(189,183,107) --> 
        </radialGradient>
        </defs>
        </svg>

        <svg>
        <defs>
        <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="70%" fy="60%">
        <stop offset="40%" style="stop-color:#F0F0F0;stop-opacity:1" /> <!-- branco -->
        <stop offset="100%" style="stop-color:#008B8B; stop-opacity:1" /> <!-- cor da linha  --> 
        </radialGradient>
        </defs>
        </svg>

        <svg>
        <defs>
        <radialGradient id="grad3" cx="50%" cy="50%" r="50%" fx="70%" fy="60%">
        <stop offset="40%" style="stop-color:#F0F0F0;stop-opacity:1" /> <!-- branco -->
        <stop offset="100%" style="stop-color:#dba000; stop-opacity:1" /> <!-- cor da linha  --> 
        </radialGradient>
        </defs>
        </svg>

        <svg>
        <defs>
        <radialGradient id="grad4" cx="50%" cy="50%" r="50%" fx="70%" fy="60%">
        <stop offset="40%" style="stop-color:#F0F0F0;stop-opacity:1" /> <!-- branco -->
        <stop offset="100%" style="stop-color:#00b10c; stop-opacity:1" /> <!-- cor da linha  --> 
        </radialGradient>
        </defs>
        </svg>

        <svg>
        <defs>
        <radialGradient id="grad5" cx="50%" cy="50%" r="50%" fx="70%" fy="60%">
        <stop offset="40%" style="stop-color:#F0F0F0;stop-opacity:1" /> <!-- branco -->
        <stop offset="100%" style="stop-color:#b10057; stop-opacity:1" /> <!-- cor da linha  --> 
        </radialGradient>
        </defs>
        </svg>

        <svg>
        <defs>
        <radialGradient id="grad6" cx="50%" cy="50%" r="50%" fx="70%" fy="60%">
        <stop offset="40%" style="stop-color:#F0F0F0;stop-opacity:1" /> <!-- branco -->
        <stop offset="100%" style="stop-color:#0026c8; stop-opacity:1" /> <!-- cor da linha  --> 
        </radialGradient>
        </defs>
        </svg>

        <svg>
        <defs>
        <radialGradient id="grad7" cx="50%" cy="50%" r="50%" fx="70%" fy="60%">
        <stop offset="40%" style="stop-color:#F0F0F0;stop-opacity:1" /> <!-- branco -->
        <stop offset="100%" style="stop-color:#b10000; stop-opacity:1" /> <!-- cor da linha  --> 
        </radialGradient>
        </defs>
        </svg>

        <svg>
        <defs>
        <radialGradient id="grad8" cx="50%" cy="50%" r="50%" fx="70%" fy="60%">
        <stop offset="40%" style="stop-color:#F0F0F0;stop-opacity:1" /> <!-- branco -->
        <stop offset="100%" style="stop-color:#ab007d; stop-opacity:1" /> <!-- cor da linha  --> 
        </radialGradient>
        </defs>
        </svg>

        <svg>
        <defs>
        <radialGradient id="grad9" cx="50%" cy="50%" r="50%" fx="70%" fy="60%">
        <stop offset="40%" style="stop-color:#F0F0F0;stop-opacity:1" /> <!-- branco -->
        <stop offset="100%" style="stop-color:#009b5b; stop-opacity:1" /> <!-- cor da linha  --> 
        </radialGradient>
        </defs>
        </svg>

        <svg>
        <defs>
        <radialGradient id="grad10" cx="50%" cy="50%" r="50%" fx="70%" fy="60%">
        <stop offset="40%" style="stop-color:#F0F0F0;stop-opacity:1" /> <!-- branco -->
        <stop offset="100%" style="stop-color:#9d4e00; stop-opacity:1" /> <!-- cor da linha  --> 
        </radialGradient>
        </defs>
        </svg>

        <svg>
        <defs>
        <radialGradient id="gradHelp" cx="50%" cy="50%" r="50%" fx="70%" fy="60%">
        <stop offset="40%" style="stop-color:#F0F0F0;stop-opacity:1" /> <!-- branco -->
        <stop offset="100%" style="stop-color:#999999; stop-opacity:1" /> <!-- cor da linha  --> 
        </radialGradient>
        </defs>
        </svg>


        <div class="dropdown">
            <!-- Link or button to toggle dropdown -->
            <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                <!--<li><a id="addLabel" tabindex="-1" onclick="addLabelDefault();" accesskey="a">Adicionar caixa</a></li>-->
                <li><a id="clearLine" tabindex="-1" onclick="clearLine('all');" accesskey="l">Limpar linha</a></li>
                <li class="divider"></li>
                <li><a id="abc" tabindex="-1" onclick="referenceToABC('', '', '', 'a');" accesskey="t">Encontrar a, b e c</a></li>
                <li><a id="delta" tabindex="-1" onclick="referenceToDelta();" accesskey="c">Calcular Delta</a></li>
                <li><a id="bhaskara" tabindex="-1" onclick="referenceToBhaskara();" accesskey="b">Calcular BhÃ¡skara</a></li>
                <!--            <li class="divider"></li>
                            <li><a tabindex="-1" >Something else here</a></li>                -->
                <!--<li><a tabindex="-1" href="#">Separated link</a></li>-->
            </ul>
        </div>
    </div>

    <div id="calculatorBox"> 
        <div id="calculator">
            <!-- Screen and clear key -->
            <div class="top">
                <span class="clear">C</span>
                <div class="screen"></div>
            </div>

            <div class="keys">
                <!-- operators and other keys -->
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span class="operator">+</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span class="operator">-</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span class="operator">Ã·</span>
                <span>0</span>
                <span>.</span>
                <span class="eval">=</span>
                <span class="operator">x</span>
            </div>
        </div>

    </div>

    <div id="noteBox"> 
        <!-- Screen and clear key -->
        <div id="canvasDiv">
            <p id="clearCanvas">x</p>
        </div>
    </div>


    <div id="boxOperations" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">Ã</button>
            <h4 id="myModalLabel">Selecione a operaÃ§Ã£o utilizada:</h4>
        </div>    
        <label for="soma">
            <input id="soma" type="radio" name="operations" value="AD"/>
            <img src="img/AD.gif" alt="AdiÃ§Ã£o"/>
        </label>
        <label for="subtracao">
            <input id="subtracao" type="radio" name="operations" value="SB"/>
            <img src="img/SB.gif" alt="SubtraÃ§Ã£o"/>
        </label>
        <label for="multiplicacao">
            <input id="multiplicacao" type="radio" name="operations" value="MT"/>
            <img src="img/MT.gif" alt="MultiplicaÃ§Ã£o"/>
        </label>
        <label for="divisao">
            <input id="divisao" type="radio" name="operations" value="DV"/>
            <img src="img/DV.gif" alt="DivisÃ£o"/>
        </label>
        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
            <!--<button class="btn btn-primary">Save changes</button>-->
        </div>
    </div>

    <!--    <div id="boxHelpSystem" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">Ã</button>
                <h4 id="myModalLabel">Ajuda com a interface do sistema</h4>
            </div>    
            <div class="modal-body">
                <div class="accordion" id="accordion2">
                    <div class="accordion-group">
                        <div class="accordion-heading">
                            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">
                                Atalhos do sistema
                            </a>
                        </div>
                        <div id="collapseOne" class="accordion-body collapse in">
                            <div class="accordion-inner">                        
                                <table class="table table-striped" width="80%">
                                    <caption>
                                        <h4>Atalhos no Teclado</h4>
                                    </caption>
                                    <thead>
                                        <tr>
                                            <th>Atalho</th>
                                            <th>DescriÃ§Ã£o</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td width="20%">
                                                <span class="kbd">alt</span> + <span class="kbd">?</span>
                                            </td>
                                            <td width="80%">
                                                Solicita uma dica referente ao Ãºltimo passo correto da equaÃ§Ã£o;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span class="kbd">alt</span> + <span class="kbd">c</span>
                                            </td>
                                            <td>
                                                Template para selecionar os <span class="kbd">c</span>oeficiÃªntes a, b e c na resoluÃ§Ã£o de uma equaÃ§Ã£o de 2Â° grau utilizando bhÃ¡skara;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span class="kbd">alt</span> + <span class="kbd">d</span>
                                            </td>
                                            <td>
                                                Template para selecionar o valor do <span class="kbd">d</span>elta;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span class="kbd">alt</span> + <span class="kbd">b</span>
                                            </td>
                                            <td>
                                                Template para a fÃ³rmula de <span class="kbd">b</span>hÃ¡skara;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span class="kbd">alt</span> + <span class="kbd">t</span>
                                            </td>
                                            <td>
                                                Adicionar uma caixa de <span class="kbd">t</span>exto na linha em aberto;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span class="kbd">alt</span> + <span class="kbd">l</span>
                                            </td>
                                            <td>
                                                Apaga todos os compoentes na linha em aberto, <span class="kbd">l</span>impando-a;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span class="kbd">alt</span> + <span class="kbd">1-9</span>
                                            </td>
                                            <td>
                                                Seleciona a aba com o nÃºmero correpospondente;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span class="kbd">alt</span> + <span class="kbd">0</span>
                                            </td>
                                            <td>
                                                Seleciona a aba de nÃºmero 10;
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
    
                                <table class="table table-striped" width="80%">
                                    <caption>
                                        <h4>Atalhos no Mouse</h4>
                                    </caption>
                                    <thead>
                                        <tr>
                                            <th>Atalho</th>
                                            <th>DescriÃ§Ã£o</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td width="20%">
                                                <span class="kbd">botÃ£o direito</span>
                                            </td>
                                            <td width="80%">
                                                Ao clicar na folha de resoluÃ§Ãµes com o botÃ£o direito do mouse, um menu irÃ¡ se abrir com algumas opÃ§Ãµes do sistema;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span class="kbd">botÃ£o esquerdo</span>
                                            </td>
                                            <td>
                                                Pode-se arrastar componentes do passo anterior ao que estÃ¡ sendo resolvido utilizando o botÃ£o direito do mouse;
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span class="kbd">botÃ£o scroll</span>
                                            </td>
                                            <td>
                                                Caso seja necessÃ¡rio, pode-se rolar o scroll do mouse para vizualizar todo sistema;
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-group">
                        <div class="accordion-heading">
                            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">
                                ResoluÃ§Ã£o de equaÃ§Ãµes
                            </a>
                        </div>
                        <div id="collapseTwo" class="accordion-body collapse">
                            <div class="accordion-inner">
                                <table class="table table-striped" width="80%">
                                    <caption>
                                        <h4>Facilidades na resoluÃ§Ã£o de equaÃ§Ãµes</h4>
                                    </caption>
                                    <thead>
                                        <tr>
                                            <th>OperaÃ§Ã£o</th>
                                            <th>UtilizaÃ§Ã£o</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td width="30%">AdiÃ§Ã£o</td>
                                            <td width="70%">
                                                Para utilizar a operaÃ§Ã£o de adiÃ§Ã£o, o usuÃ¡rio deve utilizar a tecla <span class="kbd">+</span>, que representa o sinal de mais.
                                                <br><b>Exemplo:</b>
                                                <br><pre> 5+x <b>-></b> 5+x </pre>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>SubtraÃ§Ã£o</td>
                                            <td>
                                                Para utilizar a operaÃ§Ã£o de subtraÃ§Ã£o, o usuÃ¡rio deve utilizar a tecla <span class="kbd">-</span>, que representa o sinal de menos.
                                                <br><b>Exemplo:</b>
                                                <br><pre> x-6 <b>-></b> x-6 </pre>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>MultiplicaÃ§Ã£o</td>
                                            <td>
                                                Para utilizar a operaÃ§Ã£o de multiplicaÃ§Ã£o, o usuÃ¡rio deve utilizar a tecla <span class="kbd">*</span>, que representa o sinal de vezes.
                                                <br><b>Exemplo:</b>
                                                <br><pre> x*x <b>-></b> x*x </pre>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>DivisÃ£o ou FraÃ§Ã£o</td>
                                            <td>
                                                Para utilizar a operaÃ§Ã£o de divisÃ£o, o usuÃ¡rio deve utilizar a tecla <span class="kbd">/</span>, que representa o sinal de divisÃ£o.
                                                <br><b>Exemplos:</b>
                                                <br>Quando hÃ¡ apenas um termo no numerador e apenas um termo no denominador:
                                                <br><pre> 3/x+5 <b>-></b> <math><mfrac><mn>3</mn><mn>x</mn></mfrac><mo>+</mo><mn>5</mn></math> </pre>
                                                <br>Quando hÃ¡ mais de um termo no numerador e mais de um termo no denominador:
                                                <br><pre> (7+x)/(x*4) <b>-></b> <math><mfrac><mrow><mn>7</mn><mo>+</mo><mn>x</mn></mrow><mrow><mn>x</mn><mo>*</mo><mn>4</mn></mrow></mfrac></math> </pre> 
                                                <br>Quando hÃ¡ mais de um termo no numerador e apenas um termo no denominador:
                                                <br><pre> (x-9)/5 <b>-></b> <math><mfrac><mrow><mn>x</mn><mo>-</mo><mn>9</mn></mrow><mn>5</mn></mfrac></math> </pre>
                                                <br>Quando hÃ¡ apenas um termo no numerador e mais de um termo no denominador:
                                                <br><pre> x/(6*7) <b>-></b> <math><mfrac><mn>x</mn><mrow><mn>6</mn><mo>*</mo><mn>7</mn></mrow></mfrac></math> </pre>
                                            </td>
                                        </tr>                                    
                                        <tr>
                                            <td>Mais e Menos ( Â± )</td>
                                            <td>
                                                Para utilizar a operaÃ§Ã£o de mais e menos, o usuÃ¡rio deve utilizar as teclas <span class="kbd">+</span> + <span class="kbd">-</span>, que 
                                                representa o sinal de Â±.
                                                <br><b>Exemplo:</b>
                                                <br><pre> x=+-7 <b>-></b> <math><mn>x</mn><mo>=</mo><mo>Â±</mo><mn>x</mn></math> </pre>
                                            </td>
                                        </tr>
                                                                            <tr>
                                                                                <td>FraÃ§Ã£o</td>
                                                                                <td>
                                                                                    HÃ¡ duas maneiras de escrever uma fraÃ§Ã£o no sistema: <br><b>Com parÃªnteses: </b> o usuÃ¡rio deve colocar o numerador e o 
                                                                                    denominador entre parenteses, por exemplo: (3+4)/(5x). Quando o usuÃ¡rio optar por utilizar parenteses, ele ainda tem mais uma facilidade,
                                                                                    caso o numerador ou o denominador seja apenas um termo, nÃ£o Ã© necessÃ¡rio escreve-lo entre parenteses, por exemplo: (5+3)/2.
                                                                                    <br><b>Com espaÃ§os: </b> a fim de facilitar a escrita de fraÃ§Ãµes, o sistema permite que as fraÃ§Ãµes sejam escritas sem parenteses, porÃ©m para separar 
                                                                                    a fraÃ§Ã£o dos outros termos da equaÃ§Ã£o, o usuÃ¡rio deve utilizar um espaÃ§o em branco para destacar o inÃ­cio da fraÃ§Ã£o e outro para destacar o final
                                                                                    da fraÃ§Ã£o, por exemplo: (o sÃ­mbolo " " representa um espaÃ§o em branco) 5+" "3+x/4-5" "*x irÃ¡ resultar em 
                                                                                    <math>
                                                                                    <mn>5</mn>
                                                                                    <mo>+</mo>
                                                                                    <mfrac>
                                                                                    <mrow>
                                                                                    <mn>3</mn>
                                                                                    <mo>+</mo>
                                                                                    <mn>x</mn>
                                                                                    </mrow>
                                                                                    <mrow>
                                                                                    <mn>4</mn>
                                                                                    <mo>-</mo>
                                                                                    <mn>5</mn>
                                                                                    </mrow>
                                                                                    </mfrac>
                                                                                    <mo>*</mo>
                                                                                    <mn>x</mn>
                                                                                    </math>. 
                                                                                    Quando a fraÃ§Ã£o estiver no inÃ­nicio ou no fim da linha, nÃ£o Ã© necessÃ¡rio utilizar espaÃ§os.
                                                                                </td>
                                                                            </tr>
                                        <tr>
                                            <td>RaÃ­z Quadrada</td>
                                            <td>
                                                O usuÃ¡rio pode utilizar a operaÃ§Ã£o de raÃ­z quadrada de duas maneiras:
                                                <br><b>Exemplos:</b>
                                                <br>Quando hÃ¡ apenas um termo dentro da raÃ­z: 
                                                <br><span class="kbd">r</span> + valor.                                            
                                                <br><pre> r4+x <b>-></b> <math><msqrt><mn>4</mn></msqrt><mo>+</mo><mn>x</mn></math> </pre>                                       
                                                <br>Quando hÃ¡ mais de um termo dentro da raÃ­z: 
                                                <br><span class="kbd">r</span> + <span class="kbd">(</span> + equaÃ§Ã£o + <span class="kbd">)</span>
                                                <br><pre> r(5+x) <b>-></b> <math><msqrt><mrow><mn>5</mn><mo>+</mo><mn>x</mn></mrow></msqrt></math> </pre>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>PotÃªnciaÃ§Ã£o</td>
                                            <td>
                                                O usuÃ¡rio pode utilizar a operaÃ§Ã£o de potÃªncia de duas maneiras:
                                                <br>Utilizando as teclas: <span class="kbd">shift</span> + <span class="kbd">^</span> + <span class="kbd">2</span> ou pelo atalho <span class="kbd">altGr</span> + <span class="kbd">2</span>, 
                                                resultando no sÃ­mbolo "Â²".
                                                <br><b>Exemplo:</b>
                                                <br>Quando hÃ¡ apenas um termo para ser elevado ao quadrado:
                                                <br><pre> 3-x^2 <b>ou</b> 3-xÂ² <b>-></b> <math><msup><mn>x</mn><mn>2</mn></msup></math> </pre>
                                                <br>Quando hÃ¡ mais de um termo para ser elevado ao quadrado:
                                                <br><pre>(3-x)^2 <b>ou</b> (3-x)Â² <b>-></b> <math><msup><mrow><mo>(</mo><mn>3</mn><mo>-</mo><mn>x</mn><mo>)</mo></mrow><mn>2</mn></msup></math> </pre>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-group">
                        <div class="accordion-heading">
                            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseThree">
                                Barras de Progresso e sistema de PontuaÃ§Ã£o
                            </a>
                        </div>
                        <div id="collapseThree" class="accordion-body collapse in">
                            <div class="accordion-inner">                        
                                <table class="table table-striped" width="80%">                                
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>DescriÃ§Ã£o</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td width="30%">PontuaÃ§Ã£o</td>
                                            <td width="70%">
                                                Cada equaÃ§Ã£o tem uma determinada quantidade de pontos que Ã© baseada no nÃºmero de operaÃ§Ãµes necessÃ¡rias para resolver a equaÃ§Ã£o.
                                                Por exemplo, se uma equaÃ§Ã£o necessita de 6 operaÃ§Ãµes para ser resolvida, sua pontuaÃ§Ã£o Ã© de 60 pontos. O usuÃ¡rio sai com a pontuaÃ§Ã£o
                                                igual a 0 e vai ganhando pontos a cada passo correto. Caso o usuÃ¡rio cometa algum erro ou solicite uma dica, essa pontuaÃ§Ã£o Ã© decrementada. 
                                                <br><b>Dica: </b>quando o usuÃ¡rio solicita uma dica, sua pontuaÃ§Ã£o Ã© decrementada em 2 pontos, para cada dica. 
                                                <br><b>Erro: </b>quando o usuÃ¡rio comete algum erro na resoluÃ§Ã£o de um determinado passo, sua pontuaÃ§Ã£o Ã© decrementada em 5 pontos, para cada erro.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Barra de Progresso</td>
                                            <td>
                                                A barra de progresso ilustra o total de equaÃ§Ãµes jÃ¡ resolvidas, dentre as 10 equaÃ§Ãµes de cada conteÃºdo.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>                            
                            </div>
                        </div>
                    </div>
                    <div class="accordion-group">
                        <div class="accordion-heading">
                            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseFour">
                                Sistema de Dicas
                            </a>
                        </div>
                        <div id="collapseFour" class="accordion-body collapse in">
                            <div class="accordion-inner">
                                <table class="table table-striped" width="80%">                                
                                    <tbody>
                                        <tr>
                                            <td width="20%">
                                                <img id="imgInformation" src="img/dica.png" height="165" width="246">
                                            </td>
                                            <td width="80%">
                                                Ao solicitar uma dica (clicando no botÃ£o denominado "Dica"), o usuÃ¡rio irÃ¡ receber uma dica inteligente do sistema, referenta ao prÃ³ximo passo
                                                a ser dado para resolver a equaÃ§Ã£o. Para cada operaÃ§Ã£o existem vÃ¡rias dicas, porÃ©m, algumas vezes pode ocorrer do usuÃ¡rio 
                                            </td>
                                        </tr>                                    
                                    </tbody>
                                </table>
                                receber a mesma dica em momentos diferentes, pois referenciam a mesma operaÃ§Ã£o. Quando nÃ£o houver mais dicas disponÃ­veis para aquele passo em especÃ­fico, 
                                uma mensagem informando tal acontecimento Ã© enviada.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-group">
                        <div class="accordion-heading">
                            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseFive">
                                Agente PedagÃ³gico Animado
                            </a>
                        </div>
                        <div id="collapseFive" class="accordion-body collapse in">
                            <div class="accordion-inner">                        
                                <table class="table table-striped" width="80%">                                
                                    <tbody>
                                        <tr>
                                            <td width="20%">
                                                <img id="imgInformation" src="img/static.png" height="200" width="200">
                                            </td>
                                            <td width="80%">
                                                Para auxiliar e motivar o aluno na resoluÃ§Ã£o das equaÃ§Ãµes, o agente <b>Nick</b> exibe mensagens de ajuda e 
                                                faz algumas animaÃ§Ãµes.
                                            </td>
                                        </tr>                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-group">
                        <div class="accordion-heading">
                            <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseSix">
                                Mais informaÃ§Ãµes
                            </a>
                        </div>
                        <div id="collapseSix" class="accordion-body collapse in">
                            <div class="accordion-inner">                        
                                Para maiores informaÃ§Ãµes sobre o projeto PAT2Math, acesse o <a href="http://www.projeto.unisinos.br/pat2math"> site </a> do projeto. 
                                VocÃª tambÃ©m pode curtir nossa pÃ¡gina no <a  href="https://www.facebook.com/Pat2Math"> facebook </a> e assistir alguns vÃ­deos no nosso 
                                canal do <a  href="http://www.youtube.com/pat2math"> youTube </a>.
                                <br><center><img id="imgInformation" src="img/logo.png" alt="PAT2Math" title="Mais informaÃ§Ãµes" height="100" width="322"></center>
                                <br> Atenciosamente, Grupo PAT2Math!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true">Sair</button>
                <button class="btn btn-primary">Save changes</button>
            </div>
        </div>-->
    <div id="newPoints">+10</div>
     <div id="mask" onclick="test56()"></div>
	<div id="video-box"></div>
	<div class="modal" id="msg-box"></div>
		
</body>
</html>