package pat2math.modeloAluno;

import br.com.pat2math.studentModel.ResolutionStep;


/**
 * Classe responsaval pelo Log das ações do aluno.
 * @author Henrique M. Seffrin
 *
 */
public class AlunoMonitor {
	
	private boolean log(String tipo, String equacao,String respostaAluno,String operacao,String mensagem, boolean certa,boolean operacaoCerta,boolean fimResolucao){
		ResolutionStep a=new ResolutionStep();
			/*a.setType(tipo);
			a.setOperation(operacao);
			a.setMessage(mensagem);
			a.setIsCorrect(certa);
			a.setEquation(equacao);
			a.setStudentAnswer(respostaAluno);
			a.setIsOpeartionRight(operacaoCerta);
			a.setIsEndResolution(fimResolucao);*/
			
			//ContentPresented content = (ContentPresented) ActionContext.getContext().getSession().get("equation");
			
			//if(content != null) {
				//a.setResolution(content.getResolution());
				
				//Session session = (Session) ActionContext.getContext().getSession().get("session2");
				//new PassoResolucaoDAO(session).save(a);
				
	    		//AjudaDAO dao = new AjudaDAO(session);
	    		//PassoResolucaoDAO dao2 = new PassoResolucaoDAO(session);
	    		
	    		//ResolutionStep step = dao2.load(a.getId());
	    		
	            // List<Help> helps = (List<Help>) ActionContext.getContext().getSession().get("helps");
	            
	            //for(Help help : helps) {
	            //	step.getHelps().add(help);
	            //}
	    		
	            //dao2.save(step);
	            
	            // conector.putInSession("helps",new ArrayList<Help>());
	            
	            // ActionContext.getContext().getSession().put("helps", new ArrayList<Help>());
			//}
			return true;
			
	}
	
	public boolean logEquacao(String equacao,String respostaAluno, String operacao, String mensagem , boolean certa, boolean operacaoCerta,boolean fimResolucao){
		return log("equacao", equacao, respostaAluno, operacao, mensagem , certa, operacaoCerta, fimResolucao);
	}
	
	/*public boolean logAjuda(Long idAjuda){
		List<Help> helps = (List<Help>) ActionContext.getContext().getSession().get("helps");
		
		AjudaDAO dao = new AjudaDAO(session);
		Help help = dao.load(idAjuda);
			
		if(helps == null) {
			helps = new ArrayList<Help>();
		}
		helps.add(help);
		ActionContext.getContext().getSession().put("helps", helps);
		
		return true;
	}*/
	
	public boolean logCorrecao(String equacao,String respostaAluno,String operacao, String mensagem, boolean certa, boolean operacaoCerta, boolean fimResolucao ){
		return log("equacao", equacao, respostaAluno, operacao, mensagem, certa, operacaoCerta, fimResolucao);
	}
}
