package br.com.pat2math.dao;

import org.springframework.stereotype.Repository;

import br.com.pat2math.repository.KnowledgeRepository;
import br.com.pat2math.studentModel.Knowledge;

@Repository
public class KnowledgeDao extends GenericDao<Knowledge> implements KnowledgeRepository {

}
