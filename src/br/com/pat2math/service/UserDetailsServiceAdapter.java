package br.com.pat2math.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.pat2math.repository.AllUsers;
import br.com.pat2math.repository.TeacherRepository;
import br.com.pat2math.studentModel.User;
import br.com.pat2math.studentModel.UserDetailsAdapter;

@Service
public class UserDetailsServiceAdapter implements UserDetailsService {
	
	@Autowired private AllUsers allUsers;
	@Autowired private TeacherRepository allTeachers;
	
	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException, DataAccessException {
		
		User user = allUsers.withEmail(username);
		if(user == null)
			throw new UsernameNotFoundException(
				"User " + username + " does not exists");
		UserDetailsAdapter userAdapter = new UserDetailsAdapter(user, allTeachers);
		return userAdapter;
		
	}

}