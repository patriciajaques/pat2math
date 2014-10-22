package br.com.pat2math.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import br.com.pat2math.repository.HelpRepository;
import br.com.pat2math.studentModel.Tip;

@Repository
public class HelpDao extends GenericDao<Tip> implements HelpRepository {

	@SuppressWarnings("unchecked")
	@Override
	public List<Tip> getActives() {
		String query = "select obj from br.com.pat2math.studentModel.Tip obj where obj.deprecated=:deprecated";
		
		return (List<Tip>)em.createQuery(query).setParameter("deprecated", false).getResultList();
	}

}
