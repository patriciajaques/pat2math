package br.com.pat2math.studentModel;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="agent_speeches")
public class AgentSpeeches {
	@Id @GeneratedValue
	private int id;
	private String speech;

	public AgentSpeeches() {
		
	}
	
	public AgentSpeeches(String speech) {
		this.speech = speech;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getSpeech() {
		return speech;
	}
	
	public void setSpeech(String speech) {
		this.speech = speech;
	}
}