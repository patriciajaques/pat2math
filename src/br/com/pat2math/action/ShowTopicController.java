package br.com.pat2math.action;

import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import br.com.pat2math.domainBase.Task;
import br.com.pat2math.service.SetOfTasksService;
import br.com.pat2math.studentModel.Student;

@Controller
@Transactional
@RequestMapping("/student")
public class ShowTopicController {
	
	@Autowired private SetOfTasksService setService;
	
	@RequestMapping(value="showTopic", method = RequestMethod.POST)
	public String loadTasks(Long idSet, Model model, HttpSession session) {
		Student student = new CurrentUser(session).student();
		if(student == null) return "login";
		List<Task> tasks = setService.showTopic(idSet, student);
		model.addAttribute("tasks", tasks);
		return "set.tasks";
	}
	
}