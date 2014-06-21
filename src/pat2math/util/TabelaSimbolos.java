package pat2math.util;

import java.util.ArrayList;

/**
 * Classe utilizada para armazenar valores e o respectivo simbolo
 * que o representa, por exemplo: 2x - A, 3 - B, ...
 * @author Henrique M. Seffrin
 * @version 1.0,14/01/2009
 *
 */
public class TabelaSimbolos {

	private ArrayList<String> simbolos;
	private ArrayList<String> originais;
	private char symb;
	
	public TabelaSimbolos(){
		simbolos=new ArrayList<String>();
		originais=new ArrayList<String>();
		symb='A';
	}
	
	/**
	 * Adiciona <code>val</code> na tabela de simbolos, o valor
	 * inserido automaticamente recebe o seu simbolo correspondente
	 * @param val o valor a ser inserido
	 * @return <code>true</code> se o valor foi inserido 
	 * e false caso contrário 
	 */
	public boolean add(String val){
		int pos=getPos(symb);
		if (pos>=0 && pos<=originais.size()){
			originais.add(pos, val);
			simbolos.add(pos, String.valueOf(symb));
			symb++;
			while (!isSymb(symb)){
				originais.add("?");//somente para ocupar o espaço
				simbolos.add("?");// e aumentar o size()
				symb++;
			}
			return true;
		}
		return false;
	}
	
	/**
	 * Dado <code>symbol</code> obtêm-se o valor que
	 * <code>symbol</code> representa
	 * @param symbol o simbolo que representa um valor da expressão
	 * @return o valor da expressão correspondente ao simbolo
	 */
	public String getOriginal(char symbol){
		int pos=getPos(symbol);
		if (simbolos.get(pos).equals(String.valueOf(symbol))){
			return originais.get(pos);
		}
		else return null;
	}
	
	/**
	 * Dado o simbolo <code>s</code> obtem a posição dele na tabela
	 * @param s o simbolo a cuja posição deve ser descoberta
	 * @return a posição desse simbolo na tabela ou -1 se não 
	 * for um simbolo valia
	 */
	public int getPos(char s){
		if (isSymb(s)){
			return s-65;
		}
		return -1;
	}
	
	/**
	 * Obtem o simbolo da ultima posição preenchida da tabela
	 * @return o simbolo desta posição
	 */
	public String getLastSymbol(){
		String last=simbolos.get(simbolos.size()-1);
		if (!isSymb(last.charAt(0)))last=simbolos.get(simbolos.size()-2);
		return last;
	}
	
	/**
	 * Verifica se o simbolo <code>dig</code> é valido, é considerado
	 * valido todos os simbolos da tabela ASCII a partir de 65, com 
	 * excessão dos simbolos: ^, _, R e do ASCII 127
	 * @param dig o caracter a se verificado
	 * @return <code>true</code> se ele for válido e
	 * <code>false</code> caso contrário.
	 */
	public boolean isSymb(char dig){
		if (dig>=65 && dig<=255){
			if (dig!='^' && dig!='_' && 
					dig!=127 && dig!='R')return true;
			return false;
		}
		return false;
	}
}
