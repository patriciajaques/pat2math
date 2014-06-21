package br.com.pat2math.dao;

import java.io.Serializable;

import javax.persistence.NoResultException;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import br.com.pat2math.repository.TeacherRepository;
import br.com.pat2math.studentModel.Teacher;

@Repository
public class TeacherDao extends GenericDao<Teacher> implements TeacherRepository, Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1442216553776193948L;

	public Teacher getByEmail(String email) {
		String jpql = "select t from Teacher t " +
				"where t.email = :email";
		
		Query q = em.createQuery(jpql);
		q.setParameter("email", email);
		Teacher teacher;
		try {
			teacher = (Teacher) q.getSingleResult();
		} catch(NoResultException nre) {
			return null;
		}
		return teacher;
	}
	
}