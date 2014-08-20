package br.com.pat2math.dao;

import java.util.List;

import javax.persistence.NoResultException;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import br.com.pat2math.repository.GroupRepository;
import br.com.pat2math.studentModel.Group;
import br.com.pat2math.studentModel.Teacher;

@Repository
public class GroupDao extends GenericDao<Group> implements GroupRepository {
	
	@Override
	public Group getWithStudents(Long idStudent) {
		String jpql = "select g from Group g left join fetch g.students " +
						"where g.id = :id";
		
		Query q = em.createQuery(jpql);
		q.setParameter("id", idStudent);
		Group group;
		try {
			group = (Group) q.getSingleResult();
		} catch(NoResultException nre) {
			return null;
		}
		return group;
	}
	
	@Override
	public List<Group> withTeacher(Teacher teacher) {
		String jpql = "select g from Group g where " +
					"g.teacher.id = :idTeacher";
		return em.createQuery(jpql, Group.class)
				.setParameter("idTeacher", teacher.getId())
				.getResultList();
	}
	
}