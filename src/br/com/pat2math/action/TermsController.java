package br.com.pat2math.action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/terms")
public class TermsController {

	@RequestMapping("")
	public String terms() {
		return "terms";
	}
	
}