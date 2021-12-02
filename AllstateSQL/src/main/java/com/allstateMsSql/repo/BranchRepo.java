package com.allstateMsSql.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.allstateMsSql.model.Branch;


public interface BranchRepo extends JpaRepository<Branch, Integer> {
	@Query("from Branch b where b.branchName=?1")
	Optional<Branch> getBranchByName(String branchName);

}
