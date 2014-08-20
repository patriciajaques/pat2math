package br.com.pat2math.action;

import java.util.List;
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

import br.com.pat2math.repository.GroupRepository;
import br.com.pat2math.service.GroupService;
import br.com.pat2math.service.PlanService;
import br.com.pat2math.studentModel.Group;
import br.com.pat2math.studentModel.Teacher;

@Controller
@Transactional
@RequestMapping("/group")
public class GroupController {
	
	@Autowired private GroupService groupService;
	@Autowired private GroupRepository groups;
	@Autowired private PlanService planService;
	
	@RequestMapping(value="new", method = RequestMethod.GET)
	public String _new(Model model) {
		model.addAttribute("group", new Group());
		return "group.new";
	}
	
	@RequestMapping(value="", method = RequestMethod.POST)
	public String save(@ModelAttribute("group") @Valid Group group, 
						BindingResult result, HttpSession session) {
		Teacher teacher = new CurrentUser(session).teacher();
		Group newGroup = groupService.createGroup(group, teacher, result);
		if(result.hasErrors())
			return "group.new";
		return "redirect:" + newGroup.getId();
	}
	
	@RequestMapping(value="{id}", method = RequestMethod.GET)
	public String show(@PathVariable Long id, Model model) {
		model.addAttribute("group", groups.getWithStudents(id));
		model.addAttribute("plans", planService.getPlans());
		return "group.show";
	}
	
	@RequestMapping(value="list", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public String list(Model model, HttpSession session) {
		Teacher teacher = (Teacher) session.getAttribute("user");
		List<Group> groups = groupService.getGroups(teacher);
		model.addAttribute("groups", groups);
		return "group.list";
	}
	
	@RequestMapping(value = "changePlan", method = RequestMethod.POST)
	public @ResponseBody Long changePlan(Long idGroup, Long idPlan) {
		Group group = groupService.getGroup(idGroup);
		group.setPlan(planService.getPlan(idPlan));
		return idPlan;
	}
	
}