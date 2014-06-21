package br.com.pat2math.dao;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import org.springframework.stereotype.Repository;
import br.com.pat2math.domainBase.Video;
import br.com.pat2math.repository.VideoRepository;

@Repository
public class VideoDao extends GenericDao<Video> implements VideoRepository {
	
	@Override
	public Video getByName(String name) {
		String jpql = "select v from Video v where v.name = :name";
		Query q = em.createQuery(jpql);
		q.setParameter("name", name);
		Video video;
		try {
			video = (Video) q.getSingleResult();
		} catch(NoResultException nre) {
			return null;
		}
		return video;
	}
}