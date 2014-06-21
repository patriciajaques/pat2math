package br.com.pat2math.domainBase;

import java.util.Date;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import br.com.pat2math.studentModel.Student;
import br.com.pat2math.studentModel.TaskPerformed;

@Entity
@DiscriminatorValue("video")
public class Video extends Content {
	
	@NotNull
	@Size(min=10, max=1000)
	private String url;
	
	public void formatUrl() {
		url = url.replace("/watch?v=", "/v/");
	}
	
	@Override
	public TaskPerformed perform(Student student) {
		TaskPerformed tp = new TaskPerformed();
		tp.setInitTime(new Date());
		tp.setFinalTime(new Date());
		tp.setFinished(true);
		tp.setContent(this);
		tp.setStudent(student);
		return tp;
	}
	
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}