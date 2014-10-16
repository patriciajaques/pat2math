package br.com.pat2math.routines;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import br.com.pat2math.domainBase.Exercise;
import br.com.pat2math.repository.ExerciseRepository;

public class SanitizeEquations {
	
	@Autowired private ExerciseRepository allExercises;
	
	public void sanitize() {
		List<Exercise> exercises = allExercises.getAll();
		for(Exercise exercise : exercises) {
			exercise.setName(exercise.getEquation());
			allExercises.alter(exercise);
		}
	}
	
}