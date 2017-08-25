package br.com.pat2math.action;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.pat2math.dao.StudentDao;
import br.com.pat2math.domainBase.Content;
import br.com.pat2math.service.ContentService;
import br.com.pat2math.studentModel.Student;

@Controller
@Transactional
@RequestMapping("/content")
public class ContentController {
	@Autowired private ContentService contentService;
	
	@RequestMapping(method = RequestMethod.GET, value = "{id}")
	public String showEnabledContent(@PathVariable Long id, Model model) {
		Content content = contentService.getEnabledContent(id);
		model.addAttribute("content", content);
		return "content.show";
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "disabled/{id}")
	public String showContent(@PathVariable Long id, Model model) {
		Content content = contentService.getContent(id);
		model.addAttribute("content", content);
		return "content.show";
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "list")
	public String list(Model model) {
		model.addAttribute("enabledContents", contentService.getEnabledContents());
		model.addAttribute("disabledContents", contentService.getDisableContents());
		return "content.list";
	}
	
	@RequestMapping("enable")
	@ResponseBody public String enable(Long idContent) {
		contentService.enableContent(idContent);
		return "ok";
	}
	
	@RequestMapping(method=RequestMethod.GET, value="added")
	public String added() {
		return "content.added";
	}
	
	
}