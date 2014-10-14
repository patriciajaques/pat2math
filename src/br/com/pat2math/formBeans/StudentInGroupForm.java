package br.com.pat2math.formBeans;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.ScriptAssert;

@ScriptAssert(
	lang = "javascript",
	script = "_this.passwordConfirm.equals(_this.password)",
	message = "account.password.mismatch.message")

public class StudentInGroupForm {

	private String firstName, lastName, email, password;
		
	private String passwordConfirm;
	
	private Long groupId;
		
	@Size(min=3, max=80)
	public String getFirstName() {
		return firstName;
	}
		
	@Size(min=3, max=80)
	public String getLastName() {
		return lastName;
	}

	@Email
	@Size(min=5, max=120)
	@Column(unique=true)
	public String getEmail() {
		return email;
	}

	@Size(min=4, max=16)
	public String getPassword() {
		return password;
	}
	
	@NotNull
	public Long getGroupId() {
		return groupId;
	}
		
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
		
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
		
	public void setEmail(String email) {
		this.email = email;
	}

	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPasswordConfirm() {
		return passwordConfirm;
	}

	public void setPasswordConfirm(String passwordConfirm) {
		this.passwordConfirm = passwordConfirm;
	}

}