package br.com.pat2math.action.resolver;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import pat2math.expressao.arvore.InvalidValueException;
import pat2math.modeloAluno.Mensagem;
import pat2math.modeloAluno.Tutor;
import br.com.pat2math.action.CurrentUser;
import br.com.pat2math.domainBase.Exercise;
import br.com.pat2math.repository.AllStudents;
import br.com.pat2math.repository.KnowledgeRepository;
import br.com.pat2math.service.StudentService;
import br.com.pat2math.studentModel.Knowledge;
import br.com.pat2math.studentModel.Operation;
import br.com.pat2math.studentModel.Student;
import br.com.pat2math.studentModel.Tip;

import com.google.gson.Gson;

/**
 * Nesta classe se controla o envio das informações ao usuário, por isso usa o @Controller para pegar
 * as info do Banco de Dados também
 * -- Os métodos recebem as solicitações via mensagem por URL, estas são mandadas ou pelos atributos aqui //@AutoWired
 * ou por atributos //@AutoWired de outros classes sendo chamadas
 * 
 * @author Savanna
 *
 */

@Controller
@Transactional
public class ResolverController {
	
	/**
	 * Estes atributos são @AutoWired porque pegam informações direto do banco de dados, por isso tem o mesmo nome
	 *  que a consecutivas tabelas
	 */
	@Autowired StudentService studentService; // Não é repository pois já chama métodos das tabelas por outros atributos //@AutoWired
	@Autowired AllStudents allStudentsRepository; // Repository <Student>
	@Autowired KnowledgeRepository knowledgeRepository; //Repository <Knowledge>
	
	/**
	 * Essa mensagem é da classe responsável pelos objetos que conterão a mensagem a ser retornada ao Tutor, 
	 * em forma de String, essa mensagem é enviada lá pelo JS com a equação atual "cassio5;" + type + ";" + last;
	 * pela classe Server.js
	 */
	private Mensagem message;
	/**
	 * Este é o atributo para usar o Tutor
	 */
	private Tutor tutor;
	/**
	 * AQUI TEM TODAS AS DICAS COM SEUS RESPECTIVOS CÓDIGOS DE TIPO DE EQUAÇÃO
	 */
	private List<Tip> helps;
	/**
	 * Aqui vai ficar a equação
	 */
	String equation = "";
	
	/**
	 * Recebe a solicitação via URL pela mensagem enviada pelo JS  pelo AJAR, na classe Server.js, método requestServer(),
	 * então este método chama uma dica
	 * @param id
	 * @param httpSession
	 * @param model
	 * @param echo
	 * @param callback
	 * @return
	 * @throws InvalidValueException
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping("/resolver")
	public String get(Long id, HttpSession httpSession, Model model, String echo, String callback) 
			throws InvalidValueException, UnsupportedEncodingException {
				
		// Chegando aqui no código Java ele recebe a msg do JavaScript, e quebra em partes
 		String msg[] = echo.split(";");
		//Quebra ela no tipo
		String type = msg[1]; // d se é tipo hint
		// Quebra ela na msg == "cassio5;" + type + ";" + last;
		String equation = msg[2];
		// HttpSession = Pra eu usar a sessão dentro de uma página JSP devo sempre instanciar um objeto nesta página?
		// Sim, request.getSession().getAttribute(attribute), mais aí volta um Object, que pode ser String ou não.
		tutor = (Tutor) httpSession.getAttribute("tutor");
		
		// StudentService == Cria atributos pelas classes interfaces para entrar em contato com as classes que conversam
		// diretamente com as tabelas, por isso o uso do //@AutoWired na frente desses atributos, e também já manda para 
		// a tabela resolutionStep os dados do passo atual
		if(tutor == null) {
			httpSession.setAttribute("tutor", new Tutor("", "", studentService.loadHelps())); //
		}
		tutor = (Tutor) httpSession.getAttribute("tutor");
		
		// Carrega as informaçoes da sessão atual
		Student student = new CurrentUser(httpSession).student();
		
		//Se não encontrar o estudante atual na sessão, diz que não tá logado
		if(student == null) {
			echo = "Você não está logado!";
		
			
			
		// Se o type for e == check the equation
		} else if(type.equals("e")) {
			System.out.println("\nClient Request "+student.getEmail()+"->"+echo);
			helps = student.getFeedbacks();
			message = tutor.validaEquacao(equation, helps, student.getKnowledges());
			
			if(id != null) {
				studentService.performResolutionStep(student, id, message, tutor.getSteps(), student.getHelpsRequested());
			}
			student.setHelpsRequested(new ArrayList<Tip>());
			
			// if student answer is wrong
			if(message.getFeedbackOBJ().getDescription() != null) {
				
				// if system returned a tip
				if(message.getFeedbackOBJ().getOperation() != null && !message.getFeedbackOBJ().getOperation().isEmpty()) {
					Tip t = studentService.loadHelp(message.getFeedbackOBJ().getId());
					student.getHelpsRequested().add(t);
					student.getFeedbacks().add(t);
				}
				
			// if student answer is right
			} else {
				student.setFeedbacks(new ArrayList<Tip>());
			}
			
			echo = message.getMensagem();
			System.out.println("\nServer Response "+student.getEmail()+"->"+echo);
		
		
		
		// Se o type for d == hint
		} else if (type.equals ("d")) {
			
			//O getKnowledge() retorna as dicas e seus códigos e o size() pega o tamanho da lista
			if(student.getKnowledges().size() < 19) {// Se o tamanho da lista for 0
				// Então cria uma outra lista que recebe List<String> operations
				List<Knowledge> knowledges = student.applyKnowledges(
				Arrays.asList("AD","SB","DV","MT","MM","DM","FC","" +
				"QS","QD","PS","BK","OI","SP","RC",
				"FT","RZ","PT",	"DF"));
				
				//Adiciona para os 
				for(Knowledge k : knowledges) {
					knowledgeRepository.add(k);
				}
				
				student = allStudentsRepository.get(student.getId());
				new CurrentUser(httpSession).store(student);
			}
			
			helps = student.getHelpsRequested();
			Tip tip = tutor.getDica(equation, helps, student.getKnowledges());
			
			// if it is a tip
			if(tip.getOperation() != null) {
				echo = tip.getDescription() + ";" + tip.getAnimation().getCode();
				Tip t = studentService.loadHelp(tip.getId());
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
	
	
	@RequestMapping(value="/saveQuestion")
	public String get(String answer1, String answer2, String answer3, HttpSession session, Model model, String echo, String callback) 
			throws InvalidValueException, UnsupportedEncodingException {
		Student student = new CurrentUser(session).student();
		student.setQuestion1 (answer1);
		student.setQuestion2 (answer2);
		student.setQuestion3 (answer3);
		allStudentsRepository.alter (student);
		return "ok";
	}
	
	@RequestMapping("/resolverAPI")
	public String get2(Long id, HttpSession session, Model model, String echo, String callback) 
			throws InvalidValueException, UnsupportedEncodingException {
		
		String msg[] = echo.split(";");
		String type = msg[1];
		String equation = msg[2];
		
		tutor = new Tutor("", "", studentService.loadHelps());
		
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
	
	
	@RequestMapping(value="/getSteps")
	public @ResponseBody Exercise getStep (String lastStep, HttpSession session,
			HttpServletResponse response, HttpServletRequest request) throws IOException{
		
		Tutor tutor = (Tutor) session.getAttribute("tutor");
		
		List <String> op=tutor.getSteps(lastStep);
		
		Exercise exe= new Exercise(0l, lastStep, lastStep);
		exe.setSteps(op);
		
		return exe;
		
	}
	
	@RequestMapping(value="/getOneStep")
	public @ResponseBody String getOneStep (String lastStep, HttpSession session,
			HttpServletResponse response, HttpServletRequest request) throws IOException{
		
		Tutor tutor = (Tutor) session.getAttribute("tutor");
		
		String op=tutor.getOneStep(lastStep);
		
		
		return op;
		
	}
}