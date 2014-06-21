package pat2math.modeloAluno;

import br.com.pat2math.studentModel.Animation;
import br.com.pat2math.studentModel.Tip;



/**
 * Classe responsável pelos objetos que conterão a mensagm a ser retornada ao Tutor,
 * em forma de String 
 * @author Henrique M. Seffrin
 * @version 1.0
 * @since 30/06/2010
 *
 */
public class Mensagem {

	private String idAluno;
	private boolean respostaCerta;
	private boolean operacaoCerta;
	// inform se é o ultimo passo de resolção
	private boolean ultimoPasso;
	//se a resposta é certa e foi devido a uma dica
	private boolean usedHints;
	// a proxima operação DEVE conter a operação utilizada, operação genérica não será aceita.
	private boolean requestOperation;
	//private List<Misconseption> idMisconseption;
	private Tip feedback;
	private String operacao;
	private String respostaAluno;
	private boolean segGrau;
	
	/**
	 * Uma mensagem a ser exibida ao aluno
	 */
	private String mensagem;
	
	/**
	 * define o caracter separador para as mensagens o default é ";"
	 */
	private static String separador;
	
	/**
	 * Define o separador secundario para as mensagensm, o default é "$"
	 */
	private static String segSeparador; 
	
	public Mensagem(String idAluno, boolean respostaCerta,
			boolean operacaoCerta,boolean ultimoPasso,boolean requestOperation, boolean usedHints,
			String mensagem,Tip feedback) {
		this.idAluno = idAluno;
		this.respostaCerta = respostaCerta;
		this.operacaoCerta = operacaoCerta;
		this.ultimoPasso=ultimoPasso;
		this.requestOperation=requestOperation;
		this.usedHints=usedHints;
		this.mensagem=mensagem;
		//this.idMisconseption = idMisconseption;
		this.feedback=feedback;
		if (separador==null)separador=";";
		if (segSeparador==null)segSeparador="$";
		if(feedback.getAnimation()==null)feedback.setAnimation(new Animation());
	}
	
	public Mensagem (String idAluno, boolean respostaCerta, boolean operacaoCerta,
			boolean ultimoPasso,boolean requestOperation,boolean usedHints, String mensagem){
		this(idAluno, respostaCerta, operacaoCerta, ultimoPasso,requestOperation,usedHints,mensagem,new Tip());
	}
	
	
	public Mensagem(String idAluno, boolean respostaCerta,
			boolean operacaoCerta, boolean requestOperation,boolean usedHints,String mensagem,Tip feedback) {
		this(idAluno,respostaCerta,operacaoCerta,false,requestOperation,usedHints,mensagem,feedback);
	}
	
	public Mensagem(String idAluno, boolean respostaCerta,
			boolean operacaoCerta,boolean requestOperation,boolean usedHints, String mensagem) {
		this(idAluno,respostaCerta,operacaoCerta,false,requestOperation,usedHints,mensagem,new Tip());
	}
	
	

	public boolean isRespostaCerta() {
		return respostaCerta;
	}

	public void setRespostaCerta(boolean respostaCerta) {
		this.respostaCerta = respostaCerta;
	}

	public boolean isOperacaoCerta() {
		return operacaoCerta;
	}

	public void setOperacaoCerta(boolean operacaoCerta) {
		this.operacaoCerta = operacaoCerta;
	}

	public boolean isUltimoPasso() {
		return ultimoPasso;
	}

	public void setUltimoPasso(boolean ultimoPasso) {
		this.ultimoPasso = ultimoPasso;
	}

	public String getFeedback() {
		return feedback.getDescription();
	}
	
	public Tip getFeedbackOBJ(){
		return feedback;
	}

	public void setFeedback(Tip feedback) {
		this.feedback = feedback;
	}

	public void setMensagem(String mensagem) {
		this.mensagem = mensagem;
	}
	
	public String getMSG(){
		return mensagem;
	}
	
	

	public String getOperacao() {
		return operacao;
	}

	public void setOperacao(String operacao) {
		this.operacao = operacao;
	}

	public String getRespostaAluno() {
		return respostaAluno;
	}

	public void setRespostaAluno(String respostaAluno) {
		this.respostaAluno = respostaAluno;
	}
	
	public void setSegGrau(boolean segGrau){
		this.segGrau=segGrau;
	}
	
	public boolean isSegGrau(){
		return segGrau;
	}

	/**
	 * Gera uma String contendo os atributos da mensagem,
	 *  cada um separado por {@link #separador}
	 * @return um String contendo a mensagem a ser enviada
	 */
	public String getMensagem(){
		return idAluno+separador+respostaCerta+separador+operacaoCerta+separador+ultimoPasso+
		separador+mensagem+separador+feedback.getDescription()+separador+requestOperation+separador+usedHints+separador+feedback.getAnimation().getCode()+separador+segGrau;
	}
	
//	public String listTOString(){
//		String str="";
//		for (Iterator<Misconseption> iterator = feedback.iterator(); iterator.hasNext();) {
//			Misconseption misc=iterator.next();
//			str+=misc.toString()+segSeparador;
//		}
//		if (str.endsWith(segSeparador))str=str.substring(0, str.length()-1);
//		return str;
//	}
	
	/**
	 * Altera o separador das mensagens para <code>novoSeparador</code>
	 * @param novoSeparador o novo caractere que irá separar os atributos das
	 * mensagens
	 */
	public static void setSeparador(String novoSeparador){
		separador=novoSeparador;
	}
	
	
	
	@Override
	public String toString() {
		return getMensagem();
	}
}
