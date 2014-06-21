package br.com.pat2math.repository;

import br.com.pat2math.domainBase.Content;
import br.com.pat2math.studentModel.Student;
import br.com.pat2math.studentModel.TaskPerformed;

public interface TaskPerformedRepository extends Repository<TaskPerformed> {
	TaskPerformed get(Content content, Student student);
}