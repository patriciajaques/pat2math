package pat2math.help;

import pat2math.help.data.Content;


public class MiscHelp implements Content{

	private String template;
	private String operacao;
	private String conteudo;
	private int nivel;
	private Long idHelp;
	private String animationCode;
	

	public MiscHelp() {
		idHelp=1L;
	}
	
	public MiscHelp(String template, String operacao, String conteudo, Integer nivel, Long idHelp, String animationCode) {
		super();
		this.template = template;
		this.operacao = operacao;
		this.conteudo = conteudo;
		this.nivel = nivel;
		this.idHelp = idHelp;
		this.animationCode = animationCode;
	}
	public String getTemplate() {
		return template;
	}
	public String getOperacao() {
		return operacao;
	}

	@Override
	public String getContent() {
		return conteudo;
	}

	@Override
	public Integer getNivel() {
		return nivel;
	}

	@Override
	public String getTipo() {
		return operacao;
	}
	public Long getIdHelp() {
		return idHelp;
	}
	@Override
	public Long getID() {
		return null;
	}

	public String getAnimationCode() {
		return animationCode;
	}
}
