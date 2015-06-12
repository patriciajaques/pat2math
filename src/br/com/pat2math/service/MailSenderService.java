package br.com.pat2math.service;

import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.ui.velocity.VelocityEngineUtils;

import br.com.pat2math.studentModel.PasswordRecovery;
import br.com.pat2math.studentModel.SignUpConfirmation;
import br.com.pat2math.studentModel.User;

@Service
public class MailSenderService {
	
	 @Autowired private JavaMailSender mailSender;
	 @Autowired private VelocityEngine velocityEngine;
	 
	 private final String CONF_SIGN_UP = "confirmationSignUp.vm";
	 private final String CHANGE_PASSWORD = "recoverPassword.vm";
	 
	 @SuppressWarnings("deprecation")
	 @Async
	 public void sendConfirmationAccount(User to, SignUpConfirmation confirmation, String subject) throws MessagingException {
		 MimeMessage mm = mailSender.createMimeMessage();
		 MimeMessageHelper mh = new MimeMessageHelper(mm,"UTF-8");
		 Map<String, Object> model = new HashMap<String, Object>();
		 model.put("user", to);
		 model.put("hash", confirmation.getHash());
		 String text = VelocityEngineUtils.mergeTemplateIntoString(velocityEngine, CONF_SIGN_UP,"UTF-8", model);
		 text = text.replaceAll("\n", "<br>");
		 mh.setFrom("[no-reply] pat2math@gmail.com");
		 mh.setTo(to.getEmail());
		 mh.setSubject(subject);
	     mh.setText(text, true);
	     mailSender.send(mm);
	 }
	 
	 public void sendReportBug (User to, String text) throws MessagingException {
		 MimeMessage mm = mailSender.createMimeMessage();
		 MimeMessageHelper mh = new MimeMessageHelper(mm,"UTF-8");
		 Map<String, Object> model = new HashMap<String, Object>();
		 model.put("user", to);
		 text = text.replaceAll("\n", "<br>");
		 mh.setFrom(to.getEmail());
		 mh.setTo("otavioazevedo@live.com");
		 mh.setSubject("Reporte de Bug - " + to.getFirstName() + " " + to.getLastName());
	     mh.setText(text, true);
	     mailSender.send(mm);
	 }
	 
	 @SuppressWarnings("deprecation")
	 @Async
	 public void recoverPassword(User to, PasswordRecovery passwordRecovery) throws MessagingException {
		 MimeMessage mm = mailSender.createMimeMessage();
		 MimeMessageHelper mh = new MimeMessageHelper(mm,"UTF-8");
		 Map<String, Object> model = new HashMap<String, Object>();
		 model.put("user", to);
		 model.put("hash", passwordRecovery.getHash());
		 String text = VelocityEngineUtils.mergeTemplateIntoString(velocityEngine, CHANGE_PASSWORD, "UTF-8",model);
		 text = text.replaceAll("\n", "<br>");
		 mh.setFrom("pat2math@gmail.com");
		 mh.setTo(to.getEmail());
		 mh.setSubject("Redefinição de senha");
	     mh.setText(text, true);
	     mailSender.send(mm);
	 }
	 
	 
}