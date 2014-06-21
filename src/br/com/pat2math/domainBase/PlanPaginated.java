package br.com.pat2math.domainBase;

import java.util.ArrayList;
import java.util.List;

public class PlanPaginated {
	
	public PlanPaginated(List<Plan> allPlans, Integer numItemsOnPage) {
		this.allPlans = allPlans;
		this.numItemsOnPage = numItemsOnPage;
		numPages = (int) 
				Math.round(((double) allPlans.size() / numItemsOnPage)+0.5d);
		
		if(numPages <= 1)
			pageSelected = allPlans;
		else
			pageSelected = allPlans.subList(0 , numItemsOnPage);
		initializePages();
	}
	
	private Integer currentPage;
	private List<Plan> allPlans;
	private List<Plan> pageSelected;
	private List<PaginationPage> pages = new ArrayList<PaginationPage>();
	private Integer numItemsOnPage;
	private Integer numPages;
	
	private void initializePages() {
		Integer first = 0;
		Integer last = 0;
		for(int i = 0; i < numPages ; i++) {
			first = i * numItemsOnPage;
			last = first + numItemsOnPage;
			PaginationPage page = 
					new PaginationPage(i, first, last);
			pages.add(page);
		}
	}
	
	public void changePage(Integer page) {
		Integer first = page * numItemsOnPage;
		Integer last = first + numItemsOnPage;
		
		if(last >= allPlans.size()) {
			pageSelected = allPlans.subList(first, allPlans.size());
		} else {
			pageSelected = allPlans.subList(first, last);
		}
		currentPage = page;
	}

	public List<Plan> getPageSelected() {
		return pageSelected;
	}

	public List<PaginationPage> getPages() {
		return pages;
	}

	public Integer getCurrentPage() {
		return currentPage;
	}
	
}