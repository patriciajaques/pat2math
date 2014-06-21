package br.com.pat2math.studentModel;

import java.io.Serializable;
import java.util.List;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import br.com.pat2math.domainBase.Plan;

@Entity
@DiscriminatorValue("teacher")
public class Teacher extends User implements Serializable {
	private static final long serialVersionUID = 1L;

	@OneToMany(mappedBy = "teacher")
	private List<Group> groups;
	
	@OneToMany(mappedBy = "teacher", fetch=FetchType.EAGER)
	private List<Plan> plans;
	
	public void defineRole() {
		this.setRole("ROLE_TEACHER");
	}
	
	public boolean isOwnerOfPlan(Long idPlan) {
		for(Plan plan : plans) {
			if(plan.getId() == idPlan) return true; 
		}
		return false;
	}

	public List<Group> getGroups() {
		return groups;
	}

	public void setGroups(List<Group> groups) {
		this.groups = groups;
	}
	
}