package pat2math.modeloAluno;

import java.util.List;

import pat2math.expressao.Expression;
import pat2math.expressao.arvore.BTNode;

/**
 * Classe de objetos que guardam as equações que serão submetidas a análise das regras de misconseptions. <br>
 * Cada objeto guarda uma equação do resolvedor, uma lista de diferenças em relação a equação do aluno e o 
 * numero de diferenças entre elas. No qual as diferenças estão separadas por equerda e direita, ou seja,
 * os respectivos lados da equação. Também é armazenado os objetos das equações do aluno e do resolvedor.
 * @author Henrique M. Seffrin
 * @since 14/06/2010
 *
 */
public class EquacaoMisc {

	private String equacao;
	private Expression user;
	private Expression solver;
	private List<BTNode> diffEsqSolver;
	private List<BTNode> diffDirSolver;
	private List<BTNode> diffEsqUser;
	private List<BTNode> diffDirUser;
	private int dist;
	
	
	public EquacaoMisc(String equacao,Expression user, Expression solver, List<BTNode> diffEsqSolver,
			List<BTNode> diffDirSolver, List<BTNode> diffEsqUser,
			List<BTNode> diffDirUser) {
		this.equacao = equacao;
		this.user=user;
		this.solver=solver;
		this.diffEsqSolver = diffEsqSolver;
		this.diffDirSolver = diffDirSolver;
		this.diffEsqUser = diffEsqUser;
		this.diffDirUser = diffDirUser;
		dist=calcDist(diffEsqSolver, diffDirSolver);
		dist+=calcDist(diffEsqUser, diffDirUser);
	}
	
	private int calcDist(List<BTNode> listEsq, List<BTNode> listDir){
		int dist;
		if (listDir==null){
			if (listEsq==null) dist=0;
			else dist= listEsq.size();
		}else {
			if (listEsq==null)dist=listDir.size();
			else dist=listDir.size()+listEsq.size();
		}
		return dist;
	}
	
	public EquacaoMisc(String equacao, int dist) {
		super();
		this.equacao = equacao;
		this.dist = dist;
	}

	/**
	 * Obtem a equação armazenada.
	 * @return a uma {@link String} contendo a equação do resolvedor
	 */
	public String getEquacao() {
		return equacao;
	}
	
	/**
	 * Obtem o objeto que armazena a equação do usuário
	 * @return um objeto {@link Expression} com a equação do usuario
	 */
	public Expression getUser(){
		return user;
	}
	
	/**
	 * Obtem o objeto que armazena a equação do resolvedor
	 * @return um objeto {@link Expression} com a equação do resolvedor
	 */
	public Expression getSolver(){
		return solver;
	}
	
	/**
	 * Obtem a lista de diferenças (o que não exite na equação do solver)
	 * do lado esquerdo da equação, entre a equação do aluno e a equação 
	 * armazenada neste objeto.
	 * @return uma {@link List} de {@link BTNode}, contenda as diferenças
	 */
	public List<BTNode> getDiffEsqSolver() {
		return diffEsqSolver;
	}
	
	/**
	 * Obtem a lista de diferenças (o que não exite na equação do solver)
	 * do lado direito da equação, entre a equação do aluno e a equação 
	 * armazenada neste objeto.
	 * @return uma {@link List} de {@link BTNode}, contenda as diferenças
	 */
	public List<BTNode> getDiffDirSolver() {
		return diffDirSolver;
	}

	/**
	 * Retorna o numero de diferenças entre as equações, tanto
	 * lado esquerdo quanto direito.
	 * @return um inteiro contendo o numero de diferencas.
	 */
	public int getDist() {
		return dist;
	}

	/**
	 * Obtem a lista de diferenças (o que não exite na equação do aluno)
	 * do lado esquerdo da equação, entre a equação do aluno e a equação 
	 * armazenada neste objeto.
	 * @return uma {@link List} de {@link BTNode}, contenda as diferenças
	 */
	public List<BTNode> getDiffEsqUser() {
		return diffEsqUser;
	}

	/**
	 * Obtem a lista de diferenças (o que não exite na equação do aluno)
	 * do lado direito da equação, entre a equação do aluno e a equação 
	 * armazenada neste objeto.
	 * @return uma {@link List} de {@link BTNode}, contenda as diferenças
	 */
	public List<BTNode> getDiffDirUser() {
		return diffDirUser;
	}

	
}
