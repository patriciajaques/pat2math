package pat2math.resolvedor.view;



public class ExpressionHandler {
	//private ResultInterface r;
	//private int i = 0;

	public ExpressionHandler() {
	}


/*	public String handleParenthesis(String exp) {
		boolean hasSquare = false, hasPotencia = false;
		String newExp = "", str = "", potencia = "";
		do {
			char c = exp.charAt(i);
			if (c == '(') {
				++i;
				str += handleParenthesis(exp);
			} else if (c == ')') {
				if (hasSquare == true) {
					newExp = "<IMG SRC=\"http://www.geocities.com/matematicacomprazer/figuras/radical.gif\">";
					if (isNecessaryParenthesis(str))
						newExp += "(" + str + ")";
					else newExp+= str;
				} else if (hasPotencia)
					newExp = str + "<sup>" + potencia + "</sup>";
				else if (isNecessaryParenthesis(str))
					newExp = "(" + str + ")";
				else
					newExp = str;
				hasSquare = false;
				hasPotencia = false;
				return newExp;
			} else if (c == 'R') {
				hasSquare = true;
				i++;
			}
			else if (c == '^')
				hasPotencia = true;
			else if (hasPotencia)
				potencia += c;
			else
				str += c;
			i++;
		} while (i<exp.length());
		newExp = str;
		return newExp;
	}*/

	//private boolean isNecessaryParenthesis(String str) {
	//	boolean hasOp = false;

		/*
		 * for (int i = 0; i < str.length(); i++) { char c = str.charAt(i); if
		 * (c == '(') hasPar = true; else if (c == ')') { hasPar = false; hasOp
		 * = true; } else if (hasPar != true) hasOp = true; }
		 */
	//	if (str.contains("-") || str.contains("+") || str.contains("*")
	//			|| str.contains("/"))
	//		hasOp = true;
	//	return hasOp;
	}
/*
	public String handleParenthesisMain(String exp) {
		String newExp = handleParenthesis(exp);
		return "<html>"+newExp+"</html>";
	}*/

	/*
	public static void main(String[] args) {
		JFrame f = new JFrame("Resolvedor de Problemas");
		String str = "x=((2-(((-2^2)-((4*1)*0))R2))/(2*1))";
		ExpressionHandler h = new ExpressionHandler();
		String str2 = h.handleParenthesisMain(str);
		JLabel label = new JLabel(str2);
		f.getContentPane().add(label);
		f.setSize(100, 200);
		f.setVisible(true);
		f.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				System.exit(0);
			}
		});

	}*/

//}
