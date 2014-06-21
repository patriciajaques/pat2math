package pat2math.help.database;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;


public class Database<E> {
	protected EntityManager em;
	//protected static EntityManagerFactory factory = Persistence.createEntityManagerFactory("help");
	
	public Database(){
		EntityManagerFactory factory = Persistence.createEntityManagerFactory("help");
		em = factory.createEntityManager();
	}
	
	/**
	 * Realiza a operacao de INSERT no banco de dados 
	 * @param item um objeto do tipo E que será inserido na tabela
	 * do banco de dados
	 * @return <code>true</code> se o transacao ocorrer e <code>false</code> caso contrario
	 */
	public boolean insert (E item){
		try{
			//em = factory.createEntityManager();
			em.getTransaction().begin();
			em.persist(item);
			em.getTransaction().commit();
			return true;
		} catch (Exception e) {
			em.getTransaction().rollback();
			return false;
		} finally {
			//em.close();
		}
	}
	
	/**
	 * Remove o registro referente ao objeto "item" da tabela.
	 * @param item o objeto a ser removido do banco de dados, 
	 * este deve ser o mesmo objeto inserido, ou seja, use 
	 * o método <code>find</code> pra encontralo
	 * @return <code>true</code> se a transacao ocorreu e <code>false</code> 
	 * caso contrario
	 */
	public boolean delete (E item){
		try{
			//em = factory.createEntityManager();
			em.getTransaction().begin();
			em.remove(item);
			em.getTransaction().commit();
			return true;
		} catch (Exception e) {
			em.getTransaction().rollback();
			return false;
		} finally {
			//em.close();
		}
	}
	
	/**
	 * Atualiza os objeto alterados em memoria
	 * @return <code>true</code> se a transacao ocorreu e <code>false</code> 
	 * caso contrario
	 */
	public boolean update (){
		try{
			//em = factory.createEntityManager();
			em.getTransaction().begin();
			em.flush();
			em.getTransaction().commit();
			return true;
		} catch(Exception e){
			em.getTransaction().rollback();
			return false;
		} finally {
			//em.close();
		}
		
	}
}
