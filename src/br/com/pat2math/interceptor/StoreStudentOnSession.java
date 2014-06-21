package br.com.pat2math.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import br.com.pat2math.action.CurrentUser;
import br.com.pat2math.repository.AllStudents;
import br.com.pat2math.studentModel.Student;

public class StoreStudentOnSession extends HandlerInterceptorAdapter {
	
	@Autowired private AllStudents allStudents;
	
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		Authentication auth = SecurityContextHolder
				.getContext().getAuthentication();
		String studentEmail = auth.getName();
		Student student = allStudents.withEmail(studentEmail);
		HttpSession session = request.getSession();
		new CurrentUser(session).store(student);
		
		if(student == null) {
			response.sendRedirect("/pat2math/login");
			return false;
		}
		return super.preHandle(request, response, handler);
	}
	
}