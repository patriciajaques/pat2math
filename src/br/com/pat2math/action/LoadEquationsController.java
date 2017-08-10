package br.com.pat2math.action;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.pat2math.domainBase.Exercise;
import br.com.pat2math.repository.ContentRepository;
import br.com.pat2math.repository.ExerciseRepository;
import br.com.pat2math.repository.TaskPerformedRepository;
import br.com.pat2math.studentModel.ResolutionStep;
import br.com.pat2math.studentModel.Student;
import br.com.pat2math.studentModel.TaskPerformed;
import br.com.pat2math.studentModel.Tip;

@Controller @Transactional
public class LoadEquationsController {
	
	@Autowired private ExerciseRepository exercises;
	@Autowired private ContentRepository contents;
	@Autowired private TaskPerformedRepository performedTasks;
	
		
	@PreAuthorize("hasRole('ROLE_STUDENT')")
	@RequestMapping(value="/student/loadExercise")
	public @ResponseBody Exercise loadExercise(Long exerciseId, HttpSession session,
			HttpServletResponse response, HttpServletRequest request) throws IOException {
		Student student = (Student) session.getAttribute("user");
		//Reseta o nível das dicas com a troca da equação
		student.setHelpsRequested(new ArrayList<Tip>());
		
		Exercise exercise = (Exercise) contents.get(exerciseId);
		TaskPerformed taskPerformed = performedTasks.get(exercise, student);
		if(taskPerformed == null) {
			taskPerformed = exercise.perform(student);
			performedTasks.add(taskPerformed);
		}
		
		exercise = exercises.getRaw(exercise.getId());
		
		if(taskPerformed.isFinished()) exercise.setPerformed(true);
		
		for(ResolutionStep step : taskPerformed.getSteps())
			if(step.isCorrect())
				exercise.getSteps().add(step.getAnswer());
		
		// TODO: remove this check as soon as possible
		// Http 1.0 request ?
		if(request.getProtocol().contains("1.0")) {
			response.setHeader("Connection", "close");
		}
		return exercise;
	}
	
	@PreAuthorize("hasRole('ROLE_STUDENT')")
	@RequestMapping(value="/student/loadExerciseTest", produces="text/plain; charset=UTF-8")
	public @ResponseBody String loadExerciseTest(Long exerciseId, 
												HttpSession session,
												HttpServletResponse response) {
		Student student = (Student) session.getAttribute("user");
		
		Exercise exercise = (Exercise) contents.get(exerciseId);
		TaskPerformed taskPerformed = performedTasks.get(exercise, student);
		if(taskPerformed == null) {
			taskPerformed = exercise.perform(student);
			performedTasks.add(taskPerformed);
		}
		exercise = exercises.getRaw(exercise.getId());
		
		String echo = "";
		echo += exercise.getId();
		echo += ";" + exercise.getEquation();
		if(taskPerformed.isFinished())
			echo += ";1";
		else
			echo += ";0";
		for(ResolutionStep step : taskPerformed.getSteps())
			if(step.isCorrect())
				echo += ";" + step.getAnswer();
		return echo;
	}
	
}