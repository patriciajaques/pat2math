package pat2math.help;

import pat2math.help.data.Content;

/**
 * Armazena os termos que sao aplicaveis a uma operacao e a dica assciada a ela. <br>
 * Exemplo:<br>
 * 2x^2+3x+4x^2=0<br>
 * Hint h = new Hint(new OperacaoHint({2x^2,4x^2},AD),"Some <a> com <b> ")<br>
 * @author Henrique M. Seffrin
 *
 */
public class Hint implements Content{
	
	private Long ID;
	private OperacaoHint operacao;
	private String template;
	private Integer nivel;
	private Long idHelp;
	private String conteudo;
	private String animationCode;
	
	public Hint(){
		idHelp=1L;
	}
	public Hint(Long id,OperacaoHint operacao, String template, Integer nivel,Long idHelp,
			String conteudo, String animationCode) {
		super();
		this.ID=id;
		this.operacao = operacao;
		this.template = template;
		this.nivel = nivel;
		this.idHelp=idHelp;
		this.conteudo = conteudo;
		this.animationCode = animationCode;
	}

	public Long getID() {
		return ID;
	}

	public OperacaoHint getOperacao() {
		return operacao;
	}

	public void setOperacao(OperacaoHint operacao) {
		this.operacao = operacao;
	}

	public String getTemplate() {
		return template;
	}

	public void setTemplate(String template) {
		this.template = template;
	}
	
	@Override
	public String toString() {
		return operacao.getOperacao();
	}
	
	public Integer getNivel(){
		return nivel;
	}
	
	public String getContent(){
		return conteudo;
	}
	
	public String getTipo(){
		return operacao.getOperacao();
	}

	public String getAnimationCode() {
		return animationCode;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((operacao == null) ? 0 : operacao.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		final Hint other = (Hint) obj;
		if (operacao == null) {
			if (other.operacao != null)
				return false;
		} else if (!operacao.equals(other.operacao))
			return false;
		return true;
	}

	public Long getIdHelp() {
		return idHelp;
	}
	
	
	
}
