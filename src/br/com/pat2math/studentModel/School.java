package br.com.pat2math.studentModel;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="school")
public class School {
	@Id @GeneratedValue 
	private Long id;
	
	private String name = "school 1";
	
	@OneToMany(mappedBy="school", targetEntity=Group.class)
	private List<Group> group;

	
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

	public List<Group> getGroup() {
		return group;
	}

	public void setGroup(List<Group> group) {
		this.group = group;
	}
}