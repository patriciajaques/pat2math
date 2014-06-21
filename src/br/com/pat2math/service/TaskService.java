package br.com.pat2math.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.pat2math.domainBase.Task;
import br.com.pat2math.repository.TaskRepository;

@Service
public class TaskService {
	
	@Autowired private TaskRepository tasks;
	
	public Task addTask(Task task) {
		return tasks.add(task);
	}

}