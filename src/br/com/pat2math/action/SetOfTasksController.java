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
import br.com.pat2math.domainBase.Topic;
import br.com.pat2math.repository.SetOfTasksRepository;
import br.com.pat2math.repository.TaskRepository;
import br.com.pat2math.service.SetOfTasksService;

@Controller @Transactional
@RequestMapping("/sets")
public class SetOfTasksController {
	
	@Autowired private SetOfTasksService service;
	@Autowired private TaskRepository allTasks;
	@Autowired private SetOfTasksRepository allSets;
	
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
	
	@RequestMapping(value = "update", method = RequestMethod.POST)
	public String update(@ModelAttribute("set") @Valid SetOfTasks set, 
			BindingResult result) {		
		if(result.hasErrors())
			return "set.new";
		allSets.alter(set);
		return "redirect:/sets/" + set.getId();
	}
	
	@RequestMapping(value="{id}", method = RequestMethod.GET)
	public String _new(@PathVariable Long id, Model model) {
		model.addAttribute("set", service.getSetOfTasks(id));
		model.addAttribute("tasks", allTasks.getAll());
		return "set.show";
	}
	
	@RequestMapping(value="list", method = RequestMethod.GET)
	public String list(Model model) {
		model.addAttribute("sets", service.getSetOfTasks());
		return "set.list";
	}
	
	@RequestMapping(value="search", method = RequestMethod.GET)
	public String search(String name, Model model) {
		model.addAttribute("sets", allSets.searchByName(name));
		return "topic.list";
	}
	
}