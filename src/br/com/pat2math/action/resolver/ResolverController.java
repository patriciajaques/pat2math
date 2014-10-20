package br.com.pat2math.action.resolver;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import pat2math.expressao.arvore.InvalidValueException;
import pat2math.modeloAluno.Mensagem;
import pat2math.modeloAluno.Tutor;
import br.com.pat2math.action.CurrentUser;
import br.com.pat2math.repository.AllStudents;
import br.com.pat2math.repository.KnowledgeRepository;
import br.com.pat2math.service.StudentService;
import br.com.pat2math.studentModel.Knowledge;
import br.com.pat2math.studentModel.Student;
import br.com.pat2math.studentModel.Tip;
import com.google.gson.Gson;

@Controller
@Transactional
public class ResolverController {
	
	@Autowired StudentService service;
	@Autowired AllStudents allStudents;
	@Autowired KnowledgeRepository allKnowledges;
	
	private Mensagem message;
	private Tutor tutor;
	private List<Tip> helps;
	String equation = "";
	
	@RequestMapping("/resolver")
	public String get(Long id, HttpSession session, Model model, String echo, String callback) 
			throws InvalidValueException, UnsupportedEncodingException {
		
		String msg[] = echo.split(";");
		String type = msg[1];
		String equation = msg[2];
		tutor = (Tutor) session.getAttribute("tutor");
		
		if(tutor == null) {
			session.setAttribute("tutor", new Tutor("", "", service.loadHelps()));
		}
		tutor = (Tutor) session.getAttribute("tutor");
		
		Student student = new CurrentUser(session).student();
		
		if(student == null) {
			echo = "você não está logado!";
		} else if(type.equals("e")) {
			System.out.println("\nClient Request ->"+echo);
			helps = student.getFeedbacks();
			message = tutor.validaEquacao(equation, helps, student.getKnowledges());
			
			if(id != null) {
				service.performResolutionStep(student, id, message, tutor.getSteps(), student.getHelpsRequested());
			}
			student.setHelpsRequested(new ArrayList<Tip>());
			
			// if student answer is wrong
			if(message.getFeedbackOBJ().getDescription() != null) {
				
				// if system returned a tip
				if(message.getFeedbackOBJ().getOperation() != null && !message.getFeedbackOBJ().getOperation().isEmpty()) {
					Tip t = service.loadHelp(message.getFeedbackOBJ().getId());
					student.getHelpsRequested().add(t);
					student.getFeedbacks().add(t);
				}
				
			// if student answer is right
			} else {
				student.setFeedbacks(new ArrayList<Tip>());
			}
			
			echo = message.getMensagem();
			System.out.println("\nServer Response ->"+echo);
		} else if (type.equals ("d")) {
			if(student.getKnowledges().size() == 0) {
				List<Knowledge> knowledges = student.applyKnowledges(
				Arrays.asList("AD","SB","DV","MT","MM","DM","FC","" +
				"QS","QD","PS","BK","OI","SP","RC",
				"FT","RZ","PT",	"DF"));

				for(Knowledge k : knowledges) {
					allKnowledges.add(k);
				}
				
				student = allStudents.get(student.getId());
				new CurrentUser(session).store(student);
			}
			
			helps = student.getHelpsRequested();
			Tip tip = tutor.getDica(equation, helps, student.getKnowledges());
			
			// if it is a tip
			if(tip.getOperation() != null) {
				echo = tip.getDescription() + ";" + tip.getAnimation().getCode();
				Tip t = service.loadHelp(tip.getId());
				student.getHelpsRequested().add(t);
			// if there is no more tips
			} else {
				echo = tip.getDescription();
			}
		
		}
		
		Gson g = new Gson();
		List<String> results = new ArrayList<String>();
		results.add(echo);
		String jsonOutput = g.toJson(results);
    	echo = callback + "(" + jsonOutput + ");";
    	model.addAttribute("response", echo);
		return "resolverResponse";
	}
	
	@RequestMapping("/resolverAPI")
	public String get2(Long id, HttpSession session, Model model, String echo, String callback) 
			throws InvalidValueException, UnsupportedEncodingException {
		
		String msg[] = echo.split(";");
		String type = msg[1];
		String equation = msg[2];
		
		tutor = new Tutor("", "", service.loadHelps());
		
		if(type.equals("e")) {
			helps = new ArrayList<Tip>();
			message = tutor.validaEquacao(equation, helps, new ArrayList<Knowledge>());
			echo = message.getMensagem();
		
		} else if (type.equals ("d")) {
			Tip tip = tutor.getDica(equation, helps, new ArrayList<Knowledge>());
			
			if(tip.getOperation() != null) {
				echo = tip.getDescription() + ";" + tip.getAnimation().getCode();
			} else {
				echo = tip.getDescription();
			}
		
		}
		
		// serializes response in json and returns to the browser
		Gson g = new Gson();
		List<String> results = new ArrayList<String>();
		results.add(echo);
		String jsonOutput = g.toJson(results);
    	echo = callback + "(" + jsonOutput + ");";
    	model.addAttribute("response", echo);
		return "resolverResponse";
	}
}