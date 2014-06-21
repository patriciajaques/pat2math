package br.com.pat2math.dao;

import org.springframework.stereotype.Repository;
import br.com.pat2math.repository.HelpRepository;
import br.com.pat2math.studentModel.Tip;

@Repository
public class HelpDao extends GenericDao<Tip> implements HelpRepository {

}
