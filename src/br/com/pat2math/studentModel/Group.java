package br.com.pat2math.studentModel;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import br.com.pat2math.domainBase.Plan;

@Entity
@Table(name="_group")
public class Group {
	@Id @GeneratedValue
	private Long id;
	
	@NotNull
	@Size(min=4, max=30)
	private String name;
	
	@NotNull
	@Size(min=5, max=300)
	private String description;
	
	private String password;
	
	private String maxOfStudents;
	
	@OneToMany(mappedBy="group", targetEntity=Student.class)
	private List<Student> student;
	
	@ManyToOne
	@JoinColumn(name="id_plan", referencedColumnName="id")
	private Plan plan;
	
	@ManyToOne
	@JoinColumn(name="id_teacher", referencedColumnName="id", nullable = true)
	private Teacher teacher;
	
	@ManyToOne
	@JoinColumn(name="id_school", referencedColumnName="id", nullable = true)
	private School school;
	
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

	public List<Student> getStudent() {
		return student;
	}

	public void setStudent(List<Student> student) {
		this.student = student;
	}

	public School getSchool() {
		return school;
	}

	public void setSchool(School school) {
		this.school = school;
	}

	public Plan getPlan() {
		return plan;
	}

	public void setPlan(Plan plan) {
		this.plan = plan;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMaxOfStudents() {
		return maxOfStudents;
	}

	public void setMaxOfStudents(String maxOfStudents) {
		this.maxOfStudents = maxOfStudents;
	}

	public Teacher getTeacher() {
		return teacher;
	}

	public void setTeacher(Teacher teacher) {
		this.teacher = teacher;
	}
	
}