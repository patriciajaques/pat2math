package br.com.pat2math.repository;

import br.com.pat2math.studentModel.User;


public interface AllUsers extends Repository<User> {
	
	User withEmail(String email);

}