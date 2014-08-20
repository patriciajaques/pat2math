package br.com.pat2math.studentModel;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="password_recovery")
public class PasswordRecovery {
	
	@Id @GeneratedValue
	private Long id;
	
	@ManyToOne
	private User user;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date time;
	
	private String hash;
	
	private PasswordRecovery() {}
	
	public static PasswordRecovery generateFor(User user) {
		PasswordRecovery pr = new PasswordRecovery();
		pr.user = user;
		pr.hash = UUID.randomUUID().toString();
		pr.time = new Date();
		return pr;
	}
	
	public String getHash() {
		return hash;
	}
	
}