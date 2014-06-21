package br.com.pat2math.domainBase;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="set_of_tasks")
public class SetOfTasks {
	
	@Id @GeneratedValue
	private Long id;
	
	@NotNull
	@Size(min=4, max=30)
	private String name;
	
	@NotNull
	@Size(min=4, max=300)
	private String description;
	
	@OneToMany(mappedBy="set", targetEntity=Task.class)
	private List<Task> tasks;
	
	@OneToMany(mappedBy="set", targetEntity=Topic.class)
	private List<Topic> topics;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

	public List<Topic> getTopics() {
		return topics;
	}

	public void setTopics(List<Topic> topics) {
		this.topics = topics;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
}