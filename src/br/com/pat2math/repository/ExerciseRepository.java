package br.com.pat2math.repository;

import java.util.List;
import br.com.pat2math.domainBase.Exercise;

public interface ExerciseRepository extends Repository<Exercise> {
	List<Exercise> getByTopic(Long id);
	Exercise getRaw(Long id);
}