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
/**
 * Resolução de todos os alunos de todas as questões
 * @author SAVANNAD
 *
 */
@Entity
@Table(name="resolution_step")
public class ResolutionStep {
	
	//TEM NA TABELA NO BC: Id da linha desta tabela
	@Id @GeneratedValue
	private Long id;
	
	//TEM NA TABELA NO BC: Se foi correta ou não
	private boolean correct;
	
	//TEM NA TABELA NO BC: É sempre zero 0
	private boolean operationCorrect;
	
	//TEM NA TABELA NO BC: A resposta passada pelo aluno
	private String answer;
	
	//TEM NA TABELA NO BC: Se está incorreta devolve feedback e a message dizendo que está incorreta 
	private String feedback;
	
	//TEM NA TABELA NO BC: Se está correto devolve uma mensagem dizendo que está correto
	private String message;
	
	//TEM NA TABELA NO BC: Horário e hora da resposta
	@Temporal(TemporalType.TIMESTAMP)
	private Date timestamp;
	
	//1 lista Tip
	@ManyToMany(cascade=CascadeType.ALL)
	@JoinTable(name="step_tip", joinColumns = {@JoinColumn(name = "id_step")}, inverseJoinColumns={@JoinColumn(name="id_tip")})											 
	private List<Tip> tips = new ArrayList<Tip>();
	
	//1 lista Operation
	@ManyToMany(cascade=CascadeType.ALL)
	@JoinTable(name="step_operation", joinColumns = {@JoinColumn(name = "id_step")}, inverseJoinColumns={@JoinColumn(name="id_operation")})												 
	private List<Operation> operations = new ArrayList<Operation>();
	
	//TEM NA TABELA NO BC: ID que liga à tabela TaskPerformed
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