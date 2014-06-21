package br.com.pat2math.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import br.com.pat2math.domainBase.Exercise;
import br.com.pat2math.domainBase.SetOfTasks;
import br.com.pat2math.domainBase.Task;
import br.com.pat2math.repository.ExerciseRepository;
import br.com.pat2math.repository.SetOfTasksRepository;
import br.com.pat2math.repository.TaskPerformedRepository;
import br.com.pat2math.studentModel.ResolutionStep;
import br.com.pat2math.studentModel.Student;
import br.com.pat2math.studentModel.TaskPerformed;

@Service
public class SetOfTasksService {
	
	@Autowired private SetOfTasksRepository sets;
	@Autowired private TaskPerformedRepository performedTasks;
	@Autowired private ExerciseRepository exercises;
	
	public SetOfTasks createSetOfTasks(SetOfTasks set, Errors errors) {
		if(sets.getByName(set.getName()) != null) {
			errors.rejectValue("name", "error.duplicate",
					new String[] { set.getName() }, null);
		}
		return errors.hasErrors() ? null : sets.add(set);
	}
	
	public SetOfTasks getSetOfTasks(Long id) {
		return sets.getWithTasks(id);
	}
	
	public List<SetOfTasks> getSetOfTasks() {
		return sets.getAll();
	}
	
	@PreAuthorize("hasRole('ROLE_STUDENT')")
	public List<Task> showTopic(Long idSet, Student student) {
		SetOfTasks set = sets.getWithTasks(idSet);
		List<Task> tasks = set.getTasks();
		for(Task task : tasks) {
			TaskPerformed taskPerformed = 
					performedTasks.get(task.getContent(), student);
			task.defineStatus(taskPerformed);
		}
		return tasks;
	}
	
	@PreAuthorize("hasRole('ROLE_STUDENT')")
	public List<Exercise> loadExercises(Long idSet, Student student) {
		SetOfTasks set = sets.getWithTasks(idSet);
		List<Task> tasks = set.getTasks();
		List<Exercise> exercises = new ArrayList<Exercise>();
		for(Task task : tasks) {
			if(task.getContent() instanceof Exercise) {
				Exercise e = (Exercise) task.getContent();
				
				TaskPerformed tp = performedTasks.get(e, student);
				if(tp == null) {
					tp = task.getContent().perform(student);
					performedTasks.add(tp);
				}
				
				Exercise exercise = this.exercises.getRaw(e.getId());
				if(tp.isFinished())
					exercise.setPerformed(true);
				for(ResolutionStep step : tp.getSteps()) {
					if(step.isCorrect())
						exercise.getSteps().add(step.getAnswer());
				}
				exercises.add(exercise);
			}
		}
		return exercises;
	}
	
}