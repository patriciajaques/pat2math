package br.com.pat2math.repository;

import java.util.List;
import br.com.pat2math.domainBase.SetOfTasks;

public interface SetOfTasksRepository extends Repository<SetOfTasks> {
	
	SetOfTasks getWithTasks(Long id);
	List<SetOfTasks> searchByName(String name);
	
}