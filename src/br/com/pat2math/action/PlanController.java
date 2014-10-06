package br.com.pat2math.action;

import java.util.Collections;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import br.com.pat2math.domainBase.Plan;
import br.com.pat2math.domainBase.PlanPaginated;
import br.com.pat2math.repository.PlanRepository;
import br.com.pat2math.studentModel.Teacher;

@Controller
@Transactional
@RequestMapping("/plan")
public class PlanController {
	
	@Autowired private PlanRepository allPlans;
	
	@RequestMapping(value="new", method = RequestMethod.GET)
	@PreAuthorize("hasAnyRole('ROLE_TEACHER, ROLE_ADMIN')")
	public String createPlan(Model model, HttpSession session) {
		Teacher teacher = new CurrentUser(session).teacher();
		List<Plan> plans = allPlans.thatOwnerIs(teacher);
		Plan plan = new Plan();
		plan.defineNameBasedOn(teacher.getEmail(), plans.size());
		plan.owner(teacher);
		plan = allPlans.add(plan);
		return "redirect:" + plan.getId();
	}
	
	@RequestMapping(value="{id}", method = RequestMethod.GET)
	@PreAuthorize("hasAnyRole('ROLE_TEACHER, ROLE_ADMIN')")
	public String show(@PathVariable Long id, Model model) {
		Plan plan = allPlans.getWithTopics(id);
		Collections.sort(plan.getTopics());
		model.addAttribute("plan", plan);
		return "plan.show";
	}
	
	@RequestMapping(value="list", method = RequestMethod.GET)
	@PreAuthorize("hasAnyRole('ROLE_TEACHER, ROLE_ADMIN')")
	public String list(Model model, Integer page, HttpSession session) {
		Teacher teacher = new CurrentUser(session).teacher();
		PlanPaginated pagination;
		pagination = new PlanPaginated(allPlans.thatOwnerIs(teacher), 5);
		pagination.changePage(page);
		
		model.addAttribute("plans", pagination.getPageSelected());
		model.addAttribute("pages", pagination.getPages());
		model.addAttribute("currentPage", pagination.getCurrentPage());
	    return "plan.list";
	}
	
	@RequestMapping(value="listAll", method = RequestMethod.GET)
	@PreAuthorize("hasAnyRole('ROLE_TEACHER, ROLE_ADMIN')")
	public String listAll(Model model, Integer page, HttpSession session) {
		PlanPaginated pagination;
		pagination = new PlanPaginated(allPlans.getAll(), 5);
		pagination.changePage(page);
		model.addAttribute("plans", pagination.getPageSelected());
		model.addAttribute("pages", pagination.getPages());
		model.addAttribute("currentPage", pagination.getCurrentPage());
	    return "plan.listAll";
	}
	
}