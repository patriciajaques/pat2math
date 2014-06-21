package br.com.pat2math.dao;

import java.util.List;
import javax.persistence.Query;
import org.springframework.stereotype.Repository;
import br.com.pat2math.domainBase.Content;
import br.com.pat2math.repository.TaskPerformedRepository;
import br.com.pat2math.studentModel.Student;
import br.com.pat2math.studentModel.TaskPerformed;

@Repository
public class TaskPerformedDao extends GenericDao<TaskPerformed> implements TaskPerformedRepository {
	
	@SuppressWarnings("unchecked")
	public TaskPerformed get(Content content, Student student) {
		Query query = em.createQuery("select tp from TaskPerformed tp " +
				"where tp.content.id=:idContent and tp.student.id=:idStudent");
		query.setParameter("idContent", content.getId());
		query.setParameter("idStudent", student.getId());
		List<TaskPerformed> tp = null;
		tp = (List<TaskPerformed>) query.getResultList();
		if(tp.isEmpty()) {
			return null;
		}
		return tp.get(0);
	}
	
}