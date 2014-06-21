package br.com.pat2math.studentModel;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="resolution_step")
public class ResolutionStep {
	
	@Id @GeneratedValue
	private Long id;
	
	private boolean correct;
	
	private boolean operationCorrect;
	
	private String answer;
	
	private String feedback;
	
	private String message;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date timestamp;
	
	@ManyToMany(cascade=CascadeType.ALL)
	@JoinTable(name="step_tip", joinColumns = {@JoinColumn(name = "id_step")}, inverseJoinColumns={@JoinColumn(name="id_tip")})											 
	private List<Tip> tips = new ArrayList<Tip>();
	
	@ManyToMany(cascade=CascadeType.ALL)
	@JoinTable(name="step_operation", joinColumns = {@JoinColumn(name = "id_step")}, inverseJoinColumns={@JoinColumn(name="id_operation")})												 
	private List<Operation> operations = new ArrayList<Operation>();
	
	@ManyToOne
	@JoinColumn(name="id_taskPerformed", referencedColumnName="id", nullable=true)
	private TaskPerformed taskPerformed;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Tip> getTips() {
		return tips;
	}

	public void setTips(List<Tip> tips) {
		this.tips = tips;
	}

	public List<Operation> getOperations() {
		return operations;
	}

	public void setOperations(List<Operation> operations) {
		this.operations = operations;
	}

	public TaskPerformed getTaskPerformed() {
		return taskPerformed;
	}

	public void setTaskPerformed(TaskPerformed taskPerformed) {
		this.taskPerformed = taskPerformed;
	}


	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	public boolean isCorrect() {
		return correct;
	}

	public void setCorrect(boolean correct) {
		this.correct = correct;
	}

	public boolean isOperationCorrect() {
		return operationCorrect;
	}

	public void setOperationCorrect(boolean operationCorrect) {
		this.operationCorrect = operationCorrect;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}