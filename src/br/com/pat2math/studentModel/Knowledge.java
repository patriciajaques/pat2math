package br.com.pat2math.studentModel;

import java.util.Arrays;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Seria uma tabela com o tipo de equação em código e uma porcetagem de conhecimento por aluno daquele determinado código,
 * MAS PARECE QUE NÃO ESTÁ SENDO UTILIZADA
 * @author SAVANNAD
 *
 */
@Entity
@Table(name="knowledge")
public class Knowledge {
	
	//ID na tabela
	@Id @GeneratedValue
	private int id;
	
	//Percentuagem de acordo com determinado aluno e determinado código de tipo de equação
	private float percentage;
	
	//Código de tipo de tipo de equação
	private String content;
	
	@ManyToOne
	private Student student;
	
	public Knowledge() {
		this.percentage = 0F;
	}
	
	public Knowledge(float porcentagem, String conteudo) {
		this.percentage = porcentagem;
		this.content = conteudo;
	}
	
	public List<String> knowledges() {
		return Arrays.asList(
				"AD","SB","DV","MT","MM","DM","FC",
				"QS","QD","PS","BK","OI","SP","RC",
				"FT","RZ","PT",	"DF");
	}
 
	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public float getPercentage() {
		return percentage;
	}

	public void setPercentage(float percentage) {
		this.percentage = percentage;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((content == null) ? 0 : content.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		final Knowledge other = (Knowledge) obj;
		if (content == null) {
			if (other.content != null)
				return false;
		} else if (!content.equals(other.content))
			return false;
		return true;
	}

}