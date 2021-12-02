/**
 * @ Dattatray Bodhale
 * Jan 30, 2020
 */
package com.allstateMsSql.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.allstateMsSql.model.Employee;


public interface EmployeeRepo extends JpaRepository<Employee, Integer>,EmployeeCustomeRepo{

	@Query("From Employee e where e.active=1")
	List<Employee> getActiveEmployeesList();
	@Query("From Employee e where e.uhfCode=?1 and e.active=1")
	Optional<Employee> findByCardNo(String cardNo);
	@Query("From Employee e where e.employeeNo=?1")
	Optional<Employee> getEmployeeByNo(String empNo);
	

}
