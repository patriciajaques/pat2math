package br.com.pat2math.studentModel;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;

import br.com.pat2math.formBeans.PasswordRecoveryForm;

/**
 * É uma classe da tabela user do banco de dados
 * @author SAVANNAD
 *
 */
@Entity
@Table(name="user")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType=DiscriminatorType.STRING)
@DiscriminatorValue("none")

public class User {
	
	//Cria o usuári com o e-mail
	public User() {
		email = "";
	}
	
	//Id na tabela
	@Id @GeneratedValue
	private Long id;
	
	//Nome
	@Size(min=3, max=80)
	private String firstName;
	
	//Sobrenome
	@Size(min=3, max=80)
	private String lastName;
	
	//E-mail do usuário com tamanho máximo e mínimo
//	@Email
	@Size(min=5, max=120)
	@Column(unique=true)
	private String email;
	
	// Uma lista das senhas restauradas
	@OneToMany(mappedBy="user", targetEntity=PasswordRecovery.class)
	private List<PasswordRecovery> passwordRecoveries;
	
	//A senha
	@Size(min=4, max=1000)
	private String password;

	//Tipo de regra a ser usada, se para studant ou teacher
	private String role;
	
	//Se está ativo
	private boolean enable;
	
	public boolean hasEmailOf(User otherUser) {
		return otherUser != null
			&& email.equalsIgnoreCase(otherUser.getEmail());
	}
	
	public void desactivate() {
		enable = false;
	}
	
	public void activate() {
		enable = true;
	}
	
	public User updatePassword(String password) {
		this.setPassword(password);
		return this;
	}
	
	public PasswordRecovery getLastPasswordRecovery() {
		return passwordRecoveries.get(passwordRecoveries.size() -1);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public boolean isEnable() {
		return enable;
	}

	public void setEnable(boolean enable) {
		this.enable = enable;
	}

	public List<PasswordRecovery> getPasswordRecoveries() {
		return passwordRecoveries;
	}

	public void setPasswordRecoveries(List<PasswordRecovery> passwordRecoveries) {
		this.passwordRecoveries = passwordRecoveries;
	}
	
}