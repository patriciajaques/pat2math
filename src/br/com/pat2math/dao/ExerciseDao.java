package br.com.pat2math.dao;

import java.util.List;
import org.springframework.stereotype.Repository;
import br.com.pat2math.domainBase.Exercise;
import br.com.pat2math.repository.ExerciseRepository;

@Repository
public class ExerciseDao extends GenericDao<Exercise> implements ExerciseRepository {
	
	public List<Exercise> getByTopic(Long id) {
		String queryStr =
			    "select NEW br.com.pat2math.domainBase.Exercise(e.id, e.name, e.equation) " +
			    "from Exercise e where e.topic.id = :id";
		return em
				.createQuery(queryStr, Exercise.class)
				.setParameter("id", id)
				.getResultList();
	}
	
	@Override
	public Exercise getRaw(Long id) {
		String queryStr =
			    "select NEW br.com.pat2math.domainBase.Exercise(e.id, e.name, e.equation) " +
			    "from Exercise e where e.id=:id";
		return em
				.createQuery(queryStr, Exercise.class)
				.setParameter("id", id)
				.getSingleResult();
	}
	
}