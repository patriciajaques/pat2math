package br.com.pat2math.studentModel;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

@Entity
@DiscriminatorValue("student")
public class Student extends User implements Serializable {
	
	private static final long serialVersionUID = 1L;

	//Pego um grupo da tabela _group
	@ManyToOne
	@JoinColumn(name="id_group", referencedColumnName="id", nullable=true)
	private Group group;
	
	//1 lista com knowledge
	@OneToMany(mappedBy="student", targetEntity=Knowledge.class)
	private List<Knowledge> knowledges;
	
	//1 lista lista TaskPerformed == Tempo inicial de fazer fazer a equação, tempo final, id equação, + 1 lista resolutionStep
	@OneToMany
	private List<TaskPerformed> tasksPerformed;
	
	//1 lista tip == com todos os códigos dos tipos das equações e suas respectivas AS DICAS!!
	@Transient
	private List<Tip> helpsRequested = new ArrayList<Tip>();
	
	//1 lista tip == com todos os códigos dos tipos das equações e suas respectivas AS DICAS!!
	@Transient
	private List<Tip> feedbacks = new ArrayList<Tip>();
	
	//Strings
	private String question1, question2, question3;
	
	public static Student newStudent(Student student) {
		student.defineRole();
		student.defineQuestionsDefault();
		student.desactivate();
		return student;
	}
	
	public List<Knowledge> applyKnowledges(List<String> operations) {
		List<Knowledge> knowledges = new ArrayList<Knowledge>();
		for (String operation : operations) {
			Knowledge c = new Knowledge();
			c.setContent(operation);
			c.setStudent(this);
			knowledges.add(c);
		}
		return knowledges;
	}
	
	public void defineRole() {
		this.setRole("ROLE_STUDENT");
	}
	
	public void defineQuestionsDefault ( ) {
		question1 = question2 = question3 = "0";
	}
	
	public Group getGroup() {
		return group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

	public List<Knowledge> getKnowledges() {
		return knowledges;
	}

	public void setKnowledges(List<Knowledge> knowledges) {
		this.knowledges = knowledges;
	}

	public List<Tip> getHelpsRequested() {
		return helpsRequested;
	}

	public void setHelpsRequested(List<Tip> helpsRequested) {
		this.helpsRequested = helpsRequested;
	}

	public List<Tip> getFeedbacks() {
		return feedbacks;
	}

	public void setFeedbacks(List<Tip> feedbacks) {
		this.feedbacks = feedbacks;
	}

	public List<TaskPerformed> getTasksPerformed() {
		return tasksPerformed;
	}

	public void setTasksPerformed(List<TaskPerformed> tasksPerformed) {
		this.tasksPerformed = tasksPerformed;
	}

	public String getQuestion1() {
		return question1;
	}

	public void setQuestion1(String question1) {
		this.question1 = question1;
	}

	public String getQuestion2() {
		return question2;
	}

	public void setQuestion2(String question2) {
		this.question2 = question2;
	}

	public String getQuestion3() {
		return question3;
	}

	public void setQuestion3(String question3) {
		this.question3 = question3;
	}
	
	
	
}