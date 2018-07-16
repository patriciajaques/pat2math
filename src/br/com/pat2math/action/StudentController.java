package br.com.pat2math.action;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.mail.MessagingException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
import br.com.pat2math.dao.StudentDao;
import br.com.pat2math.domainBase.Plan;
import br.com.pat2math.domainBase.SetOfTasks;
import br.com.pat2math.domainBase.Task;
import br.com.pat2math.domainBase.Topic;
import br.com.pat2math.formBeans.StudentForm;
import br.com.pat2math.repository.AllStudents;
import br.com.pat2math.repository.AllUsers;
import br.com.pat2math.repository.HelpRepository;
import br.com.pat2math.repository.KnowledgeRepository;
import br.com.pat2math.repository.PlanRepository;
import br.com.pat2math.repository.ResolutionStepRepository;
import br.com.pat2math.repository.TaskPerformedRepository;
import br.com.pat2math.service.GroupService;
import br.com.pat2math.service.MailSenderService;
import br.com.pat2math.studentModel.Group;
import br.com.pat2math.studentModel.SignUpConfirmation;
import br.com.pat2math.studentModel.Student;
import br.com.pat2math.studentModel.TaskPerformed;

import java.util.Locale;
import java.util.ResourceBundle;

@Controller @Transactional
public class StudentController {
	
	@Autowired private AllStudents allStudents;
	@Autowired private GroupService groupService;
	@Autowired private HelpRepository allHelps;
	@Autowired private KnowledgeRepository allKnowledges;
	@Autowired private PlanRepository allPlans;
	@Autowired private AllUsers allUsers;
	@Autowired private MailSenderService emailService;
	@PersistenceContext private EntityManager em;
	@Autowired private BCryptPasswordEncoder encoder;
	@Autowired private TaskPerformedRepository tasksPerformed;
	@Autowired private StudentDao sd;
	
	@RequestMapping("/home")
	public String home() {
		return "home";
	}
	
	@RequestMapping("/student/new")
	public String formStudent(Model model, Student student) {
		model.addAttribute("formStudent", new StudentForm());
		return "student.new";
	}
	
	@RequestMapping(value = "/student/new_facebook_student")
	public String newFacebookStudent(String name, String email, String id, Model model) {
//		model.addAttribute("user", new User());
		Student student = Student.newStudent(new Student());
		String[] nameSplit = name.split(" ");
		String firstName = nameSplit[0];
		String lastName = "";
		for(int i=0; i<nameSplit.length;i++){
			lastName += nameSplit[i]+" ";
		}
		student.setFirstName(firstName);
		student.setLastName(lastName);
		student.setEmail(email);
		String passwordHash = encoder.encode(id);
		student.setPassword(passwordHash);
		em.persist(student);
		model.addAttribute("user", student);
		return "redirect:signUpSuccess";
	}
	
	@RequestMapping(value = "newPatequation/getText", method = RequestMethod.GET)
	public @ResponseBody String getText(String key, String idioma){
		try{
			Locale locale;
			if(idioma.length() == 5)
				locale = new Locale(idioma.substring(0, 2), idioma.substring(3));
			else locale = new Locale("pt", "BR");
			ResourceBundle labels = ResourceBundle.getBundle("pat2math.i18n.IdiomBundle", locale);
			return labels.getString(key);
		} catch(Exception ex) {
			String stackTrace = key + " not found\n";
			StackTraceElement[] sT = ex.getStackTrace();
			for(int i = 0; i < sT.length && i < 4; i++) {
				stackTrace += sT[i].toString() + "\n";
			}
			if(sT.length > 4)
				stackTrace += "...\n";
			return stackTrace;
		}
	}
	
	// metodo para gerar o ranking
		@RequestMapping(value = "newPatequation/top10", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
		public @ResponseBody String topTotalScore(long id, boolean rankingGeral, String idioma, Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response){
			List<Student> estudantes;
			if(rankingGeral) {
				estudantes= sd.obterRanking();
			}else {
				estudantes= sd.obterRankingTurma(sd.obterTurma(id).getTurma());
			}
			int posicao = 1;
			String retorno = "<div align = 'center'><table align: center>";
			retorno += "<tr align = 'center'> <th align = 'center'>" + getText("SudentControllerJavaTXT-0", idioma) + "</th> <th align = 'center'>" + getText("SudentControllerJavaTXT-1", idioma) + "</th> <th align = 'center'>" + getText("SudentControllerJavaTXT-2", idioma)  + "</th> <th align = 'center'> &nbsp;&nbsp;&nbsp;&nbsp;" + getText("SudentControllerJavaTXT-3", idioma) + "</th> </tr>";
			int cont = -5;
			int posicaoAluno = 0;
			for(int i=0; i<estudantes.size(); i++) {
				if(estudantes.get(i).getId()==id) {
					posicaoAluno = i+1;
				}
			}
			if(posicaoAluno<=15) {
				while(posicao <=15 && posicao<=estudantes.size()) {
					if(estudantes.get(posicao-1).getId()==id) {
						retorno += "<tr><td align = 'center'><b>" + posicao +"</b><td align = 'center'><b>" + estudantes.get(posicao-1).getFirstName() + " " + estudantes.get(posicao-1).getLastName() + "</b></td><td align = 'center'><b>" + estudantes.get(posicao-1).getCurrentPlan() + "</b></td><td align = 'center'><b>" + estudantes.get(posicao-1).getTotalScore() + "</b></td></tr>";
					}else {
						retorno += "<tr><td align = 'center'>" + posicao +"<td align = 'center'>" + estudantes.get(posicao-1).getFirstName() + " " + estudantes.get(posicao-1).getLastName() + "</td><td align = 'center'>" + estudantes.get(posicao-1).getCurrentPlan() + "</td><td align = 'center'>" + estudantes.get(posicao-1).getTotalScore() + "</td></tr>";
					}
					posicao++;
				}
			}else if(posicaoAluno>15){
				while(posicao <=10){
					retorno += "<tr><td align = 'center'>" + posicao +"<td align = 'center'>" + estudantes.get(posicao-1).getFirstName() + " " + estudantes.get(posicao-1).getLastName() + "</td><td align = 'center'>" + estudantes.get(posicao-1).getCurrentPlan() + "</td><td align = 'center'>" + estudantes.get(posicao-1).getTotalScore() + "</td></tr>";
					posicao++;
				}
				retorno += "<tr><td align = 'center'> <td align = 'center'> ... </td><td align = 'center'> </td></tr>";
				posicao = posicaoAluno+cont;
				while(cont <= 5 && posicao<=estudantes.size()) {
					if(estudantes.get(posicao-1).getId()==id) {
						retorno += "<tr><td align = 'center'><b>" + posicao +"</b><td align = 'center'><b>" + estudantes.get(posicao-1).getFirstName() + " " + estudantes.get(posicao-1).getLastName() + "</b></td><td align = 'center'><b>" + estudantes.get(posicao-1).getCurrentPlan() + "</b></td><td align = 'center'><b>" + estudantes.get(posicao-1).getTotalScore() + "</b></td></tr>";
						posicao++;
					}else {
						retorno += "<tr><td align = 'center'>" + posicao +"<td align = 'center'>" + estudantes.get(posicao-1).getFirstName() + " " + estudantes.get(posicao-1).getLastName() + "</td><td align = 'center'>" + estudantes.get(posicao-1).getCurrentPlan() + "</td><td align = 'center'>" + estudantes.get(posicao-1).getTotalScore() + "</td></tr>";
					}
					posicao++;
					cont++;
				}
			}
			/*
			while(posicao<=estudantes.size()) {
				if(posicaoAluno<=15) {
					if(estudantes.get(posicao-1).getId()==id) {
						retorno += "<tr><td align = 'center'><b>" + posicao +"</b><td align = 'center'><b>" + estudantes.get(posicao-1).getFirstName() + " " + estudantes.get(posicao-1).getLastName() + "</b></td><td align = 'center'><b>" + estudantes.get(posicao-1).getTotalScore() + "</b></td></tr>";
						posicao++;
						while(posicao<=15 && posicao<=estudantes.size()) {
							retorno += "<tr><td align = 'center'>" + posicao +"<td align = 'center'>" + estudantes.get(posicao-1).getFirstName() + " " + estudantes.get(posicao-1).getLastName() + "</td><td align = 'center'>" + estudantes.get(posicao-1).getTotalScore() + "</td></tr>";
							posicao++;
						}
						break;
						
					}else {
						retorno += "<tr><td align = 'center'>" + posicao +"<td align = 'center'>" + estudantes.get(posicao-1).getFirstName() + " " + estudantes.get(posicao-1).getLastName() + "</td><td align = 'center'>" + estudantes.get(posicao-1).getTotalScore() + "</td></tr>";
					}
				}
				else if(estudantes.get(posicao-1).getId()==id) {
					retorno += "<tr><td align = 'center'> <td align = 'center'> ... </td><td align = 'center'> </td></tr>";
					while(cont<=5 && posicao<estudantes.size()) {
						if((posicao+cont)>10) {
							if(cont==0) {
								retorno += "<tr><td align = 'center'><b>" + (posicao+cont) +"</b><td align = 'center'><b>" + estudantes.get(posicao+cont-1).getFirstName() + " " + estudantes.get(posicao+cont-1).getLastName() + "</b></td><td align = 'center'><b>" + estudantes.get(posicao+cont-1).getTotalScore() + "</b></td></tr>";
							}else {
								retorno += "<tr><td align = 'center'>" + (posicao+cont) +"<td align = 'center'>" + estudantes.get(posicao+cont-1).getFirstName() + " " + estudantes.get(posicao+cont-1).getLastName() + "</td><td align = 'center'>" + estudantes.get(posicao+cont-1).getTotalScore() + "</td></tr>";
							}
						}
						cont++;
					}
					if(cont>5) {
						break;
					}
				}
				posicao++;
			} */
			retorno += "</table></div><br>";
			if(!rankingGeral) {
				retorno += "<a href='#' onclick='rankingGeral()'>" + getText("SudentControllerJavaTXT-4", idioma) + "</a><br>";
			}
			retorno += "<br>" + getText("SudentControllerJavaTXT-5", idioma) + ": <br>";
		    retorno += "<a id='compartilhar_facebook' href='#' title='" + getText("SudentControllerJavaTXT-5", idioma) + "' onclick='compartilharFacebook()'><img src='/pat2math/patequation/img/compartilhar-facebook.png'/></a>";
			return retorno;
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
//		if(result.hasErrors())
//			return "student.new";
		
		em.persist(student);
		
//		SignUpConfirmation confirmation = SignUpConfirmation.generateForUser(student);
//		em.persist(confirmation);
//		emailService.sendConfirmationAccount(student, confirmation, "confirme sua conta");
		
		model.addAttribute("user", student);
		return "redirect:signUpSuccess";
	}
	
	@RequestMapping("signUpSuccess")
	public String success() {
		return "student.success";
	}
	
	@RequestMapping("/student/changeGroup")
	public @ResponseBody Long changeGroup(Long idGroup, HttpSession session) {
		//Student student = new CurrentUser(session).student();
		//studentService.changeGroup(student, idGroup);
		return idGroup;
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/student/account")
	public String account(Model model, HttpSession session) {
		Student student = new CurrentUser(session).student();
		student = allStudents.get(student.getId());
		model.addAttribute("student", student);
		model.addAttribute("groups", groupService.getGroups());
		return "student.show";
	}

	@RequestMapping(method = RequestMethod.GET, value = "/student/home")
	public String home(Model model, HttpSession session) {
		Student student = new CurrentUser(session).student();
		if (student==null) return "user.login";
		Tutor tutor = (Tutor)session.getAttribute("tutor");
		if (tutor==null){
			session.setAttribute("tutor", new Tutor("", "", allHelps.getActives()));
		}
		Group studentGroup = student.getGroup();
		Plan plan;
		if(studentGroup != null)
			plan = allPlans.getWithTopics(student.getGroup().getPlan().getId());
		else
			plan = allPlans.getWithTopics(1L);
		
		Collections.sort(plan.getTopics());
		List<Topic> topics = plan.getTopics();
		
		// TODO: puts this logic on outer loop API
		// always add first
		List<Topic> activeTopics = new ArrayList<Topic>();
		activeTopics.add(topics.get(0));
		
		for(int i = 0; i < topics.size(); i++) {
			SetOfTasks set = topics.get(i).getSet();
			boolean finished = true;
			for(Task task : set.getTasks()) {
				TaskPerformed tp = tasksPerformed.get(task.getContent(), student);
				if(tp == null || !tp.isFinished()) {
					finished = false;
				}
			}
			if(finished && i < (topics.size() -1)) {
				activeTopics.add(topics.get(i+1));
			} else {
				break;
			}
		}
		model.addAttribute("topics", activeTopics);
	//	model.addAttribute("student", student);
		return "student.home";
	}
	
	
	@RequestMapping(method = RequestMethod.GET, value = "/ranking")
	public String ranking(Model model, HttpSession session) {
		Student student = new CurrentUser(session).student();		
		return "ranking";
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/knowledgeTest")
	public String knowledgeTest(Model model, HttpSession session) {
		Student student = new CurrentUser(session).student();		
		return "knowledgeTest";
	}
	
	@RequestMapping(value = "newPatequation/knowledgeTestWasRealized", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String knowledgeTestWasRealized(Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response){
		Student student = sd.get(new CurrentUser(session).student().getId());	
		if(!student.getKnowledgeTestWasRealized()) {
			return "knowledgeTest";
		}else {
			return "newPatequation";
		}
	}
	
	@RequestMapping(value = "newPatequation/setKnowledgeTest", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String setKnowledgeTest(Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {	
		Student student = sd.get(new CurrentUser(session).student().getId());	
		student.setKnowledgeTestWasRealized(true);
		sd.alter(student);		
		return "Dados atualizados com sucesso!";
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/newpatequation")
	public String newpatequation(Model model, HttpSession session) {
		Student student = new CurrentUser(session).student();
		if (student==null) return "user.login";
		Tutor tutor = (Tutor)session.getAttribute("tutor");
		if (tutor==null){
			session.setAttribute("tutor", new Tutor("", "", allHelps.getActives()));
		}
		Group studentGroup = student.getGroup();
		Plan plan;
		if(studentGroup != null)
			plan = allPlans.getWithTopics(student.getGroup().getPlan().getId());
		else
			plan = allPlans.getWithTopics(1L);
		
		Collections.sort(plan.getTopics());
		List<Topic> topics = plan.getTopics();
		
		// TODO: puts this logic on outer loop API
		// always add first
		List<Topic> activeTopics = new ArrayList<Topic>();
		activeTopics.add(topics.get(0));
		
		for(int i = 0; i < topics.size(); i++) {
			SetOfTasks set = topics.get(i).getSet();
			boolean finished = true;
			for(Task task : set.getTasks()) {
				TaskPerformed tp = tasksPerformed.get(task.getContent(), student);
				if(tp == null || !tp.isFinished()) {
					finished = false;
				}
			}
			if(finished && i < (topics.size() -1)) {
				activeTopics.add(topics.get(i+1));
			} else {
				break;
			}
		}
		model.addAttribute("topics", activeTopics);
	//	model.addAttribute("student", student);
		return "newpatequation";
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/pat2exam")
	public String pat2exam(Model model, HttpSession session) {
		Student student = new CurrentUser(session).student();
		if (student==null) return "user.login";
		Tutor tutor = (Tutor)session.getAttribute("tutor");
		if (tutor==null){
			session.setAttribute("tutor", new Tutor("", "", allHelps.getActives()));
		}
		Group studentGroup = student.getGroup();
		Plan plan;
		if(studentGroup != null)
			plan = allPlans.getWithTopics(student.getGroup().getPlan().getId());
		else
			plan = allPlans.getWithTopics(1L);
		
		Collections.sort(plan.getTopics());
		List<Topic> topics = plan.getTopics();
		
		// TODO: puts this logic on outer loop API
		// always add first
		List<Topic> activeTopics = new ArrayList<Topic>();
		activeTopics.add(topics.get(0));
		
		for(int i = 0; i < topics.size(); i++) {
			SetOfTasks set = topics.get(i).getSet();
			boolean finished = true;
			for(Task task : set.getTasks()) {
				TaskPerformed tp = tasksPerformed.get(task.getContent(), student);
				if(tp == null || !tp.isFinished()) {
					finished = false;
				}
			}
			if(finished && i < (topics.size() -1)) {
				activeTopics.add(topics.get(i+1));
			} else {
				break;
			}
		}
		model.addAttribute("topics", activeTopics);
	//	model.addAttribute("student", student);
		return "pat2exam";
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/student/patexpression")
	public String patexpression(Model model, HttpSession session) {
		Student student = new CurrentUser(session).student();
		if (student==null) return "user.login";
		Tutor tutor = (Tutor)session.getAttribute("tutor");
		if (tutor==null){
			session.setAttribute("tutor", new Tutor("", "", allHelps.getActives()));
		}
		Group studentGroup = student.getGroup();
		Plan plan;
		if(studentGroup != null)
			plan = allPlans.getWithTopics(student.getGroup().getPlan().getId());
		else
			plan = allPlans.getWithTopics(1L);
		
		Collections.sort(plan.getTopics());
		List<Topic> topics = plan.getTopics();
		
		// TODO: puts this logic on outer loop API
		// always add first
		List<Topic> activeTopics = new ArrayList<Topic>();
		activeTopics.add(topics.get(0));
		
		for(int i = 0; i < topics.size(); i++) {
			SetOfTasks set = topics.get(i).getSet();
			boolean finished = true;
			for(Task task : set.getTasks()) {
				TaskPerformed tp = tasksPerformed.get(task.getContent(), student);
				if(tp == null || !tp.isFinished()) {
					finished = false;
				}
			}
			if(finished && i < (topics.size() -1)) {
				activeTopics.add(topics.get(i+1));
			} else {
				break;
			}
		}
		model.addAttribute("topics", activeTopics);
	//	model.addAttribute("student", student);
		return "student.patexpression";
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/student/mobile")
	public String mobile(Model model, HttpSession session) {
		Student student = new CurrentUser(session).student();
		if (student==null) return "user.login";
		Tutor tutor = (Tutor)session.getAttribute("tutor");
		if (tutor==null){
			session.setAttribute("tutor", new Tutor("", "", allHelps.getActives()));
		}
		Group studentGroup = student.getGroup();
		Plan plan;
		if(studentGroup != null)
			plan = allPlans.getWithTopics(student.getGroup().getPlan().getId());
		else
			plan = allPlans.getWithTopics(1L);
		
		Collections.sort(plan.getTopics());
		List<Topic> topics = plan.getTopics();
		
		// TODO: puts this logic on outer loop API
		// always add first
		List<Topic> activeTopics = new ArrayList<Topic>();
		activeTopics.add(topics.get(0));
		
		for(int i = 0; i < topics.size(); i++) {
			SetOfTasks set = topics.get(i).getSet();
			boolean finished = true;
			for(Task task : set.getTasks()) {
				TaskPerformed tp = tasksPerformed.get(task.getContent(), student);
				if(tp == null || !tp.isFinished()) {
					finished = false;
				}
			}
			if(finished && i < (topics.size() -1)) {
				activeTopics.add(topics.get(i+1));
			} else {
				break;
			}
		}
		model.addAttribute("topics", activeTopics);
	//	model.addAttribute("student", student);
		return "student.mobile";
	}
	
	@RequestMapping(method= RequestMethod.GET, value = "student/reload_task")
	public String reloadTasks(Model model, HttpSession session){
		Student student = new CurrentUser(session).student();
		Group studentGroup = student.getGroup();
		Plan plan;
		if(studentGroup != null)
			plan = allPlans.getWithTopics(student.getGroup().getPlan().getId());
		else
			plan = allPlans.getWithTopics(1L);
		
		Collections.sort(plan.getTopics());
		List<Topic> topics = plan.getTopics();
		
		// TODO: puts this logic on outer loop API
		// always add first
		List<Topic> activeTopics = new ArrayList<Topic>();
		activeTopics.add(topics.get(0));
		
		for(int i = 0; i < topics.size(); i++) {
			SetOfTasks set = topics.get(i).getSet();
			boolean finished = true;
			for(Task task : set.getTasks()) {
				TaskPerformed tp = tasksPerformed.get(task.getContent(), student);
				if(tp == null || !tp.isFinished()) {
					finished = false;
				}
			}
			if(finished && i < (topics.size() -1)) {
				activeTopics.add(topics.get(i+1));
			} else {
				break;
			}
		}
		model.addAttribute("topics", activeTopics);
		return "set.reload";
		
	}
	
	@RequestMapping(method = RequestMethod.GET, value= "/audio")
	public String audio(Model model, HttpSession session) {
		Student student = new CurrentUser(session).student();
		Group studentGroup = student.getGroup();
		model.addAttribute("student", student);
		return "audio";
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/translator2")
	public String translator2(Model model, HttpSession session) {
		Student student = new CurrentUser(session).student();
		if (student==null) return "user.login";
		Tutor tutor = (Tutor)session.getAttribute("tutor");
		if (tutor==null){
			session.setAttribute("tutor", new Tutor("", "", allHelps.getActives()));
		}
		Group studentGroup = student.getGroup();
		Plan plan;
		if(studentGroup != null)
			plan = allPlans.getWithTopics(student.getGroup().getPlan().getId());
		else
			plan = allPlans.getWithTopics(1L);
		
		Collections.sort(plan.getTopics());
		List<Topic> topics = plan.getTopics();
		
		// TODO: puts this logic on outer loop API
		// always add first
		List<Topic> activeTopics = new ArrayList<Topic>();
		activeTopics.add(topics.get(0));
		
		for(int i = 0; i < topics.size(); i++) {
			SetOfTasks set = topics.get(i).getSet();
			boolean finished = true;
			for(Task task : set.getTasks()) {
				TaskPerformed tp = tasksPerformed.get(task.getContent(), student);
				if(tp == null || !tp.isFinished()) {
					finished = false;
				}
			}
			if(finished && i < (topics.size() -1)) {
				activeTopics.add(topics.get(i+1));
			} else {
				break;
			}
		}
		model.addAttribute("topics", activeTopics);
	//	model.addAttribute("student", student);
		return "translator2";
	}
	
	//level = 0 obtém a pontuação total
	//level = 1 obtém as pontuações de cada um dos níveis
	
	@RequestMapping(value = "pat2exam/getNotaTeste", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String getNotaTeste(Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {	
		Student student = sd.get(new CurrentUser(session).student().getId());
		String nota = "" + student.getNotaTeste();
		
		return nota;
	}
	
	@RequestMapping(value = "pat2exam/updateNotaTeste", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String updateNotaTeste(double nota, Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {	
		Student student = sd.get(new CurrentUser(session).student().getId());
		student.setNotaTeste(nota);
		sd.alter(student);
	
		return "Nota atualizada com sucesso";
	}
	@RequestMapping(value = "newPatequation/getScore", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String getScore(int level, Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {	
		Student student = sd.get(new CurrentUser(session).student().getId());	
		String score = "";
		if (level == 0)
			score += student.getTotalScore();
		
		else {
			score += student.getScoreLevel1();
			score += ";" + student.getScoreLevel2();
			score += ";" + student.getScoreLevel3();
			score += ";" + student.getScoreLevel4();
			score += ";" + student.getScoreLevel5();
		}
		
		return score;
	}
	
	@RequestMapping(value = "newPatequation/updateScore", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String updateScore(int amount, int level, Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {	
		Student student = sd.get(new CurrentUser(session).student().getId());
		student.addOrRemovePoints(amount, level);
		sd.alter(student);
	
		return "Pontuação atualizada com sucesso";
	}
	
	@RequestMapping(value = "newPatequation/updateScoreTotal", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String updateScoreTotal(int amount, Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {	
		Student student = sd.get(new CurrentUser(session).student().getId());
		student.setTotalScore(amount);
		sd.alter(student);
	
		return "Pontuação total atualizada com sucesso";
	}
	
	@RequestMapping(value = "newPatequation/getLevelAndPlan", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String getLevelAndPlan(Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {	
		Student student = sd.get(new CurrentUser(session).student().getId());
		String level = "" + student.getCurrentLevel();
		String classPlan = "" + student.getCurrentPlan();
		
		return level + ";" + classPlan;
	}
	
	@RequestMapping(value = "newPatequation/completePlan", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String completePlan(int level, int plan, Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {	
		Student student = sd.get(new CurrentUser(session).student().getId());	
		getAllStudents(model, session, request, response);
		student.setCurrentLevel(level);
		student.setCurrentPlan(plan);
		sd.alter(student);
	
		return "Progresso atualizado com sucesso";
	}
	
	@RequestMapping(value = "newPatequation/rewardWorkedExamples", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String getRewardWorkedExamples(Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {	
		Student student = sd.get(new CurrentUser(session).student().getId());	
		
		if (student.isRewardWorkedExamples())
			return "true";
	
		else
			return "false";
	}
	
	@RequestMapping(value = "newPatequation/rewardFinal", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String getRewardFinal(Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {	
		Student student = sd.get(new CurrentUser(session).student().getId());	
		
		if (student.isRewardFinal())
			return "true";
	
		else
			return "false";
	}
	
	@RequestMapping(value = "newPatequation/saveRewardWorkedExamples", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String saveRewardWorkedExamples(Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {	
		Student student = sd.get(new CurrentUser(session).student().getId());	
		student.setRewardWorkedExamples(true);
		sd.alter(student);
		
		return "Recompensa salva com sucesso";
	}
	
	@RequestMapping(value = "saveSelectedEquationsInDataBase", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String saveSelectedEquationsInDataBase(Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response, String ids, String equations) {	
		Student student = sd.get(new CurrentUser(session).student().getId());	
		student.setIdsExam(ids);
		student.setEquationsExam(equations);
		sd.alter(student);
		
		return "Dados salvos com sucesso";
	}
	
	@RequestMapping(value = "getEquationsExam", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String getEquationsExam(Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {	
		Student student = sd.get(new CurrentUser(session).student().getId());	
		
		String equations = student.getEquationsExam();
		
		if (equations == null)
			equations = "null";
		
		return equations;
	}
	
	@RequestMapping(value = "getIdsExam", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String getIdsExam(Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {	
		Student student = sd.get(new CurrentUser(session).student().getId());	
		
		String ids = student.getIdsExam();
		
		if (ids == null)
			ids = "null";
		
		return ids;
	}
	
	
	@RequestMapping(value = "newPatequation/saveRewardFinal", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String saveRewardFinal(Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {	
		Student student = sd.get(new CurrentUser(session).student().getId());	
		student.setRewardWorkedExamples(true);
		student.setRewardFinal(true);
		sd.alter(student);
		
		return "Recompensa salva com sucesso";
	}

	
	@RequestMapping(value = "newPatequation/tour", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String tour(Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {	
		Student student = sd.get(new CurrentUser(session).student().getId());
		
		String result = "true";
		
		if (student.isTourWasViewed() == false)
			result = "false";
		
		return result;
	}
	
	@RequestMapping(value = "newPatequation/setTour", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String setTour(Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {	
		Student student = sd.get(new CurrentUser(session).student().getId());	
		student.setTourWasViewed(true);
		sd.alter(student);
		
		return "Informação atualizada com sucesso";
	}
	
	@RequestMapping(value = "newPatequation/getAllStudents", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String getAllStudents(Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {
//		Verificar o que está causando o erro no método sd.getall(); 
		
		ArrayList<Student> students = (ArrayList<Student>) sd.getAll();
				return null;
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