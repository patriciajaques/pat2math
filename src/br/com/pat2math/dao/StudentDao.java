package br.com.pat2math.dao;

import java.util.List;
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
	
	@SuppressWarnings("unchecked")
	public List<Student> obterRanking(){		
		String jpql = "from Student where totalScore is not null and isUserTest = 0 order by totalScore desc";
		try {
			return (List<Student>) em.createQuery(jpql)
				.getResultList();
		} catch(NoResultException nre) {
			return null;
		}
	}
	
	public Student obterTurma(long id){		
		String jpql = "from Student where id = :id";
		try {
			return (Student) em.createQuery(jpql)
					.setParameter("id", id)
					.getSingleResult();
		} catch(NoResultException nre) {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<Student> obterRankingTurma(int turma){
		String jpql = "from Student where totalScore is not null and turma = :turma order by totalScore desc";
		try {
			return (List<Student>) em.createQuery(jpql)
				.setParameter("turma", turma)
				.getResultList();
		} catch(NoResultException nre) {
			return null;
		}
	}
	
}