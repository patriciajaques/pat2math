/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * @author Felipe de Morais
 * 
 * @description Return the left and top position of the element indicated by de id
 * 
 * @param {int} id - a element of the last valid pass in the equation resolution
 * @param {int} literalPosition - I don't know.
 * 
 * @return {left, top} object.left indicate the left position of the element on the screen;
 *                    object.top indicate the top position of the element on the screen;
 * */

function getPosition(id, literalPosition) {


    //Nesse trecho será feita uma conversão entre o ID que está sendo 
    //recebido pelo ID real do elemento da equação.

    if (literalPosition === undefined || literalPosition === false) {

        id = convertIdPosition(id);

        /*var listElementsSelEq = $(selectedSheet + " .canCopy li").toArray();
         var intIdReal = -1;
         
         for (var i = 0; i < listElementsSelEq.length; i++) {
         
         var textSelectElement = listElementsSelEq[i].textContent;
         
         if (!isOperator(textSelectElement) ) {
         intIdReal++;
         
         if (intIdReal === id) {
         id = i;
         break;
         }
         
         }
         
         }*/

    }


    var offsetLeft = $(selectedSheet + " .canCopy li:nth-child(" + (id + 1) + ")").offset().left;
    var offsetTop = $(selectedSheet + " .canCopy li:nth-child(" + (id + 1) + ")").offset().top;
    var scrollTop = $(document).scrollTop();

    return {left: offsetLeft, top: (offsetTop - scrollTop)};
}

function convertIdPosition(id) {

    var listElementsSelEq = $(selectedSheet + " .canCopy li").toArray();
    var intIdReal = -1;

    for (var i = 0; i < listElementsSelEq.length; i++) {

        var textSelectElement = listElementsSelEq[i].textContent;

        if (!isOperator(textSelectElement)) {
            intIdReal++;

            if (intIdReal === id) {
                return i;
            }
        }
    }
}

function getElementText(id) {
    return $(selectedSheet + " .canCopy li:nth-child(" + (id + 1) + ")").text();
}

function getAllFractions() {

    var saida = new Array();

    var listElementsSelEq = $(selectedSheet + " .canCopy li").toArray();

    for (var i = 0; i < listElementsSelEq.length; i++) {

        if (listElementsSelEq[i].innerHTML.indexOf("<mfrac>") > -1)
            saida[saida.push()] = getPosition(i, true);

    }

    return saida;

}

function verifyOperator(element) {
    if ((element === "+") || (element === "-") || (element === "/") || (element === "*") || (element === "="))
        return true;
    else
        return false;
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

        dataElement.text = getElementText(convertIdPosition(parseInt(part)));
        dataElement.id = parseInt(part);

        saida[saida.push()] = dataElement;
        parseDica = parseDica.substring(parseDica.indexOf("</eq>") + 5);

    }

    return saida;
}

//Método que encapsula o apontar do agente. Caso o elemento desejado esteja
//muito distante do agente, o mesmo será movido.
function pointAgent(elementX, elementY) {

    //existe um espaço ao redor do agente, então tive que adicionar isso aqui.
    var desvioLarg = 62;
    var desvioAlt = 60;

    var agentY = elementY - desvioAlt;
    var agentX = elementX - desvioLarg;

    divaLiteActionPointMove(45, agentX, agentY);

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

function adjustPositionChar() {
    var posElementSel = getPosition(0, true);
    divaLiteMoveTo(posElementSel.left, posElementSel.top - 50);
}

function verifyHint(dica, codigo) {

    //Caso não exista uma dica definida, será ajustado para a animação "DC",
    //ou seja, o agnet irá apenas falar a dica.
    if (codigo === undefined || codigo === "NO")
        codigo = "DC";

    //var codigo = "EI"; //ok
    //var codigo = "TE"; //ok
    //var codigo = "EQ"; //ok
    //var codigo = "EO"; /*elementos + operador*/ // ok
    //var codigo = "ER"; /*elementos + resultado*/ //ok
    //var codigo = "TF"; //ok
    //var codigo = "LE"; //ok
    //var codigo = "AO"; /*all operators */ //ok
    //var codigo = "RA"; /*resultado aluno*/ //ok
    //var codigo = "DC"; //ok

    //dica = "Os termos <eq id=0>3</eq>  e <eq id=1>2</eq> estão ligados por uma operação de multiplicação. <eq id=2>.</eq>";
    //dica = "Os termos <eq id=0>3</eq>  e <eq id=1>2</eq> estão ligados por uma operação de multiplicação.";

    var listElementsSelEq = $(selectedSheet + " .canCopy li").toArray();

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

                var posElementSel;

                for (var i = 0; i < listElementsSelEq.length; i++) {

                    var textSelectElement = listElementsSelEq[i].textContent;

                    if (!verifyOperator(textSelectElement)) {

                        posElementSel = getPosition(i, true);
                        pointAgent(posElementSel.left, posElementSel.top);

                    }

                }

                posElementSel = getPosition(listElementsSelEq.length - 1, true);

                //retirando de cima da equação
                divaLiteActionPointMove(0, posElementSel.left, posElementSel.top + 20);

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

                //retirando de cima da equação
                divaLiteActionPointMove(0, listaElementos[listaElementos.length - 1].left, listaElementos[listaElementos.length - 1].top + 20);

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
                var posYHint = offsetTop - scrollTop - 20;

                divaLiteActionPointSideHint('middle', dica, posXHint, posYHint);

                //efetuando 'reset' da posição
                //divaLiteActionPointSideHint('idle', '', 20, 100);

                break;
            }

            //Animacao 4, que aponta para certos elementos e no final para um operador.
        case "EO":
            {

                var listaElementos = getElementsEquation(dica);

                //mostrando a dica já interpretada
                divaLiteTipAction(dica);

                var operatorSel = null;

                for (var i = 0; i < listaElementos.length; i++) {

                    if (verifyOperator(listaElementos[i].text)) {
                        operatorSel = listaElementos[i];
                    } else {
                        pointAgent(listaElementos[i].left, listaElementos[i].top);
                    }

                }

                //buscando o operador que está antes. Estou fazendo isso, pois
                //no fim o patSolver não terá como devolver o operador.
                if (operatorSel === undefined || operatorSel === null) {
                    var idReal = convertIdPosition(listaElementos[listaElementos.length - 1].id);
                    operatorSel = getPosition(idReal - 1, true);
                }

                //Apontando apenas para o operador no final
                if (operatorSel !== null) {
                    pointAgent(operatorSel.left, operatorSel.top, 2);

                    //retirando de cima da equação
                    divaLiteActionPointMove(0, operatorSel.left, operatorSel.top + 20);

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
                    var posElementSel = getPosition(operatorSel, true);
                    pointAgent(posElementSel.left, posElementSel.top);

                    //retirando de cima da equação
                    divaLiteActionPointMove(0, posElementSel.left, posElementSel.top + 20);

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

                //retirando de cima da equação
                divaLiteActionPointMove(0, listaElementos[listaElementos.length - 1].left, listaElementos[listaElementos.length - 1].top + 20);

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
                        operatorSel = getPosition(i, true);
                        break;
                    }

                }

                if (operatorSel !== null) {

                    var intLeftSideEq = operatorSel.left - divaLiteWidth() / 2 + 15;
                    var intTopSideEq = operatorSel.top - 50;

                    divaLiteMoveTo(intLeftSideEq, intTopSideEq);

                    divaLiteActionPointSide('left');
                    divaLiteActionPointSide('right');

                    //retirando de cima da equação
                    divaLiteActionPointMove(0, intLeftSideEq, intTopSideEq + 50);


                }

                break;
            }

            //Animacao 8, que irá apontar para todos os operadores
        case "AO":
            {

                divaLiteTipAction(dica);
                var posElementSel = undefined;

                for (var i = 0; i < listElementsSelEq.length; i++) {

                    var operSelect = listElementsSelEq[i].textContent;

                    if (operSelect !== '=' && verifyOperator(operSelect)) {
                        posElementSel = getPosition(i, true);
                        pointAgent(posElementSel.left, posElementSel.top);
                    }

                }

                //retirando de cima da equação
                if (posElementSel !== undefined)
                    divaLiteActionPointMove(0, posElementSel.left, posElementSel.top + 20);


                break;
            }

            //Animacao 9, que irá apontar para o resultado do aluno.
        case "RA":
            {

                var offsetLeft = $(selectedSheet + " .canMove li:nth-child(1)").offset().left;
                var offsetTop = $(selectedSheet + " .canMove li:nth-child(1)").offset().top;
                var scrollTop = $(document).scrollTop();

                var posXHint = offsetLeft - 40;
                var posYHint = offsetTop - scrollTop - 50;

                divaLiteActionPointSideHint('left', dica, posXHint, posYHint);

                //retirando de cima da equação
                divaLiteActionPointMove(0, posXHint, posYHint + 20);

                break;
            }

            //Animacao 10, que irá manter posicao neutra do APA
        case "DC":
            {

                divaLiteTipAnswer(dica);
                break;
            }

        default:
            {
                console.log("Operacao Desconhecida.\r" + codigo.toUpperCase() +
                        "\r Método index.js -> pointAgent");
                break;
            }

    }

}
