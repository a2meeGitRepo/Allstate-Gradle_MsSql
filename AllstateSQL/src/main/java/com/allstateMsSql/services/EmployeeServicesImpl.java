/**
 * @ Dattatray Bodhale
 * Jan 30, 2020
 */
package com.allstateMsSql.services;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.allstateMsSql.model.Department;
import com.allstateMsSql.model.Employee;
import com.allstateMsSql.repo.DepartmentRepo;
import com.allstateMsSql.repo.EmployeeRepo;


@Service
@Transactional
public class EmployeeServicesImpl implements EmployeeServices {
	@Autowired
	EmployeeRepo employeeRepo;
	@Autowired
	DepartmentRepo departmentRepo;

	@Override
	public List<Employee> getAllEmployees() {
		// TODO Auto-generated method stub
		return employeeRepo.findAll();
	}

	@Override
	public void addNewEmployee(Employee employee) {
		// TODO Auto-generated method stub
		employeeRepo.save(employee);
	}

	@Override
	public void addNewDepartment(Department department) {
		// TODO Auto-generated method stub
		departmentRepo.save(department);
	}

	@Override
	public List<Department> getAllDepartments() {
		// TODO Auto-generated method stub
		return departmentRepo.findAll();
	}

	
	@Override
	public List<Employee> getActiveEmployeesList() {
		// TODO Auto-generated method stub
		return employeeRepo.getActiveEmployeesList();
	}

	
	
	@Override
	public Employee getEmpployeeByCardNo(String cardNo) {
		// TODO Auto-generated method stub
		Optional<Employee> list =employeeRepo.findByCardNo(cardNo);
		return list.isPresent()?list.get():null;
	}

	@Override
	public List<Employee> getEmployeeByLimit(int page_no, int item_per_page) {
		// TODO Auto-generated method stub
		return employeeRepo.getEmployeeByLimit(page_no,item_per_page);
	}

	@Override
	public List<Employee> getEmployeeByLimitAndSearch(String searchText, int pageNo, int perPage) {
		// TODO Auto-generated method stub
		return employeeRepo.getEmployeeByLimitAndSearch(searchText,pageNo,perPage);
	}

	@Override
	public int getEmployeeCount() {
		// TODO Auto-generated method stub
		return employeeRepo.getEmployeeCount();
	}

	@Override
	public int getEmployeeCountAndSearch(String searchText) {
		// TODO Auto-generated method stub
		return employeeRepo.getEmployeeCountAndSearch(searchText);
	}

	@Override
	public Optional<Department> getDepartmentByName(String depname) {
		// TODO Auto-generated method stub
		return departmentRepo.getDepartmentByName(depname);
	}

	@Override
	public Optional<Employee> getEmployeeByNo(String empNo) {
		// TODO Auto-generated method stub
		return employeeRepo.getEmployeeByNo(empNo);
	}

	@Override
	public Department saveDepartment(Department department2) {
		// TODO Auto-generated method stub
		return departmentRepo.save(department2);
	}



}
