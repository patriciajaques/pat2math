package pat2math.util;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Vector;

import pat2math.expressao.Expression;
import pat2math.expressao.arvore.BTNode;
import pat2math.regras.MiscFunctions;

/**
 * Conjunto de operacoes sobre Listas, como métodos de extração
 * das diferenças entre as listas ou filtragem de dados.
 * @author Henrique M. Seffrin
 *
 */
public class Conjuntos {
	
	/**
	 * Obtem os BTNodes de li1 que não estejam em li2
	 * @param li1 uma List de BTNodes
	 * @param li2 uma List de BTNodes
	 * @return os BTNodes de li1 que não estão em li2
	 */
	/*
	 * Alterar de forma a verifcar se os nodos folha com o mesmo valor, são realmente os menmos nodos e 
	 * não um nodo com valor igual.
	 * Fazer validar, sendo como equação inicial a primeira ou a segunda para chega até a ultima 
	 * x=(2+((-2^2)-4*1*(-3))R2)/(2*1)
	 *	x=((2+((4+12)R2))/(2*1))
	 * x=(2+4)/(2*1)
	 */
	public static List<BTNode> diferenca(List<BTNode> li1,List<BTNode> li2){
		List<BTNode>l1=new ArrayList<BTNode>(li1),l2=new ArrayList<BTNode>(li2);
		BTNode obj1,obj2;
		for (int i=l1.size()-1;i>=0;i--){
			obj1=l1.get(i);
			for (int j=l2.size()-1;j>=0;j--){
				obj2=l2.get(j);
				if (obj1.igual(obj2) && checkNodesForEquality(obj1,obj2)){
					//if (obj1.getPai().igual(obj2.getPai()) ||
/*Novo codigo*/		//		((obj1.getPai().getValue().equals("=") && obj2.getPai().getValue().equals("+")) ||
/*para os casos de*///				obj1.getPai().getValue().equals("+") && obj2.getPai().getValue().equals("="))){
/*ax=bx =>ax-bx=0*/		if (obj1.getValue().equals("^") ||
							obj1.getValue().equals("R")){
							if (l1IsInl2(Expression.getFolhas(obj1.getEsq()), 
							 Expression.getFolhas(obj2.getEsq()))&&
							 l1IsInl2(Expression.getFolhas(obj1.getDir()), 
							 Expression.getFolhas(obj2.getDir()))){
								l1.remove(obj1);
								l2.remove(obj2);
								break;
							}
						}else{
							l1.remove(obj1);
							l2.remove(obj2);
							break;
						}
					//}
				}
			}
		}
		return l1;
	}
	
	/**
	 * Verifica dois nodos a fim de verificar se estes são iguais.
	 * <br> No qual, igualdade vai além dos nodo possuirem valores iguais,
	 * mas se ambos possuem os mesmos pais, ou seja, se no caminho entre
	 * o nó e a raiz da arvore de ambos os nodos forem os mesmos operadores.
	 * <b>Este metodo não chec a os valroes dos nodos</b>
	 * @param node um {@link BTNode}
	 * @param node2 un {@link BTNode}
	 * @return <code>true</code> se os nodos forem iguais e <code>false</code> caso contrario.
	 */
	public static boolean checkNodesForEquality (BTNode node,BTNode node2){
		if (node.igual(node2)){
			ArrayList<String> nodeOp=Funcoes.getNodeValues(node);
			ArrayList<String> node2Op=Funcoes.getNodeValues(node2);
			boolean done=false;
			boolean igual=false;
			int i=0;
			int i2=0;
			//descarta de cara se os nos forem filhos de "/" mas um é numerador e o outro é denominador
			if (node.getPai().getValue().equals("/") && node2.getPai().getValue().equals("/")){
				if (node.ehFilhoEsq() && node2.ehFilhoDir()) return false;
				if (node.ehFilhoDir() && node2.ehFilhoEsq()) return false;
			}
			
			//descarta de cara se um nodo for denominador e outro não
			if (node.getPai().getValue().equals("/") && node.ehFilhoDir() && !node2.getPai().getValue().equals("/")){
				return false;
			}
			if (node2.getPai().getValue().equals("/") && node2.ehFilhoDir() && !node.getPai().getValue().equals("/")){
				return false;
			}
			//para o cas de alguma equação onde opde haver algo do tipo
			// a+b=c onde c pode ser considerado igual caso
			//apareça um +,-,* ou se o numerador da fração
			if (node.getPai().getValue().equals("=") ||
					node2.getPai().getValue().equals("=")){
				if (node.getPai().igual(node2.getPai()))return true;
				// no que é filho direto de "="
				BTNode nVer; // nVer nodo a ser verificado se ele é filho de +,* ou se é numerador
				if (node.getPai().getValue().equals("="))nVer=node2;
				else nVer=node;
				//nVer deve ser associtivo para pode passar ou ser numerador de fração e 
				//esta deve ser associtiva
				boolean associativa=ehAssociativa(nVer);
				if (associativa){
					return true;
				}else if (nVer.getPai().getValue().equals("/") && 
						nVer.ehFilhoEsq(nVer.getPai()) &&
						associativa){
					return true;	
				}				
				return false;
			}else{
				while(!done){

					if (i>=nodeOp.size() || i2>=node2Op.size()){
						done=true;
					}else if (nodeOp.get(i).equals(node2Op.get(i2))){
						while(nodeOp.get(i).equals("+")){
							i++;
						}
						while (node2Op.get(i2).equals("+")){
							i2++;
						}
						if(nodeOp.get(i).equals(node2Op.get(i2))){
							igual=true;
							i++;
							i2++;
						}
//						else{
//							igual=false;
//							done=true;
//						}	
						//TODO: Teste
					}else if (nodeOp.get(i).equals("=")&& (node2Op.get(i2).equals("+") || node2Op.get(i2).equals("*"))){
							i2++;
					}else if (node2Op.get(i2).equals("=")&& (nodeOp.get(i).equals("+") || nodeOp.get(i).equals("*"))){
							i++;
							//TODO: Fim Teste
					}else if(!nodeOp.get(i).equals(node2Op.get(i2))){
						igual=false;
						done=true;
					}
				}
				if (!igual){
					/*caso tenha sido invalidado por haver um "/" entre 
					 * a raiz e nó, validar se for numerador
					 */
					if (nodeOp.get(i).equals("=")&& i2==node2Op.size()-2){
						igual=ehNumerador(node2);
					}else if (i==nodeOp.size()-2 && node2Op.get(i2).equals("=")){
						igual=ehNumerador(node);
					}else if (node.getPai().getValue().equals("/") &&
							ehAssociativa(node2)){
						igual=ehNumerador(node);
					}else if (node2.getPai().getValue().equals("/") &&
							ehAssociativa(node)){
						igual=ehNumerador(node2);
					}
				}
				return igual;
			}
		}
		return false;
	}
	
	
	/**
	 * Verifica se o nodo btpertence a uma operação associativa, ou seja, 
	 * se a equação contém apenas sinais de "+" ou de "*". <br>
	 * Se for fração a verificação inclui apenas o que 
	 * pertence ao numerador/denominador 
	 * @param bt a sub arvore a ser verificada
	 * @return <code>true</code> se for associativa e <code>false</code>
	 * caso contrario;
	 */
	public static boolean ehAssociativa(BTNode bt){
		List<String> caminho = Funcoes.getNodeValues(bt);
		if (caminho.contains("/"))caminho=caminho.subList(0, caminho.indexOf("/"));
		else if (caminho.contains("="))caminho=caminho.subList(0,caminho.indexOf("="));
		return MiscFunctions.checkForAssociativity(caminho);
	}

	/**
	 * Verifica se o nodo pertence ao numerador de uma fração e se esta
	 * fração é filha direta da raiz
	 * @param nVer o nodo a ser verificado
	 * @return <code>true</code> se pertence a 
	 * um numerador de fração e <code>false</code> caso contrario
	 */
	public static boolean ehNumerador(BTNode nVer){
		BTNode root= nVer.getNodeX("="),div;
		if (root!=null){
			if (root.getEsq().getValue().equals("/")) div=root.getEsq();
			else if (root.getDir().getValue().equals("/"))div=root.getDir();
			else return false;
			if (div!=null && nVer.ehFilhoEsq(div)) return true;
			else if (div.getDir().getValue().equals("/")){
				div=div.getDir();
				if (div!=null &&nVer.ehFilhoEsq(div)) return true;
				else return false;
			}
			else return false;
		}
		return false;
	}
	
	/**
	 * Verifica as diferencas entre as listas <code>l1</code> e <code>l2</code>
	 * @param l1 uma {@link List}
	 * @param l2 uma {@link List}
	 * @return uma lista contendo as listas <code>l1</code> e <code>l2</code>
	 * somente com as diferencas
	 */
	public static List<List<String>> diferencas(List<String> l1, List<String> l2){
		List<List<String>>diff=new ArrayList<List<String>>(2);
		diff.add(new ArrayList<String>(l1));
		diff.add(new ArrayList<String>(l2));
		l1=diff.get(0);
		l2=diff.get(1);
		String s1,s2;
		for (int i1=l1.size()-1;i1>=0;i1--){
			s1=l1.get(i1);
			for (int i2=l2.size()-1;i2>=0;i2--){
				s2=l2.get(i2);
				if (s1.equals(s2)){
					l1.remove(s1);
					l2.remove(s2);
					i2=-1;
				}
			}
		}
		return diff;
	}
	
	/**
	 * Obtem as frações diferentes das Listas
	 * @param l1 uma {@link List}
	 * @param l2 uma {@link List}
	 * @return uma lista contedo as frações de l1 que não estão em l2
	 */
	public static List<BTNode> diferencaFracao(List<BTNode> l1,List<BTNode> l2){
		// numeradores e denominadores serão processados separadamente pelo método <code>diferenca</code>
		List<BTNode> numeradoresDif,denominadoresDif;
		ArrayList<BTNode> numeradores1=new ArrayList<BTNode>(),
						  numeradores2=new ArrayList<BTNode>(),
						  denominadores1=new ArrayList<BTNode>(),
						  denominadores2=new ArrayList<BTNode>();
		for (BTNode frac1:l1){
			numeradores1.add(frac1.getEsq());
			denominadores1.add(frac1.getDir());
		}	
		for (BTNode frac2:l2){
			numeradores2.add(frac2.getEsq());
			denominadores2.add(frac2.getDir());
		}
		numeradoresDif=diferenca(numeradores1, numeradores2);
		denominadoresDif=diferenca(denominadores1,denominadores2);
		HashSet<BTNode> fracoes=new HashSet<BTNode>();
		for (BTNode frac:numeradoresDif){
			fracoes.add(frac.getPai());
		}	
		for (BTNode frac:denominadoresDif){
			fracoes.add(frac.getPai());
		}
		numeradoresDif.clear();
		numeradoresDif.addAll(fracoes);
		return numeradoresDif;
	}
	
	public static List<BTNode> diferencaFracaoComplexa(List<BTNode> l1,List<BTNode> l2){
		// numeradores e denominadores serão processados separadamente pelo método <code>diferenca</code>
		List<BTNode> numeradoresDif,denominadoresDif;
		ArrayList<BTNode> numeradores1=new ArrayList<BTNode>(),
						  numeradores2=new ArrayList<BTNode>(),
						  denominadores1=new ArrayList<BTNode>(),
						  denominadores2=new ArrayList<BTNode>();
		for (int i=l1.size()-1;i>=0;i--){
			BTNode frac1=l1.get(i);
			numeradores1.addAll(Expression.getFolhas(frac1.getEsq()));
			denominadores1.addAll(Expression.getFolhas(frac1.getDir()));
			for (int j=l2.size()-1;j>=0;j--){
				BTNode frac2=l2.get(j);
				numeradores2.addAll(Expression.getFolhas(frac2.getEsq()));
				denominadores2.addAll(Expression.getFolhas(frac2.getDir()));
				if (numeradores1.size()==numeradores2.size() && denominadores1.size()==denominadores2.size()){
					numeradoresDif=diferenca(numeradores1, numeradores2);
					denominadoresDif=diferenca(denominadores1,denominadores2);
					//nenhum nodo de diferente de l1 em l2
					if (numeradoresDif.isEmpty() && denominadoresDif.isEmpty()){
						numeradoresDif=diferenca(numeradores2, numeradores1);
						denominadoresDif=diferenca(denominadores2,denominadores1);
						//nenhum nodo de diferente de l2 em l1
						if (numeradoresDif.isEmpty() && denominadoresDif.isEmpty()){
							l1.remove(frac1);
							l2.remove(frac2);
							break;
						}
					}
				}
			}
		}	
				
		return l1;
	}
	
	
	/**
	 * Verifica se os BTNodes de l1 estao em l2
	 * @param l1 o conjunto de BTNodes a ser verificado
	 * @param l2 o conjunto de BTNode no qual será feita a busca
	 * @return <code>true</code> se l1 estiver em l2 e <code>false</code> caso
	 * contrario
	 */
	public static boolean l1IsInl2(List<BTNode> l1,List<BTNode> l2){
		List<BTNode> diferentes=diferenca(l1, l2);
		return diferentes.isEmpty();
	}
	
	/**
	 * Verifica a existência de pelomenos um BTNode com inteiro
	 * @param l a List de BTNodes
	 * @return <code>true</code> se haver pelomenos um BTNode
	 * com inteiro na List, e <code>false</code> caso contrario
	 */
	public static boolean checkForInt(List<BTNode> l){
		for (BTNode bt : l){
			if (Funcoes.isInteger(bt.getValue()))return true;
		}
		return false;
	}
	
	/**
	 * Obtem uma List dos BTNodes que contem valores inteiros,
	 * esta List sera um subconjunto de l
	 * @param l uma List de BTNodes
	 * @param pot <code>true</code> se quiser buscar inteiros que estão
	 * dentro de potências/raiz e <code>false</code> apenas inteiros, ou seja,
	 * nós folha.
	 * @return um subconjunto de l contendo somente BTNodes com 
	 * valores inteiros
	 */
	public static List<BTNode> getIntegers(List<BTNode> l,boolean pot){
		List <BTNode> inteiro=new Vector<BTNode>();
		String value;
		for (BTNode bt : l){
			value=bt.getValue();
			if (pot){
				if (value.equals("^") || value.equals("R")){
					if (Funcoes.isInteger(bt.getEsq().getValue()))inteiro.add(bt);
				}else if (Funcoes.isInteger(value))inteiro.add(bt);
			}else{
				if (Funcoes.isInteger(value))inteiro.add(bt);
			}
		}
		return inteiro;
	}
	
	/**
	 * Obtem uma List dos BTNodes que contem valores inteiros e iguas a x,
	 * esta List sera um subconjunto de l
	 * @param l uma List de BTNodes
	 * @param pot <code>true</code> se quiser buscar interiros que estão
	 * dentro de potências/raiz e <code>false</code> apenas inteiros, ou seja,
	 * nós folha.
	 * @param x o interio a ser filtrado
	 * @return um subconjunto de l contendo somente BTNodes com 
	 * valores inteiros e iguais a xcom raiz/potencia ou não, de acordo com pot
	 */
	public static List<BTNode> getIntegerX(List<BTNode> l, boolean pot, String x){
		List <BTNode> inteiro=new Vector<BTNode>();
		String value;
		for (BTNode bt : l){
			value=bt.getValue();
			if (pot){
				if (value.equals("^") || value.equals("R")){
					if (Funcoes.isInteger(bt.getEsq().getValue()) && value.equals(x))inteiro.add(bt);
				}else if (Funcoes.isInteger(value) && value.equals(x))inteiro.add(bt);
			}else{
				if (Funcoes.isInteger(value) && value.equals(x))inteiro.add(bt);
			}
		}
		return inteiro;
	}
	/**
	 * Verfica a existencia de pelomenos um BTNode com incognita
	 * @param l a List de BTNodes
	 * @return <code>true</code> se haver pelonos um BTNode com 
	 * incognita na List, e <code>false</code>
	 */
	public static boolean checkForX(List<BTNode> l){
		String valor;
		for (BTNode bt: l){
			valor=bt.getValue();
			if (Funcoes.isInc(valor.substring(valor.length()-1)))return true;
		}
		return false;
	}
	
	/**
	 * Obtem uma List dos BTNodes que contem incognitas,
	 * esta List sera um subconjunto de l
	 * @param l uma List de BTNodes
	 * @param pot <code>true</code> se é para levar em conta as incognitas
	 *  dentro de potencias e <code>false</code> caso contrario
	 * @return um subconjunto de l contendo somente BTNodes com 
	 * incognitas
	 */
	public static List<BTNode> getIncognitas(List<BTNode> l, boolean pot){
		List <BTNode> inc=new Vector<BTNode>();
		String valor;
		for (BTNode bt : l){
			valor=bt.getValue();
			if (Funcoes.isInc(valor.substring(valor.length()-1)))inc.add(bt);
			else if (valor.equals("^")&& pot){
				valor=bt.getEsq().getValue();
				if (Funcoes.isInc(valor.substring(valor.length()-1)))inc.add(bt);
			}
		}
		return inc;
	}
	
	/**
	 * Obtem uma List dos BTNodes que contem incognitas e uma potencia especifica
	 * exceto potencia 1, se esta não estiver especificada caso contrario
	 * também pode ser obtida
	 * esta List sera um subconjunto de l
	 * @param l uma List de BTNodes
	 * @param pot a potencia especifica
	 * @return um subconjunto de l contendo somente BTNodes com 
	 * incognitas
	 */
	public static List<BTNode> getPotInc(List<BTNode> l, String pot){
		List <BTNode> inc=new Vector<BTNode>();
		String valor;
		for (BTNode bt : l){
			valor=bt.getValue();
			if (valor.equals("^") || valor.equals("R")){
				valor=bt.getEsq().getValue();
				if (Funcoes.isInc(valor.substring(valor.length()-1)) &&
					bt.getDir().getValue().equals(pot))inc.add(bt);
			}
		}
		return inc;
	}
	
	/**
	 * Obtem uma List de BTNodes que possuiem o sinal "/", ou seja, frações,
	 * esta List será um subconjunto de l 
	 * @param l uma lista de BTNodes
	 * @return um subconjunto de l contendo sometes frações
	 */
	public static List<BTNode> getFracao(List<BTNode> l){
		List<BTNode> fracao=new ArrayList<BTNode>();
		String valor;
		for (BTNode bt: l){
			valor=bt.getValue();
			if (valor.equals("/"))fracao.add(bt);
		}
		return fracao;
	}
	
	/**
	 * Obtem uma lista de BTNodes que são Raizes, esta lista será
	 * um subconjunto de l
	 * @param l uma lista de BTNodes
	 * @return um subconjuto de l contendo somente raizes
	 */
	public static List<BTNode> getRaiz(List<BTNode> l){
		List <BTNode> raiz=new ArrayList<BTNode>();
		for (BTNode bt:l){
			if (bt.getValue().equals("R"))raiz.add(bt);
		}
		return raiz;
	}
	
	
	
	
//	public static void main(String[] args)throws InvalidValueException{
//		Expression e1=new Expression("x=((2+((4+12)R2))/(2*1))");
//		Expression e2=new Expression("x=(2+4)/(2*1)");
//		Vector<BTNode> vEsq=Expression.getFolhasPotRaiz(e1.getRoot().getEsq(), new Vector<BTNode>());
//		Vector<BTNode> vDir=Expression.getFolhasPotRaiz(e1.getRoot().getDir(), new Vector<BTNode>());
//		Vector<BTNode> v1Esq=Expression.getFolhasPotRaiz(e2.getRoot().getEsq(), new Vector<BTNode>());
//		Vector<BTNode> v1Dir=Expression.getFolhasPotRaiz(e2.getRoot().getDir(), new Vector<BTNode>());
//		System.out.println(vEsq+" "+vDir+"\n"+v1Esq+""+v1Dir);
//		List<BTNode> exp=diferenca(vEsq, v1Esq);
//		List<BTNode> ex=diferenca(vDir,v1Dir);
//		System.out.println(exp+"\n"+ex);
//	}
}