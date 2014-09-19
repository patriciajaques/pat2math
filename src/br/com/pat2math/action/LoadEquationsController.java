package br.com.pat2math.action;

import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import br.com.pat2math.domainBase.Exercise;
import br.com.pat2math.repository.ContentRepository;
import br.com.pat2math.repository.ExerciseRepository;
import br.com.pat2math.repository.TaskPerformedRepository;
import br.com.pat2math.studentModel.ResolutionStep;
import br.com.pat2math.studentModel.Student;
import br.com.pat2math.studentModel.TaskPerformed;

@Controller @Transactional
public class LoadEquationsController {
	
	@Autowired private ExerciseRepository exercises;
	@Autowired private ContentRepository contents;
	@Autowired private TaskPerformedRepository performedTasks;
	
	@PreAuthorize("hasRole('ROLE_STUDENT')")
	@RequestMapping("/student/loadExercise")
	public @ResponseBody Exercise loadExercise(Long exerciseId, HttpSession session) {
		Student student = (Student) session.getAttribute("user");
		
		Exercise exercise = (Exercise) contents.get(exerciseId);
		TaskPerformed taskPerformed = performedTasks.get(exercise, student);
		if(taskPerformed == null) {
			taskPerformed = exercise.perform(student);
			performedTasks.add(taskPerformed);
		}
					
		exercise = exercises.getRaw(exercise.getId());
		
		if(taskPerformed.isFinished()) exercise.setPerformed(true);
		
		for(ResolutionStep step : taskPerformed.getSteps())
			if(step.isCorrect())
				exercise.getSteps().add(step.getAnswer());
		
		return exercise;
	}
	
}