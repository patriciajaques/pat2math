package br.com.pat2math.action;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import br.com.pat2math.repository.TeacherRepository;
import br.com.pat2math.studentModel.Teacher;

@Controller
@Transactional
@RequestMapping("/teacher")
public class TeacherController {
	
	@Autowired private TeacherRepository allTeachers;
	@Autowired private BCryptPasswordEncoder encoder;
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value="new", method = RequestMethod.GET)
	public String _new(Model model) {
		model.addAttribute("teacher", new Teacher());
		return "teacher.new";
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value="", method = RequestMethod.POST)
	public String save(@ModelAttribute("teacher")
			@Valid Teacher teacher, BindingResult result) {
		
		if(allTeachers.getByEmail(teacher.getEmail()) != null)
			result.rejectValue("email", "error.duplicate");
		if(result.hasErrors())
			return "teacher.new";
		
		String encoded = encoder.encode(teacher.getPassword());
		teacher.setPassword(encoded);
		teacher.defineRole();
		allTeachers.add(teacher);
		return "list";
	}
	
	@RequestMapping(value="{id}", method = RequestMethod.GET)
	public String show(@PathVariable Long id, Model model) {
		model.addAttribute("teacher", allTeachers.get(id));
		return "teacher.show";
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value="list", method = RequestMethod.GET)
	public String list(Model model) {
		model.addAttribute("teachers", allTeachers.getAll());
		return "teacher.list";
	}

}