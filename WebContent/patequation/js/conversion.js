
"use strict";

//translates natural language to format text PAT2Math
//Colocar aqui a substituição do valor para a resposta do corretor do PAT2Math
function naturalToText(natural) { //equacao x+2(R5+2/(R3)²)²
	if (isWorkedExample) {
		loadingShowWE();	
		
		var cookieName = "regraWE" + currentPos;
		var regras = getCookie (cookieName);
		
		if (regras !== "" && selectedEquation.steps.length > 0) 
		    regras += " " + regraWE;
		
		else
			regras = regraWE;
		
		setCookieDays (cookieName, regras, 1);	
		
		return stepWE;
	}
	
	else {
    natural = replaceAll(natural, " ", "");
    natural = replaceAll(natural, "^2", "²");
    natural = replaceAll(natural, "ˆ2", "²");
    natural = replaceAll(natural, "x2", "x²");
    natural = replaceAll(natural, ")2", ")²");
    natural = replaceAll(natural, "×", "*");
    //natural = replaceAll(natural, ".", "*"); //Apesar de o ponto ser um símbolo de multiplicação, ele pode criar a ilusão de que números decimais são permitidos, aí fiquei meio em dúvida sobre esse comando
    natural = replaceAll(natural, "+-", "±");
    natural = replaceAll(natural, "÷", "/");
    natural = replaceAll(natural, ":", "/"); //Já que tem o símbolo complexo acima (÷), é interessante ter também esse mais fácil de escrever xD
    //natural = replaceAllMultiplications(natural);
    natural = natural.toLowerCase();

    var aux = "";
    var text = "";

    for (var i = 0; i < natural.length; i++) {
        switch (natural[i]) {
            //test if don't have pharenteses in numerator and denominator
            case '/':
                if (i > 0 && natural[i - 1] !== ')') {
                    //find the numerator
                    aux = "";
                    for (var j = i - 1; j >= 0; j--) {
                        if (isNumber(natural[j]) || isIncognita(natural[j])) {
                            aux = natural[j] + aux;
                        } else {
                            if (natural[j] === 'r') {
                                aux = '(' + aux + ')R2';
                            }
                            break;
                        }
                    }
                    text = text.substring(0, text.length - aux.length);
                    text = text + '(' + aux + ')';
                }
                text = text + '/';
                if (i < natural.length - 1 && natural[i + 1] !== '(') {
                    //find the numerator
                    aux = "";
                    var sqrtSignal = '';
                    if (natural[i + 1] === '+' || natural[i + 1] === '-') {
                        aux = natural[i + 1];
                        sqrtSignal = natural[i + 1];
                        i++;
                    }
                    var isSqrt = false;
                    if (natural[i + 1] === 'r') {
                        isSqrt = true;
                        i++;
                    }
                    for (var j = i + 1; j < natural.length; j++) {
                        if (isNumber(natural[j]) || isIncognita(natural[j])) {
                            aux = aux + natural[j];
                        } else {
                            break;
                        }
                    }

                    i += aux.length - sqrtSignal.length;
                    if (isSqrt) {
                        aux = aux.replace(sqrtSignal, '');
                        aux = sqrtSignal + '(' + aux + ')R2';
                    }
                    text = text + '(' + aux + ')';
                }
                break;
            case 'r':
                if (i < natural.length - 1 && natural[i + 1] !== '(') {
                    aux = "";
                    if (natural[i + 1] === '+' || natural[i + 1] === '-') {
                        aux = natural[i + 1];
                        i++;
                    }
                    for (var j = i + 1; j < natural.length; j++) {
                        if (isNumber(natural[j]) || isIncognita(natural[j])) {
                            aux = aux + natural[j];
                        } else {
                            break;
                        }
                    }
                    text = text + '(' + aux + ')R2';
                    i += aux.length;
                } else if (i < natural.length - 1 && natural[i + 1] === '(') {
                    var j, cont = 0;
                    for (j = i + 2; j < natural.length; j++) {
                        if (natural[j] === '(') {
                            cont++;
                        } else if (natural[j] === ')') {
                            if (cont === 0) {
                                break;
                            } else {
                                cont--;
                            }
                        }
                    }
                    aux = natural.substring(i + 1, j + 1);
                    i += aux.length;
                    text = text + naturalToText(aux) + 'R2';
                }
                break;
            default:
                text = text + natural[i];
        }
    }
    text = replaceAll(text, "²", "^2");
    return text;
}
}

function textToMathml(text) { //<msup>base exponent</msup>
    var stack = new Array();
    var aux = "";
    text = replaceAll(text, "<br>", "");
    var lastVarText = "";
    text = replaceAll(text, " ", "");
    while (text !== "") {
//        text = text.replace(/^\s+|\s+$/g, ""); // it's like the trim function (       4-3=x)

        if (isNumber(text[0])) {
            aux = aux + text[0];
            text = text.replace(text[0], "");
        } else if (isCoefficient(text[0])) {
//            if (aux !== "") {
//                stack.push("<mn>" + aux + "</mn>");
//                aux = "";
//            }
            if (text[0] === 'd') {
                if (aux !== "") {
                    stack.push("<mn>" + aux + "</mn>");
                    aux = "";
                }
                stack.push("<mn>Δ</mn>"); //Δ = &Delta;
            } else {
                stack.push("<mn>" + aux + text[0] + "</mn>");
                aux = "";
            }
            text = text.replace(text[0], "");
        }
        else if (isOperator(text[0])) {
            if (aux !== "") {
                stack.push("<mn>" + aux + "</mn>");
                aux = "";
            }
            stack.push("<mo>" + text[0] + "</mo>");
            text = text.replace(text[0], "");
        }
//        else if (isIncognita(text[0])) {
//            if (aux !== "") {
//                stack.push("<mn>" + aux + text[0] + "</mn>"); //<mi> //<mn>" + text[0] + "</mn>
//                aux = "";
//            } else {
//                stack.push("<mn>" + text[0] + "</mn>");//<mi>
//            }
//            text = text.replace(text[0], "");
//        }
        else if (text[0] === "(") {
            if (aux !== "") {
                stack.push("<mn>" + aux + "</mn>");
                aux = "";
            }
            stack.push("(");
            text = text.replace("(", "");
        }
        else if (text[0] === ")" && text.length >= 3 && text[1] === "R" && text[2] === "2") {
            if (aux !== "") {
                stack.push("<mn>" + aux + "</mn>");
                aux = "";
            }
            var root = "";
            var element = stack.pop();
            while (element !== "(") {
                root = element + root;
                element = stack.pop();
            }
            root = "<msqrt>" + root + "</msqrt>";
            stack.push(root);
            text = text.replace(")R2", "");
        }
        else if (text[0] === ")" && text.length >= 3 && text[1] === "/" && text[2] === "(") {
            if (aux !== "") {
                stack.push("<mn>" + aux + "</mn>");
                aux = "";
            }
            var numerator = "";
            var cont = 0;
            var element = stack.pop();
            while (element !== "(") {
                numerator = element + numerator;
                element = stack.pop();
                cont++;
            }
            if (numerator === "") {
                numerator = "<mn>1</mn>";
            }
            if (cont > 1 || numerator.indexOf("</mn><mn>") !== -1) { //</mn><mi>
                numerator = "<mrow>" + numerator + "</mrow>";
            }
            stack.push("<mfrac>" + numerator);
            stack.push("</mfrac>");
            text = text.replace(")/(", "");
        }
        else if (text[0] === "^" && text.length >= 2 && text[1] === "2") {
            if (aux !== "") {
                stack.push("<mn>" + aux + "</mn>");
                aux = "";
            }
            var square = "<msup>" + stack.pop() + "<mn>2</mn></msup>";
            stack.push(square);
            text = text.replace("^2", "");
        }
        else if (text[0] === ")" && text.length >= 3 && text[1] === "^" && text[2] === "2") {
            if (aux !== "") {
                stack.push("<mn>" + aux + "</mn>");
                aux = "";
            }
            var square = "";
            var cont = 0;
            var element = stack.pop();
            while (element !== "(") {
                square = element + square;
                element = stack.pop();
                cont++;
            }
            if (cont > 1 || square.indexOf("<mfrac>") !== -1 || square.indexOf("<mroot>") !== -1) {
                square = "<mrow>(" + square + ")</mrow>";
            }
            square = "<msup>" + square + "<mn>2</mn></msup>";
            stack.push(square);
            text = text.replace(")^2", "");
        }
        else if (text[0] === ")" && hasOpenFrac(stack)) {
            if (aux !== "") {
                stack.push("<mn>" + aux + "</mn>");
                aux = "";
            }
            var denominator = "";
            var cont = 0;
            var element = stack.pop();
            while (element !== "</mfrac>") {
                denominator = element + denominator;
                element = stack.pop();
                cont++;
            }
            if (denominator === "") {
                denominator = "<mn>1</mn>";
            }

            if (cont > 1 || denominator.indexOf("</mn><mn>") !== -1) { //</mn><mi>
                denominator = "<mrow>" + denominator + "</mrow>";
            }
            var numerator = stack.pop();
            if (numerator !== "<mfrac>" && denominator !== "</mfrac>") {
                stack.push(numerator + denominator + "</mfrac>");
            }
            text = text.replace(")", "");
        }
        else if (text[0] === ")") {
            if (aux !== "") {
                stack.push("<mn>" + aux + "</mn>");
                aux = "";
            }
            var list = "";
            var element = stack.pop();
            while (element !== "(") {
                list = element + list;
                element = stack.pop();
            }
            list = "(" + list + ")"; // parentheses with <mo> tag?
            stack.push(list);
            text = text.replace(")", "");
        }
        if (lastVarText !== text) {
            lastVarText = text;
        } else {
            break; // if a problem with a undentified character occur
        }

    }
    if (aux !== "") {
        stack.push("<mn>" + aux + "</mn>");
        aux = "";
    }
    return stack;
}

function mathmlToText(math) {
    var stack = new Array();
    var auxBefore = "";
//    var auxAfter = "";
    if (math.indexOf("<math>") !== 0) {
        auxBefore = math.substring(0, math.indexOf("<math>"));
        math = math.substring(math.indexOf("<math>"), math.length);
        //alert(auxBefore + " -<>- " + math);
    }
//    alert(math.substring(math.indexOf("</math>"), math.length+1));
//    if(math.indexOf("</math>") === math.length){
//        
//    }

    while (math !== "") {
        math = math.replace(/^\s+|\s+$/g, ""); // it's like the trim function
        if (math.indexOf("<mn>") === 0) {
            math = math.replace("<mn>", "");
            var max = math.indexOf("</mn>");
            var value = math.substring(0, max);
            math = math.replace(value + "</mn>", "");
            if (value === "Δ") {
                value = 'd';
            }
            stack.push(value);
        }
        else if (math.indexOf("<mi>") === 0) {
            math = math.replace("<mi>", "");
            var max = math.indexOf("</mi>");
            var value = math.substring(0, max);
            math = math.replace(value + "</mi>", "");
            stack.push(value);
        }
        else if (math.indexOf("<mo>") === 0) {
            math = math.replace("<mo>", "");
            var max = math.indexOf("</mo>");
            var value = math.substring(0, max);
            math = math.replace(value + "</mo>", "");
            stack.push(value);
        }
        else if (math.indexOf("<mrow>") === 0) {
            math = math.replace("<mrow>", "");
            stack.push("<mrow>");
        }
        else if (math.indexOf("<msqrt>") === 0) {
            math = math.replace("<msqrt>", "");
            stack.push("<msqrt>");
        }
        else if (math.indexOf("<mfrac>") === 0) {
            math = math.replace("<mfrac>", "");
            stack.push("<mfrac>");
        }
        else if (math.indexOf("<msup>") === 0) {
            math = math.replace("<msup>", "");
            stack.push("<msup>");
        }
        else if (math.indexOf("<math>") === 0) {
            math = math.replace("<math>", "");
            stack.push("<math>");
        }
        else if (math.indexOf("</mrow>") === 0) {
            math = math.replace("</mrow>", "");
            var element = stack.pop();
            var list = "";
            while (element !== "<mrow>") {
                list = element + list;
                element = stack.pop();
            }
            stack.push(list);
        }
        else if (math.indexOf("</msqrt>") === 0) {
            math = math.replace("</msqrt>", "");
            var element = stack.pop();
            var list = "";
            while (element !== "<msqrt>") {
                list = element + list;
                element = stack.pop();
            }
            list = "(" + list + ")R2";
            stack.push(list);
        }
        else if (math.indexOf("</msup>") === 0) {
            math = math.replace("</msup>", "");
            var exponent = stack.pop();//por padrão sempre 2
            var element = stack.pop();
            var list = "";
            while (element !== "<msup>") {
                list = element + list;
                element = stack.pop();
            }
            list = list + "^2";
            stack.push(list);
        }
        else if (math.indexOf("</mfrac>") === 0) {
            math = math.replace("</mfrac>", "");
            var denominator = stack.pop();
            var numerator = stack.pop();
            var list = "(" + numerator + ")/(" + denominator + ")";
            if (stack.pop() !== "<mfrac>") {
                alert("Wrong numbers of arguments!");
            }
            stack.push(list);
        }
        else if (math.indexOf("</math>") === 0) {
            math = math.replace("</math>", "");
            var element = stack.pop();
            var list = "";
            while (element !== "<math>") {
                list = element + list;
                element = stack.pop();
            }
            stack.push(list);
        }
        else if (math.indexOf("(") === 0) {
            math = math.replace("(", "");
            stack.push("(");
        }
        else if (math.indexOf(")") === 0) {
            math = math.replace(")", "");
            stack.push(")");
        }
    }
    var result = auxBefore + stack.pop();
    //alert("mathml to Text = " + result);
    return result;
}

function equationToMathml (id) {
	var idTask = "#task" + id;
	var eq = stringEquation[id];		
	var temp = textToMathml (eq);
	var equation = "<math>" + temp[0];
	
	for (var i = 1; i < temp.length; i++)
		equation += temp[i];
	
	equation += "</math>";
	
	if (eq.indexOf ("..") !== -1)
		equation += "..";
	
	$(idTask).html (equation);
}

function equationToMathml2 (equation) {		
	var temp = textToMathml (equation);
	var equationMathml = "<math>" + temp[0];
	
	for (var i = 1; i < temp.length; i++)
		equationMathml += temp[i];
	
	equationMathml += "</math>";
	
	if (equation.indexOf ("..") !== -1)
		equationMathml += "..";
	
	return equationMathml;
}