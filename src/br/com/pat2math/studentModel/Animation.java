package br.com.pat2math.studentModel;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="animation")
public class Animation {
	
	@Id @GeneratedValue
	private Long id;
	
	private String code;
	
	@OneToMany(mappedBy="animation", targetEntity=Tip.class)
	private List<Tip> helps;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public List<Tip> getHelps() {
		return helps;
	}

	public void setHelps(List<Tip> helps) {
		this.helps = helps;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}