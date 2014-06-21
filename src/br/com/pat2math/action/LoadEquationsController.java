package br.com.pat2math.action;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.pat2math.domainBase.Exercise;
import br.com.pat2math.service.SetOfTasksService;
import br.com.pat2math.studentModel.Student;

@Controller 
@Transactional
public class LoadEquationsController {
	
	@Autowired private SetOfTasksService service;
	
	@RequestMapping("/student/loadExercises")
	public @ResponseBody List<Exercise> loadExercises(Long idSet, HttpSession session) {
		Student student = (Student) session.getAttribute("user");
		List<Exercise> exercises = service.loadExercises(idSet, student);
		return exercises;
	}
	
}