package br.com.pat2math.repository;

import java.util.List;

public interface Repository<T> {
	
	T add(T o);
	void alter(T o);
	void delete(Long id);
	T get(Long id);
	List<T> getAll();
	T getByName(String name);
	Long size();
	List<T> onInterval(Integer first, Integer last);
	
} 