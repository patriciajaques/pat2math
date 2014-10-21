package br.com.pat2math.action;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import br.com.pat2math.dao.Topics;
import br.com.pat2math.domainBase.Exercise;
import br.com.pat2math.domainBase.Plan;
import br.com.pat2math.domainBase.Topic;
import br.com.pat2math.repository.AllStudents;
import br.com.pat2math.repository.ExerciseRepository;
import br.com.pat2math.repository.KnowledgeRepository;
import br.com.pat2math.repository.PlanRepository;
import br.com.pat2math.studentModel.Knowledge;
import br.com.pat2math.studentModel.Student;

@Controller @Transactional
@RequestMapping("/routines")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminTasksController {

	@Autowired private ExerciseRepository allExercises;
	@Autowired private AllStudents allStudents;
	@Autowired private KnowledgeRepository allKnowledges;
	@Autowired private Topics allTopics;
	@Autowired private PlanRepository allPlans;
	
	@RequestMapping("sanitizeExercises")
	public String sanitizeExercises() {
		List<Exercise> exercises = allExercises.getAll();
		for(Exercise exercise : exercises) {
			exercise.setName(exercise.getEquation());
			allExercises.alter(exercise);
		}
		return "redirect:/routines/list";
	}
	
	@RequestMapping("sanitizeTopicSequences")
	public String sanitizeTopicSequences() {
		List<Plan> plans = allPlans.getAll();
		Topic topic;
		List<Topic> topics;
		
		for(Plan plan : plans) {
			topics = plan.getTopics();
			for(int i = 0; i < topics.size(); i++) {
				topic = topics.get(i);
				topic.setSequence(i+0L);
				allTopics.alter(topic);
			}
		}
		return "redirect:/routines/list";
	}
	
	@RequestMapping("sanitizeKnowledges")
	public String sanitizeKnowledges() {
		List<Student> students = allStudents.getAll();
		
		for(Student student : students) {
			if(student.getKnowledges() == null || student.getKnowledges().size() == 0) {
				
				List<String> ks = Arrays.asList(
						"AD","SB","DV","MT","MM","DM","FC",
						"QS","QD","PS","BK","OI","SP","RC",
						"FT","RZ","PT",	"DF");
				
				Knowledge k;
				for(String s: ks) {
					k = new Knowledge(0F, s);
					k.setStudent(student);
					allKnowledges.add(k);
				}
			}
		}
		
		return "redirect:/routines/list";
	}
	
	@RequestMapping("list")
	public String list() {
		return "routines.list";
	}
	
}