package pat2math.resolvedor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Scanner;
import java.util.Vector;
import org.drools.rule.Package;
import org.drools.spi.Activation;
import pat2math.expressao.Expression;
import pat2math.expressao.validaEquacao;
import pat2math.expressao.arvore.BTNode;
import pat2math.expressao.arvore.InvalidValueException;
import pat2math.regras.EquationError;
import pat2math.regras.Progress;
import pat2math.regras.Regras;
import pat2math.util.Funcoes;

/**
 * Responsavel por executar o resolvedor de equações metematicas, ou seja,
 * é responsável pelo pedido da expressao e devolução do resultado ao
 * usuario
 * @author Henrique M. Seffrin
 * @version 2.0, 02/12/2008
 *
 */
public class Resolvedor {
	
	protected Regras expressoes;
	protected Vector<Equacoes> resp;
	
	/**
	 * Constroi o resolvedor onde é levado em conta as prioridades
	 * @param p um progress para exibir a carga das regras, ou null caso não
	 * seja necessario
	 * @throws Exception erro na compilação da regras
	 */
	public Resolvedor(Progress p)throws Exception{
		this(true,p);
	}
	
	/**
	 * Constroi o resolverdor, onde pode-se ou não levar em conta as prioridades das regras
	 * @param sal <code>true</code> caso for levar em conta as prioridades das regras e 
	 * <code>false</code>, caso contrário 
	 * @param p um progress para exibir a carga das regras
	 * @throws Exception erro na compilação das regras
	 */
	public Resolvedor(boolean sal, Progress p)throws Exception{
		String str[]={"/pat2math/regras/expressao.drl"};
		this.expressoes=new Regras(str, sal, p);
		resp=new Vector<Equacoes>();
		expressoes.getSession().setGlobal("listresult", resp);
	}
	
	public Resolvedor (Package p) throws Exception{
		this.expressoes=new Regras(p);
		resp=new Vector<Equacoes>();
		expressoes.getSession().setGlobal("listresult", resp);
	}
	
	/**
	 * Constroi o resolvedor, onde pode-se imformar mais arquivos de regres além do arquivo padrão: expressão.drl
	 * @param file um array de String contendo o(s) outro(s) arquivo(s) 
	 * @param sal <code>true</code> caso for levar em conta a prioriade das regras e <code>false</code>,
	 *  caso contrário
	 * @param p um progress para exibir a carga das regras
	 * @throws Exception erro na compilação das regras
	 */
	public Resolvedor(String [] file, boolean sal, Progress p)throws Exception{
		String f[]=new String[file.length+1];
		for (int i=0;i<file.length;i++){
			f[i]=file[i];
		}
		f[f.length-1]="/pat2math/regras/expressao.drl";
		this.expressoes=new Regras(f,sal,p);
		resp=new Vector<Equacoes>();
		expressoes.getSession().setGlobal("listresult", resp);
	}
	
	/**
	 * Construtor básico do resolvedor, no qual
	 * é utilizado somente o arquivo pardrão de regras, 
	 * é levado em conta a prioridade das regras e não 
	 * utiliza progress.
	 * @throws Exception Erro de compilação das regras  
	 */
	public Resolvedor() throws Exception{
		this(true,null);
	}
	
	/**
	 * Contrutor do resolvedor, no qual define-se se 
	 * será ou não utilizado as prioriadades
	 * @param sal  <code>true</code> caso for levar em conta a 
	 * prioriade das regras e <code>false</code>, caso contrario
	 * @throws Exception Erro de compilação das regras
	 */
	public Resolvedor(boolean sal) throws Exception{
		this (sal,null);
	}
	
	/**
	 * Construtor do resolvedor, no qual é possival adicionar outros
	 *  arquivos de regras e definir quanto ao uso da prioridade das regras
	 * @param file um array de String com o nome do novo arquivo de regras
	 * @param sal <code>true</code> caso for levar em conta a prioriade das regras e <code>false</code>,
	 *  caso contrário
	 * @throws Exception Erro de compilação das regras
	 */
	public Resolvedor(String file[],boolean sal) throws Exception{
		this(file,sal,null);
	}
	/**
	 * Resolve a equacao <code>expression</code>, chamando as regras
	 * contidas em "expressao.drl"
	 * @param expression a expressao a ser resolvida
	 * @throws InvalidValueException 
	 */
	public Vector<Expression> resolve(String expression) throws InvalidValueException{
		validaEquacao val=new validaEquacao(expression);
		expressoes.clearWorkingMemory();
    	Expression exp=new Expression(val.getEquacao());
    	resolve(exp);
		return filtro(expressoes.getResult());
	}
	
	/**
	 * Resolve a equacao <code>expression</code>, chamando as regras
	 * contidas em "expressao.drl"
	 * @param e
	 */
	protected void resolve(Expression e){
		System.out.println(e.getnewexpression());
		expressoes.inserir(e);
    	expressoes.executar();
	}
	
	/**
	 * Resolve a equacao <code>expression</code>, chamando as regras
	 * contidas em "expressao.drl"
	 * @param expression a expressao a ser resolvida
	 * @param limit o numero maximo de regras a serem executadas
	 * @return o ultimo resultado obtido
	 * @throws InvalidValueException 
	 */
	public Expression resolve(String expression,int limit) throws InvalidValueException{
		validaEquacao val=new validaEquacao(expression);
		expressoes.clearWorkingMemory();
    	Expression exp=new Expression(val.getEquacao());
    	resolve(exp,limit);
		Vector<Expression> result=filtro(expressoes.getResult());
		return result.get(result.size()-1);
	}
	
	/**
	 * Efetua a expressão <code>expression</code> até <code>limit</code> 
	 * @param e a expressão a ser efetuada 
	 * @param limit olimite de passo a serem feitos
	 * @return um Vector contendo todos os ultimos passos da equação
	 */
	protected Vector<Expression> resolve(Expression e, int limit){
		//System.out.println(e.getnewexpression());
		expressoes.inserir(e);
    	expressoes.executar(limit);
    	return filtro(expressoes.getResult());
	}
	
	/**
	 * Remove a referencia da sessão da <code>RuleBase</code>
	 */
	public void finalizar(){
		expressoes.finalizar();
	}
	
	/**
	 * Remove de <code>result</code> o que não for <code>Expression</code>
	 * e o que for do usuario
	 * @param result o vetor a ser analisado
	 * @return o mesmo vetor contendo somente objetos do tipo
	 * <code>ExpRegras</code>
	 */
	public Vector<Expression> filtro(Vector<Object> result){
		Iterator<Object> it=result.iterator();
		Vector<Expression> res=new Vector<Expression>();
		Object temp;
		while(it.hasNext()){
			temp=it.next();
			if (temp instanceof Expression){
				if (((Expression)temp).getTipo().equals(Expression.SOLVER) ||
						((Expression)temp).getTipo().equals(Expression.FOR_BHASKARA) ||
						((Expression)temp).getTipo().equals(Expression.COEFICIENTES_BK_OK)){
					res.add((Expression)temp);
				}
			}
		}
		return res;
	}
	
	/**
	 * Em caso de erro na equação, como raiz negativa, solução impossivel, obtem o objeto
	 * contendo a mensagem de erro.
	 * @param result a lista de objetos na memoria de trabalho do {@link Resolvedor}
	 * @return um objeto contendo a descrição do erro.
	 */
	public EquationError getEquationError(Vector<Object> result){
		EquationError error=null;
		for (Object o:result){
			if (o instanceof EquationError)error=(EquationError)o;
		}
		return error;
	}
	
	/**
	 * Obtém os passos do resolvedor
	 * @return Um Vector de objetos do tipo <code>Equacoes</code>, que
	 * guarda a equação em 3 formatos diferentes.
	 */
	public Vector<Equacoes> getPassos(){
		return resp;
	}
	
	/**
	 * Inicia o resolvedor, onde é pedido uma equação e 
	 * ele devevolve na tela todos os passos necessários para
	 * chegar ao resultado
	 * @throws Exception Erro de compilação das regras
	 */
	public void start() throws Exception{
		//System.setIn(new FileInputStream("eq"));
		Scanner scan=new Scanner(System.in);
		String pedido="Entre com a expressao: ";
		String expressao="";		
		do{
			try{
				System.out.print(pedido);
				expressao=scan.nextLine();
				if (!expressao.equals("")){
					System.out.println(imprimeRespostaFinal(expressao));
				}
			}catch(InvalidValueException ive){
				System.out.println("Erro: " + ive.message());
			//}catch(Exception e ){
			//	System.out.println("Erro: " + e.getMessage());
			}
		}while (!expressao.equals(""));
		finalizar();
		System.out.println("Encerrado");
    
	}
	
	/**
	 * Insere a equação no resolvedor e pepara o resultado final,
	 * apresentando os valores da incgnita,ex:<br>
	 * <ul>
	 * <li>x=a, onde "a" é inteiro, para equação do primeiro grau</li>
	 * <li>x=a e x=-b, onde a e b são inteiros, parauma equação do segundo grau</li>
	 * </ul>
	 * @param expressao a equalção a ser resolvida
	 * @return a resposta final da equação, aj que os passos intermediarios são exibidos 
	 * através do método getPassos()
	 * @throws InvalidValueException Erro na composição da equação
	 */
	public String imprimeRespostaFinal(String expressao) throws InvalidValueException{
		boolean segGrau=false;
		boolean rNeg=false;
		String result="";
		Expression e1;
		Expression e2;
		if (expressao.contains("x^2"))segGrau=true;
		Vector <Expression>v=resolve(expressao);
		if (!v.isEmpty()){
			if (v.size()==2 && !segGrau)segGrau=true;
			if (segGrau && v.size()==1){
				e1=v.get(0);
				if (e1.getRoot().getValue().equals("0") ||
						e1.getRoot().getValue().equals("0")){
					result=e1.getExp().getTexExpression();
				}else{
					result=" , "+e1.getExp().getTexExpression();
					if (Funcoes.isInc(e1.getRoot().getEsq().getValue())){
						if (e1.getRoot().getDir().getValue().equals("R") ||
								e1.getRoot().getDir().getValue().equals("/")){
							BTNode root=e1.getRoot();
							BTNode r=root.getDir();
							root.setDir(null);
							root.setDir(new BTNode("-",new BTNode("0"),r));
							rNeg=true;
						}else e1.inverteSinalArvore(e1.getRoot().getDir());
					}else{
						if (e1.getRoot().getEsq().getValue().equals("R") ||
								e1.getRoot().getEsq().getValue().equals("/")){
							BTNode root=e1.getRoot();
							BTNode r=root.getEsq();
							root.setEsq(null);
							root.setEsq(new BTNode("-",new BTNode("0"),r));
							rNeg=true;
						}else e1.inverteSinalArvore(e1.getRoot().getEsq());
					}
					if (rNeg) result=e1.getExp().getTexExpression().replace("=0", "=")+result;
					else result=e1.getExp().getTexExpression()+result;
					rNeg=false;
				}
			}else if (segGrau && v.size()==2){
				e1=v.get(0);
				e2=v.get(1);
				double v1,v2;
				Expression eClone1,eClone2;
				String strClone1, strClone2;
				eClone1=new Expression((BTNode)e1.getRoot().clone());
				eClone2=new Expression((BTNode)e2.getRoot().clone());
				eClone1.substituiInc("2");
				eClone2.substituiInc("2");
				strClone1=eClone1.avaliarArvore();
				strClone2=eClone2.avaliarArvore();
				/*
				 * Como strClone1 e 2 terao algo no formato a=b ou b=a onde "a" é o valor da incognita
				 * x após a arvore passar pelo metodo de avaliacao, é necessario remover o = e o valor de 
				 * x antes de atribur a variavel double, pois o que interessa no outro lado da equção afim de 
				 * determinar a ordem de exibição (do menor pro maior). 
				 */
				if (Funcoes.isInc(e1.getRoot().getEsq().getValue())){// se a incgnita ta no lado esquerdo
					strClone1=strClone1.substring(strClone1.indexOf("=")+1);
					strClone2=strClone2.substring(strClone2.indexOf("=")+1);
					v1=Double.parseDouble(strClone1);
					v2=Double.parseDouble(strClone2);
				}else{
					strClone1=strClone1.substring(0,strClone1.indexOf("="));
					strClone2=strClone2.substring(0,strClone2.indexOf("="));
					v1=Double.parseDouble(strClone1);
					v2=Double.parseDouble(strClone2);	
				}
				if (v1>v2){
					result=e2.getExp().getTexExpression()+" , "+e1.getExp().getTexExpression();
				}else result=e1.getExp().getTexExpression()+" , "+e2.getExp().getTexExpression();
			}else if (!segGrau){
				result=v.get(0).getExp().getTexExpression();
			}
		}else{
			result=resp.get(resp.size()-1).getTeXEquation();
		}
		result="# Solucao da Equacao:\n"+result+"\n";
		resp.add(new Equacoes(result));
		return result;
	}
	
	/**
	 * Analiza a equação e retona os possiveis próximos passos
	 * @param eq a equação a ser desenvolvida
	 * @return um lista contendo a regras que são ativadas com a equacao <code>eq</code>
	 * @throws InvalidValueException caso <code>eq</code> for invalida
	 */
	public ArrayList<Activation> nextRules(String eq)throws InvalidValueException{
		Expression exp=new Expression(eq);
		return nextRules(exp);
	}
	
	public ArrayList<Activation> nextRules (Expression exp){
		expressoes.clearWorkingMemory();
		expressoes.inserir((Expression)exp.clone());
		ArrayList<Activation>actList=new ArrayList<Activation>(Arrays.asList(
				expressoes.getAgenda().getActivations()));
		return actList;
	}
	
	/**
	 * Obtem a proxima regra a ser ativada, com base no primeiro elemento de
	 * <code>next</code> busca em <code>target</code> a regra correspondente
	 * @param next o vetor cujo primeiro elemento é o valor a ser buscado em 
	 * <code>target</code>
	 * @param target o vetor de valores a ser pesquisado
	 * @return uma <code>Activation</code> cujo nome da regre é o mesmo do primeiro
	 * elemento de <code>next</code>
	 */
	public Activation getNextActivation(List<Activation> next, List<Activation> target){
		if (next!=null && next.get(0)!=null && target!=null && target.get(0)!=null){
			if (next==target)return target.get(0);
			else{
				Iterator<Activation> i=target.iterator();
				Activation tar, nxt;
				nxt=next.get(0);
				while(i.hasNext()){
					tar=i.next();
					if (nxt.getRule().getName().equals(tar.getRule().getName())){
						return tar;
					}
				}
			}
		}
		return null;
	}
	
	public Regras getRegras(){
		return expressoes;
	}
}
