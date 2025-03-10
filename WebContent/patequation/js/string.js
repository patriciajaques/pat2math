
//like the replaceAll function in Java
function replaceAll(string, character, newCharacter) {
    while (string.indexOf(character) !== -1) {
        string = string.replace(character, newCharacter);
    }
    return string;
}

//Verifica se há caracteres válidos para uma multiplicação implícita, e a(s) torna explícita(s).
function replaceAllMultiplications(expression) {
    //')(' é o único caso genérico em que se pode acrescentar '*' imediatamente.
    expression = replaceAll(expression, ')(', ')*(');

    //String com os operadores matemáticos
    var mathOperators = "+ - * / r = ± ( )";

    for (var i = 1; i < expression.length; i++) {
        //Salva o caracter anterior
        var prev = expression[i - 1];
        //Salva o caracter atual
        var current = expression[i];

        /* Verifica se o caracter atual É um parêntese aberto ou 
         * uma raiz e se o caracter anterior NÃO É um operador matemático */
        if ((current === '(' || current === 'r') && mathOperators.indexOf(prev) === -1) {
            expression = replaceAll(expression, prev + current, prev + '*' + current);
            //'i' é incrementado mais uma vez pois há um novo caracter na expressão
            i++;
        }
    }
    return expression;
}

//return the quantity of character that exist in the string
function getQuantity(string, character) {
    var quantity = 0;
    for (var i = 0; i < string.length; i++) {
        if (string[i] === character) {
            quantity++;
        }
    }
    return quantity;
}

//return the index of the last occurence oh character in the string or -1 if the character no exist in the string
function lastIndexOf(string, character) {
    var last = -1;
    for (var i = string.length - 1; i >= 0; i--) {
        if (string[i] === character) {
            last = i;
            break;
        }
    }
    return last;
}

//check if in the string have incomplete parentheses
function hasIncompleteParentheses(string) {
    var lastIndex = lastIndexOf(string, ")");
    var firstIndex = string.indexOf("(");
    if (lastIndex !== -1) {
        var count = 0;
        var index = -1;
        for (var i = lastIndex - 1; i >= 0; i--) {
            if (string[i] === ")") {
                count++;
            } else if (string[i] === "(") {
                if (count === 0) {
                    index = i;
                    //break;
                } else {
                    count--;
                }
            }
        }
        if (count !== 0 || index === -1) {
            return true;
        }
    } else if (firstIndex !== -1) {
        var count = 0;
        var index = -1;
        for (var i = firstIndex + 1; i < string.length; i++) {
            if (string[i] === ")") {
                count++;
            } else if (string[i] === "(") {
                if (count === 0) {
                    index = i;
                    //break;
                } else {
                    count--;
                }
            }
        }
        if (count !== 0 || index === -1) {
            return true;
        }
    }
    return false;
}

//check if the string is between balanced parentheses
function isBetweenParentheses(string) {
    if (string[0] === "(" && string[string.length - 1] === ")") {
        var count = 0;
        for (var i = string.length - 2; i >= 1; i--) {
            if (string[i] === ")") {
                count++;
            } else if (string[i] === "(") {
                if (count === 0) {
                    return false;
                } else {
                    count--;
                }
            }
        }
        return true;
    }
    return false;
}

function hasOpenFrac(list) {
    for (var i = list.length - 1; i >= 0; i--) {
        if (list[i] === "(") {
            return false;
        }

        if (list[i] === "</mfrac>") {
            return true;
        }
    }
    return false;
}

function splitEquation(equation) {
	var split = new Array();
    var cont = 0;
    for (var i = 0; i < equation.length; i++) {
        if (isNumber(equation[i]) || isIncognita(equation[i])) {
            split[cont] = (split[cont] === undefined ? "" : split[cont]) + "" + equation[i];
        } else if (isOperator(equation[i])) {
            cont++;
            split[cont] = equation[i];
            cont++;
        }
    }
    return split;
}

function splitEquationUI(equation) {
    var split = new Array();
    var cont = 0;
    
    var equationUI = checkFractions(equation);
    
    for (var i = 0; i < equationUI.length; i++) {
        if (isNumber(equationUI[i]) || isIncognita(equationUI[i]) || equationUI[i] === "(" || equationUI[i] === ")") {
        	if (split[cont] === undefined)
        		split[cont] = "";
        	
        	split[cont] += equationUI[i];
        } 
        
        else if (isOperator(equationUI[i])) {
        	if (i !== 0 && !isOperator(equationUI[i-1]))
        		cont++;
        	
            split[cont] = equationUI[i];                      
            cont++;
            	
        }
        
        else if (equationUI[i] === "<") {//Foi encontrada uma fração
        	var finalFraction = equationUI.indexOf("</fraction>", i) + 10; //+10 porque o termo "/fraction>" tem 10 caracteres
        	split[cont] = equationUI.substring(i, finalFraction+1);
        	
        	i = finalFraction - 1; //-1 porque o for vai incrementar o i na próxima iteração
        } 
    }
    
    return split;
}

function checkFractions(text) {
	var fof = verifyFractionOverFraction(text);
	
	if (text.indexOf(";") === -1 && fof !== null) {
		var numerator = fof[0];
		var denominator = fof[1];
		//Replace necessário para o método não tentar ajustar as frações do numerador
		numerator = replaceAll(numerator, "/", ";")
		
		var fraction = numerator + "/" + denominator;
		fraction = checkFractions(fraction);
		
		//Faz o ajuste de volta para o sinal de divisão
		fraction = replaceAll(fraction, ";", "/");
		
		return fraction;
	}
	
	else {
	var startDenominator = text.indexOf(")/(") + 3;

	if (startDenominator === 2) { // indexOf === -1, não encontrou frações
		return text;
	}
	
	else {
		var endDenominator = startDenominator;

		var openedParentheses = 1;
		var closedParentheses = 0;

		while (openedParentheses !== closedParentheses) {
			endDenominator++;
			var currentChar = text.charAt(endDenominator);

			if (currentChar === ')')
				closedParentheses++;

			else if (currentChar === '(')
				openedParentheses++;
		}

		var denominator = text.substring(startDenominator, endDenominator);

		var endNumerator = startDenominator - 3;
		var startNumerator = endNumerator;

		openedParentheses = 0;
		closedParentheses = 1;

		while (openedParentheses !== closedParentheses) {
			startNumerator--;
			var currentChar = text.charAt(startNumerator);

			if (currentChar === '(')
				openedParentheses++;

			else if (currentChar === ')')
				closedParentheses++;
		}

		var numerator = text.substring(startNumerator + 1, endNumerator);
		
		var fraction = "(" + numerator + ")/(" + denominator + ")";
		var fractionUI = "<fraction><denominator>" + denominator + "</denominator><numerator>" + numerator + "</numerator></fraction>";
		var newText = text.replace(fraction, fractionUI);
		
		return checkFractions(newText);
	}
	}
//	if (startDenominator !== 2) { // indexOf != -1
//		
//
//		var fraction = "<denominator>" + denominator
//				+ "</denominator><numerator>" + numerator + "</numerator>";
//
//		var fractionText = text.substring(startNumerator, endDenominator + 1);
//
//		var partialEquation = replaceAll(text, fractionText, fraction);
//
//		return textToUserInterface(partialEquation);
//	}
//	
//	else {
//		var beforeDenominator = '<span class="math-box"><span class="strut"></span><span class="vstack"><div class="denominator">';
//		var afterDenominatorAndBeforeNumerator = '</div><div class="numerator">';
//		var afterNumerator = '</div><div class="frac-line-aux"><span class="frac-line"></span></div><span class="baseline-fix"></span></span></span>';
//		
//		var equationUI = replaceAll(text, "<denominator>", beforeDenominator);
//		equationUI = replaceAll(equationUI, "</denominator><numerator>", afterDenominatorAndBeforeNumerator);
//		equationUI = replaceAll(equationUI, "</numerator>", afterNumerator);
//
//		return splitEquationUI(equationUI);
//	}
}

//Verifica se há fração sobre fração na expressão passada por parâmetro
//Exemplo: ((2)/(3))/(4)
function verifyFractionOverFraction(text) {
	if (text.charAt(0) !== '(') {
		return null;
	}
	
	else {
		var openedParentheses = 1;
		var i = 1;
		var currentChar = "";
		
		while (openedParentheses !== 0) {
			currentChar = text.charAt(i);

			if (currentChar === '(')
				openedParentheses++;

			else if (currentChar === ')')
				openedParentheses--;
			
			i++;
		}
		
		currentChar = text.charAt(i);
		
		if (currentChar === '/') {		
			var posClosedParentheses = text.indexOf(")", i);
			
			//Há fração sobre fração
			if (posClosedParentheses === (text.length - 1)) {
				var numerator = text.substring(0, i);
				var denominator = text.substring((i+1));
				var result = [numerator, denominator];
				
				return result;
			}	
		}
		
		//Se chegou até aqui é porque não há fração sobre fração
		return null;
	}
}

function isNumber(digit) {
    var numbers = "0 1 2 3 4 5 6 7 8 9";
    if (numbers.indexOf(digit) === -1) {
        return false;
    }
    return true;
}

function isNumberOrIncognita(digit) {
    var numbers = "0 1 2 3 4 5 6 7 8 9 x";
    if (numbers.indexOf(digit) === -1) {
        return false;
    }
    return true;
}

/**
 * @author Felipe de Morais
 * 
 * @description Check if the digit is a letter (upper or lower case)
 * 
 * @param {char} digit - a char that need to be checked.
 * 
 * @return {boolean} indicate if digit is or not a letter
 * */
function isCoefficient(digit) {
    var digit = digit.charCodeAt();
    if ((digit > 64 && digit < 91) || (digit > 96 && digit < 123)) {
        return true;
    }
    return false;
}

/**
 * @author Felipe de Morais
 * 
 * @description Check if the digit is a incognita
 * 
 * @param {char} digit - a char that need to be checked.
 *      
 * @return {boolean} indicate if digit is or not a incognita
 * */
function isIncognita(digit) {
    var incognitas = "x";
    if (incognitas.indexOf(digit) === -1) {
        return false;
    }
    return true;
}

function isOperator(digit) {
    var operators = "+ - *  × = ; ±";// ÷ /
    if (operators.indexOf(digit) === -1) {
        return false;
    }
    return true;
}

//function splitEquationUI(equation) {
//	var result = new Array();
//	var numTerms = 0;
//	var currentTerm = "";
//	
//	for (var i = 0; i < equation.length; i++) {
//		var currentChar = equation.charAt(i);
//		
//		if (isNumberOrIncognita(currentChar))
//			currentTerm += currentChar;
//		
//		else if (currentChar === "<") {
//			var startFraction = i;			
//			var endFractionString = equation.indexOf("</span></span></span>");		
//			var endFraction = endFractionString + 21;
//			
//			result[numTerms] = equation.substring(startFraction, endFraction); numTerms++;
//			i = endFraction - 1;
//		}
//		
//		else {
//			result[numTerms] = currentTerm; numTerms++;
//			result[numTerms] = currentChar; numTerms++;
//			currentTerm = "";			
//		}
//	}
//	
//	result[numTerms] = currentTerm;
//	
//	return result;
//}