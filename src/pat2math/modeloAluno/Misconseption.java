package pat2math.modeloAluno;

import java.util.ArrayList;
import java.util.List;


/**
 * Classe que guarda os tipos de <i>misconseptions</i> disponiveis, onde cada 
 * uma é representada por uma combinação de códigos. É utilizada como
 * objeto na memoria de trabalho do SE para repassar a misconseption detectada 
 * na condição da regra para que na ação seja encaminhada como retorno da função.
 * @author Henrique M. Seffrin
 * @since 06/07/2010
 *
 */
public class Misconseption {

	/**
	 * Define o tipo da <i>misconseption</i>:
	 * <p>
	 * <ol>
	 * <li>Primária</li>
	 * <li>Secundária</li>
	 * <li>Operação Inversa</li>
	 * <li>Fórmula de Bhaskara</li>
	 * </ol>
	 * </p>
	 */
	private String tipo;
	
	/**
	 * Define qual a misconseption
	 */
	private String misconseption;
	
	/**
	 * Um array de 2 posições, onde a posição 0 
	 * armazena os nodos que deveriam ser para a 
	 * equação estar correta, e a posição
	 * 1 armazena os nodos que estao errados
	 */
	//private ArrayList<BTNode>[] equacoes;
	/**
	 * Equação
	 */
	public static String Equacao = "Eq"; 
	
	/**
	 * Equação Primária
	 */
	public static String Primaria = "Prim";
	/**
	 * Equação Secundária
	 */
	public static String Secundaria = "Sec";
	/**
	 * Operação Inversa
	 */
	public static String OperacaoInversa = "OI";
	/**
	 * Fórmula de Bhaskara
	 */
	public static String Bhaskara = "BK";
	
	/**
	 * Adição
	 */
	public static String Adicao = "Ad";
	/**
	 * Subtração
	 */
	public static String Subtracao = "Sb";
	/**
	 * Multiplicação
	 */
	public static String Multiplicacao = "Mt";
	/**
	 * Divisão
	 */
	public static String Divisao = "Dv";
	
	/*
	 * TODO:Os dois proximos códigos abaixo são temporarios, sujeitos a midanças
	 */
	
	/**
	 * Potenciação
	 */
	public static String Potenciacao= "Pt";
	
	/**
	 * Radiciação
	 */
	public static String Radiciacao="Rd";
	
	
	/**
	 * Numerador
	 */
	public static String Numerador = "Numerador";
	/**
	 * Número
	 */
	public static String Numero = "Num";
	/**
	 * Incógnita
	 */
	public static String Incognita  = "Inc";
	/**
	 * Sinal
	 */
	public static String Sinal = "Sin";
	/**
	 * Simplificação
	 */
	public static String Simplificacao = "Simp";
	/**
	 * Operação
	 */
	public static String Operacao = "Op";
	/**
	 * Substituição da incógnita por um número qualquer
	 */
	public static String SubstituiInc = "SubInc";
	/**
	 * Fração
	 */
	public static String Fracao = "Frac";
	/**
	 * Mínimo Múltiplo Comum
	 */
	public static String MMC ="MMC";
	/**
	 * Linear
	 */
	public static String Linear = "Lin";
	/**
	 * Denominador 
	 */
	public static String Denominador = "Den";
	/**
	 * Inverso “regra da tesoura”
	 */
	public static String Inverso = "Inv";
	/**
	 * Propriedade Distributiva em relação à multiplicação
	 */
	public static String Distributiva = "Distrib";
	/**
	 * Termos
	 */
	public static String Termos = "Term";
	/**
	 * Fator Comum
	 */
	public static String FatorComum = "FC";
	/**
	 * Raiz
	 */
	public static String Raiz = "RZ";
	/**
	 * Fatoração
	 */
	public static String Fatoracao = "Fat";
	/**
	 * Extração
	 */
	public static String Extracao = "Extr";

	/**
	 * Número positivo
	 */
	public static String Positivo = "(+)";
	/**
	 * Número Negativo
	 */
	public static String Negativo = "(-)";
	/**
	 * Coeficientes
	 */
	public static String Coeficientes = "Coef";
	/**
	 * Número que acompanha x²
	 */
	public static String a = "a";
	/**
	 * Número que acompanha x
	 */
	public static String b = "b";
	/**
	 * Número qualquer
	 */
	public static String c = "c";
	/**
	 * Aplicação da Fórmula de Bhaskara
	 */
	public static String AplicaBhaskara = "AplicForm";
	/**
	 * Primeira solução da equação do 2º grau
	 */
	public static String xLinha = "x'";
	/**
	 * Segunda solução da equação do 2º grau
	 */
	public static String x2Linha = "x’’";
	/**
	 * Deletar / Esquecer
	 */
	public static String Deletar = "Del";
	/**
	 * Parêntesis
	 */
	public static String Parentesis = "Par";
	/**
	 * Não
	 */
	public static String nao = "~";
	/**
	 * Preferência
	 */
	public static String Preferencia = "Pref";

	
	/**
	 * Constutor da classe
	 * @param tipo o tipo de misconseption:
	 *  <p>
	 * <ol>
	 * <li>Primária</li>
	 * <li>Secundária</li>
	 * <li>Operação Inversa</li>
	 * <li>Fórmula de Bhaskara</li>
	 * </ol>
	 * </p>
	 * @param misconseption a descrição da misconseption, que 
	 * é uma cominação das constantes acima, cada posição do array deve
	 * conter uma das constantes
	 */
	public Misconseption (String tipo, String []misconseption){
		this.tipo=tipo;
		this.misconseption="";
		int i=0;
//		equacoes=new ArrayList[2];
//		equacoes[0]=new ArrayList<BTNode>();
//		equacoes[1]=new ArrayList<BTNode>();
		while (i<misconseption.length && misconseption[i]!=null){
			this.misconseption+=misconseption[i]+"_";
			i++;
		}
		this.misconseption=this.misconseption.substring(0,this.misconseption.length()-1);
	}
	
	public Misconseption() {
		this.tipo=null;
		this.misconseption=null;
	}

	/**
	 * Obtem a misconseption gerada pelo resolvedor
	 * @return uma {@link String} descrevendo a
	 * misconseption cometida.
	 */
	public String getMisconseption(){
		return tipo+"_"+misconseption;
	}
	
	@Override
	public String toString() {
		return getMisconseption();
	}
	
	/**
	 * Obtem uma {@link List} de {@link String} a partir de {@link List} de {@link Misconseption} 
	 * @param misc a {@link List} de {@link Misconseption}
	 * @return uma {@link List} de {@link String} com os codigos das misconseptions
	 */
	public static List<String> toListOfString(List<Misconseption> misc){
		List<String> lista=new ArrayList<String>();
		for (Misconseption m:misc)lista.add(m.getMisconseption());
		return lista;
	}
	
//	/**
//	 * Insere um nodo na lista de nodos que deveriam ser a resposta do aluno
//	 * @param node um nodo com um valor que deveria ser a resposta do aluno.
//	 */
//	public void setCorrect(BTNode node){
//		equacoes[0].add(node);
//	}
//	
//	/**
//	 * Insere um nodo na lista de nodos que são a resposta do aluno porém 
//	 * está incorreta, ou seja, o nodo que disparou a misconseption
//	 * @param node um nodo que contem um resposta equivocda do aluno
//	 */
//	public void setWrong(BTNode node){
//		equacoes[1].add(node);
//	}
}
