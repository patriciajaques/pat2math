package br.com.pat2math.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import br.com.pat2math.repository.GroupRepository;
import br.com.pat2math.studentModel.Group;
import br.com.pat2math.studentModel.Teacher;

@Service
public class GroupService {
	
	@Autowired private GroupRepository groups;
	
	public Group createGroup(Group group, Teacher teacher, Errors errors) {
		if(groups.getByName(group.getName()) != null) {
			errors.rejectValue("name", "error.duplicate",
					new String[] { group.getName() }, null);
		}
		group.setTeacher(teacher);
		return errors.hasErrors() ? null : groups.add(group);
	}
	
	public Group getGroup(Long id) {
		return groups.get(id);
	}
	
	public List<Group> getGroups() {
		return groups.getAll();
	}
	
	public List<Group> getGroups(Teacher teacher) {
		return groups.withTeacher(teacher);
	}
}