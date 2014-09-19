package br.com.pat2math.action;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import br.com.pat2math.domainBase.Video;
import br.com.pat2math.service.AdminService;

@Controller
@Transactional
@RequestMapping("/video")
public class VideoController {
	
	@Autowired private AdminService service;
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(method = RequestMethod.GET, value = "new")
	public String _new(Model model) {
		model.addAttribute("video", new Video());
		return "video.new";
	}
	
	@RequestMapping(method=RequestMethod.POST, value="")
	public String save(@ModelAttribute("video") @Valid Video video,
						BindingResult result) {
		service.createVideo(video, result);
		if(result.hasErrors()) 
			return "video.new";
		return "redirect:../content/added";
	}
	
}