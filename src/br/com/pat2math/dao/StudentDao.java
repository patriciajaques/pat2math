package br.com.pat2math.dao;

import javax.persistence.NoResultException;
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
//	public Student[] withIdInterval(Long firstID, Long lastID) {
//		
//		String jpql = "from Student s left join fetch " +
//				"s.knowledges where s.id = :id";
//		try {
//			return (Student[]) em.createQuery(jpql)
//				.setParameter("id", id).getResultList();
//		} catch(NoResultException nre) {
//			return null;
//		}
//	
//	}

}