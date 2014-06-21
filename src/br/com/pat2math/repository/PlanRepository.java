package br.com.pat2math.repository;

import java.util.List;

import br.com.pat2math.domainBase.Plan;
import br.com.pat2math.studentModel.Teacher;

public interface PlanRepository extends Repository<Plan> {
	
	Plan getWithTopics(Long id);
	List<Plan> thatOwnerIs(Teacher teacher);

}