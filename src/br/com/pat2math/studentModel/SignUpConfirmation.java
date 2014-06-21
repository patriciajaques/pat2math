package br.com.pat2math.studentModel;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class SignUpConfirmation {
	
	@Id @GeneratedValue
	private Long id;
	
	@OneToOne
	private User user;
	
	private String hash;
	
	public static SignUpConfirmation generateForUser(User user) {
		SignUpConfirmation confirmation = new SignUpConfirmation();
		confirmation.user = user;
		confirmation.hash = generateHash();
		return confirmation;
	}
	
	private static String generateHash() {
		return UUID.randomUUID().toString();
	}
	
	/*public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	

	public void setHash(String hash) {
		this.hash = hash;
	}*/
	
	public String getHash() {
		return hash;
	}
	
}