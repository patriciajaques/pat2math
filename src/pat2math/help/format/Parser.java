package pat2math.help.format;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

import pat2math.expressao.Expression;
import pat2math.expressao.arvore.BTNode;
import pat2math.regras.Operacao;
import pat2math.util.Conjuntos;
import pat2math.util.Funcoes;

/**
 * Classe responsavel prela tradcao dos templates das dicas, subtituindo as tags por equacoes,
 * ou parte delas.
 * @author Henrique M. Seffrin
 *
 */
public class Parser {

	private String texto;
	private List<BTNode>termos;
	private Expression equacao;
	private Expression equacaoAl;
	private String op;
	
	public Parser (String frase){
		this.texto=frase;
	}
	
	public Parser(){
		texto="";
	}
	
	
	
	public Expression getEquacao() {
		return equacao;
	}

	public void setEquacao(Expression equacao) {
		this.equacao = equacao;
	}

	public Expression getEquacaoAl() {
		return equacaoAl;
	}

	public void setEquacaoAl(Expression equacaoAl) {
		this.equacaoAl = equacaoAl;
	}

	/**
	 * Obtem o texto traduzido, se o metodo
	 * parse for invocado
	 * @return o texto traduzido, se parse() for invocado, ou
	 * o texto com as tags caso contrario
	 */
	public String getTexto() {
		return texto;
	}

	/**
	 * Insere o texto a ser traduzido
	 * @param texto um {@link String} contendo o 
	 * texot a ser traduzido
	 */
	public void setTexto(String texto) {
		this.texto = texto;
	}
	
	public void setOperacao(String op){
		this.op=op;
	}
	
	public void setTermos(List<BTNode> termos) {
		this.termos = termos;
	}

	/**
	 * Realiza a traducao do texto com tags, para um texto contendo 
	 * as equacaoes a serem exibidas, ou parte delas.
	 */
	public void parse(){
		String inicioFrase="",finalFrase=texto;
		String tagAtual;
		String eq="";
		List<String>tags=new ArrayList<String>();
		Hashtable<String, String> tagEquation=new Hashtable<String, String>();
		int iChevron, fChevron;
		while (finalFrase.contains("<") && finalFrase.contains(">")){
			iChevron=finalFrase.indexOf("<");
			fChevron=finalFrase.indexOf(">");
			inicioFrase+= finalFrase.substring(0, iChevron);
			// o +1 é pq o substring é inclusive-exclusive
			tagAtual=finalFrase.substring(iChevron+1,fChevron);
			if (!tags.contains(tagAtual)){
				eq=parseTag(tagAtual);
				// bloqueia apenas as tag do bacno de dados e não
				//aquelas que indicam os termos a serem apontados
				if (eq.contains("eq") && !eq.contains("/eq") && !eq.contains("?eq"))eq="";
				else{
					tags.add(tagAtual);
					tagEquation.put(tagAtual, eq);
				}
			}else {
				eq=tagEquation.get(tagAtual);
			}
			finalFrase=finalFrase.substring(fChevron+1);
			inicioFrase+=eq;
			
		}
		if (!finalFrase.isEmpty()) inicioFrase+=finalFrase;
		inicioFrase=inicioFrase.replace("&", "<");
		inicioFrase=inicioFrase.replace("$", ">");
		if (!inicioFrase.isEmpty())texto=inicioFrase;
		parseNewLine();
	}
	
	/**
	 * Responsavel pela interpretacao de cada tag valida
	 *  <br>Formato de uma tag <eqX TERMOY> onde: <br>
	 * <ul>
	 * <li>X é o número da equação 1 a 3</li>
	 * <li>TERMO é o termo da equacao X a ser exibido</li>
	 * <li>Y é o iésimo termo daquele tipo</li>
	 * </ul>
	 * @param tag a taga as ser interpretada
	 * @return o significado da tag, ou a propria tag se esta for invalida
	 */
	public String parseTag(String tag){
		 String tagEq, termo;
		 String tags[];
		 String exp="";
		 Expression equacao;
		 List<BTNode> termos=new ArrayList<BTNode>(3);
		 List<BTNode> bkTermos= new ArrayList<BTNode>();
		 boolean tEsq, tDir;
		 tEsq=tDir=false;
		 int idTermo=0;
		 BTNode aux;
		 tags=tag.split(" ");
		 tagEq=tags[0];
		 if (tags.length>1)termo=tags[1];
		 else termo="";
		 tag="&"+tag+"$";
		 if (tagEq.equals("OP") && !op.isEmpty())return Operacao.getCodigo(op);
		 if (tagEq.startsWith("eq")){
			 // somente a tag <eq>
			 if (tagEq.equals("eq") && tags.length==1) return this.equacao.getCleanExpression();
			 String iC;
			 iC=tagEq.substring(2);
			 if (this.termos!=null && this.termos.isEmpty())return tag;
			 if (this.termos==null)return tag;
			 
			 
			 if (!termo.isEmpty()){
				
				int iCont=termo.length()-1;
				while(Funcoes.isInteger(termo.charAt(iCont)))iCont--;
			 	iCont++;//compensar o ultimo decrescimo, pois ICont deve estar na ultima casa inteira de termo
			 	iC=termo.substring(iCont);
			 	if (iC.isEmpty())idTermo=1;
			 	else idTermo=Integer.parseInt(iC);
			 	termo=termo.substring(0,iCont);
			 }
			 if (this.termos!=null){
				// if (idTermo-1>=this.termos.size() || idTermo<0)return tag;
				 if(termos.size()>1){
					 List<BTNode> newTermos=new ArrayList<BTNode>();
					 BTNode newT;
					 int nt=0;
					 while (nt<termos.size()){
						 newT=new BTNode ("!",(BTNode)termos.get(nt).clone(),(BTNode)termos.get(nt+1).clone());
						 newTermos.add(newT);
						 nt+=2;
					 }
					 if (!newTermos.isEmpty())termos=newTermos;
				 }
				 equacao=new Expression((BTNode)this.termos.get(0),false);
				 //idTermo=1;
			 }else return tag;
			 
			 
			 /*
			  * tratar taga que contem o "t" de termo, indicando se deve ou nao exibir os termos da operacao,
			  * apenas para as 4 operacoes. Por Exemplo: equacao (x+1)*(x+2)=1
			  * <... t*>  =  x+1
			  * <... *t>  =  x+2
			  * <... t*t> =  (x+1)*(x+2)
			  */
			 if (termo.startsWith("t")){
				 tEsq=true;
				 termo=termo.substring(1);
			 }
			 if (termo.endsWith("t")){
				 tDir =true;
				 termo=termo.substring(0,termo.length()-1);
			 }
			 
			 if (termo.equals("a")){
				 //tag a = inteiros com incognitas ao quadrado, como é usado em bhaskara
				 // não aceita indice, logo a é o valor que acompanha a incognita ao quadrado
				 bkTermos=Expression.buscaXall("^", equacao.getRoot());
				 //termos=Expression.buscaXall("^", equacao.getRoot());
				 //termos.add(Funcoes.find(this.termos, new BTNode ("^"), new BTNodeComparator()));
				 //filtrar o q n são x²
				 if (bkTermos.isEmpty())return tag;
				 for (int i=bkTermos.size();i<=0;i--){
					 aux=bkTermos.get(i);
					 if (!aux.getDir().getValue().equals("2") ||
							 !Funcoes.getInc(aux.getEsq().getValue()).isEmpty())bkTermos.remove(i);
				 }
			 }else if (termo.equals("b")){
				  //tag b = inteiros com incognitas
				 bkTermos=Expression.getFolhas(equacao.getRoot());
				 bkTermos=Conjuntos.getIncognitas(bkTermos, false);
			 }else if (termo.equals("c")){
				 //tag c = inteiros
				 bkTermos=Expression.getFolhas(equacao.getRoot());
				 bkTermos=Conjuntos.getIntegers(bkTermos, false);
			 }else if (termo.equals("+")){
				 //tag + = soma
				 termos=Expression.buscaXall("+", equacao.getRoot());
				 termos=getOperators(termos,tEsq,tDir);
			 }else if (termo.equals("-")){
				 //tag - = subtracao
				 termos=Expression.buscaXall("-", equacao.getRoot());
				 termos=getOperators(termos,tEsq,tDir);
			 }else if (termo.equals("X") || termo.equals("*")){
				 //tag X = multiplicacao
				 termos=Expression.buscaXall("*", equacao.getRoot());
				 termos=getOperators(termos,tEsq,tDir);
			 }else if (termo.equals("/") || termo .equals("MM")){
				 //tag / = divisao
				 termos=Expression.buscaXall("/", equacao.getRoot());
				 if (termo.equals("/"))termos=getOperators(termos,tEsq,tDir);
			 }else if (termo.equals("=")){
				 //tag = = sinal da igualdade
				 termos.add(this.equacao.getRoot());
				 termos=getOperators(termos, tEsq, tDir);
			 }else if (termo.equals("OI")){
					//tag OI = operação inversa,
					//no qual é uma equação onda cada temo envolvido na oi este de um la do da =  
					 termos.add(equacao.getRoot());
					 termos=getOperators(termos, tEsq, tDir);
			 }else if (termo.equals("^")){
				 //tag ^ = potencia
				 termos=Expression.buscaXall("^", equacao.getRoot());
				 termos=getOperators(termos, tEsq, tDir);
			 }else if (termo.equals("R")){
				 //tag R = raiz
				 termos=Expression.buscaXall("R", equacao.getRoot());
				 termos=getOperators(termos, tEsq, tDir);
			 }else if (termo.isEmpty()){
				 termos.add(equacao.getRoot());
				 idTermo=1;
			 }
			 if (idTermo>termos.size() && bkTermos.isEmpty())return tag;
			 //processa id do nodo
			 BTNode idNode;
			 String id="";
			 if (termo.equals("MM")){
				 termos=getOperators(termos, false, true);
				 for (BTNode n: termos){
					 id="";
					 id+=getNodesIDs(n);
					 exp+="<eq id="+id+">"+equacao.setmod(n)+"</eq>, ";
				 }
				 //remover ultima virgula e o espaço
				 exp=exp.substring(0,exp.length()-2)+" ";
			 }else{
				 //termos de bhaskara n tem indice é apenas 1 de cada
				 if (!bkTermos.isEmpty())idNode=bkTermos.get(0);
				 else idNode=termos.get(idTermo-1);
				 id= getNodesIDs(idNode);
				 exp=equacao.getExp().getExpression(idNode);
				 exp="<eq id="+id+">"+exp+"</eq>";
			 }
			 return exp;
		 }else return tag;
	}
	
	/**
	 * Filtra a lista, criando um nova com apenas os operadores,
	 * sem os filhos, apenas o lada direito, apenas o lado esquerdo ou tudo.
	 * @param l uma lista de BTNodes
	 * @param esq mostrar a parte eqaureda da operacao
	 * @param dir mostrar a parte direita da operacao
	 * @return um subconjuto de l contendo somente os operadores, sem filhos, os termos da 
	 * esquerda da operacao, os da direita ou a operacao inteira (esq e dir == true).
	 */
	public List<BTNode> getOperators(List <BTNode> l, boolean esq, boolean dir){
		List <BTNode> operators=new ArrayList<BTNode>();
		for (BTNode bt:l){
			if (Funcoes.isOp(bt.getValue())){
				if ((esq && dir)||(!esq&&!dir)){
					if (bt.getValue().equals("+") || bt.getValue().equals("*")){
						BTNode e,d;
						e= findFolha(bt.getValue(), bt.getEsq(),true);
						d= findFolha(bt.getValue(), bt.getDir(),false);
						//operators.add(new BTNode (bt.getValue(),(BTNode)e.clone(),(BTNode)d.clone()));
						/*
						 * Isto é um teste a fim de verificar a viabilidade de coloca na lista um bt com os nodos
						 * esq e dir sem a necessidade do .clone(), como eu acho que o pai dos mesmos não será acessado, acredito que 
						 * não tem problema como é um método executado quando a equação ja foi processada então acho que não tem
						 * problema, a única linha a seguir substitui a linha comentada acima, e tem a função de viabizar a idzação
						 * de termos com a tag, por exemplo <eq +>
						 */
						operators.add(new BTNode(bt.getValue(), e,d));
					}else operators.add(bt);
				}
				else if (esq){
					if (bt.getValue().equals("+") || bt.getValue().equals("*")){
						bt= findFolha(bt.getValue(), bt.getEsq(),true);
						operators.add(bt);
					}else operators.add(bt.getEsq());
				}
				else if (dir){
					if (bt.getValue().equals("+") || bt.getValue().equals("*")){
						bt= findFolha(bt.getValue(), bt.getDir(),false);
						operators.add(bt);
					}else operators.add(bt.getDir());
				}
			}
		}
		return operators;
	}
	
	/**
	 * Obtem o nodo a ser impresso na tag, se for o operando esquerdo, busca
	 * a sub arvore mais a direita, e se for o operando direito busca a sub
	 * arvoer mais a esquerda. Enquanto a operação for a mesma de operato,
	 * uma vez que fique diferetne ou ache a folha retorna a subarvore desejada.  
	 * @param operator a operação cujo, operando esquerdo deve ser obtido.
	 * @param exp a sub arvore a ser buscada, esta ja deve ser filho esquerdo/direito do no cujo termo 
	 * sera exibido. Por exemplo, para exibir o 1 em 2x+1+2=x, supondo que 2x+1 seja filho esquerdo do
	 * segundo +,  exp deve ser 2x+1.
	 * @param esq se <code>true</code> é o termo esquerdo, logo buscar a sub-arvore mais a direita,
	 * e se <code>false</code> é o termo direito, buscar a subarvore mais a esquerda.
	 * @return a sub arvor com o termo requerido.
	 */
	public BTNode findFolha (String operator,BTNode exp, boolean esq){
		if (operator.equals("X"))operator="*";
		if (Funcoes.isOp(operator)){
			if (exp.getValue().equals(operator)){
				while (!exp.eFolha() && exp.getValue().equals(operator)){
					if (esq)exp=exp.getDir();
					else exp=exp.getEsq();
				}
			}
		}
		return exp;
	}
	
	public String getNodesIDs(BTNode node){
		String ids="";
		List<BTNode> all=Expression.getAllFolhas(equacao.getRoot());
		List<BTNode> subSet = Expression.getAllFolhas(node);
		int idA,idSS; //id all e id subset
		boolean []idsUtilizados=new boolean[all.size()];
		boolean equals=false;
		for (int i=0;i<idsUtilizados.length;i++)idsUtilizados[i]=false;
		for (BTNode allNode:all){
			idA=getFirstNotNullID(allNode).getIDTermo();
			for (BTNode subSetNode:subSet){
				idSS=getFirstNotNullID(subSetNode).getIDTermo();
				if (op.equals(Operacao.OPERACAO_INVERSA))equals=allNode.getValue().contains(subSetNode.getValue());
				else equals=allNode.getValue().equals(subSetNode.getValue());
				if (idA==idSS && idA!=-1 && equals && idsUtilizados[idA]==false){
					ids+=idA+",";
					idsUtilizados[idA]=true;
				}
			}
		}
		if (!ids.isEmpty())ids=ids.substring(0, ids.length()-1);
		else ids="-1";
		return ids;
	}
		
	public BTNode getFirstNotNullID(BTNode bt){
		while(bt.getIDTermo()==-1 && bt.getPai()!=null){
			bt=bt.getPai();
		}
		return bt;
	}
	
	public void parseNewLine(){
		texto=texto.replace("\n", "<br>");
	}
	
/*	public static void main(String[] args) {
		String texto="Aplique a <eq1 +1> <eq1 a1> com <eq1 a2>, <eq1 b1> com <eq1 b2> e <eq2 c1> com <eq2 c2>!!!";
		String texto2= "A equação <eq> possui a esquerda os termos <eq1 t*1> e a direita os termos <eq1 *t>, " +
				"resultando na expressão <eq1 t*t>!!! Há também o <eq =t> que é o resultado da equação.";
		String texto3= "A equacao <eq> possui uma potencia (<eq t^t>) e uma raiz (<eq tRt>) seus termos são: <eq t^> na esquerda " +
				"e <eq ^t> na direita, na potencia, e na raiz os termos são <eq tR> e <eq Rt>!!!.";
		String texto21= "A equacao <eq1> possui os seguintes termos: \n <eq1 t*> \n <eq1 *t>" +
				"\n<eq1 t+1> \n<eq1 +t1> \n<eq1 t+2> \n<eq1 +t2>.\n" +
				"Ja a <eq2> poissui os seguintes termos: \n<eq2 t/1>\n<eq2 /t1>\n<eq2 t*1>\n<eq2 *t1>" +
				"\n<eq2 tR1>\n<eq2 t^1>.";
		Parser p= new Parser(texto);//, new Expression ("2x^2+4x^2+3x+4x+3+2=0"), new Expression ("1+1=x"));
		Parser p2= new Parser (texto21);//, new Expression ("(x+1)*(2x+2)=2"), new Expression ("x=(-4+(12^2-4*1*3)R2)/(2*1)"));
		Parser p3= new Parser (texto3);//, new Expression ("x+2=x^2+4R2"));
		//p.parse();
		p2.parse();
		//p3.parse();
		System.out.println(p.getTexto());
		System.out.println(p2.getTexto());
		System.out.println(p3.getTexto());
	}*/
}
