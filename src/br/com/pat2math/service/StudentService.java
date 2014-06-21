package br.com.pat2math.service;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import pat2math.modeloAluno.Mensagem;
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

@Repository
public class StudentService {
	
	@Autowired private AllStudents students;
	@Autowired private GroupRepository groups;
	@Autowired private ExerciseRepository exercises;
	@Autowired private TaskPerformedRepository performedTasks;
	@Autowired private ResolutionStepRepository resolutionSteps;
	@Autowired private HelpRepository helps;
	@Autowired private ContentRepository contents;
	
	@PreAuthorize("hasRole('ROLE_STUDENT')")
	public void changeGroup(Student student, Long idGroup) {
		student = students.get(student.getId());
		Group group = groups.get(idGroup);
		student.setGroup(group);
	}
	
	public void performResolutionStep(Student student, Long idContent, Mensagem message, List<Operation> operations, List<Tip> tips) {
		
		Content content = contents.get(idContent);
		TaskPerformed tp = performedTasks.get(content, student);
		
		if(message.isUltimoPasso()) {
			tp.setFinished(true);
			tp.setFinalTime(new Date());
		}
		
		ResolutionStep step = new ResolutionStep();
		step.setTimestamp(new Date());
		step.setCorrect(message.isRespostaCerta());
		step.setTaskPerformed(tp);
		step.setFeedback(message.getFeedback());
		step.setMessage(message.getMSG());
		step.setAnswer(message.getRespostaAluno());
		step.setOperations(operations);
		step.setTips(tips);
		
		resolutionSteps.add(step);
	}
	
	@PreAuthorize("hasRole('ROLE_STUDENT')")
	public List<Exercise> loadExercises(Long id) {		
		return exercises.getByTopic(id);
	}
	
	public List<Tip> loadHelps() {
		return helps.getAll();
	}
	
	public Tip loadHelp(Long id) {
		return helps.get(id);
	}
	
	public Exercise performExercise(Long id) {
		return exercises.get(id);
	}
	
}