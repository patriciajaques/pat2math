package br.com.pat2math.action;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.mail.MessagingException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import pat2math.modeloAluno.Tutor;
import br.com.pat2math.domainBase.Plan;
import br.com.pat2math.domainBase.Topic;
import br.com.pat2math.formBeans.StudentForm;
import br.com.pat2math.repository.AllUsers;
import br.com.pat2math.repository.HelpRepository;
import br.com.pat2math.repository.KnowledgeRepository;
import br.com.pat2math.repository.PlanRepository;
import br.com.pat2math.service.GroupService;
import br.com.pat2math.service.MailSenderService;
import br.com.pat2math.service.StudentService;
import br.com.pat2math.studentModel.Group;
import br.com.pat2math.studentModel.Knowledge;
import br.com.pat2math.studentModel.SignUpConfirmation;
import br.com.pat2math.studentModel.Student;

@Controller
@Transactional
public class StudentController {
	
	@Autowired private StudentService studentService;
	@Autowired private GroupService groupService;
	@Autowired private HelpRepository allHelps;
	@Autowired private KnowledgeRepository allKnowledges;
	@Autowired private PlanRepository allPlans;
	@Autowired private AllUsers allUsers;
	@Autowired private MailSenderService emailService;
	@PersistenceContext private EntityManager em;
	@Autowired private BCryptPasswordEncoder encoder;
	
	@RequestMapping("/home")
	public String home() {
		return "home";
	}
	
	@RequestMapping("/student/new")
	public String formStudent(Model model, Student student) {
		model.addAttribute("formStudent", new StudentForm());
		return "student.new";
	}
	
	@RequestMapping("signUp")
	public String save(@ModelAttribute("formStudent")
		@Valid StudentForm formStudent, BindingResult result, Model model) 
				throws MessagingException {
		
		convertPasswordError(result);
		Student student = formToStudent(formStudent);
		student = Student.newStudent(student);
		
		if(student.hasEmailOf(allUsers.withEmail(student.getEmail())))
			result.rejectValue("email", "error.duplicate");
		if(result.hasErrors()) 
			return "student.new";
		
		em.persist(student);
		SignUpConfirmation confirmation = SignUpConfirmation.generateForUser(student);
		em.persist(confirmation);
		
		emailService.sendMail(student, confirmation, "confirme sua conta");
		model.addAttribute("user", student);
		return "redirect:signUpSuccess";
	}
	
	@RequestMapping("signUpSuccess")
	public String success() {
		return "student.success";
	}
	
	@RequestMapping("/student/changeGroup")
	public @ResponseBody Long changeGroup(Long idGroup, HttpSession session) {
		Student student = new CurrentUser(session).student();
		studentService.changeGroup(student, idGroup);
		return idGroup;
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/student/account")
	public String account(Model model, HttpSession session) {
		Student student = new CurrentUser(session).student();
		model.addAttribute("student", student);
		model.addAttribute("groups", groupService.getGroups());
		return "student.show";
	}

	@RequestMapping(method = RequestMethod.GET, value = "/student/home")
	public String home(Model model, HttpSession session) {
		session.setAttribute("tutor", new Tutor("", "", allHelps.getAll()));		
		Student student = new CurrentUser(session).student();
		Group studentGroup = student.getGroup();
		Plan plan;
		if(studentGroup != null)
			plan = allPlans.getWithTopics(student.getGroup().getPlan().getId());
		else
			plan = allPlans.getWithTopics(1L);
		Collections.sort(plan.getTopics());
		List<Topic> topics = plan.getTopics();
		model.addAttribute("topics", topics);
		return "student.home";
	}
	
	private Student formToStudent(StudentForm formStudent) {
		Student student = new Student();
		student.setEmail(formStudent.getEmail());
		student.setFirstName(formStudent.getFirstName());
		student.setLastName(formStudent.getLastName());
		String passwordHash = encoder.encode(formStudent.getPassword());
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