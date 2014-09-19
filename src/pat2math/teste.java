package pat2math;

import pat2math.expressao.Expression;

import pat2math.util.Funcoes;



/**
 * Classe utilizada para testes
 * @author Henrique M. Seffrin
 *
 */

public class teste /*extends ModeloAluno*/{

	public teste() throws Exception {
		//super();
	}
	
	public static void main(String args[]) throws Exception{
		/*Expression exp=new Expression("2*3/2+4/2");
		exp.setNewRoot(exp.getRoot());
		BTNode d[]=new BTNode[2];
		List<BTNode> l=new ArrayList<BTNode>();
		l.add(d[0]);
		l.add(d[1]);
		System.out.println(exp.getCleanExpression());
		String s="-1x";
		s=s.replace("1x", "x");
		System.out.println(s);*/
		
		Expression exp=new Expression ("x=-(19)/(12R2)");
		exp.removeSimpleAbstractTerm();
		//Funcoes f =new Funcoes();
		//f.modificaSinal(exp.getRoot());
		exp.setmod();
		System.out.println(exp.getnewexpression());
		
	}
}