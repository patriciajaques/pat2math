package pat2math.help;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import org.drools.common.DefaultAgenda;
import org.drools.rule.Package;
import org.drools.spi.Activation;

import pat2math.expressao.Expression;
import pat2math.expressao.arvore.BTNode;
import pat2math.expressao.arvore.InvalidValueException;
import pat2math.help.communication.CommunicationHelp;
import pat2math.help.communication.CommunicationHelpImpl;
import pat2math.help.communication.CommunicationMA;
import pat2math.help.data.MensagensErro;
import pat2math.help.format.Parser;
import pat2math.regras.MiscFunctions;
import pat2math.regras.Operacao;
import pat2math.regras.Regras;
import pat2math.resolvedor.Equacoes;
import pat2math.resolvedor.Resolvedor;
import pat2math.util.Conjuntos;
import pat2math.util.Funcoes;
import br.com.pat2math.studentModel.Animation;
import br.com.pat2math.studentModel.Knowledge;
import br.com.pat2math.studentModel.Tip;

/**
 * Seleciona uma Ajuda e exibe ao aluno, Ajudas estas que estao armazenadas no banco de dados.
 * @author Henrique M. Seffrin
 *
 */
public class Help {


	private Regras hints;
	private Resolvedor solver;
	private Regras rules;
	private CommunicationHelp dataBaseHint;
	//private CommunicationMA dataBaseAluno;
	private Parser helParser;
	private Hashtable<String, Integer> lvlsMax;
	private Hashtable<String, Integer> lvlsHalf;
	private String [] op_basicos;
	private MensagensErro mErro;
	
	/*
	 * Estruturas para detecção de gaming system 
	 */
	//private Hashtable<String, PedidoAjuda> pedidosConsecutivos;
	private PedidoAjuda hintInfo; //informações da ultima ajuda requisitada



	public Help (Resolvedor solver, List<Tip> helps) throws Exception{
		this.hints=new Regras(new String[]{"/pat2math/help/hint_selection.drl"},false,null);
		initVariables(solver, helps);
	}

	public Help (Package pkg, Resolvedor solver, List<Tip> helps) throws Exception{
		this.hints=new Regras(pkg);
		initVariables(solver, helps);
	}
	
	private void initVariables(Resolvedor solver, List<Tip> helps){
		this.solver=solver;
		this.hintInfo=new PedidoAjuda();
		
		this.rules=solver.getRegras();
		this.dataBaseHint= new CommunicationHelpImpl(helps);
		//this.dataBaseAluno=new DatabaseStudentImpl();
		//this.aluno=al;
		this.helParser=new Parser();
		op_basicos= new String[]{
				Operacao.SOMA,
				Operacao.SUBTRACAO,
				Operacao.MULTIPLICACAO,
				Operacao.POTENCIACAO,
				Operacao.RAIZ};
		Arrays.sort(this.op_basicos);
		/*
		 * array que contém a metade dos niveis máximos de cada ajuda
		 * (em caso de numero impar, a parte inteira da metade)
		 * assim se o aluno possui muito conhecimento sobre o 
		 * assunto limitar o acesso até este nivel, 
		 * 
		 */
		this.lvlsMax=dataBaseHint.getMaxLvlOfHints();
		this.lvlsHalf=new Hashtable<String, Integer>();
		Enumeration<String> en=lvlsMax.keys();
		String enEl;
		while (en.hasMoreElements()){
			enEl=en.nextElement();
			int half= ((int)(lvlsMax.get(enEl)/2))+1;
			lvlsHalf.put(enEl,half);
		}
		//mErro= new MensagensErro(new String[]{"Infelizmente não há dicas relacionadas a esta operação"});
		mErro=new MensagensErro();
	}
	
	public void setCommunicationMA(CommunicationMA databaseAluno){
		//this.dataBaseAluno=databaseAluno;
	}
	/**
	 * Seleciona uma dica de resolução para exibir ao aluno, de acordo
	 * com a equacao informada e o perfil do aluno
	 * @param equacao a equacao do exercicio, que o aluno requisitou a dica
	 * @param helps historio de ajudas requisitadas
	 * @param knowledges conhecimento atual do aluno
	 * @return Uma dica a ser apresentada ao aluno
	 * @throws InvalidValueException caso a String da equacao contenha erros de formacao
	 */
	//var uma coisa pq da forma q esta apenas dicas de correção de erro é possivel.
	//fazer a seleção aleatória das dicas.
	public Tip dica(String equacao, List<Tip> helps, List<Knowledge> knowledges) {
		try{
			// passo 1 - determinar os próximos passos de resolução da equação
			Expression eq=new Expression(equacao);
			eq.useForHints();
			List<BTNode> folhaEqE= Expression.getFolhasPotRaiz(eq.getRoot().getEsq(), new Vector<BTNode>());
			List<BTNode> folhaEqD= Expression.getFolhasPotRaiz(eq.getRoot().getDir(), new Vector<BTNode>());
			//	Hashtable<String, String> PP= new Hashtable<String, String>();
			Expression temp=null;
			//Aluno al= dataBaseAluno.select(nomeAluno);
			//if (al==null)return "Infelizmente nao é possivel apresentar uma dica pois o seu nome não está cadastrado" +
			//		" no sistema.";
//			if (al.getTimeHint()>0){
//			dataBaseAluno.update(al);
//			return "";
//			}
			//teste para as operacoes basicas (+,-,*,^,R)
			hints.clearWorkingMemory();
			hints.inserir(eq);
			hints.executar();
			List<OperacaoHint> lOp=filtrarResult(hints.getResult());
			hints.clearWorkingMemory();
//			Travas trava=null;
			//checar lOp para eliminar as operações travadas
			OperacaoHint oHint;
			for (int i=0;i<lOp.size();i++){
				oHint=lOp.get(i);
				oHint.setUsedFirstRules(true);
	//			trava=getTrava(aluno.getTravas(), oHint.getOperacao());
//				if (trava.hintTravado()){
//					lOp.remove(oHint);
//					i--;
//				}
			}
			//teste para as outras operacoes
			ArrayList<Activation> actList=solver.nextRules(eq);
			ArrayList<Activation> newActList=solver.nextRules(eq);
			String proxPassos = "";
			String cod="";

			Vector <Equacoes> resp=solver.getPassos();
			List<BTNode> dif=new ArrayList<BTNode>();
			List<BTNode> difOI=new ArrayList<BTNode>();
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
					cod=Operacao.getCodigo(proxPassos);
					//trava= dataBaseAluno.getTrava(al.getNome(), cod);
				//	trava= getTrava(aluno.getTravas(), cod);
					//if (!cod.isEmpty() && !trava.hintTravado())PP.put(cod, temp.getCleanExpression());
				}
				//geralmente o segundo add deve pegar a descrição mas se for bhaskara ou fatoração
				//são duas equações então deve apagar mais um valor de resp
//				if (!resp.isEmpty() && resp.get(resp.size()-1).getCleanEquation().startsWith("#")){
//				proxPassos=resp.remove(resp.size()-1).getCleanEquation();
//				}else{
//				temp=new Expression(resp.remove(resp.size()-1).getFullEquation());
//				dif=getEQDif(temp, folhaEqE, folhaEqD);
//				PP.put(Operacao.getCodigo(proxPassos), temp.getCleanExpression());
//				}
				//if (trava!=null && !trava.hintTravado()){
				if (!Operacao.getCodigo(proxPassos).equals(Operacao.UNIR_TERMOS) && 
						!Operacao.getCodigo(proxPassos).equals(Operacao.ERRO)){
					if (Operacao.getCodigo(proxPassos).equals(Operacao.SIMPLIFICACAO)){
						//soh fracoes simples
						for (int i=0;i<dif.size();i++){
							BTNode aux=dif.get(i);
							if (!aux.getValue().equals("/") && aux.getPai().getValue().equals("/"))dif.set(i, aux.getPai());
						}
					}
					lOp.add(new OperacaoHint(Operacao.getCodigo(proxPassos),dif));
					lOp.get(lOp.size()-1).setExpOI(difOI);
					if (!cod.isEmpty() /*&& !trava.hintTravado()*/)lOp.get(lOp.size()-1).setPP(temp);
				}
				rules.clearWorkingMemory();
				rules.inserir((Expression)eq.clone());
				newActList=new ArrayList<Activation>(Arrays.asList(
						rules.getAgenda().getActivations()));
			}
			//passo 2 - uma vez determinado(s) o(s) próximo(s) passo(s) obter o codigo da operacao
			List<Hint> dica=new ArrayList<Hint>();
			
			List<Tip> template;
			
			String codigo;	
			//parte do principio que as ajudas estarão ordenadadas por nivel em ordem decrescente
			// assim ultimo nivel requisitado de uma ajuda sera achado primeiro
			
			ArrayList<Tip> aReq = new ArrayList<Tip>(helps);// ajudas requisitadas
			
		/*	for(modeloAluno.pojo.Help h : aReq) {
				System.out.println("//////////////////// -> " + h.toString());
			}*/
			ArrayList<Knowledge> aCon= new ArrayList<Knowledge>(knowledges);
			
			Tip h;
			Knowledge knowL;
			Tip selected;
			
			int index=-1;
			int indexK=-1;
			if (!lOp.isEmpty()){
				do{
					codigo = lOp.get(0).getOperacao();
					indexK=aCon.indexOf(new Knowledge(0,codigo));
					if (indexK>-1){
						knowL= aCon.get(indexK);
						//index=aReq.indexOf(new modeleo("",0,0,codigo));
						index=-1;
						for (int i=0;i<aReq.size();i++){
							if (aReq.get(i).getOperation().equals(codigo))index=i;
						}
						int nxtlvl;
						//verifica se o nivel n é zerado o que é equivalente a não ter nivel
						if (index!=-1 && aReq.get(index).getLevel()==0)index=-1;
						if (index==-1){
							//se não haver dica relacionada, no registro do aluno,
							//então selecionar dica pelo nivel de conhecimento do aluno
							// se sabe, nivel 1, senão (int)nivelmax/2
							if (knowL.getPercentage()>0.5f){
								nxtlvl=1;
							}else{
								nxtlvl=lvlsHalf.get(codigo);
							}
							template=dataBaseHint.select(codigo, nxtlvl);
							//eliminaAjudasUtilizadas(template, aluno);
							selected=selecaoAleatoria(template);
						}else{
							h=aReq.get(index);
							nxtlvl=h.getLevel();
							nxtlvl++;
							/* o aluno tem um certo conhecimento (+ de 50%) e a proxima dica
							 * é maior que a mentade do lvl maximo:entrega respota final
							 */ 
							if (knowL.getPercentage()>0.5f&& nxtlvl>lvlsHalf.get(codigo)){
								int lMax= lvlsMax.get(codigo);
								template=dataBaseHint.select(codigo, lMax);
								//eliminaAjudasUtilizadas(template, aluno);
								selected=selecaoAleatoria(template);
							}else{
								template=dataBaseHint.select(codigo,nxtlvl);
								//eliminaAjudasUtilizadas(template, aluno);
								selected=selecaoAleatoria(template);
							}
						}
						if (selected!=null)dica.add(new Hint(selected.getId(),lOp.get(0),selected.getDescription(), selected.getLevel(),selected.getId(),
								selected.getContent(), selected.getAnimation().getCode()));
					}
					lOp.remove(0);
				}while(!lOp.isEmpty());
			}

			String di;
			Hint d = new Hint();
			String msg;
			//passo 3 selecionar a dica segundo um criterio especifico
			if (!dica.isEmpty()){
				if (dica.size()>1)Collections.sort(dica,new HintsComparator(knowledges));
				d=dica.get(0);
				//trava=dataBaseAluno.getTrava(al.getNome(), d.getOperacao().getOperacao());
				//trava=getTrava(aluno.getTravas(), d.getOperacao().getOperacao());
				di=new String (d.getTemplate());
				// interpretar a tag de resultado
				if (di.contains("<PP>")){
					/*se não for uma das 6 operações básicas subtitui <PP> pela equação da
					 * hash table
					 */
					String opera= d.getOperacao().getOperacao();
					if (Arrays.binarySearch(this.op_basicos, opera)<0 || !d.getOperacao().isUsedFirstRules()){
						di=di.replace("<PP>", "<?eq>"+d.getOperacao().getPP().getCleanExpression()+"</eq>");//PP.get(opera));
					}else{
						//obter os nodos originais
						OperacaoHint oh=d.getOperacao();
						List<BTNode> originais= oh.getExpOriginal();
						BTNode resultado;
						BTNode orig;
						// pq ^ e R usam aprans um nodo ao inves de 2
						if (oh.getOperacao().equals(Operacao.POTENCIACAO) || oh.getOperacao().equals(Operacao.RAIZ)){
							resultado= MiscFunctions.getResult(oh.getExpDica().get(0));
							orig=originais.get(0);
							orig.setEsq(null);
							orig.setDir(null);
							orig.setValue(resultado.getValue());
							orig.setEsq(orig.getEsq());
							orig.setDir(resultado.getDir());
						}else{
							resultado= MiscFunctions.getResult(oh.getExpDica().get(0));
							orig=originais.get(0);
							Expression.removeNoArvore(orig);
							orig=originais.get(1);
						}
						orig.setEsq(null);
						orig.setDir(null);
						orig.setValue(resultado.getValue());
						orig.setEsq(orig.getEsq());
						orig.setDir(resultado.getDir());
						eq.setmod();
						di=di.replace("<PP>", "<?eq>"+eq.getCleanExpression()+"</eq>");
					}
				}
				helParser.setOperacao(d.getOperacao().getOperacao());
				hintInfo.update();
				helParser.setEquacao(eq);
				if (d.getOperacao().equals(Operacao.OPERACAO_INVERSA)) {
					//helParser.setTermos(processOITags(d.getOperacao().getExpOI(), d.getOperacao().getPP()/*PP.get(Operacao.OPERACAO_INVERSA)*/, eq));
					helParser.setTermos(processOITags(eq, d.getOperacao().getPP()));
				}
				else helParser.setTermos(d.getOperacao().getExpDica());
				helParser.setTexto(di);
				helParser.parse();
				//salvar o ultimo nivel requisitado
				//aluno.getAjuda().add(0,new AjudasAluno(d.getTemplate(),d.getIdHelp(),d.getNivel(),d.getTipo()));
				//if (monitor!=null)monitor.logAjuda(d.getID());
				//TODO: apenas para teste sem travas a linha de baixo sera comentada,
				//if (trava!=null)trava.setTempoHint();
				msg= helParser.getTexto();
				msg=msg.replace("?eq", "eq");
			}else msg= mErro.getMensagem();//"Infelizmente não há dicas relacionadas a esta operação";
			//dataBaseAluno.update(aluno);
			
			Tip h2 = new Tip();
			h2.setDescription(msg);
			
			if(d.getOperacao() != null) {
				h2.setContent(d.getOperacao().getOperacao());
				h2.setLevel(d.getNivel());
				h2.setOperation(d.getOperacao().getOperacao());
				h2.setId(d.getID());
				
				Animation a = new Animation();
				a.setCode(d.getAnimationCode());
				h2.setAnimation(a);
			}
			
			return h2;
		} catch(Exception e) {
			e.printStackTrace();
			Tip h2 = new Tip();
			h2.setContent(mErro.getMensagem());
			h2.setId(-1L);
			return h2;
		}
	}

	/**
	 * Obtem um parecer de erro selecionado de acordo com a misconseption informada, e 
	 * com os dados do aluno.
	 * @param equacao a equacao do exercicio que causou a misconseption
	 * @param respAluno a resposta informada pelo aluno que causou a misconseption
	 * @param chaveBusca o nome do aluno
	 * @param misc a misconseption detectada
	 * @return um {@link ParecerErro} contendo um texto de ajuda para reparar o erro cometido
	 * @throws InvalidValueException caso equacao esteja mal formada
	 */
	public Tip parecerErro(String equacao, String respAluno, List<String> misc, List<Tip> helps, List<Knowledge> knowledges){
		try{
			
		// passo 1 selecionar a dica com base no codigo da misc e nas infomacoes do aluno
		// se nã haver misconseptions associada ao erro retoranr uma dica
		if (misc.isEmpty())return dica(equacao, helps, knowledges);
		List<MiscHelp> erro=new ArrayList<MiscHelp>();
		Expression eq=new Expression(equacao);
		Expression user=new Expression(respAluno);
		List<BTNode> diffs=new ArrayList<BTNode>();
		List<Tip> templates;
		/*diffs= getEQDif(user, Expression.getFolhasPotRaiz(eq.getRoot().getEsq(), new Vector<BTNode>()), 
				Expression.getFolhasPotRaiz(eq.getRoot().getDir(), new Vector<BTNode>()));*/
		diffs=difArvore(eq.getRoot(), user.getRoot());
	//	Aluno al= dataBaseAluno.select(nomeAluno);
	//	if (al==null)return "Infelizmente nao é possivel apresentar uma dica pois o seu nome não está cadastrado" +
	//			" no sistema.";
		
		ArrayList<Tip> aReq = new ArrayList<Tip>(helps);// ajudas requisitadas
		ArrayList<Knowledge> aCon = new ArrayList<Knowledge>(knowledges);
		
		//se chegar ate aqui significa que o aluno errou, portanto decrecer em um ponto o tempo até os proximos hint
		String content;
//		if(al.getTimeMisc()>0){
//			dataBaseAluno.update(al);
//			return "";
//		}
		Tip h;
		Tip selected;
		Knowledge knowK;
		int index=-1;
		int indexK=-1;
		//Travas trava=null;
		int nxtLVL=1;
		do{
			content=dataBaseHint.getContentRelatedToHint(misc.get(0));
			//trava=getTrava(aluno.getTravas(), content);
			//if (trava!=null) trava.decTempo();
			indexK=aCon.indexOf(new Knowledge(0,content));
			if (indexK>-1 ){//&& !trava.miscTravada()){
				//index=aReq.indexOf(new AjudasAluno("",0,0,misc.get(0)));
				for (int i=0;i<aReq.size();i++){
					if (aReq.get(i).getOperation().equals(misc.get(0)))index=i;
				}
				knowK=aCon.get(indexK);
                                //verifica se o nivel n é zerado o que é equivalente a não ter nivel
                                if (index!=-1 && aReq.get(index).getLevel()==0)index=-1;
				if (index==-1){	
					if(knowK.getPercentage()<=0.5f){
						nxtLVL=lvlsHalf.get(misc.get(0));
					}
					templates=dataBaseHint.select(misc.get(0),nxtLVL);
					//eliminaAjudasUtilizadas(templates, aluno);
					selected=selecaoAleatoria(templates);
				}else{
					h=aReq.get(index);
					nxtLVL=h.getLevel();
					nxtLVL++;
					if (knowK.getPercentage()>0.5f&& nxtLVL>lvlsHalf.get(misc.get(0))){
//						templates=new ArrayList<Ajuda>();
//						selected=null;
						String codigo=misc.get(0);
						int lMax= lvlsMax.get(misc.get(0));
						templates=dataBaseHint.select(codigo, lMax);
						//eliminaAjudasUtilizadas(templates, aluno);
						selected=selecaoAleatoria(templates);
					}else{
						templates=dataBaseHint.select(misc.get(0),nxtLVL);
						//eliminaAjudasUtilizadas(templates, aluno);
						selected=selecaoAleatoria(templates);
					}
				}
				if (selected!=null)erro.add(new MiscHelp(selected.getDescription(),misc.get(0),selected.getContent(),selected.getLevel(),
							selected.getId(), selected.getAnimation().getCode()));
			}
			misc.remove(0);
		}while(!misc.isEmpty());
		// passo 2 selecionar uma dica de acordo com um critério
		//colocar aki um if que libera ou nao o acesso ao feedback
		String mi;
		MiscHelp mh = new MiscHelp();
		String msg;
		if (!erro.isEmpty()){
			if (erro.size()>1)Collections.sort(erro, new HintsComparator(aCon));
			mh=erro.get(0);
			mi=new String (mh.getTemplate());
			if (mi.contains("<PP>")){
				String pp=getNextStepForOperation(eq, mh.getContent());
				mi=mi.replace("<PP>", "<?eq>"+pp+"</eq>");
			}
			helParser.setTexto(mi);
			helParser.setOperacao(mh.getContent());
			helParser.setEquacao(eq);
			helParser.setTermos(processForBasicOperations(diffs, content));
			helParser.parse();
			//salvar o ultimo nivel requisitado
			//aluno.getAjuda().add(0,new AjudasAluno(mh.getTemplate(),mh.getIdHelp(),mh.getNivel(),mh.getTipo()));
			//if (trava!=null) trava.setTempoMisc();
			msg= helParser.getTexto();
			msg=msg.replace("?eq", "eq");
		}else msg= mErro.getMensagem(); //"Infelizmente não há uma ajuda relacionada este erro";
		//dataBaseAluno.update(aluno);
		
		Tip h2 = new Tip();
		h2.setDescription(msg);
		
		if(mh != null && mh.getOperacao()!=null) {
			h2.setContent(mh.getContent());
			h2.setLevel(mh.getNivel());
			h2.setOperation(mh.getOperacao());
			h2.setContent(content);
			h2.setId(mh.getIdHelp());
			
			Animation animation = new Animation();
			animation.setCode(mh.getAnimationCode());
			h2.setAnimation(animation);
		}
		return h2;
		}catch (Exception e){
			e.printStackTrace();
			Tip h2 = new Tip();
			h2.setContent(mErro.getMensagem());
			h2.setId(-1L);
			return h2;
		}
	}
		
	/*private Travas getTrava(List<Travas> tr, String op){
		Travas selected=null;
		for (Travas t :tr){
			if (t.getName().equals(op)) {
				selected=t;
				break;
			}
		}
		return selected;
	}*/
	
	/*private AjudasAluno getAjudaRequisitada(int idAjuda, List<AjudasAluno> ar){
		AjudasAluno selected=null;
		for (AjudasAluno a: ar){
			if (a.getIdAjuda()==idAjuda){
				selected=a;
				break;
			}
		}
		return selected;
	}*/
	
	
	/*Nova versao de processOITags()*/
	/**
	 * Identifica os termos envolvido em uma operação inversa
	 * @param atual a equação atual
	 * @param proximo o prixomo passo da equação, quando a OI foi aplicada, 
	 * neste caso soma/subtração/divisão/multiplicação dos 2 lados
	 */
	private List<BTNode> processOITags(Expression atual, Expression proximo){
		ArrayList<BTNode> oiTags=new ArrayList<BTNode>();
		if (atual!= null && proximo!=null){
			BTNode oi, outro=null;// oi= nodo da operação inversa outro= o outro nodo operado
			//passo 1: identificar o termo que soma/divide/subtrai/multiplica em ambos os lados
			// que sempre é o nodo da esquerda do nodo filho de =
			BTNode pRoot=proximo.getRoot();
			String operacao= pRoot.getEsq().getValue();
			if (operacao.equals("/"))oi=pRoot.getEsq().getDir();
			else if (operacao.equals("R")){
				//neste caso oi é o nodo que está ao quadrado, no caso da oi ser RZ
				if (pRoot.getEsq().getEsq().getValue().equals("^")){
					oi=pRoot.getEsq().getEsq();
				}
				else oi=pRoot.getDir().getEsq();
			}else if ( operacao.equals("^")){
				// ou oi é R se a oi é ^
				if (pRoot.getEsq().getEsq().getValue().equals("R"))oi=pRoot.getEsq().getEsq();
				else oi=pRoot.getDir().getEsq();
			}
			else oi=pRoot.getEsq().getEsq();
			//passo 2: identificar o outro termo - identificar o lado original do objeto OI
			BTNode ladoOI;// o outro lado do nodo antes da OI
			BTNode oiValue=(BTNode)oi.clone();
		//	boolean incSquare=false; // se for x^2
			if (operacao.equals("+") || operacao.equals("-")){
				if (oiValue.getValue().equals("^")){
					String newV=Funcoes.trocaSinal(oiValue.getEsq().getValue());
					oiValue.getEsq().setValue(newV);
				}
				else oiValue.setValue(Funcoes.trocaSinal(oiValue.getValue()));
			}
			//ignorar o proprio objto em oi que na multiplicação/adição/subtração esta no nodo esquerdo e na divisão no direito
			if (!operacao.equals("/") && !operacao.equals("^") && !operacao.equals("R")){
				if (operacao.equals("+") || operacao.equals("-")){
					if (!proximo.buscaChaveX(pRoot.getDir().getDir(), oiValue.getValue()).isEmpty())ladoOI=pRoot.getEsq();
					else ladoOI=pRoot.getDir();
				}else{
					if(Expression.buscaX(pRoot.getDir().getDir(),oiValue.getValue())!=null)ladoOI=pRoot.getEsq();
					else ladoOI=pRoot.getDir();
				}
			}else if (operacao.equals("R") || operacao.equals("^")){
				if (oi.ehFilhoDir(pRoot))ladoOI=pRoot.getEsq();
				else ladoOI=pRoot.getDir();
			}else{
				BTNode test = Expression.buscaX(pRoot.getDir().getEsq(),oiValue.getValue());
				if (test!=null){
					if (Funcoes.isInc(test.getLast()))ladoOI=pRoot.getEsq();
					else ladoOI=pRoot.getDir();
				}else{
					ladoOI=pRoot.getDir();
				}
				
			}
			//else 
			
			// se / e * o outroobjeto é o que esta sendo multiplicado/dividido
			if (operacao.equals("/"))outro=ladoOI.getEsq();
			else if (operacao.equals("*"))outro=ladoOI.getDir();
			else if (operacao.equals("+") || operacao.equals("-")){
				// para este caso busca inteiro se oi for inteiro e incognit se oi for incognita
				// e verificar se o caminho entre o nodo e a raiz contiver apenas - e +
				//buscar folhas ignorando o nodo da oi
				oi=oiValue;
				List<BTNode> folhas=Expression.getFolhas(ladoOI.getDir());//em esq ta o nodo oi
				//filtrar valores
				if (Funcoes.isInteger(oi.getValue()))folhas=Conjuntos.getIntegers(folhas,false);
				else if (Funcoes.isInc(oi.getLast()))folhas=Conjuntos.getIncognitas(folhas, false);
				else folhas=Conjuntos.getPotInc(folhas, "2");
				/*TODO: Teste */if (folhas.isEmpty()){
					folhas=Expression.getFolhas(ladoOI.getDir());//em esq ta o nodo oi
					folhas=Conjuntos.getRaiz(folhas);
				}
				Iterator<BTNode> it=folhas.iterator();
				List<String>targets= Arrays.asList(new String[]{"+","-"});
				boolean achou=false;
				Comparator<String> comp=new Comparator<String>() {
				
					@Override
					public int compare(String o1, String o2) {
						return o1.compareTo(o2);
					}
				
				};
				while(it.hasNext() && !achou){
					BTNode nodo=it.next();
					List<String> caminho=Funcoes.getNodeValues(nodo);
					if (Funcoes.contains(caminho, targets,comp)){
					/*	if (ladoOI.ehFilhoDir()){
							//oi sempre sera adicionado primeria na lista
							outro=oi;
							oi=nodo;
						}else{*/
							outro=nodo;
						//}
					}
				}
			}/*
			  *caso de R e ^ oi será o x^2 e outro sera o numero que recebera a raiz/potencia em caso de "passa para o outro lado"
			  * se x^2=a ->  outro será "a"
			  *  se xR2= b -> outro será "b" 
			  */
			else if (operacao.equals("^") || operacao.equals("R")){
				outro=ladoOI.getEsq();
			}
			//para o caso de outro  não possuir id, ou seja, ele é filho (direto ou não) de / ou * ou R
			if (outro.getIDTermo()==-1){
				BTNode temp = helParser.getFirstNotNullID(outro);
				if (!temp.getValue().equals("="))outro.setIDTermo(temp.getIDTermo());
			}
			
			if (outro!=null){
				/*
				 * Atualiza os ID do nodos, toma como base o principio de que na regra de OI
				 * um novo nodo é adicionado a cada lado da equação, portanto os ID da esquerda são acrecidos em 1
				 * e os nodos da direita são acrecidos em 2
				 */
				// busca o verdadeiro nodo, representado por oi, na arvore a fim de verficar o verdadeiro ID
				List<BTNode> possiveisOI;
				List<List<BTNode>> idsToIdentify=new ArrayList<List<BTNode>>();
				List<String> caminho;
				BTNode possivel;
				if (outro.ehFilhoDir(pRoot)){
					
					 if (oi.getPai()!=null &&oi.getPai().getValue().equals("/")){
						 possiveisOI= Expression.buscaXall( oi.getValue(),atual.getRoot().getEsq());
						 idsToIdentify.add(Expression.buscaXall(outro.getValue(), atual.getRoot().getDir()));
					 }else{
						 possiveisOI= atual.buscaChaveX(atual.getRoot().getEsq(), oi.getValue());
						 //este tipo de operação so ocorre quando ha um nodo em cada lado portanto o id é o id de ^ ou R
						 if (!operacao.equals("R") && !operacao.equals("^"))outro.setIDTermo(outro.getIDTermo()-2);
					 }
				}else{
					if (oi.getPai()!=null &&oi.getPai().getValue().equals("/")){
						possiveisOI= Expression.buscaXall( oi.getValue(),atual.getRoot().getDir());
						idsToIdentify.add(Expression.buscaXall(outro.getValue(), atual.getRoot().getEsq()));
					}else{
						possiveisOI= atual.buscaChaveX(atual.getRoot().getDir(), oi.getValue());
						//este tipo de operação so ocorre quando ha um nodo em cada lado portanto o id é o id de ^ ou R
						if (!operacao.equals("R") && !operacao.equals("^"))outro.setIDTermo(outro.getIDTermo()-1);
					}
				}
				idsToIdentify.add(possiveisOI);
				List<BTNode> result=new ArrayList<BTNode>(3);
				//result DEVE ter SEMPRE em 0 o valor de outro 
				if (idsToIdentify.size()==1)result.add(outro);
				do{
					possiveisOI=idsToIdentify.remove(0);
					do{
						if (possiveisOI.size()==1){
							possivel=possiveisOI.remove(0);
							if (possivel.getIDTermo()==-1){
								BTNode temp = helParser.getFirstNotNullID(possivel);
								if (!temp.getValue().equals("="))possivel.setIDTermo(temp.getIDTermo());
							}
							result.add(possivel);
						}else {
							possivel = possiveisOI.remove(0);
							if (possivel.getPai().getValue().equals("^") || possivel.getPai().getValue().equals("R")){
								caminho=Funcoes.getNodeValues(possivel.getPai().getPai());//pular o pai "^"
							}else caminho=Funcoes.getNodeValues(possivel);
							boolean ok=true;
							for (String elemento: caminho){
								if (!elemento.equals("+") && !elemento.equals("-") && !elemento.equals("="))ok=false;
							}
							if (ok){
								if (possivel.getIDTermo()==-1){
									BTNode temp = helParser.getFirstNotNullID(possivel);
									if (!temp.getValue().equals("="))possivel.setIDTermo(temp.getIDTermo());
								}
								result.add(possivel);
								possiveisOI.clear();
							}
						}
					}while(!possiveisOI.isEmpty());
				}while(!idsToIdentify.isEmpty());
				oiTags.add(new BTNode ("=",result.get(1),result.get(0)));
			}
		}
		return oiTags;
	}
	
	
	/*
	 * @deprecated
	 * @param diffs
	 * @param nextStep
	 * @param exercicio
	 * @return
	 */
/*	private List<BTNode> processOITags(List<BTNode> diffs, String nextStep, Expression exercicio){
		List<BTNode> sel=new ArrayList<BTNode>();
		if (!diffs.isEmpty() && !nextStep.isEmpty()){
			//extrair diferenÃ§as
			Expression nS;
			try {
				nS = new Expression(nextStep);
			} catch (InvalidValueException e) {
				return new ArrayList<BTNode>();
			}
			List <BTNode> folhaNSEsq=Expression.getFolhasPotRaiz(nS.getRoot().getEsq(), new Vector<BTNode>());
			List <BTNode> folhaNSDir=Expression.getFolhasPotRaiz(nS.getRoot().getDir(), new Vector<BTNode>());
			//List <BTNode> difNStep= getEQDif(exercicio, folhaNSEsq,folhaNSDir);
			List <BTNode>folhaExe= Expression.getFolhasPotRaiz(exercicio.getRoot().getEsq(), new Vector<BTNode>());
			List<BTNode> difNStep= Conjuntos.diferenca(folhaNSEsq, folhaExe);
			folhaExe= Expression.getFolhasPotRaiz(exercicio.getRoot().getDir(), new Vector<BTNode>());
			difNStep.addAll(Conjuntos.diferenca(folhaNSDir, folhaExe));
			//pegar o nodo que trocoou de lado
			BTNode exer,nStep;
			//eSV e aSV usado somente por - e + para o caso de potencia
			String eV,aV,eSV="",aSV="";
			
			Operacao selected=null;
			for (Iterator<BTNode> it=diffs.iterator();it.hasNext();){
				if (!sel.isEmpty())break;
				exer=it.next();
				eV=exer.getValue();
				if (eV.equals("^")) eSV=exer.getEsq().getValue();
				if (eV.equals("1x") || eV.equals("-1x"))eV=Funcoes.formatResultado(eV);
				if (eSV.equals("1x") || eSV.equals("-1x"))eSV=Funcoes.formatResultado(eSV);
				for (Iterator<BTNode> its=difNStep.iterator();its.hasNext();){
					nStep=its.next();
					aV=nStep.getValue();
					if (aV.equals("^")) aSV=nStep.getEsq().getValue();
					if (aV.equals("1x") || aV.equals("-1x"))aV=Funcoes.formatResultado(aV);
					if (aSV.equals("1x") || aSV.equals("-1x"))aSV=Funcoes.formatResultado(aSV);
					//OI soma
					if (("-"+eV).equals(aV))selected=new Operacao(Operacao.SOMA);
					else if (!eSV.isEmpty() && ("-"+eSV).equals(aSV))selected=new Operacao(Operacao.SOMA);
					//OI sub
					else if (eV.startsWith("-") && eV.substring(1).equals(aV))selected=new Operacao(Operacao.SUBTRACAO);
					else if (!eSV.isEmpty() && eSV.substring(1).equals(aSV))selected=new Operacao(Operacao.SUBTRACAO);
					///OI mul
					else if (Funcoes.isInc(exer.getLast()) && 
							eV.substring(0, eV.length()-1).equals(aV) && 
							nStep.ehFilhoDir(nStep.getNodeX("/")))selected=new Operacao(Operacao.MULTIPLICACAO);
					else if (!Funcoes.isInc(exer.getLast()) && exer.getPai().getValue().equals("*") &&
							eV.equals(aV) && nStep.getPai().getValue().equals("/") && nStep.getPai().getDir().equals(nStep))
						selected=new Operacao(Operacao.MULTIPLICACAO);
					//OI div
					else if (exer.getPai().getValue().equals("/") && nStep.getPai().getValue().equals("*"))selected=new Operacao(Operacao.DIVISAO);
					// processar selecionados
					if (selected!=null){
						BTNode otherSide=null;
						//OI soma e OI sub
						if (selected.equals(Operacao.SOMA) || selected.equals(Operacao.SUBTRACAO)){
							char type='x';
							BTNode pai=exer.getNodeX("=");
							List<BTNode> items=new ArrayList<BTNode>();
							if (Funcoes.isInteger(eV))type='i';
							else if (Funcoes.isSquaredInc(exer))type='q';
							// se filho esquerdo de = entao olha o direito
							if (exer.ehFilhoEsq(pai)){
								//se incognita busca outra incognitas
								if(type=='x') items=Conjuntos.getIncognitas(folhaNSDir, false);
								//se inteiro busca outros inteiros
								else if (type=='i')items=Conjuntos.getIntegers(folhaNSDir, false);
								else if (type=='q')items=Conjuntos.getPotInc(folhaNSDir, "2");
							}else{
								//se incognita busca outra incognitas
								if(type=='x') items=Conjuntos.getIncognitas(folhaNSEsq, false);
								//se inteiro busca outros inteiros
								else if (type=='i')items=Conjuntos.getIntegers(folhaNSEsq, false);
								else if (type=='q')items=Conjuntos.getPotInc(folhaNSDir, "2");
							}
							for (int i=0;i<items.size();i++){
								BTNode item= items.get(i);
								if (!item.equals(nStep)){
									if (type=='i'&&Funcoes.isInteger(item.getValue()) && canOI(item))otherSide=item;
									else if (type=='x' && Funcoes.isInc(item.getLast()) && canOI(item))otherSide=item;
									else if (type=='q' && Funcoes.isInc(item.getEsq().getLast()) && canOI(item.getPai()))otherSide=item;
								}
							}
						}
						//OI mul e OI div
						else if (selected.equals(Operacao.MULTIPLICACAO) || selected.equals(Operacao.DIVISAO)){
							if (selected.equals(Operacao.MULTIPLICACAO) && Funcoes.isInc(exer.getLast())){
								exer=(BTNode)exer.clone();
								exer.setValue(eV.substring(0, eV.length()-1));
							}
							if (nStep.ehFilhoEsq())otherSide=(BTNode)nStep.getPai().getDir().clone();
							else otherSide=(BTNode)nStep.getPai().getEsq().clone();
						}
						
						BTNode oi=new BTNode ("=",(BTNode)exer.clone(),otherSide);
						if (oi.getEsq()!=null && oi.getDir()!=null)sel.add(oi);
						if (!sel.isEmpty())break;
					}
				}
			}
		}
		if (sel.isEmpty())sel=diffs;
		return sel;
	}*/
	
	/*private boolean canOI(BTNode op){
		while(op.getPai()!=null){
			if (!Funcoes.isInteger(op.getValue()) && !Funcoes.isInc(op.getLast())){
				if (!op.getValue().equals("+") &&
				!op.getValue().equals("-")&&
				!op.getValue().equals("=")) return false;
			}
			op=op.getPai();
		}
		return true;
	}*/

	
	
	private String getNextStepForOperation(Expression eq, String operation){
		ArrayList<Activation> actList=solver.nextRules(eq);
		ArrayList<Activation> newActList=solver.nextRules(eq);
		List <Equacoes> resp=solver.getPassos();
		String nextStp="";
		String desc="";
		boolean done=false;
		if (Arrays.binarySearch(op_basicos, operation)>=0){
			eq.useForHints();
			hints.clearWorkingMemory();
			hints.inserir(eq);
			hints.executar();
			List<OperacaoHint> lOp=filtrarResult(hints.getResult());
			hints.clearWorkingMemory();
			OperacaoHint oh=null;
			for (OperacaoHint ohint:lOp){
				if(ohint.getOperacao().equals(operation))oh=ohint;
			}
			//obter os nodos originais
			if (oh==null)return nextStp;
			List<BTNode> originais= oh.getExpOriginal();
			BTNode resultado;
			BTNode orig;
			// pq ^ e R usam aprans um nodo ao inves de 2
			if (oh.getOperacao().equals(Operacao.RAIZ) || oh.getOperacao().equals(Operacao.POTENCIACAO)){
				resultado= MiscFunctions.getResult(oh.getExpDica().get(0));
				orig=originais.get(0);
				orig.setEsq(null);
				orig.setDir(null);
				orig.setValue(resultado.getValue());
				orig.setEsq(orig.getEsq());
				orig.setDir(resultado.getDir());
			}else{
				resultado= MiscFunctions.getResult(oh.getExpDica().get(0));
				orig=originais.get(0);
				Expression.removeNoArvore(orig);
				orig=originais.get(1);
			}
			orig.setEsq(null);
			orig.setDir(null);
			orig.setValue(resultado.getValue());
			orig.setEsq(orig.getEsq());
			orig.setDir(resultado.getDir());
			eq.setmod();
			nextStp=eq.getCleanExpression();
		}else{
			while (!actList.isEmpty() && !done){
				((DefaultAgenda)rules.getAgenda()).fireActivation(solver.getNextActivation(
						actList,newActList));
				actList.remove(0);

				nextStp="";
				nextStp= resp.remove(resp.size()-1).getCleanEquation();
				if (!resp.isEmpty()){
					//é a descrição
					if (resp.get(resp.size()-1).getCleanEquation().startsWith("#")){
						desc=(resp.remove(resp.size()-1).getCleanEquation())+"\n";
					}else nextStp+=" e "+ resp.remove(resp.size()-1).getCleanEquation();
				}
				//geralmente o segundo add deve pegar a descrição mas se for bhaskara ou fatoração
				//são duas equações então deve apagar mais um valor de resp
				if (!resp.isEmpty() && resp.get(resp.size()-1).getCleanEquation().startsWith("#")){
					desc=(resp.remove(resp.size()-1).getCleanEquation())+"\n";
				}
				if (Operacao.getCodigo(desc).equals(operation)) done=true;
				else{
					rules.clearWorkingMemory();
					rules.inserir((Expression)eq.clone());
					newActList=new ArrayList<Activation>(Arrays.asList(
							rules.getAgenda().getActivations()));
				}
			}
		}
		return nextStp;
	}
	
	
	private List<BTNode> processForBasicOperations(List<BTNode> diff, String operation){
		List<BTNode> d=new ArrayList<BTNode>();
		if (Arrays.binarySearch(op_basicos, operation)>=0){
			if (!operation.equals(Operacao.RAIZ) && !operation.equals(Operacao.POTENCIACAO)){
				if (diff.size()>=2){
					BTNode n1=null;
					BTNode n2=null;
					BTNode root;
					String signal="";
					if (operation.equals(Operacao.SOMA))signal="+";
					else if (operation.equals(Operacao.SUBTRACAO))signal="-";
					else if (operation.equals(Operacao.MULTIPLICACAO))signal="*";
					for (Iterator<BTNode> it=diff.iterator();it.hasNext();){
						if (n1==null){
							n1=it.next();
							n1=(BTNode)n1.clone();
						}
						if (n2==null){
							n2=it.next();
							n2=(BTNode)n2.clone();
						}
						if (n1!=null && n2!=null){
							root=new BTNode(signal,n1,n2);
							d.add(root);
						}
					}
				}
			}
		}
		if (d.isEmpty())d=diff;
		return d;
	}
	
	private List<OperacaoHint> filtrarResult(List<Object> l){
		List<OperacaoHint> lop=new ArrayList<OperacaoHint>();
		for (Object obj:l ){
			if (obj instanceof OperacaoHint)lop.add((OperacaoHint) obj);
		}
		return lop;
	}

	private List<BTNode> getEQDif(Expression eq, List<BTNode> folhaEqE, List<BTNode> folhaEqD){
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
	
	/**
	 * Ao trocar de equação este método deve ser chamado para
	 * reiniciar as travas e os niveis dos alunos. 
	 */
	/*public void reset(){
		Student aluno = (Student) ActionContext.getContext().getSession().get("alunoLogado");
		//Aluno a=dataBaseAluno.select(nome);
		unlockAll(aluno);
		if (aluno!=null){
			//List<modeloAluno.pojo.Help> aja=dataBaseAluno.getAjudaRequisitada(aluno.getName());
			//for(modeloAluno.pojo.Help aa:aja){
				//aa.setLevel(0);
			//}
			dataBaseAluno.update();
		}
	}*/
	
	/*public void eliminaAjudasUtilizadas(List<modeloAluno.pojo.Help> help, Aluno al ){
		if (!help.isEmpty()){
			modeloAluno.pojo.Help h;
			for (int i = 0; i < help.size(); i++) {
				h=help.get(i);
				AjudasAluno aa=dataBaseAluno.getAjudaRequisitada(nomeAluno).(h.getId(), al.getAjuda());
				if (aa!=null){
					if (aa.getNivel()!=0){
						help.remove(i);
						i--;
					}else if (aa.getNivel()==0){
						aa.updateLVL(h.getNivel());
						dataBaseAluno.update();
					}
				}
			}
		}
	}*/
	
	/*private void unlockAll(Student al){
		if (al!=null){
			List<Travas> lock= al.getTravas();
			for (Travas t:lock){
				t.unlock();
			}
		}
	}*/
	
	public Tip selecaoAleatoria(List<Tip> help){
		if (help.size()>1){
			int selected=(int)(Math.random()*help.size());
			return help.get(selected);
		}if (help.size()==1)return help.get(0);
		else return null;
	}
	
	private List<BTNode> difArvore(BTNode root1, BTNode root2){
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
	
	public Package getPackageRules(){
		return hints.getSession().getRuleBase().getPackage("pat2math.help");
	}
	
	public PedidoAjuda getHintInfo(){
		return hintInfo;
	}
}
