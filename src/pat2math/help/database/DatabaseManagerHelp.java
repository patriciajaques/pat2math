package pat2math.help.database;

/**
 * Classe de controle das Ajudas cadastradas no Banco de dados
 * @author Henrique M. Seffrin
 *
 */

public class DatabaseManagerHelp {

	
	/*public DatabaseManagerHelp(String databaseName) {
		//super(databaseName);
	}

	*//**
	 * Remove o objeto especificado pelo id "id"
	 * @param id o id, chave primaria, do objeto a ser removido do banco de dados
	 * @return <code>true</code> se a transacao ocorreu e <code>false</code> 
	 * caso contrario
	 *//*
	public boolean delete (int id){
		//em = factory.createEntityManager();
		Ajuda e = em.find(Ajuda.class, id);
		//em.close();
		return delete(e);
	}
	
	*//**
	 * Realiza uma busca no banco de dados pela chave priméria do objeto.
	 * @param id o id do obejto inserido
	 * @return o objeto relacionado ao id especifico
	 *//*
	public Ajuda find (int id){
		//em = factory.createEntityManager();
		
		Ajuda a=em.find(Ajuda.class, id);
		
		//em.close();
		return a;
	}
	

	*//**
	 * Faz uma busca, no banco de dados, por objetos com um nivel e tipo especificos
	 * @param tipo o tipo, operacao, ao qual esta ajuda esta relacionada
	 * @param lvl o nivel da dica
	 * @return uma {@link List} contendo os objetos encontrados na busca
	 *//*
	public List<?> find (String tipo, int lvl){
		//em = factory.createEntityManager();
		
		if (!tipo.isEmpty()){
			Query busca = em.createQuery("select a from Ajuda a where a.tipo = :tipo and a.nivel=:nivel");
			busca.setParameter("nivel", lvl);
			busca.setParameter("tipo", tipo);
			return busca.getResultList();
		}
		
		//em.close();
		return new ArrayList<Object>();
	}
	
	*//**
	 * Obtem uma {@link Hashtable} contendo os niveis máximos
	 * de cada tipo de ajuda.
	 * @return Uma {@link Hashtable} onde a chave é a operação e o valor é 
	 * o teto da metade do nível máxi de cada tipo de ajuda.
	 *//*
	public Hashtable<String,Integer> getMaxLvlOfHints(){
		//em = factory.createEntityManager();
		
		Query busca = em.createQuery("select a from Ajuda a order by a.nivel desc");
		List <?> result=busca.getResultList();
		Hashtable<String, Integer> h=new Hashtable<String, Integer>();
		for (Object item:result){
			Ajuda it=(Ajuda)item;
			if (!h.containsKey(it.getTipo())){
				h.put(it.getTipo(), it.getNivel());
				//System.out.println(it.getTipo()+"="+it.getNivel());
			}
		}
		
		//em.close();
		return h;
	}
	
	public String getContentRelatedToHint(String tipo){
		//em = factory.createEntityManager();
		
		Query busca = em.createQuery("select a.conteudo from Ajuda a where a.tipo = :tipo");
		busca.setParameter("tipo", tipo);
		List <?> result=busca.getResultList();
		
		//em.close();
		
		if (result.isEmpty()) return "";
	
		else{
			String h = (String)result.get(0);
			return h;
		}
	}
	
	*//**
	 * Carrega do banco de dados as mensagens de erro, apresentadas quando uma operação está
	 * travada
	 * @return uma {@link List} de {@link String} contendo as mensagens.
	 *//*
	public List<Mensagem> getMessageErrors(){
		//em = factory.createEntityManager();
		
		Query busca = em.createQuery("select me from Mensagem me");
		List<?> result = busca.getResultList();
		List<Mensagem> s=new ArrayList<Mensagem>();
		
		
		//em.close();
		
		if (result.isEmpty()) return s;
		else for (Object obj:result){
			if (obj instanceof Mensagem){
				s.add((Mensagem)obj);
			}
		}
		return s;
	}
	
	*//**
	 * Atualiza o nivel da ajuda relacionado ao id "id"
	 * @param id o id da ajuda a ser atualizada
	 * @param newLVL o novo nivel da ajuda
	 * @return<code>true</code> se a transacao ocorreu e <code>false</code> 
	 * caso contrario
	 *//*
	public boolean updateLVL (int id, int newLVL){
		Ajuda a= find(id);
		a.setNivel(newLVL);
		return update();
	}
	
	*//**
	 * Atualiza o tipo da ajuda relacionado ao id "id"
	 * @param id o id da ajuda a ser atualizada
	 * @param newTIPO o novo nivel da ajuda
	 * @return<code>true</code> se a transacao ocorreu e <code>false</code> 
	 * caso contrario
	 *//*
	public boolean updateTIPO (int id, String newTIPO){
		Ajuda a = find (id);
		a.setTipo(newTIPO);
		return update();
	}
	
	*//**
	 * Atualiza o texto da ajuda relacionado ao id "id"
	 * @param id o id da ajuda a ser atualizada
	 * @param newTEXTO o novo nivel da ajuda
	 * @return<code>true</code> se a transacao ocorreu e <code>false</code> 
	 * caso contrario
	 *//*
	public boolean updateTEXTO (int id, String newTEXTO){
		Ajuda a = find(id);
		a.setTexto(newTEXTO);
		return update();
	}
	
//	public static void main(String[] args) {
//		DatabaseManager dt= new DatabaseManager("help");
//		Ajuda a= new Ajuda("AD","Some <eq1 a1> com <eq1 a2>.", 5);
//		dt.insert(a);
//		
//	}
*///}
}