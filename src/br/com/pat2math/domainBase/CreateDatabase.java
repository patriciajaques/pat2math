package br.com.pat2math.domainBase;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class CreateDatabase {
	public static void main(String[] args) {
		
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("feeper");
		EntityManager em = emf.createEntityManager();
		em.close();
		
	}
}
