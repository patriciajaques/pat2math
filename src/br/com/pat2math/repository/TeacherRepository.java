package br.com.pat2math.repository;

import br.com.pat2math.studentModel.Teacher;

public interface TeacherRepository extends Repository<Teacher> {
	Teacher getByEmail(String email);
}