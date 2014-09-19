package pat2math.modeloAluno;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Stack;
import java.util.Vector;

import org.drools.common.DefaultAgenda;
import org.drools.rule.Package;
import org.drools.spi.Activation;

import pat2math.analisaEquacao.Pontos;
import pat2math.expressao.Expression;
import pat2math.expressao.validaEquacao;
import pat2math.expressao.arvore.BTNode;
import pat2math.expressao.arvore.InvalidValueException;
import pat2math.help.Help;
import pat2math.help.PedidoAjuda;
import pat2math.regras.EquationError;
import pat2math.regras.Operacao;
import pat2math.regras.Progress;
import pat2math.regras.Regras;
import pat2math.resolvedor.Equacoes;
import pat2math.resolvedor.Resolvedor;
import pat2math.util.Conjuntos;
import pat2math.util.Funcoes;
import pat2math.util.Teclado;
import baseDominio.POJO.MaterialInstrucionalPOJO;
import br.com.pat2math.studentModel.Knowledge;
import br.com.pat2math.studentModel.Tip;

/**
 * Classe que propoe uma equacão e pede o próximo passo ao usuario,
 * se utiliza das regras do arquivo "expressao.drl" para verificar
 * se a resposta do usuario eh valida ou nao. <br />
 * 
 * Uso:
 * <ol>
 * <li>Construir o modelo do aluno</li>
 * <li>Setar a equacao a ser pedida ao aluno (<code>setEspressao()</code>)</li>
 * <li>Iniciar o modelo do aluno (<code>start()</code>)
 * </ol>
 * @author Henrique M. Seffrin
 * @version 1.0, 02/12/2008
 * @since JDK1.6
 *
 */
/*
 * validar x=(a/b)R2
 * - permitir que a resposta do aluno contenha váriso passos resolvidos OK
 * - somar com zero após resolver equações dá smepre  errado OK
 * - mostrar mensagem "Parabéns! Equação resolvida!" OK 
 * - Validar equação reordenada!!! OK 
  */

public class ModeloAluno extends Resolvedor{

	private String nome;
	//private CommunicationMA dataB;
	private String nomeFull;
	private String original;
	private int pontos;
	private Pontos calc;
	
	
	private ArrayList<MaterialInstrucionalPOJO> equacoes; //versao antiga
	private ArrayList<EquacoesAluno> nEquacoes; //versao nova
	
	private int pointer;
	
	
	private Operacao operacao;
	private ArrayList<Stack<String>> possResp; //guarda o vector de passos quando os passos chegam na resposta
	// mas não com a operação correta
	private Stack<String> passos;
	private boolean useMisconseptions;
	private static Funcoes f=new Funcoes();
	private Help hint;
	private boolean useHint=true;
	private boolean useDatabase=true;
	private boolean loadRulesFromFile=false;

	// informa a interface que a equação é de segundo grau, posição 9 da mensagem de retorno.
	private boolean segGrau;
	
	
	
	public static String groupMisc="misconseptions";
	
	/*
	 * Se true o aluno acabou de requisistar uma ajuda qualquer outra ação relalizada torna esta variavel false;
	 */
	private boolean requestHint;
	
	
	public String getNomeFull() {
		return nomeFull;
	}

	public void setNomeFull(String nomeFull) {
		this.nomeFull = nomeFull;
	}

	public ModeloAluno() throws Exception{
		this(true);
	}
	
	public ModeloAluno (boolean useMisconception)throws Exception{
		super(Regras.loadRecourcesFromPackage("/pat2math/regras/pat2math.regras"));
		this.useMisconseptions=useMisconception;
		possResp=new ArrayList<Stack<String>>();
		passos=new Stack<String>();
		if (useMisconception){
			useDatabase(true);
			adaptFunctions();
			loadRulesFromFile=true;
			equacoes=new ArrayList<MaterialInstrucionalPOJO>(20);
			pointer=0;
			/*
			 * Responsável pelo cálculo dos pontos do aluno, no qual atribui 10 pontos por operação necessária para resolver a equação
			 * cada erro -5 pontos, cada ajuda -2 pontos.
			 */
			calc=new Pontos(this);
		}
	}
	
	public ModeloAluno(String[] files,boolean misconseptions) throws Exception{
		super(files,true);
		possResp=new ArrayList<Stack<String>>();
		passos=new Stack<String>();
		useMisconseptions=misconseptions;
		equacoes=new ArrayList<MaterialInstrucionalPOJO>(20);
		pointer=0;
	}
	
	/*public ModeloAluno(boolean misconseption) throws Exception{
		this(getFileS(new String[]{"/pat2math/regras/modelo_aluno.drl","/pat2math/regras/misconseptions.drl"}
							,misconseption), misconseption);
	}*/

    public ModeloAluno(Progress p, boolean misconseption) throws Exception {
    	super(getFileS(new String[]{"/pat2math/regras/modelo_aluno.drl", "/pat2math/regras/misconseptions.drl"}, misconseption), misconseption, p);
        possResp = new ArrayList<Stack<String>>();
        passos = new Stack<String>();
        useMisconseptions = misconseption;
    }
    
	private static String [] getFileS(String[] file, boolean useMisconseption){
		String f[];
		if (!useMisconseption){
			f=new String[1];
			f[0]=file[0];
		}else f=file;
		return f;
	}
	
	public void saveRulesToFile(){
		ArrayList<Package> pkg=new ArrayList<Package>();
		pkg.add(expressoes.getSession().getRuleBase().getPackage("pat2math.regras"));
		pkg.add(hint.getPackageRules());
		for (Package p: pkg){
			System.out.println("Salvando: "+p.getName());
			try {
				Regras.saveRecources(p.getName(), p);
			} catch (Exception e) {
				System.out.println("Não foi possível salvar o arquivo ");
			}
		}
	}
	
	/**
	 * Ativa/Desativa o uso de dicas no sistema.
	 * O sistema de dicas é ativado por padrão.
	 *  <b>Deve ser utilizada antes do <code>setNome()</code></b> 
	 * @param use <code>true</code> ativa o sistema de dicas e <code>false</code>
	 * desativa, é destivado também as regras de falsas consepções.
	 */
	public void useHint(boolean use){
		if (useDatabase)useHint=use;
		else useHint=false;
	}
	
	/**
	 * Ativa/Desativa todas as operações que utilizam banco de dados.
	 * esta função tem priridade sobre <code>useHint</code>. Se esta 
	 * função estiver "OFF" <code>useHint</code> é inutil.
	 * por padrão o uso de banco de dados é ativado.
	 * <b>Deve ser utilizada antes do <code>setNome()</code></b> 
	 * @param use <code>true</code> ativa o uso de banco de dados
	 *  e <code>false</code> desativa.
	 */
	public void useDatabase(boolean use){
		useDatabase=use;
		useHint=use;
		useMisconseptions=use;
	}
	
	/**
	 * Se <code>useDatabase</code> está desativado, desativa os recursos que 
	 * utilizam banco de dados.
	 */
	private void adaptFunctions(){
		if (!useDatabase){
			useHint=false;
			useMisconseptions=false;
		}
	}
	
	/**
	 * Obtem uma lista contendo os passos necessarios para se chegar
	 * até a equação fornecida pelo aluno.
	 * @return um <code>ArrayList</code> contendo os passos.
	 */
	public Stack<String> getPassosCorretos(){
		return passos;
	}
	/**
	 * Seta uma nova expressão no modelo do aluno
	 * @param exp a nova expressão
	 * @throws InvalidValueException 
	 */
	public void setExpressao(String exp) throws InvalidValueException{
		validaEquacao ve=new validaEquacao(exp);
		original=ve.getEquacao();
	}
	
	/**
	 * Insere a operção informada pelo aluno
	 * @param op uma constante da classe {@link Operacao}
	 */
	public void setOperacao(String op){
		operacao=new Operacao(op);
	}
	
	/**
	 * Insere o nome do aluno para uso na seleção de dicas
	 * @param nome o nome do aluno utilizado como chave na busca pelas dicas
	 */
	public void setNome(String n){
		setNome(n, null);
	}
	
	/**
	 * Insere o nome do aluno para uso na seleção de dicas
	 * @param n o nome do aluno utilizado como chave na busca pelas dicas
	 * @param helps lista de ajudas disponiveis no sistema 
	 */
	public void setNome(String n, List<Tip> helps){
		this.nome=n;
		if (helps==null || helps.isEmpty())useDatabase=false;
		try{
			adaptFunctions();
			if (useDatabase){
				//dataB=new DatabaseStudent();
				//Aluno al=dataB.select(nome);
				if (useHint){
					requestHint=false;
					if (!loadRulesFromFile)hint=new Help(this, helps);
					else hint=new Help(Regras.loadRecourcesFromPackage("/pat2math/regras/pat2math.help"),
								this, helps);
				}
				else{
					hint=null;
					useMisconseptions=false;
				}
				
			}else{
				hint=null;
				useMisconseptions=false;
			}
		}catch (Throwable e){
			System.out.println("Erro ao executar o modulo de ajuda externo, alterando para o módulo interno.");
			hint=null;
			useMisconseptions=false;
		}
	}
	
	/**
	 * Calcula o próximo passo de resolução de <code>eq</code>
	 * @param eq a equação a ser calculada
	 * @return uma {@link String} contendo o proximo passo de resolução
	 * @throws InvalidValueException se <code>eq</code> estiver inválida
	 */
	public String proximoPasso(String eq) throws InvalidValueException{
		Expression exp=new Expression(eq);
		requestHint=false;
		hint.getHintInfo().requestHint();
		expressoes.clearWorkingMemory();
		int tam= resp.size();
		expressoes.inserir(exp);
		expressoes.executar(1);
		tam=resp.size()-tam;
		int i=0;
		String p="";
		String topo="";
		while(i<tam){
			topo=resp.remove(resp.size()-1).getCleanEquation();
			p=Operacao.getCodigo(topo);
			i++;
			if (p.equals(Operacao.ERRO)){
				p=p+";"+topo;
			}else{
				p=Operacao.getCodigo(resp.remove(resp.size()-1).getCleanEquation())+";"+p;
				i++;
				//geralmente o segundo add deve pegar a descrição mas se for bhaskara ou fatoração são duas equações então deve pergar mais um valor 
				//de resp
				if (!resp.isEmpty())topo=resp.get(resp.size()-1).getCleanEquation();
				if (!resp.isEmpty() && topo.startsWith("#") && !Operacao.getCodigo(topo).equals(Operacao.ERRO)){
					p=p.replace(";", "#");
					p=Operacao.getCodigo(resp.remove(resp.size()-1).getCleanEquation())+";"+p;
					i++;
				}
			}
		}
		return p;
	}
	
	/**
	 * Exibe um caminho de resolução para a equação <code>eq</code>
	 * @param eq a equação a ser desenvolvida
	 * @return uma {@link List} contendo as equações dos passos de resolução de <code>eq</code>,
	 * no qual cada posição contem a operação seguido de um ";" e seguido da equação, se for mais de uma
	 * estas são dividas por "#".
	 * @throws InvalidValueException se <code>eq</code> estiver inválida
	 */
	//TODO: ver se é necessario liberar potencia de polinomio para os tipos (x^2+1)^2
	public List<String> mostrarPassos(String eq) throws InvalidValueException{
		int tam=resp.size();
		if (hint!=null)hint.getHintInfo().requestHint();
		requestHint=false;
		resolve(eq);
		List<String> pas=new ArrayList<String>();
		tam=resp.size()-tam;
		int i=0;
		String p="";//guarda um passo de resolução
		String topo=""; //topo da pilha (fim da fila)
		while(i<tam){
			topo=resp.remove(resp.size()-1).getCleanEquation();
			p=Operacao.getCodigo(topo);
			i++;
			if (p.equals(Operacao.ERRO)){
				p=p+";"+topo;
			}else{
				p=Operacao.getCodigo(resp.remove(resp.size()-1).getCleanEquation())+";"+p;
				i++;
				//geralmente o segundo add deve pegar a descrição mas se for bhaskara ou fatoração são duas equações então deve pergar mais um valor 
				//de resp
				if (!resp.isEmpty())topo=resp.get(resp.size()-1).getCleanEquation();
				if (!resp.isEmpty() && topo.startsWith("#") && !Operacao.getCodigo(topo).equals(Operacao.ERRO)){
					p=p.replace(";", "#");
					p=Operacao.getCodigo(resp.remove(resp.size()-1).getCleanEquation())+";"+p;
					i++;
				}
			}
			pas.add(p);
		}
		return pas;
	}
	
	/**
	 * Verifica se a equação eq ja terminou a resolução ou não.
	 * @param eq a equação a ser verificada
	 * @return <code>true</code> se não haver mais passos possiveis
	 * e <code>false</code> caso contrário.
	 */
	public boolean isEndOfResolution(String eq)throws InvalidValueException{
		if (Expression.isCoeficientExp(eq))return false;
		if (Expression.isFinalAnswerSecondDegree(eq))return true;
		Expression exp= new Expression(eq);
		expressoes.clearWorkingMemory();
		expressoes.inserir(exp);
		boolean isEnd=expressoes.getAgenda().getActivations().length==0;
		expressoes.clearWorkingMemory();
		return isEnd;
	}
	
	/**
	 * Analiza a equação e retona os possiveis próximos passos
	 * @param eq a equação a ser desenvolvida
	 * @return uma string contendo a operação seguido de um ";" e seguido da equação
	 * se for mais de uma (Bhascara e Fator comum) estas estão separasdas por "#"
	 * @throws InvalidValueException 
	 * @throws InvalidValueException caso <code>eq</code> for invalida
	 */
	public String dica(String eq)throws InvalidValueException{
		Expression exp=new Expression(eq);
		expressoes.clearWorkingMemory();
		expressoes.inserir((Expression)exp.clone());
		ArrayList<Activation>actList=new ArrayList<Activation>(Arrays.asList(
				expressoes.getAgenda().getActivations()));
		ArrayList<Activation>newActList=new ArrayList<Activation>(Arrays.asList(
				expressoes.getAgenda().getActivations()));
		String pas="";
		while (!actList.isEmpty()){
			((DefaultAgenda)expressoes.getAgenda()).fireActivation(getNextActivation(
					actList,newActList));
			actList.remove(0);
			resp.remove(resp.size()-1);//não interessa a equação apenas a descrição da regra
			if (!resp.isEmpty()){
				if (resp.get(resp.size()-1).getCleanEquation().startsWith("#")){
					pas+=(resp.remove(resp.size()-1).getCleanEquation())+"\n";
				}else resp.remove(resp.size()-1);
			}
			//geralmente o segundo add deve pegar a descrição mas se for bhaskara ou fatoração
			//são duas equações então deve apagar mais um valor de resp
			if (!resp.isEmpty() && resp.get(resp.size()-1).getCleanEquation().startsWith("#")){
				pas+=(resp.remove(resp.size()-1).getCleanEquation())+"\n";
			}
			expressoes.clearWorkingMemory();
			expressoes.inserir((Expression)exp.clone());
			newActList=new ArrayList<Activation>(Arrays.asList(
				expressoes.getAgenda().getActivations()));
		}
		if (pas.isEmpty())pas="# Nao ha operacoes disponiveis";
		return pas;
	}
	
	public Tip hints (String eq, List<Tip> helps, List<Knowledge> knowledges) throws InvalidValueException{
		Tip dica = null;
		requestHint=false;
		pontos-=2;
		
		if (hint!=null){
			dica= hint.dica(eq, helps, knowledges);
			PedidoAjuda pa=hint.getHintInfo();
			pa.requestHint();
			//dica+=";"+pa.getPedidosConsecutivos();
			requestHint=true;
		}else{
			//dica= dica(eq);
		}
		hint.getHintInfo().requestHint();
		return dica;
	}
	
	/*public void resetNiveisDicas(){
		if (hint!=null)hint.reset();
	}*/
	
	/**
	 * Verifica se <code>expression</code> eh uma expressao 
	 * válida ou não. A equação a ser resolvida pelo resovedor deve ser
	 * inserida pelo método <code>setExpressao(String exp)</code>, e a 
	 * operação é inserida através do método <code>setOperacao(String op)</code>
	 * @param usrExpression expressao do usuario
	 * @return uma das seguintes Strings:
	 * <p>
	 * <li>"true;true;Resposta Correta" - Informando que a resolução está correta e a operação
	 * escolhida foi correta</li>
	 * <li>"true;false;Resposta errada: operação incorreta" - Informando que a resolução está correta mas
	 * a operação não está</li>
	 * <li>"false;false;Resposta incorreta" - Informa que tanto a resolução estão incorretas</li>
	 */
	public Mensagem iniciaResolucao(String usrExpression, List<Tip> helps, List<Knowledge> knowledges){
		try{
			segGrau=false;
			String userAnswer=  usrExpression;
			validaEquacao val =new validaEquacao(usrExpression);
			if (hint!=null)hint.getHintInfo().madeAction();
			Expression usr=new Expression(val.getEquacao(),Expression.USER);
			//usr=Funcoes.removeAbstractTermInFractionResult(usr);
			
			usr.removeSimpleAbstractTerm();
			
			usrExpression=usr.getnewexpression();
			System.out.println(usrExpression);
			Expression usrClone=(Expression)usr.clone();
			Expression atual=new Expression(original);
			
			atual.removeSimpleAbstractTerm();
			
			Funcoes f=new Funcoes();
			f.modificaSinal(atual.getRoot());
			f.modificaSinal(usrClone.getRoot());
			atual.setmod();
			Date d= new Date();
			System.out.println("\nResolucao iniciada: "+d.toString()+"\nEquacao: "+original+" => "+atual.getnewexpression()+ "\nAluno: "+userAnswer +" => "+usr.getnewexpression() +"\n");
			//evita que uma resolução chege novamente na equação inicial
			resp.add(new Equacoes("# Equacao Inicial"));
			resp.add(new Equacoes(atual.getnewexpression(),
					atual.getCleanExpression(),
					atual.getTeXExpression()));
			boolean igual=Expression.igual(usrClone.getRoot(), atual.getRoot());
			usrClone=(Expression)usr.clone();
			boolean certa=false;
			if (!igual)certa=resolucao(usr, usrClone, atual,null);
			boolean passoCerto=false;
			checarSegundoGrau();
			if (certa && operacao.equals(Operacao.OPERACAO_GENERICA))passoCerto=true;
			boolean ig=false;
			// se a solução do aluno está certa verifica se ele utilizou a operação certa
			if (certa && !igual){
				while (certa && !passoCerto && !ig){
					passoCerto=checarOperacao();
					if (!passoCerto){
						/*
						 * se é maior que um significa que ja foi adicionado anteriormente um valor nesta lista
						 * e portanto ja n é a primera vez que uma resposta certa com operação errada é verificada
						 */
						ig=false;
						if (possResp.size()>1){
							Stack <String> pass=possResp.get(possResp.size()-1);
							if(pass.size()== passos.size()){	
								String passAntes="", passDepois="";
								if (passos.isEmpty()){
									ig=true;
									igual=true;
								}
								while(!passAntes.startsWith("#") && !passos.isEmpty()){
									passAntes=pass.get(pass.size()-1);
									passDepois=passos.get(passos.size()-1);
									if (passAntes.startsWith("#")){
										if (passAntes.equals(passDepois))ig=true;
										else ig=false;
									}
									else if (passAntes.equals(passDepois))ig=true;
								}
							}
						}
						if (!ig){
							String s="";
							//remove a resposta final  de resp para que ela possa ser encontrada
							// novamente por outro caminho
							do{
								if (!resp.isEmpty())s=resp.remove(resp.size()-1).getNotEquation();
							}while(!s.startsWith("#") && !resp.isEmpty());
							if (certa)possResp.add(passos);
							passos=new Stack<String>();
							certa=resolucao(usr, (Expression)usr.clone(), atual,null);
						}
					}/*else{
					if (!possResp.isEmpty())passos=possResp.get(possResp.size()-1);
				}*/
				}
			}
			//a ultima busca deu errada mas há uma resposta certa (com operação errada), na lista obtem essta resposta
			if (!certa && !possResp.isEmpty()){
				certa=true;
				passos=possResp.get(possResp.size()-1);
			}
			if (!certa || !passoCerto) pontos-=5;
			boolean requestHint=this.requestHint;
			this.requestHint=false;
			if (igual && !operacao.equals(Operacao.REESCREVER_EQUACAO)) {
				// 2/08/2014: Estou considerando resposta igual como resposta errada
				// só troquei o primeiro boolean da mensagem de true para false
				Mensagem m=new Mensagem("0",false,false,false,requestHint,"O passo informado é igual a equação.");

				//monitor.logEquacao(original, usrExpression, operacao.getOperacao(), m.getMSG(), m.isRespostaCerta(),
				// m.isOperacaoCerta(), m.isUltimoPasso());
				//Tip h2 = m.getFeedbackOBJ();
				//h2.setDescription("O passo informado é igual a equação.");
				//h2.setId(-1L);

				m.setOperacao(operacao.getOperacao());
				m.setRespostaAluno(userAnswer);
				m.setSegGrau(segGrau);
				return m;
			}
			else if (igual && operacao.equals(Operacao.REESCREVER_EQUACAO))passoCerto=true;
			if (certa && passoCerto){
				//checar se é o ultimo passo da resolução
				boolean ultimoPasso=false;
				if (isEndOfResolution(usrExpression))ultimoPasso=true;
				Mensagem m=new Mensagem("0",true,true,ultimoPasso,false,requestHint,"Parabéns! Sua resposta está correta.");
				//monitor.logEquacao(original,usrExpression, operacao.getOperacao(), m.getMSG(), m.isRespostaCerta(),
				//m.isOperacaoCerta(), m.isUltimoPasso());
				m.setOperacao(operacao.getOperacao());
				m.setRespostaAluno(userAnswer);
				m.setSegGrau(segGrau);
				return m;
			}else if (certa && !passoCerto){
				Mensagem m=new Mensagem("0",true,false,false,requestHint,"Sua resposta está incorreta." +
						" Você deve ter se enganado na operação escolhida.");
				//monitor.logEquacao(original,usrExpression, operacao.getOperacao(), m.getMSG(), m.isRespostaCerta(),
				//m.isOperacaoCerta(), m.isUltimoPasso());
				m.setOperacao(operacao.getOperacao());
				m.setRespostaAluno(userAnswer);
				m.setSegGrau(segGrau);
				return m;

			}	
			else if (useMisconseptions){
				List<Misconseption>misc=checkForMisconseptions(usrExpression);
				Tip feedback=hint.parecerErro(original, usrExpression, Misconseption.toListOfString(misc), helps, knowledges);
				Mensagem m=new Mensagem("0",false,false,false,requestHint,"Sua resposta está incorreta. Tente novamente!",feedback);
				//monitor.logCorrecao(original,usrExpression, operacao.getOperacao(), 
				//m.getFeedback(), m.isRespostaCerta(), m.isOperacaoCerta(), m.isUltimoPasso());
				m.setOperacao(operacao.getOperacao());
				m.setRespostaAluno(userAnswer);
				m.setSegGrau(segGrau);
				return m;
			}else{
				Mensagem m=new Mensagem("0",false,false,false,requestHint,"Sua resposta está incorreta. Tente novamente!");
				//monitor.logEquacao(original,usrExpression, operacao.getOperacao(), m.getMSG(), m.isRespostaCerta(),
				//m.isOperacaoCerta(), m.isUltimoPasso());
				m.setOperacao(operacao.getOperacao());
				m.setRespostaAluno(userAnswer);
				return m;
			}


		}catch(InvalidValueException ive){
			Mensagem m=new Mensagem("0",false,false,false,requestHint,"Sua equação possui o seguinte erro: "+ive.message());
			//monitor.logEquacao(original,usrExpression, operacao.getOperacao(), m.getMSG(), m.isRespostaCerta(),
			//m.isOperacaoCerta(), m.isUltimoPasso());
			m.setOperacao(operacao.getOperacao());
			m.setRespostaAluno(usrExpression);
			m.getFeedbackOBJ().setDescription(m.getMSG());
			m.setSegGrau(segGrau);
			return m;
		}
	}
	
	/**
	 * Verifica se a operação informada pelo usuário está na lista de passos realizados
	 * pelor resolvedor.
	 * @return <code>true</code> se estiver na lista e <code>false</code> caso
	 * contrario
	 */
	private boolean checarOperacao(){
		String regra;
		int i=0;
		boolean ok=false;
		while(!ok && i<passos.size()){
			regra=passos.get(i);
			if (regra.startsWith("#")){
				if (regra.equals("# Soma")&&operacao.equals(Operacao.SOMA))ok=true;
				else if (regra.equals("# Subtracao")&& operacao.equals(Operacao.SUBTRACAO))ok=true;
				else if ((regra.equals("# Multiplicacao") || 
					 regra.equals("# Multiplicar fracoes") ||
					 regra.equals("# Multiplicacao da equacao por -1"))&& 
						operacao.equals(Operacao.MULTIPLICACAO))ok=true;
				else if (regra.equals("# Propriedade Distributiva")&& (operacao.equals(Operacao.DISTRIBUTIVA) ||
						operacao.equals(Operacao.PROD_SOM_DIF)))ok=true;
				else if (regra.equals("# Raiz Quadrada")&& operacao.equals(Operacao.RAIZ))ok=true;
				//else if (regra.startsWith("# Operacao Inversa")&& operacao.equals(Operacao.OPERACAO_INVERSA))ok=true;
				else if ((regra.contains("Principio Aditivo") || regra.contains("Principio Multiplicativo"))&& 
						operacao.equals(Operacao.OPERACAO_INVERSA))ok=true;
				else if (regra.equals("# Aplicar formula de Bhaskara") && operacao.equals(Operacao.BHASKARA))ok=true;
				else if (regra.equals("# Calcular o delta") && operacao.equals(Operacao.BHASKARA))ok=true;
				else if (regra.equals("# Identificar os coeficientes de Bhaskara") && operacao.equals(Operacao.BHASKARA))ok=true;
				else if (regra.equals("# Extrair raiz quadrada") && operacao.equals(Operacao.RAIZ))ok=true;
				else if ((regra.startsWith("# Fator Comum"))&&
					operacao.equals(Operacao.FATOR_COMUM)) ok=true;
				else if (regra.equals("# Simplificar") && (operacao.equals(Operacao.DIVISAO) ||
						operacao.equals(Operacao.SIMPLIFICACAO)))ok=true;
				else if ((regra.equals("# Calcular MMC") || regra.equals("# Resolver MMC")) &&
						operacao.equals(Operacao.MMC))ok=true;
				else if (regra.equals("# Produto notavel - Quadrado da soma") && 
						operacao.equals(Operacao.QUADRADO_SOMA))ok=true;
				else if (regra.equals("# Produto notavel - Quadrado da diferenca")&&
						operacao.equals(Operacao.QUADRADO_DIFERENCA))ok=true;
				else if  (regra.equals("# Divisao de sinais") &&
						operacao.equals(Operacao.SIMPLIFICACAO))ok=true;
				else if (regra.equals("# Fatoracao") && 
						operacao.equals(Operacao.FATORACAO))ok=true;
				else if (regra.equals("# Multiplicacao da equacao por -1") && 
						operacao.equals(Operacao.OPERACAO_INVERSA)) ok=true;
				else if (regra.equals("# Raiz") &&
						operacao.equals(Operacao.RAIZ))ok=true;
				else if (regra.equals("# Resolver Potencia") &&
						operacao.equals(Operacao.POTENCIACAO)) ok=true;
				else if ((regra.startsWith("# Operacao Inversa") ||
						regra.equals("# Multiplicacao da equacao por -1") ||
						regra.equals("# Reescrever Equacao"))
						&& operacao.equals(Operacao.REESCREVER_EQUACAO))ok=true;
				else if (regra.equals("# Racionalizar") && operacao.equals(Operacao.RACIONALIZACAO))ok=true;
			}
			i++;
		}
		return ok;
		
	}
	
	public boolean isSegundoGrau(){
		return segGrau;
	}
	
	private void checarSegundoGrau(){
		String texto;
		for (int i=0;i<passos.size();i++){
			texto=passos.get(i);
			if (texto.equals("# Inserir ±") || 
					texto.equals("# Dividir Equacao")|| 
					texto.equals("# Aplicar formula de Bhaskara") ||
					texto.equals("# Fator Comum - Colocar termo em Evidencia")) segGrau=true;
		}
		
	}
	
	/**
	 * A partir de uma lista de possiveis passos que o aluno tenha seguido, aplica estas equações 
	 * a fim de obter a misconseption cometida
	 * @param usrEq a equação do aluno
	 * @return uma {@link String} contendo a misconseption cometida 
	 * @throws InvalidValueException erro de formação da equação
	 */
	private List<Misconseption> checkForMisconseptions(String usrEq) throws InvalidValueException{
		ArrayList<EquacaoMisc> poss=getPossiblesEquations(usrEq, 5);
		boolean done=false;
		EquacaoMisc possivel;
		List <Misconseption> resposta=new ArrayList<Misconseption>();
		while(!poss.isEmpty() && !done){
			expressoes.clearWorkingMemory();
			expressoes.setFocus(groupMisc);
			possivel=poss.remove(0);
			expressoes.inserir(possivel);			
			expressoes.executar();
			resposta=getMisconseption();
			if (!resposta.isEmpty()){
				done=true;
			}
		}
		if (resposta.isEmpty())resposta.add(new Misconseption(Misconseption.nao,new String[] {"Misconseption não detectada "}));
		expressoes.setFocus("MAIN");
		return resposta;
	}
	
	/**
	 * Otem a misconseption detectada da memória de trabalho do Sistema Especialista (SE)
	 * @return um objeto {@link Misconseption} removido da memória do SE.
	 */
	private List<Misconseption> getMisconseption(){
		Vector<Object> objs=expressoes.getResult();
		ArrayList<Misconseption> misc=new ArrayList<Misconseption>();
		for (Object temp:objs){
			if (temp instanceof Misconseption){
				misc.add((Misconseption)temp);
			}
		}
		return misc;
	}
	/**
	 * Verifica os passos realizados e selciona aqueles que mais se aproximaram da 
	 * resposta do aluno.
	 * @param usrEq Equação do aluno
	 * @param difMax diferenca maxima a ser relevada 
	 * @return um {@link ArrayList} com os possiveis passos
	 * @throws InvalidValueException 
	 */
	private ArrayList<EquacaoMisc> getPossiblesEquations(String usrEq, int difMax) throws InvalidValueException{
		ArrayList<EquacaoMisc> poss=new ArrayList<EquacaoMisc>();
		EquacaoMisc em;
		filtrarResp();
		int numDif;
		/*
		 * Guarda a equação inicial, mesmo que esta seja muito "distante" da equação do aluno
		 * pois, gerlamente é ela que vai ser utilizada na detecção das misconseptions, caso
		 * o aluno tenha avançado apenas um passo.
		 */
		EquacaoMisc inicial =calcDiff(usrEq, resp.remove(0).getFullEquation());
		for (Equacoes pEq:resp){//eq){
			if (!pEq.getFullEquation().startsWith("#")){
				em=calcDiff(usrEq, pEq.getFullEquation());
				numDif=em.getDist();
				if (numDif<=difMax)poss.add(em);
			}
		}
		Collections.sort(poss, new Comparator<EquacaoMisc>() {
		
			@Override
			public int compare(EquacaoMisc o1, EquacaoMisc o2) {
				return o1.getDist()-o2.getDist();
			}
		
		});
		poss.add(0,inicial);
		return poss;
	}
	
	/**
	 * Calcula as diferencas entre as duas equações
	 * @param eq1 a equação do aluno a ser comparada
	 * @param eq2 a equação do resolvedor a ser comparada
	 * @return um valor inteiro representanto o quão
	 * diferente as equações são.
	 */
	private EquacaoMisc calcDiff(String eq1, String eq2){
		if (eq1.isEmpty() || eq1==null){
			if (eq2.isEmpty() || eq2==null)return new EquacaoMisc(null,null,null,null,null,null,null);
			else return new EquacaoMisc(eq2,eq2.length());
		}else{
			if (eq2.isEmpty() || eq2==null)return new EquacaoMisc(eq1,eq1.length());
			else{
				List<BTNode> folhasUsrEsq,folhasUsrDir, folhasSolverEsq, folhasSolverDir;
				try {
					Expression usr=new Expression(eq1);
					Expression solver=new Expression(eq2);
					Funcoes f=new Funcoes();
					f.modificaSinal(usr.getRoot());
					f.modificaSinal(solver.getRoot());
					folhasUsrEsq = Expression.getFolhas(usr.getExp().getSignalRoot().getEsq());
					folhasUsrDir = Expression.getFolhas(usr.getExp().getSignalRoot().getDir());
					folhasSolverEsq = Expression.getFolhas(solver.getExp().getSignalRoot().getEsq());
					folhasSolverDir = Expression.getFolhas(solver.getExp().getSignalRoot().getDir());
					List<BTNode>diffEsqSolver=Conjuntos.diferenca(folhasUsrEsq,folhasSolverEsq);
					List<BTNode>diifEsqUser=Conjuntos.diferenca(folhasSolverEsq,folhasUsrEsq);
					List<BTNode>diffDirSolver=Conjuntos.diferenca(folhasUsrDir,folhasSolverDir);
					List<BTNode>diffDirUser=Conjuntos.diferenca(folhasSolverDir,folhasUsrDir);
					//int diffEq=diffEsq.size()+diffDir.size();
					return new EquacaoMisc(solver.getnewexpression(),usr,solver,diffEsqSolver,diffDirSolver,
							diifEsqUser,diffDirUser);
				} catch (InvalidValueException e) {
					return new EquacaoMisc(null,null,null,null,null,null,null);
				}
			}
		}
	}
	
	/**
	 * Remove os dados inuteis de <code>resp</code>, tais como:
	 * valores repetidos e descrição de passos
	 */
	private void filtrarResp(){
		ArrayList<String>vals=new ArrayList<String>();
		//separar a equação inicial do resto
		//remove a descriçã primeiro
		resp.remove(0);
		Equacoes inicial=resp.remove(0);
		vals.add(inicial.getFullEquation());
		for (int i=resp.size()-1;i>=0;i--){
			if (resp.get(i).getFullEquation().startsWith("#")) resp.remove(i);
			else if (vals.contains(resp.get(i).getFullEquation())) resp.remove(i);
			else vals.add(resp.get(i).getFullEquation());
			
		}
		resp.add(0,inicial);
	}
	/**
	 * Responsável pela validação da equação do aluno
	 * @param usr a Expression da equação do aluno
	 * @param usrClone um clone de <code>usr</code>
	 * @param inicial a equação a apresentada ao aluno
	 * @return true se a equação for válida e false caso contrário
	 */
	//BUG em : x^2+3x-4=0  ele tranforma x=(-3±(25)R2)/(2*1) em x=((-1*3)±(25)R2)/(2*1)
	//equação: x^2+3x-4=0
	//proximo passo: x=(-3±(25)R2)/(2*1)
	private boolean resolucao(Expression usr, Expression usrClone, Expression inicial, Expression forBhaskara){
		boolean certa=false;
		Expression clone=null;
		Activation[] active=null;
		ArrayList<Activation> actList=new ArrayList<Activation>();
		ArrayList<Activation> newActList=new ArrayList<Activation>();
		Vector<Expression> eqPasso=new Vector<Expression>(); // guarda as equacoes geradas pelo resolvedor neste nivel da recursao
		String [] pass=new String[3]; /*
		 					guarda o passo e a equação gerada neste nivel da recursão,
		 					para futuramente fazer parte ou não da lista de passos corretos 
		 					utilizados pelo aluno para atingir o resultado
		 				 */ 
		String exp;
		EquationError eError=null;
		Expression atual=(Expression)inicial.clone();
		int index=-1;
		exp=original; //se o resolvedor retornar 2 resultados iguais significa que 
		// a expressao passou  por todas as regras e não fechou com
		//nenhuma, signifcando que a expressão chegou ao fim.
		boolean done=false;
		expressoes.clearWorkingMemory();
		/*
	 	* Se o usuario passa a equaçao que o programa passou a ele
	 	* como resposta devolve erro antes que o programa começe
	 	* a resolver toda a equação a fim de achar ela mesa, em
	 	* resumo desperdicio de tempo
	 	*/ 
		
		//tem erro com 0=x^2+2x-2 e proxima eq com x^2+2x-2=0 na volta da 4ª recursão
		// pios não ha mais for bhaskara para executar mas há no actlist dando nullpointer
		if (usr!=null && usrClone!=null && atual!=null){
			//while(!done){
				if (Expression.igual(usr.getRoot(), atual.getRoot())){
					done=true;
					certa=true;
				}else{
					do{
						clone=(Expression)atual.clone();
						if (!comparar(clone,(Expression)usr.clone())){ // Verifica se são equivalentes
							expressoes.clearWorkingMemory();
							expressoes.inserir((Expression)usr);
							expressoes.inserir((Expression)atual.clone()); //insere
							if (forBhaskara!=null)expressoes.inserir((Expression) forBhaskara);
							if (active==null){
								active=expressoes.getAgenda().getActivations(); //obtem as regras
								actList=new ArrayList<Activation>(Arrays.asList(active));
							}
							if (!actList.isEmpty()){
								do{
									/*
									 *Caso o loop esteja sendo repetido 2 ou mais vezes devido a presença
									 *da equações na lista "resp" 
									 */
									if (index!=-1){
										expressoes.clearWorkingMemory();
										atual=(Expression)inicial.clone();
										expressoes.inserir((Expression)usr);
										expressoes.inserir((Expression)atual.clone());
										if (forBhaskara!=null)expressoes.inserir((Expression) forBhaskara);
									}
									newActList=new ArrayList<Activation>(Arrays.asList(
											expressoes.getAgenda().getActivations()));
									Activation act=getNextActivation(actList,newActList);
									if (act!=null){
										//descomentar somete em debug
									//	System.out.println("*******************Regra: " +act.getRule().getName());
										((DefaultAgenda)expressoes.getAgenda()).fireActivation(act);
										forBhaskara=remakeBK(forBhaskara); 
										actList.remove(0); //remove a regra utilizada
										eError= getEquationError(expressoes.getResult());
										eqPasso.addAll(filtro(expressoes.getResult()));
									}else{
										eqPasso.clear();
										actList.clear();
									}
									if (!eqPasso.isEmpty()){
										atual=eqPasso.lastElement(); // obtem a equação gerada
										eqPasso.remove(eqPasso.size()-1);
										if (atual.getTipo().equals(Expression.FOR_BHASKARA)){
											forBhaskara=atual;
											atual=eqPasso.lastElement();
											eqPasso.remove(eqPasso.size()-1);
											forBhaskara.setmod();
										}else if (!eqPasso.isEmpty() &&
											eqPasso.lastElement().getTipo().equals(Expression.FOR_BHASKARA)){
											forBhaskara=eqPasso.lastElement();
											eqPasso.remove(eqPasso.size()-1);
											forBhaskara.setmod();
										}else forBhaskara=null;
										atual.setmod();
									}
									/*
								 	* busca a existência da equação na sublista gerada,
								 	* sublista pois deve-se ignorar os 2 ultimos elementos
								 	*  que foram recentemente adicionados
								 	*/
									index=resp.subList(0, resp.size()-2).indexOf(atual.toEquacoes());
								}while (index!=-1 && !actList.isEmpty());
							}else{
								done=true;
							}
							/*
							 * significa que foi a equação foi inserida no SE mas não houve casamento de regras
							 * portanto a equação não está certa, idem em caso de encontrar um EquationError
							 */
							if (atual.getnewexpression().equals(exp) || eError!=null){
								done=true;
								certa =false;
							}
							
							clone=(Expression) atual.clone();
							if (atual.getTipo().equals(Expression.COEFICIENTES_BK_OK)){
								done=true;
								certa=true;
							}else if (comparar(clone,(Expression)usr.clone())){
								certa=true;
								done=true;
							}else if (Expression.igual(atual.getRoot(),usrClone.getRoot())){
								done=true;
								certa=true;	
							}
							if (!resp.isEmpty()){
								pass[0]=resp.get(resp.size()-1).getFullEquation(); // a equação
								pass[1]=resp.get(resp.size()-2).getNotEquation(); // a descrição
								//para o caso do resultado do resolvedor der 2 equações
								if (!pass[1].startsWith("#"))pass[2]=resp.get(resp.size()-3).getNotEquation();
							}
						}else{
							done=true;
							certa=true;
						}
						
						if (certa ==false && done==false){
							if (index==-1){// só entra na recursão se o caminho da resolução não estiver na lista
								certa=resolucao(usr, usrClone, atual,forBhaskara);
								done=certa;
								forBhaskara=remakeBK(forBhaskara);
								/*
								 * se uma equacao produzir 2 novas equacoes (fator comum e
								 * bhaskara) faz a verificacao da outra equacao apenas quando
								 * ja estiver  se esgotado as alternativas da primeira
								 * equacao
								 */
								if (!certa && !eqPasso.isEmpty() ){//&& actList.isEmpty()){
									certa=resolucao(usr, usrClone, eqPasso.lastElement(),forBhaskara);
									done=certa;
									eqPasso.remove(eqPasso.size()-1);
								}
								if (!done)atual=(Expression)inicial.clone();
							}else done=true; /*
							 					não faz sentido em continuar neste nivel da recursão ja que este caminho
							 					já foi feito antes
							 				 */ 
						}
					}while (!done);
				}
			expressoes.clearWorkingMemory();
			if (certa && pass[0]!=null){
				passos.push(pass[0]);//pega a equação do resolvedor neste nivel da recursão
				passos.push(pass[1]);//pega a descrição do passo executado neste nivel da recursão
				if (pass[2]!=null)passos.push(pass[2]);
			}
			return certa;
		}else return false;
	}
	
	/**
	 * Checa a expressão <code>bk</code> se estiver marcada como inutil, refaz 
	 * a expressao.
	 * @param bk a expressão a ser utililada como parâmetro na regra da fórmula de bhaskara.
	 */
	private Expression remakeBK(Expression bk){
		if (bk!=null &&
				bk.getTipo().equals(Expression.USELESS_FOR_BHASKARA)){
			try {
				bk=new Expression(bk.getnewexpression());
				bk.useBK();
			} catch (InvalidValueException e) {
				bk=null;
			}
		}
		return bk;
	}
	
	/**
	 * Compara as duas equações a fim de verificar se são equivalentes
	 * @param solverExp a equação do resolvedor
	 * @param userExp a equação do aluno
	 * @return <code>true</code> se forem iguais e <code>false</code> caso contrário
	 */
	public static boolean comparar (Expression solverExp, Expression userExp){
		BTNode arvUsr=userExp.getRoot();
		BTNode arvSolver=solverExp.getRoot();
		f.modificaSinal(userExp.getRoot());
		f.modificaSinal(solverExp.getRoot());
		if (verificaFolhas(arvUsr, arvSolver)){
			solverExp.substituiInc("2");
			userExp.substituiInc("2");
			String user,solver;
			if (solverExp.getRoot().getValue().equals("=")){
				solver=solverExp.avaliarArvore();
			}else{
				/*
				 * este caso apenas ocore quando é a realização do MMC, no qual a raiz é "/"
				 * e o filho esquerdo é o "=" como este sinal não tem operação definida para ele 
				 * no metodo avaliar arvore logo retornara algo como 
				 * "<valor do filho esquerdo>=<valor do filho direito>" e quando a recursão voltar para
				 * o "/" da raiz dara "NumberFormatException" então o que sera feito aqui é obter os valores
				 * do filho esquerdo e direito da raiz e depois compara como String.
				 */ 
				BTNode esq,dir;
				esq=solverExp.getRoot().getEsq();
				dir=solverExp.getRoot().getDir();
				solverExp.getRoot().setEsq(null);
				solverExp.getRoot().setDir(null);
				solver=new Expression(esq).avaliarArvore();
				solver=solver+"/"+new Expression(dir).avaliarArvore();
			}
			if (userExp.getRoot().getValue().equals("=")){
				user=userExp.avaliarArvore();
			}else{
				//idem ao comentario acima
				BTNode esq,dir;
				esq=userExp.getRoot().getEsq();
				dir=userExp.getRoot().getDir();
				userExp.getRoot().setEsq(null);
				userExp.getRoot().setDir(null);
				user=new Expression(esq).avaliarArvore();
				user=user+"/"+new Expression(dir).avaliarArvore();
			}
			if (solver.equals(user))return true;
			else return false;
		}
		return false;
	}
		
	
	/**
	 * Inicia o modelo do aluno em modo console
	 * @throws InvalidValueException 
	 * @throws InvalidValueException 
	 */
	public void start() throws InvalidValueException{
		if (!original.equals("")){
			reset();
			boolean repeat=false;
			String equacao,operacao;
			System.out.println("Expressão: "+original);
			do{
				System.out.print("Proximo passo: ");
				equacao=Teclado.leString();
				if (equacao.toLowerCase().equals("dica")){
					System.out.println("\n# Dica: \n"+hints(original, null, null));
				}else if (equacao.toLowerCase().equals("passo")){
					System.out.println("\n# Proximo passo: \n"+proximoPasso(original));
				}else if (equacao.toLowerCase().equals("resolver")){
					List<String> l =mostrarPassos(original);
					System.out.println("\n# Passos: ");
					for(String s:l){
						System.out.println(s);
					}
				}else if (equacao.toLowerCase().equals("fim")){
					repeat=false;
				}else{
					System.out.println("Tipo de Operação: ");
					operacao=Teclado.leString();
					setOperacao(operacao);
					//boolean resposta=iniciaResolucao(equacao);
					System.out.println(iniciaResolucao(equacao, null, null));
				}
				//repeat=false;
				//if (resposta)System.out.println("Resposta Correta");
				//else System.out.println("Resposta errada");
			}while(repeat);
		}
	}
	
	/**
	 * Compara os valores das folhas das duas arvores
	 * @param arvUsr a arvore de expressão do usuario
	 * @param arvSolver a arvode de expressão do resolvedor
	 * @return <code>true</code> se tiverem as mesmas folhas,
	 * ou seja, se os valores das folhas forem iguais e 
	 * <code>false</code> caso contrário.
	 */
	public static boolean verificaFolhas(BTNode arvUsr, BTNode arvSolver){
		Vector<BTNode> folhasUsr=new Vector<BTNode>();
		folhasUsr=Expression.getAllFolhas(arvUsr, folhasUsr);
		Vector<BTNode> folhasSolver=new Vector<BTNode>();
		folhasSolver=Expression.getAllFolhas(arvSolver, folhasSolver);
		BTNode nUsr, nSolver;
		String nUsrV,nSolverV;
		
		//Remover todos os nodos abstract
        for (int i=folhasUsr.size()-1;i>=0;i--){
            if (folhasUsr.get(i).isAbstract())folhasUsr.remove(i);
        }
        for (int i=folhasSolver.size()-1;i>=0;i--){
            if (folhasSolver.get(i).isAbstract())folhasSolver.remove(i);
        }
        
        //if (folhasUsr.size()==folhasSolver.size()){
        if (checkLeafNodesToEvaluation(folhasUsr,folhasSolver)){
        	
			for (int usr=folhasUsr.size()-1;usr>=0;usr--){
				nUsr=folhasUsr.lastElement();
				
				//TODO: teste remover o sinal de - se o valor tiver
				nUsrV=nUsr.getValue();
				nUsrV=Funcoes.formatResultado(nUsrV);
				if (nUsrV.startsWith("-"))nUsrV=nUsrV.substring(1);
				
				for (int solver=0;solver<folhasSolver.size();solver++){
					nSolver=folhasSolver.get(solver);
					
					//TODO: o mesmo teste do de cima
					nSolverV=nSolver.getValue();
					nSolverV=Funcoes.formatResultado(nSolverV);
					if (nSolverV.startsWith("-"))nSolverV=nSolverV.substring(1);
					
					//if (nSolver.igual(nUsr)){
					if (nSolverV.equals(nUsrV)){
						//possuem valores iguais, verificar se um dele não pertence a uma potencia, pois pode haver
						//casos, por exemplo solver: x=((1+((3^2)R2))/(2*1)) e aluno: x=((1+3)/(2*1)) é 
						//considerada valida pois o que é buscado é apenas as folhas neste caso o 3
						// e apesar de dar o mesmo resultado, na explicação para  o aluno pode ficar confuso
						// então esta restrição para o reslvador ir até o passo certo para validar.
						int pot1=0,pot2=0;
						if (nSolver.getPai()!=null&&(nSolver.getPai().getValue().equals("^") || nSolver.getPai().getValue().equals("R"))){
							pot1=Integer.parseInt(nSolver.getPai().getDir().getValue());
						}
						if (nUsr.getPai()!=null &&(nUsr.getPai().getValue().equals("^") || nUsr.getPai().getValue().equals("R"))){
							pot2=Integer.parseInt(nUsr.getPai().getDir().getValue());
						}
						if (pot1==pot2){
							folhasSolver.remove(solver);
							folhasUsr.remove(folhasUsr.size()-1);
							solver=folhasSolver.size();
						}
					}
				}
			}
		}else return false;
		if (folhasSolver.isEmpty() && folhasUsr.isEmpty()) return true;
		else return false;
	}
	
	public static boolean checkLeafNodesToEvaluation(List<BTNode> usr, List<BTNode> solver){
        int abstU,abstS;
        abstU=abstS=0;
        for (BTNode u: usr){
            if (u.isAbstract())abstU++;
        }
        for (BTNode s: solver){
            if (s.isAbstract())abstS++;
        }
        int sizeU, sizeS;
        sizeU=usr.size()-abstU;
        sizeS=solver.size()-abstS;
        return sizeU==sizeS;
    }
	
	/**
	 * Remove de <code>result</code> o que não for <code>Expression</code>
	 * @param result o vetor a ser analisado
	 * @return o mesmo vetor contendo somente objetos do tipo
	 * <code>ExpRegras</code>
	 */
	public Vector<Expression> filtrarResult(Vector<Object> result){
		Iterator<Object> it=result.iterator();
		Vector<Expression> rules=new Vector<Expression>();
		Object temp=null;
		while(it.hasNext()){
			temp=it.next();
			if (temp instanceof Expression){
				rules.add((Expression)temp);
			}
		}
		return rules;
	}
	
	/**
	 * Reinicia o módulo para receber uma nova equação
	 */
	public void reset(){
		resp.clear();
		possResp.clear();
		passos.clear();
		expressoes.clearWorkingMemory();
	}
	
	public void clear(){
		resp.clear();
		possResp.clear();
		passos.clear();
		expressoes=null;
		hint=null;
		nome=null;
		nomeFull=null;
		operacao=null;
		original=null;
		clearEquations();
		
	}
	
	public MaterialInstrucionalPOJO getNextEquation(){
		if (equacoes.isEmpty())return null;
		hint.getHintInfo().madeAction();
		MaterialInstrucionalPOJO eq=equacoes.get(pointer);
		movePointer();
		return eq;
	}
	
	public String getStudentStatus(){
		if (nEquacoes.isEmpty())return null;
		String msg="";
		for (EquacoesAluno eq:nEquacoes){
			msg+=eq.toString()+"$";
		}
		msg=msg.substring(0,msg.length()-1);
		return msg;
	}
	
	private void movePointer(){
		pointer++;
		if (pointer>=equacoes.size())pointer=0;
	}
	
	public MaterialInstrucionalPOJO addNewEquation(MaterialInstrucionalPOJO equation) {
		if(equation == null) {
			return null;
		}
		for (MaterialInstrucionalPOJO ex: equacoes){
			if (ex.getId() == equation.getId()){
				return null;
			}
		}
		equacoes.add(equation);
		pointer=0;
		return equation;
	}
	
	public void addNewEquation(List<MaterialInstrucionalPOJO> equations){
		equacoes.addAll(equations);
		pointer=0;
	}
	
	public void clearEquations(){
		equacoes.clear();
	}
	
	public void removeEquation(MaterialInstrucionalPOJO equation){
		for (int index=0;index<equacoes.size();index++){
			if (equacoes.get(index).getId() == equation.getId()){
				equacoes.remove(index);
				if (index<=pointer)pointer--;
			}
		}
	}
	
	public List<MaterialInstrucionalPOJO> listEquations() {
		/*List<ExercicioPOJO> sEquations=new ArrayList<ExercicioPOJO>();
		for (ExercicioPOJO eq: equacoes){
			sEquations.add(eq);
		}
		return sEquations;*/
		return equacoes;
	}
	
	public String getNome(){
		return nome;
	}
	
	public int calcPontos (String equation){
		pontos= calc.getPontos(equation);
		return pontos;
	}
	
	public int getPontos(){
		return pontos;
	}
}
