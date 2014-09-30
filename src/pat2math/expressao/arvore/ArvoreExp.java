package pat2math.expressao.arvore;

import java.util.ArrayList;
import java.util.EmptyStackException;
import java.util.List;
import java.util.Stack;

import pat2math.expressao.Expression;
import pat2math.util.Funcoes;
import pat2math.util.Symbols;
import pat2math.util.TabelaSimbolos;

/**
 * Classe responsavel pela construção da uma arvore de expressao
 * a partir de uma expressão posfixa
 * @author Henrique M. Seffrin
 * @version 1.0,13/12/2008
 *
 */
public class ArvoreExp {
	
	private BTNode root;
	
	/**
	 * Obtem a raiz da arvore
	 * @return o <code>BTNode</code> contendo a raiz da arvore
	 */
	public BTNode getRoot(){
		return root;
	}
	
	
	public ArvoreExp(String exp) throws InvalidValueException{
		this.buildTree(exp);
	}
	
	public ArvoreExp(BTNode root){
		this.root=root;
	}
	/**
	 * Constroi a arvore de expressão
	 * @param exp
	 * @throws InvalidValueException
	 */
	public void buildTree(String exp) throws InvalidValueException{
		TabelaSimbolos tabela=new TabelaSimbolos();
		Infix2PosFix inf=new Infix2PosFix();
		exp=exp.replace(" ", "");
		exp=Expression.trocaSinalMenos(exp);
		String valor="";
		int ini=0;
		int fim=0;
		String newExp="";
		/*
		 * Converte os elementos da equação para simbolos
		 * para que se possa representar um termo com apenas um 
		 *  simbolo, ex: 2x=4 -> A=B
		 */
		while(fim<exp.length()){
			valor=String.valueOf(exp.charAt(fim));
			if (valor.equals("(") || valor.equals(")")){
				fim++;
				newExp+=valor;
				ini=fim;
			}else{
				if (Funcoes.isOp(valor)){
					fim++;
					newExp+=valor;
					ini=fim;
				}else{
					while(fim<exp.length()&& (isValidSymbol(valor)||
							inf.isDigit(valor.charAt(0)))){
						fim++;
						if (fim<exp.length())valor=String.valueOf(exp.charAt(fim));
					}
					tabela.add(exp.substring(ini, fim));
					newExp+=tabela.getLastSymbol();
					ini=fim;
				}
			}
		}
		inf.setInfixa(newExp);
		inf.converter(); //converte para a notação posfixa
		newExp=inf.getPosfixa();
		fim=0;
		valor="";
		Stack<BTNode> pilha= new Stack<BTNode>();
		String aux;
		BTNode esq,dir;
		if (newExp.contains("(") || newExp.contains(")")){
			throw new InvalidEquationException("Equação Inválida","Número desigual de parenteses");
		}
		/*
		 * Inicia a contrução da arvore segundo o livro:
		 * Estuturas de dados em Java, Lafore
		 */
		try{
		while(fim<newExp.length()){
			valor=String.valueOf(newExp.charAt(fim));
			if(inf.isDigit(valor.charAt(0))){
				aux=tabela.getOriginal(valor.charAt(0));
				aux=aux.replace("_", "-");
				if (aux.contains("$")){
					aux=aux.replace("$", "0");
					pilha.push(new BTNode(aux,true));
				}
				else if (aux.contains("?")){
					aux=aux.replace("?", "-1");
					pilha.push(new BTNode (aux,true));
				}else pilha.push(new BTNode (aux));
				fim++;
			}else if (Funcoes.isOp(valor)){
				dir=pilha.pop();
				esq=pilha.pop();
				if ((esq.isAbstract() && esq.eFolha()) || 
						(dir.isAbstract()&& dir.eFolha()))pilha.push(new BTNode (valor,esq,dir,true));
				else pilha.push(new BTNode (valor,esq,dir));
				fim++;
			}
		}
		root=pilha.pop();
		}catch(EmptyStackException ese){
			throw new InvalidValueException("Equação Inválida");
		}
	}
	
	/**
	 * Deleta a arvore
	 */
	public void clear(){
		clear(root);
		root=null;
	}
	
	/**
	 * Seta uma nova arvore para esse objeto
	 * @param root a raiz da nova arvore
	 */
	public void setNewRoot(BTNode root){
		this.root=root;//Funcoes.reverteTrocaSinalARV(root);
	}
	
	/**
	 * Percorre a arvore (esq-dir-raiz) e vai apagando nodo por nodo
	 * @param root a raiz da arvore
	 */
	private void clear(BTNode root){
		if (root!=null){
			clear(root.getEsq());
			clear(root.getDir());
			root.setValue(null);
			root.setEsq(null);
			root.setDir(null);
		}
	}
	
	/**
	 * Verifica se os simbolos da expressão são validos na equação
	 * @param symbol o simbolo a ser verificado
	 * @return <code>true</code> se for valido e <code>false</code>
	 * caso contrário
	 */
	private boolean isValidSymbol(String symbol){
		if (symbol.equals("_"))return true;
		if (symbol.equals("?"))return true;
		if (symbol.equals("$"))return true;
		else if (Funcoes.isInteger(symbol))return true;
		else if (Funcoes.isInc(symbol))return true;
		return false;
	}
	
	/**
	 * Exibe a arvore na tela
	 */
	public void displayTree() {
    	if (root==null) {
    		System.out.println("Arvore vazia!");
    		return;
    	}
		String separator = String.valueOf("  |__");
		System.out.println(this.root.getValue());
		displaySubTree(root.getEsq(),  separator);
		displaySubTree(root.getDir(), separator);
	}
	
	 /**
	  * Exibe na tela as subarvores
	  * @param node 
	  * @param separator
	  */
	private void displaySubTree(BTNode node, String separator) {
		
		if (node != null) {
			
			BTNode father = node.getPai();
			if (node.equals(father.getEsq()) == true) {
				System.out.println(separator+node.getValue()+" (ESQ)");
			}else{
				System.out.println(separator+node.getValue()+" (DIR)");
			}
			
			
			displaySubTree(node.getEsq(),  "     "+separator);
			displaySubTree(node.getDir(), "     "+separator);
		}
	}
	
	/**
	 * Gera uma expressão apartir de uma arvore de expressão
	 * @param r nodo pelo qual se começa a busca
	 * @return a expressão que originou a arvore
	 */
	public String getExpression(BTNode r){
		String e="";
		if (r!=null){
			if (!r.eFolha()&& !r.equals(root))e+="(";
			e+=getExpression(r.getEsq());
			if (r.eFolha() && r.getValue().startsWith("-") && r.ehFilhoDir() && !r.isAbstract()){
				e+="("+r.getValue()+")";
			}else if (r.isAbstract()){
				if (r.eFolha() && r.getFirst()=='-')e+="-";
			}else{
				//Teste parae eliminar o sinal de * quando um valor for abstrato
				if (!(r.getValue().equals("*") &&
						(r.getEsq().isAbstract() || r.getDir().isAbstract())))e+=r.getValue();
			}
			e+=getExpression(r.getDir());
			if (!r.eFolha() && !r.equals(root))e+=")";
		}
		return e;
	}
	
	/**
	 * Obtem equação com o mínimo de parenteses possivel
	 * @return uma String contendo a repreasentação literal da
	 * arvore de expressões, com um número minimo de parenteses
	 */
	public String getCleanExpression(){
		return getCleanExpression(root);
	}
	
	/**
	 * Obtem a expressão em formato TeX
	 * @return uma String contendo a representação literal
	 * da equação em formato TeX
	 */
	public String getTexExpression(){
		return Symbols.getTeXEquation(root);
	}
	/**
	 * Gera uma String contendo a equação mais "limpa", ou seja,
	 * com menos parenteses
	 * @param r a raiz da arvore
	 * @return uma String contendo a equação
	 */
	public  String getCleanExpression(BTNode r){
		String e="";
		boolean par=false;
		boolean rep=false;// replace= substitui a+(-bx) por a-bx
		if (r!=null){
			if (r.getPai()!=null){
				BTNode pai=r.getPai();
				String value=r.getValue();
				if (pai.getValue().equals("*")&& !r.isAbstract()) {
					if (!r.eFolha() && !value.equals("^")&&
							!value.equals("R") && !value.equals("*")
							&& !value.equals("/"))par=true;
					else if (r.getValue().startsWith("-"))par=true;
					//filho negativo direito de multiplicação parentesis
					else if (Funcoes.getMaisAEsquerda(r).getValue().startsWith("-"))par=true;
					//não é necessario parenteses na raiz e na potenciapois as proprias ja possui o peranteses
				}else if (!r.getValue().equals("^")&&
						!r.getValue().equals("R") &&
						Funcoes.getMaisAEsquerda(r).getValue().startsWith("-") &&
						r.ehFilhoDir())par=true;
				else if(pai.getValue().equals("/")){
					/*if (!r.eFolha())*/par=true;
				}else if (pai.getValue().equals("^") &&
						r.ehFilhoEsq() && 
					(((r.eFolha() && r.getValue().startsWith("-"))) ||
					!r.eFolha())){
					if (r.ehFilhoEsq())par=true;
				}else if (pai.getValue().equals("R")){
					if (r.ehFilhoEsq())par=true;
				}else if (!r.eFolha() &&r.getDir().eFolha() && r.getValue().equals("+")&& r.getDir().getValue().startsWith("-")){
					rep=true;
				}
			}else par=false;
			if (par)e+="(";
			e+=getCleanExpression(r.getEsq());
			if (r.isAbstract()){
				if (r.eFolha()&& r.getFirst()=='-')e+="-";
			}else{
				if (!(r.getValue().equals("*") &&
						(r.getEsq().isAbstract()||r.getDir().isAbstract())))e+=r.getValue();
			}
			if (rep){
				e=e.substring(0,e.length()-1);
				String temp=getCleanExpression(r.getDir());
				temp=temp.substring(1,temp.length()-1);
				e+=temp;
			}else e+=getCleanExpression(r.getDir());
			
			if (par)e+=")";
		}
		return e;
	}
	
	public static void main(String[] args) throws InvalidValueException {
		Expression e=new Expression("8x+(-7x)+7x=18");
		System.out.println(e.getCleanExpression());
	}

	
	/**
	 * Obtem a expressao que representa a atual arvore
	 * @return uma String com a expressão
	 */
	public String getExpression(){
		return getExpression(root);
	}
	
	/**
	 * Retorna o nivel de determinado nó
	 * @param chave o nó que se deseja descobrir o nível
	 * @return um int contendo o nível do nó, onde a raiz possui nível 1.
	 */
	public int getNivel(BTNode chave){
		return getNivel(root, chave, 1);
	}
	
	/**
	 * Obtém o nivel de um nodo na arvore
	 * @param p o nodo raiz
	 * @param chave a chave do nodo que se deseja descobrir o nível
	 * @param h a altura incial
	 * @return um int contendo o nível do nodo
	 */
	public int getNivel(BTNode p, BTNode chave, int h) {
		int l = -1;
		if (p.equals(chave))
			return h;
		if (p.getEsq() != null)
			l = getNivel(p.getEsq(), chave, h + 1);
		if (p.getDir() != null && l == -1)
			l = getNivel(p.getDir(), chave, h + 1);
		return l;
	}
	
	/**
	 * Obtem a altura da arvore a partir do no r
	 * @param r o no-raiz, no qula se iniciara a contagem da altura
	 * @return a altura da arvora 
	 */
	public static int getAltura (BTNode r){
		if (r==null) return -1;
		if (r.getValue().equals("^") || r.getValue().equals("R")) return 0;
		else{
			int esq=getAltura(r.getEsq());
			int dir=getAltura(r.getDir());
			if (esq<dir)return dir+1;
			else return esq+1;
		}
	}
	
	/**
	 * Obtem a raiz da arvore a partir do <code>nodo</code>
	 * @param nodo um nodo qualquer da arvore
	 * @return a raiz da arvore ao qual <code>nodo</code> pertence
	 */
	public static BTNode getRoot(BTNode nodo){
		while (nodo.getPai()!=null)nodo=nodo.getPai();
		return nodo;
	}
	
	/**
	 * Retorna o nodo que possui o sinal de "=" que é a raiz da arvore
	 * ou o filho esquerdo da mesma, no caso de uma operacao com MMC
	 * @return o {@link BTNode} contendo o sinal de "="
	 */
	public BTNode getSignalRoot(){
		if (root.getValue().equals("="))return root;
		else return root.getEsq();
	}
	
	
	/**
	 * Verifica se <code>no</code> está na subarvore <code>root</code>
	 * @param root a raiz da sub arvore
	 * @param no o nodo a ser buscado em <code>root</code>
	 * @return <code>true</code> se estiver e <code>false</code>
	 * caso contrário
	 */
	public boolean contains(BTNode root , BTNode no){
		if (root!=null && no!=null){
			if (root.equals(no))return true;
			else{
				boolean b=contains(root.getEsq(),no);
				if (b==false)b=contains(root.getDir(),no);
				return b;
			}
		}
		return false;
	}
	
	/**
	 * Verifica se <code>no</code> está na subarvore <code>root</code>
	 * @param no o no a ser buscado
	 * @return <code>true</code> se estiver e <code>false</code>
	 * caso contrário
	 */
	public boolean contains(BTNode no){
		return contains(root, no);
	}
	
	/**
	 * Retorna a raiz orginal da arvore, ou seja, o no que não
	 * possui pai
	 * @return o no original da arvore
	 */
	public BTNode getRaiz(){
		if (root.getPai()==null) return getRoot();
		else {
			BTNode r=root;
			while (r.getPai()!=null){
				r=r.getPai();
			}
			return r;
		}
	}
	
	
	/**
	 * Obtem o nó pai de todos o nós da <code>List</code>
	 * @param node a List de nós
	 * @return o no pai de todos os nos da <code>List</code> 
	 */
	public static BTNode getRaiz(List<BTNode> node){
		if (!node.isEmpty()){
			ArrayList<BTNode> folhas=new ArrayList<BTNode>(node.size());
			for(int cont=0;cont<node.size();cont++){
				folhas.add(cont, node.get(cont));
			}
			int i=0;
			BTNode no1,no2;
			while (folhas.size()>1){
				no1=folhas.get(i);
				no1=no1.getPai();
				no2=folhas.get(i+1);
				no2=no2.getPai();
				if (no1==no2)folhas.remove(i+1);
				else folhas.set(i+1, no2);
				folhas.set(i, no1);
				i++;
			}
			return folhas.get(0);
		}
		return null;
	}
	
	/**
	 * Varre a arvore e retorna o primeiro nodo abstract
	 * @return o primeiro nodo abstract
	 */
	public BTNode getAbstract(){
		return getAbstract(root);
	}
	
	private BTNode getAbstract(BTNode bt){
		BTNode abst=null;
		if (bt!=null){
			abst=getAbstract(bt.getEsq());
			if (abst==null){
				if (bt.isAbstract() && bt.eFolha())abst=bt;
				if (abst==null)abst=getAbstract(bt.getDir());
			}
		}
		return abst;
	}
	
	/**
	 * Obtem todas as subarvoere abstract da equação
	 * @return uma {@link List} contendo a raiz destas subarvores.
	 */
	public List<BTNode> getAllAbstract(){
		return getAllAbstract(root, new ArrayList<BTNode>());
	}
	
	private List<BTNode> getAllAbstract(BTNode bt, List<BTNode> list){
		if (bt!=null){
			list=getAllAbstract(bt.getEsq(),list);
			if (bt.isAbstract() && !bt.eFolha())list.add(bt);
			list=getAllAbstract(bt.getDir(),list);
		}
		return list;
	}
	
}
