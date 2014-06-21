package br.com.pat2math.dao;

import org.springframework.stereotype.Repository;

import br.com.pat2math.domainBase.Topic;

@Repository
public class Topics extends GenericDao<Topic> {
	
	public Topic withSequence(Long idPlan, Long sequence) {
		return em.createQuery("from Topic t where " +
				"t.sequence=:sequence and t.plan.id = :idPlan"
													, Topic.class)
				.setParameter("sequence", sequence)
				.setParameter("idPlan", idPlan)
				.getSingleResult();
	}
	
}