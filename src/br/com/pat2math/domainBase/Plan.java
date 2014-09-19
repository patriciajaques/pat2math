package br.com.pat2math.domainBase;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import br.com.pat2math.studentModel.Group;
import br.com.pat2math.studentModel.Teacher;

@Entity
@Table(name="plan")
public class Plan implements Serializable {
	
	private static final long serialVersionUID = -1724612152677458577L;

	@Id @GeneratedValue
	private Long id;
	
	@NotNull
	@Size(min=3, max=30)
	private String name;
	
	@OneToMany(mappedBy="plan", targetEntity=Topic.class)
	private List<Topic> topics = new ArrayList<Topic>();
	
	@OneToMany(mappedBy="plan", targetEntity=Group.class)
	private List<Group> groups = new ArrayList<Group>();
	
	@ManyToOne
	private Teacher teacher;
	
	public void defineNameBasedOn(String teacherEmail, Integer numPlansOfTeacher) {
		name = (teacherEmail + " (" + numPlansOfTeacher + ")");
	}
	
	public void owner(Teacher owner) {
		teacher = owner;
	}
	
	public Teacher getTeacher() {
		return teacher;
	}

	public void setTeacher(Teacher teacher) {
		this.teacher = teacher;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Topic> getTopics() {
		return topics;
	}

	public void setTopics(List<Topic> topics) {
		this.topics = topics;
	}

	public List<Group> getGroups() {
		return groups;
	}

	public void setGroups(List<Group> groups) {
		this.groups = groups;
	}

}