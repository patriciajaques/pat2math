package br.com.pat2math.dao;

import java.util.List;
import org.springframework.stereotype.Repository;
import br.com.pat2math.repository.GroupRepository;
import br.com.pat2math.studentModel.Group;
import br.com.pat2math.studentModel.Teacher;

@Repository
public class GroupDao extends GenericDao<Group> implements GroupRepository {
	
	@Override
	public List<Group> withTeacher(Teacher teacher) {
		String jpql = "select g from Group g where " +
					"g.teacher.id = :idTeacher";
		return em.createQuery(jpql, Group.class)
				.setParameter("idTeacher", teacher.getId())
				.getResultList();
	}
	
}