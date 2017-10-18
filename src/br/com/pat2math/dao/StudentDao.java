package br.com.pat2math.dao;

import java.util.List;

import javax.persistence.NoResultException;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import br.com.pat2math.repository.AllStudents;
import br.com.pat2math.studentModel.Student;

@Repository
public class StudentDao extends GenericDao<Student> implements AllStudents {
	
	@Override
	public Student withEmail(String email) {
		
		String jpql = "from Student s left join fetch " +
				"s.knowledges where s.email = :email";
		try {
			return (Student) em.createQuery(jpql)
				.setParameter("email", email)
				.getSingleResult();
		} catch(NoResultException nre) {
			return null;
		}
	
	}
	
	
//	@Override
//	public Student[] getUsers() {
		
//		String jpql = "from Student s left join fetch " +
//				"s.knowledges";
//		try {
//			return (Student[]) em.createQuery(jpql)
//				.setParameter().getResultList();
//		} catch(NoResultException nre) {
//			return null;
//		}
//	
//	}

}