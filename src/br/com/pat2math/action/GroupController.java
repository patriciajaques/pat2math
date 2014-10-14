package br.com.pat2math.action;

import java.util.List;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import br.com.pat2math.formBeans.StudentInGroupForm;
import br.com.pat2math.repository.AllUsers;
import br.com.pat2math.repository.GroupRepository;
import br.com.pat2math.repository.PlanRepository;
import br.com.pat2math.service.GroupService;
import br.com.pat2math.studentModel.Group;
import br.com.pat2math.studentModel.Student;
import br.com.pat2math.studentModel.Teacher;

@Controller @Transactional
@RequestMapping("/group")
@PreAuthorize("hasAnyRole('ROLE_ADMIN, ROLE_TEACHER')")
public class GroupController {

	@Autowired private GroupService groupService;
	@Autowired private GroupRepository groups;
	@Autowired private PlanRepository allPlans;
	@Autowired private BCryptPasswordEncoder encoder;
	@Autowired private AllUsers allUsers;
	
	@RequestMapping(value="new", method = RequestMethod.GET)
	public String _new(Model model) {
		model.addAttribute("group", new Group());
		return "group.new";
	}
	
	@RequestMapping("/newStudent/{groupId}")
	public String formStudent(@PathVariable Long groupId, Model model) {
		StudentInGroupForm form = new StudentInGroupForm();
		form.setGroupId(groupId);
		model.addAttribute("formStudentInGroup", form);
		return "group.newStudent";
	}
	
	@RequestMapping(value = "/addStudent", method = RequestMethod.POST)
	public String formStudent(@ModelAttribute("formStudentInGroup") @Valid StudentInGroupForm form, 
			BindingResult result, Model model) {
		
		convertPasswordError(result);
		Student student = formToStudent(form);
		student = Student.newStudent(student);
		
		if(student.hasEmailOf(allUsers.withEmail(student.getEmail())))
			result.rejectValue("email", "error.duplicate");
		if(result.hasErrors())
			return "group.newStudent";
		
		student.activate();
		allUsers.add(student);
		return "redirect:" + student.getGroup().getId();
	}
	
	@RequestMapping(value="edit/{id}", method = RequestMethod.GET)
	public String _new(@PathVariable Long id, Model model) {
		model.addAttribute("group", groups.get(id));
		model.addAttribute("plans", allPlans.getAll());
		return "group.edit";
	}
	
	@RequestMapping(value="", method = RequestMethod.POST)
	public String save(@ModelAttribute("group") @Valid Group group, 
						BindingResult result, HttpSession session) {
		Teacher teacher = new CurrentUser(session).teacher();
		Group newGroup = groupService.createGroup(group, teacher, result);
		if(result.hasErrors())
			return "group.new";
		return "redirect:" + newGroup.getId();
	}
	
	@RequestMapping(value="update", method = RequestMethod.POST)
	public String update(@ModelAttribute("group") @Valid Group group, 
						BindingResult result, HttpSession session, Model model) {
		Teacher teacher = new CurrentUser(session).teacher();
		group.setTeacher(teacher);
		if(result.hasErrors()) {
			model.addAttribute("plans", allPlans.getAll());
			return "group.edit";
		} else {
			groups.alter(group);
			return "redirect:list";
		}
	}
	
	@RequestMapping(value="{id}", method = RequestMethod.GET)
	public String show(@PathVariable Long id, Model model) {
		model.addAttribute("group", groups.getWithStudents(id));
		model.addAttribute("plans", allPlans.getAll());
		return "group.show";
	}
	
	@RequestMapping(value="list", method = RequestMethod.GET)
	@PreAuthorize("hasAnyRole('ROLE_TEACHER, ROLE_ADMIN')")
	public String list(Model model, HttpSession session) {
		Teacher teacher = (Teacher) session.getAttribute("user");
		List<Group> groups = groupService.getGroups(teacher);
		model.addAttribute("groups", groups);
		return "group.list";
	}
	
	@RequestMapping(value = "changePlan", method = RequestMethod.POST)
	public @ResponseBody Long changePlan(Long idGroup, Long idPlan) {
		Group group = groupService.getGroup(idGroup);
		group.setPlan(allPlans.get(idPlan));
		return idPlan;
	}
	
	
	private Student formToStudent(StudentInGroupForm form) {
		Student student = new Student();
		
		student.setEmail(form.getEmail());
		student.setFirstName(form.getFirstName());
		student.setLastName(form.getLastName());
		student.setGroup(groups.get(form.getGroupId()));
		String passwordHash = encoder.encode(form.getPassword());
		student.setPassword(passwordHash);
		
		return student;
	}
	
	private static void convertPasswordError(BindingResult result) {
		for (ObjectError error : result.getGlobalErrors()) {
			String msg = error.getDefaultMessage();
			if ("account.password.mismatch.message".equals(msg)) {
				if (!result.hasFieldErrors("password")) {
					result.rejectValue("password", "error.mismatch");
				}
			}
		}
	}
	
}