package br.com.pat2math.studentModel;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="operation")
public class Operation {
	
	@Id @GeneratedValue
	private Long id;
	
	private String code;
	
	@ManyToMany(mappedBy="operations", targetEntity=ResolutionStep.class)												 
	private List<ResolutionStep> resolutionSteps = new ArrayList<ResolutionStep>();

	public List<ResolutionStep> getResolutionSteps() {
		return resolutionSteps;
	}

	public void setResolutionSteps(List<ResolutionStep> resolutionSteps) {
		this.resolutionSteps = resolutionSteps;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
}