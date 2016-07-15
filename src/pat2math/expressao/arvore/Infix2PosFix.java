package pat2math.expressao.arvore;

import java.util.EmptyStackException;
import java.util.Stack;

import pat2math.util.Funcoes;

/**
 * Classe responsável pela conversão de uma equação na notação
 * infixa para a notação posfixa
 * @author Henrique M. Seffrin
 * @version 1.0,12/01/2009
 *
 */
public class Infix2PosFix {
	
	private String infixa;
	private String posfixa;
	private Stack<String> pilha;
	private int[] precedencia={1,1,2,3,4,4,0};
	
	private static final int SOMA=0;
	private static final int SUBTRACAO=1;
	private static final int MULTIPLICACAO=2;
	private static final int DIVISAO=3;
	private static final int POTENCIA=4;
	private static final int RAIZ=5;
	private static final int IGUAL=6;
	
	public Infix2PosFix(){
		infixa=posfixa="";
		pilha=new Stack<String>();
	}
	
	/**
	 * Obtem a precedência de <code>operador</code>
	 * @param operador o operador cuja a precedencia deve ser
	 * verificada, os operadores válidos para esse metodo são:
	 * <li>+ - Soma</li>
	 * <li>- - Subtração</li>
	 * <li>* - Multiplicação</li>
	 * <li>/ - Divisão</li>
	 * <li>^ - Potencia</li>
	 * <li>R - Raiz</li>
	 * @return o valor da precedência dos operadores
	 */
	public int precedencia(String operador){
		if (operador.equals("+")) return precedencia[SOMA];
		else if (operador.equals("-")) return precedencia[SUBTRACAO];
		else if (operador.equals("±")) return precedencia[SUBTRACAO];
		else if (operador.equals("*")) return precedencia[MULTIPLICACAO];
		else if (operador.equals("/")) return precedencia[DIVISAO];
		else if (operador.equals("^")) return precedencia[POTENCIA];
		else if (operador.equals("R")) return precedencia[RAIZ];
		else if (operador.equals("=")) return precedencia[IGUAL];
		else return -1;
	}
	
	/**
	 * Seta uma expressão infixa no objeto a fim de que
	 * se possa converter para a forma posfixa
	 * @param infx uma String contendo a expressão na forma infixa
	 */
	public void setInfixa(String infx){
		reset();
		this.infixa=infx;
	}
	
	/**
	 * Obtem a expressão na forma infixa
	 * @return uma String contendo a expressão na forma infixa
	 */
	public String getInfixa(){
		return infixa;
	}
	
	/**
	 * Obtem a expressao na forma posfixa
	 * @return uma String contendo a expressção na forma posfixa
	 */
	public String getPosfixa(){
		return posfixa;
	}
	
	/**
	 * Prepara o objeto para uma proxima conversão
	 * limpando todos os campos do objto
	 */
	public void reset(){
		infixa=posfixa="";
		pilha.clear();
	}
	
	/**
	 * Verifica se <code>dig</code> é valido como simbolo
	 * utlizado na representação dos valores da expressão
	 * @param dig o caracter a ser verificado
	 * @return <code>true</code> se for válido e <code>false</code>
	 * caso contrário 
	 */
	public boolean isDigit(char dig){
		if (dig>=65 && dig<=255){ //De A maiusculo até o final da tabela, não engloba nenhum dos operadores normais
			if (dig!='^' && dig!='_' && dig!=127 && dig!='R'&& dig!='±')return true;
			return false;
		}
		return false;
	}
	
	/**
	 * Converte a expressão infixa em pósfixa
	 * @throws InvalidValueException caso a expressão tiver 
	 * algum simbolo inválido
	 */
	public void converter() throws InvalidValueException{
		String temp;
		try{
			for (int index=0;index<infixa.length();index++){
				//Transforma o primeiro elemento da String em char
				temp=String.valueOf(infixa.charAt(index));
				//Verifica se o elemento char é valido como simbolo
				//utlizado na representação dos valores da expressão
				// OU SEJA se for um operador estranho
				if (isDigit(temp.charAt(0))){
					posfixa+=temp; //Se sim posfixa recebe
				}else if (temp.equals("(")){
					pilha.push(temp); //Se for parenteses bota na pilha
				//Verifica se é uma operação válida, se o tipo é válido
				}else if (Funcoes.isOp(temp)){//peek é olhadinha... lol
					//Se tiver alguma coisa na pilha e se o primeiro elemento da pilha o num dele for maior ou igual
					// ao elemento que está na String temp então posfixa
					while((!pilha.isEmpty()) && (precedencia(pilha.peek())>=precedencia(temp))){ // Precedencia == num que recebe
						posfixa+=pilha.pop();                                         // cada operação
					}
					pilha.push(temp);
				}else if (temp.equals(")")){
					while(!pilha.peek().equals("(")){
						posfixa+=pilha.pop();
					}
					pilha.pop(); //retira o "(" da pilha
				}else if (temp.equals("?")){
					pilha.pop();
				}else throw new InvalidValueException("O valor digitado é inválido: "+"\""+temp+"\"");
			}
			while (!pilha.isEmpty()){
				posfixa+=pilha.pop();
			}
		}catch (EmptyStackException ese){
			throw new InvalidEquationException("Equação Inválida","Há um número desigual de parêntesis");
		}
		System.out.println("O que tem na posfixa: "+posfixa);
	}
}
