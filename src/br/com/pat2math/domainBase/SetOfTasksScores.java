package br.com.pat2math.domainBase;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import br.com.pat2math.studentModel.User;

@Entity
@Table(name = "set_of_tasks_scores")
public class SetOfTasksScores {
	@Id
	@GeneratedValue
	private Long id;

	@OneToOne
	@JoinColumn(name = "id_user", referencedColumnName = "id", nullable = true)
	private User user;
	
	@OneToOne
	@JoinColumn(name = "id_set_of_tasks", referencedColumnName = "id", nullable = true)
	private SetOfTasks setOfTask;
	
	@Column(name = "score")
	private int score;

	public SetOfTasksScores(User user, SetOfTasks setOfTask) {
		this.user = user;
		this.setOfTask = setOfTask;
		this.score = 0;
	}
	
	//Para remover os pontos, a quantidade passada por parâmetro deve ser negativa
	public void addOrRemovePoints(int amount) {
		score += amount;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public SetOfTasks getSetOfTask() {
		return setOfTask;
	}

	public void setSetOfTask(SetOfTasks setOfTask) {
		this.setOfTask = setOfTask;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}
	
	
	
	
}
