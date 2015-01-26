package br.com.pat2math.action;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.pat2math.studentModel.Student;

@Controller @Transactional
public class PlayAudioController {

	@RequestMapping(method = RequestMethod.GET, value= "/playaudio")
	public String audio(Model model, HttpSession session) {
		Student student = new CurrentUser(session).student();
		model.addAttribute("student", student);
		return "playaudio";
	}
	
}
