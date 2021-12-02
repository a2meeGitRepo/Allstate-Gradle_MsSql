/**
 * @ Dattatray Bodhale
 * Jan 30, 2020
 */
package com.allstateMsSql.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.allstateMsSql.model.Department;


public interface DepartmentRepo extends JpaRepository<Department, Integer>{
	@Query("From Department d where d.departmentName=?1")
	Optional<Department> getDepartmentByName(String depname);

}
