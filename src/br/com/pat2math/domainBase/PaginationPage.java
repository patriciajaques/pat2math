package br.com.pat2math.domainBase;

public class PaginationPage {
	
	public PaginationPage(Integer number, Integer first, Integer last) {
		this.first = first;
		this.last = last;
		this.number = number;
	}
	
	private Integer first, last, number;
	
	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public Integer getFirst() {
		return first;
	}
	
	public void setFirst(Integer first) {
		this.first = first;
	}
	
	public Integer getLast() {
		return last;
	}
	
	public void setLast(Integer last) {
		this.last = last;
	}

}