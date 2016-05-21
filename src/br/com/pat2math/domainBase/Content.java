package br.com.pat2math.domainBase;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;

import br.com.pat2math.studentModel.Student;
import br.com.pat2math.studentModel.TaskPerformed;

@Entity
@Table(name="content")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType=DiscriminatorType.STRING)
@DiscriminatorValue("none")
public class Content {
	
	@Id @GeneratedValue
	protected Long id;
	
	protected String name;
	
	private String description;
	
	@Column(length=40, nullable=false, insertable=false, updatable=false)
	private String type;
	
	@OneToMany(mappedBy="content", targetEntity=Task.class, fetch=FetchType.EAGER)
	private List<Task> tasks;
	
	@ManyToOne
	@JoinColumn(name="id_level", referencedColumnName="id", nullable=true)
	private Level level;
	
	private String nivelDificuldade;
	
	protected Integer pontuacao;
	
	private Boolean active = false;
	
	@Transient
	private boolean performed;
	
	public TaskPerformed perform(Student student) {
		TaskPerformed tp = new TaskPerformed();
		tp.setInitTime(new Date());
		tp.setFinalTime(new Date());
		tp.setContent(this);
		tp.setStudent(student);
		return tp;
	}
	
	public List<Content> getEnabledContents(List<Content> allContents) {
		List<Content> enabledContents = new ArrayList<Content>();
		for(Content content : allContents) 
			if(content.isEnabled()) 
				enabledContents.add(content);
		return enabledContents;
	}
	
	public List<Content> getDisabledContents(List<Content> allContents) {
		List<Content> disabledContents = new ArrayList<Content>();
		for(Content content : allContents) 
			if(!content.isEnabled()) 
				disabledContents.add(content);
		return disabledContents;
	}
	
	public void activate() {
		active = true;
	}
	
	public void deactivate() {
		active = true;
	}
	
	public Boolean isEnabled() {
		return active;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

	public Level getLevel() {
		return level;
	}

	public void setLevel(Level level) {
		this.level = level;
	}
	
	public String getNivelDificuldade() {
		return nivelDificuldade;
	}
	
	public void setNivelDificuldade(String nivelDificuldade) {
		this.nivelDificuldade = nivelDificuldade;
	}
	
	public Integer getPontuacao() {
		return pontuacao;
	}

	public void setPontuacao(Integer pontuacao) {
		this.pontuacao = pontuacao;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public boolean isPerformed() {
		return performed;
	}

	public void setPerformed(boolean performed) {
		this.performed = performed;
	}
	
}