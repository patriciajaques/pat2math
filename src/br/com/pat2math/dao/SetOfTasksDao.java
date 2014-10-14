package br.com.pat2math.dao;

import java.util.List;

import javax.persistence.NoResultException;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import br.com.pat2math.domainBase.SetOfTasks;
import br.com.pat2math.repository.SetOfTasksRepository;

@Repository
public class SetOfTasksDao extends GenericDao<SetOfTasks> implements SetOfTasksRepository {
	
	@Override
	public SetOfTasks getWithTasks(Long id) {
		String jpql = "select s from SetOfTasks s left join fetch s.tasks " +
						"where s.id = :id";
		
		Query q = em.createQuery(jpql);
		q.setParameter("id", id);
		SetOfTasks set;
		try {
			set = (SetOfTasks) q.getSingleResult();
		} catch(NoResultException nre) {
			return null;
		}
		return set;
	}
	
	@Override
	public List<SetOfTasks> searchByName(String name) {
		String jpql = "select s from SetOfTasks s where s.name LIKE :name";
		Query q = em.createQuery(jpql);
		q.setParameter("name", "%" + name + "%");
		List<SetOfTasks> sets = (List<SetOfTasks>) q.getResultList();
		return sets;
	}
	
}