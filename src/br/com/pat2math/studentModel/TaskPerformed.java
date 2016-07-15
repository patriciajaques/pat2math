package br.com.pat2math.studentModel;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import br.com.pat2math.domainBase.Content;
/**
 * Tempo inicial de fazer fazer a equação, tempo final, id equação, + 1 lista resolutionStep
 * 
 * @author SAVANNAD
 *
 */
@Entity
@Table(name="task_performed")
public class TaskPerformed {
	
	//ID na tabela
	@Id @GeneratedValue
	private Long id;
	
	//Horário e dia que iniciou a questão
	@Temporal(TemporalType.TIMESTAMP)
	private Date initTime;
	
	//Horário e dia que terminou a questão
	@Temporal(TemporalType.TIMESTAMP)
	private Date finalTime;
	
	//Se foi terminada ... Porém aqui não está ligada diretamente com a tabela, porque?????????
	private boolean finished = false;
	
	//ID da equação
	@ManyToOne
	@JoinColumn(name="id_content", referencedColumnName="id", nullable=true)
	private Content content;
	
	//ID do estudante a partir da classe Student, porém no BC é usada a classe user_task_performed
	@ManyToOne
	@JoinColumn(name="id_student", referencedColumnName="id", nullable=true)
	private Student student;

	//1 lista resolution_step
	@OneToMany(mappedBy="taskPerformed", targetEntity=ResolutionStep.class)
	private List<ResolutionStep> steps = new ArrayList<ResolutionStep>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getInitTime() {
		return initTime;
	}

	public void setInitTime(Date initTime) {
		this.initTime = initTime;
	}

	public Date getFinalTime() {
		return finalTime;
	}

	public void setFinalTime(Date finalTime) {
		this.finalTime = finalTime;
	}

	public Content getContent() {
		return content;
	}

	public void setContent(Content content) {
		this.content = content;
	}

	public Student getStudent() {
		return student;
	}

	public boolean isFinished() {
		return finished;
	}

	public void setFinished(boolean finished) {
		this.finished = finished;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public List<ResolutionStep> getSteps() {
		return steps;
	}

	public void setSteps(List<ResolutionStep> steps) {
		this.steps = steps;
	}
}