package pat2math.help.database;


public class DatabaseManagerStudent {
	/*
	public DatabaseManagerStudent(String databaseName) {
		super();
	}
	*//**
	 * Remove o objeto especificado pelo id "id"
	 * @param id o id, chave primaria, do objeto a ser removido do banco de dados
	 * @return <code>true</code> se a transacao ocorreu e <code>false</code> 
	 * caso contrario
	 *//*
	public boolean delete (int id){
		//em = factory.createEntityManager();
		
		Aluno e = em.find(Aluno.class, id);
		
		//em.close();
		return delete(e);
	}
	
	*//**
	 * Realiza uma busca no banco de dados pela chave priméria do objeto.
	 * @param id o id do obejto inserido
	 * @return o objeto relacionado ao id especifico
	 *//*
	public Aluno find (int id){
		//em = factory.createEntityManager();
		
		Aluno a=em.find(Aluno.class, id);
		
		//em.close();
		return a;
	}
	
	@SuppressWarnings("unchecked")
	public List<Aluno> findAll(){
		//em = factory.createEntityManager();
		List<Aluno> alunos = (List<Aluno>) em.createQuery("select al from Aluno al").getResultList();
		//em.close();
		return alunos;
	}
	public List<Aluno> findAll(String turma){
		List<Aluno> alunos = (List<Aluno>) em.createQuery("select al from Aluno al where al.turma="+turma).getResultList();
		return alunos;
	}
	
	
	
	
	*//**
	 * Faz uma busca, no banco de dados, por objetos com um nivel e tipo especificos
	 * @param tipo o tipo, operacao, ao qual esta ajuda esta relacionada
	 * @return uma {@link List} contendo os objetos encontrados na busca
	 *//*
	public List<?> find (String login){
		//em = factory.createEntityManager();
		
		if (!login.isEmpty()){
			//Query busca = em.createQuery("select a, c , aj from Aluno a, Conhecimento c, AjudasAluno aj where a.nome = :nome");
			Query busca = em.createQuery("select a from Aluno a where a.login = :login");
			busca.setParameter("login", login);
			return busca.getResultList();
		}
		
		//em.close();
		return new ArrayList<Object>();
	}
	
	public Aluno findLogin (String login){
		//em = factory.createEntityManager();
		if (!login.isEmpty()){
			Query busca = em.createQuery("select a from Aluno a where a.login = :login");
			
			
			busca.setParameter("login", login);
			
			List<?> log=busca.getResultList();
			
			//em.close();
			if (log!=null && !log.isEmpty() && log.get(0) instanceof Aluno)return (Aluno)log.get(0);
		}
		
		return null;
	}
	
	public Travas findTrava(String aluno, String operacao){
		//em = factory.createEntityManager();
		
		
		if (!operacao.isEmpty()){
			Query busca = em.createQuery("select tr from Travas tr, Aluno a where a.login= :aluno and tr.operacao=:op");
			busca.setParameter("login", aluno);
			busca.setParameter("op", operacao);
			List<?> travas=busca.getResultList();
			
			//em.close();
			if (travas!=null && !travas.isEmpty() && travas.get(0) instanceof Travas)return (Travas)travas.get(0);
		}
		return null;
	}
	
	public AjudasAluno getAjudaRequisitada(int idAjudaRequisitada, String login) {
		//em = factory.createEntityManager();
		if (idAjudaRequisitada>0){
			Query busca = em.createQuery("select aa from AjudasAluno aa, Aluno a where" +
					" a.login=:login and aa.idAjuda= :idA");
			busca.setParameter("login", login);
			busca.setParameter("idA", idAjudaRequisitada);
			List<?> ajuda=busca.getResultList();
			
			//em.close();
			if (ajuda!=null && !ajuda.isEmpty() && ajuda.get(0) instanceof AjudasAluno)
				return (AjudasAluno)ajuda.get(0);
		}
		return null;
	}
	
	public boolean update(Aluno al) {
		//em=factory.createEntityManager();
		Aluno db=em.find(Aluno.class, al.getId());
		//Aluno db=find(al.getId());
		if (db==al){
			em.getTransaction().begin();
			em.flush();
			em.getTransaction().commit();
			return true;
		}
		else{
			db.setAjuda(al.getAjuda());
			db.setConhece(al.getConhecimento());
			db.setNome(al.getNome());
			db.setAcoes(al.getAcoes());
			em.getTransaction().begin();
			em.flush();
			em.getTransaction().commit();
			return true;
		}
	}
	
//	/**
//	 * Atualiza o nivel da ajuda relacionado ao id "id"
//	 * @param id o id da ajuda a ser atualizada
//	 * @param newLVL o novo nivel da ajuda
//	 * @return<code>true</code> se a transacao ocorreu e <code>false</code> 
//	 * caso contrario
//	 */
//	public boolean updateLVL (String nomeAluno,String operacao, int newLVL, int oldLVL){
//		Aluno a= (Aluno)find(nomeAluno).get(0);
//		Query q= em.createQuery("select aj from AjudasAluno aj, Aluno a  where a.nome= :nome " +
//				"and aj.tipo=:operacao and aj.nivel=:olvl");
//		q.setParameter("nome", nomeAluno);
//		q.setParameter("operacao", operacao);
//		q.setParameter("olvl", oldLVL);
//		List<?> result= q.getResultList();
//		System.out.println(result);
//		return update();
//	}
	
//	public static void main(String[] args) {
//		DatabaseManagerStudent ds=new DatabaseManagerStudent("help");
//		ds.updateLVL("Eu", "AD", 5,4);
//	}
//}
}