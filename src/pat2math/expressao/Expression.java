package pat2math.expressao;


import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import pat2math.expressao.arvore.ArvoreExp;
import pat2math.expressao.arvore.BTNode;
import pat2math.expressao.arvore.InvalidValueException;
import pat2math.regras.MiscFunctions;
import pat2math.resolvedor.Equacoes;
import pat2math.util.Funcoes;


/**
 * Classe que representa as equações matemáticas,
 * que são arvores de expressões
 * @author Henrique M. Seffrin
 *
 */
public class Expression implements Cloneable{
	
	private ArvoreExp expressao;
	private String exp;
	private String tipo;
	public static final String SOLVER="solver";
	public static final String USER="user";
	public static final String COEFICIENTES_BK= "coeficientes_bk";
	public static final String COEFICIENTES_BK_OK= "coeficientes_bk_ok";
	/**
	 * Uso exclusivo das dicas
	 */
	public boolean useForHints;
	/**
	 * Uso exclusivo da regras "Bhaskara"
	 */
	public static final String FOR_BHASKARA="for bhaskara";
	public static final String USELESS_FOR_BHASKARA="useless";

	
	/**
	 * Representação da expressão da arvore
	 */
	private String newexpression;
	
	/**
	 * Expressão sem o excesso de parenteses
	 */
	private String cleanExpression;
	
	/**
	 * Equação em formato LaTeX
	 */
	private String TeXExpression;
	
	public Expression(String exp) throws InvalidValueException{
		this(exp, SOLVER);
		
	}

	/**
	 * Obtêm o tipo da equação
	 * @return "user" se por uma equação do usuário e 
	 * "solver" se não for. O tipo "solver" é padrão
	 */
	public String getTipo(){
		return tipo;
	}
	
	public void uselessBK(){
		tipo=USELESS_FOR_BHASKARA;
	}
	
	public void useBK(){
		tipo=FOR_BHASKARA;
	}
	
	
	/**
	 * Indica que a expressao contem os coeficientes de Bhaskara, não ha equacao, apenas um string em newexpression
	 */
	public void setCoefBK(){
		tipo=COEFICIENTES_BK;
	}
	
	public void setCoefOK(){
		tipo=COEFICIENTES_BK_OK;
	}
	
	/**
	 * Indica que a expressao contem os coeficientes de Bhaskara, não ha equacao, apenas um string em newexpression
	 */
	public boolean isCoefBK(){
		return tipo.equals(COEFICIENTES_BK);
	}
	
	/**
	 * Obtêm uma instância da classe <code>Equações</code>
	 * que armazena os 3 tripos de String:
	 * <p>
	 * <ol>
	 * <li>a expressão exatamente igual a arvore onda cada subarvoe é um parentese;</li>
	 * <li>a expressão com o menor número de prentese possivel;</li>
	 * <li>a expressão em formato TeX</li>
	 * </ol>
	 * @return uma instancia de {@link Equacoes} contendo os
	 * três tipos de String 
	 */
	public Equacoes toEquacoes(){
		return new Equacoes(newexpression,cleanExpression,TeXExpression);
	}
	
	/**
	 * Contrói de uma equação a partir de uma String
	 * @param exp a equação em formato texto
	 * @param tipo o tipo: user ou solver
	 * @throws InvalidValueException se a equação contiver algum erro
	 */
	public Expression (String exp,String tipo ) throws InvalidValueException{
		if (exp.contains("a=") && exp.contains("b=") && exp.contains("c=")){
			this.tipo=COEFICIENTES_BK;
			this.exp=newexpression=cleanExpression=TeXExpression=exp;
			expressao=new ArvoreExp(new BTNode (exp));
			
		}else{
			expressao = new ArvoreExp(exp);
			setmod();
			this.exp=newexpression;
			this.tipo=tipo;
		}
	}
	
	public static boolean isCoeficientExp(String exp){
		return exp.contains("a=") && exp.contains("b=") && exp.contains("c=");
	}
	
	/**
	 * Avalia de exp é uma equação do tipo x=±a, "x" incognita e "a" um inteiro
	 */
	public static boolean isFinalAnswerSecondDegree(String exp){
		BTNode root;
		try {
			root = new ArvoreExp (exp).getRoot();
			BTNode inc,v;
			if (root.getEsq().eFolha() && !Funcoes.getInc(root.getEsq().getValue()).isEmpty()) inc=root.getEsq();
			else if (root.getDir().eFolha() && !Funcoes.getInc(root.getDir().getValue()).isEmpty())inc=root.getDir();
			else return false;
			if (!root.getEsq().eFolha() && root.getEsq().getValue().equals("±")&& root.getEsq().getEsq().isAbstract()&&
					root.getEsq().getEsq().getValue().equals("0") && root.getEsq().getDir().eFolha())v=root.getEsq();
			else if (!root.getDir().eFolha() && root.getDir().getValue().equals("±") && root.getDir().getEsq().isAbstract() &&
					root.getDir().getEsq().getValue().equals("0") && root.getDir().getDir().eFolha())v=root.getDir();
			else return false;
			return inc!=null && v!=null;
		} catch (InvalidValueException e) {
			return false;
		}
	}
	
	/**
	 * Constrói uma equação a partir de uma arvore de expressões
	 * @param root a raiz da arvore de expressões
	 * @param tipo o tipo da equação: user ou solver
	 */
	public Expression (BTNode root, String tipo){
		this(root,tipo,true);
	}
	
	/**
	 * Constrói uma equação apartir de uma arvore de expressoes
	 * @param root a raiz da arvore de expressões
	 * @param tipo o tipo da equação: user ou solver
	 * @param reindex <code>true</code> se os ids devem ser refeitos e <code>false</code> caso contrario
	 */
	public Expression(BTNode root, String tipo, boolean reindex){
		this.expressao=new ArvoreExp(root);
		if (reindex)setmod();
		this.exp=newexpression;
		this.tipo=tipo;
	}
	
	/**
	 * Constrói uma equação apartir de uma arvore de expressoes
	 * @param root a raiz da arvore de expressões
	 * @param reindex <code>true</code> se os ids devem ser refeitos e <code>false</code> caso contrario
	 */
	public Expression(BTNode root, boolean reindex){
		this(root,SOLVER,reindex);
	}
	
	/**
	 * Constrói uma equação a partir de uma arvore de expressões,
	 * com o tipo solver
	 * @param root a raiz da arvore de expressoes
	 */
	public Expression (BTNode root){
		this(root,SOLVER);
	}
	
	/**
	 * Retorna uma cópia identica deste objeto
	 */
	public Object clone(){
		if (!this.tipo.equals(COEFICIENTES_BK)){
			BTNode clone=(BTNode)this.expressao.getRoot().clone();
			Expression e=new Expression(clone,this.tipo);
			if (this.isHint())e.useForHints();
			return e;
		}else{
			Expression e=null;
			try{
				e= new Expression(this.newexpression, COEFICIENTES_BK);
			}catch (InvalidValueException ive){ive.printStackTrace();}
			return e;
		}
	}
	
	/**
	 * Limpa completamente o objeto
	 */
	public void clear(){
		expressao.clear();
		exp=null;
		newexpression=null;
		cleanExpression=null;
		TeXExpression=null;
	}
	
	/**
	 * Obtém a expressão por extenso
	 * @return uma String contendo a expressão
	 */
	public String exp(){
		return exp;
	}
	
	/**
	 * Devido ao problema na hora de montar a arvore, pelo fato do sinal 
	 * de numero negativo ser o sinal de menos, este metodo substitui 
	 * o sinal de número negativo "-" por "_" afim de que ele seja 
	 * inserido na arvore junto com o valor.
	 * @param exp a expressao a ser modificada
	 * @return a expressão com o sinal negativo trocado, ou se não 
	 * houver nenhuma troca a mesma expressão passada como parametro
	 */
	public static String trocaSinalMenos(String exp){
		char[] chArr;
		for (int i=0;i<exp.length();i++){
			char c=exp.charAt(i);
			
			/*
			 * Converte um ± em $± após um = que é o unco caso em que este simbolo é unário
			 * o $ foi usado para indicar abstract node
			 */
			if (((c=='='||c=='(') && exp.charAt(i+1)=='±')||
					(i==0 && c=='±')){
				StringBuffer sb=new StringBuffer(exp);
				sb.replace(i+1, i+2, "$±");
				exp=sb.toString();
			}else
			/*
			 * converte para "?" apenas se - for tiver um = ou um ( antes dele
			 * tipo x=-(-3/2) ou x=(-(-12)+(12^2-4*1*36)R2)/2
			 */
			
			if ((exp.charAt(i)=='-' || exp.charAt(i)=='_') &&
					exp.charAt(i+1)=='('  &&
					(i==0 /*pro caso de -(-2)=x*/||exp.charAt(i-1)=='='|| exp.charAt(i-1)=='(') ){
				StringBuffer sb=new StringBuffer(exp);
				sb.replace(i, ++i, "?*");
				exp=sb.toString();
			}else if (Funcoes.isOp(String.valueOf(c))|| c=='('){
				int cont=i;
				cont++;
				c=exp.charAt(cont);
				//se o proximo simbolo depois de um opreador for o
				//"-" ou se o "-" for o primeiro simbolo
				if (c=='-'){
					chArr=exp.toCharArray();
					chArr[cont]='_';
					exp=new String (chArr);
					
				}else if (exp.charAt(i)=='-' && i-1<0){
					chArr=exp.toCharArray();
					chArr[i]='_';
					exp=new String(chArr);
				}else if (c=='+' ){
					exp=exp.substring(0,cont)+exp.substring(cont+1);
				}else if (exp.charAt(i)=='+' && i-1<0){
					exp=exp.substring(1);
				}
			}
		}
		return exp;
	}
	
	/**
	 * Varre a a arvore r em busca do sinal "_" se o
	 * encontra substitui por "-"
	 * @param r a raiz de uma arvore a ser varrida
	 * @return a mesma arvore com os sinais de "_" trocados por "-"
	 */
	public BTNode trocaSinalMenos(BTNode r){
		BTNode aux= buscaX(r,"_");
		while(aux!=null){
			if (aux !=null) aux.setValue("-"+aux.getValue().substring(1));
			aux=buscaX(r,"_");
		}
		return r;
	}
	
	/**
	 * Realiza o desligamento de <code>r</code> da arvore, caso
	 * queira garantir que todas as referencias dos outros
	 * nos da arvores estejam intactas use <code>removeNoArvore</code>
	 * @see #removeNoArvore(BTNode)
	 * @param r o nodo a ser desligado da arvore
	 * @return r sem qualquer referências para a arvore a qual
	 * pertencia 
	 */
	public static BTNode removeDaArvore(BTNode r){
		BTNode pai=r.getPai();
		BTNode dir= pai.getDir();
		if (pai.getEsq().equals(r)){
			if (pai.getValue().equals("-")){
				if (dir.getValue().equals("^")||dir.getValue().equals("R")){
					dir.getEsq().setValue(Funcoes.trocaSinal(dir.getEsq().getValue()));
				}else dir.setValue(Funcoes.trocaSinal(dir.getValue()));
				pai.setValue("+");
			}
			pai.setDir(null);
			pai.setEsq(null);
			pai.setValue(dir.getValue());
			pai.setEsq(dir.getEsq());
			pai.setDir(dir.getDir());
		}else{
			BTNode esq=pai.getEsq();
			if (pai.getValue().equals("-")){
				dir.setValue(Funcoes.trocaSinal(dir.getValue()));
				pai.setValue("+");
			}
			pai.setEsq(null);
			pai.setDir(null);
			pai.setValue(esq.getValue());
			pai.setEsq(esq.getEsq());
			pai.setDir(esq.getDir());
		}
		return r;
	}
	
	/**
	 * Realiza o desligamento de r da arvore e mantem todas
	 * as referencias dos outros nós da arvore intactos.<p>
	 * <b>Este metodo não funciona se <code>r</code> for filho direto da raiz da arvore,
	 * ou seja, um nivel abaixo da raiz</b></p>
	 * @param r o nodo a ser removido
	 * @return r removido da arvore
	 */
	public static BTNode removeNoArvore(BTNode r){
		BTNode pai=r.getPai();
		BTNode dir= pai.getDir();
		boolean useAbstract=false;
		if (pai.getEsq()!=null && pai.getEsq().equals(r)){
			if (pai.getValue().equals("-")){
				if (dir.getValue().equals("^")||dir.getValue().equals("R")){
					dir.getEsq().setValue(Funcoes.trocaSinal(dir.getEsq().getValue()));
				}else if (!dir.eFolha()){
					useAbstract=true;
				}
				else dir.setValue(Funcoes.trocaSinal(dir.getValue()));
				pai.setValue("+");
			}
			pai.setDir(null);
			pai.setEsq(null);
			if (useAbstract){
				pai.setEsq(new BTNode(-1));
				pai.setDir(dir);
				pai.setValue("*");
				pai.getEsq().setAbstractTerm(true);
				pai.setAbstractTerm(true);
			}else if (pai.getPai().getEsq()!=null && 
					pai.getPai().getEsq().equals(pai)){
				pai=pai.getPai();
				pai.setEsq(dir);
			}else{
				pai=pai.getPai();
				pai.setDir(dir);
			}
		}else{
			BTNode esq=pai.getEsq();
			if (pai.getValue().equals("-")){
				dir.setValue(Funcoes.trocaSinal(dir.getValue()));
				pai.setValue("+");
			}
			pai.setEsq(null);
			pai.setDir(null);
			if (pai.getPai().getEsq()!=null &&
					pai.getPai().getEsq().equals(pai)){
				pai=pai.getPai();
				pai.setEsq(esq);
			}else{
				pai=pai.getPai();
				pai.setDir(esq);
			}
		}
		return r;
	}
	
	/**
	 * Realiza o desligamento da sub arvore <code>root</code> e reloca os outros nodos da arvore
	 * <br><b>Aviso: As referencias dos outros nos em listas não é garantida.</b>
	 * @param root a raiz da subarvore
	 * @return root sem referencias ao nodo pai
	 */
	public static BTNode removeSubArvore(BTNode root){
		if (root.getPai()!=null){
			BTNode pai=root.getPai();
			if (root.ehFilhoEsq()){
				pai.setEsq(null);
				pai.setEsq(new BTNode (""));
				removeDaArvore(pai.getEsq());
			}else{
				pai.setDir(null);
				pai.setDir(new BTNode (""));
				removeDaArvore(pai.getDir());
			}
		}
		return root;
	}
		
	/**
	 * Busca a primeira ocorrência de determinado operador 
	 * na arvore apartir da raiz
	 * @param operador o operador a ser buscado
	 * @return a subabarvore que contém a primeira ocorrência 
	 * deste operando
	 */
	public BTNode find(String operador){
		return find(expressao.getRoot(), operador);
	}
	
	/**
	 * Busca a primeira ocorrência de determinado operador 
	 * na arvore apartir de r
	 * @param r o nodo apartir do qual se incia a busca
	 * @param operador o operador a ser buscado
	 * @return a subarvore que contém a primeira ocorrência deste 
	 * operando
	 */
	public static BTNode find(BTNode r,String operador){
		BTNode op=null;
		if(r!=null){
			if(Funcoes.isOp(String.valueOf(r.getValue())) && r.getValue().equals(operador)){
					return r;
			}else{
				op=find(r.getEsq(),operador);
				if (op==null){
					op=find(r.getDir(), operador);
				}
			}
		}
		return op;
	}
	
	/**
	 * Verifica até que ponto arv1 e arv2 são iguais.<br>
	 * Este método é um complemento ao método compara, pois este 
	 * retorna no momento que encontra duas arvores iguais, ou seja, se
	 * nos nodos acima houver igualdade esta será ignorada. Este método busca nos nodos acima. 
	 * @param arv1 uma arvore a ser comparada
	 * @param arv2 outra arvore a ser comparada
	 * @return um array de 2 posições contendo os nodos iguais.
	 */
	public BTNode[] comparar(BTNode arv1,BTNode arv2){
		boolean ig=true;
		BTNode igual[]=compara(arv1, arv2);
		if (igual==null)ig=false;
		if (ig){
			BTNode n1=igual[0],n2=igual[1],ig1=n1,ig2=n2;		
			while(ig){
				n1=n1.getPai();
				n2=n2.getPai();
				ig=igual(n1, n2);
				if(ig){
					ig1=n1;
					ig2=n2;
				}
			}
			igual[0]=ig1;
			igual[1]=ig2;
		}
		return igual;
	}
	
	/**
	 * Busca em arv2 a menor subarvore que seja igual a uma subarvore de arv1
	 * @param arv1
	 * @param arv2
	 * @return um vetor contendo as duas subarvores iguais ou null se não
	 * ha subarvores iguais
	 */
	public BTNode[] compara(BTNode arv1, BTNode arv2){
		if (arv1!=null && arv2!=null){
			if (arv1.eFolha() || arv2.eFolha()){
				return null;
			}else{
				BTNode[] b1=compara(arv1.getEsq(), arv2);
				BTNode[] b2=compara(arv1.getDir(),arv2);
				if (b1==null && b2==null){
					BTNode eq=busca(arv1,arv2);
					if (eq!=null){
						BTNode e[]=new BTNode [2];
						e[0]=arv1;
						e[1]=eq;
						return e;
					}
				}else{
					if (b1!=null)return b1;
					else return b2;
				}
			}
		}
		return null;
	}
	
	/**
	 * Busca em arv2 a menor subarvore que seja igual a uma subarvore de arv1, neste caso inclui as folhas
	 * @param arv1
	 * @param arv2
	 * @return um vetor contendo as duas subarvores iguais ou null se não
	 * ha subarvores iguais
	 */
	public BTNode[] findSimpl(BTNode arv1, BTNode arv2){
		if (arv1!=null && arv2!=null){
			BTNode[] b1=null;
			BTNode[] b2=null;
			//só entre na recursão se os nodos folha forem "*"
			if (arv1.getValue().equals("*")){
				b1=findSimpl(arv1.getEsq(), arv2);
				b2=findSimpl(arv1.getDir(),arv2);
			}
			if (b1==null && b2==null && checkForSQRT(arv1, arv2)){
				BTNode eq=busca(arv1,arv2);	
				//bloqueio de radical e potencia
				//TODO: nullpointer,  equação:
				//x=(5)/((5)R2)*((5)R2)/((5)R2)
				//x=(5*(5)R2)/((25)R2)
				if  (eq!=null && !eq.ehFilhoDir(eq.getNodeX("^")) && !eq.ehFilhoDir(eq.getNodeX("R"))){
					BTNode e[]=new BTNode [2];
					e[0]=arv1;
					e[1]=eq;
					return e;
				}
			}else{
				if (b1!=null)return b1;
					else return b2;
			}
		}
		return null;
	}
	
	
	public BTNode[] findLeafSimp(BTNode arv1, BTNode arv2, BTNode commonNode){
		BTNode simp[]=new BTNode[2];
		if (arv1!=null && arv2!=null){
			Vector<BTNode> leafs;
			if (arv1.eFolha() && Funcoes.verificaCaminho(arv1, commonNode, "*")){
				leafs=buscaChaveX(arv2, arv1.getValue());
				BTNode bt;
				Iterator<BTNode> it=leafs.iterator();
				while(it.hasNext() && simp[0]==null){
					bt=it.next();
					if (bt.eFolha()&&Funcoes.verificaCaminho(bt, commonNode, "*")){
						simp[0]=arv1;
						simp[1]=bt;
					}
				}
			}else{
				simp=findLeafSimp(arv1.getEsq(), arv2, commonNode);
				if (simp[0]==null)simp=findLeafSimp(arv1.getDir(), arv2, commonNode);
			}
		}
		return simp;
	}
	
	/**
	 * Verifica o valor de b1 e b2, retorna <code>true</code> se ambos forem R
	 * @param b1 a raiz de uma subarvore
	 * @param b2 a raiz de uma subarvore
	 * @return <code>true</code> de forem R e <code>false</code> caso contrario
	 */
	private boolean checkForSQRT(BTNode b1, BTNode b2){
		boolean sqrt1=b1.getValue().equals("R");
		boolean sqrt2=b2.getValue().equals("R");
		return sqrt1==sqrt2;
	}
	
	/**
	 * Busca em arv2 a subarvore arv1
	 * @param arv1
	 * @param arv2
	 * @return a subarvore igual a arv1
	 */
	public BTNode busca(BTNode arv1, BTNode arv2){
		Vector<BTNode> l= buscaChaveX(arv2, arv1.getValue());
		while(!l.isEmpty()){
			BTNode b=l.remove(0);
			if (igual(arv1,b)){
				return b;
			}
		}
		return null;
	}
	
	/**
	 * Busca um operador x na arvore no
	 * @param no a raiz da arvore que será realizada a busca
	 * @param x o operando a ser buscado
	 * @return um Vector contendo todas as subarvores que possuem o 
	 * operador x
	 */
	public Vector<BTNode> buscaChaveX(BTNode no, String x){
		Vector <BTNode> v=new Vector<BTNode>();
		return buscaChaveX(no, x, v);
	}
	
	/**
	 * Busca um operador x na arvore no
	 * @param no a arvore que será realizada a busca
	 * @param x operando a ser buscado
	 * @param l Vector onde sera adicionado as subarvores iguais
	 * @return um Vector contendo todas as subarvores que possuem o 
	 * operador x
	 */
	public Vector<BTNode> buscaChaveX(BTNode no, String x, Vector<BTNode> l){
		if (no!=null){
			l=buscaChaveX(no.getEsq(),x,l);
			if (no.getValue().equals(x)){
				l.add(no);
			}
			l=buscaChaveX(no.getDir(), x, l);
		}
		return l;
	}
	
	/**
	 * Busca uma incógnita x na arvore r
	 * @param r a arvore que será realizada a busca
	 * @param x a incógnita buscada
	 * @return a primeira ocorrência do nodo com a incógnta x, se 
	 * for filho de "^" retorna a subarvore cuja raiz é "^", para ignorar
	 * a potencia use buscaX()
	 * @see #buscaX(BTNode, String)
	 */
	public static BTNode findX(BTNode r, String x){
		BTNode n=null;
		if(r!=null){
			n=findX(r.getEsq(),x);
			if (n==null){
				if(r.getValue().contains(x)){
					if(r.getPai().getValue().equals("^"))return r.getPai();
					else return r;
				}
				n=findX(r.getDir(),x);
			}
		}
		return n;
	}
	/**
	 * Compara duas arvores
	 * @param arv1
	 * @param arv2
	 * @return true se arv1 e arv2 forem iguais e false caso contrário
	 */
	public static boolean igual(BTNode arv1, BTNode arv2){
		if (arv1!=null && arv2!=null){
			if (arv1.getValue().equals(arv2.getValue())){
				if(igual(arv1.getEsq(), arv2.getEsq())){
					if(igual(arv1.getDir(), arv2.getDir())){
						return true;
					}else return false;
				}else return false;
			}else return false;
		}
		return true;
	}
	
	/**
	 * Transforma uma arvore onde pode ser aplicado a propriedade 
	 * distributiva numa arvore onde pode ser calculado com as operações 
	 * matamáticas. Exemplo: tranforma a arvore da expressao "13*(x+1)" na
	 * arvore da expressão "(13*x)+(13*1)"
	 * @param arv a arvore de expressão a ser tranformada: "13*(x+1)"
	 * @return a nova arvore que pode-se aplicar as operações 
	 * matemáticas: "(13*x)+(13*1)"
	 */
	public BTNode distributiva(BTNode arv){
		BTNode esq=arv.getEsq();
		BTNode dir=arv.getDir();
		if (dir!= null && (dir.eFolha()|| dir.getValue().equals("^") || dir.getValue().equals("R"))){
			if (esq!=null && !esq.eFolha()&& !esq.getValue().equals("^") && !esq.getValue().equals("R")){
				if((esq.getEsq().eFolha() || esq.getEsq().getValue().equals("^") || esq.getEsq().getValue().equals("R")) &&
						(esq.getDir().eFolha() || esq.getDir().getValue().equals("^") || esq.getDir().getValue().equals("R"))){
					String esqSinal;
					BTNode dir1,esq1,esq2;
					dir1=dir;
					esq1=esq.getEsq();
					esq2=esq.getDir();
					if (esq2.getPai().getValue().equals("-")){
						esq2.setValue("-"+esq2.getValue());
						esq2.getPai().setValue("+");
					}
					esq.setDir(null);
					esq.setEsq(null);
					arv.setEsq(null);
					arv.setDir(null);
					esqSinal=esq.getValue();
					esq=new BTNode(arv.getValue(),dir1,esq1);
					dir=new BTNode(arv.getValue(),(BTNode)dir1.clone(),esq2);
					arv.setValue(esqSinal);
					arv.setEsq(esq);
					arv.setDir(dir);
				}
			}
		}else if(esq!=null && (esq.eFolha()||esq.getValue().equals("^")||esq.getValue().equals("R"))){
			if (dir!=null && !dir.eFolha()&&!dir.getValue().equals("^")&&!dir.getValue().equals("R")){
				if((dir.getEsq().eFolha()||dir.getEsq().getValue().equals("^")||dir.getEsq().getValue().equals("R")) && 
						(dir.getDir().eFolha() || dir.getDir().getValue().equals("^") || dir.getDir().getValue().equals("R"))){
					
					String dirSinal;
					BTNode esq1,dir1,dir2;
					esq1=esq;
					dir1=dir.getEsq();
					dir2=dir.getDir();
					if (dir2.getPai().getValue().equals("-")){
						dir2.setValue("-"+dir2.getValue());
						dir2.getPai().setValue("+");
					}
					
					dir.setDir(null);
					dir.setEsq(null);
					arv.setEsq(null);
					arv.setDir(null);
					dirSinal=dir.getValue();
					esq=new BTNode(arv.getValue(),esq1,dir1);
					dir=new BTNode(arv.getValue(),(BTNode)esq1.clone(),dir2);
					arv.setValue(dirSinal);
					arv.setEsq(esq);
					arv.setDir(dir);
				}
			}
		}else if (dir!=null && esq!=null){
			if(!esq.eFolha() && !dir.eFolha()&& !esq.getValue().equals("^")&&!dir.getValue().equals("^")
					&& !esq.getValue().equals("R")&&!dir.getValue().equals("R")){
				boolean neg=false;
				if (esq.getValue().equals("-") && !esq.getDir().getValue().equals("R")){
					esq.getDir().setValue("-"+esq.getDir().getValue());
					esq.setValue("+");
				}else if (esq.getDir().getValue().equals("R")){
					neg=true;
				}
				BTNode exp1=new BTNode(arv.getValue(),esq.getEsq(),arv.getDir());
				BTNode exp2=new BTNode(arv.getValue(),esq.getDir(),arv.getDir());
				exp1=distributiva((BTNode)exp1.clone());
				exp2=distributiva((BTNode)exp2.clone());
				arv.setEsq(exp1);
				arv.setDir(exp2);
				if (neg)arv.setValue("-");
				else arv.setValue("+");
			}
		}
		return arv;
	}
	
	/**
	 * Realiza a distributiva em equações que pelomenos um fator da multiplicação tem mais de 2 valores
	 * @param exp1 o primeiro fator
	 * @param exp2 o segundo fator
	 * @return o resultado da distributiva
	 */
	
	public BTNode distributivaDeN(BTNode arv){
		BTNode exp1=arv.getEsq();
		BTNode exp2=arv.getDir();
		if (exp1!=null && exp2!=null){
			BTNode maior=exp1;
			BTNode menor=exp2;
			Funcoes f=new Funcoes();
			f.modificaSinal(exp1);
			f.modificaSinal(exp2);
			Vector<BTNode> folhasMaior=new Vector<BTNode>(); //Vector com o maior numero de folhas
			Vector<BTNode> folhasMenor=new Vector<BTNode>(); //Vector com o menor numeor de folhas
			Vector<BTNode> folhas=new Vector<BTNode>();
			folhasMaior=getFolhas(maior, folhasMaior);
			folhasMenor=getFolhas(menor, folhasMenor);
			if (folhasMaior.size()<folhasMenor.size()){
				Vector<BTNode> aux;
				BTNode bt;
				bt=maior;
				aux=folhasMaior;
				maior=menor;
				folhasMaior=folhasMenor;
				menor=bt;
				folhasMenor=aux;
			}
			BTNode ne,nd;
			int esq;
			int dir;
			for (esq=0;esq<folhasMenor.size();esq++){
				ne=folhasMenor.get(esq);
				for(dir=0;dir<folhasMaior.size();dir++){
					nd=folhasMaior.get(dir);
					if (!nd.getPai().getValue().equals("/")||
							(nd.getPai().getValue().equals("/") &&
							!nd.getPai().getDir().equals(nd))){
						//se numerador entra pela segund parte do ou entao, armazenar o "/"
						// ao inves do numerados
						if (nd.getPai().getValue().equals("/"))nd=nd.getPai();
						folhas.add(new BTNode ("*",(BTNode)ne.clone(),(BTNode)nd.clone()));
					}
				}
			}
			esq=dir=0;
			BTNode node=null, newNode=null;
			// fara a inserção das distributivas nos nodos maiores, pois
			// eles tem "ramos" suficientes!!!
			/*for (int i=0;i<folhas.size();i++){
				if (esq<folhasMenor.size()){
					oldNode=folhasMenor.get(esq);
					esq++;
				}else {
					oldNode=folhasMaior.get(dir);
					dir++;
				}
				if (oldNode.filhoDe(maior) || oldNode.equals(maior)){
					newNode=folhas.get(i);
					oldNode.setEsq(null);
					oldNode.setDir(null);
					oldNode.setEsq(newNode.getEsq());
					oldNode.setDir(newNode.getDir());
					oldNode.setValue("*");
					newNode=null;
				}else i--;
			}*/
			for (Iterator<BTNode> iterator = folhas.iterator(); iterator.hasNext();) {
				node = (BTNode) iterator.next();
				if (newNode==null)newNode=node;
				else{
					newNode=new BTNode("+",newNode,node);
				}
			}
			arv.setValue(newNode.getValue());
			BTNode nEsq= newNode.getEsq();
			BTNode nDir= newNode.getDir();
			newNode.setEsq(null);
			newNode.setDir(null);
			
			arv.setEsq(nEsq);
			arv.setDir(nDir);
			return arv;
		}
		return null;
	}
	
	/**
	 * Busca todas as folhas da arvore, no qual folhas são:
	 * <p>
	 * <li>nodo com filhos == null </li>
	 * <li>nodo com valor == "^" ou "R"</li>
	 * </p>
	 * @param r o no inicial 
	 * @return folhas preeenchida com as folhas
	 */
	public static Vector<BTNode> getFolhas(BTNode r){
		return getFolhas(r, new Vector<BTNode>());
	}
	
	/**
	 * Busca todas as folhas da arvore, no qual folhas são:
	 * <p>
	 * <li>nodo com filhos == null </li>
	 * <li>nodo com valor == "^" ou "R"</li>
	 * </p>
	 * @param r o no inicial 
	 * @param folhas a lista onde será armazenado as folhas
	 * @return folhas preeenchida com as folhas
	 */
	public static Vector<BTNode> getFolhas(BTNode r, Vector<BTNode> folhas){
		if (r!=null){
			if (r.eFolha() || r.getValue().equals("^") || r.getValue().equals("R"))folhas.add(r);
			else{
				folhas=getFolhas(r.getEsq(),folhas);
				folhas=getFolhas(r.getDir(),folhas);
			}
		}
		return folhas;
	}
	
	/**
	 * Busca todas as folhas da arvore, no qual folhas é o 
	 * nó que não possui filhos.
	 * @param r a raiz da arvore
	 * @param folhas o <code>Vector</code> que armazenara as folhas
	 * @return todas as folhas buscadas de acordo com a especificação acima
	 */
	public static Vector<BTNode> getAllFolhas(BTNode r, Vector<BTNode> folhas){
		if (r!=null){
			if (r.eFolha())folhas.add(r);
			else{
				folhas=getAllFolhas(r.getEsq(), folhas);
				if (!r.getValue().equals("^") && 
					!r.getValue().equals("R")){
					folhas=getAllFolhas(r.getDir(),folhas);
				}
			}
		}
		return folhas;
	}
	
	/**
	 * Busca todas as folhas da arvore, no qual folhas é o 
	 * nó que não possui filhos.
	 * @param r a raiz da arvore
	 * @return todas as folhas buscadas de acordo com a especificação acima
	 */
	public static Vector<BTNode> getAllFolhas(BTNode r){
		return getAllFolhas(r, new Vector<BTNode>());
	}
	
	/**
	 * Obtem as folhas de uma arvore da seguinte forma:
	 * <p>
	 * <li>Se nao tiver filhos</li>
	 * <li>Se for uma potencia/raiz e o filho esquerdo for folha</li>
	 * <li>Se for uma potencia/raiz e o filha esquerdo não for folha
	 * então buscar as folhas desta sub-arvore</li>
	 * @param r a  raiz da arvore
	 * @param folhas um <code>Vector</code> de folhas
	 * @return todas as folhas buscadas de acordo com a especificação acima
	 */
	public static Vector<BTNode> getFolhasPotRaiz(BTNode r, Vector<BTNode> folhas){
		if (r!=null){
			if (r.eFolha())folhas.add(r);
			else if (r.getValue().equals("^") || r.getValue().equals("R")){
				if (r.getEsq().eFolha())folhas.add(r);
				else folhas=getFolhasPotRaiz(r.getEsq(), folhas);
			}else{
				folhas=getFolhasPotRaiz(r.getEsq(),folhas);
				folhas=getFolhasPotRaiz(r.getDir(),folhas);
			}
		}
		return folhas;
	}
	
	/**
	 * Obtem todas as folhas de uma arvore, neste método, folhas são valores inteiros
	 * (com potência/raiz ou não) com ou sem incógnita, ou frações. 
	 * @param r a raiz da arvore a ser buscada
	 * @param folhas o <code>Vector</code> que serão adicionadas as folhas. 
	 * @return o <code>Vector</code> com todas as "folha" da árvore r. 
	 */
	public static Vector<BTNode> getFolhasFracoes(BTNode r, Vector<BTNode> folhas){
		if (r!=null){
			if (r.eFolha() ||
						r.getValue().equals("^") ||
						r.getValue().equals("R") ||
						r.getValue().equals("/"))	folhas.add(r);
			else{
				folhas = getFolhasFracoes(r.getEsq(), folhas);
				folhas = getFolhasFracoes(r.getDir(), folhas);
			}
		}
		return folhas;
	}
	/**
	 * Obtem a raiz da arvore
	 * @return a raiz da arvore
	 */
	public BTNode getRoot(){
		return expressao.getRoot();
	}
	/**
	 * Insere uma nova raiz, substituindo a anterior
	 * e atualiza a expressão
	 * @param r a nova raiz
	 */
	public void setNewRoot(BTNode r){
		expressao.setNewRoot(r);
		setmod();
		System.out.println(newexpression);
	}
	
	/**
	 * Atualiza os atributos com os diferentes tipos de equação:
	 * <ol>
	 * <li> A represetação em forma de String da arvores de expressão, no qual cada subarvore esta entre parenteses.</li>
	 * <li> A expressão com o uso mínimo de parênteses.</li>
	 * <li> A expressão no formato TeX.</li>
	 * </ol> 
	 */
	public void setmod(){
		setIDNodes(getRoot());
		newexpression=expressao.getExpression();
		cleanExpression=expressao.getCleanExpression();
		TeXExpression=expressao.getTexExpression();
	}
	/**
	 * Gera uma expressão apartir de uma arvore de expressão apartir da raiz
	 */
	public String setmod(BTNode root){
		setIDNodes(getRoot());
		return expressao.getExpression(root);
	}
	
	public ArvoreExp getExp(){
		return expressao;
	}
	/**
	 * Obtem a nova expressão da arvore
	 * @return uma String contendo a nova expressão da arvore
	 */
	public String getnewexpression(){
		return newexpression;
	}
	
	public String getCleanExpression(){
		return cleanExpression;
	}

	public String getTeXExpression(){
		return TeXExpression;
	}
	/**
	 * Subtitui todas as ocorencias de oldValue por newValue, porém se
	 * for um valor negativo o sinal é mantido
	 * @param oldValue o valor antigo
	 * @param newValue o novo valor
	 */
	public void substituiValores(String oldValue, String newValue){
		BTNode sub=null;
		do{
			sub=buscaX(expressao.getRoot(), oldValue);
			if (sub!=null){
				if (sub.eFolha()){
					if (sub.getValue().startsWith("-")){
//						if(newValue.startsWith("-")){
//							sub.setValue(newValue.substring(1));
//						}else sub.setValue("-"+newValue);
						sub.setValue("*");
						sub.setEsq(new BTNode(-1,true));
						sub.setDir(new BTNode (newValue));
					}else sub.setValue(newValue);
				}
			}
		}while(sub!=null);
	}
	
	/**
	 * Busca x na arvore x sem levar em conta se o pai for potencia
	 * ou não
	 * @param r a arvore a ser buscada
	 * @param x o valor a ser buscado
	 * @return o nodo que contém x
	 */
	public static BTNode buscaX(BTNode r, String x){
		BTNode n=null;
		if(r!=null){
			n=buscaX(r.getEsq(),x);
			if (n==null){
				if(r.getValue().contains(x)){
					return r;
				}
			n=buscaX(r.getDir(),x);
			}
		}
		return n;
	}
	
	/**
	 * Busca todos os nodos que contenham x na arvore r
	 * @param x o valor a ser buscado
	 * @param r a arvore no qual sera buscada
	 * @return um Vector contendo todas as ocorencias de x em r
	 */
	public static Vector<BTNode> buscaXall(String x, BTNode r){
		Vector<BTNode> v=new Vector<BTNode>();
		return buscaX(x,r, v);
	}
	/**
	 * Busca todos os nodos que contenham x na arvore r
	 * @param x o valor a ser buscado
	 * @param r a arvore no qual sera buscada
	 * @param v o Vector contendo todas as ocorrencias de x
	 * @return o Vector v contendo as ocorrencias de x
	 */
	private static Vector<BTNode> buscaX(String x,BTNode r,Vector<BTNode> v){
		if(r!=null){
			v=buscaX(x,r.getEsq(),v);
				if(r.getValue().contains(x)){
					v.add(r);
				}
			v=buscaX(x,r.getDir(),v);
		}
		return v;
	}
	
	/**
	 * Varre a arvore buscando em alvo os itens contidos em parBusca
	 * @param alvo arvore onde será realizada a busca
	 * @param parBusca a arvore "PARametro de BUSCA"
	 * @return dest com os valores iguais
	 */
	public Vector<BTNode> varreArvore(BTNode alvo, BTNode parBusca){
		Vector<BTNode> dest=null;
		if (find(alvo, "+")==null || find(alvo,"-")==null){
			dest=varreArvore(alvo, parBusca, dest);
		}
		return dest;
	}
	
	/**
	 * Varre a arvore buscando em alvo os itens contidos em parBusca
	 * @param alvo arvore onde será realizada a busca
	 * @param parBusca a arvore "PARametro de BUSCA"
	 * @param dest o array onde sera colocado os valores iguais
	 * @return dest com os valores iguais
	 */
	public Vector<BTNode> varreArvore(BTNode alvo, BTNode parBusca, Vector<BTNode> dest){
		if (alvo!= null && parBusca!=null && !parBusca.getValue().equals("+") &&
				!parBusca.getValue().equals("-")){
			if (parBusca.eFolha()){
				BTNode aux=null;	
				String valPar=parBusca.getValue();
				aux=buscaX(alvo,valPar);
				if (aux==null && valPar.length()>1 && Funcoes.isInc(valPar.substring(valPar.length()-1))){
					aux=buscaX(alvo,valPar.substring(valPar.length()-1));
					if (aux==null)aux=buscaX(alvo,valPar.substring(0, valPar.length()-1));
				}
				if (aux!=null){
					if (dest==null)dest=new Vector<BTNode>();
					dest.add(aux);
					dest.add(parBusca);
				}
			}
			//deve varrer toda a arvore
			dest=varreArvore(alvo, parBusca.getEsq(), dest);
			if (!parBusca.getValue().equals("^")){/*codigo novo*///ja que n deve compara com expoente			
				dest=varreArvore(alvo, parBusca.getDir(), dest);
			}
		}
		return dest;
	}
	
	
	/**
	 * Vasculha a arvore e caso ache um numero negativo filho direito
	 * de um "+" ou "-" realiza as devida mudanças
	 * @param r o nodo inicial
	 * @return r com os sinais trocados, onde foi necessario
	 */
	public BTNode trocaSinal(BTNode r){
		if (r!=null){
			if (r.eFolha()){
				String value= r.getValue();
				if (value.equals("0")) return r;
				BTNode pai=r.getPai();
				String valuePai="";
				if (pai!=null) valuePai=pai.getValue();
				if (valuePai.equals("-")|| 
					valuePai.equals("+")){
					if (valuePai.startsWith("-")){
						pai.setValue("+");
					}else if (!value.startsWith("-"))pai.setValue("-");
					if (value.startsWith("-")) r.setValue(value.substring(1));
				}else{
					if (value.startsWith("-")){
						r.setValue(value.substring(1));
					}else r.setValue("-"+value);
				}
			}else{
		 		trocaSinal(r.getEsq());
		 		//se for potência ou raiz não vai pois o número elevado não muda de sinal
		 		if (!r.getValue().equals("^") && !r.getValue().equals("R"))trocaSinal(r.getDir()); 
			}
		}
		return r;
	}
	
	/**
	 * Inverte o sinal da equação, é o mesmo que multiplicar
	 * toda a equação por -1
	 */
	public void inverteSinalArvore(){
		if (expressao.getRoot()!=null){
			inverteSinalArvore(expressao.getRoot());
		}
	}
	
	/**
	 * Inverte o sinal da equação, é o mesmo que multiplicar
	 * toda a equação por -1
	 * @param r a raiz da arvore
	 * @return retonra a raiz da arvore com o sinal invertido
	 */
	public BTNode inverteSinalArvore(BTNode r){
		if (r!=null){
			if (!r.eFolha() && !r.getValue().equals("^") && !r.getValue().equals("R")){
				inverteSinalArvore(r.getEsq());
			}
			BTNode pai=r.getPai();
			if (r.eFolha() || r.getValue().equals("^")|| r.getValue().equals("R")){
				if (r.getValue().equals("^")|| r.getValue().equals("R")){
					r=r.getEsq();
				}
				if (r.getValue().equals("0"))return r;
				if (r.getValue().startsWith("-")){
					//- com - = + entao filho + e pai -
					if (pai.getValue().startsWith("-") && r.ehFilhoDir()){
						r.setValue(r.getValue().substring(1));
					}else{
						//- com + = - entao filho e pai +
						r.setValue(r.getValue().substring(1));
					}
				}else{
					//+ com - = - entao filho e pai +
					if (pai.getValue().startsWith("-") && r.ehFilhoDir()){
						pai.setValue("+");
					}else if (r.getPai().getValue().equals("^") && pai.getValue().startsWith("-") &&
							r.getPai().ehFilhoDir()){
						pai.setValue("+");
					}
					else{
						//+ com + = + entao filho - e pai +
						r.setValue("-"+r.getValue());
					}
				}
			}
			if (!r.getValue().equals("R") &&
				!r.getValue().equals("^"))inverteSinalArvore(r.getDir());
		}
		return r;
	}
	/**
	 * Substitui o valor da incognita da expressao por <code>valor</code>
	 * @param valor o novo valor da incognita
	 */
	public void substituiInc(String valor){
		substituiInc(valor, expressao.getRaiz());
	}
	
	/**
	 * Substitui o valor da incognita da expressao por <code>valor</code>
	 * @param valor o novo valor da incognita
	 * @param root a raiz da arvore
	 */
	private void substituiInc(String valor, BTNode root){
		if (root!=null){
			if (root.eFolha()){
				String nodoVal= root.getValue();
				/*
			 	* pega a incognita que sempre está na ultima posição da String 
			 	*/
				String inc=nodoVal.substring(nodoVal.length()-1);
				if (Funcoes.isInc(inc)){
					if (nodoVal.length()==1){
						root.setValue(valor);
					}else if (nodoVal.length()==2 && nodoVal.startsWith("-")){
						root.setValue("-"+valor);
					}else {
						/*
						 * Em um valor acompanhado de uma incognita transforma em uma multiplicação e
						 * subtitui a incongita por "valor"
						 */
						root.setDir(new BTNode(valor)); 
						root.setEsq(new BTNode(nodoVal.substring(0,nodoVal.length()-1)));
						root.setValue("*");
					}
				}
			}else{
				substituiInc(valor, root.getEsq());
				substituiInc(valor, root.getDir());
			}
		}
	}
	
	/**
	 * Se a equacao possuir apenas inteiros faz os calculos em ambos os lado dela
	 */
	public String avaliarArvore(){
		return avaliarArvore(expressao.getRaiz());
	}
	
	/**
	 * Se a equacao possuir apenas inteiros faz os calculos em ambos os lado dela
	 * @param root a raiz da arvore
	 * @return uma string com os resultados de cada lado da equação
	 */
	private String avaliarArvore(BTNode root){
		if (root!=null){
			double vEsq,vDir;
			if (root.getValue().equals("=")){
				return avaliarArvore(root.getEsq())+"="+avaliarArvore(root.getDir());
			}else if (!Funcoes.isInteger(root.getValue())){
				vEsq=Double.parseDouble(avaliarArvore(root.getEsq()));
				vDir=Double.parseDouble(avaliarArvore(root.getDir()));
				if(root.getValue().equals("+")){
					return String.valueOf(vEsq+vDir);
				}else if (root.getValue().equals("-")){
					return String.valueOf(vEsq-vDir);
				}else if (root.getValue().equals("±")){
					return String.valueOf(vEsq+vDir);
				}else if (root.getValue().equals("*")){
					return String.valueOf(vEsq*vDir);
				}else if (root.getValue().equals("/")){
					//evitar divisão por zero
					if (vDir==0)return "0";
					return String.valueOf(vEsq/vDir);
				}else if (root.getValue().equals("^")){
					return String.valueOf(Math.pow(vEsq, vDir));
				}else return String.valueOf(Math.sqrt(vEsq));
			}else return String.valueOf(Double.parseDouble(root.getValue()));
		}else{
			if (root.getPai().getValue().equals("*") || root.getPai().getValue().equals("/"))return "1";
			else return "0";
		}
	}
	
	/**
	 * Use para indicar que esta Expression sera utilizaa na deteccao do 
	 * proximo passo de resolucao, desta forma nao serao utilizadas
	 * as regras "Calculo" e "Soma Subtracao subarvores diferentes" 
	 */
	public void useForHints(){
		useForHints=true;
	}
	
	/**
	 * Verifica se o atributo useForHints esta ativo ou nao.
	 * @return <code>true</code> se a atributo useForHints estiver ativo
	 * e false caso contrario
	 */
	public boolean isHint(){
		return useForHints;
	}
	
	public String toString(){
		return cleanExpression;
	}
	
	public boolean isRootMMC(){
		return expressao.getRaiz().getValue().equals("/");
	}
	
	public void setIDNodes(BTNode bt){
		setIDNodes(bt, 0);
	}
	
	private int setIDNodes(BTNode bt, int id){
		if (bt!=null){
			if (bt.eFolha() || bt.getValue().equals("^") ||bt .getValue().equals("/") || bt.getValue().equals("R")){
				bt.setIDTermo(id);
				id++;
			}else{
				id = setIDNodes(bt.getEsq(), id);
				id = setIDNodes(bt.getDir(), id);
			}
		}
		return id;
	}
	
	/**
	 * Varre a arvore e retorna o primeiro nodo abstract
	 * @return o primeiro nodo abstract
	 */
	public BTNode getAbstract(){
		return expressao.getAbstract();
	}
	
	public static boolean hasIncognita( BTNode root){
		boolean has= false;
		if (root!=null){
			has=hasIncognita(root.getEsq());
			if (!has){
				if (Funcoes.isInc(root.getLast())) has=true;
				else has=hasIncognita(root.getDir());
			}
		}
		return has;
	}
	
	/**
	 * Varre a arvore de expressões e remove termos abstratos simples como:
	 *  x=-(9) => x=-9 ou x=-(12)/(19) => x=(-12)/(19), x é uma expressao qualquer.
	 *  Termos abstratos mais complexos como x=-(x-1) são mantidos.
	 */
	public void removeSimpleAbstractTerm(){
		List<BTNode> abs = expressao.getAllAbstract();
		BTNode notABS,result,den=null;
		boolean fraction=false;
		for (BTNode a: abs){
			//o abstract node SEMPRE é o nodo da esquerda da multiplicação abstract
			notABS= a.getDir();
			if (notABS.eFolha() || 
					(Funcoes.isSquaredLeaf(notABS) && !notABS.getValue().equals("R"))||
					(Funcoes.isSingleFraction(notABS) && !notABS.getEsq().getValue().equals("R"))){
				
				if (Funcoes.isSingleFraction(notABS)){
					den= notABS.getDir(); //pega o denominador
					notABS=notABS.getEsq(); //pega o numerador
					
					fraction=true;
				}
				a.setAbstractTerm(false);
				//não necessita de tratamento para "squaredleaf" pois getResult já trata isto
				
				result=MiscFunctions.getResult(new BTNode ("*",(BTNode)a.getEsq().clone(),(BTNode)notABS.clone()));
				a.setEsq(null);
				a.setDir(null);
				if (fraction){
					a.setValue("/");
					a.setEsq(result);
					a.setDir(den);
				}else{
					BTNode esq= result.getEsq();
					BTNode dir= result.getDir();
					result.setEsq(null);
					result.setDir(null);
					a.setValue(result.getValue());
					a.setEsq(esq);
					a.setDir(dir);
				}
			}
		}
		setmod();
	}
	
	
	/*private int setIDNodes(BTNode bt, int id){
		if (bt!=null){
			id = setIDNodes(bt.getEsq(), id);
			if (bt.eFolha()){
				bt.setIDTermo(id);
				id++;
			}
			id = setIDNodes(bt.getDir(), id);
		}
		return id;
	}*/
//	public static void main(String[] args) throws InvalidValueException {
//		Expression e=new Expression("x=(-b+(((-12^2)-((4*1)*36)))R2)/(2*a)");
//		System.out.println(e);
//		Expression e1=new Expression("((1/((x*(x-1)^2)*(x+1)))+(1/(4*(x-1)*((x+1)^3))))=0");
//		Expression e2=new Expression("6x-17=13*(x-1)-4");
//		Expression e3=new Expression("5x=12x+49");
//		Expression e4=new Expression("((x+1)*(x+2))/(20x*(x+1))=20+5");
//		Expression e5=new Expression("(x+6)/x=-7");
//		Expression e6=new Expression("(x+2)/(x+1)=2x/(x-4)");
//		Expression e7=new Expression("(2-x)/3+1/5=3/2");
//		Expression e8=new Expression("(2-x)/x+1/x^2=3/x");
//		Expression e9=new Expression("(x^2)/x=1");
//		Expression e10=new Expression("(x+2)/(x-2)+(x-2)/(x+2)=1");
//		Expression e11=new Expression("(4x^2)=2");
//		Expression e12=new Expression("x=2/(3*5R2)");
//		Expression e13=new Expression("x=(2R2)/((3R2)-(2R2))");
//		Expression e14=new Expression("((1x^2)+4x)=-12");
//		Expression e15=new Expression("3/((x^2)-4)+1/(x-3)=0");
//		Expression e16=new Expression("x=x+(x+((x^2)-(-3R2)))");
//		System.out.println(e1.getExp().getCleanExpression());
//		System.out.println(e2.getExp().getCleanExpression());
//		System.out.println(e3.getExp().getCleanExpression());
//		System.out.println(e4.getExp().getCleanExpression());
//		System.out.println(e5.getExp().getCleanExpression());
//		System.out.println(e6.getExp().getCleanExpression());
//		System.out.println(e7.getExp().getCleanExpression());
//		System.out.println(e8.getExp().getCleanExpression());
//		e9.inverteSinalArvore();
//		System.out.println(e9.getExp().getCleanExpression());
		/*System.out.println(e10.getExp().getCleanExpression());
		System.out.println(e11.getExp().getCleanExpression());
		System.out.println(e12.getExp().getCleanExpression());
		System.out.println(e13.getExp().getCleanExpression());
		System.out.println(e14.getExp().getCleanExpression());
		System.out.println(e15.getExp().getCleanExpression());
		System.out.println(e16.getExp().getCleanExpression());*/
//	}
	
}
