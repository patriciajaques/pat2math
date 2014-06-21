package br.com.pat2math.repository;

import br.com.pat2math.domainBase.SetOfTasks;

public interface SetOfTasksRepository extends Repository<SetOfTasks> {
	
	SetOfTasks getWithTasks(Long id);
	
}