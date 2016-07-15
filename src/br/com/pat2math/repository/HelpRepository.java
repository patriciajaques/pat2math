package br.com.pat2math.repository;

import java.util.List;

import br.com.pat2math.studentModel.Tip;

public interface HelpRepository extends Repository<Tip> {

	public List<Tip> getActives();
}
