package br.com.pat2math.dao;

import org.springframework.stereotype.Repository;
import br.com.pat2math.domainBase.Content;
import br.com.pat2math.repository.ContentRepository;

@Repository
public class ContentDao extends GenericDao<Content> implements ContentRepository {
	
}