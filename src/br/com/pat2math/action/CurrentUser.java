package br.com.pat2math.action;

import javax.servlet.http.HttpSession;

import br.com.pat2math.studentModel.Student;
import br.com.pat2math.studentModel.Teacher;
import br.com.pat2math.studentModel.User;

public class CurrentUser {
	
	private HttpSession session;
	
	public CurrentUser(HttpSession session) {
		this.session = session;
	}
	
	public void store(User user) {
		session.setAttribute("user", user);
	}
	
	public Student student() {
		return (Student) session.getAttribute("user");
	}
	
	public Teacher teacher() {
		return (Teacher) session.getAttribute("user");
	}
	
}