package com.allstateMsSql.repo;

import java.util.List;

import com.allstateMsSql.model.Employee;


public interface EmployeeCustomeRepo {
	List<Employee> getEmployeeByLimit(int page_no, int item_per_page);
	List<Employee> getEmployeeByLimitAndSearch(String searchText, int pageNo, int perPage);
	int getEmployeeCount();
	int getEmployeeCountAndSearch(String searchText);
}
