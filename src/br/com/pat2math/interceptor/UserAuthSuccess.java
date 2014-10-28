package br.com.pat2math.interceptor;

import java.io.IOException;
import java.util.Set;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

public class UserAuthSuccess implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request,
			HttpServletResponse response, Authentication auth) throws IOException,
			ServletException {
		
		Set<String> roles = 
				AuthorityUtils.authorityListToSet(auth.getAuthorities());
		if(roles.contains("ROLE_TEACHER") 
				|| roles.contains("ROLE_ADMIN"))
			response.sendRedirect("/pat2math/plan/list?page=0");
		else
			response.sendRedirect("/pat2math/student/home");
	}
	
}