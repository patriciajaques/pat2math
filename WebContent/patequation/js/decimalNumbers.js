//Ver como colocar o sistema de dízimas periódicas. 
//Por exemplo: 1/3 = 0,333333...
//O formato em String poderia ser algo como 0,3_ ou 0,3... 
var primeNumbers = [2, 3, 5, 7, 11, 13, 17, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

function decimalToFraction (decimal) {
	var d = decimal.split (",");
	var numDecimalPlaces = d[1].length;
	
	var numerator = d[0] + d[1];
	var denominator = 10 * numDecimalPlates;
	var fraction = numerator + "/" + denominator;
	
	return simplifyFraction (fraction);
}

function fractionToDecimal (fraction) {
	var f = fraction.split ("/");
	var numerator = parseInt (f[0]);
	var denominator = parseInt (f[1]);
	
	var decimal = numerator / denominator;
	
	return decimal;
}

function isSimilarFraction (fraction1, fraction2) {
	var decimal1 = fractionToDecimal (fraction1);
	var decimal2 = fractionToDecimal (draction2);
	
	return decimal === decimal2;
}

function simplifyFraction (fraction) {
	var f = fraction.split ("/");
	var numerator = parseInt (f[0]);
	var denominator = parseInt (f[1]);
	
	return simplifyFraction (numerator, denominator);
	
}

function simplifyFraction (numerator, denominator) {
	var currentNumber;

	for (var i = 0; i < primeNumbers.length; i++) {
		currentNumber = primeNumbers [i];
		
		if (numerator <= currentNumber && denominator <= currentNumber) {
			var isDivisible = numerator % currentNumber === 0;

			if (isDivisible) {
				isDivisible = denominator % currentNumber === 0;
				
				if (isDivisible) {
					numerator /= currentNumber;
					denominator /= currentNumber;
					
					return simplifyFraction (numerator, denominator);
				}
			}
		}
		
		else {
			var simplifiedFraction = numerator + "/" + denominator;
			
			return simplifiedFraction;
		}
	}
	
	//Se chegou até aqui é porque o numerador e o denominador são números grandes que não são divisíveis
	//por nenhum dos números primos entre 1 e 100
	currentNumber += 2;
	
	while (true) {
		if (numerator <= currentNumber && denominator <= currentNumber) {
			var isDivisible = numerator % currentNumber === 0;

			if (isDivisible) {
				isDivisible = denominator % currentNumber === 0;
				
				if (isDivisible) {
					numerator /= currentNumber;
					denominator /= currentNumber;
					
					return simplifyFraction (numerator, denominator);
				}
			}
			
			else
				currentNumber += 2;
		}
		
		else {
			var simplifiedFraction = numerator + "/" + denominator;
			
			return simplifiedFraction;
		}
	}
	
	
	

}