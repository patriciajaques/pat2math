package br.com.pat2math.service;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import pat2math.modeloAluno.Mensagem;
import br.com.pat2math.action.CurrentUser;
import br.com.pat2math.domainBase.Content;
import br.com.pat2math.domainBase.Exercise;
import br.com.pat2math.repository.ContentRepository;
import br.com.pat2math.repository.ExerciseRepository;
import br.com.pat2math.repository.GroupRepository;
import br.com.pat2math.repository.HelpRepository;
import br.com.pat2math.repository.ResolutionStepRepository;
import br.com.pat2math.repository.AllStudents;
import br.com.pat2math.repository.TaskPerformedRepository;
import br.com.pat2math.studentModel.Group;
import br.com.pat2math.studentModel.Operation;
import br.com.pat2math.studentModel.ResolutionStep;
import br.com.pat2math.studentModel.Student;
import br.com.pat2math.studentModel.TaskPerformed;
import br.com.pat2math.studentModel.Tip;

/**
 * Cria atributos pelas classes interfaces para entrar em contato com as classes que conversam diretamente com as tabelas, por isso
 * o uso do //@AutoWired na frente desses atributos, e também já manda para a tabela resolutionStep os dados do passo atual
 * @author SAVANNAD
 *
 */
@Repository
public class StudentService {
	
	//Criar atributos para chegar nas tabelas:
	
	//Interface Repository<T> T == content que aí todas abaixo extends a Repository (é Generics) ou seja não é para chegar dierto
	// nas classes é para chamar as requisições sim ir direto à chamada ao servidor
	@Autowired private AllStudents allStudentsRepository; //É uma interface que extends uma outra interface chamada Repository	
	@Autowired private GroupRepository groupRepository; //É uma interface que extends uma outra interface chamada Repository	
	@Autowired private ExerciseRepository exerciseRepository; //É uma interface que extends uma outra interface chamada Repository	
	@Autowired private TaskPerformedRepository taskPerformedRepository; //É uma interface que extends uma outra interface chamada Repository	
	@Autowired private ResolutionStepRepository resolutionStepRepository; //É uma interface que extends uma outra interface chamada Repository	
	@Autowired private HelpRepository helpRepository; //É uma interface que extends uma outra interface chamada Repository	
	@Autowired private ContentRepository contentRepository; //É uma interface que extends uma outra interface chamada Repository	
	
	//Spring Security Code @PreAuthorize
	@PreAuthorize("hasRole('ROLE_STUDENT')")
	public void changeGroup(Student student, Long idGroup) {
		student = allStudentsRepository.get(student.getId());
		Group group = groupRepository.get(idGroup);
		student.setGroup(group);
	}
	
	public void registerStepInDataBase(Student student, Long idContent, List<Operation> operations, List<Tip> tips, boolean isCorrect, String answer) {
		Content content = contentRepository.get(idContent);// Na tabela content do BC tem todas as equações
		TaskPerformed taskPerformed = taskPerformedRepository.get(content, student); // Na tabela taskPerformed do BC tem
		// Informação da resolution_step, o passo de cada questão (= id), informação da content 
		//de qual é a questão (= id_content), informação da user, de qual é usuario  (id_student) 
		
		boolean isFinalStep = false;
		
		if (isCorrect) {
			String[] split = answer.split("=");
			
			if (split[0].equals("x")) {
				try {
					double number = Double.parseDouble(split[1]);
					isFinalStep = true;
				} catch (NumberFormatException e) {
					System.out.println("Não é a resposta final");
				}
			}
		}
		//Se é o ultimo passo ele salva data e hora
		if(isFinalStep) {
			taskPerformed.setFinished(true);
			taskPerformed.setFinalTime(new Date());
		}
		
		String messageFeedback = "Resposta correta";
		
		if (!isCorrect)
			messageFeedback = "Resposta errada";
		
		//Salva os dados na resolução da equação em uma ID
				ResolutionStep resolutionStep = new ResolutionStep();
				resolutionStep.setTimestamp(new Date());
				resolutionStep.setCorrect(isCorrect);
				resolutionStep.setTaskPerformed(taskPerformed);
				resolutionStep.setFeedback(messageFeedback);
				resolutionStep.setMessage(messageFeedback);
				resolutionStep.setAnswer(answer);
				resolutionStep.setOperations(operations);
				resolutionStep.setTips(tips);
				
				resolutionStepRepository.add(resolutionStep);
	}
	
	public void performResolutionStep(Student student, Long idContent, Mensagem message, List<Operation> operations, List<Tip> tips) {
		
		Content content = contentRepository.get(idContent);// Na tabela content do BC tem todas as equações
		TaskPerformed taskPerformed = taskPerformedRepository.get(content, student); // Na tabela taskPerformed do BC tem
		// Informação da resolution_step, o passo de cada questão (= id), informação da content 
		//de qual é a questão (= id_content), informação da user, de qual é usuario  (id_student) 
		
		//Se é o ultimo passo ele salva data e hora
		if(message.isUltimoPasso()) {
			taskPerformed.setFinished(true);
			taskPerformed.setFinalTime(new Date());
		}
		
		//Salva os dados na resolução da equação em uma ID
		ResolutionStep resolutionStep = new ResolutionStep();
		resolutionStep.setTimestamp(new Date());
		resolutionStep.setCorrect(message.isRespostaCerta());
		resolutionStep.setTaskPerformed(taskPerformed);
		resolutionStep.setFeedback(message.getFeedback());
		resolutionStep.setMessage(message.getMSG());
		resolutionStep.setAnswer(message.getRespostaAluno());
		resolutionStep.setOperations(operations);
		resolutionStep.setTips(tips);
		
		resolutionStepRepository.add(resolutionStep);
	}
	
	// Lista Exercise salva a equação e trabalho atual, com Serializable
	@PreAuthorize("hasRole('ROLE_STUDENT')")
	public List<Exercise> loadExercises(Long id) {		
		return exerciseRepository.getByTopic(id);
	}
	
	//Retorna 1 lista com os tipos de equações, com códigos == AD/SB
	public List<Tip> loadHelps() {
		return helpRepository.getAll();
	}
	
	public Tip loadHelp(Long id) {
		return helpRepository.get(id);
	}
	
	public Exercise performExercise(Long id) {
		return exerciseRepository.get(id);
	}
	
	
	
}