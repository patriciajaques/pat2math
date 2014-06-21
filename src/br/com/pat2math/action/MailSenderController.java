package br.com.pat2math.action;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import br.com.pat2math.service.MailSenderService;
import br.com.pat2math.studentModel.Group;

@Controller
@Transactional
@RequestMapping("/invite")
public class MailSenderController {
	
	@Autowired private MailSenderService mailSender;
	
	@RequestMapping("new")
	public String formMail() {
		//mailSender.sendMail(email, "Join PAT2Math now!", "testing the sending of email");
		
		return "invite.new";
	}
	
	@RequestMapping("")
	public String invite(Group group, String email) throws MessagingException {
		System.out.println("em - > " + email);
		
		String text = "";
		text+="Ola, Voce foi convidado pelo professor PAT2Math para participar da turma Unisinos.\n\n";
		text+="inicie sua jornada no PAT2Math clicando no link abaixo: \n\n";
		text+="pat2math.unisinos.br/pat2math/users/new?email=" + email + "&group.id=" + 1+"\n\n";
		
		//mailSender.sendMail(email, "Join PAT2Math now!", text);
		return "invite.success";
	}
	
}
