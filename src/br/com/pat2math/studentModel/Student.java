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

	//Pego um grupo da tabela _group
	@ManyToOne
	@JoinColumn(name="id_group", referencedColumnName="id", nullable=true)
	private Group group;
	
	//1 lista com knowledge
	@OneToMany(mappedBy="student", targetEntity=Knowledge.class)
	private List<Knowledge> knowledges;
	
	//1 lista lista TaskPerformed == Tempo inicial de fazer fazer a equação, tempo final, id equação, + 1 lista resolutionStep
	@OneToMany
	private List<TaskPerformed> tasksPerformed;
	
	//1 lista tip == com todos os códigos dos tipos das equações e suas respectivas AS DICAS!!
	@Transient
	private List<Tip> helpsRequested = new ArrayList<Tip>();
	
	//1 lista tip == com todos os códigos dos tipos das equações e suas respectivas AS DICAS!!
	@Transient
	private List<Tip> feedbacks = new ArrayList<Tip>();
	
	//Pontuações gerais
	private Integer totalScore, scoreLevel1, scoreLevel2, scoreLevel3, scoreLevel4, scoreLevel5;
	
	//Recompensas especiais
	private Boolean rewardWorkedExamples, rewardFinal;
	
	//Progresso
	private Integer currentLevel, currentPlan, numEquationsSolved, numErrors, numHints;
	
	//Indica se o usuário já viu o tour interativo do TCC
	private Boolean tourWasViewed;
	
	private Boolean knowledgeTestWasRealized;
	
	//Turma do estudante
	private Integer turma;
	
	private Double notaTeste;
	
	
	public static Student newStudent(Student student) {
		student.defineRole();
		student.defineScoresDefault();
		student.defineSpecialRewardsDefault();
		student.defineProgressDefault();
		student.activate();
		student.setKnowledgeTestWasRealized(false);
		student.setTourWasViewed(false);
		student.setTurma(0); //Padrão para os usuários fora do colégio São Luís
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
	
	public void defineScoresDefault() {
		totalScore = 0;
		scoreLevel1 = 0;
		scoreLevel2 = 0;
		scoreLevel3 = 0;
		scoreLevel4 = 0;
		scoreLevel5 = 0;
	}
	
	public void defineSpecialRewardsDefault() {
		rewardWorkedExamples = false;
		rewardFinal = false;	
	}
	
	public void defineProgressDefault() {
		currentLevel = 1;
		currentPlan = 1;
		numEquationsSolved = 0;
		numErrors = 0;
		numHints = 0;
	}
	
	public void addOrRemovePoints(int amount, int level) {
		totalScore += amount;
		
		if (level == 1)
			scoreLevel1 += amount;
		
		else if (level == 2)
			scoreLevel2 += amount;
		
		else if (level == 3)
			scoreLevel3 += amount;
		
		else if (level == 4)
			scoreLevel4 += amount;
		
		else
			scoreLevel5 += amount;	
	}
	
	public void completePlan() {
		currentPlan++;
		
		if (currentPlan == 6 || currentPlan == 11 || currentPlan == 15 || currentPlan == 19)
			currentLevel++;
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

	public List<TaskPerformed> getTasksPerformed() {
		return tasksPerformed;
	}

	public void setTasksPerformed(List<TaskPerformed> tasksPerformed) {
		this.tasksPerformed = tasksPerformed;
	}

	public int getTotalScore() {
		return totalScore;
	}

	public void setTotalScore(int totalScore) {
		this.totalScore = totalScore;
	}

	public int getScoreLevel1() {
		return scoreLevel1;
	}

	public void setScoreLevel1(int scoreLevel1) {
		this.scoreLevel1 = scoreLevel1;
	}

	public int getScoreLevel2() {
		return scoreLevel2;
	}

	public void setScoreLevel2(int scoreLevel2) {
		this.scoreLevel2 = scoreLevel2;
	}

	public int getScoreLevel3() {
		return scoreLevel3;
	}

	public void setScoreLevel3(int scoreLevel3) {
		this.scoreLevel3 = scoreLevel3;
	}

	public int getScoreLevel4() {
		return scoreLevel4;
	}

	public void setScoreLevel4(int scoreLevel4) {
		this.scoreLevel4 = scoreLevel4;
	}

	public int getScoreLevel5() {
		return scoreLevel5;
	}

	public void setScoreLevel5(int scoreLevel5) {
		this.scoreLevel5 = scoreLevel5;
	}

	public boolean isRewardWorkedExamples() {
		return rewardWorkedExamples;
	}

	public void setRewardWorkedExamples(boolean rewardWorkedExamples) {
		this.rewardWorkedExamples = rewardWorkedExamples;
	}

	public boolean isRewardFinal() {
		return rewardFinal;
	}

	public void setRewardFinal(boolean rewardFinal) {
		this.rewardFinal = rewardFinal;
	}

	public int getCurrentLevel() {
		return currentLevel;
	}

	public void setCurrentLevel(int currentLevel) {
		this.currentLevel = currentLevel;
	}

	public int getCurrentPlan() {
		return currentPlan;
	}

	public void setCurrentPlan(int currentPlan) {
		this.currentPlan = currentPlan;
	}

	public int getNumEquationsSolved() {
		return numEquationsSolved;
	}

	public void setNumEquationsSolved(int numEquationsSolved) {
		this.numEquationsSolved = numEquationsSolved;
	}

	public int getNumErrors() {
		return numErrors;
	}

	public void setNumErrors(int numErrors) {
		this.numErrors = numErrors;
	}

	public int getNumHints() {
		return numHints;
	}

	public void setNumHints(int numHints) {
		this.numHints = numHints;
	}

	public boolean isTourWasViewed() {
		return tourWasViewed;
	}

	public void setTourWasViewed(boolean tourWasViewed) {
		this.tourWasViewed = tourWasViewed;
	}
	
	public void setTurma(Integer turma) {
		this.turma = turma;
	}
	
	public Integer getTurma() {
		return turma;
	}

	public Boolean getKnowledgeTestWasRealized() {
		return knowledgeTestWasRealized;
	}

	public void setKnowledgeTestWasRealized(Boolean knowledgeTestWasRealized) {
		this.knowledgeTestWasRealized = knowledgeTestWasRealized;
	}
	
	
	
	public void setNotaTeste (Double notaTeste) {
		this.notaTeste = notaTeste;
	}
	
	public Double getNotaTeste() {
		return notaTeste;
	}
	
	
	

	
	
	
	
}