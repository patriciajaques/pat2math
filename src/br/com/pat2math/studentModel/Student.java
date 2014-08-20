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

	@ManyToOne
	@JoinColumn(name="id_group", referencedColumnName="id", nullable=true)
	private Group group;
	
	@OneToMany(mappedBy="student", targetEntity=Knowledge.class)
	private List<Knowledge> knowledges;
	
	@Transient
	private List<Tip> helpsRequested = new ArrayList<Tip>();
	
	@Transient
	private List<Tip> feedbacks = new ArrayList<Tip>();
	
	public static Student newStudent(Student student) {
		student.defineRole();
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
	
}