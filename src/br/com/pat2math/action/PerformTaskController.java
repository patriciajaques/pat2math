package br.com.pat2math.action;

import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import br.com.pat2math.domainBase.Video;
import br.com.pat2math.repository.ContentRepository;
import br.com.pat2math.repository.TaskPerformedRepository;
import br.com.pat2math.studentModel.Student;
import br.com.pat2math.studentModel.TaskPerformed;

@Controller
@Transactional
public class PerformTaskController {
	
	@Autowired private ContentRepository allContents;
	@Autowired private TaskPerformedRepository allTasksPerformed;
	
	@RequestMapping("/video/watch")
	public String perform(Long id, Model model) {
		Video video = (Video) allContents.get(id);
		model.addAttribute("video", video);
		return "video.watch";
	}
	
	@RequestMapping("/video/finished")
	public @ResponseBody String watched(Long idVideo, HttpSession session, Model model) {
		Video video = (Video) allContents.get(idVideo);
		Student student = new CurrentUser(session).student();
		TaskPerformed taskPerformed = video.perform(student);
		allTasksPerformed.add(taskPerformed);
		return "ok";
	}
	
}