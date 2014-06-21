package br.com.pat2math.domainBase;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@DiscriminatorValue("equation")
public class Exercise extends Content {
	
	public Exercise() {
		
	}
	
	public Exercise(Long id, String name, String equation) {
		this.id = id;
		this.name = name;
		this.equation = equation;
	}
	
	@NotNull(message="{equation.empty}")
	@Size(min=3, max=100, message="{equation.size}")
	private String equation;
	
	@Transient
	private List<String> steps = new ArrayList<String>();

	public String getEquation() {
		return equation;
	}

	public void setEquation(String equation) {
		this.equation = equation;
	}

	public List<String> getSteps() {
		return steps;
	}

	public void setSteps(List<String> steps) {
		this.steps = steps;
	}
	
}