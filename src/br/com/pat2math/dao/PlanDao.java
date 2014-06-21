package br.com.pat2math.dao;

import java.util.List;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import br.com.pat2math.domainBase.Plan;
import br.com.pat2math.repository.PlanRepository;
import br.com.pat2math.studentModel.Teacher;

@Repository
public class PlanDao extends GenericDao<Plan> implements PlanRepository {
	
	@Override
	public Plan getWithTopics(Long id) {
		String jpql = "select p from Plan p left join fetch p.topics " +
						"where p.id = :id";
		
		Query q = em.createQuery(jpql);
		q.setParameter("id", id);
		Plan plan;
		try {
			plan = (Plan) q.getSingleResult();
		} catch(NoResultException nre) {
			return null;
		}
		return plan;
	}
	
	@Override
	public List<Plan> thatOwnerIs(Teacher teacher) {
		String jpql = "from Plan p where " +
				"p.teacher.id = :id";
		TypedQuery<Plan> q = em.createQuery(jpql, Plan.class);
		q.setParameter("id", teacher.getId());
		return q.getResultList();
	}
	
}