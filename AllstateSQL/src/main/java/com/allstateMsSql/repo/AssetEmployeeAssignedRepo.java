package com.allstateMsSql.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.allstateMsSql.model.AssetEmployeeAssigned;


public interface AssetEmployeeAssignedRepo extends JpaRepository<AssetEmployeeAssigned, Integer>,AssetEmployeeAssignedCustomeRepo{
	@Query("From AssetEmployeeAssigned a where a.asset.Id=?1")
	Optional<AssetEmployeeAssigned> getAllocationByAssetId(int id);
	@Query("From AssetEmployeeAssigned a where a.employee.employeeId=?1")
	List<AssetEmployeeAssigned> getEmployeeWiseAllocationReport(int empId);

	
}
