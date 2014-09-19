package pat2math.expressao.arvore;

import java.io.IOException;
import java.util.Vector;

import pat2math.util.Funcoes;


/**
 * Classe que descreve o nó da arvore de expressão
 * @author Henrique M. Seffrin
 *
 */
public class BTNode implements Cloneable{

	//Atribui um id para o termo da equação, este é atrbuido com base na ordem da equerda para a direita
	// o clone copia este id 
	private int idTermo;
	private BTNode esq,dir,pai;
	private String val;
	/*
	 *  true armazena um valor que deve ser convertido ao ser exibido
	 * ex: -(-3x) => -1*(-3x)
	 */ 
	private boolean abstractTerm;
	
	/**
	 * Constroi um nó sem filhos
	 * @param v o valor do nó
	 */
	public BTNode (String v){
		val=v;
		esq=dir=pai=null;
		idTermo=-1;
	}
	
	/**
	 * Constroi um nó sem filhos
	 * @param v o valor do nó
	 */
	public BTNode (int v){
		this(String.valueOf(v));
	}
	
	/**
	 * Cria um objeto do tipo BTNode
	 * @param v o valor deste BTNode
	 * @param aT se o BTNode irá armazenar nodo que não será mostrado ao usuário
	 */
	public BTNode (String v, boolean aT){
		this(v);
		abstractTerm=aT;
	}
	
	/**
	 * Cria um objeto do tipo BTNode
	 * @param v o valor deste BTNode
	 * @param aT se o BTNode irá armazenar nodo que não será mostrado ao usuário
	 */
	public BTNode (int v, boolean aT){
		this(String.valueOf(v), aT);
	}
	/**
	 * Constroi um nó com filhos
	 * @param v o valor do nó
	 * @param e o nó-filho esquerdo
	 * @param d o nó-filho direito
	 */
	public BTNode (String v,BTNode e,BTNode d){
		val=v;
		idTermo=-1;
		setEsq(e);
		setDir(d);
	}
	
	/**
	 * Constroi um nó com filhos
	 * @param v o valor do nó
	 * @param e o nó-filho esquerdo
	 * @param d o nó-filho direito
	 */
	public BTNode(int v,BTNode e,BTNode d){
		this(String.valueOf(v), e, d);
	}
	
	/**
	 * Cria um obejto do tipo BTNode
	 * @param v a {@link String} do valor do nodo
	 * @param e o nodo esquerdo
	 * @param d o nodo direito
	 * @param aT se o BTNode irá armazenar nodo que não será mostrado ao usuário
	 */
	public BTNode (String v, BTNode e, BTNode d,boolean aT){
		this(v, e, d);
		setAbstractTerm(aT);
	}
	
	public BTNode (int v, BTNode e, BTNode d, boolean aT){
		this(String.valueOf(v), e, d, aT);
	}
	/**
	 * Insere um filho esquerdo no nó, ja houver um nó
	 * este será substituido
	 * @param e o nó-filho esquerdo
	 */
	public void setEsq(BTNode e){
		if (esq!=null)esq.pai=null;
		esq=e;
		if (e!=null)e.pai=this;
	}
	
	/**
	 * Insere um filho direito no nó, ja houver um nó
	 * este será substituido
	 * @param d o nó-filho direito
	 */
	public void setDir (BTNode d){
		if (dir!=null)dir.pai=null;
		dir=d;
		if (d!=null)d.pai=this;
	}
	
	/**
	 * Atualiza o valor do nó
	 * @param v o novo valor do nó
	 */
	public void setValue(String v){
		val=v;
		setAbstractTerm(abstractTerm);
	}
	
	/**
	 * Insere um valor inteiro nó,
	 * porém este é convetido para {@link String}
	 * @param v o valor a ser inserido.
	 */
	public void setValue(int v){
		setValue(v+"");
	}
	
	/**
	 * Responsável pela permissão ou não de atribuir
	 *  <code>true</code> a variavel abstractTerm
	 * @param aT o valor a ser atribuido a abstractTerm
	 * @return se for um nodo válido <code>true</code> senão
	 * <code>false</code> mesmo que aT seja <code>true</code>.
	 */
	public void setAbstractTerm(boolean aT){
		if (aT){
			if (val.equals("-1")&& this.ehFilhoEsq())abstractTerm= true;
			else if (val.equals("*") && this.getEsq().isAbstract())abstractTerm= true;
			else if (val.equals("0") && this.getPai()!=null && this.getPai().getValue().equals("±"))abstractTerm=true;
		}else abstractTerm= false;
	}
	
	public static BTNode insereArvore(BTNode no1,BTNode no2, String op){
		BTNode no3;
		no3=new BTNode (op,no2,no1);
		return no3;
	}
	/**
	 * verifica se o no é folha
	 * @return <code>true</code> se for folha e <code>false</code> caso contrario
	 */
		public boolean eFolha(){  
		if (esq==null && dir==null)return true;
		return false;
	}

	/**
	 * Obtem o valor do nó
	 * @return uma String contendo o valor do nó
	 */
	public String getValue(){
		return val;
	}
	
	/**
	 * Obtem o id do termo
	 * @return um inteiro com o id do termo
	 */
	public int getIDTermo(){
		return idTermo;
	}
	
	/**
	 * Atribui um valor numérico para identificar o termo da equação
	 * @param id um valor inteiro contendo o id do termo
	 */
	public void setIDTermo(int id){
		this.idTermo=id;
	}
	
	/**
	 * Obtêm o pai deste nó
	 * @return o nó-pai deste nó
	 */
	public BTNode getPai(){
		return pai;
	}
	
	/**
	 * Obtêm o filho esquerdo deste nó
	 * @return o nó filho equerdo deste nó
	 */
	public BTNode getEsq(){
		return esq;
	}
	
	/**
	 * Obtêm o filho direito deste nó
	 * @return o nó filho direito deste nó
	 */
	public BTNode getDir(){
		return dir;
	}
	
	public static void infixado (BTNode nodo) throws IOException{
		if(nodo!=null){
			infixado(nodo.esq);
			if (nodo.eFolha()==true){
			}
			infixado(nodo.dir);
		}
	}
	
	/**
	 * Clona este nó bem como os filhos.
	 */
	@Override
	public Object clone(){
		if (this==null)return null;
		BTNode esq,dir;
		boolean aTE=false; //abstract term Esq
		boolean aTD=false; // abstract term Dir
		esq=this.getEsq();
		dir=this.getDir();
		if (esq!=null){
			if (esq.isAbstract())aTE=true;
			esq=(BTNode)esq.clone();
		}
		if (dir!=null){
			if (esq.isAbstract())aTD=true;
			dir=(BTNode)dir.clone();
		}
		BTNode clone=new BTNode(this.getValue(),esq,dir,this.abstractTerm);
		clone.setIDTermo(this.idTermo);
		if (aTE)clone.getEsq().setAbstractTerm(true);
		if (aTD)clone.getDir().setAbstractTerm(true);
		return clone;
	}
	
	/**
	 * Clona o vetor e os objetos contidos nele
	 * @param v o Vector a ser clonado
	 * @return o clone do Vector v
	 */
	@SuppressWarnings("unchecked")
	public static Vector<BTNode> clone(Vector<BTNode> v){
		BTNode temp;
		v=(Vector<BTNode>)v.clone();
		for (int i=0;i<v.size();i++){
			temp=(BTNode)v.remove(i).clone();
			v.add(i, temp);
		}
		return v;
	}
	
	/**
	 * Verifica se este nó é igual a <code>obj</code>.
	 * <p><b>Não foi sobreeposto o método equals() da classe object, pois 
	 * este é necessário.</b>
	 * @param obj outro objeto a ser comparado
	 * @return <code>true</code> se forem iguais e <code>false</code> caso contrario.
	 */
	public boolean igual(Object obj) {
		if (obj instanceof BTNode){
			if (this==obj){
				return true;
			}
			BTNode b=(BTNode)obj;
			String value=this.getValue();
			String valueObj=b.getValue();
			//trata 1x e x
			if (value.length()==2 && Funcoes.isInc(this.getLast())&& value.startsWith("1"))value=String.valueOf(this.getLast());
			if (valueObj.length()==2 && Funcoes.isInc(b.getLast())&& valueObj.startsWith("1"))valueObj=String.valueOf(this.getLast());
			if (valueObj.equals(this.getValue())) return true;
		}
		return false;
	}
	
	/**
	 * Verifica se este nó é filho esquerdo do nó-pai
	 * @return <code>true</code> se sim e <code>false</code> caso contrário
	 */
	public boolean ehFilhoEsq(){
		if (pai!=null && pai.getEsq()!=null && pai.getEsq().equals(this))return true;
		return false;
	}
	
	/**
	 * Verifica se este nó é filho esquerdo de <code>pai</code>
	 * @param pai um nó que está acime deste nó
	 * @return <code>true</code> se sim e <code>false</code> caso contrário
	 */
	public boolean ehFilhoEsq(BTNode pai){
		if (pai==null)return false;
		if (pai.getEsq().equals(this))return true;
		else{
			BTNode temp=this;
			while(!temp.ehFilho(pai) && temp.getPai()!=null){
				temp=temp.getPai();
			}
			if (temp.ehFilhoEsq())return true;
			else return false;
		}
	}
	
	/**
	 * Verifica se este nó é filho direito do nó-pai
	 * @return <code>true</code> se sim e <code>false</code> caso contrário
	 */
	public boolean ehFilhoDir(BTNode pai){
		if (pai==null)return false;
		if (pai.getDir().equals(this))return true;
		else{
			BTNode temp=this;
			while(!temp.ehFilho(pai) && temp.getPai()!=null){
				temp=temp.getPai();
			}
			if (temp.ehFilhoDir())return true;
			else return false;
		}
	}
	
	/**
	 * Verifica se este nó é filho direito de <code>pai</code>
	 * @return <code>true</code> se sim e <code>false</code> caso contrário
	 */
	public boolean ehFilhoDir(){
		if (pai!=null && pai.getDir()!=null && pai.getDir().equals(this))return true;
		return false;
	}
	
	/**
	 * Verifica se o nó é filho de <code>pai</code>
	 * @param pai um nó um nível acima deste
	 * @return <code>true</code> se sim e <code>false</code> caso contrário
	 */
	public boolean ehFilho(BTNode pai){
		if (this.getPai()==null)return false;
		if (this.getPai().equals(pai))return true;
		return false;
	}
	
	/**
	 * Verifica se o nó é filho de <code>pai</code>
	 * @param pai um nó em qualque nivel nível acima deste
	 * @return <code>true</code> se sim e <code>false</code> caso contrário
	 */
	public boolean filhoDe(BTNode pai){
		if (pai!=null){
			BTNode temp=this;
			while(temp.getPai()!=null && !temp.ehFilho(pai)){
				temp=temp.getPai();
			}
			if (temp.ehFilho(pai))return true;
			return false;
		}
		return false;
	}
	/**
	 * Obtem um nodo acima de <code>nodo</code>, ou ele mesmo, que possua <code>x</code>
	 * @param x o conteudo no nodo a ser buscado
	 * @return o BTNode correspondente se foi encontrado, ou null
	 * caso contrário
	 */
	public BTNode getNodeX(String x){
		if (pai==null)return null;
		else{
			if (this.getValue().equals(x))return this;
			BTNode p=pai;
			while(p!=null && !p.getValue().equals(x)){
				p=p.getPai();
			}
			return p;
		}
	}

	/**
	 * Obtem o último caracter do valor do nodo, utilizado
	 * geralmente para obter a incognita do nodo.
	 * @return o ultimo caracter do valor do nodo ou 0 se este for
	 * <code>null</code> ou vazio(length()==0).
	 */
	public char getLast(){
		String s=this.val;
		if (s!=null && (s.length()>0)) return s.charAt(s.length()-1);
		else return (char) 0;
	}
	
	/**
	 * Obtêm o primero caracter do valor do nodo, 
	 * utilizado geralmente para obter o sinal do nodo,se este tiver.
	 * @return o primero caracter do valor do nodo ou 0 se este for
	 * <code>null</code> ou vazio(length()==0).
	 */
	public char getFirst(){
		String s=this.val;
		if (s!=null && (s.length()>0)) return s.charAt(0);
		else return '0';
	}
	
	/**
	 * Converte,se possivel, o valor do BTNode para inteiro.
	 * @return um int contendo o valor do nodo
	 * @throws NumberFormatException caso o não
	 * seja possivel converte para inteiro.
	 */
	public int getIntValue(){
		return Integer.parseInt(val);
	}
	
	/**
	 * Verifica se o nodo pertence a uma distributiva
	 * @return <code>true</code> se pertencer e false caso contrario
	 */
	public boolean pertDistributiva(){
		BTNode n;
		if (this.getValue().equals("*"))n=this;
		else n=this.getNodeX("*");
		if (n==null)return false;
		if (n.getEsq().eFolha() || n.getDir().eFolha())return true;
		else if (!n.getEsq().eFolha() || n.getDir().eFolha()) return true;
		else if (n.getEsq().eFolha() || !n.getDir().eFolha()) return true;
		else return false;
	}
	
	/**
	 * Verifica se o nodo contém um termo abstrato
	 * @return <code>true</code> se tiver e <code>false</code> caso contrario
	 */
	public boolean isAbstract(){
		return abstractTerm;
	}
	
	public String toString(){
		return val;
	}
}
