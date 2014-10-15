package pat2math.regras;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Vector;

import pat2math.expressao.Expression;
import pat2math.expressao.arvore.BTNode;
import pat2math.expressao.arvore.BTNodeComparator;
import pat2math.expressao.arvore.InvalidValueException;
import pat2math.modeloAluno.EquacaoMisc;
import pat2math.modeloAluno.ModeloAluno;
import pat2math.util.Conjuntos;
import pat2math.util.Funcoes;

/**
 * Classe que armazena as funções utilizadas nas misconseptions,
 * @author Henrique M. Seffrin
 * @since 18/06/2010
 *
 */
//Por alguma razão não consigo debugar as funções, então elas ficarao aqui
public class MiscFunctions {

	
	// testar a equação : x=(2+3)+(5*6)+(2/2) 
	/**
	 * Função validadora da regra Misconseption Operacao inversa- Soma e subtracao.
	 * @param em é o objeto inserido na memoria de trabalho do SE
	 * @return o tipo de misconseption detectada ou null se n for detectada, ou
	 * se a misconseption não for relacioanada a operação inversa da soma e da multiplicação
	 * @see EquacaoMisc
	 */
	public static List<BTNode> ehMiscOISomaSub(EquacaoMisc em){
	//	System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		List<BTNode> difEsqSolver=em.getDiffEsqSolver();
		List<BTNode> difDirSolver=em.getDiffDirSolver();
		List<BTNode> difEsqUser=em.getDiffEsqUser();
		List<BTNode> difDirUser=em.getDiffDirUser();
		List<BTNode> nodos=new ArrayList<BTNode>();
		BTNode termo;
		String term1,term2;
		String []opValidos={"+","-","="};
		for (BTNode dir: difDirSolver){
			termo=getTermo(difEsqUser,ajustarPotencia(dir),opValidos);
			if (termo!=null && validarTermo(termo,opValidos) &&
					validarTermo(dir, opValidos)){
				term1=ajustarSinalTermo(termo);
				term2=ajustarSinalTermo(dir);
				// checa os valores se o sinal for igual: misconseption
				if (term2.equals(term1)){
					nodos.add(termo);
					nodos.add(dir);
					return nodos;
				}
			}
		}
		for (BTNode dir:difEsqSolver){
			termo=getTermo(difDirUser,ajustarPotencia(dir),opValidos);
			if (termo!=null && validarTermo(termo, opValidos) &&
					validarTermo(dir, opValidos)){
				term1=ajustarSinalTermo(termo);
				term2=ajustarSinalTermo(dir);
				if ((term2.equals(term1))){
					nodos.add(termo);
					nodos.add(dir);
					return nodos;
				}
			}
		}
		return nodos;
	}

	/**
	 * Verifica o nodo-pai de <code>termo</code> verificando se este contem um operando válido.
	 * Este definido tem <code>opValidos</code>.
	 * @param termo o nodo cujo pai deve ser verificado.
	 * @param opValidos um array contendo os operadores que <code>termo</code> deve possuir
	 * (um deles) para ser considerado válido.
	 * @return <code>true</code> se o nodo pai possui um valor em opValidos e 
	 * false caso contrario
	 */
	private static boolean validarTermo(BTNode termo, String opValidos []){
		ArrayList<String> opV=new ArrayList<String>(Arrays.asList(opValidos));
		if (opV.contains(termo.getPai().getValue())){
			return true;
		}
		return false;
	}

	/**
	 * Verifca se o nodo possui algum pai, não necesariamente o nodo logo acima dele,
	 * que possuia um dos valoers de opValidos
	 * @param termo o nodo cujo pai deve ser verificado.
	 * @param opValidos um array contendo os operadores que <code>termo</code> deve possuir
	 * (um deles) para ser considerado válido.
	 * @return <code>true</code> se o nodo possuir um pai cujo valor
	 * está em opValidos e <code>false</code> caso contrario.
	 */
	public static boolean possuiPaiOpValido(BTNode termo, String opValidos[]){
		ArrayList<String> opV=new ArrayList<String>(Arrays.asList(opValidos));
		for(String op:opV){
			//verifica se termo possui um nodo pai com valor op
			// por isso o getPai, pois o getNodeX pode retornar o proprio nó
			if (termo.getPai().getNodeX(op)!=null)return true;
		}
		return false;
	}
	/**
	 * Ajusta o sinal do valor de <code>termo</code> para o caso do nodo possuir 
	 * sinal negativo e ter como pai um nodo com sinal negativo, deve-se então 
	 * ajustá-lo para o sinal positvo.
	 * @param termo o nodo cujo sinal eve ser verificado e modificado, se necessário
	 * @return o valor de <code>termo</code> com o sinal modificado.
	 */
	public static String ajustarSinalTermo(BTNode termo){
		String term=termo.getValue();
		if (Funcoes.isInc(termo.getLast()) || Funcoes.isInteger(termo.getValue())){
			if (termo.getPai()!=null && termo.getPai().getValue().equals("-")){
				term=Funcoes.trocaSinal(term);
			}
		}else if (termo.getValue().equals("^")){
			BTNode pai=termo.getPai();
			BTNode t=termo.getEsq();
			term=t.getValue();
			if (pai!=null && pai.getValue().equals("-")){
				term=Funcoes.trocaSinal(term);
			}
		}
		return term;
	}
	/**
	 * Gera a representação de subarvores que são potencias ou raizes, mas
	 * os filhos desta devem se folhas,ou seja a^2 ou bR2
	 * @param bt o {@link BTNode} cuja String deve ser gerada
	 * @return uma {@link String} com a represetanção da subarvore <code>bt</code>.
	 */
	public static String ajustarPotencia(BTNode bt){
		String noVal=bt.getValue();
		if (noVal.equals("^") || noVal.equals("R")){
			// de forma a pegar somente valores do tipo a^2 ou bR2
			if (bt.getEsq().eFolha()){
				noVal=new Expression((BTNode)bt.clone()).getCleanExpression();
				//if (noVal.contains("1x"))noVal=noVal.replace("1x", "x");
				noVal=Funcoes.formatResultado(noVal);
			}
		}
		return noVal;
	}

	/**
	 * Faz a buscas em bt por um nodo que possua termo, seja com sinal
	 * ou sem sinal
	 * @param bt uma lista de nodos
	 * @param termo o termo a ser buscado em <code>bt</code>,
	 * não importando o sinal
	 * @return o {@link BTNode} de <code>bt</code> selecionado
	 */
	public static BTNode getTermo(List<BTNode> bt, String termo, String[] paisValidos){
		BTNode select=null;
		boolean achou=false;
		Iterator<BTNode> it= bt.iterator();
		if (!Funcoes.isOp(termo)){
			while (!achou && it.hasNext()){
				BTNode no=it.next();
				String noVal=ajustarPotencia(no);
				if (!noVal.equals("^") && !noVal.equals("R")){
					if (!Funcoes.isOp(noVal) && validarTermo(no, paisValidos) ){
						BTNode root= no.getNodeX("=");
						// permite apenas equacoes com raiz "="
						if (root!=null && root.getPai()==null)
							if (noVal.equals(termo) ){
								select=no;
								achou=true;
							}else if (noVal.equals(Funcoes.trocaSinal(termo))){
								select=no;
								achou=true;
							}
					}
				}
			}
		}
		return select;
	}


	/**
	 * Método responsável por validar as seguintes misconseptions da OI de Mult e Div:
	 * <ol>
	 * <li> 3x=4 => x=4/-3</li>
	 * <li> -3x=4 => x=4/3</li>
	 * <li> x/3=4 => x=4*(-3)</li>
	 * <li> x/-3=4 => x=4*3</li>
	 * </ol>
	 * @param em o objeto na memoria de trabalho do SE
	 * @return uma {@link List} dos nodos que satisfizeram esta regra.
	 */
	public static List<BTNode> ehMiscOIMultDivInvSinal(EquacaoMisc em){
		//System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		List<BTNode> difEsqSolver=em.getDiffEsqSolver();
		List<BTNode> difDirSolver=em.getDiffDirSolver();
		List<BTNode> difEsqUser=em.getDiffEsqUser();
		List<BTNode> difDirUser=em.getDiffDirUser();
		List<BTNode> nodos= new ArrayList<BTNode>();
		BTNode termo=null;
		String []multDiv={"*","/","="};
		String op[]=new String [3];
		String t,t1,t2;
		for (BTNode dir:difEsqUser){
			// exemplo: para a equação 3x=2   user: x=2/-3    solver: x=2/3, logo é so compara os denomionadores
			if (validarTermo(dir, multDiv)){
				t=ajustarPotencia(dir);
				//extrair o inteiro da incongita, para equações do tipo : 3x=4 => x=4/3
				// se tiver mais de um termo e possuir uma incongita E uma parte inteira
				//se t for somente ^ ou R significa que as raizes possuem eum expresão dentro em vez de um unico numero
				if (!t.equals("^") && !t.equals("R")){
					String partINT=Funcoes.getINT(t)+"";
					String partINC=Funcoes.getInc(t);
					op[0]=dir.getPai().getValue();
					if (op[0].equals("*") || (op[0].equals("=") && !partINC.equals("")))op[0]="/";
					else op[0]="*";
					termo=getTermo(difDirSolver, t, op);
					if (termo==null && dir.getPai().getValue().equals("=")){
						if (t.length()>1 && !partINC.equals("") &&
								!partINT.equals("1") &&
								!partINT.equals("-1")){
							t=partINT;
							termo=getTermo(difDirSolver, t, op);
						}
					}
					// validar troca de sinal e troca de operação
					// ex: 3x*3=4 => 3x=4/-3
					if (termo!=null){
						t1=dir.getValue();
						t2=termo.getValue();
						//caso for 3x*x^2=4 => 3x=4/-x^2
						if (t1.equals("^") && t2.equals("^")){
							t1=dir.getEsq().getValue();
							t2=termo.getEsq().getValue();
						}
						if (!t1.equals(t2)){
							nodos.add(dir);
							nodos.add(termo);
							return nodos; 
						}
					}
				}
			}
		}
		for (BTNode dir:difDirUser){
			// exemplo: para a equação 3x=2   user: x=2/-3    solver: x=2/3, logo é so compara os denomionadores
			if (validarTermo(dir, multDiv)){
				t=ajustarPotencia(dir);
				//extrair o inteiro da incongita, para equações do tipo : 3x=4 => x=4/3
				// se tiver mais de um termo e possuir uma incongita E uma parte inteira
				if (!t.equals("^") && !t.equals("R")){
					String partINT=Funcoes.getINT(t)+"";
					String partINC=Funcoes.getInc(t);
					op[0]=dir.getPai().getValue();
					if (op[0].equals("*")||(op[0].equals("=") && !partINC.equals("")))op[0]="/";
					else op[0]="*";
					termo=getTermo(difEsqSolver, t, op);
					if (termo==null && dir.getPai().getValue().equals("=")){
						if (t.length()>1 && !partINC.equals("") &&
								!partINT.equals("1") &&
								!partINT.equals("-1")){
							t=partINT;
							termo=getTermo(difEsqSolver, t, op);
						}
					}
					if (termo!=null){
						t1=dir.getValue();
						t2=termo.getValue();
						if (!t1.equals(t2)){
							nodos.add(dir);
							nodos.add(termo);
							return nodos;
						}
					}
				}
			}
		}
		return nodos;
	}

	/**
	 * Método responsavel pela validação de misconseptions, em que o temo troca de
	 * lado mas não de operação:
	 * <p>
	 * <ol>
	 * <li> 3x/3=4 => 3x=4/3</li>
	 * <li> 3x/3=4 => 3x=4/-3</li>
	 * <li> 3x*3=4 => 3x=4*3</li>
	 * <li> 3x*3=4 => 3x=4*-3</li>
	 * <li> o mesmo vale se o 3 foi negativo inicialmente</li>
	 * </ol>
	 * 
	 * @param em o objeto na memoria de trabalho de SE
	 * @return uma {@link List} contendos os nodos afetados por esse misconseption
	 */
	public static List<BTNode> ehMiscOIMultDivOPIgual(EquacaoMisc em){
//		System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		List<BTNode> difEsqSolver=em.getDiffEsqSolver();
		List<BTNode> difDirSolver=em.getDiffDirSolver();
		List<BTNode> difEsqUser=em.getDiffEsqUser();
		List<BTNode> difDirUser=em.getDiffDirUser();
		List<BTNode> nodo=new ArrayList<BTNode>();
		BTNode termo=null;
		String []multDiv={"*","/","="};
		String op[]=new String [3];
		String t;
		for (BTNode dir:difEsqUser){
			// exemplo: para a equação 3x=2   user: x=2/-3    solver: x=2/3, logo é so compara os denomionadores
			if (validarTermo(dir, multDiv)){
				t=ajustarPotencia(dir);
				if (!t.equals("^") && !t.equals("R")){
					op[0]=dir.getPai().getValue();
					if (op[0].equals("="))op[0]="*";
					termo=getTermo(difDirSolver,t,op);
					if (termo==null && dir.getPai().getValue().equals("=")){
						// se tiver mais de um termo e possuir uma incongita E uma parte inteira
						String partINT=Funcoes.getINT(t)+"";
						String partINC=Funcoes.getInc(t);
						if (t.length()>1 && !partINC.equals("") &&
								!partINT.equals("1") &&
								!partINT.equals("-1")){
							t=partINT;
							termo=getTermo(difDirSolver,t,op);
						}
					}
					if (termo!=null){
						nodo.add(dir);
						nodo.add(termo);
						return nodo;
					}
				}
			}
		}
		for (BTNode dir:difDirUser){
			// exemplo: para a equação 3x=2   user: x=2/-3    solver: x=2/3, logo é so compara os denomionadores
			if (validarTermo(dir, multDiv)){
				t=ajustarPotencia(dir);
				if (!t.equals("^") && !t.equals("R")){
					op[0]=dir.getPai().getValue();
					if (op[0].equals("="))op[0]="*";
					termo=getTermo(difEsqSolver,t,op);
					if (termo==null && dir.getPai().getValue().equals("=")){
						// se tiver mais de um termo e possuir uma incongita E uma parte inteira
						String partINT=Funcoes.getINT(t)+"";
						String partINC=Funcoes.getInc(t);
						if (t.length()>1 && !partINC.equals("") &&
								!partINT.equals("1") &&
								!partINT.equals("-1")){
							t=partINT;
							termo=getTermo(difEsqSolver,t,op);
						}
					}
					if (termo!=null){
						nodo.add(dir);
						nodo.add(termo);
						return nodo;
					}
				}
			}
		}
		return nodo;
	}

	/**
	 * Resposável pela detecção da misconseption em que o termo
	 * ao tracar de lado passa a multiplicar ou subtrair, em vez de multiplicar
	 * ou dividir:
	 * <ol>
	 * <li> 3x/3=4 => 3x=4+3 ou 3x=4-3</li>
	 * <li> 3x*3=4 => 3x=4+3 ou 3x=4-3</li> 
	 * </ol>
	 * @param em o objeto do SE
	 * @return uma {@link List} contendo os nodos que satifazeram a regra
	 */
	public static List<BTNode> ehMiscOIMultDivOPSomaSub(EquacaoMisc em){
	//	System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		List<BTNode> difEsqSolver=em.getDiffEsqSolver();
		List<BTNode> difDirSolver=em.getDiffDirSolver();
		List<BTNode> difEsqUser=em.getDiffEsqUser();
		List<BTNode> difDirUser=em.getDiffDirUser();
		List<BTNode>nodo=checkForMiscOIMultDivOPSomaSub(difEsqUser, difDirSolver);
		if (nodo.isEmpty())nodo=checkForMiscOIMultDivOPSomaSub(difDirUser, difEsqSolver);
		return nodo;
	}

	private static List<BTNode> checkForMiscOIMultDivOPSomaSub(List<BTNode> difUser, List<BTNode> difSolver){
		List<BTNode> nodo=new ArrayList<BTNode>();
		BTNode termo=null;
		String t;
		for (BTNode dir:difUser){
			if (validarTermo(dir,new String[]{"*","/","="})){
				//validar misconseption cuja OI é posto uma soma ou subtração
				//se não var misc com mult/div no outro lado talvez soma/sub : 2x=4 ==> x=4(+/-)2
				t=ajustarPotencia(dir);
				if (!t.equals("^") && !t.equals("R")){
					//o if evita que se pegue a potencia sem estar multiplicando, causando conflito com o regra
					// de OI de soma e subtração
					if (validarTermo(dir, new String[]{"*","/"}))termo=getTermo(difSolver, t, new String[]{"+","-"});
					if (termo==null && dir.getPai().getValue().equals("=")){
						// se tiver mais de um termo e possuir uma incongita E uma parte inteira
						String partINT=Funcoes.getINT(t)+"";
						String partINC=Funcoes.getInc(t);
						if (t.length()>1 && !partINC.equals("") &&
								!partINT.equals("1") &&
								!partINT.equals("-1")){
							t=partINT;
							termo=getTermo(difSolver, t, new String[]{"+","-"});
						}
					}
					if (termo!=null){
						nodo.add(dir);
						nodo.add(termo);
						return nodo;
					}
				}
			}
		}
		return nodo;
	}

	/**
	 * Valida misconseptions no qual a OI não envolveu todos os termos da equação:
	 * <ol>
	 * <li>x/3=4+5x => x=4+5x*3 ou x=4*3+5x</li>
	 * <li>x*3=4+5x => x=4+5x/3 ou x=4/3+5x</li>
	 * </ol>
	 * @param em o objeto na memória de trabalho no SE
	 * @return uma {@link List} contendo os temos que disparam a regra
	 */
	public static List<BTNode> ehMiscOIMultDivNaoCompleta(EquacaoMisc em){
		//System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		List<BTNode> difEsqSolver=em.getDiffEsqSolver();
		List<BTNode> difDirSolver=em.getDiffDirSolver();
		List<BTNode> difEsqUser=em.getDiffEsqUser();
		List<BTNode> difDirUser=em.getDiffDirUser();
		List<BTNode> nodos= new ArrayList<BTNode>();
		BTNode termo=null;
		String []oper={"*","/","="};
		String op[]=new String [3];
		String t;
		for (BTNode dir:difDirUser){
			if (validarTermo(dir, oper)){
				t=ajustarPotencia(dir);
				if (!t.equals("^") && !t.equals("R")){
					op[0]=dir.getPai().getValue();
					if (op[0].equals("*"))op[0]="/";
					else op[0]="*";
					termo=getTermo(difEsqSolver, t, op);
					if (termo!=null){
						// pois sendo operação inversa deve aplicar sobre todo o lado da equação e portanto
						// esta operação deve ser filha direta de "="
						if (!termo.getPai().getPai().getValue().equals("=")){
							nodos.add(dir);
							nodos.add(termo);
							return nodos; 
						}
					}
				}
			}
		}
		for (BTNode dir:difEsqUser){
			if (validarTermo(dir, oper)){
				t=ajustarPotencia(dir);
				if (!t.equals("^") && !t.equals("R")){
					op[0]=dir.getPai().getValue();
					if (op[0].equals("*"))op[0]="/";
					else op[0]="*";
					termo=getTermo(difDirSolver, t, op);
					if (termo!=null){
						// pois sendo operação inversa deve aplicar sobre todo o lado da equação e portanto
						// esta operação deve ser filha direta de "="
						if (!termo.getPai().getPai().getValue().equals("=")){
							nodos.add(dir);
							nodos.add(termo);
							return nodos; 
						}
					}
				}
			}
		}
		return nodos;
	}

	/**
	 * Verifica em <code>bt</code> nodos que iniciem <code>valor</code>. Por exemplo:
	 * <br><p>
	 * bt =[2x,4,2]  valor="2 getTermoParecido(bt,valor)=[2,2]
	 * @param bt a lista de {@link BTNode}
	 * @param valor o filtro da busca
	 * @return uma lista contendo somente os nodos que contenham <code>valor</code>
	 * @deprecated sem função
	 */
	public static List<BTNode> getTermoIniciadoPor(List<BTNode> bt, String valor){
		List<BTNode> l=new ArrayList<BTNode>();
		for (BTNode b:bt){
			if (b.getValue().startsWith(valor)){
				l.add(b);
			}
		}
		return l;
	}

	/**
	 * Valida misconseption de envolvendo matemática básica
	 * @param em o objeto na memoria de trabalho do SE
	 * @return uma {@link List} contendo os valores em misconseption, ou null
	 * ne não for detectado nada.
	 */
	public static List<BTNode> ehMiscMatBasica(EquacaoMisc em){
		//System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		List<BTNode> difEsqSolver=em.getDiffEsqSolver();
		List<BTNode> difDirSolver=em.getDiffDirSolver();
		List<BTNode> difEsqUser=em.getDiffEsqUser();
		List<BTNode> difDirUser=em.getDiffDirUser();
		/* funcionamento: encontra 2 nodos ligados por uma mesma operação
		 * se for + e * não prescisam ser irmaos, mas devem ser ligados por nos do mesmo sinal
		 * dif(esq/dir)User guarda os nodos do resolvedor que não estão no usuario
		 * dif(esq/dir)Solver guarda os nodos do usuario que não estão no resolvedor 
		 * verificar também se dentre os nodos da equação inteira existe um diferente,
		 * que no caso seria o resultado, pois se não haver um diferente pode ser 
		 * que seja OI. Para isso, concatenar os dif(esq/dir)Solver e os dif(dir/esq)User,
		 * se for OI ambos devem possuir o mesmo tamanho e os mesmos nodos.
		 */
		//Etapa 1 - concatenar os Difs
		List<BTNode> difSolver,difUser;
		difSolver=new ArrayList<BTNode>(difEsqSolver);
		difSolver.addAll(difDirSolver);
		difUser=new ArrayList<BTNode>(difEsqUser);
		difUser.addAll(difDirUser);
		//Etapa 2 - barrar equações iguais em tamanho e nodos
		List<BTNode> difs=Conjuntos.diferenca(difUser, difSolver);
		if (difSolver.size()==difUser.size() &&
				difs.isEmpty()) return new ArrayList<BTNode>();
		List<BTNode> nodos=checkForMiscMatBasica(difDirUser, difDirSolver);
		if (nodos!=null && nodos.isEmpty()) nodos=checkForMiscMatBasica(difEsqUser, difEsqSolver);
		return nodos;
	}

	private static boolean ehPotRaizINT(BTNode n){
		/*
		 * detectar se é uma operação inteira de potencia/raiz em vez de
		 * uma incógnita ao quadrado/cubo
		 */ 
		if (n.getValue().equals("^") || n.getValue().equals("R")){
			if (Funcoes.isInteger(n.getEsq().getValue())){
				return true;
			}
		}	
		return false;
	}
	
	//TODO: Como fazer para checar caso a resposta do aluno for igual a a um dos termos da operação!!!
	private static List<BTNode> checkForMiscMatBasica(List<BTNode> difUser, List<BTNode> difSolver){
		BTNode n1=null,n2=null,resultado=null;
		List<BTNode> nodos=new ArrayList<BTNode>();
		List<BTNode> difU=new ArrayList<BTNode>(difUser);
		if (difU.isEmpty())return nodos;
		boolean potRaizINT=ehPotRaizINT(difU.get(0));
		boolean associativa=false;
		//detectar soma/sub/mul por zero e mult por 1
		if (difU.size()==1 && !potRaizINT){
			n1 =difU.get(0);
			if (Funcoes.canAddSubMultZERO(n1,"+") ||
					Funcoes.canAddSubMultZERO(n1,"-") ||
					Funcoes.canAddSubMultZERO(n1,"*") ||
					Funcoes.canMultByONE(n1)){
				if (n1.ehFilhoEsq())difU.add(n1.getPai().getDir());
				else difU.add(n1.getPai().getEsq());
			}
			n1=null;
		}
		//inserir os nodos irmão do nodos "diferentes" pois a resposta do aluno 
		//pode ser igual a um dos nos removidor da lista
		List<BTNode> nList=new ArrayList<BTNode>();
		BTNode brother;
		for (BTNode temp:difU){
			nList.add(temp);
			if (ehPotRaizINT(temp))temp=temp.getPai();
			if (temp.getPai().getPai()!=null){
				if (temp.ehFilhoDir())brother=temp.getPai().getEsq();
				else brother=temp.getPai().getDir();
			}else brother=null;
			//temp não é filho da raiz
			if (brother!=null && !difU.contains(brother) && (brother.eFolha() || brother.getValue().equals("^"))){
				nList.add(brother);
				//buscar o correspondente na arvore da resposta do aluno  e colocar em difsolver
				//retricao: deve ser filho do mesmo sinal da operacao entre temp e brother
				/*BTNode pSolver=brother.getNodeX("=");
				if (brother.ehFilhoDir(pSolver))pSolver=pSolver.getDir();
				else pSolver=pSolver.getEsq();
				List<BTNode> pFolhas= Expression.getFolhas(pSolver);
				for (BTNode aux:pFolhas){
					BTNode a1,a2;
					a1=aux;
					a2=brother;
					if (ehPotRaizINT(aux) && ehPotRaizINT(brother)){
						a1=aux.getEsq();
						a2=brother.getEsq();
					}
					if (a1.getValue().equals(a2.getValue())){
						//aux é o resultado então é filho direto 
						// brother é filho do operador que é filho deste operador em comum
						if (aux.getPai().getValue().equals(brother.getPai().getPai().getValue())){
							difSolver.add(aux);
						}
					}
				}*/
			}
		}
		difU=nList;
		
		//if (difU.size()<=1&& !potRaizINT)return nodos;
		for (Iterator<BTNode> it=difU.iterator();it.hasNext();){
			potRaizINT=false;
			associativa=false;
			if (n1==null && it.hasNext())n1=it.next();
			/*
			 * de for uma potencia/raiz interia distribuir os valores entre  n1 e n2.
			 */
			if (ehPotRaizINT(n1)){
				n2=n1.getDir();
				n1=n1.getEsq();
				potRaizINT=true;
			}else if (n2==null&& it.hasNext())n2=it.next();
			BTNode op=null;
			//se n1 for igual a null o não estaria nete laço
			if (n2==null && !n1.getPai().getValue().equals("=")){
				if (n1.ehFilhoEsq())n2=n1.getPai().getDir();
				else n2=n1.getPai().getEsq();
				if (!n2.eFolha())n2=null;
			}
			if (n1!=null && n2!=null){
				BTNode pai1=n1.getPai(),pai2=n2.getPai();
				resultado=null;
				//caso simples: n1 e n2 sao filhos do mesmo pai
				if (n1.getPai().equals(n2.getPai())){
					if (!n1.getValue().equals("R") && !n2.getValue().equals("R")){
						//obtem o resultado que deveria ser
						op=n1.getPai();
						resultado=getResult(op);
					}
				}
				//caso mais complexo: n1 e n2 não são filhos do mesmo pai (este caso vale apenas para + e * que são associativas)
				else if ((pai1.getValue().equals("+") && pai2.getValue().equals("+")) ||
						pai1.getValue().equals("*") && pai2.getValue().equals("*")){
					Funcoes f=new Funcoes();
					BTNode pai=f.buscaPai(n1,n2);// pai de n1 e n2
					List<String> cam1=Funcoes.getNodeValues(pai1, pai); //nodos operadores entre pai1 e pai
					List<String> cam2=Funcoes.getNodeValues(pai2, pai); //nodos operadores entre pai2 e pai
					if (checkForAssociativity(cam1) && checkForAssociativity(cam2)){
						associativa=true;
						//obtem o resultado que deveria ser
						op=new BTNode(n1.getPai().getValue(),(BTNode)n1.clone(),(BTNode)n2.clone());
						resultado=getResult(op);
					}else resultado=null;
				}
				if (resultado!=null){ 
					//Uma vez o resultado obtido o mesmo é buscado em difSolver a fim ve verificar a sua existencia
					// se est não existir: misconseption
					boolean achou=false;
					Iterator<BTNode> i=difSolver.iterator();
					BTNode candidato=null;
					int potR=0, potC=0, valIntR, valIntC;
					String incR,incC,sinalR,sinalC;
					String r= resultado.getValue();
					if (r.equals("^")){
						potR=Integer.parseInt(resultado.getDir().getValue());
						r=resultado.getEsq().getValue();
					}
					if (r.startsWith("-"))sinalR="-";
					else sinalR="+";
					incR=Funcoes.getInc(r);
					valIntR=Funcoes.getINT(r);
					BTNode zero=new BTNode("null");
					/*
					 * armazena as possiveis respostas quanto mais parecida menor é o indice
					 * (com uma única excessão, divisão que resulta em fração, pois este é da simplificação):
					 * Indices quanto mais itens diferente mais "fundo" estará na lista
					 */
					List<BTNode> resps=new ArrayList<BTNode>(Arrays.asList(new BTNode[]{zero,zero,zero,zero,zero}));
					String cand;
					while (!achou && i.hasNext()){
						candidato=i.next();
						cand=candidato.getValue();
						//atualmente R não é aceito como possivel resposta de uma operação
						try{
						if (!cand.equals("R")){
							/*
							 * Desmembrar os termos em 4 partes:
							 * 1-Valor Inteiro
							 * 2-Incognita
							 * 3-Potencia
							 * 4-Sinal
							 */ 
							if (cand.equals("^")){ 
								potC=Integer.parseInt(candidato.getDir().getValue());
								cand=candidato.getEsq().getValue();
							}
							if (cand.startsWith("-"))sinalC="-";
							else sinalC="+";
							incC=Funcoes.getInc(cand);
							valIntC=Funcoes.getINT(cand);
							//bloqueio de respostas com fração, pois isto é tratado em outra função
							// e bloqueio a respotas que sejam potencias de inteiros
							if (!candidato.getPai().getValue().equals("/") && !(potC>0 && incC.isEmpty())){
								//encontrar a reposta mais parececida com resultado em vez de a resposta correta
								// a resposta mis parecida sobrepoe a anterior
								int indDif=0;//o quao diferente os temod são;
								if (!sinalC.equals(sinalR))indDif++;
								if (valIntC!=valIntR)indDif++;
								if (!incC.equals(incR))indDif++;
								if (potC!=potR)indDif++;
								//o maximo de diferenças é 4, com sinal,inteiro,incognita e potencia diferente!!!
								if (indDif>resps.size()-1)indDif=resps.size()-1;
								resps.set(indDif, candidato);
								// a respota foi encontrada, ir atras de outra operação errada!
								if (indDif==0)achou=true;
							}
						}
						}catch(Exception e){
							e.printStackTrace();
						}
					}
					//senão achou pega a resposta mais parecida
					if (!achou){
						for (int cont=0;cont<resps.size();cont++){
							if (!resps.get(cont).getValue().equals("null")){
								nodos.add(new BTNode(n1.getPai().getValue(),(BTNode)n1.clone(),(BTNode)n2.clone()));
								nodos.add(resultado);
								nodos.add(resps.get(cont));
								cont=resps.size();
							}
						}
					}
				}else{
					/*
					 * se o resultado é null então eu uma operação impossivel
					 *  apenas colocar na lista os nós, juntamente com um nodo
					 *  com valor null representadno o resultado!!!
					 */
					if ((n1.eFolha() || n1.getValue().equals("^")) &&
							(n2.eFolha() || n2.getValue().equals("^")) && 
							(n1.getPai().equals(n2.getPai())||associativa)&&
							(n1.getPai().getValue().equals("+") || n1.getPai().getValue().equals("-"))){
						/*
						 * Aceitar se e somente se na resposta do aluno o pai do nodo foi igual ao pai do nodo da operação
						 */
						String pai=n1.getPai().getPai().getValue();
						List<String>res=calcAdSubInc(op);
						boolean ehmisc=false;
						for (BTNode node : difSolver) {
							if (node.getPai().getValue().equals(pai) || node.getPai().getValue().equals("=")){
								if (res.indexOf(ajustarPotencia(node))!=-1){
									ehmisc=true;
									break;
								}
							}
						}
						/*
						 * se diffsolver ==null singifica que a respota é igualk a um dos termos da operação
						 * portanto é misc
						 */
						if (difSolver.isEmpty()){
							ehmisc=true;
						}
						if (ehmisc){
							nodos.add(new BTNode(n1.getPai().getValue(),(BTNode)n1.clone(),(BTNode)n2.clone()));
							nodos.add(new BTNode ("null"));
							nodos.add(new BTNode ("null"));
						}
					}
				}
			}
			/*
			 * Se for uma portencia de interios, limpar n1 e n2 por n2 pertencem somente a potência/raiz
			 * 
			 */
			if (potRaizINT){
				n1=null;
				n2=null;
			}else{
				n1=n2;
				n2=null;
			}
		}
		return nodos;
	}
	
	/**
	 * Realiza a soma e subtração de inteiros com incógnitas,
	 * ou seja, somando as partes inteiras e juntando com as incognitas. 
	 * Apenas para validação da regra de misconseption de matemática básica
	 * @param operacao o nodo contendo a operação a ser realizada, no qual,
	 * os filhos são os termoas a serem somados/subtraidos
	 * @return o resultado da soma/subtração ou "" de for outra operação. 
	 */
	private static List<String> calcAdSubInc(BTNode operacao){
		List<String> res=new ArrayList<String>(3);
		if (operacao.getValue().equals("+") || operacao.getValue().equals("-")){
			BTNode n1=operacao.getEsq();
			BTNode n2=operacao.getDir();
			String v1=ajustarPotencia(n1);
			String v2=ajustarPotencia(n2);
			String inc1=Funcoes.getInc(v1),inc2=Funcoes.getInc(v2);
			boolean potencia=false;
			int pot=0;
			if (n1.getValue().equals("^") || n2.getValue().equals("^")){
				potencia=true;
				if (n1.getValue().equals("^"))pot=n1.getDir().getIntValue();
				else pot=n2.getDir().getIntValue();
			}
			int val1=Funcoes.getINT(v1),val2=Funcoes.getINT(v2);
			int resp;
			// se os 2 termos tiverem incognita então não é uma misc. de soma de inteiros com
			//incógnitas
			if (!inc1.isEmpty() && !inc2.isEmpty())return res;
			if (inc1.isEmpty())inc1=inc2;
			if (operacao.getValue().equals("+")){
				//caso: a+x=0, onde "a" é inteiro, fica ax=0
				if ((val1==1||val1==-1) && !inc1.isEmpty()){
					res.add(val2*val1+inc1);
					res.add(val2-1+"");
				}else if((val2==1||val2==-1) && !inc2.isEmpty()){
					res.add(val1*val2+inc1);
					res.add(val1-1+"");
				}
				resp=val1+val2;
			}else{
				if (val1==1 && !inc1.isEmpty()){
					res.add(val2-1+"");
				}else if(val2==1 && inc2.isEmpty()){
					res.add(val1-1+"");
				}
				resp=val1-val2;
			}
			if (!inc1.isEmpty())res.add(resp+inc1);
			if (!res.isEmpty() && res.get(res.size()-1).contains("1x")){
				String nVal=res.get(res.size()-1);
				res.set(res.size()-1, Funcoes.formatResultado(nVal));//nVal.replace("1x", "x"));
			}
			res.add(val1+"");
			res.add(val2+"");
			if (!inc1.isEmpty()){
				if (val1==1)res.add(inc1);
				if (val1==-1)res.add("-"+inc1);
			}
			if (!inc2.isEmpty()){
				if (val2==1)res.add(inc2);
				if (val2==-1)res.add("-"+inc2);
			}
			if (potencia){
				ArrayList<String> pots=new ArrayList<String>();
				for (String s: res){
					if (Funcoes.isInc(s.charAt(s.length()-1)))pots.add(s+"^"+pot);
				}
				res.addAll(pots);
			}
		}
		return res;
	}
	

	/**
	 * Verifica se <code>cam</code> contém apenas nodos iguais,
	 * e estes devem ser de + ou de *, pois são operações associativas 
	 * @param cam uma {@link List} de {@link String} cotendo os operadores
	 * @return <code>true</code> se a lista contiver apenas + ou * e
	 * <code>false</code> caso contrário.
	 */
	public static boolean checkForAssociativity(List<String> cam){
		int freq=0; //numero de vezes que determinado nodo aparece em cam1 e cam2
		freq=Collections.frequency(cam, "+");
		if (freq==cam.size()){ // se igual então significa que no caminho entre o pai e o n1 ha somete + portento é possivel operar
			return true;
		}else{
			freq=Collections.frequency(cam, "*");
			if (freq==cam.size()){
				return true;
			}
		}
		return false;
	}

	/**
	 * Realiza a operação matematica representada por operacao,
	 * operacao deve conter nodos folha, e ser um operador
	 * @param operacao a sub-arvore que deve conter filhos se
	 * sejam nodos folha
	 * @return um {@link BTNode} contendo o resultado da operação
	 */
	public static BTNode getResult(BTNode operacao){
		String n1,n2;
		char op;
		int v1,v2;
		int pot1=0,pot2=0;
		BTNode esq=operacao.getEsq(),dir=operacao.getDir();
		//coletar valores
		//sinal da operação
		op=operacao.getValue().charAt(0);//sendo operador so há um caracter
		if (esq==null|| dir==null)return null;
		//valor dos operandos
		if (esq.getValue().equals("^")){
			n1=esq.getEsq().getValue();
			pot1=Integer.parseInt(esq.getDir().getValue());
		}else n1=esq.getValue();
		if (dir.getValue().equals("^")){
			n2=dir.getEsq().getValue();
			pot2=Integer.parseInt(dir.getDir().getValue());
		}else n2=dir.getValue();
		//separar inteiros das incognitas
		v1=Funcoes.getINT(n1);
		n1=Funcoes.getInc(n1);
		if (!n1.isEmpty() && pot1==0)pot1=1;
		v2=Funcoes.getINT(n2);
		n2=Funcoes.getInc(n2);
		if (!n2.isEmpty() && pot2==0)pot2=1;
		BTNode resultado=null;
		//bloquear operações com potencias de inteiros
		if (pot1>1 && n1.isEmpty()) return null;
		if (pot2>1 && n2.isEmpty()) return null;
		switch (op) {
		case '+':
			v1=v1+v2;
			if (n1.equals(n2) && pot1==pot2){
				if (pot1>1)resultado=new BTNode("^",new BTNode(Funcoes.formatResultado(v1+n1)),new BTNode(pot1+""));
				else resultado=new BTNode(Funcoes.formatResultado(v1+n1));
			}
			return resultado;
		case '-':
			v1=v1-v2;
			if (n1.equals(n2) && pot1==pot2){
				if (pot1>1)resultado=new BTNode("^",new BTNode(Funcoes.formatResultado(v1+n1)),new BTNode(pot1+""));
				else resultado=new BTNode(Funcoes.formatResultado(v1+n1));
			}
			return resultado;
		case '*':
			v1*=v2;
			// deve ter incngita igual ou sem incongita, mas um deve ter incognita pra somar potencia
			if ((n1.equals(n2)||n1.isEmpty() || n2.isEmpty())){ 
				if (Funcoes.isInc(n1) || Funcoes.isInc(n2))	pot1+=pot2;
			}
			// se n tem incognita pega de n2, n tiver n faz diferença
			if (n1.equals(""))n1=n2;
			if (pot1>1)resultado=new BTNode("^",new BTNode(Funcoes.formatResultado(v1+n1)),new BTNode(pot1+""));
			else resultado=new BTNode(Funcoes.formatResultado(v1+n1));
			return resultado;
		case '/':
			//sem incognita e sem potencia e divisão inteira (o resultado não pode dar uma fração)
			if (n1.equals("") && n1.equals(n2) && pot1<=1 && pot1==pot2){
				if ((((int)v1/(int)v2))==((double)v1/(double)v2)){
					resultado=new BTNode((v1/v2)+"");
				}
			}
			return resultado;
		case '^':
			//sem incognita
			int r;
			if (n1.equals("") && n1.equals(n2)){
				//potencia não produz numero real se a base for inteira, com é o caso;
				r=(int)Math.pow(v1, v2);
				resultado=new BTNode(r+"");
			}
			return resultado;
		case 'R':
			double res;
			// sem incognita e somente raiz quadrada
			if (n1.equals("") && n1.equals(n2) && v2==2){
				res=Math.sqrt(v1);
				if (res==(int)res){
					resultado=new BTNode ((int)res+"");
				}
				else resultado=null;
			}
			return resultado;
		default:
			return null;
		}
	}

	/**
	 * Responsável pela validação de uma misconseption de simplificação de frações.
	 * @param em oobjeto da memoria de trabalho do SE, contendo as diferencas entre
	 * as equações
	 * @return uma {@link List} contendo as frações que geraram a misconseption
	 */
	public static List<BTNode> ehMiscSimplificacao(EquacaoMisc em){
		//System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		List<BTNode> difEsqSolver=em.getDiffEsqSolver();
		List<BTNode> difDirSolver=em.getDiffDirSolver();
		List<BTNode> difEsqUser=em.getDiffEsqUser();
		List<BTNode> difDirUser=em.getDiffDirUser();
		List<BTNode> nodos=checkForMiscSimplificacao(difDirUser, difDirSolver);
		if (nodos!=null && nodos.isEmpty())nodos=checkForMiscSimplificacao(difEsqUser, difEsqSolver);
		return nodos;
	}

	/**
	 * Resposavel pela deteccao de misconseption de simplificação, ou seja,
	 * apenas frações. Tais simplificações detectadas são:
	 * <ol>
	 * <li>Simplificação parcial de inteiros - 12/36=>2/6=>1/3</li>
	 * <li>Simplificação de incognitas - 12x^2/3x => 12x/3
	 * </ol>
	 * @param difUser
	 * @param difSolver
	 * @return as frações que causaram a misconseption
	 */
	private static List<BTNode> checkForMiscSimplificacao(List<BTNode> difUser, List<BTNode> difSolver){
		BTNode n1=null,n2=null;
		List<BTNode> nodos = new ArrayList<BTNode>();
		for (Iterator<BTNode> it=difUser.iterator();it.hasNext();){
			if (n1==null && it.hasNext())n1=it.next();
			if (n2==null && it.hasNext())n2=it.next();			
			/*
			 * Somente é permitido nodos filhos diretos de "/"
			 * e estes devem ser "irmãos" e não podem ser raizes
			 */
			if ((n1!=null && n1.getPai().getValue().equals("/")) && 
					(n2!=null && n2.getPai().getValue().equals("/")) &&
					n1.getPai().equals(n2.getPai()) && 
					!n1.getValue().equals("R") && !n2.getValue().equals("R")){
				boolean achou=false;
				boolean divFrac=false;
				/*
				 * Verificar se é divisão de fração, neste caso so validar
				 * se a resposta do aluno também contiver uma divisão de fração,
				 * e obviamente a fração da respota estever nesta divisão.
				 */
				if (n1.getPai().getPai().getValue().equals("/")){
					divFrac=true;
				}
				/*
				 * Criado par evitar conflito com a regra de misconseption de 
				 * multiplicação de frações, ou seja, liberar a fração
				 * se e somente se, caso for multiplicação, apenas um dos termos da multiplicação
				 * estiver na lista de diferenças do resolvedor ou se a multiplicação estiver na 
				 * lista de diferenças do usuario
				 */
				BTNode paiFrac=n1.getPai().getPai();
				List<BTNode> filhosFrac= Arrays.asList(new BTNode[]{paiFrac.getEsq().getEsq(),
						paiFrac.getEsq().getDir(),paiFrac.getDir().getEsq(),paiFrac.getDir().getDir()});
				if (paiFrac.getValue().equals("*") && (difUser.contains(filhosFrac) ||
						(!checkForMultFrac(difSolver)))){
					//não faz nada apena salta pra a proxima iteração
				}else{
					Iterator<BTNode> i=difSolver.iterator();
					BTNode candidato;
					double num1,num2,den1,den2;
					int inum1,inum2,iden1,iden2;
					//		String incN1,incN2,incD1,incD2;
					num1=Funcoes.getINT(getValorOperador(n1));
					den1=Funcoes.getINT(getValorOperador(n2));
//					incN1=Funcoes.getInc(getValorOperador(n1));
//					incD1=Funcoes.getInc(getValorOperador(n2));
					BTNode pai;
					while (!achou && i.hasNext()){
						candidato=i.next();
						pai=candidato.getPai();
						//Simplificação parcial
						if ( (pai.getPai()!=null)&& ((!divFrac && !pai.getPai().getValue().equals("/")) ||
								(divFrac && pai.getPai().getValue().equals("/"))) && pai.getValue().equals("/") && 
								(pai.getEsq().eFolha() || pai.getEsq().getValue().equals("^")) &&
								(pai.getDir().eFolha() || pai.getDir().getValue().equals("^"))){
							num2=Funcoes.getINT(getValorOperador(pai.getEsq()));
							den2=Funcoes.getINT(getValorOperador(pai.getDir()));
//							incN2=Funcoes.getInc(getValorOperador(pai.getEsq()));
//							incD2=Funcoes.getInc(getValorOperador(pai.getDir()));
							num1=num1/num2;
							den1=den1/den2;
							/*
							 * Se ambos forem igual a 1 significa que nada foi mudado
							 */						
							if ((num1!=1 && den1!=1) || (num1==1 && den1!=1) || (num1!=1 && den1==1)){
								/*
								 * Se n forem iguais, e/ou o resultado n for inteiro então não ha
								 * como ir de num1/den1 até num2/den2 portanto misconseption!!!
								 */
								inum1=(int)num1;
								inum2=(int)num2;
								iden1=(int)den1;
								iden2=(int)den2;
								if (num1!=den1 ||  (inum1!=num1 || inum2!=num2 || iden1!=den1 || iden2!=den2)){
									// como este metodo so trata de simplificação que geram frações então pus o simbolo direto
									nodos.add(new BTNode("/",new BTNode(n1.getValue()),new BTNode(n2.getValue())));
									nodos.add(new BTNode("/",new BTNode ((int)num2),new BTNode((int)den2)));
									achou=true;
								}
							}
							if (!achou){
								// simplifacação de incognita
								int potN1,potN2,potD1,potD2;
								int maior1,maior2;
								potN1=Funcoes.getPotencia(n1);
								potD1=Funcoes.getPotencia(n2);
								potN2=Funcoes.getPotencia(pai.getEsq());
								potD2=Funcoes.getPotencia(pai.getDir());
								if (potN1>=potD1){
									maior1=potN1-potD1;
								}else maior1=potD1-potN1;
								if (potN2>=potD2){
									//apenas recebe pois ja estao "simplificados"
									maior2=potN2;
								}else maior2=potD2;
								if (maior1!=maior2){
									nodos.add(new BTNode("/",new BTNode(n1.getValue()),new BTNode(n2.getValue())));
									nodos.add(new BTNode("/",new BTNode ((int)num2),new BTNode((int)den2)));
									achou=true;
								}
							}
						}
					}
				}
			}
			n1=n2;
			n2=null;
		}
		return nodos;
	}

	private static boolean checkForMultFrac(List <BTNode> folhas){
		BTNode n1=null,n2=null,mult=null;
		for (Iterator<BTNode> it = folhas.iterator(); it.hasNext();) {
			if (n1==null && it.hasNext())n1=it.next();
			if (n2==null && it.hasNext())n2=it.next();
			if (n1!=null & n2!=null){
				n1=n1.getNodeX("/");
				n2=n2.getNodeX("/");
				if (n1==null)n1=n2;
				else if (n1.equals(n2) && n1.getPai().getValue().equals("*")){
					mult=n1.getPai();
					break;
				}
				n1=n2;
				n2=null;
			}
		}
		return (mult!=null);
	}

	/**
	 * Obtem o valor de um nodo, se o valor do nodo for "^" retorna o 
	 * valor do nodo esquerdo. 
	 * @param op o nodo cujo valor será retornado.
	 * @return uma {@link String} contendo o valor do nodo
	 */
	public static String getValorOperador(BTNode op){
		if (op.getValue().equals("^")){
			return op.getEsq().getValue();
		}else return op.getValue();
	}

	/**
	 * Responsável por verificar a corretude do mmc sobre toda a equação
	 * @param em o Objeto do SE
	 * @return uma {@link List} contendo o valor que gerou a misconseption
	 */
	public static List<BTNode> ehMiscMMCDenComum(EquacaoMisc em){
	//	System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		List<BTNode> nodos=checkForMiscMMCDenComum(em.getUser(),em.getSolver());
		return nodos;
	}

	private static List<BTNode> checkForMiscMMCDenComum (Expression user, Expression solver){
		List<BTNode> nodos=new ArrayList<BTNode>();
		if (user!=null && solver!=null && user.getRoot().getValue().equals("/") &&
				solver.getRoot().getValue().equals("=")){
			BTNode fracMMC=user.getRoot();
			if (!fracMMC.getValue().equals("/"))return nodos;
			else{
				BTNode raiz=solver.getRoot();
				raiz=(BTNode)raiz.clone();
				List<BTNode> fracs=Expression.buscaXall("/", raiz);
				if (!fracs.isEmpty()){
					try {
						Expression e =new Expression ("x");
						BTNode den=Funcoes.mmcPolinomios(new Vector<BTNode>(fracs),e);
						String denValue=den.getValue();						
						String usrMMC=fracMMC.getDir().getValue();
						if (!usrMMC.equals(denValue)){
							nodos.add(den);
							nodos.add(fracMMC);
						}
					} catch (InvalidValueException e) {return nodos;}
				}
			}
		}
		return nodos;
	}

	/**
	 * Verifica a corretude do MMC sobre a soma de fração e da multiplicação
	 * do MMC pelo numerador
	 * @param em o Objeto do SE
	 * @return uma {@link List} contendo os nodos em misconseption, o mmc se
	 * este esiver errado ou os termos do numerado se este estiver errado ou null
	 * se não for encontrado nada
	 */
	public static List<BTNode> ehMiscMMCSomaFrac(EquacaoMisc em){
	//	System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		List<BTNode> difEsqSolver=em.getDiffEsqSolver();
		List<BTNode> difDirSolver=em.getDiffDirSolver();
		List<BTNode> difEsqUser=em.getDiffEsqUser();
		List<BTNode> difDirUser=em.getDiffDirUser();
		List<BTNode> nodos=checkForMiscMMCSomaFrac(difEsqUser,difEsqSolver, em.getUser(),em.getSolver());
		if (nodos.isEmpty())nodos=checkForMiscMMCSomaFrac(difDirUser, difDirSolver, em.getUser(),em.getSolver());
		return nodos;
	}

	private static List<BTNode> checkForMiscMMCSomaFrac(List<BTNode> difUser, List<BTNode> difSolver,
			Expression user,Expression solver){
		List<BTNode> nodos=new ArrayList<BTNode>();
		if (user!=null && user.getRoot().getValue().equals("=") &&
				solver!=null && solver.getRoot().getValue().equals("=")){
			//verificar primeiro o denominador da fração
			//Tatica: formar uma equação somente como a soma e trata como se fosse um 
			// mmc sobre toda a equação
			BTNode nS1=null,nS2=null,nU=null;
			List<BTNode> fracs=new ArrayList<BTNode>();
			BTNode fracUser=null;
			//buscar as frações na lista de diferencas, só ha uma soma de frações por lado da equação
			if (difUser.size()<=1)return nodos;
			for (Iterator<BTNode> it=difUser.iterator();it.hasNext();){
				if (it.hasNext() && nS1==null)nS1=it.next();
				if (it.hasNext() && nS2==null)nS2=it.next();
				if (nS1!=null && nS2!=null){
					nS1=nS1.getNodeX("/");
					nS2=nS2.getNodeX("/");
					if (nS1==null)nS1=nS2;
					else if (nS1.equals(nS2)){
						//pq se ja conter não prescisa adicionar de novo ja que a fração ja foi adicionada
						String sinal=nS1.getPai().getValue();
						if ((sinal.equals("+")||sinal.equals("-")) && !fracs.contains(nS1))fracs.add(nS1);
					}
					nS1=nS2;
					nS2=null;
				}
			}
			for (Iterator<BTNode> i=difSolver.iterator();i.hasNext();){
				nU=i.next();
				nU=nU.getNodeX("/");
				if(nU!=null && nU.getDir().eFolha()){
					fracUser=nU;
					break;
				}
			}
			if (fracUser==null) return nodos;
			Expression u,s;
			try{
				s=new Expression(solver.setmod(fracs.remove(0).getPai())+"=0");
				u=new Expression("("+user.setmod(fracUser)+"=0)/"+fracUser.getDir().getValue());
				Expression.removeDaArvore(Expression.find(u.getRoot().getEsq(),"/").getDir());
				u.setmod();
			}catch (Exception e) {return nodos;}
			nodos=checkForMiscMMCDenComum(u, s);
			if (!nodos.isEmpty())return nodos;
			else{
				//caso não seja o mmc que esteja errado verificar se n é a multiplicação
				try {
					s=new Expression ("("+s.getnewexpression()+")/"+u.getRoot().getDir().getValue());
				} catch (InvalidValueException e) {
					return new ArrayList<BTNode>();
				}
				nodos=checkForMiscMTNumerador(u,s);
			}
		}
		return nodos;
	}

	/**
	 * Valida misconseption de equações quando na soma
	 * ou subtração é somado numerador com numerado e denominador com denominador
	 * ex: <br>
	 * 3x/4+2/3 => 5x/7
	 * @param em
	 * @return os nodos que causaram a misconseption
	 */
	public static List<BTNode> ehMiscMMCSomaSubLinear (EquacaoMisc em){
	//	System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		List<BTNode> difEsqSolver=em.getDiffEsqSolver();
		List<BTNode> difDirSolver=em.getDiffDirSolver();
		List<BTNode> nodos=checkForMiscMMCSomaSubLinear(em.getSolver(), 
				em.getSolver().getRoot().getEsq(),difEsqSolver);
		if (nodos.isEmpty())nodos=checkForMiscMMCSomaSubLinear(em.getSolver(),
				em.getSolver().getRoot().getDir(),difDirSolver);
		return nodos;
	}

	private static List<BTNode> checkForMiscMMCSomaSubLinear(Expression solver,BTNode sideSolver, List<BTNode> difSolver){
		List<BTNode> nodos=new ArrayList<BTNode>();
		// "<=2" pois deve ser uma fracao com nodos folha, filhos direto de "/"
		if (solver!=null && solver.getRoot().getValue().equals("=") && difSolver!=null && !difSolver.isEmpty() &&
				difSolver.size()<=2 && difSolver.get(0).getPai().getValue().equals("/")){
			List <BTNode> fracsSolver=Expression.buscaXall("/", sideSolver);
			//pega a soma dos numeradores e denominadores
			// ao termino do "for" n1 tera a soma deos numeradores e denominadores
			BTNode somaNum=null;
			BTNode somaDen=null;
			BTNode n1=null,n2=null;
			if (fracsSolver.size()>1){
				for (Iterator<BTNode> iterator = fracsSolver.iterator(); iterator.hasNext();) {
					if (n1==null)n1=iterator.next();
					if (n2==null)n2=iterator.next();
					//poderias ser tanto n1 como n2, optei por n2 por ser filho direito do sinal
					if (!n2.getPai().getValue().equals("+") &&
							!n2.getPai().getValue().equals("-")) return new ArrayList<BTNode>();
					if (n1.getPai().equals(n2.getPai())){
						String s=n1.getEsq().getValue();
						if (s.startsWith("-")){
							n1.getPai().setValue("-");
							n1.getEsq().setValue(s.substring(1));
						}
						s=n1.getDir().getValue();
						if (s.startsWith("-")){
							n1.getPai().setValue("-");
							n1.getDir().setValue(s.substring(1));
						}
						s=n2.getEsq().getValue();
						if (s.startsWith("-")){
							n1.getPai().setValue("-");
							n2.getEsq().setValue(s.substring(1));
						}
						s=n2.getDir().getValue();
						if (s.startsWith("-")){
							n1.getPai().setValue("-");
							n2.getEsq().setValue(s.substring(1));
						}
						somaNum=getResult(new BTNode (n2.getPai().getValue(),
								new BTNode(n1.getEsq().getValue()),
								new BTNode(n2.getEsq().getValue())));
						somaDen=getResult(new BTNode (n2.getPai().getValue(),
								new BTNode(n1.getDir().getValue()),
								new BTNode(n2.getDir().getValue())));
						n1=new BTNode ("/",somaNum,somaDen);
					}

				}
				//comparar com a resposta do aluno, se for igual: misconseption!!!
				BTNode aluno=difSolver.get(0).getPai();
				if (n1.getEsq().getValue().equals(aluno.getEsq().getValue()) &&
						n1.getDir().getValue().equals(aluno.getDir().getValue())){
					nodos.add(n1);
					nodos.add(new BTNode (n2.getPai().getValue()));
				}
			}
		}
		return nodos;
	}

	public static List<BTNode> ehMiscMMCMTNumerador (EquacaoMisc em){
	//	System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		return checkForMiscMTNumerador(em.getUser(), em.getSolver());
	}

	/**
	 * verifca a misconseption da soma e subtração, quando ha um erro
	 * nas operação de dividir o denominador da nova fração com o denominador
	 * da fração antiga.
	 * @param user a equação do usuário
	 * @param solver a equação do resolvedor
	 * @return uma lista contendo as frações onde ocorreram as misconseption
	 */
	private static List<BTNode> checkForMiscMTNumerador(Expression user, Expression solver){
		List<BTNode> nodos= new ArrayList<BTNode>();
		if (user!=null && user.getRoot().getValue().equals("/") &&
				solver!=null && solver.getRoot().getValue().equals("/")){
			//buscar na equação do usuário as multiplicações, a partir de "="
			// filho esquerdo de "/"
			BTNode frac=Funcoes.calculaMMC(solver.getRoot(), solver);
			List<BTNode> multsUser= Expression.buscaXall("*", user.getRoot().getEsq());
			List<BTNode> multsSolver= Expression.buscaXall("*", frac.getPai());
			// comparar as multiplicações caso não feche alguma: misconseption
			List<BTNode> mSFolhas, mUFolhas;
			if (multsUser.isEmpty() || multsSolver.isEmpty())return nodos;
			for (int mS=multsSolver.size()-1;mS>=0;mS--){
				mSFolhas=Expression.getAllFolhas(multsSolver.get(mS));
				for (int mU=multsUser.size()-1;mU>=0;mU--){
					mUFolhas=Expression.getAllFolhas(multsUser.get(mU));
					//comparar a folhas e eliminar as iguais
					for (int i=mSFolhas.size()-1;i>=0;i--){
						for (int j=mUFolhas.size()-1;j>=0;j--){
							if(!mSFolhas.isEmpty() && !mUFolhas.isEmpty()){
								if (mSFolhas.get(i).igual(mUFolhas.get(j))){
									mUFolhas.remove(j);
									mSFolhas.remove(i);
									// como removei 1 de MS e e i não irá atualizara ate o for de dentro teminar pode 
									// dar numberformat exception por isso:
									i--;
								}
							}
						}
						if (mUFolhas.isEmpty() && mSFolhas.isEmpty()){
							multsUser.remove(mU);
							multsSolver.remove(mS);
							// se ambos estão vazio então terminar o laço
							i=-1;
						}
					}
				}
			}
			if (!multsSolver.isEmpty() || !multsUser.isEmpty()){
				nodos.add(multsUser.get(0));
			}
		}
		return nodos;
	}

	public static List<BTNode> ehMiscMTFracInversa(EquacaoMisc em){
	//	System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		List<BTNode> difEsqSolver=em.getDiffEsqSolver();
		List<BTNode> difDirSolver=em.getDiffDirSolver();
		List<BTNode> difEsqUser=em.getDiffEsqUser();
		List<BTNode> difDirUser=em.getDiffDirUser();
		if (em.getSolver().getRoot().getValue().equals("/") ||
				em.getUser().getRoot().getValue().equals("/")) return new ArrayList<BTNode>();
		List<BTNode> nodos=checkForMiscMTFracInversa(difEsqUser,difEsqSolver);
		if (nodos.isEmpty())nodos=checkForMiscMTFracInversa(difDirUser,difDirSolver);
		return nodos;
	}

	/**
	 * verifca a misconseption da multiplicação de frações em que
	 * o numeroa de multiplicado com o denoiminador e vice-versa  
	 * @param user a equação do usuário
	 * @param solver a equação do resolvedor
	 * @return uma lista contendo as fracões onde ocorreram as misconseption
	 */
	private static List<BTNode> checkForMiscMTFracInversa(List<BTNode> user, List<BTNode> solver){
		//passo 1 buscar a multiplicação de fracoes entre a s diferencas
		BTNode n1=null,n2=null;
		List<BTNode> nodos=new ArrayList<BTNode>();
		if (user.size()<=1)return nodos;
		BTNode mult=null;
		for (Iterator<BTNode> it = user.iterator(); it.hasNext();) {
			if (n1==null && it.hasNext())n1=it.next();
			if (n2==null && it.hasNext())n2=it.next();
			if (n1!=null && n2!=null){
				n1=n1.getNodeX("/");
				n2=n2.getNodeX("/");
				if (n1==null)n1=n2;
				else if (n1.equals(n2) && n1.getPai().getValue().equals("*")){
					mult=n1.getPai();
					if (mult.getEsq().getValue().equals("/") &&
							mult.getDir().getValue().equals("/"))break;
					else mult=null;
				}
				n1=n2;
				n2=null;
			}
		}
		/*
		 * passo 2 calcular multiplicação por "regra da tesoura":
		 * numerador da primeira com o denominador da segunda e 
		 * denominador de primeira com numerador da segunda
		 */
		n1=null;
		if (mult!=null){
			BTNode num1=(BTNode)mult.getEsq().getEsq().clone();
			BTNode den1=(BTNode)mult.getEsq().getDir().clone();
			BTNode num2=(BTNode)mult.getDir().getEsq().clone();
			BTNode den2=(BTNode)mult.getDir().getDir().clone();
			BTNode num=getResult(new BTNode("*",num1,den2));
			BTNode den=getResult(new BTNode("*",num2,den1));
			//passo 3 comparar com a resposta do aluno
			for (Iterator<BTNode> iterator = solver.iterator(); iterator.hasNext();) {
				if (n1==null && iterator.hasNext())n1=iterator.next();
				n1=n1.getNodeX("/");
				Expression num3=new Expression(new BTNode ("=",(BTNode)n1.getEsq().clone(),new BTNode("0")));
				Expression den3=new Expression(new BTNode ("=",(BTNode)n1.getDir().clone(),new BTNode("0")));
				Expression num4=new Expression(new BTNode ("=",(BTNode)num,new BTNode ("0")));
				Expression den4=new Expression(new BTNode ("=",(BTNode)den,new BTNode ("0")));
				if (n1!=null && ModeloAluno.comparar(num3,num4) && ModeloAluno.comparar(den3,den4)){
					nodos.add(n1);
					nodos.add(num);
					break;
				}
			}
		}
		return nodos;
	}

	/**
	 * Verifica a misconseption da divisão de frações no qual o numerador
	 * é dividido pelo numerador e o denominador é dividido pelo denominador
	 * @param em o objeto na memória de trabalho do SE
	 * @return uma {@link List} contendo as frações em misconseption
	 */
	public static List<BTNode> ehMiscDivLin(EquacaoMisc em){
	//	System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		BTNode rootSolver=em.getSolver().getRoot();
		List<BTNode> fracUser= em.getDiffEsqSolver();
		List<BTNode> nodos;
		BTNode fracSolver=Funcoes.getDivFracao(rootSolver.getEsq());
		//a divisão deve este no mesmo lado da equação no 2 casos
		if (fracUser!=null && fracSolver!=null){
			nodos=checkForMiscDivLin(fracUser, fracSolver);
		}else{
			fracUser=em.getDiffDirSolver();
			fracSolver=Funcoes.getDivFracao(rootSolver.getDir());
			nodos=checkForMiscDivLin(fracUser, fracSolver);
		}
		return nodos;
	}

	private static List<BTNode> checkForMiscDivLin(List<BTNode> fracUser,BTNode fracSolver){
		List<BTNode> nodos= new ArrayList<BTNode>();
		if (fracUser==null || fracSolver==null)return nodos;
		int num,den;
		BTNode frac1,frac2;
		//aplicar a misconseption sobre os valores
		frac1=fracSolver.getEsq();
		frac2=fracSolver.getDir();
		BTNode btNum,btDen;
		if ((frac1.getEsq().eFolha() || (frac1.getEsq().getValue().equals("^") && frac1.getEsq().getEsq().eFolha())) &&
				(frac1.getDir().eFolha() || (frac1.getDir().getValue().equals("^") && frac1.getDir().getEsq().eFolha())) &&
				(frac2.getEsq().eFolha() || (frac2.getEsq().getValue().equals("^") && frac2.getEsq().getEsq().eFolha())) &&
				(frac2.getDir().eFolha() || (frac2.getDir().getValue().equals("^") && frac2.getDir().getEsq().eFolha()))){
			btNum=getResult(new BTNode ("/",(BTNode)frac1.getEsq().clone(),(BTNode)frac2.getEsq().clone()));
			btDen=getResult(new BTNode ("/",(BTNode)frac1.getDir().clone(),(BTNode)frac2.getDir().clone()));
			if (btNum==null || btDen==null) return nodos;
			num=btNum.getIntValue();
			den=btDen.getIntValue();
			/*
			 * Uma vez os valores calculados verificar a existencia do 
			 * resultado na resposta do aluno,
			 */
			for (BTNode result:fracUser){
				result=result.getNodeX("/");
				if (result!=null){
					if (result.getValue().equals("/") && 
							result.getDir().eFolha() && 
							result.getEsq().eFolha()){
						if (result.getEsq().getValue().equals(num+"") && result.getDir().getValue().equals(den+"")){
							nodos.add(fracSolver);
						}
					}else if ((((float)num/(float)den)+"").equals(result.getValue())){
						nodos.add(fracSolver);
					}
				}
			}
		}
		return nodos;
	}

	/**
	 * Verifica a misconseption de casos a*c/b onde o erro é
	 * (a*b)/(a*c) em vaez de (a*b)/c
	 * @param em objeto da memoria do SE
	 * @return uma {@link List} contendo os nodos em misconseption
	 */
	public static List<BTNode> ehMiscMultFracINTFrac(EquacaoMisc em){
	//	System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		List<BTNode> difEsqSolver=em.getDiffEsqSolver();
		List<BTNode> difDirSolver=em.getDiffDirSolver();
		List<BTNode> difEsqUser=em.getDiffEsqUser();
		List<BTNode> difDirUser=em.getDiffDirUser();
		List<BTNode> nodos=checkForMultFracINTFrac(difEsqUser, difEsqSolver);
		if (nodos.isEmpty())nodos=checkForMultFracINTFrac(difDirUser, difDirSolver);
		return nodos;
	}

	private static List<BTNode> checkForMultFracINTFrac(List<BTNode> difUser, List <BTNode> difSolver){
		ArrayList<BTNode> nodos=new ArrayList<BTNode>();
		/*
		 * iterar sobre o que não está em user (difUsr) e encontrar um multiplicação de um
		 * inteiro por um fração
		 */
		for (BTNode mt:difUser){
			BTNode pai=mt.getPai();
			BTNode folha=null,fracao=null;
			//se não for o nodo inteiro então é o nodo fração
			if (!pai.getValue().equals("*")){
				pai=pai.getNodeX("/");
				if (pai!=null)pai=pai.getPai();
				else return nodos;
				if (pai==null || !pai.getValue().equals("*"))return nodos;
			}
			if (pai.getEsq().getValue().equals("/"))fracao=pai.getEsq();
			else if (pai.getEsq().eFolha())folha=pai.getEsq();
			if (pai.getDir().getValue().equals("/"))fracao=pai.getDir();
			else if (pai.getDir().eFolha())folha=pai.getDir();
			if (folha!=null && fracao!=null){
				//fazer a multiplicação pelo numerador e pelo denominador
				BTNode num=getResult(new BTNode ("*",(BTNode)folha.clone(),(BTNode)fracao.getEsq().clone()));
				BTNode den=getResult(new BTNode ("*",(BTNode)folha.clone(),(BTNode)fracao.getDir().clone()));
				//buscar a resposta do usuário, ou seja, o que não está em solver (difSolver)
				for (BTNode candidato: difSolver){
					candidato=candidato.getNodeX("/");
					// a segudna condição é caso a equação for geradas pela regra MMC
					if (candidato!=null && candidato.getPai()!=null){
						BTNode n=(BTNode)candidato.getEsq().clone();
						BTNode d=(BTNode)candidato.getDir().clone();
						Expression numerador1=new Expression(new BTNode ("=",num,new BTNode("0")));
						Expression numerador2=new Expression(new BTNode ("=",n,new BTNode("0")));
						Expression denominador1=new Expression(new BTNode ("=",den,new BTNode("0")));
						Expression denominador2=new Expression(new BTNode ("=",d,new BTNode("0")));
						if (ModeloAluno.comparar(numerador1, numerador2) && ModeloAluno.comparar(denominador1, denominador2)){
							nodos.add(pai);
							nodos.add(candidato);
						}
					}
				}
			}
		}
		return nodos;
	}

	/**
	 * validar erros na distributiva como: 
	 * (a+b)*c => a*c+b ou a+b*c ou
	 *  erro de sinal:-c*(a-b) -ac -bc 
	 * @param em o objeto do SE
	 * @return uma list contendo a equação do aluno e a distributiva certa
	 */
	public static List<List<BTNode>> ehMiscDistrib(EquacaoMisc em){
		List<BTNode> difEsqSolver=em.getDiffEsqSolver();
		List<BTNode> difDirSolver=em.getDiffDirSolver();
		List<BTNode> difEsqUser=em.getDiffEsqUser();
		List<BTNode> difDirUser=em.getDiffDirUser();
//		System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		List<List<BTNode>> nodos= checkForMiscDistrib(difEsqUser,difEsqSolver,em.getSolver());
		if (nodos.isEmpty())nodos=checkForMiscDistrib(difDirUser,difDirSolver,em.getSolver());
		return nodos;
	}

	private static List<List<BTNode>> checkForMiscDistrib(List<BTNode> difUser,List <BTNode>difSolver,Expression e){
		List<List<BTNode>> nodos=new ArrayList<List<BTNode>>();
		//buscar uma distributiva que não está na resposta do aluno (difUser)
		BTNode n1=null,n2=null;
		for(Iterator<BTNode> it=difUser.iterator();it.hasNext();){
			if (n1==null && it.hasNext())n1=it.next();
			if (n2==null && it.hasNext())n2=it.next();
			if (n1!=null && n2!=null){
				n1=n1.getNodeX("*");
				n2=n2.getNodeX("*");
				//se n1 e n2 estao sob a mesma multiplicação
				if (n1!=null && n2!=null && n1==n2 && Funcoes.ehDistributiva(n1)){
					//pegar as folhas da ditributiva e comparar com a saida do aluno
					
					n1=(BTNode)n1.clone();
					List<BTNode> folhasU=new ArrayList<BTNode>(difSolver);
					BTNode distributiva=e.distributivaDeN(n1);
					distributiva=new BTNode("=",distributiva,new BTNode("0"));
					List<BTNode> folhasS=Expression.getFolhas(distributiva);
					//remover o zero criado acima
					folhasS.remove(folhasS.size()-1);
					// na saida do aluno DEVE conter nodos da distributiva calculada pela função 
					// verificar a existência do mesmo, 
					// a busca é realizada partindo-se do pressuposto que haverá somente distributiva em folhasU
					//verificar a existencia de multiplicações na resposta do usuário se não tiver, realizara a
					//multiplicação na resposta de solver
					BTNode tempS,tempU;
					List<BTNode> fS=new ArrayList<BTNode>(folhasS);
					List<BTNode> fU=new ArrayList<BTNode>(folhasU);
					BTNode pai;
					for (int i=0;i<fS.size();i++){
						tempS=fS.get(i);
						for (int j=0;j<fU.size();j++){
							tempU=fU.get(j);
							if (tempS.igual(tempU)&& (tempS.getPai().igual(tempU.getPai()) ||
									tempU.getPai().getValue().equals("="))){
								// como são de valores iguais não é necessario verificar tempU
								if (tempS.getValue().equals("^") && !Expression.igual(tempS,tempU)){
									break;
								}else if (tempS.getValue().equals("R"))break;
								/*
								 * tempU e tempS são iguais, ou seja, tem os mesmo valores e os mesmo pais.
								 * Neste caso pais iguais são nodos diferentes com o mesmo valor.
								 * Portanto removê-los das lista fS e fU
								 */
								if (tempS.getPai().getValue().equals("*")){
									pai=tempS.getPai();
									BTNode paiU=tempU.getPai();
									fS.remove(pai.getEsq());
									fS.remove(pai.getDir());
									fU.remove(paiU.getEsq());
									fU.remove(paiU.getDir());
								}else{
									fS.remove(tempS);
									fU.remove(tempU);
								}
								j=fU.size();
								i--;
								if (j==0)i=fS.size();
								tempS=null;
							}
						}
						if (tempS!=null && !fU.isEmpty()){
							//se temp != null é por que não foi encontrado um valor equivalente 
							if (tempS.getPai().getValue().equals("*")){
								//realiza a operação e diminui o indice a fim de ser rechecado com a resposta do aluno
								pai=tempS.getPai();
								fS.remove(pai.getEsq());
								fS.remove(pai.getDir());
								BTNode re= getResult(pai);
								pai.setEsq(null);
								pai.setDir(null);
								pai.setEsq(re.getEsq());
								pai.setDir(re.getDir());
								pai.setValue(re.getValue());
								fS.add(i,pai);
								i--;
								if (fU.isEmpty())i=fS.size();
							}
						}
					}
					/*
					 *	Para haver misconseption, a list ado solver deve conter termos e a do aluno não deve conter termos.
					 *	Pois com a list do aluno vazia, significa que todos os termos foram usados e encontrados durante a comparação,
					 *	ou seja a matemática está correta!!! 
					 */
					if (!fS.isEmpty() && fU.isEmpty()){
						nodos.add(fS);
						nodos.add(fU);
						break;
					}
				}
				n1=n2;
				n2=null;
			}
		}
		return nodos;
	}
	

	public static List<BTNode> ehMiscFatCom(EquacaoMisc em){
	//	System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		if (Funcoes.validarFatorComum(em.getSolver())){
//			List<BTNode> difEsqSolver=em.getDiffEsqSolver();
//			List<BTNode> difDirSolver=em.getDiffDirSolver();
			List<BTNode> nodos=checkForMiscFatCom(em.getUser().getRoot(),em.getSolver().getRoot());
			if (nodos.isEmpty())nodos=checkForMiscFatCom(em.getUser().getRoot(), em.getSolver().getRoot());
			return nodos;
		}
		return new ArrayList<BTNode>();
	}

	/*
	 * 9x^2+3x=0
	 * 3*(3x+2)=0
	 */
	private static List<BTNode> checkForMiscFatCom(BTNode userRoot, BTNode solverRoot){
		List<BTNode> nodos=new ArrayList<BTNode>();
		BTNode ft=null;
		BTNode fc=null;
		List<BTNode> difSolver;
		try {
			ft=new Expression(Funcoes.fatorar((BTNode)solverRoot.clone())+"=0").getRoot();
			fc=ft.getEsq().getEsq();
			difSolver=Conjuntos.diferenca(Expression.getFolhas(userRoot), Expression.getFolhas(ft));
		} catch (InvalidValueException e) {
			difSolver=new ArrayList<BTNode>();
		}
		for (BTNode n:difSolver){


			if (n.getPai().getValue().equals("*")){
				/*
				 * caso simples: o aluno esqueceu de um por um termo em evidência tipo:
				 * 3*(3x+1)=0 em vez de 3x*(3x+1)=0
				 */
				if (Funcoes.getINT(n.getValue())==Funcoes.getINT(fc.getValue()) &&
						!Funcoes.getInc(n.getValue()).equals(Funcoes.getInc(fc.getValue()))){
					nodos.add(n);
					//break;
				}
				/*
				 * Apenas a incognita esta em evidencia ou um numero qualquer
				 */
				if (Funcoes.getINT(n.getValue())!=Funcoes.getINT(fc.getValue()) &&
						Funcoes.getInc(n.getValue()).equals(Funcoes.getInc(fc.getValue()))){
					nodos.add(n);
					//break;
				}
			}else{
				BTNode aux=n.getNodeX("*");
				if (aux!=null && aux.getPai().getValue().equals("=")){
					if (aux.getEsq().eFolha() || aux.getDir().eFolha()){
						if (!aux.getEsq().eFolha() || !aux.getDir().eFolha()){
							nodos.add(n);
							//break;
						}
					}
				}
			}
		}
		return nodos;
	}

	public static List<BTNode> ehMiscFatRaizUmNum(EquacaoMisc em){
	//	System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		List<BTNode> difEsqSolver=em.getDiffEsqSolver();
		List<BTNode> difDirSolver=em.getDiffDirSolver();
		List<BTNode> difEsqUser=em.getDiffEsqUser();
		List<BTNode> difDirUser=em.getDiffDirUser();
		List<BTNode> difSolver=new ArrayList<BTNode>(difEsqSolver);
		difSolver.addAll(difDirSolver);
		List<BTNode> difUser= new ArrayList<BTNode>(difEsqUser);
		difUser.addAll(difDirUser);		
		List<BTNode> nodos=new ArrayList<BTNode>();
		/*
		 * Encotrar aquela raiz que deu misconseption
		 */
		for (BTNode candidato: difSolver){
			if (candidato.getValue().equals("R")){
				//candidato recea R então saltar pro filho esquerdo
				candidato=candidato.getEsq();
				//se n tiver o sinal de * ou ^ então n foi fatorado ainda
				if (candidato.getValue().equals("*") || candidato.getValue().equals("^")){
					String result=new Expression((BTNode)candidato.clone()).avaliarArvore();
					/*
					 * Uma vez calculado o resultado: encontrar um equivalente no passo do resolvedor,
					 * se não for encontrado: misconseption!!! 
					 */
					boolean achou=false;
					for (BTNode bt: difUser){
						bt=bt.getEsq();
						if (bt.getValue().equals(result)){
							achou=true;
							break;
						}
					}
					// se não achou equivalente: misoconseption
					if (!achou){
						nodos.add(candidato);
						break;
					}
				}
			}
		}
		return nodos;
	}

	public static List<BTNode> ehMiscFatRaizSomaSub(EquacaoMisc em){
	//	System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		List<BTNode> difSolver=new ArrayList<BTNode>(em.getDiffEsqSolver());
		difSolver.addAll(em.getDiffDirSolver());
		List<BTNode> difUser= new ArrayList<BTNode>(em.getDiffEsqUser());
		difUser.addAll(em.getDiffDirUser());
		List<BTNode> nodos=new ArrayList<BTNode>();
		for (BTNode bt:difUser){
			if (bt.getValue().equals("R")){
				int radical=bt.getDir().getIntValue();
				bt=bt.getEsq();
				if (bt.getValue().equals("+") || bt.getValue().equals("-")){
					List<BTNode> rFolhas=Expression.getFolhas(bt);
					//calcular os quadrados
					boolean achou=false,misc=false;
					for (int i=0;i<rFolhas.size();i++){
						BTNode rz=rFolhas.get(i);
						double valor;
						int v;
						if (radical==3){
							valor=Math.cbrt(rz.getIntValue());
							v=(int)valor;
						}
						else{
							valor=Math.sqrt(rz.getIntValue());
							v=(int) valor;
						}
						//verificar se possui raiz inteira
						if (valor==v){
							rFolhas.set(i, new BTNode(v+""));
							for (int j=0;j<difSolver.size();j++){
								if (rFolhas.get(i).getValue().equals(difSolver.get(j).getValue())){
									achou=true;
									j=difSolver.size();
								}
							}	
						}
						if (achou)misc=true;
						else misc=false;
						
					}
					if (misc){
						nodos.add(bt);
						break;
					}
				}
			}
		}
		return nodos;
	}
	
	public static List<BTNode> ehMiscProcedenciaOP(EquacaoMisc em){
	//	System.out.println("->Testando as Equacoes: User: "+em.getUser().getCleanExpression()+"Solver: "+em.getSolver().getCleanExpression());
		//obter as diferencas
		List<BTNode> difEsqSolver=em.getDiffEsqSolver();
		List<BTNode> difDirSolver=em.getDiffDirSolver();
		List<BTNode> difEsqUser=em.getDiffEsqUser();
		List<BTNode> difDirUser=em.getDiffDirUser();
		List<BTNode> nodos=checkForMiscProcedenciaOP(difDirSolver,difDirUser);
		if (nodos.isEmpty())nodos=checkForMiscProcedenciaOP(difEsqSolver, difEsqUser);
		return nodos;
	}
	
	
	private static List<BTNode> checkForMiscProcedenciaOP(List<BTNode> difSolver, List<BTNode> difUser){
		BTNode n1=null,n2=null;
		List<BTNode> nodos=new ArrayList<BTNode>();
		List<BTNode> dSolver=new ArrayList<BTNode>(difSolver);
		BTNode pai1,pai2,resultado;
		for (Iterator<BTNode> iterator = difUser.iterator(); iterator.hasNext();) {
			if (n1==null && iterator.hasNext())n1=iterator.next();
			if (n2==null && iterator.hasNext())n2=iterator.next();
			//bloqueio a raizes e potencias
			if (n1!=null && n2!=null && !(n1.getValue().equals("^") || n1.getValue().equals("R"))
									 && !(n2.getValue().equals("^") || n2.getValue().equals("R"))){
				if (!n1.getPai().equals(n2)){
					pai1=n1.getPai();
					pai2=n2.getPai();
					Funcoes f=new Funcoes();
					BTNode pai=f.buscaPai(n1,n2);// pai de n1 e n2
					List<String> cam1=Funcoes.getNodeValues(pai1, pai); //nodos operadores entre pai1 e pai
					List<String> cam2=Funcoes.getNodeValues(pai2, pai); //nodos operadores entre pai2 e pai
					if (!checkForAssociativity(cam1) || !checkForAssociativity(cam2)){
						//verificar se existe um resultado que bate com a operação em questão
						resultado=getResult(new BTNode(pai.getValue(),
											new BTNode(n1.getValue()),
											new BTNode(n2.getValue())));
						BTNode temp;
						if (resultado!=null){
							for(ListIterator<BTNode> it=dSolver.listIterator();it.hasNext();){
								temp=it.next();
								if (temp.getValue().equals(resultado.getValue())){
									/*
									 * se chegou até aki é por que há mais de uma operação ligando
									 * n1 e n2, e estas não são associativas,e n1 e n2 não são irmãos
									 * e o resultado da operação entre n1 e n2 pelo nodo pai dos 2 nodos
									 * foi encontrada na resposta do aluno
									 * Valores a serem adicioanados na lista:
									 * n1 e n2  
									 */
									//antes de inserir verificar se não eh uma distributiva!!!
									// ou seja multiplicação com subarves não operaveis
									if (pai.getValue().equals("*") && (getResult(pai.getEsq())!=null || getResult(pai.getDir())!=null)){
										nodos.add(n1);
										nodos.add(n2);
										it.remove();
										break;
									}
								}
							}
						}
					}
				}
			}
			n1=n2;
			n2=null;
		}
		return nodos;
	}
	
	public static List<BTNode> ehMiscBhaskaraTermos(EquacaoMisc em){
		Expression user=em.getUser();
		Expression solver=em.getSolver();
	//	System.out.println("->Testando as Equacoes: User: "+user.getCleanExpression()+"Solver: "+solver.getCleanExpression());
		List<BTNode> nodos=new ArrayList<BTNode>();
		if (Expression.findX(user.getRoot(), "d")==null)return nodos;
		String sA,sB,sC;
		String inc="";// incognita em uso
		List<BTNode> folhasS=Expression.getFolhas(solver.getRoot());
		List<BTNode> folhasU=Expression.getFolhas(user.getRoot());
		String[] u=new String [3];
		if (folhasS.size()!=4 || folhasU.size()!=5)return nodos;
		/*
		 * remove o 0 de a^x2+bx+c=0 que pde estar no inicio ou no fim da equação dependendo a orientação 
		 * da mesma.
		 */
		if (folhasS.get(0).getValue().equals("0"))folhasS.remove(0);
		else if (folhasS.get(folhasS.size()-1).getValue().equals("0"))folhasS.remove(folhasS.size()-1);
		else return nodos;
		/*
		 * Remove o "d" de d=b^2-4*a*c, a verificação da existência do mesmo ja foi feita
		 * acima
		 */
		if (folhasU.get(0).getValue().equals("d"))folhasU.remove(0);
		else folhasU.remove(folhasU.size()-1);
		//remover o 4 do d=b^2-4*a*c
		folhasU.remove(Funcoes.find(folhasU, new BTNode(4), new BTNodeComparator()));
		//ax^2+bx+c=0
		sA=sB=sC=null;
		for (BTNode n: folhasS){
			if (n.getValue().equals("^")) sA=Funcoes.getINT(n.getEsq().getValue())+"";
			else if (Funcoes.isInc(n.getLast())){
				sB=Funcoes.getINT(n.getValue())+"";
				inc=Funcoes.getInc(n.getValue());
			}
			else sC=n.getValue();
		}
		//d=b^2-4*a*c
		for (BTNode n: folhasU){
			if (n.getValue().equals("^"))u[1]=Funcoes.getINT(n.getEsq().getValue())+"";
			else if (u[1]!=null && u[0]==null)u[0]=Funcoes.getINT(n.getValue())+"";
			else u[2]=Funcoes.getINT(n.getValue())+"";
		}
		if (sA==null || sB==null || sC==null) return new ArrayList<BTNode>();
		BTNode aux;
		BTNodeComparator bc=new BTNodeComparator();
		for (int i=0;i<3;i++){
			if (sA.equals(u[i])&& !Funcoes.contains(nodos, new BTNode("^"), bc)){
				aux=new BTNode ("^",new BTNode(u[i]+inc),new BTNode ("2"));
				nodos.add(aux);
			}else if (sB.equals(u[i]) && !Funcoes.contains(nodos,new BTNode(u[i]+inc), bc)){
				aux=new BTNode (u[i]+inc);
				nodos.add(aux);
			}else if (sC.equals(u[i])&& !Funcoes.contains(nodos, new BTNode(u[i]), bc)){
				aux=new BTNode (u[i]);
				nodos.add(aux);
			}
		}
		//if (nodos.size()>3)return new ArrayList<BTNode>();
		return nodos;		
	}
}