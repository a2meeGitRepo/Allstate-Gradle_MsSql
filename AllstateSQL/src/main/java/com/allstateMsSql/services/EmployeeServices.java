package com.allstateMsSql.services;

import java.util.List;
import java.util.Optional;

import com.allstateMsSql.model.Department;
import com.allstateMsSql.model.Employee;



public interface EmployeeServices {

	List<Employee> getAllEmployees();
	void addNewEmployee(Employee employee);
	void addNewDepartment(Department department);
	List<Department> getAllDepartments();
	List<Employee> getActiveEmployeesList();
	
	Employee getEmpployeeByCardNo(String cardNo);
	List<Employee> getEmployeeByLimit(int page_no, int item_per_page);
	List<Employee> getEmployeeByLimitAndSearch(String searchText, int pageNo, int perPage);
	int getEmployeeCount();
	int getEmployeeCountAndSearch(String searchText);
	Optional<Department> getDepartmentByName(String string);
	Optional<Employee> getEmployeeByNo(String string);
	Department saveDepartment(Department department2);
	

}
