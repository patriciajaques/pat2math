package br.com.pat2math.action;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import br.com.pat2math.domainBase.SetOfTasks;
import br.com.pat2math.service.SetOfTasksService;

@Controller
@Transactional
@RequestMapping("/sets")
public class SetOfTasksController {
	
	@Autowired private SetOfTasksService service;
	
	@RequestMapping(value="new", method = RequestMethod.GET)
	public String _new(Model model) {
		model.addAttribute("set", new SetOfTasks());
		return "set.new";
	}
	
	@RequestMapping(value="", method = RequestMethod.POST)
	public String save(@ModelAttribute("set") @Valid SetOfTasks set, 
						BindingResult result) {
		SetOfTasks newSet = service.createSetOfTasks(set, result);
		if(result.hasErrors())
			return "set.new";
		return "redirect:" + newSet.getId();
	}
	
	@RequestMapping(value="{id}", method = RequestMethod.GET)
	public String _new(@PathVariable Long id, Model model) {
		model.addAttribute("set", service.getSetOfTasks(id));
		return "set.show";
	}
	
	@RequestMapping(value="list", method = RequestMethod.GET)
	public String list(Model model) {
		model.addAttribute("sets", service.getSetOfTasks());
		return "set.list";
	}
	
}