package br.com.pat2math.domainBase;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import br.com.pat2math.studentModel.TaskPerformed;

@Entity
@Table(name="task")
public class Task {
	
	@GeneratedValue @Id
	private Long id;
	
	private Long sequence;
	
	@ManyToOne
	@JoinColumn(name="id_content", referencedColumnName="id", nullable=true)
	private Content content;
	
	@ManyToOne
	@JoinColumn(name="id_set", referencedColumnName="id", nullable=true)
	private SetOfTasks set;
	
	@Transient
	private boolean performed;
	
	public void defineStatus(TaskPerformed taskPerformed) {
		if(taskPerformed != null && taskPerformed.isFinished()) {
			performed = true;
		}
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Content getContent() {
		return content;
	}

	public void setContent(Content content) {
		this.content = content;
	}

	public SetOfTasks getSet() {
		return set;
	}

	public void setSet(SetOfTasks set) {
		this.set = set;
	}

	public Long getSequence() {
		return sequence;
	}

	public void setSequence(Long sequence) {
		this.sequence = sequence;
	}

	public boolean isPerformed() {
		return performed;
	}

	public void setPerformed(boolean performed) {
		this.performed = performed;
	}
	
}