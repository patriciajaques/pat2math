package pat2math.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Stack;
import java.util.Vector;
import java.util.concurrent.CopyOnWriteArrayList;

import pat2math.expressao.Expression;
import pat2math.expressao.arvore.ArvoreExp;
import pat2math.expressao.arvore.BTNode;
import pat2math.expressao.arvore.BTNodeComparator;
import pat2math.expressao.arvore.InvalidValueException;
import pat2math.regras.MiscFunctions;

/**
 * Classe que agrega todas as funções comuns ao conjuto de regras
 * propriedades, ao conjunto de regras expressao, de
 * manipulação da arvore e outras funções comuns a várias classes
 * @author Henrique M. Seffrin
 * @version 1.0, 19/12/2008
 * @since JDK1.6
 *
 */
public class Funcoes {
	
	public static final int[] PRIMOS={2,3,5,7,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97};
	
	/**
	 * Verifica se op é um operador aritmetico ou não
	 * @param op a String a ser avaliada
	 * @return <code>true</code> se op for um operador e <code>false</code> caso contrário
	 */
	public static boolean isOp(String op){
		if (op.equals("+")||op.equals("-")||op.equals("*")||op.equals("/")||op.equals("=")
				||op.equals("^")||op.equals("R")||op.equals("±")){
			return true;
		}else
			return false;
	}
	
	/**
	 * Verifica se op é um operador aritmético ou não
	 * @param op o char a ser avaliado
	 * @return <code>true</code> se for um operador válido ou <code>false</code> caso contrario
	 */
	public static boolean isOp(char op){
		return isOp(String.valueOf(op));
	}
	
	
	/**
	 * Obtem os valores que são diferetes em str1 e str2
	 * @param str1 um string a ser comparada
	 * @param str2 outra string a ser comparada
	 * @return geralmente o valor de cada string menos a incognita, se esta for igual
	 * ou null caso contrario
	 */
	public static String[] diferenca(String str1, String str2){
		if (str1.equals(str2))return null;
		else{
			int v1=str1.length()-1;
			int v2=str2.length()-1;
			if (isInc(String.valueOf(str1.charAt(v1))) &&isInc(String.valueOf(str2.charAt(v2)))){
				if(str1.charAt(v1)==str2.charAt(v2)){
					str1=str1.substring(0,v1);
					if (str1.equals(""))str1="1";
					str2=str2.substring(0,v2);
					if (str2.equals(""))str2="1";
				}
			}else{
				if (isInc(String.valueOf(str1.charAt(v1))))v1--; //o limite da substring passa a ser a 
				//casa antes da incognita, garantino ja ela na diferenca
				if (isInc(String.valueOf(str2.charAt(v2))))v2--;
				//verifica se a parte inteira é igual em caso opositivo so retona a incognita
				if (str1.substring(0,v1).equals(str2.substring(0,v2))){
					str1=str1.substring(v1+1);
					str2=str2.substring(v2+1);
				}
			}
			return new String []{str1,str2};
		}
	}
	
	/**
	 * Verifica se a inc é uma incógnita válida na expressão
	 * @param inc a incógnita a ser verificada
	 * @return <code>true</code> se for uma incógnita 
	 * e <code>false</code> caso contrário
	 */
	public static boolean isInc(String inc){
		if (inc.equals("x") || inc.equals("d"))return true;
		return false;
	}
	
	/**
	 * Verifica se a inc é uma incógnita vólida na expressão
	 * @param inc a incógnita a ser verificada
	 * @return <code>true</code> se for uma incógnita e
	 *  <code>false</code> caso contrário
	 */
	public static boolean isInc(char inc){
		return isInc(String.valueOf(inc));
	}
	
	
	public static boolean isSquaredInc(BTNode bt){
		if (bt.getValue().equals("^") && bt.getDir().getValue().equals("2") &&
				isInc(bt.getEsq().getLast()))return true;
		else return false;
	}
	/**
	 * Verifica se uma String é um valor inteiro ou não
	 * @param val a String a ser avaliada
	 * @return <code>true</code> se for inteira e
	 *  <code>false</code> caso contrário
	 */
	public static boolean isInteger(String val){
		try{
			Integer.parseInt(val);
			return true;
		}catch (NumberFormatException e){
			return false;
		}
	}
	
	/**
	 * Verifica se uma String é um valor inteiro ou não
	 * @param val o char a ser avaliado
	 * @return <code>true</code> se for inteira e
	 *  <code>false</code> caso contrário
	 */
	public static boolean isInteger(char val){
		return isInteger(String.valueOf(val));
	}
	
	/**
	 * Obtem o último caracter de uma String. 
	 * @param s a String cujo ultimo caracter será retornado
	 * @return o ultimo caracter de s
	 */
	public static char getLast(String s){
		if (s!=null && (s.length()>0)) return s.charAt(s.length()-1);
		else return (char) 0;
	}
	
	/**
	 * Obtêm o primeiro caracter de uma String ;
	 * @param s a String cujo primero caracter deve ser retronado
	 * @return o primeiro caracter se s ou 0 se a strign fora vazia ou null
	 */
	public static char getFirst(String s){
		if (s!=null && (s.length()>0)) return s.charAt(0);
		else return (char) 0;
	}
	/**
	 * Verifica <code>arv1</code> e <code>arv2</code> a fim de descobrir quem é pai de quem
	 * ou o no que é pai das duas
	 * @param e a <code>expression</code> que contem as subarvores
	 * @param arv1 uma das subarvores a ser verificada
	 * @param arv2 a outra subarvore a ser verificada
	 * @return o nodo pai comum entre <code>arv1</code> e <code>arv2</code>
	 */
	public BTNode verificaPai(Expression e,BTNode arv1, BTNode arv2){
		if (arv1!=null && arv2!=null){
			int altura1,altura2;
			altura1=e.getExp().getNivel(arv1);
			altura2=e.getExp().getNivel(arv2);
			if (altura1>altura2){
				return buscaPai(arv2,arv1);
			}else return buscaPai(arv1,arv2);
		}
		return null;
	}
	
	/**
	 * Verifica se <code>pai</code> é pai de <code>filho</code> ou não,
	 * em caso negativo, busca o pai em comum entre os dois nos
	 * @param pai o nodo que supostamente é pai de <code>filho</code>
	 * @param filho o nodo filho que se quer descobrir o pai
	 * @return o nodo pai de filho, ou o nodo pai tanto de <code>filho</code> 
	 * como de <code>pai</code> 
	 */
	public BTNode buscaPai(BTNode pai,BTNode filho){
		if (filho.getPai().equals(pai)){
			return pai;
		}else{
			boolean done=false;
			boolean achou=false;
			BTNode f=filho;
			while(!done){
				f=f.getPai();
				if (f.getPai()==null)done=true;
				else if (f.getPai().equals(pai)){
					done=true;
					achou=true;
				}
			}
			if (achou)return pai;
			else return buscaPai(pai.getPai(),filho);
		}
	}
	
	/**
	 * Percorre a arvore e trocando nos nodos onde há sinal "-" por
	 * um sinal "+" e pondo o sinal "-" junto com os valores
	 * das folhas direitas, caso ja haja sinal na folha 
	 * apenas remove o sinal do valor, visto que "-" com "-" é 
	 * "+".A troca somente é realizada se o filho direito for folha.
	 * @param root o no inicial de busca do metodo
	 */
	public void modificaSinal(BTNode root){
		if (root!=null && !root.eFolha()){
			if(!root.getValue().equals("^") &&!root.getValue().equals("R")){
				modificaSinal(root.getEsq());
				modificaSinal(root.getDir());
				BTNode dir;
				if (root.getPai()!= null &&
					(root.getValue().equals("/") || 
							root.getValue().equals("*"))&& 
					root.ehFilhoDir()&&
					root.getEsq().eFolha()){
					dir=root.getEsq();
					root=root.getPai();
				}else dir= root.getDir();
				if(dir.eFolha() && root.getValue().equals("-") && !dir.getValue().equals("0")){
					dir.setValue(trocaSinal(dir.getValue()));
					root.setValue("+");
				}
			}else if (!root.getValue().equals("R")){
				BTNode esq=root.getEsq();
				if (esq.eFolha()&& root.getPai().getValue().equals("-")&&
						root.getPai().getDir().equals(root)&&
						!esq.getValue().startsWith("-")){
					esq.setValue(trocaSinal(esq.getValue()));
					root.getPai().setValue("+");
				}
				//TODO: TEste de troca de sinal com potencia no numerador(simples) de fracão
				else if (esq.eFolha() && root.getPai().getValue().equals("/") &&
						root.getPai().getPai().getValue().equals("-") &&
						root.getPai().ehFilhoDir() &&
						!esq.getValue().startsWith("-")){
					esq.setValue(trocaSinal(esq.getValue()));
					root.getPai().getPai().setValue("+");					
				}//fim do teste
			}else if ((root.getValue().equals("R") || root.getValue().equals("^"))&&
						!root.getEsq().eFolha())modificaSinal(root.getEsq());
		}
	}
	
	/**
	 * Inverte o sinal de valor de + para - ou de - para +
	 * @param valor a String cujo sinal sera trocado
	 * @return uma String contendo o valor com o sinal trocado
	 */
	public static String trocaSinal(String valor){
		if (valor.length()>1 && 
			valor.startsWith("+"))valor=valor.substring(1);
		if (valor.startsWith("-")){
			if (valor.length()<=1)valor="+";
			else valor=valor.substring(1);
		}else{
			if (Funcoes.isOp(valor))valor="-";
			else valor="-"+valor;
		}
		return valor;
	}
	
	/**
	 * Trocao sinal de uma arvore toda ex: x-(x+1) fica x-(-x-1), 
	 * notar que o sinal de fora dos parentese deve ser trocado antes de chamar
	 * este metodo.
	 * @param r a arvore a ser mudada
	 * @return a arvore com o sinal trocado
	 */
	private BTNode trocaSinalArvore(BTNode r){
		if (r!=null && !r.eFolha()){
			if (!r.getValue().equals("^") && !r.getValue().equals("R")){
				r.setValue(trocaSinal(r.getValue()));
			}
			if (r.getEsq().eFolha()){
				r.getEsq().setValue(trocaSinal(r.getEsq().getValue()));
			}else r.setEsq(trocaSinalArvore(r.getEsq()));
			if (r.getDir().eFolha() &&(!r.getValue().equals("^") && !r.getValue().equals("R"))){
				if (r.getDir().getValue().startsWith("-")){
					r.getDir().setValue(trocaSinal(r.getDir().getValue()));
				}
			}else if (r.getValue().equals("-")){
				return trocaSinalArvore(r.getDir());
			}
		}
		return r;
	}
	
	/**
	 * Troca o sinal da arvore r recursivamente, enquanto o 
	 * sinal do nodo for "-"
	 * @param r a arvore cujo sinal deve ser trocado
	 * @return a arvore com os sinais trocadol
	 */
	public BTNode trocaSinalARV(BTNode r){
		if (r.getValue().equals("-")){
			r.setValue("+");
			r=trocaSinalArvore(r.getDir());
		}
		return r;
	}
	
	/**
	 * Busca o filho mais a esquerda de <code>root</code>
	 * @param root a raiz da arvore
	 * @return o filho mais a esquerda desse nodo
	 */
	public static BTNode getMaisAEsquerda(BTNode root){
		while(root!=null && !root.eFolha()){
			root=root.getEsq();
		}
		return root;
	}
	
	/**
	 * Verifica se <code>root</code> possui a propriedade distributiva
	 * @param root uma subarvore
	 * @return <code>true</code> se tiver distributiva e <code>false</code> caso contrario
	 */
	public static boolean ehDistributiva(BTNode root){
		if (root.getValue().equals("*") && !root.getEsq().eFolha() &&
			!root.getDir().eFolha() && !root.getEsq().getValue().equals("^") &&
			!root.getEsq().getValue().equals("^")){
			BTNode esq, dir;
			esq=root.getEsq();
			dir=root.getDir();
			if ((esq.getValue().equals("+") || esq.getValue().equals("-")) &&
				(dir.getValue().equals("+") || dir.getValue().equals("-"))){
					return true;
			}
		}else{
			BTNode folha=null,ramo=null;
			if(root.getEsq().eFolha() || root.getValue().equals("^"))folha=root.getEsq();
			else ramo=root.getEsq();
			if (root.getDir().eFolha() || root.getValue().equals("^"))folha=root.getDir();
			else ramo=root.getDir();
			if (folha!=null && ramo!=null){
				if (ramo.getValue().equals("+") || ramo.getValue().equals("-")){
					return true;
				}
			}
		}
		return false;
	}
	
	public static BTNode reverteTrocaSinalARV(BTNode b){
		BTNode root=b;
		Vector<BTNode>folhas= Expression.getFolhas(root, new Vector<BTNode>());
		folhas.remove(0); //a primeira folha não é filha direita de ninguem
		for (BTNode f:folhas){
			arrumaSinalNegativo(f);
		}
		return root;
	}
	
	
	
	public static void arrumaSinalNegativo(BTNode r){
		BTNode root=r;
		if (r.eFolha() && r.getValue().startsWith("-")){
			while(!root.getValue().equals("=")&&(root.getValue().equals("+")||
					root.getValue().equals("-") || root.eFolha())){
				if (root.getPai().getDir().equals(root)){
					if (root.getPai().getValue().equals("+")){
						root=root.getPai();
						r.setValue(r.getValue().substring(1));
						root.setValue("-");
						break;
					}else if (root.getPai().getValue().equals("-")){
						root=root.getPai();
						r.setValue(r.getValue().substring(1));
						root.setValue("+");
						break;
					}else break;
				}else root=root.getPai();
			}
		}
	}
	
	/**
	 * Verifica se a a arvore possui os termos necessarios para a execução da
	 * fórmula de bhasksara
	 * @param r a raiz da arvore
	 * @return <code>true</code> se for possivel aplicar a formula
	 * de bhaskara e false caso contrario
	 */
	public static boolean hasTermosBhaskara(BTNode r){
		Vector<BTNode> folhas=Expression.getFolhas(r,new Vector<BTNode>());
		if (folhas.size()>4 || folhas.size()<3 )// 4 folhas: ax^2, bx, c e 0
			return false;
		int a,b,c;
		a=b=c=0;
		String valor="";
		for (BTNode aux:folhas){
			valor=aux.getValue();
			if (valor.equals("^")){
				valor=aux.getEsq().getValue();
				if (!aux.getDir().getValue().equals("2"))return false;
				//bloaquear quando ha potencia de inteiros
				if (isInteger(valor))return false;
				// caso "a" ja seja true significa que ja ha um ax^2 e em bhaskara isto não é possivel
				if (Funcoes.isInc(valor.charAt(valor.length()-1)))a++;
			}else if (Funcoes.isInc(valor.charAt(valor.length()-1)))b++;
			else if (Funcoes.isInteger(valor) && !valor.equals("0"))c++;
		}
		return ((a==1&&b==1&&c==1)||(a==1&&b==1));
	}
	
	/**
	 * Verifica se todos os termos estao em um lado da equacao
	 * @param r a raiz da arvore
	 * @return <code>true</code> se a equacao está pronta e
	 * <code>false</code> caso contrario
	 */
	public static boolean canBhaskara(BTNode r){
		if ((r.getDir().eFolha() && r.getDir().getValue().equals("0")) ||
			(r.getEsq().eFolha() && r.getEsq().getValue().equals("0"))){
				return hasTermosBhaskara(r);
		}
		return false;
	}
	
	/**
	 * Verifica se é possivel igualar a equação a zero, movendo todos os termos para a esquerda,ou direita
	 * da equação
	 * @param root
	 * @return 1= mover para a direita, 2= mover para a esquerda, 0= false.
	 */
	public static int canEqualZERO(Expression user, Expression solver){
		BTNode usrRoot=user.getRoot();
		boolean can=false;
		if (user.getTipo().equals(Expression.COEFICIENTES_BK))can=true;
		else if (usrRoot.getEsq().getValue().equals("d") ||usrRoot.getDir().getValue().equals("d")) can=true;
		else if (user.getnewexpression().contains("±"))can=true;
		//sem .getLast pq tem que ser apenas a incaognita em dum dos lados do resultado ao aluno
		// para representar que ele esta apontado o resultado final da bhasakara
		else if (Funcoes.isInc(usrRoot.getEsq().getValue()) || Funcoes.isInc(usrRoot.getDir().getValue())) can=true;
		
		if (can){
		BTNode root = solver.getRoot();
		if ((root.getDir().eFolha() && root.getDir().getValue().equals("0")) ||
			(root.getEsq().eFolha() && root.getEsq().getValue().equals("0"))){
				return 0;
		}
		if ((root.getDir().eFolha() && Funcoes.isInc(root.getDir().getLast())) ||
				(root.getEsq().eFolha() && Funcoes.isInc(root.getEsq().getLast()))){
					return 0;
		}
		Funcoes f=new Funcoes();
		f.modificaSinal(root);
		Vector<BTNode> folhasEsq=Expression.getFolhas(root.getEsq(),new Vector<BTNode>());
		Vector<BTNode> folhasDir=Expression.getFolhas(root.getDir(),new Vector<BTNode>());
		if ((folhasEsq.size()+folhasDir.size())<2 )return 0; // com menos de 2 termos a regra resultado é disparada
		boolean moveDir=checkLeafs(folhasDir, root);
		boolean moveEsq=checkLeafs(folhasEsq, root);
		if (!moveEsq && !moveDir) return 0;
		if (moveEsq) return 1;
		else return 2;
		}
		return 0;
	}
	
	/**
	 * Verifica se há somente + entre as folhas da lista leafs e root
	 * @param leafs uma lista de folhas
	 * @param root a raiz da arvore
	 * @return <code>true</code> se todas as folhas podem ser movidas por possuir um + entre elas e a raiz;
	 */
	public static boolean checkLeafs(List<BTNode> leafs, BTNode root){
		boolean result=false;
		BTNode n; 
		for (int i=0;i<leafs.size();i++){
			n=leafs.get(i);
			result=verificaCaminho(n, root, "+");
			if(!result ) i=leafs.size();
			if (((n.getValue().equals("^") && !n.getEsq().eFolha() && !n.getDir().eFolha())) ||
			((n.getValue().equals("R")))){
				result=false;
				i=leafs.size();
			}
			
		}
		return result;
	}
	
	/**
	 * Analiza a arvore de expressão e verifica se existe somente 2 termos (um inteiro e X ou um inteiro e x^2),
	 * em um lado da equacao, e se o outro lado é igual a zero. De modo e mover o nodo de inteiros para
	 * o lado oposto da equação para calcular o resultado.
	 * @param root a raiz da arvore
	 * @return 0 se não é possivel mover o nodo, 1 direita livre e 2 esquerda livre. Livre = contem o nodo com 0, mover o inteiro para este lado
	 */
	public static int canGenerateResult(BTNode root){
		if ((root.getDir().eFolha() && Funcoes.isInc(root.getDir().getLast())) ||
			(root.getEsq().eFolha() && Funcoes.isInc(root.getEsq().getLast()))){
				return 0;
		}
		if ((root.getDir().eFolha() && root.getDir().getValue().equals("0")) ||
			(root.getEsq().eFolha() && root.getEsq().getValue().equals("0"))){
			Funcoes f=new Funcoes();
			f.modificaSinal(root);
			Vector<BTNode> folhasEsq=Expression.getFolhas(root.getEsq(),new Vector<BTNode>());
			Vector<BTNode> folhasDir=Expression.getFolhas(root.getDir(),new Vector<BTNode>());
			if ((folhasEsq.size()+folhasDir.size())!=3 )return 0;// ax+b=0 => 3 termos para a regra disparar, caso contrairio não
			List<BTNode> check = (folhasEsq.size()==2)? folhasEsq:folhasDir;
			BTNode bt;
			boolean a,b,c;
			a=b=c=false;
			for (int i=0;i<check.size();i++){
				bt=check.get(i);
				if (Funcoes.isSquaredInc(bt) && Funcoes.isSquaredLeaf(bt)) a=true;
				else if (bt.eFolha()){
					if (Funcoes.isInteger(bt.getValue()))c=true;
					else if (Funcoes.isInc(bt.getLast())) b=true;
				}
			}
			if (((a&&c) || (b&&c)) && checkLeafs(check, root)){
				if (root.getDir().eFolha()) return 1;
				else return 2;
			}
			
		}
		return 0;
	}
	
	/**
	 * Obtem todas sa potências presentes na <code>equacao</code>,
	 * informa quais potencias e não quantas de cada
	 * @param equacao a equação a ser analizada
	 * @return uma {@link List} contendo quais potencias
	 * há na equação
	 */
	public static List<String> getPotencias(String equacao){
		ArrayList<String> potencias=new ArrayList<String>();
		HashSet<String> pots=new HashSet<String>();
		if (!equacao.isEmpty()){
			int index=equacao.indexOf("^");
			while (index!=-1){
				equacao=equacao.substring(index+1);
				pots.add(equacao.charAt(0)+"");
				index=equacao.indexOf("^");
			}
		}
		potencias.addAll(pots);
		return potencias;
	}
	
	
	/**
	 * Verifica se todos as folhas da subarvore root contem
	 * apenas numeros inteiros 
	 * @param root a raiz da subarvore
	 * @return <code>true</code> se conter apenas inteiros e <code>false</code> caso contrario;
	 */
	public static boolean arvINT(BTNode root){
		boolean inteiroEsq=true;
		boolean inteiroDir=true;
		if (root!=null){
			if (root.eFolha()){
				if (isInteger(root.getValue())) return true;
				else return false;
			}else{
				inteiroEsq=arvINT(root.getDir());
				inteiroDir=arvINT(root.getEsq());
			}
		}
		return inteiroEsq&&inteiroDir;
	}
	
	/**
	 * Retorna um Vector contedo os números que os valores da fração podem
	 * ser simplificados 
	 * @param arv a fração a ser verificada
	 * @return os valores que podem simplificar a fração
	 */
	public static Vector<Integer> isS(BTNode arv){
		String esq=arv.getEsq().getValue(), dir=arv.getDir().getValue();
		if (Funcoes.isInc(esq.substring(esq.length()-1))){
			esq=esq.substring(0,esq.length()-1);
			if (esq.equals(""))esq="1";
			if (esq.equals("-"))esq="-1";
		}
		if (Funcoes.isInc(dir.substring(dir.length()-1))){
			dir=dir.substring(0,dir.length()-1);
			if (dir.equals(""))dir="1";
			if (dir.equals("-"))dir="-1";
		}
		int v1=Integer.parseInt(esq);
		int v2=Integer.parseInt(dir);
		Vector<Integer> v=new Vector<Integer>();
		int[] primos=PRIMOS;
		int i=0;
		int soma=0;
		boolean fim=false;
		while(i<primos.length){
			fim=false;
			soma=0;
			while(!fim){
				if (v1%primos[i]==0 && v2%primos[i]==0){
					v1=v1/primos[i];
					v2=v2/primos[i];
					soma/*+*/=primos[i];
					if (soma>0)v.add(soma);
					//i=0;
				}else{
					//if (soma>0) v.add(soma);
					fim=true;
				}
			}
			i++;
		}
		return v;
	}
	
	/**
	 * Obtem a incógnita de um termo 
	 * @param valor uma String contendo o termo
	 * @return uma String contendo a incognita se
	 * <code>valor</code> tiver um ou "" caso contrário
	 */
	public static String getInc(String valor){
		if (valor.startsWith("("))valor=valor.substring(1);
		if (valor.endsWith(")"))valor=valor.substring(0,valor.length()-1);
		if (valor.contains("^"))valor=valor.substring(0,valor.indexOf("^"));
		if (valor.contains("R")){
			valor=valor.substring(0,valor.indexOf("R"));
			if (valor.endsWith(")"))valor=valor.substring(0,valor.length()-1);
		}
		if (isInc(valor.charAt(valor.length()-1))){
			valor=valor.charAt(valor.length()-1)+"";
			return valor;
		}else return "";
	}
	
	/**
	 * Retorna a parte inteira de valor, o que 
	 * pode ser a mesma coisa que valor. <br>
	 * Se <code>valor</code> for incógnita é retornado 1 e 
	 * se for -"incógnita" é retornado -1;
	 * @param valor um termo da equação
	 * @return a parte inteira de valor
	 */
	public static int getINT(String valor){
		int v;
		if (valor.startsWith("("))valor=valor.substring(1);
		if (valor.endsWith(")"))valor=valor.substring(0,valor.length()-1);
		if (valor.contains("^"))valor=valor.substring(0,valor.indexOf("^"));
		if (valor.contains("R")){
			valor=valor.substring(0,valor.indexOf("R"));
			if (valor.endsWith(")"))valor=valor.substring(0,valor.length()-1);
		}
		if (Funcoes.isInc(valor.charAt(valor.length()-1))){
			valor=valor.substring(0,valor.length()-1);
			if (valor.equals(""))v=1;
			else if (valor.equals("-"))v=-1;
			else v=Integer.parseInt(valor);
			return v;
		}else return Integer.parseInt(valor);
	}
	
	/**
	 * Retorna o sinal de <code>valor</code> que pode indicar que
	 * ele é negativo ou positivo.
	 * @param valor o valor do nodo
	 * @return + se for positivo (ou qualquer outra coisa que não seja um número),
	 * e - se for negativo
	 */
	public static String getSignal(String valor){
		if (valor.startsWith("("))valor=valor.substring(1);
		if (valor.endsWith(")"))valor=valor.substring(0,valor.length()-1);
		if (valor.contains("^"))valor=valor.substring(0,valor.indexOf("^"));
		if (valor.contains("R")){
			valor=valor.substring(0,valor.indexOf("R"));
			if (valor.endsWith(")"))valor=valor.substring(0,valor.length()-1);
		}
		if (valor.startsWith("-"))return "-";
		else return "+";
	}
	
	/**
	 * Se pot for uma potencia, ou seja guradar o sinal de "^", obtem
	 * o expoente desta potencia, caso contrario retorna 0
	 * @param pot o nodo contendo o sinal de "^"
	 * @return se for potencia retorna o valor do espoente, caso contrario
	 * retorna 0
	 */
	public static int getPotencia(BTNode pot){
		if (pot.getValue().equals("^")){
			return pot.getDir().getIntValue();
		}else if (!getInc(pot.getValue()).equals(""))return 1;
		else return 0;
	}
	
	/**
	* Retorna um string vazia ou somente com o sinal de -.
	* É utilizada em casos onde dara : 1x ou -1x
	*/
	public static String resultadoUm(String res){
		if (res.equals("1"))res="";
		else if (res.equals("-1"))res="-";
		return res;
	}
	
	/**
	 * Formata o resultado á forma matamaticamtes conhecida, ou seja,
	 * 1x => x  -1x => -x
	 * @param res um {@link String} com um valor
	 * @return o valor formatado, basicamente só formata valores como 1x e -1x
	 */
	public static String formatResultado(String res){
		res=res.replace(")", "");
		res=res.replace("(", "");
		String inc=getInc(res);
		int val=getINT(res);
		if (!inc.isEmpty())return resultadoUm(val+"")+inc;
		else return res;
	}
	
	/**
	 * Verifica se a raiz pode ser fatorada
	 * @param r o {@link BTNode} com a raiz a ser analizada, o nó
	 * DEVE ser de uma raíz
	 * @return <code>true</code> se for possivel e false caso 
	 * contrário
	 */
	public static boolean isFactor(BTNode r){
		int radical,radicando;
		radical=Integer.parseInt(r.getDir().getValue());
		//tratamento de incognita
		//nodo do raidicando
		BTNode radic= r.getEsq();
		if (radic.getValue().equals("^") && 
				Funcoes.isInc(radic.getEsq().getLast()) && 
				radic.getDir().getIntValue()>=radical){
				radicando=getINT(radic.getEsq().getValue());
		}else radicando=Integer.parseInt(r.getEsq().getValue());
		boolean ok=false;
		if (radical<radicando){
			ArrayList<Integer> i=(ArrayList<Integer>)fatorarInt(radicando);
			if (i.size()>=radical){
				//verificar se ha pelomenos um valor que seja repetido tantas vezes
				// quanto é o radical, pois so assim para ele sera cortado
				int freq;
				int j=0;
				while(j<i.size() && !ok){
					freq=Collections.frequency(i,new Integer(i.get(j)));
					if (freq>=radical)ok=true;
					//ja que a lista esta ordenda so saltar as casa com valores iguais
					j+=freq;
				}
			}
		}
		return ok;
	}
	
	/**
	 * Verifica se os fatores primos presntes na raiz
	 * podem ser extraidos da mesma,ou seja, se a potência
	 * da cada fator for maior ou igual ao radical da radiciação.
	 * No caso de potenicia maior permanace na raiz o que sobrar da 
	 * subtração entre o radical e a potencia 
	 * @param bt o {@link BTNode} com a raiz a ser analizada
	 * @param radical o radical da raiz
	 * @return <code>true</code> se for possivel e <code>false</code> 
	 * caso contrário
	 */
	public static boolean isFolhasFact(BTNode bt,int radical){
		boolean b=false;
		if (bt!=null){
			int potencia;
			if (bt.getValue().equals("R")) return isFolhasFact(bt.getEsq(), Integer.parseInt(bt.getDir().getValue()));
			else if (bt.getValue().equals("^")){
				potencia=Integer.parseInt(bt.getDir().getValue());
				if (potencia>=radical)b= true;
			}else if (bt.getValue().equals("*")){
				b=isFolhasFact(bt.getEsq(),radical)||isFolhasFact(bt.getDir(),radical);
			}else return false;
		}
		return b;
	}
	
	/**
	 * Reduz <code>i</code> a faotres primos
	 * @param i o numero a ser fatorado
	 * @return um {@link ArrayList} contendo os fatores primos
	 */
	public static ArrayList<Integer> fatorarInt(int i){
		int cont=0;
		int[] p=Funcoes.PRIMOS;
		ArrayList<Integer> f=new ArrayList<Integer>();
		while((i!=1 && i!=-1) && cont<Funcoes.PRIMOS.length){
			if(i%p[cont]==0){
				f.add(p[cont]);
				i=i/p[cont];
			}else{
				cont++;
			}
		}
		if((i==1 || i==-1) && f.isEmpty())f.add(i);
		return f;
	}
			
	/**
	 * Fatora a raiz, tranformando o valor inteiro da raiz em fatores primos
	 * @param raiz a raiz da subarvore que contem a operacao de raiz
	 * @return uma subarvore com a oparacao de raiz com o radicando fatorado
	 */
	public static BTNode fatorarRaiz(BTNode raiz){
		int radicando;
		BTNode inc=null;
		if (raiz.getEsq().getValue().equals("^")){
			radicando=getINT(raiz.getEsq().getEsq().getValue());
			//ja se sabe pela condição da regra que ha incognita
			inc=new BTNode ("^", new BTNode (String.valueOf(raiz.getEsq().getEsq().getLast())),
					new BTNode (raiz.getEsq().getDir().getValue()));
		}
		else radicando=Integer.parseInt(raiz.getEsq().getValue());
		ArrayList<Integer> i=Funcoes.fatorarInt(radicando);
		int freq;
		BTNode fatPrimo=inc;
		Integer aux;
		int j=0;
		while(j<i.size()){
			aux=i.get(j);
			freq=Collections.frequency(i,aux);
			if (fatPrimo==null){
				fatPrimo=new BTNode("^",new BTNode(aux+""),new BTNode(freq+""));
			}else fatPrimo=new BTNode("*",fatPrimo,new BTNode("^",new BTNode (aux+""),new BTNode(freq+"")));
			j+=freq;
		}
		return fatPrimo;
	}
	
	/**
	 * Adiciona newNode em root, ligados por um nodo com o sinal especificado em "sinal"
	 * 	se root for null root==newNode
	 */
	public static BTNode addSubArvore(BTNode root, BTNode newNode, String sinal){
		if (root==null)root=newNode;
		else{
			root=new BTNode (sinal,root,newNode);
		}
		return root;
	}
	
	/**
	 * Quebra a equação em uma lista de strings onde cada posição é um termo 
	 * ou um operador, a^2 é considarado um termo, onde "a" é qualque valor.
	 * O mesmo vale para aR2.
	 * @param eq a equação a ser quebrada
	 * @return uma Lista de termos e operadores 
	 * 
	 */
	public static List<String> quebrarEquacao(String eq){
		char c;
		String s="";
		Stack<Character> parenteses=new Stack<Character>();
		List<String> l=new ArrayList<String>();
		for (int i = 0; i < eq.length(); i++) {
			c = eq.charAt(i);
			if (c=='('){
				parenteses.push(c);
				s+=c;
			}
			else if (c==')'){
				parenteses.pop();
				s+=c;
			}
			else if (parenteses.isEmpty() &&(c=='^' || c=='R')){
				s+=c;
			}else if (parenteses.isEmpty()&&((isOp(c)&& c!='-') || (c=='-' && !isOp(eq.charAt(i-1))))){
				l.add(s);
				l.add(c+"");
				s="";
			}else s+=c;
		}
		if (!s.isEmpty()){
			l.add(s);
			s="";
		}
		return l;
	}
	
	/**
	 * Obtêm os valores dos operandos entre bt e a raiz da arvore
	 * @param bt o nodo inicial
	 * @return um {@link ArrayList} com os valores dos nodos.
	 */
	public static ArrayList<String> getNodeValues(BTNode bt){
		ArrayList<String> values=new ArrayList<String>();
		while (bt!=null){
			if (!bt.eFolha()){
				values.add(bt.getValue());
			}
			bt=bt.getPai();
		}
		return values;
	}
	
	/**
	 * Obtêm os valores dos operandos entre bt e limit, inclusive.
	 * @param bt o nodo inicial
	 * @param limit o ultimo no cujo valor sera retornado no {@link ArrayList}
	 * @return um {@link ArrayList} com os valores dos nodos.
	 */
	public static ArrayList<String> getNodeValues(BTNode bt, BTNode limit){
		ArrayList<String> values=new ArrayList<String>();
		while (bt!=limit.getPai()){
			if (!bt.eFolha()){
				values.add(bt.getValue());
			}
			bt=bt.getPai();
		}
		return values;
	}
	
	/**
	 * Método baseado no metodo <code>frequency(Collection c, Object o)</code> da classe
	 * {@link Collections} do pacote java.util. Com a diferenca deste trabalhar com {@link Comparator}
	 * @param col a {@link Collection} a ser verificada
	 * @param obj o objeto a ser contado
	 * @param comp o {@link Comparator} deste objeto
	 * @return um int contendo o número de vezes que obj apareceu em col.
	 * @see Collections
	 */
	public static <T> int frequency(Collection<T> col,T obj, Comparator<T> comp){
		int freq=0;
		if (obj==null){
			for (Object o:col){
				if (o==null)freq++;
			}
		}else{
			for (T o:col){
				if (comp.compare(o, obj)==0){
					freq++;
				}
			}
		}
		return freq;
	}
	
	/**
	 * Busca um objeto do tipo T na coleção col que seja igual a target, cujo
	 * parametro de igualdade é definido por comp.
	 * @param <T> o tipo do objeto
	 * @param col a coleção de objetos
	 * @param target o objeto contendo o paramtro de busca
	 * @param comp um comparador contendo os parâmetros de igualdade
	 * @return o objeto da coleção que é igual a target.
	 */
	public static <T> T find(Collection<T> col, T target, Comparator<T> comp){
		if (target==null || col.isEmpty())return null;
		else{
			for (T o:col){
				if (comp.compare(o, target)==0)return o;
			}
		}
		return null;
	}
	
	/**
	 * Busca um objeto do tipo T na coleção col que seja igual a target, cujo
	 * parametro de igualdade é definido por equals().
	 * @param <T> o tipo do objeto/ coleção
	 * @param col a coleção de objetos
	 * @param target o objeto contendo o parametro de busca
	 * @return o primeiro objeto da coleção que seja equals()==true em relação a target
	 */
	public static <T> T find(Collection<T> col, T target){
		if (target==null || col.isEmpty())return null;
		else{
			for (T o:col){
				if (o.equals(target))return o;
			}
		}
		return null;
	}
	
	public static <T> boolean contains(Collection<T> col, T target, Comparator<T> comp){
		return find(col, target, comp)!=null;
	}
	
	/**
	 * Verifica em col algum objeto presente em target 
	 * @param <T> o tipo das colções.
	 * @param col a coleção a ser verificada
	 * @param target o os objetos a serem buscado em col
	 * @param comp o comparado com os parametros de igualdade
	 * @return <code>true</code> caso um objeto seja encontrado e <code>false</code> caso contrário. 
	 */
	public static <T> boolean contains(Collection<T> col, Collection<T> target, Comparator<T> comp){
		if (col.isEmpty() || target.isEmpty()) return false;
		else {
			T obj=null;
			for (T tar:target){
				obj= find(col, tar, comp);
				if (obj!=null)return true;
				else obj=null;
			}
		}
		return false;
	}
	
	/**
	 * Retorna todo os objetos que fecham com a chave de busca <code>target</code>
	 * <b>Funciona apenas se a caleção estiver ordenada!!!</b>
	 * @param <T> o tipo dos objetos da colecao
	 * @param col a colacao de objetos a serem buscados
	 * @param target uma lista contendo estes objetos
	 */
	public static <T> List<T> findAll(List<T> lst, T target){
		T obj= find(lst, target);
		List<T> objetos= new ArrayList<T>();
		T temp=obj;
		for (int i=lst.indexOf(obj);obj.equals(target) && i<lst.size();i++){
			objetos.add(temp);
			temp=objetos.get(i);
		}
		return objetos;
	}
	
	public static <T> int indexOf (T[] obj, T target){
		int index=-1;
		for (int i=0;i<obj.length;i++){
			if (obj[i].equals(target)){
				index=i;
				i=obj.length;
			}
		}
		return index;
	}
	
	public static BTNode mmcPolinomios(Vector<BTNode> v, Expression e){
		Vector<BTNode> den=v;
		den=(Vector<BTNode>) BTNode.clone(den);
		Vector<BTNode> temp=new Vector<BTNode>();
		BTNode n1,n2;
		BTNode[] iguais;
		int pot1,pot2;
		//substtui os denominadores arvores por folhas
		int numDen=den.size();
		for (int de=0;de<numDen;de++){
			n1=den.get(de);//.getDir();
			temp.addAll(separaMult(n1,new Vector<BTNode>()));
		}
		den=temp;
		temp=null;
		for(int i=0;i<den.size();i++){
			n1=den.get(i);
			if (n1!=null && !n1.getValue().equals("null")){
				for (int j=0;j<den.size();j++){
					n2=den.get(j);
					// não vamos comparar um nó com ele mesmo nem um nó que ja foi
					// removido da lista mas o nó permance para manter o size() da lista
					if (n1!=null && n2!=null && !n1.equals(n2) && !n1.getValue().equals("null")
							&& !n2.getValue().equals("null")){
						//Caso 1- nodos exatamente iguais: remover n2 ja que n1 é a base de comparação
						if (Expression.igual(n1,n2)){
							den.set(j,new BTNode("null"));
						}
						//Caso 2- nodos parcialmente iguais: remover a parte igual se esta pertencer a uma multiplicação
						else{							
							iguais=e.comparar(n1,n2);
						 	if (iguais!=null){
						 		boolean cam1,cam2;
						 		cam1=caminho(iguais[0],n1,"*");
						 		cam2=caminho(iguais[1],n2,"*");
						 		if (cam1 && cam2){
						 			if (iguais[0].getValue().equals("^") && iguais[1].getValue().equals("^")){
						 				pot1=Integer.parseInt(iguais[0].getDir().getValue());
						 				pot2=Integer.parseInt(iguais[1].getDir().getValue());
						 				if (pot1>=pot2)den.set(j,new BTNode("null"));
						 				else{
						 					den.set(i,new BTNode ("null"));
						 					// se i foi "removido" entao encerrase as busca em j usando i como comparação
						 					j=den.size();
						 				}
						 			}else	den.set(j,new BTNode("null"));
						 		}
						 		//caso 3-um dos nodos é base de uma potencia, por exemplo (a+b)^2: verificar de novo o caminho
						 		// ignorando a potencia
						 		else{
						 			if (!cam1 && iguais[0].getPai().getValue().equals("^"))cam1=caminho(iguais[0].getPai(),n1,"*");
						 			if (!cam2 && iguais[1].getPai().getValue().equals("^"))cam2=caminho(iguais[1].getPai(),n2,"*");
						 			if (cam1 && cam2){
						 				if (iguais[0].getValue().equals("^"))pot1=Integer.parseInt(iguais[0].getDir().getValue());
						 				else if (iguais[0].getPai().getValue().equals("^"))pot1=Integer.parseInt(iguais[0].getPai().getDir().getValue());
						 				else pot1=1;
						 				if (iguais[1].getValue().equals("^"))pot2=Integer.parseInt(iguais[1].getDir().getValue());
						 				else if (iguais[1].getPai().getValue().equals("^"))pot2=Integer.parseInt(iguais[1].getPai().getDir().getValue());
						 				else pot2=1;
						 				if (pot1>=pot2)den.set(j,new BTNode("null"));
						 				else{
						 					den.set(i,new BTNode ("null"));
						 					// se i foi "removido" entao encerrase as busca em j usando i como comparação
						 					j=den.size();
						 				}
						 			}				 			
					 			}
					 		}//caso 4- nós folhas: mmc dos inteiros e a incognita maior, se tiver
						 	else if ((n1.eFolha() || n1.getValue().equals("^")) && 
						 				(n2.eFolha() || n2.getValue().equals("^"))){
						 		pot1=1;
						 		pot2=1;
						 		boolean hasN1pot=false,hasN2pot=false;
						 		if(n1.getValue().equals("^")){
						 			pot1=Integer.parseInt(n1.getDir().getValue());
						 			n1=n1.getEsq();
						 			hasN1pot=true;
						 		}
					 			if(n2.getValue().equals("^")){
					 				pot2=Integer.parseInt(n2.getDir().getValue());
					 				n2=n2.getEsq();
					 				hasN2pot=true;
					 			}
					 			String inc1=n1.getValue();
					 			String inc2=n2.getValue();
					 			int v1,v2;
					 			v1=Funcoes.getINT(inc1);
					 			v2=Funcoes.getINT(inc2);				 				
					 			inc1=Funcoes.getInc(inc1);
					 			inc2=Funcoes.getInc(inc2);
					 			v1=mVal(v1,v2);
					 			//havia descido para o nodo esquerdo no penultimo if
					 			if (hasN1pot)n1=n1.getPai();
					 			//havia descido para o nodo esquerdo no último if
					 			if (hasN2pot)n2=n2.getPai();
					 			if (inc1.isEmpty())inc1=inc2;
					 			if (pot1<pot2)pot1=pot2;
					 			if (pot1==1){
					 				if (v1==1 && !inc1.isEmpty())n1.setValue(inc1);
					 				else if (v1==-1 && !inc1.isEmpty())n1.setValue("-"+inc1);
					 				else n1.setValue(v1+inc1);
					 			}else{
					 				if (n1.getValue().equals("^")){
					 					n1.getDir().setValue(pot1+"");
					 					if (v1==1 && inc1.isEmpty()) n1.setEsq(new BTNode(v1));
					 					else if (v1==1 && !inc1.isEmpty()) n1.setEsq(new BTNode(inc1));
					 					else n1.setEsq(new BTNode(v1+inc1));
					 				}else{
					 					if (v1==1 && inc1.isEmpty()) n1.setEsq(new BTNode(v1));
					 					else if (v1==1 && !inc1.isEmpty()) n1.setEsq(new BTNode(inc1));
					 					else n1.setEsq(new BTNode(v1+inc1));
					 					n1.setDir(new BTNode(pot1+""));
					 					n1.setValue("^");
					 				}
					 			}
					 			den.set(j,new BTNode("null"));
					 		}
						}
					}
				}
			}
		}
		//até aqui nodos iguais foram eliminados e folhas foram juntadas
		//agora juntar o que sobrou
		n1=null;
		BTNode tmp;
		for (int d=0;d<den.size();d++){
			n2=den.get(d);
			if (n2!=null && !n2.getValue().equals("null")){
				//pois o pai é "/"
				tmp=n2.getNodeX("/");
				//pode ser que ja enha sido removido, por exemplo 20x*(x+1)
				// x+1 ja foi removido de / quando a analise estava em 20x
				if (tmp!=null)tmp.setDir(null);
				if (n1==null)n1=n2;
				else{
					n1=new BTNode("*",n1,n2);
				}
			}
		}
		return n1;
	}
	
	/**
	 * Verifica se há somente "operador" entre origem e destino, exclusivo-exclusivo
	 */
	public static boolean verificaCaminho(BTNode origem, BTNode destino, String operador){
		if (origem!=null && destino!=null){
			return caminho(origem.getPai(), destino, operador);
		}return false;
	}
	/**
	 * Verifica se há somente "operador" entre origem e destino, exclusivo-exclusivo
	 */
	public static boolean caminho(BTNode caminho, BTNode destino, String operador){
		if (caminho!=null){
			if (!caminho.equals(destino)){
				if (caminho.getValue().equals(operador))return caminho(caminho.getPai(),destino,operador);
				else return false;
			}return true;
		}
		return false;
	}
	
	/**
	 * Separa os termos da multiplicação
	 * @param bt a raiza da sub arvore
	 * @param v o {@link Vector} de folhas
	 */
	public static Vector<BTNode> separaMult(BTNode bt, Vector<BTNode> v){
		if (bt!=null){
			if (bt.getValue().equals("*")){
				v=separaMult(bt.getEsq(),v);
				v=separaMult(bt.getDir(),v);
			}else{
				v.add(bt);
			}
		}
		return v;
	}
	
	/**
	 * Funções de mdc e mmc retiradas de :
	 * http://pt.wikipedia.org/wiki/M%C3%ADnimo_m%C3%BAltiplo_comum
	 * http://pt.wikipedia.org/wiki/Algoritmo_de_Euclides
	 * em caso de numero negativo: valor limite do int
	 */
	public static int mdc(int a, int b){
		if (b==0){
			return a;
		}
		else{
			return mdc (b, a%b);
		}
	}

	public static int mVal(int a, int b){
		return (a*b)/mdc(a,b);
	}

	public static int mmc(int [] val){
		if (val.length==1)return val[0];
		else{
			int []newV=new int[val.length-1];
			System.arraycopy(val,0,newV,0,newV.length);
			int v1= mmc(newV);
			int v2= val[val.length-1];
			return mVal(v1,v2);
		}
	}

	public static int mdcAll(int [] all){
		if (all.length==1)return all[0];
		else{
			int [] newVal=new int[all.length-1];
			System.arraycopy(all,0,newVal,0,newVal.length);
			int v1=mdcAll(newVal);
			int v2=all[all.length-1];
			return mdc(v1,v2);
		}
	}
	
	/**
	 * Divide o mmc em multiplicações quando for necessario,
	 * por exemplo, 2x^2 passa a ser 2*x*x
	 * @param mmc o MMC a ser dividido
	 * @return um BTNode com o MMC dividido
	 */
	public static BTNode splitMMC(BTNode mmc, Expression e){
		if (mmc.eFolha() || mmc.getValue().equals("^") && mmc.getEsq().eFolha()){
			String val=e.setmod(mmc);
			if (val.startsWith("("))val=val.substring(1);
			if (val.endsWith(")"))val=val.substring(0,val.length()-1);
			String inc;
			int v;
			v=getINT(val);
			inc=getInc(val);
			//caso 1 2x^2=> 2*x*x
			if (mmc.eFolha() && inc.isEmpty())return splitInteger(v);
			if (val.contains("^")){ 
				String pot;
				pot=val.substring(val.indexOf("^")+1);
				mmc.setEsq(null);
				mmc.setDir(null);
				
				if (!getInc(val).isEmpty() &&v!=1){
					mmc.setEsq(splitInteger(v));//new BTNode(v));
					mmc.setDir(splitSquare(new BTNode ("^",new BTNode(inc),new BTNode(pot))));
					mmc.setValue("*");
				}else if (v==1){
					BTNode temp = splitSquare(new BTNode ("^",new BTNode(inc),new BTNode(pot)));
					BTNode esq,dir;
					esq=temp.getEsq();
					dir=temp.getDir();
					temp.setEsq(null);
					temp.setDir(null);
					mmc.setEsq(esq);
					mmc.setDir(dir);
					mmc.setValue(temp.getValue());
				}
			}else if (v!=1){
				mmc.setEsq(null);
				mmc.setDir(null);
				mmc.setEsq(splitInteger(v));//new BTNode(v));
				mmc.setDir(new BTNode (inc));
				mmc.setValue("*");
			}
		}else if (!mmc.eFolha()){
			splitMMC(mmc.getEsq(),e);
			splitMMC(mmc.getDir(),e);
		}
		return mmc;
	}
	
	/**
	 * Decompoe v em uma arvore de multiplicações de fatores primos
	 * @param v o inteiro a ser decomposto
	 * @return uma arvore de multiplicações com o inteiro decomposto
	 */
	public static BTNode splitInteger(int v){
		List<Integer> fatores = fatorarInt(v);
		BTNode root=null;
		for (int f: fatores){
			root=addSubArvore(root, new BTNode(f), "*");
		}
		return root;
	}
	
	/**
	 * Converte um nodo com potência em uma sequencia de multiplicações
	 * @param sqrt o nodo com a potencia, neste caso sqrt deve apontar para "^"
	 * @return 
	 */
	public static BTNode splitSquare(BTNode sqrt){
		if (sqrt.getValue().equals("^")){
			int pot = sqrt.getDir().getIntValue();
			BTNode base = sqrt.getEsq();
			BTNode mult=null;
			for (int i=0;i<pot;i++){
				if (mult==null)mult= (BTNode) base.clone();
				else mult=new BTNode ("*",(BTNode)base.clone(),mult);
			}
			return mult;
		}
		return sqrt;
	}
	
	public static BTNode mergeMMC(BTNode mmc){
		if (mmc.getValue().equals("*")){
			String vEsq=mmc.getEsq().getValue();
			if (Funcoes.isInteger(vEsq)){
				String vDir=mmc.getDir().getValue();
				if (vDir.equals("^") && Funcoes.isInc(mmc.getDir().getEsq().getValue())){
					vDir=mmc.getDir().getEsq().getValue();
					if (vEsq.equals("1"))vEsq="";
					else if (vEsq.equals("-1"))vEsq="-";
					mmc.getEsq().setValue(vEsq+vDir);
					mmc.getDir().setValue(mmc.getDir().getDir().getValue());
					mmc.getDir().setEsq(null);
					mmc.getDir().setDir(null);
					mmc.setValue("^");
				}else if (Funcoes.isInc(mmc.getDir().getValue())){
					if (vEsq.equals("1"))vEsq="";
					else if (vEsq.equals("-1"))vEsq="-";
					mmc.setValue(vEsq+vDir);
					mmc.setEsq(null);
					mmc.setDir(null);
				}
			}else if (!mmc.eFolha()){
				//caso do inteiro estar divididos em fatores primos, ou seja, a*b, sendo a e b inteiros
				if (Funcoes.isInteger(mmc.getEsq().getValue()) &&Funcoes.isInteger( mmc.getDir().getValue())){
					int val= mergeInteger(mmc);
					mmc.setValue(val);
					mmc.setEsq(null);
					mmc.setDir(null);
				}else{
					mergeMMC(mmc.getEsq());
					mergeMMC(mmc.getDir());
				}
			}
		}else if(!mmc.eFolha()){
			mergeMMC(mmc.getEsq());
			mergeMMC(mmc.getDir());
		}
		return mmc;
	}
	
	/**
	 * Recompoe os fatores primos em um unico numero inteiro
	 * @param root a raiz da arvore de fatores
	 * @return um unico numero inteiro formado pela concatenação dos demais
	 */
	public static int mergeInteger(BTNode root){
		Expression e= new Expression(new BTNode ("=",(BTNode)root.clone(),new BTNode ("0")));
		e.avaliarArvore();
		return e.getRoot().getEsq().getIntValue();
	}
	
	
	public static BTNode calcularMMC(BTNode bt, Expression e){
		Vector <BTNode> oldV= e.buscaChaveX(bt,"/");
		bt = bt.getDir();
		BTNode mmcClone;
		String aux;
		String [] mmcSplit;
		String [] denSplit;
		oldV.removeElementAt(oldV.size()-1);// o método exige que a raiz seja /, se sempre é a última fração que não deve ser preocessada
		ArrayList<BTNode> resultado=new ArrayList<BTNode>();
		BTNode temp;
		int index;
		for (int cont=0;cont<oldV.size();cont++){
			resultado.clear();
			mmcClone = (BTNode) bt.clone();
			if (canFatorComum(mmcClone, e.setmod(mmcClone))){
				mmcClone= new BTNode("=",mmcClone,new BTNode(0));
				try {
					mmcClone=new Expression(fatorar(mmcClone)).getRoot();
				} catch (InvalidValueException e1) {
					e1.printStackTrace();
				}
			}
			//criar spli para x^2 => x*x e checar o merge
			mmcClone=splitMMC(mmcClone, e);
			aux = e.setmod(mmcClone);
			aux=aux.replace("(", "");
			aux=aux.replace(")", "");
			mmcSplit = aux.split("\\*");
			Arrays.sort(mmcSplit);
			temp = (BTNode)oldV.get(cont).getDir().clone();
			if (canFatorComum(temp, e.setmod(temp))){
				temp=new BTNode("=",temp,new BTNode(0));
				try {
					temp=new Expression(fatorar(temp)).getRoot();
				} catch (InvalidValueException e1) {
					e1.printStackTrace();
				}
			}
			temp=splitMMC(temp, e);
			aux = e.setmod(temp);
			aux=aux.replace("(", "");
			aux=aux.replace(")", "");
			if (aux.equals("1"))resultado.add((BTNode)mmcClone.clone());
			else{
				denSplit = aux.split("\\*");
				Arrays.sort(denSplit);
				//Divisão de MMC pelo denominador
				//eliminar os inguais
				for (int i=0;i<mmcSplit.length;i++){
					index=Arrays.binarySearch(denSplit, mmcSplit[i]);
					if (index>=0){
						denSplit[index]="ZERO"; //Apenas para anular o valor da posição e ocorrer do valor ser buscado denovo
						mmcSplit[i]="ZERO";
						Arrays.sort(denSplit);
					}
				}
				//juntar os diferentes
				String[] maior = (mmcSplit.length>denSplit.length)? mmcSplit:denSplit;
				for (int i=0;i<maior.length;i++){
					if (i<mmcSplit.length && !mmcSplit[i].equals("ZERO")){
						if (resultado.isEmpty())resultado.add(new BTNode(mmcSplit[i]));
						else {
							resultado.set(0,new BTNode ("*", new BTNode(mmcSplit[i]),resultado.get(0)));
						}
					}
					if (i<denSplit.length && !denSplit[i].equals("ZERO")){
						if (resultado.isEmpty())resultado.add(new BTNode(denSplit[i]));
						else {
							resultado.set(0,new BTNode ("*", new BTNode(denSplit[i]),resultado.get(0)));
						}
					}
				}
			}
			//multiplicação do resultado obtido acima com o mumerador
			temp = oldV.get(cont);//pega a divisao para alterar o denominador, substituindo por resultado e o operador / para *
			if (resultado.isEmpty()){ // caso em que o resultado da divisao for 1
				Expression.removeNoArvore(temp.getDir());
			}else{
				temp.setDir(null);
				temp.setDir(resultado.get(0));
				temp.setValue("*");
			}
		}
		return mergeMMC(bt);
	}
	
	
	public static BTNode calculaMMC (BTNode bt, Expression e){ 
		Vector <BTNode> oldV= e.buscaChaveX(bt,"/");
		BTNode n;
		int v1,v2;
		boolean inteiro=false;
		if (Funcoes.isInteger(bt.getDir().getValue()))inteiro=true;
		String aux="";
		String exp=bt.getDir().getValue();
		oldV.removeElementAt(oldV.size()-1);
		n=null;
		String str[];
		bt=bt.getDir(); //pega o mmc para realizar a operação
		splitMMC(bt,e);
		Vector<BTNode> ig=null;
		BTNode mmcClone;
		BTNode temp=null;
		BTNode resp=null;//guarda os nodos removidos da arvore que irao ser multplicado pelo numerador da fração
		boolean canFatorComum=false;
		BTNode notSplited;
		//divide os numeros do denominador da equação pelos 
		//denominadores das frações individuais
		for (int cont=0;cont<oldV.size();cont++){
			mmcClone=(BTNode)bt.clone();
			n=oldV.get(cont);
			notSplited=(BTNode)n.clone();
			n=n.getDir();
			canFatorComum=canFatorComum(n,e.setmod(n));// fazer antes do split para dar certo.
			
			splitMMC(n, e);
			//fim do teste
			resp=null;
			if (canFatorComum){
				//função de fatoração exige raiz "="
				//n=n.getPai(); // notsplited ja faz isso
				BTNode fracao=notSplited;//(BTNode)n.clone();// mesmo motivo de cima
				fracao=fracao.getDir();
				BTNode fact=new BTNode("=",fracao,new BTNode("0"));
				try {
					fact=new Expression(fatorar(fact)).getRoot();
				} catch (InvalidValueException e1) {
					e1.printStackTrace();
				}
				//dir pois é o denominador
				n.setDir(fact);
				n=fact;		
			}
			if(!inteiro ){
				if (Expression.igual(n,mmcClone)){
					//ig=new Vector();
					//ig.add(0,n);
					//ig.add(1,mmcClone);
					ig=null;
					mmcClone=null;
					Expression.removeDaArvore(n);
				}else if (n.eFolha()) ig=e.varreArvore(n,mmcClone);
				else if(n.getValue().equals("+") || n.getValue().equals("-")){
					ig=new Vector<BTNode>(new CopyOnWriteArrayList<BTNode>(e.compara(n,mmcClone)));					
				}else {
					temp=n.getEsq();
					while(!temp.eFolha())temp=temp.getEsq();
					ig=e.varreArvore(temp,mmcClone); // esquerda pois é a area da arvore onde so 
					//ha valores em folhas ex:x,2,5x
					temp=null;
				}
				try{ 
					if (ig==null)ig=new Vector<BTNode>(new CopyOnWriteArrayList<BTNode>(e.compara(n,mmcClone)));
					if (ig !=null){
						while(Expression.igual(ig.get(0).getPai(),ig.get(1).getPai())){
							ig.set(0,ig.get(0).getPai());
							ig.set(1,ig.get(1).getPai());
						}	
					}
				}catch (NullPointerException npe){
					ig=null;
				}
				if (ig!=null && ig.size()>0){
					while (ig!=null && ig.size()>0){
						v1=v2=0;
						//ig[0] denominador da fração
						//ig[1] denominador da equação toda
						//processa as poténcias 
						if (((ig.get(0).getPai()!=null && ig.get(1).getPai()!=null) &&
								(ig.get(0).getPai().getValue().equals("^") || ig.get(1).getPai().getValue().equals("^"))) ||
								(ig.get(0).getValue().equals("^") && ig.get(1).getValue().equals("^"))){
							BTNode pai0,pai1;
							if (ig.get(0).getValue().equals("^")){
								pai0=ig.get(0);
								v1=Integer.parseInt(pai0.getDir().getValue());
							}else{
								pai0=ig.get(0).getPai();
								if (pai0.getValue().equals("^")&&
										pai0.getEsq().equals(ig.get(0))){
									v1=Integer.parseInt(pai0.getDir().getValue());
								}else v1=1;
							}
							if (ig.get(1).getValue().equals("^")){
								pai1=ig.get(1);
								v2=Integer.parseInt(pai1.getDir().getValue());
							}else{
								pai1=ig.get(1).getPai();
								if (pai1.getValue().equals("^")&&
										pai1.getEsq().equals(ig.get(1))){
									v2=Integer.parseInt(pai1.getDir().getValue());
								}else v2=1;
							}
							if (v1>v2)v1=v1-v2;
							else v1=v2-v1;
							if (v1>0){
								if (pai0.getValue().equals("^")){
									if (v1>1){
										pai0.getDir().setValue(String.valueOf(v1));

									}else{
										Expression.removeDaArvore(pai0.getDir());
									}
									if (ig.get(1).getPai().getValue().equals("^")){
										if (ig.get(1).getPai().getPai()!=null) Expression.removeDaArvore(ig.get(1).getPai());
										else mmcClone=null;
									}
								}
								else if (v1>1){
									ig.get(0).setEsq((BTNode)ig.get(0).clone());
									ig.get(0).setDir(new BTNode(String.valueOf(v1)));
									ig.get(0).setValue("^");
									if (ig.get(1).getPai().getValue().equals("^")){
										if (ig.get(1).getPai().getPai()!=null) Expression.removeDaArvore(ig.get(1).getPai());
										else mmcClone=null;
									}
								}else if (v1==1){
									if (ig.get(0).getPai().getValue().equals("^")){
										Expression.removeDaArvore(ig.get(0).getPai().getDir());
									}
									if (ig.get(1).getPai().getValue().equals("^")){
										// se a potencia não tiver pai logo é o mmcClone inteiro e portanto
										// anular todo o mmc que sera adicionado o ig.get(0)
										if (ig.get(1).getPai().getPai()!=null)Expression.removeDaArvore(ig.get(1).getPai());
										else mmcClone=null;
									}
								}
								if (ig.get(1).getPai()!=null)Expression.removeDaArvore(ig.get(1));
								resp=adicionaNaSubArvore(resp,ig.get(0));
							}else{ //se = 0 ja q nunca vai dar negativo
								if (ig.get(0).getPai().getValue().equals("^") ||
										ig.get(0).getPai().getValue().equals("R")) ig.add(0,ig.remove(0).getPai());
								if(ig.get(1).getPai()!=null){ 
									if (ig.get(1).getPai().getValue().equals("^") ||
											ig.get(1).getPai().getValue().equals("R")) ig.add(1,ig.remove(1).getPai());
								}
								Expression.removeDaArvore(ig.get(0));
								if (ig.get(1).getPai()!=null)Expression.removeDaArvore(ig.get(1));
								else mmcClone=null;
							}
							//processa equações do tipo (x+1)*...
						}else if (ig.get(0).getValue().equals("+")||ig.get(0).getValue().equals("-")){
							if((ig.get(0).getPai()!=null && ig.get(0).getPai().getValue().equals("*")) || 
									(ig.get(1).getPai()!=null && ig.get(1).getPai().getValue().equals("*"))){
								Expression.removeDaArvore(ig.get(0));
								if (ig.get(1).getPai()!=null){
									resp=ig.get(1).getPai();
									Expression.removeDaArvore(ig.get(1));
								}
								//Novo codigo
							}else if (Expression.igual(ig.get(0),ig.get(1))){
								Expression.removeDaArvore(ig.get(0));
								// se não tiver pai singifica que o nodo igual é todo o mmcClone
								if (ig.get(1).getPai()!=null){
									Expression.removeDaArvore(ig.get(1));
								}else mmcClone=null;
							}
							//fim do novo codigo
						}else{
							//processa folhas
							str=Funcoes.diferenca(ig.get(0).getValue(),ig.get(1).getValue());
							if (str!=null){
								if (Funcoes.isInteger(str[0])&& Funcoes.isInteger(str[1])){
									v1=Integer.parseInt(str[0]);
									v2=Integer.parseInt(str[1]);
									if (v1>v2)ig.get(0).setValue(String.valueOf(v1/v2));
									else ig.get(0).setValue(String.valueOf(v2/v1));
								}else{
									if (str[0].equals(""))ig.get(0).setValue(str[1]);
									else if (str[1].equals(""))ig.get(0).setValue(str[0]);
									else{
										ig.get(0).setEsq(new BTNode(str[0]));
										ig.get(0).setDir(new BTNode(str[1]));
										ig.get(0).setValue("/");
									}
								}
								if (ig.get(1).getPai()!=null)Expression.removeDaArvore(ig.get(1));
								resp=adicionaNaSubArvore(resp,ig.get(0));
							}else{
								if (ig.get(0).getPai()!=null &&(ig.get(0).getPai().getValue().equals("^") ||
										ig.get(0).getPai().getValue().equals("R"))) ig.add(0,ig.remove(0).getPai());
								Expression.removeDaArvore(ig.get(0));
								if (ig.get(1).getPai()!=null)Expression.removeDaArvore(ig.get(1));
							}
						}
						//remove o objeto e o correspondente na arvore do mmc
						ig.removeElementAt(0);
						ig.removeElementAt(0);
						n=oldV.get(cont);
						//Novo codigo
						if (!n.getValue().equals("/"))ig=null;
						//Fim do novo codigo
						if (!n.eFolha() && !n.getValue().equals("^") && !n.getValue().equals("R"))n=n.getDir();
						//ig=e.varreArvore(n.getEsq(),bt);
						try{
							if (ig !=null|| ig.size()<=0){
								ig=new Vector<BTNode>(new CopyOnWriteArrayList<BTNode>(e.compara(n,mmcClone)));
							}
						}catch(NullPointerException npe){
							ig=null;
						}
					}//fim laco while
				}else if (mmcClone!=null){
					aux=mmcClone.getValue();
					if (n.eFolha()||aux.equals("-")||aux.equals("+") || aux.equals("^") || aux.equals("/")){
						resp=mmcClone;
					}
				}
				//sem iguais no denominador da fração em relação ao denominador da equação
				n=oldV.get(cont);
				//resp==null singnifica que o denominador é igual ao
				//mmc ou um pedaço do mmc anulou um denominador o que
				// sobrou no denominador é o que não foi cancelado com o mmc
				resp=adicionaNaSubArvore(resp,mmcClone);
				if (n.eFolha() ||n.getValue().equals("^") || n.getValue().equals("R")){
					if(resp!=null){
						n.setEsq(new BTNode(n.getValue(),n.getEsq(),n.getDir()));
						n.setDir(resp);
						n.setValue("*");
					}//else{
					//	n.setEsq(new BTNode(n.getValue()));
					//	n.setDir(mmcClone);
					//	n.setValue("*");
					//	}
				}else{
					if (resp==null){
						if (n.getValue().equals("/"))n.setValue("*");
					}
					else{
						BTNode ax;
						if (n.getValue().equals("/")){
							temp=n.getEsq();
							ax=n.getDir();
							n.setEsq(null);
							n.setDir(null);
							n.setEsq(new BTNode("*",temp,ax));
							temp=null;
						}
						else{
							ax=n.getEsq();
							temp=n.getDir();					
							n.setEsq(null);
							n.setDir(null);		
							n.setEsq(new BTNode (n.getValue(),ax,temp));
						}
						n.setDir(resp);
						n.setValue("*");
					}
				}
				resp=null;
			}else{
				v1=Integer.parseInt(n.getValue());
				v2=Integer.parseInt(exp);
				n.setValue(String.valueOf(v2/v1));
				n=n.getPai();
				n.setValue("*");				
			}		
		}
		return mergeMMC(bt);
	}
	
	/**
	 * Verifica a possibilidade de se aplicar a fatoração sobre a equação
	 * @param root a raiz da arvore
	 * @param exp a equação
	 * @return <code>true</code> se é possivel aplicar fator comum e <code>false</code>
	 * caso contrario
	 */
	public static boolean canFatorComum(BTNode root, String exp){
		Funcoes.t();
		if (exp.contains("*"))return false;
		else if (exp.contains("/"))return false;
		else if (exp.contains("R"))return false;
		Vector <BTNode> folhas=Expression.getFolhas(root, new Vector<BTNode>());
		boolean pot=false; //guarda se ha pelomenos uma potencia
		boolean npot=false; //guarda se ha pelomenos uma incongita sem potencia
		int potencia=0;
		boolean difpot=false;/* guarda se ha pelo menos duas potencias diferentes
							  * incluindo potencia 1*/
		for(int i=0;i<folhas.size();i++){
			if (Funcoes.isInteger(folhas.get(i).getValue()))return false;
			if (folhas.get(i).getValue().equals("^") && !folhas.get(i).getEsq().eFolha()) return false;
			if(folhas.get(i).getValue().equals("^")){
				pot=true;
				if (potencia==0)potencia=Integer.parseInt(folhas.get(i).getDir().getValue());
				else if (Integer.parseInt(folhas.get(i).getDir().getValue())!=potencia)difpot=true;
			}
			else{
				String inc=folhas.get(i).getValue();
				inc=inc.substring(inc.length()-1);
				if (Funcoes.isInc(inc))npot=true;
			}			  
		}
		if (pot && npot) difpot=true;
		if((pot && npot) || (pot && difpot))return true;
		return false;
	}
	
	public static String fatorar (BTNode x){
		String comum=getTermoComum(x);
		Vector<BTNode> folhas= getIncognitas(x,new Vector<BTNode>());
		String valor="";
		String inc=""; // incognita
		int potencia=1; // potencia
		int termo=1; //termo que acompanha a incognita
		int potComum;
		int tComum=0;
		BTNode atual;
		BTNode pai;
		if (comum.contains("^")){
			potComum= Integer.parseInt(comum.substring(comum.length()-1));
			valor=comum.substring(0,comum.indexOf("^"));
			if (valor.length()<=1)tComum=1;
			else valor=valor.substring(0,valor.length()-1);
		}else{
			potComum=1;
			if (comum.length()<=1)tComum=1;
			else valor=comum.substring(0,comum.length()-1);
		}
		if (tComum==0){
			if (valor.equals("-"))tComum=-1;
			else tComum=Integer.parseInt(valor);
		}
		for (int i=0;i<folhas.size();i++){
			atual=folhas.get(i);
			pai=atual.getPai();
			if (pai!=null){
				if (pai.getValue().equals("^")){
					//mesmo que o valor tenha potencia escrever tudo em um no e remove o resto
					//pois a nova arvore vais ser gerada lendo a lista de folhas mais o que sobrou da arvore
					// ou seja a arvore sem as incognitas;
					potencia=Integer.parseInt(pai.getDir().getValue());
				}else potencia=1;
				
			}else potencia=1;
			valor=atual.getValue();
			if (inc.isEmpty())inc=valor.substring(valor.length()-1);
			valor=valor.substring(0,valor.length()-1);
			if (valor.length()<1)termo=1;
			else if (valor.equals("-"))termo=-1;
			else termo=Integer.parseInt(valor);
			termo=termo/tComum;
			potencia=potencia-potComum;
			valor="";
			if (termo>1 || termo<-1)valor+=termo;
			else if (termo==-1)valor="-";
			if (potencia>0)valor+=inc;
			if (potencia==0 && valor.equals(""))valor="1";
			if (potencia==0 && valor.equals("-"))valor="-1";
			atual.setValue(valor);
			if (pai!=null && pai.getValue().equals("^")){
				if (potencia>1){
					atual.setValue(valor+"^"+potencia);
				}
				pai.setEsq(null);
				pai.setDir(null);
				if (pai.getPai()!=null){
					if (pai.getPai().getValue().equals("=")){
						if (pai.getPai().getEsq().equals(pai))pai.getPai().setEsq(null);
						else pai.getPai().setDir(null);
					}else Expression.removeNoArvore(pai);
				}
			}else {
				pai=atual.getPai();
				if (pai!=null){
					if (pai.getValue().equals("=")){
						if (pai.getEsq().equals(atual))pai.setEsq(null);
						else pai.setDir(null);
					}else Expression.removeNoArvore(atual);
				}
			}
		}
		//neste ponto toda as folhas foram removidas da arvore
		String nExp=folhas.get(0).getValue();
		String valComum="";
		if (tComum==-1){
			valComum="-";
		}else if (tComum!=1){
			valComum+=tComum;
		}
		valComum+=inc;
		if (potComum>1)valComum+="^"+potComum;
		for (int cont=1;cont<folhas.size();cont++){
			if(folhas.get(cont).getValue().startsWith("-"))nExp+=folhas.get(cont).getValue();
			else nExp+="+"+folhas.get(cont).getValue();
		}
		nExp=valComum+"*("+nExp+")";
		return nExp;
	}
	
	
	/**
	Percorre a árvore  "r" e adiciona em "incognitas" todas as folhas
	que possuam valores com incognitas. Em caso de poténcia ou raiz
	adiciona a incogntia da potencia ou raiz
*/
public static Vector<BTNode> getIncognitas(BTNode r, Vector<BTNode> incognitas){
	if (r!=null){
		if (r.eFolha()){
			if (incognitas==null)incognitas=new Vector<BTNode>();
			String inc=r.getValue();
			if (Funcoes.isInc(String.valueOf(inc.charAt(inc.length()-1)))){
				if (r.getPai().getValue().equals("^") || r.getPai().getValue().equals("R")){
					BTNode valor=(BTNode)r.getPai();
					incognitas.add((BTNode)valor.getEsq());
				}else incognitas.add((BTNode)r);
			}
		}else{
			incognitas=getIncognitas(r.getEsq(),incognitas);
			if (!r.getValue().equals("^") &&
			 !r.getValue().equals("R"))incognitas=getIncognitas(r.getDir(),incognitas);
		}
	}
	return incognitas;
}


/**
 * Obtem o termo comum ta equação root,
 * @param root a raiz da arvore
 * @return uma {@link String} contendoa temo comum da equação
 */
public static String getTermoComum(BTNode root){
	Vector<BTNode> folhas = getIncognitas(root, new Vector<BTNode>());
	String valor;
	String inc=""; //guada a incógnita para utizar no retorno da função 
	BTNode atual;
	int termo=0; // o termo que acompanha a incognita
	int [] termos=new int[folhas.size()];
	int potencia=1; // o valor da potencia
	int menorPot=0; // guarda o valor da menor potencia
	for(int i=0;i<folhas.size();i++){
		atual=folhas.get(i);
		valor=atual.getValue();
		if (inc.isEmpty()) inc=valor.substring(valor.length()-1);
		valor=valor.substring(0,valor.length()-1);
		if (valor.equals("-"))termo=-1;
		else if (valor.length()<1)termo=1;
		else if (valor.startsWith("-"))termo=Integer.parseInt(valor.substring(1));
		else termo=Integer.parseInt(valor);
		termos[i]=termo;
		if (atual.getPai().getValue().equals("^")){	
			potencia=Integer.parseInt(atual.getPai().getDir().getValue());
		}else potencia=1;
		if (potencia<menorPot || menorPot==0)menorPot=potencia;
	}
	termo=Funcoes.mdcAll(termos);  //termo comum
	if (termo==1)valor= inc;
	else if (termo==-1)valor="-"+inc;
	else valor=termo+inc;
	if (menorPot>1)valor+="^"+menorPot;
	return valor;
}
	
	/**
	 * Adiciona newNode na sub-arvore sub, então newNode se torna
	 * filho direito de sub e todo o resto passa a ser filho esquerdo
	 * todos os nós da arvore gerada são filhos do sinal de "*", se
	 * new node pertencer a uma outra arvore ele sera removido primeiro
	 */
	public static BTNode adicionaNaSubArvore(BTNode sub, BTNode newNode){
		if (sub!=newNode && newNode!=null){
			if (sub==null){
				if (newNode.getPai()==null) sub=newNode;
				else sub=Expression.removeDaArvore(newNode);
			}else if (Funcoes.isInteger(newNode.getValue())){
				//se os dois sao folhao inteiro é filho esquerdo
				sub.setDir((BTNode)sub.clone());
				sub.setValue("*");
				if (newNode.getPai()==null)sub.setEsq(newNode);
				else sub.setEsq(Expression.removeDaArvore(newNode));
			}else{
				sub.setEsq((BTNode)sub.clone());
				sub.setValue("*");
				if (newNode.getPai()==null)sub.setDir(newNode);
				else sub.setDir(Expression.removeDaArvore(newNode));
			}
		}
		return sub;
	}
	
	
	/**
	 * Verifica se o nodo está realizando uma operação de soma/subtração ou
	 * multiplicação por 0
	 * @param b o nodo da operação
	 * @param operacao a operação que o nodoDEVE possuir para ser aceito
	 * @return <code>true</code> de estiver somando/subtrainod/multiplicando opr ZERO e
	 * <code>false</code> caso contrario
	 */
	public static boolean canAddSubMultZERO(BTNode b, String operacao){
		return canOPByValue(b, operacao, new String[]{"+","-","*"}, 0);
	}
	
	/**
	 * Verifica se o nodo está realizando uma operação de multiplicação por 1
	 * @param b o nodo da operação
	 * @return <code>true</code> de estiver multiplicando por UM e
	 * <code>false</code> caso contrario
	 */
	public static boolean canMultByONE(BTNode b){
		return canOPByValue(b, "*", new String[]{"*"}, 1);
	}
		
	/**
	 * Verifica se o nodo está realizando uma operação de valor
	 * @param b o nodo da operação
	 * @param operacao a operação que o nodo DEVE possuir para se aceito pelo método
	 * @return <code>true</code> de estiver somando/subtrainod/multiplicando por ZERO e
	 * <code>false</code> caso contrario
	 */
	private static boolean canOPByValue(BTNode b, String operacao,String[] valoresValidos,int valor){
		BTNode pai=b.getPai();
		boolean multZero=false;
		ArrayList<String> opsValidos= new ArrayList<String>(Arrays.asList(valoresValidos));
		if (opsValidos.contains(operacao) && pai.getValue().equals(operacao)){
			int esq,dir;
			if (Funcoes.isInteger(pai.getEsq().getValue())){
				esq=pai.getEsq().getIntValue();
				if (esq==valor)multZero=true;
			}
			if (!multZero && Funcoes.isInteger(pai.getDir().getValue())){
				dir=pai.getDir().getIntValue();
				if (dir==valor)multZero=true;
			}
		}
		return multZero;
	}
	
	/**
	 * Verifica a existÊncia de uma divisão de frações, ou seja,
	 * um no "/" com 2 filhos "/"
	 * @param root a raiz da arvore (ou subarvore)
	 * @return um btnode contendo um divisao de frações ou <code>null</code>
	 * se não for encontrado nada
	 */
	public static BTNode getDivFracao(BTNode root){
		if (root!=null){
			if (root.getValue().equals("/") &&
				root.getEsq().getValue().equals("/") &&
				root.getDir().getValue().equals("/")){
				return root;
			}else{
				BTNode frac=getDivFracao(root.getEsq());
				if (frac==null)frac=getDivFracao(root.getDir());
				return frac;
			}
		}else{
			return null;
		}
	}
	
	/**
	 * Separa os temos de ums quadrado de soma, diferenca ou ambos. E os retorna em um 
	 * array.Exemplo: x^2+2x+1 =>(x+1)(x+1) usrFolhas conterá {x,x} ou {1,1}
	 * @param bt a equação do segundo grau com o format ax^2+bx+c=0
	 * @param usrFolhas resposta do usuário contetndo somente os itens referentas a "a" ou "c"
	 * @return um array contendo os termos 
	 */
	public static BTNode[] getTermosQSD(BTNode bt, BTNode[] usrFolhas){
		String x=bt.getValue();
		BTNode[] termos=new BTNode [2];
		if (usrFolhas[0]==null)return termos;
		String uVal1=usrFolhas[0].getValue();
		String uVal2;
		if (usrFolhas[1]!=null)uVal2=usrFolhas[1].getValue();
		else uVal2=usrFolhas[0].getValue();
		if (uVal1.equals("^"))uVal1=usrFolhas[0].getEsq().getValue();
		if (uVal2.equals("^"))uVal2=usrFolhas[1].getEsq().getValue();
		String inc1=Funcoes.getInc(uVal1),inc2=Funcoes.getInc(uVal2);
		int v1=Funcoes.getINT(uVal1),v2=Funcoes.getINT(uVal2);
		int pot1=Funcoes.getPotencia(usrFolhas[0]);
		int pot2;
		if (usrFolhas[1]!=null)pot2=Funcoes.getPotencia(usrFolhas[1]);
		else pot2=Funcoes.getPotencia(usrFolhas[0]);
		if (x.equals("^"))x=bt.getEsq().getValue();
		int val,pot;
		String inc;
		val=Funcoes.getINT(x);
		inc=Funcoes.getInc(x);
		pot=Funcoes.getPotencia(bt);
		int iVal=(int)Math.sqrt(val);
		double dVal=Math.sqrt((double)val);
		if (iVal!=dVal){
			//se n for um raiz, decompor em fatores primos
			//encontrar na resposta do aluno os fatores
		
			v1*=v2;
			pot1+=pot2;
			if (v1==val && pot1==pot){
				termos[0]=(BTNode)usrFolhas[0].clone();
				termos[1]=(BTNode)usrFolhas[1].clone();
			}
		}else{
			val=iVal;
			if (!inc.isEmpty())pot=1;
			x=val+inc;
			if (x.equals(v1+inc1) && x.equals(v2+inc2)){
				termos[0]=(BTNode)usrFolhas[0].clone();
				if (usrFolhas[1]!=null)termos[1]=(BTNode)usrFolhas[1].clone();
				else termos[1]=null;
			}
		}
		return termos;
	}
	
	/**
	 * Verifica se expression contem termos em evidencia
	 * @param e a {@link Expression} a ser analisada 
	 * @return um {@link BTNode}com o bloco da equação com o termo
	 * em evidencia.
	 */
	public static BTNode getTermosEmEvidencia(Expression e){
		Vector<BTNode> v=Expression.buscaXall("*",e.getRoot());
		Vector<BTNode> folhas;
		Funcoes.t();
		BTNode nodo;
		if (v.size()==1){
			nodo=v.get(0);
			if (nodo.getPai()!=null && nodo.getPai().getValue().equals("=")){
				if ((nodo.getEsq().eFolha()||nodo.getEsq().getValue().equals("^")) &&
					 (!nodo.getDir().eFolha() && !nodo.getEsq().getValue().equals("^"))){
					folhas=Funcoes.getIncognitas(nodo.getEsq(),new Vector<BTNode>());
					if (!folhas.isEmpty()){
						folhas=Funcoes.getIncognitas(nodo.getDir(),new Vector<BTNode>());
						if (!folhas.isEmpty()){
							return nodo;
						}
					}	
				}
			}
			return null;
		}else return null;
	}

	
	/**
	 * função que verifica se a equação possui apenas sinais de + e - e
	 * se possui incognitas com e sem potencia
	 */
	public static boolean validarFatorComum(Expression e){
		BTNode root=e.getRoot();
		String exp=e.getnewexpression();
		String nExp=exp.substring(0,exp.indexOf("="));
		if (!root.getDir().getValue().equals("0") || !Funcoes.canFatorComum(root.getEsq(),nExp)){
			nExp=exp.substring(exp.indexOf("=")+1,exp.length());
			return root.getEsq().getValue().equals("0") && Funcoes.canFatorComum(root.getDir(),nExp);
		}else return true;
	}
	
	/**
	 * Lista em op todos os nodos que contem operadores a partir de bt
	 * @param bt um {@link BTNode}, a raiz da sub arvore
	 * @param op uma {@link List} de BTNode, na qual armazenara os nodos obtido por este método
	 * @return op contendo todos os operadores da subarvore bt
	 */
	public static List<BTNode> listOperators(BTNode bt, List<BTNode> op){
		if (bt!=null && !bt.eFolha()){
			op=listOperators(bt.getEsq(), op);
			if (Funcoes.isOp(bt.getValue()))op.add(bt);
			op=listOperators(bt.getDir(), op);
		}
		return op;
	}
	
	/**
	 * Busca por nodos filhos de - a fim de se possa transformar este - em -1*
	 * tipo 2=3-(4x-2) transformar em 2=3+(-1)*(4x-2)
	 */
	public static BTNode getMultMenosUm(BTNode bt){
		BTNode accepted=null;
		if (bt!=null && !bt.eFolha()){
			ArrayList<BTNode> forbidden=new ArrayList<BTNode>();
			forbidden.add(new BTNode ("*"));
			forbidden.add(new BTNode ("/"));
			forbidden.add(new BTNode ("^"));
			forbidden.add(new BTNode ("R"));
			if (bt.getValue().equals("-")){
				//validar apenas se n tiver outro sinal além de + e -
				if (Funcoes.contains(Funcoes.listOperators(bt,new ArrayList<BTNode>()),forbidden,new BTNodeComparator() )){
					accepted=getMultMenosUm(bt.getEsq());
					if (accepted==null) accepted=getMultMenosUm(bt.getDir());
				}else{
					if (!bt.getDir().eFolha())accepted=bt.getDir();
				}
			}else{
				accepted=getMultMenosUm(bt.getEsq());
				if (accepted==null) accepted=getMultMenosUm(bt.getDir());
			}
		}
		return accepted;
	}
	
	
	public static BTNode getZEROtoBeRemoved(BTNode root){
		List<BTNode> zeros= Expression.buscaXall("0", root);
		BTNode selected=null;
		for(BTNode bt:zeros){
			if (bt.getValue().equals("0") && !bt.getPai().getValue().equals("=") && verificaCaminho(bt, root, "+"))selected=bt;
		}
		return selected;
	}
	
	/*
	 * Remove um nodo da arvore, mandtendo as referencias aos nodos
	 * Corrige a deficiencia de Expression.removeNoArvore
	 */
	public static BTNode removeNoArvore(BTNode nodo, Expression e){
		BTNode root=e.getRoot();
		if (nodo.getPai().getValue().equals("=")){
			root.setDir(null);
			root.setDir(new BTNode ("0"));
		}else Expression.removeNoArvore(nodo);
		return nodo;
	}
	
	public static BTNode removeSQUARERoot(BTNode bt){
		if (bt!=null){
			removeSQUARERoot(bt.getEsq());
			removeSQUARERoot(bt.getDir());
			if (bt.getValue().equals("R")){
				Expression.removeNoArvore(bt.getDir());
			}
		}
		return bt;
	}
	
	
	/**
	 * Considera termos como x^2, 2x^2, 2R2, (2x)R2 como folhas
	 * @param bt o nodo a ser avaliado.
	 * @return <code>true</code> se bt for considarado folha e <code>false</code> caso contrario.
	 */
	public static boolean isSquaredLeaf(BTNode bt){
		if (bt.getValue().equals("^") || bt.getValue().equals("R")){
			if (bt.getEsq().eFolha() && bt.getDir().getValue().equals("2"))return true;
		}
		return false;
	}
	
	/**
	 * Verifica se é uma fração simples com apenas um termo no numerador e
	 * um termo no denominador
	 * @param bt o nodo contendo o "/" da fração
	 * @return <code>true</code> se bt for este tipo de fração e <code>false</code> caso contrario
	 */
	public static boolean isSingleFraction(BTNode bt){
		if (bt.getValue().equals("/")){
			BTNode esq= bt.getEsq();
			BTNode dir= bt.getDir();
			boolean leafE,leafD, leafSquareE, leafSquareD;
			leafE=leafD=leafSquareD=leafSquareE=false;
			if (esq.eFolha()) leafE=true;
			if (dir.eFolha()) leafD=true;
			
			if (!leafE && isSquaredLeaf(esq))leafSquareE=true;
			if (!leafD && isSquaredLeaf(dir))leafSquareD=true;
			
			return (leafE || leafSquareE) && (leafD || leafSquareD);
		}
		return false;
		
	}
	
	/**
	 * Realiza a operação de potenciação (ao quadrado) do valor contido em BT
	 * @param bt o nodo que sera elevado ao quadrado, seja folha ou ^
	 * @return o nodo contendo a aplicação da operação de potenciação.
	 */
	public static BTNode potenciaINTinc(BTNode bt){
		BTNode aux=bt;
		if (aux.getValue().equals("^"))aux=aux.getEsq();
		int val=getINT(aux.getValue());
		String inc= getInc(aux.getValue());
		int potInc= getPotencia(bt);
		if (potInc>1) potInc+=2;
			else potInc=2;
		bt.setEsq(null);
		bt.setDir(null);
		//elevar valores ao quadrado
		if ((val!=1 && val!=-1) && !inc.isEmpty()){
			bt.setValue("*");
			bt.setEsq(new BTNode ("^", new BTNode (val), new BTNode ("2")));
			bt.setDir(new BTNode ("^", new BTNode (inc), new BTNode (String.valueOf(potInc))));
		}else{
			bt.setEsq(new BTNode(aux.getValue()));
			bt.setDir(new BTNode(String.valueOf(potInc)));
			bt.setValue("^");
		}
		return bt;
	}
	
	public static void debug(Expression e, String ... msg){
		System.out.println("***************");
		System.out.println("Equacao: "+e.getnewexpression());
		System.out.println("Chegou ate aqui");
		for (String s:msg){
			System.out.println(s);
		}
		System.out.println("***************");
	}
	
	/**
	 * Verifica se uma fração está compondo uma soma de uma fração com um "numero inteiro",
	 * leia-se denomandor = 1. Inserido pela regra Prepara Soma Subtracao de Fracoes
	 * @param frac a fração a ser analizada
	 * @return <code>true</code> se a fração faz parte desta soma/subtração e <code>false</code>
	 * caso contrario.
	 */
	public static boolean checkForSomaSubFracINT(BTNode frac){
		if (frac.getValue().equals("/")){
			if (isSingleFraction(frac) && 
					(frac.getPai().getValue().equals("+") ||frac.getPai().getValue().equals("-"))){
				BTNode brother;
				if (frac.ehFilhoEsq())brother=frac.getPai().getDir();
				else brother = frac.getPai().getEsq();
				
				if (brother.getValue().equals("/") && brother.getDir().getValue().equals("1")) return true;
			}
		}
		return false;
	}
	
	/**
	 * VErifica se no caminho de frac até destino ha somete os valores presentes na whiteList,
	 * a busca é exclusiva-inclusiva
	 * @param frac o inicio da busca
	 * @param destino o ultimo nodo da busca
	 * @param whiteList os valores permitidos de conter entre 
	 * @return <code>true</code> se há somente os nodos presentes em whiteList e <code>false</code>
	 * caso contrario.
	 */
	public static boolean checkFathers(BTNode origem,BTNode destino, List<String> whiteList){
		boolean result=false;
		do{
			origem = origem.getPai();
			if (find(whiteList,origem.getValue())!=null)result=true;
			else result=false;
			
		}while (origem!=null && origem!=destino);
		return result;
	}
	
	public static BTNode makeAddSubFactions(BTNode operacao, Expression e){
		BTNode bt=null, fact=null;
		List <BTNode> fracs= Arrays.asList(new BTNode[]{operacao.getEsq(),operacao.getDir()});
		//primeria etapa - calcular o mmc
		for (int i=0;i<fracs.size();i++){
			bt=fracs.get(i);
			if (bt.eFolha()){
				bt.setEsq(new BTNode (bt.getValue()));
				bt.setDir(new BTNode ("1"));
				bt.setValue("/");
			}
			bt=bt.getDir();
			if (Funcoes.canFatorComum(bt,e.setmod(bt))){
				//função de fatoração exige raiz "="
				fact=new BTNode("=",(BTNode)bt.clone(),new BTNode("0"));
				try {
					fact=new Expression(Funcoes.fatorar(fact)).getRoot();
				} catch (InvalidValueException e1) {e1.printStackTrace();}
				//dir pois é o denominador
				fracs.set(i,fact);
				e.setmod();
				bt=fact;
			}
			else{
				fracs.set(i,bt);
				e.setmod();
			}
		}
		//calcula o mmc
		bt=Funcoes.mmcPolinomios(new Vector(fracs),e);
		// pega a operação para poder montar uma nova equação apenas para aplicar a multiplicação
		//do MMC pelo numerador
		BTNode pai=operacao.getPai();
		if (operacao.ehFilhoEsq())pai.setEsq(null);
		else pai.setDir(null); 
		//segunda etapa dividir o denominador da nova fração
		//cria uma equação nova apenas para executar a multplicação do mmc pelos numeradores
		// modelo:  (Fração1+Fração2=0)/(variável bt)
		BTNode newEq=new BTNode ("=",operacao,new BTNode ("0"));
		newEq=new BTNode ("/",newEq,bt);
		Expression expr=new Expression(newEq); 
		//newEq apontara para o mmc
		newEq=Funcoes.calcularMMC(expr.getRoot(),expr);
		//ir até o resultado das multiplicações,
		// ou seja, filho esquerdo do filho esquerdo da raiz,
		// onde raiz é "/" e o filho esquerdo é "="
		newEq=newEq.getPai().getEsq().getEsq();
		newEq.getPai().setEsq(null);
		//montar a divisão
		newEq=new BTNode("/",newEq,bt);
		if (pai.getEsq()==null)pai.setEsq(newEq);
		else pai.setDir(newEq);
		return e.getRoot();
	}
	
	
	/**
	 * Ajusta o sinal de - em casos como x=-(12)/(19), o que faz com que internamente a equação seja
	 * x=-1*(12/19). O ajuste torna a equação x=(-12)/(19). Este método somente irá funcionar em equações
	 * cujo um dos lados seja "x=", onde x é uma incógnita válida
	 * @param e a {@link Expression} a ser ajustada
	 * @return a {@link Expression} ajustada
	 */
	public static Expression removeAbstractTermInFractionResult(Expression e){
		BTNode root= e.getRoot();
		BTNode esq = root.getEsq(), dir=root.getDir();
		BTNode abs=e.getAbstract();
		if ((Funcoes.isInc(esq.getValue()) || Funcoes.isInc(dir.getValue())) && abs!=null){
			BTNode pai,notABS,result;
			pai=abs.getPai();//pega o *, da expressão -1*a, sendo "a" uma expressão
			esq=pai.getEsq();
			dir=pai.getDir();
			if (esq==abs)notABS=dir;
			else notABS=esq;
			//processar para a fração
			if (notABS.getValue().equals("/")){
			BTNode numerador=notABS.getEsq();
			result=MiscFunctions.getResult(new BTNode ("*",(BTNode)abs.clone(),(BTNode)numerador.clone()));
				numerador.setEsq(null);
				numerador.setDir(null);
				numerador.setValue(result.getValue());
				numerador.setEsq(result.getEsq());
				numerador.setDir(result.getDir());
				Expression.removeDaArvore(abs);
				e.setmod();
			}
		}
		return e;
	}
	
	/**
	 * Método utilizado apenas para debug da funções do Drools pois estas não se pode por 
	 * um breakpoint.
	 * @return <code>true</code>
	 */
	public static boolean t(){
		if (true) return true;
		return false;
	}
	
	public static boolean j(){
		if (true)return true;
		return false;
	}

	
//	public static void main(String[] args) throws InvalidValueException {
//		String i1="(x+1)^2-x*x=0";
//		String i2="x^2+-(32)R2=0";
//		List<String> l1=Funcoes.quebrarEquacao(i1);
//		List<String> l2=Funcoes.quebrarEquacao(i2);
//		List<List<String>> l3=Conjuntos.diferencas(l1, l2);
//		System.out.println("l1="+l1+"\nl2="+l2);
//		System.out.println("l3="+l3);
//	}
	
}
