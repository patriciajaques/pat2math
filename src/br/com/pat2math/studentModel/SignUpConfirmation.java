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
	
	private SignUpConfirmation() {}
	
	public static SignUpConfirmation generateForUser(User user) {
		SignUpConfirmation confirmation = new SignUpConfirmation();
		confirmation.user = user;
		confirmation.hash = generateHash();
		return confirmation;
	}
	
	private static String generateHash() {
		return UUID.randomUUID().toString();
	}
	
	public String getHash() {
		return hash;
	}
	
}