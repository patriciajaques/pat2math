package br.com.pat2math.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import br.com.pat2math.domainBase.Content;
import br.com.pat2math.repository.ContentRepository;

@Service
public class ContentService {
	
	@Autowired private ContentRepository contents;
	
	public List<Content> getDisableContents() {
		List<Content> allContents = getContents();
		return new Content().getDisabledContents(allContents);
	}
	
	public List<Content> getEnabledContents() {
		List<Content> allContents = getContents();
		return new Content().getEnabledContents(allContents);
	}
	
	private List<Content> getContents() {
		return contents.getAll();
	}
	
	public void enableContent(Long idContent) {
		Content content = getContent(idContent);
		content.activate();
	}
	
	@PreAuthorize("isAuthenticated()")
	public Content getEnabledContent(Long id) {
		Content content = contents.get(id);
		return content.isEnabled() ?
				content : null;
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public Content getContent(Long id) {
		return contents.get(id);
	}
	
}