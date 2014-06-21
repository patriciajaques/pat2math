package pat2math.help.database;

public class CreateDatabase {

	/*private EntityManagerFactory factory;
	private EntityManager em;
	
	
	public CreateDatabase(String databaseName){
		factory =Persistence.createEntityManagerFactory(databaseName);
		em = factory.createEntityManager();
	}
	
	public void create(){
		Aluno a =new Aluno("teste","t1e2s3t4e","teste","teste");
		
		PopularAjudas aj=new PopularAjudas();
		em.getTransaction().begin();
		em.persist(a);
		em.getTransaction().commit();
		aj.popular(em);
		System.out.println("Concluido!!!");
	}
	
	@SuppressWarnings("unchecked")
	public void destroy(){
		Query q= em.createQuery("select a from Aluno a");
		List<Aluno> al=q.getResultList();
		for (Aluno a:al){
			List<AjudasAluno> aa=a.getAjuda();
			List<Conhecimento>cc=a.getConhecimento();
			List<Acoes> acac=a.getAcoes();
			em.getTransaction().begin();
			while (!aa.isEmpty()) {
				em.remove(aa.remove(0));			
			}
			while (!cc.isEmpty()){
				em.remove(cc.remove(0));
			}
			while(!acac.isEmpty()){
				em.remove(acac.remove(0));
			}
			em.flush();
			em.remove(a);
			em.getTransaction().commit();
		}
		q=em.createQuery("select a from Ajuda a");
		List<Ajuda> h = q.getResultList();
		em.getTransaction().begin();
		while (!h.isEmpty()) {
			em.remove(h.remove(0));			
		}
		q=em.createQuery("select m from Mensagem m");
		List<Mensagem> msg=q.getResultList();
		while (!msg.isEmpty()) {
			em.remove(msg.remove(0));			
		}
		em.flush();
		em.getTransaction().commit();
		System.out.println("Concluido!!!");
	}
	
	public static void main(String[] args) {
		if (args.length<=0)System.out.println("Parametros: -c criar banco de dados -d destruir banco de dados");
		else {
			CreateDatabase cdb=new CreateDatabase("help");
			if (args[0].equals("-c"))cdb.create();
			else if (args[0].equals("-d"))cdb.destroy();
			else System.out.println("Parametros: -c criar banco de dados -d destruir banco de dados");
		}
		
	}*/
}
