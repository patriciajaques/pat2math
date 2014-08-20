package br.com.pat2math.action;

import javax.mail.MessagingException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.pat2math.formBeans.PasswordRecoveryForm;
import br.com.pat2math.repository.AllUsers;
import br.com.pat2math.service.MailSenderService;
import br.com.pat2math.studentModel.PasswordRecovery;
import br.com.pat2math.studentModel.User;

@Controller
@Transactional
@RequestMapping("/user")
public class UserController {
	
	@Autowired private AllUsers allUsers;
	@Autowired private MailSenderService mailSender;
	@Autowired private BCryptPasswordEncoder encoder;
	@PersistenceContext private EntityManager em;
	
	@RequestMapping(value = "forgotPassword", method = RequestMethod.GET)
	public String forgetPassword(Model model) {
		model.addAttribute("user", new User());
		return "user.forgotPassword";
	}
	
	@RequestMapping(value = "sendChangePassword", method = RequestMethod.POST)
	public String sendChangePassword(User user, BindingResult result) throws MessagingException {
		user = allUsers.withEmail(user.getEmail());
		if(user != null) {
			PasswordRecovery passwordRecovery = PasswordRecovery.generateFor(user);
			em.persist(passwordRecovery);
			mailSender.recoverPassword(user, passwordRecovery);	
			return "user.recoverPasswordSended";
		}
		result.rejectValue("email", "error.invalid");
		return "user.forgotPassword";
	}
	
	@RequestMapping(value = "{idUser}/editPassword/{token}", method=RequestMethod.GET)
	public String editPassword(@PathVariable Long idUser, @PathVariable String token, Model model) {
		User user = allUsers.get(idUser);
		PasswordRecovery passwordRecovery = user.getLastPasswordRecovery();
		if(passwordRecovery.getHash().equals(token)) {
			PasswordRecoveryForm form = new PasswordRecoveryForm();
			form.setToken(passwordRecovery.getHash());
			form.setIdUser(user.getId());
			model.addAttribute("passwordRecoveryForm", form);
			return "user.editPassword";
		}
		return "404";
	}
	
	@RequestMapping(value = "changePassword", method=RequestMethod.POST)
	public String recoverPassword(@ModelAttribute("passwordRecoveryForm")
				@Valid PasswordRecoveryForm form,
				BindingResult result, Model model) {
		
		if(result.hasErrors())
			return "user.editPassword";
		User user = allUsers.get(form.getIdUser());
		PasswordRecovery passwordRecovery = user.getLastPasswordRecovery();
		if(passwordRecovery.getHash().equals(form.getToken())) {
			user = user.updatePassword(encoder.encode(form.getPassword()));
			return "redirect:/login?recovery=true";
		}
		result.rejectValue("passwordConfirmation", "error.recovery");
		return "user.editPassword";
	}
		
}