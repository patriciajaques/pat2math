package br.com.pat2math.dao;

import java.lang.reflect.ParameterizedType;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import br.com.pat2math.repository.Repository;

public class GenericDao<T> implements Repository<T> {
	
	protected Class<T> persistentClass;
	@PersistenceContext protected EntityManager em;
	
	@SuppressWarnings("unchecked")
	public GenericDao() {
		persistentClass = (Class<T>) 
				((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
	}
	
	public T add(T obj) {
		return em.merge(obj);
	}

	public void alter(T obj) {
		em.merge(obj);
	}

	public void delete(Long id) {
		String query = "delete from " + 
						persistentClass.getName() + 
						" obj where obj.id = " + id;
		em.createQuery(query).executeUpdate();
	}

	public T get(Long id) {
		return em.find(persistentClass, id);
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public T getByName(String name) {
		String jpql = "select o from " + persistentClass.getName() +
						" o where o.name = :name";
		Query q = em.createQuery(jpql);
		q.setParameter("name", name);
		T object;
		try {
			object = (T) q.getSingleResult();
		} catch(NoResultException nre) {
			return null;
		}
		return object;
	}
	
	@SuppressWarnings("unchecked")
	public List<T> getAll() {
		String query = "select obj from " + persistentClass.getName() + " obj";
		return em.createQuery(query).getResultList();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<T> onInterval(Integer first, Integer last) {
		return em.createQuery(
				"select obj from " +
				persistentClass.getName() + " obj")
				.setFirstResult(first)
				.setMaxResults(last)
				.getResultList();
	}
	
	@Override
	public Long size() {
		return (Long) em.createQuery(
				"select count(*) from " +
				"persistentClass.getName()")
			.getSingleResult();
	}
	
}