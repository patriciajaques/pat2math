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
import br.com.pat2math.domainBase.Task;
import br.com.pat2math.service.ContentService;
import br.com.pat2math.service.TaskService;

@Controller
@Transactional
@RequestMapping("/task")
public class TaskController {
	
	@Autowired private ContentService contentService;
	@Autowired private TaskService taskService;
	
	@RequestMapping(value = "new/{idSet}", method = RequestMethod.GET)
	public String _new(@PathVariable Long idSet, Model model) {
		model.addAttribute("task", new Task());
		model.addAttribute("contents", contentService.getEnabledContents());
		model.addAttribute("idSet", idSet);
		return "task.new";
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public String save(@ModelAttribute("task") @Valid Task task, BindingResult result) {
		if(result.hasErrors()) 
			return "new/" + task.getSet().getId();
		task = taskService.addTask(task);
		return "redirect:/sets/" + task.getSet().getId();
	}
	
}