package pat2math.help;


import java.util.List;

import pat2math.expressao.Expression;
import pat2math.expressao.arvore.BTNode;
import pat2math.regras.Operacao;

public class OperacaoHint extends Operacao{

	private List<BTNode> expDica;
	private List<BTNode> expOI;
	// uso exclusivo de +,-,*,^ e R
	private List<BTNode> expOriginal;
	private Expression PP;
	
	private boolean usedFirstRules;
	
	
	public OperacaoHint(String operacao) {
		super(operacao);
		this.usedFirstRules=false;
	}

	public OperacaoHint(String operacao, List<BTNode> dica) {
		super(operacao);
		this.expDica=dica;
		this.usedFirstRules=false;
	}
	
	public OperacaoHint(String operacao, List<BTNode> dica, List<BTNode> nodOriginal) {
		super(operacao);
		this.expDica=dica;
		this.expOriginal= nodOriginal;
		this.usedFirstRules=false;
	}

	public List<BTNode> getExpDica() {
		return expDica;
	}

	public void setExpDica(List<BTNode> expDica) {
		this.expDica = expDica;
	}
	
	
	
	public Expression getPP() {
		return PP;
	}

	public void setPP(Expression pp) {
		PP = pp;
	}

	public List<BTNode> getExpOriginal() {
		return expOriginal;
	}

	public void setExpOriginal(List<BTNode> expOriginal) {
		this.expOriginal = expOriginal;
	}

	@Override
	public boolean equals(Object o) {
		return super.equals(o);
	}

	public List<BTNode> getExpOI() {
		return expOI;
	}

	public void setExpOI(List<BTNode> expOI) {
		this.expOI = expOI;
	}

	public boolean isUsedFirstRules() {
		return usedFirstRules;
	}

	public void setUsedFirstRules(boolean usedFirstRules) {
		this.usedFirstRules = usedFirstRules;
	}
	
	
}
