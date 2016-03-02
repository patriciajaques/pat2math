
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

function splitEquation(equation) {
	var result = new Array();
	var numTerms = 0;
	var currentTerm = "";
	
	for (var i = 0; i < equation.length; i++) {
		var currentChar = equation.charAt(i);
		
		if (isNumberOrIncognita(currentChar))
			currentTerm += currentChar;
		
		else if (currentChar === "<") {
			var startFraction = i;			
			var endFractionString = equation.indexOf("</span></span></span>");		
			var endFraction = endFractionString + 21;
			
			result[numTerms] = equation.substring(startFraction, endFraction); numTerms++;
			i = endFraction - 1;
		}
		
		else {
			result[numTerms] = currentTerm; numTerms++;
			result[numTerms] = currentChar; numTerms++;
			currentTerm = "";			
		}
	}
	
	result[numTerms] = currentTerm;
	
	return result;
}