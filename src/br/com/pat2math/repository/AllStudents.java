package br.com.pat2math.repository;

import br.com.pat2math.studentModel.Student;

public interface AllStudents extends Repository<Student> {
	
	public Student withEmail(String email);
	
}