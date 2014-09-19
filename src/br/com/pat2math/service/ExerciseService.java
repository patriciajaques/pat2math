package br.com.pat2math.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import br.com.pat2math.domainBase.Exercise;
import br.com.pat2math.repository.ContentRepository;
import br.com.pat2math.repository.ExerciseRepository;

@Service
public class ExerciseService {
	
	@Autowired private ExerciseRepository exercises;
	@Autowired private ContentRepository contents;
	
	public Exercise createExercise(Exercise exercise, Errors errors) {
		return errors.hasErrors() ? null : (Exercise) contents.add(exercise);
	}
	
	public List<Exercise> showExercises() {
		return exercises.getAll();
	}
	
	public Exercise showExercise(Long id) {
		return exercises.get(id);
	}
	
}