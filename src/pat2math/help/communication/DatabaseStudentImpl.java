package pat2math.help.communication;

public class DatabaseStudentImpl {//implements CommunicationMA {
	//private Session session;
	
	/*public List<Help> getAjudaRequisitada(String login) {
		session = (Session) ActionContext.getContext().getSession().get("session2");
		
		//session = (Session) connector.getSession("session2");
		// if(session == null) session = SessionUtil.getSession();
		
		AlunoDAO dao = new AlunoDAO(session);
		
		//Transaction tx = session.beginTransaction();
		//dao.findByUser(new Student().se);
		
		ContentPresented content = (ContentPresented) ActionContext.getContext().getSession().get("equation");
		//ContentPresented content = (ContentPresented) connector.getSession("equation");
		
		
		Query busca = session.createQuery("select rs from ResolutionStep rs where " + "rs.resolution.id = :resolution");
		if(content != null) {
			busca.setParameter("resolution", content.getResolution().getId());
			List<?> ajuda=busca.list();
			if (ajuda!=null && !ajuda.isEmpty() && ajuda.get(0) instanceof Help) return (List<Help>) ajuda;
		}
		if((List<Help>) ActionContext.getContext().getSession().get("helps") == null) {
			return new ArrayList<Help>();
		}
		return (List<Help>) ActionContext.getContext().getSession().get("helps");
		//return new ArrayList<Help>();
	}*/

	/*@Override
	public Travas getTrava(String aluno, String operacao) {
		session = (Session) ActionContext.getContext().getSession().get("session2");
		//session = (Session) connector.getSession("session2");
		
		if (!operacao.isEmpty()){
			Query busca = session.createQuery("select tr from Travas tr, Student a where a.user= :aluno and tr.operacao=:op");
			busca.setParameter("login", aluno);
			busca.setParameter("op", operacao);
			
			List<?> travas=busca.list();
			
			//em.close();
			if (travas!=null && !travas.isEmpty() && travas.get(0) instanceof Travas)return (Travas)travas.get(0);
		}
		return null;
	}
	@Override
	public boolean update(Student al) {
		session = (Session) ActionContext.getContext().getSession().get("session2");
		//session = (Session) connector.getSession("session2");
		AlunoDAO dao = new AlunoDAO(session);
		
		Student db = dao.load(al.getId());
		session.getTransaction().begin();
		session.flush();
		session.getTransaction().commit();
		return true;
	}*/

	/*@Override
	public boolean update() {
		
		return false;
	}*/
}