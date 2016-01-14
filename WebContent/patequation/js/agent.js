function verifyHint(dica, codigo) {
    
    //TODO: receber o parâmetro indicando qual a animação que será executada.
    //var codigo = "EO"; //classic stable :)
    
    //var codigo = "EI"; //ok ie-fox-chrome
    //var codigo = "TE"; //ok ie-fox-chrome
    //var codigo = "EQ"; //ok ie-fox-chrome
    //var codigo = "EO"; /*elementos + operador*/ //ok ie-fox-chrome
    //var codigo = "ER"; /*elmentos + resultado*/ //ok ie-fox-chrome
    //var codigo = "TF"; //ok ie-fox-chrome
    //var codigo = "LE"; //ok ie-fox-chrome
    //var codigo = "AO"; /*all operators */ //ok ie-fox-chrome
    //var codigo = "RA"; /*resultado aluno*/ //ok ie-fox-chrome
    //var codigo = "DC"; //ok ie-fox-chrome
    
    //dica = "Os termos <eq id=0>3</eq>  e <eq id=1>2</eq> estão ligados por uma operação de multiplicação. <eq id=2>.</eq>";

    //var local = $(selectedSheet).position();
    //var princ = $(book).position();
    //var linhas = $(lines).position();
    
    var listElementsSelEq = $(selectedSheet + " .canCopy li").toArray();
    
    //efetuando reset do agente, sem isso, ocorrerão erros diversos.
    //var posElementSel = getPosition(0);
    //divaLiteMoveTo(posElementSel.left, posElementSel.top-50);
    //
    //É necessário reposicionar, senão o balão poderá ficar de fora da tela.
    
    if (codigo.toUpperCase() !== undefined && codigo.toUpperCase() !== "EQ" && codigo.toUpperCase() !== "DC") 
        adjustPositionChar();    
    
    switch (codigo.toUpperCase())
    {
        //Animacao 1, que ira apontar para todos os termos da equação
        case "EI":
            {

            //aqui não será necessário fazer substituições
            divaLiteTipAction(dica);
                
            for (var i = 0; i < listElementsSelEq.length; i++) {

                var textSelectElement = listElementsSelEq[i].textContent;
                
                if (!verifyOperator(textSelectElement)) {
                    
                    var posElementSel = getPosition(i);
                    pointAgent(posElementSel.left, posElementSel.top);

                    /*
                     * 
                   pointAgent(
                           listaElementos[i].offsetLeft + local.left, 
                           listaElementos[i].offsetTop + local.top + linhas.top,
                           listaElementos[i].offsetWidth
                       );
                           */
                           
                           
                }
                
            }
            
            break;
            }

        //Animacao 2, que ira apontar para elementos especificados da equacao
        case "TE":
            {
            
            var listaElementos = getElementsEquation(dica);
            
            //mostrando a dica já traduzida
            divaLiteTipAction(dica);
            
            for (var i = 0; i < listaElementos.length; i++) {
                pointAgent(listaElementos[i].left, listaElementos[i].top);
            }
            
            break;
            }

        //Animacao 3, que ira apontar para a equacao, sem destaques.
        case "EQ":
            {

            var local = $(selectedSheet).position();
            var offsetLeft = $(selectedSheet + " .canCopy").offset().left + local.left;
            var offsetTop = $(selectedSheet + " .canCopy").offset().top;
            var scrollTop = $(document).scrollTop();
            
            var posXHint = offsetLeft;
            var posYHint = offsetTop - scrollTop - 40;

            divaLiteActionPointSideHint('middle', dica, posXHint, posYHint);

            break;
            }

        //Animacao 4, que aponta para certos elementos e no final para um operador.
        case "EO":
            {

            var listaElementos = getElementsEquation(dica);
            
            //mostrando a dica já traduzida
            divaLiteTipAction(dica);
            
            var operatorSel = null;
            
            for (var i = 0; i < listaElementos.length; i++) {
                
                if (verifyOperator(listaElementos[i].text)) {
                    operatorSel = listaElementos[i];
                } else {
                    pointAgent(listaElementos[i].left, listaElementos[i].top);
                }
                
            }
            
            //Apontando apenas para o operador no final
            if (operatorSel !== null) {
                pointAgent(operatorSel.left, operatorSel.top, 2);
            }
            
            break;
            }
            
        //Animacao 5, que aponta para elementos e no final para o resultado.
        case "ER":
            {
                
            var listaElementosSel = getElementsEquation(dica);
            
            //mostrando a dica já traduzida
            divaLiteTipAction(dica);
            
            for (var i = 0; i < listaElementosSel.length; i++) {
                pointAgent(listaElementosSel[i].left, listaElementosSel[i].top);
            }
            
            //procurando pelo resultado da operação    
            var bolParar = false;
            var operatorSel = null;
            
            for (var i = 0; i < listElementsSelEq.length; i++) {

                var textSelectElement = listElementsSelEq[i].textContent;
                
                //Não se deve pegar o '=' e sim o próximo elemento!
                if (bolParar === true) {
                    operatorSel = i;
                    break;
                } else {
                    
                    if (textSelectElement === '=')
                        bolParar = true;
                    
                }
                    
            }
            
            //Apontando para o resultado
            if (operatorSel !== null) {
                var posElementSel = getPosition(operatorSel);
                pointAgent(posElementSel.left, posElementSel.top);
            }
            
            break;
            }
        
        //Animacao 6, que aponta para todas as fracoes
        case "TF":
            {
            
            var listaElementos = getAllFractions();
            
            //mostrando a dica já traduzida
            divaLiteTipAction(dica);
            
            for (var i = 0; i < listaElementos.length; i++) {
                pointAgent(listaElementos[i].left, listaElementos[i].top);
            }
            
            break;
            }
            
        //Animacao 7, que irá apontar para os lados da equacao
        case "LE":
            {

            //Aqui não precisa de substituição
            divaLiteTipAction(dica);            
            
            var operatorSel = null;
            
            for (var i = 0; i < listElementsSelEq.length; i++) {

                var textSelectElement = listElementsSelEq[i].textContent;
                
                if (textSelectElement === '=') {
                    operatorSel = getPosition(i);
                    break;
                }
                    
            }
            
            if (operatorSel !== null) {
                
                divaLiteMoveTo(operatorSel.left - divaLiteWidth()/2 + 15, operatorSel.top - 50);
                
                divaLiteActionPointSide('left');
                divaLiteActionPointSide('right');
                
            }
            
            break;
            }
            
        //Animacao 8, que irá apontar para todos os operadores
        case "AO":
            {
            
            divaLiteTipAction(dica);
            
            for (var i = 0; i < listElementsSelEq.length; i++) {

                var operSelect = listElementsSelEq[i].textContent;
                
                if (operSelect !== '=' && verifyOperator(operSelect)) {
                    var posElementSel = getPosition(i);
                    pointAgent(posElementSel.left, posElementSel.top);
                }
                
            }            
            
            break;
            }
            
        //Animacao 9, que irá apontar para o resultado do aluno.
        case "RA":
            {

            var offsetLeft = $(selectedSheet + " .canMove li:nth-child(1)").offset().left;
            var offsetTop = $(selectedSheet + " .canMove li:nth-child(1)").offset().top;
            var scrollTop = $(document).scrollTop();
            
            var posXHint = offsetLeft - 40;
            var posYHint = offsetTop - scrollTop - 60;
            
            divaLiteActionPointSideHint('left', dica, posXHint, posYHint);
            
            break;
            }
            
        //Animacao 10, que irá manter posicao neutra do APA
        case "DC": {

            //a animacao "resposta" seria uma boa!
            divaLiteTipAnswer(dica);
            break;
            }
            
        default: {
            console.log("Operacao Desconhecida.\r" + codigo.toUpperCase() + 
                    "\r Método index.js -> pointAgent");
            break;
        }
        
    }

}

function getPosition(id) {
    var offsetLeft = $(selectedSheet + " .canCopy li:nth-child(" + (id + 1) + ")").offset().left;
    var offsetTop = $(selectedSheet + " .canCopy li:nth-child(" + (id + 1) + ")").offset().top;
    var scrollTop = $(document).scrollTop();
    var scrollBottom = $(window).scrollTop();

    return {left: offsetLeft, top: (offsetTop - scrollTop + scrollBottom)};    

    //return {left: offsetLeft, top: (offsetTop - scrollTop)};
}

function adjustPositionChar() {
    var posElementSel = getPosition(0);
    divaLiteMoveTo(posElementSel.left, posElementSel.top-50);
}

//Método que recebe a dica e devolve um vetor com as posições dos elementos.
function getElementsEquation(dica) {
    
    var parseDica = new String(dica);
    var saida = new Array();
    
    while (parseDica.indexOf("<eq id=") > -1) {
        
        var part = parseDica.substring(
                parseDica.indexOf("<eq id=") + 7,
                parseDica.indexOf(">")
                );
                    
        var dataElement = getPosition(parseInt(part));
        dataElement.text = getElementText(parseInt(part));
        
        saida[saida.push()] = dataElement;
        parseDica = parseDica.substring(parseDica.indexOf("</eq>") + 5);
        
    }
    
    return saida;
}

//Método que encapsula o apontar do agente. Caso o elemento desejado esteja
//muito distante do agente, o mesmo será movido.
function pointAgent(elementX, elementY) {
  
  var currentPos = divaGetCurrentPosition();
  //var largura = divaLiteWidth();
  //var alturaAgente = diva
  
  //existe um espaço ao redor do agente, então tive que adicionar isso aqui.
  var desvioLarg = 62;
  var desvioAlt = 50;
  
  //var algo = $(".speech-bubble");
  var alturaExtra = 0;
  
  //if (algo !== null)
      //alturaExtra = $(".speech-bubble").height();
  
  //alert(alturaExtra);
  
  desvioAlt = desvioAlt + alturaExtra;
  
  
  //existe um desvio
  var agentX = currentPos.left + desvioLarg;
  var agentY = currentPos.top;

  //Se a altura estiver muito distante, será necessário atualizar.
  agentY = elementY - desvioAlt;
  agentX = elementX - desvioLarg;
  
  /*
  if (elementX > agentX) {
      
      //Se estiver muito distante, então o agente será passado para direita do elemento.
      if (Math.abs(elementX - agentX ) > 10) 
          agentX = elementX + larguraElemento + 10;
      else
          agentX = elementX - 10 - largura;
//      else
          
  }

  else 
      if (elementX < agentX) {
          agentX = elementX + 10;
          //if (agentX - elementX > 10)
          //    agentX = elementX + largura + 10;
      }
  
  */
  
  divaLiteActionPointMove(45, agentX, agentY, true);
  
  //Nesse versão serão apenas três ângulos, não teremos tantas animações disponíveis.
  /*if (elementX < agentX) {
      divaLiteActionPointMove(45, dica);
  } else {
    
      if (elementX > agentX) {
          divaLiteActionPointMove(135, dica);
      }
      //simplesmente aponta para cima!
      else {
          divaLiteActionPointMove(90, dica);
      }
    
  }    */
  
  /*tentei fazer um esquema pelo ângulo, mas não deu muito certo.
  //Obtendo o ângulo
  var deltaX = elementX - agentX;
  var deltaY = elementY - agentY;

  var angleInDegrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
  
  if (angleInDegrees < 0){
      angleInDegrees = angleInDegrees + 360;
  }
  
  
  //Caso o agente esteja muito distante, ficará difícil de apontar.
  //Por isso, decidi mover o agente para perto.
  console.log("Ângulo calculado >>>" + angleInDegrees);
  
  if ((Math.abs(angleInDegrees) > 133)||(Math.abs(angleInDegrees) < 20)||(elementX - agentX > 40))
      divaLiteMoveTo(elementX, agentY);
  
  //Nesse versão serão apenas três ângulos, não teremos tantas animações disponíveis.
  if ( (elementX < agentX) && (angleInDegrees < 45) ) {
      divaLiteActionPointMove(45);
  } else {
    
      if ((elementX > agentX) && (angleInDegrees < 45)) {
          divaLiteActionPointMove(135);
      }
      //simplesmente aponta para cima!
      else {
          divaLiteActionPointMove(90);
      }
    
  }
  
  */
  

}

function getElementText(id) {
    return $(selectedSheet + " .canCopy li:nth-child(" + (id + 1) + ")").text();
}
