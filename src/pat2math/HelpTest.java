package pat2math;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import pat2math.help.database.PopulateHelps;
import pat2math.modeloAluno.Mensagem;
import pat2math.modeloAluno.ModeloAluno;
import br.com.pat2math.studentModel.Knowledge;
import br.com.pat2math.studentModel.Tip;

public class HelpTest {
	
	public static void main(String[] args) throws Exception {
		PopulateHelps ph = new PopulateHelps("Dicas.txt");
		ph.createList();
		ModeloAluno ma = new ModeloAluno();
		ma.setNome("teste", ph.getHelp());
		//Help h = new Help(,ph.getHelp());
		List<Knowledge> c=new ArrayList<Knowledge>();
		ArrayList<String> operacoes= new ArrayList<String>(Arrays.asList( new String[]{	"AD","SB","DV","MT","MM","DM","FC","QS","QD","PS","BK","OI","SP","RC","FT","RZ","PT","DF","DT"}));
		for (String s:operacoes){
		//	if (s.equals("MM")){
				c.add(new Knowledge(0f, s));
		//	}else c.add(new Conhecimento(0.5f, s));
		}
		ArrayList<Tip> t =new ArrayList<Tip>();
		Tip tip=new Tip();
		tip.setOperation("EqPrim_Ad_Num");
		//tip.setOperation("AD");
		tip.setContent("AD");
		tip.setLevel(2);
		t.add(tip);
	//	Tip hint=ma.hints("2-4=x",t,c);
		ma.setExpressao("2+4=x");
		ma.setOperacao("AD");
		Mensagem hint = ma.iniciaResolucao("7=x", t, c);
	//	System.out.println(hint.getDescription());
		System.out.println(hint.getFeedback());
	}
	
	/*
	public static void main(String[] args) throws Exception {
		ModeloAluno ma = new ModeloAluno();
		ma.useDatabase(false);
		// TestCommH th= new TestCommH();
		Parser parser;
		String eq = Teclado.leString("Entre com a equação:");
		Expression exp= new Expression(eq);
		//String d= ma.dica(eq);
		List<OperacaoHint> dica=processEquations(exp,ma);
		List<Help> templates;
		System.out.println("Equação :"+ eq);
		for (OperacaoHint sh:dica){
			templates=th.select(sh.getOperacao(), 0);
			System.out.println("\nOperação :"+ sh.getOperacao());
			for (Help temp:templates){
				
				String t= temp.getDescription();
				parser=new Parser(t);
				parser.setTermos(sh.getExpDica());
				parser.parse();
				System.out.println(parser.getTexto());
			}
		}
	}
	
	
	
	private static List<OperacaoHint> processEquations(Expression eq, Resolvedor solver) throws InvalidValueException{
		Regras rules=solver.getRegras();
		Expression temp;
		List<BTNode> folhaEqE= Expression.getFolhasPotRaiz(eq.getRoot().getEsq(), new Vector<BTNode>());
		List<BTNode> folhaEqD= Expression.getFolhasPotRaiz(eq.getRoot().getDir(), new Vector<BTNode>());
		//teste para as outras operacoes
		ArrayList<Activation> actList=solver.nextRules(eq);
		ArrayList<Activation> newActList=solver.nextRules(eq);
		String proxPassos = "";
	//	String cod="";

		Vector <Equacoes> resp=solver.getPassos();
		List<BTNode> dif=new ArrayList<BTNode>();
		List<BTNode> difOI=new ArrayList<BTNode>();
		List<OperacaoHint> lOp = new ArrayList<OperacaoHint>();
		while (!actList.isEmpty()){
			
			((DefaultAgenda)rules.getAgenda()).fireActivation(solver.getNextActivation(
					actList,newActList));
			actList.remove(0);


			
			if (!resp.isEmpty()){
				temp=new Expression(resp.remove(resp.size()-1).getFullEquation());
				difOI=getEQDif(temp, folhaEqE, folhaEqD);
				dif=difArvore(eq.getRoot(), temp.getRoot());
				if (resp.get(resp.size()-1).getCleanEquation().startsWith("#")){
					proxPassos=resp.remove(resp.size()-1).getCleanEquation();
				}else{
					Expression temp2=new Expression(resp.remove(resp.size()-1).getFullEquation());
					List<BTNode> dif2= difArvore(eq.getRoot(), temp2.getRoot());
					//			List<BTNode> difOI2=getEQDif(temp2, folhaEqE, folhaEqD);
					if (dif.size()>dif2.size())dif=dif2;
					proxPassos=resp.remove(resp.size()-1).getCleanEquation();
				}
	//			cod=Operacao.getCodigo(proxPassos);
			}
//			}
			lOp.add(new OperacaoHint(Operacao.getCodigo(proxPassos),dif));
			lOp.get(lOp.size()-1).setExpOI(difOI);
			//if (!cod.isEmpty() && !trava.hintTravado())lOp.get(lOp.size()-1).setPP(temp);
			rules.clearWorkingMemory();
			rules.inserir((Expression)eq.clone());
			newActList=new ArrayList<Activation>(Arrays.asList(
					rules.getAgenda().getActivations()));
		}
		return lOp;
	}
	
	
	private static List<BTNode> difArvore(BTNode root1, BTNode root2){
		List <BTNode> dif=new ArrayList<BTNode>();
		if (root1!=null && root2!=null){
			if (!root1.igual(root2)) dif.add(root1);
			else {
				List<BTNode> e=difArvore(root1.getEsq(), root2.getEsq());
				List<BTNode> d=difArvore(root1.getDir(), root2.getDir());
				if(!e.isEmpty() && !d.isEmpty())dif.add(root1);
				else if (!e.isEmpty())dif.addAll(e);
				else if (!d.isEmpty())dif.addAll(d);
			}
		}else if(root1!=null) dif.add(root1);
		return dif;
	}
	
	private static List<BTNode> getEQDif(Expression eq, List<BTNode> folhaEqE, List<BTNode> folhaEqD){
		List<BTNode> dif;
		dif= Expression.getFolhasPotRaiz(eq.getRoot().getEsq(), new Vector<BTNode>());
		if (!dif.isEmpty()){
			dif=Conjuntos.diferenca( dif,folhaEqE);

		}
		if (dif.isEmpty()){
			dif=Expression.getFolhasPotRaiz(eq.getRoot().getDir(), new Vector<BTNode>());
			if (!dif.isEmpty())dif= Conjuntos.diferenca( dif,folhaEqD);
		}
		return dif;
	}

*/
}