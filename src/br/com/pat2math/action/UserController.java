package br.com.pat2math.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.pat2math.repository.AllUsers;
import br.com.pat2math.studentModel.User;

@Controller
@Transactional
@RequestMapping("/user")
public class UserController {
	
	@Autowired private AllUsers allUsers;
	
	@RequestMapping(value = "forgotPassword", method = RequestMethod.GET)
	public String forgetPassword(Model model) {
		model.addAttribute("user", new User());
		return "user.forgotPassword";
	}
	
	@RequestMapping(value = "sendChangePassword", method = RequestMethod.POST)
	public String sendChangePassword(User user) {
		
		if(allUsers.withEmail(user.getEmail()) != null) {
			System.out.println("achei");
		} else {
			System.out.println("não achei");
		}
		
		return "student.login";
	}
	
}