package pat2math.regras;

/**
 * Classe utilizada pelo Modelo do Aluno para informar qual
 * foi a operação escolhida pelo aluno para resolver o próximo
 * passo na resolução.
 *  
 * @author Henrique M. Seffrin
 *
 */
public class Operacao {

	private String operacao;
	
	public static final String SOMA="AD";
	public static final String SUBTRACAO="SB";
	public static final String DIVISAO="DV";
	public static final String MULTIPLICACAO="MT";
	public static final String MMC="MM";
	public static final String DISTRIBUTIVA="DM";
	public static final String FATOR_COMUM="FC";
	public static final String QUADRADO_SOMA="QS";
	public static final String QUADRADO_DIFERENCA="QD";
	public static final String PROD_SOM_DIF="PS";
	public static final String BHASKARA="BK";
	public static final String OPERACAO_INVERSA="OI";
	public static final String SIMPLIFICACAO="SP";
	public static final String RACIONALIZACAO="RC";
	public static final String FATORACAO="FT";
	public static final String RAIZ="RZ";
	public static final String POTENCIACAO="PT";
	public static final String REESCREVER_EQUACAO="RE";
	
	
	/*
	 * Operações experimentais que visam substituir OI
	 */
	public static final String PRINCIPIO_ADITIVO="PA";
	public static final String PRINCIPIO_MULTIPLICATIVO="PM";	
	
	/*
	 * Operações com frações 
	 */
	
	public static final String SOMA_SUBTRACAO_FRACAO = "AF";
	public static final String MULTIPLICACAO_FRACAO = "MF";
	public static final String DIVISAO_FRACAO="DF";
	
	/*
	 *  os codigos abaixo não são operações, apenas identificadores para as funções de proximoPass e mostrarPasso
	 */
	public static final String UNIR_TERMOS="UT";
	public static final String ERRO="ER";
	
	public static final String OPERACAO_GENERICA="OG";
	
	/*
	 * Operação interna, não sera reconhecido como operação válida
	 */
	public static final String DIVIDE_EQUACAO="DE";
	public static final String MAIS_MENOS="AS"; //adicao subracao

	
	/**
	 * Constroi um objeto do tipo <code>operacao</code>
	 * @param operacao
	 */
	public Operacao(String operacao){
		this.operacao=operacao;
	}

	/**
	 * Retorna o tipo de operação que este objeto guarda
	 * @return uma String com a operacao
	 */
	public String getOperacao() {
		return operacao;
	}

	/**
	 * Insere a operação selecionada pelo aluno
	 * @param operacao a operacao selecionada pelo aluno
	 */
	public void setOperacao(String operacao) {
		this.operacao = operacao;
	}
	
	public boolean equals(String s){
		return this.operacao.equals(s);
	}
	
	public boolean equals(Object o){
		if (o instanceof Operacao){
			Operacao outro=(Operacao)o;
			return this.operacao.equals(outro.getOperacao());
		}
		return false;
	}
	
	public static String getCodigo(String desc){
		return getWithNewCodes(desc);
	}
	
	
	public static String getCodes(String desc){
		if (desc.startsWith("#")){
			if (desc.equals("# Soma"))return SOMA;
			else if (desc.equals("# Subtracao"))return SUBTRACAO;
			else if (desc.equals("# Multiplicacao") || 
				 desc.equals("# Multiplicar fracoes") ||
				 desc.equals("# Multiplicacao da equacao por -1"))return MULTIPLICACAO;
			else if (desc.equals("# Propriedade Distributiva"))return DISTRIBUTIVA;
			else if (desc.equals("# Raiz quadrada")) return RAIZ;
			else if (desc.equals("# Raiz cubica")) return RAIZ;
			else if (desc.startsWith("# Operacao Inversa")) return OPERACAO_INVERSA;
			else if (desc.equals("# Aplicar formula de Bhaskara")) return BHASKARA;
			else if (desc.equals("# Calcular o delta"))return BHASKARA;
			else if (desc.equals("# Extrair raiz quadrada"))return RAIZ;
			else if ((desc.equals("# Fator Comum - Colocar termo em Evidencia") ||
				desc.equals("# Fator Comum - Calculando as raizes")))return FATOR_COMUM;
			else if (desc.equals("# Simplificar")) return SIMPLIFICACAO;
			else if ((desc.equals("# Calcular MMC") || desc.equals("# Resolver MMC"))) return MMC;
			else if (desc.equals("# Produto notavel - Quadrado da soma")) return QUADRADO_SOMA;
			else if (desc.equals("# Produto notavel - Quadrado da diferenca"))return QUADRADO_DIFERENCA;
			else if  (desc.equals("# Divisao de sinais")) return SIMPLIFICACAO;
			else if (desc.equals("# Fatoracao"))return FATORACAO;
			else if (desc.equals("# Raiz"))return RAIZ;
			else if (desc.equals("# Resolver potencia"))return POTENCIACAO;
			else if (desc.equals("# Unir termos semelhantes"))return UNIR_TERMOS;
			else if (desc.equals("# Divisao de Fracoes"))return DIVISAO_FRACAO;
			else if (desc.equals("# Racionalizar"))return RACIONALIZACAO;
			else if (desc.equals("# Dividir Equacao"))return DIVIDE_EQUACAO;
			else if (desc.equals("# Inserir ±"))return MAIS_MENOS;
			else if (desc.equals("# Nao existe divisao por zero") ||
						desc.equals("# Raiz negativa esta fora do dominio dos numeros reais") ||
						desc.equals("# Qualquer numero real eh solucao") ||
						desc.equals("# Nao existe solucao que valide a igualdade") ||
						desc.equals("# Solucao Impossivel")) return ERRO;
		}
		return desc;
	}
	
	public static String getWithNewCodes(String desc){
		if (desc.startsWith("#")){
			if (desc.startsWith("# Operacao Inversa")){
				if (desc.endsWith("Principio Multiplicativo")) return PRINCIPIO_MULTIPLICATIVO;
				else if (desc.endsWith("Principio Aditivo")) return PRINCIPIO_ADITIVO;
				else return desc;
			}else if (desc.equals("# Multiplicar fracoes")) return MULTIPLICACAO_FRACAO;
			else if (desc.equals("# Soma de Fracoes")) return SOMA_SUBTRACAO_FRACAO;
			else if (desc.equals("# Reescrever Equacao")) return REESCREVER_EQUACAO;
			else return getCodes(desc);
		}else return desc;
	}
		
	public String toString() {
		return operacao;
	}
}
