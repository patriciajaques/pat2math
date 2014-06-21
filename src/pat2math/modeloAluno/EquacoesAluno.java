package pat2math.modeloAluno;

import java.util.ArrayList;
import java.util.List;


/**
 * Armazena as informações sobre uma equação que o aluno está resolvendo ou ja resolveu
 * @author Henrique M. Seffrin
 *
 */
public class EquacoesAluno {

	private String equacao;
	private List<String> passos;
	private int pontuacaoTotal;
	private int pontuacaoAluno;
	private boolean equacaoResolvida;
	
	private static String separadorLVL1="&";
	private static String separadorLVL2="|";
	
	public EquacoesAluno(String equacao, List<String> passos,
			int pontuacaoTotal, int pontuacaoAluno, boolean equacaoResolvida) {
		super();
		this.equacao = equacao;
		this.passos = passos;
		this.pontuacaoTotal = pontuacaoTotal;
		this.pontuacaoAluno = pontuacaoAluno;
		this.equacaoResolvida = equacaoResolvida;
	}
	
	public EquacoesAluno(String equacao, int pontosTotal) {
		super();
		this.equacao = equacao;
		this.passos = new ArrayList<String>();
		this.pontuacaoTotal = pontosTotal;
		this.pontuacaoAluno = 0;
		this.equacaoResolvida = false;
	}

	public String getEquacao() {
		return equacao;
	}

	public void setEquacao(String equacao) {
		this.equacao = equacao;
	}

	public List<String> getPassos() {
		return passos;
	}

	public void setPassos(List<String> passos) {
		this.passos = passos;
	}

	public int getPontuacaoTotal() {
		return pontuacaoTotal;
	}

	public void setPontuacaoTotal(int pontuacaoTotal) {
		this.pontuacaoTotal = pontuacaoTotal;
	}

	public int getPontuacaoAluno() {
		return pontuacaoAluno;
	}

	public void setPontuacaoAluno(int pontuacaoAluno) {
		this.pontuacaoAluno = pontuacaoAluno;
	}

	public boolean isEquacaoResolvida() {
		return equacaoResolvida;
	}

	public void setEquacaoResolvida(boolean equacaoResolvida) {
		this.equacaoResolvida = equacaoResolvida;
	}
	
	public String toString(){
		String msg="";
		msg=equacao+separadorLVL2+pontuacaoTotal+separadorLVL2+pontuacaoAluno+separadorLVL2+equacaoResolvida;
		for (String passo:passos){
			msg+=separadorLVL1+passo;
		}
		return msg;
	}
	
}
