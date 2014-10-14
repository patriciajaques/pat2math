package br.com.pat2math.action;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import br.com.pat2math.dao.Topics;
import br.com.pat2math.domainBase.Plan;
import br.com.pat2math.domainBase.SetOfTasks;
import br.com.pat2math.domainBase.Topic;
import br.com.pat2math.repository.PlanRepository;
import br.com.pat2math.service.SetOfTasksService;

@Controller @Transactional
@RequestMapping("/topic")
@PreAuthorize("hasAnyRole('ROLE_ADMIN, ROLE_TEACHER')")

public class TopicController {
	
	@PersistenceContext private EntityManager em;
	@Autowired private SetOfTasksService setsService;
	@Autowired private Topics allTopics;
	@Autowired private PlanRepository allPlans;
	
	@RequestMapping(value = "new/{idPlan}", method = RequestMethod.GET)
	public String _new(@PathVariable Long idPlan, Model model) {
		List<SetOfTasks> sets = setsService.getSetOfTasks();
		model.addAttribute("sets", sets);
		model.addAttribute("topic", new Topic());
		return "topic.new";
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public String save(String ids, HttpSession session) {
		Plan plan = em.find(Plan.class, 1);
		
		String[] idsList = ids.split(", ");
		
	//	topic.setPlan(plan);
		
		long sequence = plan.getTopics().size();
	//	topic.setSequence(sequence);
	//	em.persist(topic);
	//	return "redirect:/plan/" + topic.getPlan().getId();
		return "";
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping("/delete")
	public String delete(Long id) {
		Topic topic = allTopics.get(id); 
		allTopics.delete(id);
		return "/plan/" + topic.getPlan().getId();
	}
	
	@RequestMapping("/change") @ResponseBody
	public String change(Long idPlan, Long position1, Long position2) {
		Topic topic = allTopics.withSequence(idPlan, position1);
		Topic topic2 = allTopics.withSequence(idPlan, position2);
		Long aux = topic.getSequence();
		topic.setSequence(topic2.getSequence());
		topic2.setSequence(aux);
		return "";
	}
	
}