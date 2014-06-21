package br.com.pat2math.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import br.com.pat2math.domainBase.Plan;
import br.com.pat2math.domainBase.PlanPaginated;
import br.com.pat2math.repository.PlanRepository;
import br.com.pat2math.studentModel.Teacher;

@Service
@PreAuthorize("denyAll")
public class PlanService {
	
	@Autowired private PlanRepository plans;
	
	@PreAuthorize("hasAnyRole('ROLE_TEACHER', 'ROLE_ADMIN')")
	public Plan createPlan(Plan plan, Teacher teacher, Errors errors) {
		if(plans.getByName(plan.getName()) != null) {
			errors.rejectValue("name", "error.duplicate",
					new String[] { plan.getName() }, null);
		}
		plan.setTeacher(teacher);
		return errors.hasErrors() ? null : plans.add(plan);
	}
	
	@PreAuthorize("isAuthenticated()")
	public Plan getPlan(Long id) {
		return plans.getWithTopics(id);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_TEACHER', 'ROLE_ADMIN')")
	public List<Plan> getPlans() {
		return plans.getAll();
	}
	
	@PreAuthorize("hasAnyRole('ROLE_TEACHER', 'ROLE_ADMIN')")
	public PlanPaginated getPlans(Integer page) {
		PlanPaginated pagination = new PlanPaginated(plans.getAll(), 5);		
		pagination.changePage(page);
		return pagination;
	}
	
	@PreAuthorize("hasAnyRole('ROLE_TEACHER', 'ROLE_ADMIN')")
	public Long numberOfPlans() {
		return plans.size();
	}
	
}