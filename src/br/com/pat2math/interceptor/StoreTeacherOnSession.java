package br.com.pat2math.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import br.com.pat2math.action.CurrentUser;
import br.com.pat2math.repository.AllUsers;
import br.com.pat2math.studentModel.Teacher;

public class StoreTeacherOnSession extends HandlerInterceptorAdapter {
	
	@Autowired private AllUsers allUsers;
	
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		
		HttpSession session = request.getSession();
		Authentication auth = SecurityContextHolder
				.getContext().getAuthentication();
		String teacherEmail = auth.getName();
		Teacher teacher = (Teacher) allUsers.withEmail(teacherEmail);
		if(teacher == null) {
			response.sendRedirect("/pat2math/login");
			return false;
		}
		new CurrentUser(session).store(teacher);
		return super.preHandle(request, response, handler);
	
	}
	
}	