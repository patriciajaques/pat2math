package br.com.pat2math.action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/audio")
public class AudioController {

	@RequestMapping("")
	public String terms() {
		return "audio";
	}
	
}