package br.com.pat2math.dao;

import javax.persistence.NoResultException;

import org.springframework.stereotype.Repository;
import br.com.pat2math.repository.AllUsers;
import br.com.pat2math.studentModel.User;

@Repository
public class UserDao extends GenericDao<User> implements AllUsers {
	
	@Override
	public User withEmail(String email) {
		String jpql = "from User u where u.email=" +
					":email";
		
		try {
			return em.createQuery(jpql, User.class)
					.setParameter("email", email)
					.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

}