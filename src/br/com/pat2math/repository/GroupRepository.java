package br.com.pat2math.repository;

import java.util.List;
import br.com.pat2math.studentModel.Group;
import br.com.pat2math.studentModel.Teacher;

public interface GroupRepository extends Repository<Group> {
	
	List<Group> withTeacher(Teacher teacher); 

}