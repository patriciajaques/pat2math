package pat2math.help;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import pat2math.expressao.Expression;
import pat2math.expressao.arvore.BTNode;
import pat2math.util.Funcoes;

/**
 * Funcoes do conjunto de regras hint_selection
 * @author Henrique M. Seffrin
 *
 */
public class hintFunctions {

	private static Funcoes f=new Funcoes();
	
	public static List<BTNode> canOperateByX(String x, Expression e){
		f.modificaSinal(e.getRoot());
		List<BTNode> folhasE=Expression.getFolhasPotRaiz(e.getRoot().getEsq(),new Vector<BTNode>());
		List<BTNode> folhasD=Expression.getFolhasPotRaiz(e.getRoot().getDir(),new Vector<BTNode>());
		return checkSides(folhasE, folhasD, x, e);
	}
	
	private static List<BTNode> checkSides(List<BTNode> esq, List<BTNode> dir, String x,Expression e){
		List<BTNode> operate=operateByX(x, esq, e);
		operate.addAll(operateByX(x, dir, e));
		return operate;
	}
	
	public static List<BTNode> findDistributiva(Expression e){
		List<BTNode> distr=Expression.buscaXall("*", e.getRoot());
		List<BTNode> distribs=new ArrayList<BTNode>();
		for (BTNode bt:distr){
			if (Funcoes.ehDistributiva(bt))distribs.add(bt);
		}
		return distribs;
	}

	public static List<BTNode> operateByX(String x, List<BTNode> leafs, Expression e){
		BTNode n1,n2;
		List<BTNode> op=new ArrayList<BTNode>();
		List<BTNode> folhas=new ArrayList<BTNode>(leafs);
		n1=n2=null;
		boolean can=false;
		for(int i=0;i<folhas.size();i++){
			n1=folhas.get(i);
			if (!n1.getValue().equals("R") && !n1.getValue().equals("/")){
				for (int j=i+1;j<folhas.size();j++){
					n2=folhas.get(j);
					if (n1!=n2){
						if (x.equals("+") || x.equals("-")){
							//verifica se ambos são valores compativeis de serem somados/subtraidos
							//se são 2 inteiros, ou 2 incognitas ou duas incognitas quadradas
							can=Funcoes.isInteger(n1.getValue()) && Funcoes.isInteger(n2.getValue());
							if (!can)can=Funcoes.isInc(n1.getLast()) && Funcoes.isInc(n2.getLast());
							if (!can)can=Funcoes.isSquaredInc(n1) && Funcoes.isSquaredInc(n2);
							if (can && x.equals("+") && n2.getValue().startsWith("-"))can=false;
						}else if (x.equals("*")) can=true;
						if (can && n1!=null && n2!=null){
							BTNode pai=f.verificaPai(e, n1, n2);
							
							/* checar o caminho de n1 e n2:
							 * na soma = deve haver apenas +  caminho
							 * na sub = uma + e um numero negativo, ou apenas -
							 * na mult = deve haver apenas apenas *
							 */
							/*boolean canOp=checkNode(n1, x, pai);
							// pois o sinal de - da subtração pode estar no operando direito
							if (!canOp && x.equals("-") && n2.getFirst()=='-')canOp=checkNode(n1, "+", pai);
							// se o primeiro ja for false não é necessario verificar o segundo
							if (canOp)canOp=checkNode(n2, x, pai);
							if (!canOp && x.equals("-") && n2.getFirst()=='-' )canOp=checkNode(n2, "+", pai);
							*/
							boolean canOp = pai.getValue().equals(x);
							if (!canOp && x.equals("-") && pai.getValue().equals("+"))canOp=true;
							if (canOp){
								boolean esq,dir;
								if (x.equals("*") || x.equals("+")){
									esq=Funcoes.verificaCaminho(n1,pai,x);
									dir=Funcoes.verificaCaminho(n2,pai,x);
									canOp=esq&&dir;
								}else if (x.equals("-")){
									esq=Funcoes.verificaCaminho(n1,pai,x);
									dir=Funcoes.verificaCaminho(n2,pai,x);
									//se  n2 é filhos direto de pai vai ser validado pela função ser exclusivo-exclusivo
									if (n2.ehFilho(pai) && pai.getValue().equals("+"))dir=false;
									canOp=esq&&dir;
									//ou seja a+(-b) => a-b
									if (!canOp && esq && n2.getValue().startsWith("-"))dir=Funcoes.verificaCaminho(n2,pai,"+");
									canOp=esq&&dir;
								}
							}
							if (canOp){
								op.add(n1);
								op.add(n2);
								folhas.remove(n1);
								folhas.remove(n2);
								i--;
								j=folhas.size();
							}
						}
					}
				}
			}
		}
		return op;
	}
	
	public static boolean checkNode(BTNode bt, String op, BTNode pai){
		boolean operavel=true;
		if ((bt.eFolha() ||(bt.getValue().equals("^")&& bt.getEsq().eFolha())) &&
				!bt.getValue().equals("R")){
			BTNode filho=bt.getPai();
			while (!pai.equals(filho) && operavel &&
					(filho.getValue().equals(op))){
				if (!filho.getValue().equals(op)) operavel=false;
				filho=filho.getPai();
			}
			if (!filho.getValue().equals(op))operavel=false;
		}else operavel=false;
		return operavel;
	}
	
	public static List<BTNode> operatePotSqrt(String potSqrt, Expression e){
		List<BTNode> choosed=new ArrayList<BTNode>();
		if (potSqrt.equals("^") || potSqrt.equals("R")){
			List<BTNode> pS = Expression.buscaXall(potSqrt, e.getRoot());
			for (BTNode node: pS){
				if (Funcoes.isInteger(node.getEsq().getValue()) 
						&& Funcoes.isInteger(node.getDir().getValue())){
					//verifica se a raiz resulta em numero inteiro, se sim passa senao barra
					if (node.getValue().equals("R")){
						double r = Math.sqrt(node.getEsq().getIntValue());
						int r2= (int)r;
						if (r==r2)choosed.add(node);
					}else choosed.add(node);
				}
			}
		}
		return choosed;
	}
}
