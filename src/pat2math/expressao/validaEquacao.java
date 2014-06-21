package pat2math.expressao;

import pat2math.expressao.arvore.InvalidEquationException;
import pat2math.expressao.arvore.InvalidValueException;
import pat2math.util.Funcoes;
/**
 * Calsse responsável por verificar se determinada equação
 * é uma equação algébrica válida.<br>
 * Para utilizar a clase cria-se um objeto, passando-se como
 * parâmetro a equação a ser verificada, e então chama-se
 * o método <code>getEquacao()</code>, se não houver Excessão a 
 * equação é retornada. 
 * @author Henrique M. Seffrin
 *
 */
public class validaEquacao {

	private String equacao;
	
	public validaEquacao(String eq){
		equacao=eq.replaceAll(" ", "");
	}
	
	/**
	 * Método responsável por verificar se <code>equacao</code> é uma 
	 * equação algébrica válida
	 * @return <code>true</code> se for uma equação válida 
	 * e <code>false</code> caso contrário
	 * @throws InvalidEquationException caso a equação não satisfaça as condições de uma equação
	 * algébrica 
	 */
	private boolean ehValida() throws InvalidEquationException{
		if (equacao.contains("a=") && equacao.contains("b=") && equacao.contains("c="))return true;
		if (equacao.equals(""))throw new InvalidEquationException("Equação Inválida","Equação vazia");
		if (equacao.length()<3)throw new InvalidEquationException("Equação Inválida","Poucos termos apresentados");
		if (equacao.replaceAll(" ", "").isEmpty())throw new InvalidEquationException("Equação Inválida","Equação vazia");;
		int i,cont;
		i=equacao.indexOf("=");
		if (i==-1)throw new InvalidEquationException("Equação Inválida","Não há símbolo de igualdade");
		String nExp=equacao.substring(i+1);
		String termo;
		i=cont=0;
		if (nExp.contains("=")){ 
			throw new InvalidEquationException("Equação Inválida","Presença de mais de um" +
				" símbolo de igualdade");
		}		
		else{
			//verifica se não ha dois sinais seguidos com exessão do -
			while(i<equacao.length()){
				cont=i;
				termo=String.valueOf(equacao.charAt(i));
				if (Funcoes.isOp(termo)){
					cont++;
					if (cont>=equacao.length())throw new InvalidEquationException("Equação Inválida","Ausência de termos após um operador");
					termo=String.valueOf(equacao.charAt(cont));
					if (Funcoes.isOp(termo)&&!termo.equals("-") && !termo.equals("+") && !termo.equals("±")){
						throw new InvalidEquationException("Equação Inválida","Presença de operadores seguidos");
					}
					//i=cont;
				}else if (Funcoes.isInc(termo) && i<equacao.length()-1){
					// verifica a existencia de um nao operador apos a incognita
					cont++;
					termo=String.valueOf(equacao.charAt(cont));
					if (cont<=equacao.length() && !Funcoes.isOp(termo) && !termo.equals(")"))throw new InvalidEquationException("Equação Inválida","Termo Inválido "
							+ termo + " após incógnita");
				}
				i++;
			}
			// verifica se a equacao possui incognitas validas
			return verificaIncongitas();
		}
	}
	
	/**
	 * Verifica se há pelomenos uma incógnita na equação,
	 * característica básica de uma equação algébrica
	 * @return <code>true</code> se tiver ao menos uma incógnita
	 * e <code>false</code> caso contrário 
	 * @throws InvalidEquationException 
	 */
	private boolean verificaIncongitas() throws InvalidEquationException{
		String termo;
		int numInc=0;
		for (int i=0;i<equacao.length();i++){
			termo=String.valueOf(equacao.charAt(i));
			if (!Funcoes.isInteger(termo) && 
				!Funcoes.isOp(termo) &&
				!Funcoes.isInc(termo) &&
				!termo.equals("(") &&
				!termo.equals(")")){
				throw new InvalidEquationException("Equação Inválida","Termo: \""+termo+"\" inválido");
			}
			if (Funcoes.isInc(termo))numInc++;
		}
		if (numInc==0)throw new InvalidEquationException("Equação Inválida","Inexistência de incógnitas");
		return true;
	}
	
	/**
	 * Obtém a equação encapsulada neste objeto
	 * @return uma <code>String</code> contendo a equação,
	 * se esta for uma equação algébrica
	 * @throws InvalidValueException caso não for uma equação algébrica
	 */
	public String getEquacao() throws InvalidValueException{
		if (ehValida())return equacao;
		else throw new InvalidValueException("Equação Inválida");
	}
}
