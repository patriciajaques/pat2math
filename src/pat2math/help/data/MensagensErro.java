package pat2math.help.data;

import java.util.ArrayList;
import java.util.List;

import br.com.pat2math.studentModel.AgentSpeeches;

public class MensagensErro {
	private List<AgentSpeeches> msgs;
	// private Random random;
	
	public MensagensErro(){
		this.msgs=new ArrayList<AgentSpeeches>();
	}

	public void setMensagem(AgentSpeeches mensagem){
		this.msgs.add(mensagem);
	}
	
	public String getMensagem() {
		/*Session session = (Session) ActionContext.getContext().getSession().get("session2");
		if(session == null) {
			session = HibernateUtilMA.getSessionFactory().openSession();
		}
		modeloAluno.DAO.MensagemDAO	dao = new modeloAluno.DAO.MensagemDAO(session);
		
		msgs = dao.listAll();
		if (msgs.size()>1){
			int r=random.nextInt(msgs.size());
			return msgs.get(r).getName();
		}else return msgs.get(0).getName();*/
		
		return "Infelizmente não há mais dicas disponíveis!";
	}
}
