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
import br.com.pat2math.domainBase.Exercise;
import br.com.pat2math.service.ExerciseService;

@Controller
@Transactional
@RequestMapping("/exercise")
public class ExerciseController {
	
	@Autowired private ExerciseService service;
	
	@RequestMapping(value = "new", method = RequestMethod.GET)
	public String _new(Model model) {
		model.addAttribute("exercise", new Exercise());
		return "exercise.new";
	}
	
	@RequestMapping(value="", method=RequestMethod.POST)
	public String save(@ModelAttribute("exercise") @Valid Exercise exercise,
						BindingResult result) {
		service.createExercise(exercise, result);
		if(result.hasErrors()) 
			return "exercise.new";
		return "redirect:../content/added";
	}
	
	@RequestMapping(value="{id}", method = RequestMethod.GET)
	public String show(@PathVariable Long id, Model model) {
		Exercise exercise = service.showExercise(id);
		model.addAttribute("exercise", exercise);
		return "exercise.show";
	}
	
}