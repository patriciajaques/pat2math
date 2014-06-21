package br.com.pat2math.dao;

import org.springframework.stereotype.Repository;
import br.com.pat2math.domainBase.Task;
import br.com.pat2math.repository.TaskRepository;

@Repository
public class TaskDao extends GenericDao<Task> implements TaskRepository {

}