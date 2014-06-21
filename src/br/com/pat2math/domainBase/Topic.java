package br.com.pat2math.domainBase;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="topic")
public class Topic implements Comparable<Topic> {
	
	@Id @GeneratedValue 
	private Long id;
	
	@NotNull
	@Size(min=4, max=30)
	private String name = "deprecated";
	
	@NotNull
	@Size(min=5, max=300)
	private String description = "deprecated";
	
	private Long sequence;
	
	@ManyToOne
	@JoinColumn(name="id_plan", referencedColumnName="id", nullable=true)
	private Plan plan;
	
	@ManyToOne
	@JoinColumn(name="id_set", referencedColumnName="id", nullable=true)
	private SetOfTasks set;
	
	@Override
	public int compareTo(Topic otherTopic) {
        if (sequence < otherTopic.sequence) {
            return -1;
        }
        if (sequence > otherTopic.sequence) {
            return 1;
        }
        return 0;
    }
	
	// getters and setters
	
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getSequence() {
		return sequence;
	}

	public void setSequence(Long sequence) {
		this.sequence = sequence;
	}

	public Plan getPlan() {
		return plan;
	}

	public void setPlan(Plan plan) {
		this.plan = plan;
	}

	public SetOfTasks getSet() {
		return set;
	}

	public void setSet(SetOfTasks set) {
		this.set = set;
	}
	
}