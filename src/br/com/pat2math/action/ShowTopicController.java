package br.com.pat2math.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
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
	
	@RequestMapping(value="showTopic", method = RequestMethod.GET)
	public String loadTasks(Long idSet, Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {
		Student student = new CurrentUser(session).student();
		if(student == null) return "login";
		List<Task> tasks = setService.showTopic(idSet, student);
		
		// TODO: remove this check as soon as possible
		// Http 1.0 request ?
		if(request.getProtocol().contains("1.0")) {
			response.setHeader("Connection", "close");
		}
		model.addAttribute("tasks", tasks);
		return "set.tasks";
	}
	
}