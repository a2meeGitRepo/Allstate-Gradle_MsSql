package com.allstateMsSql.services;

import java.util.List;
import java.util.Optional;

import com.allstateMsSql.model.Branch;


public interface CommonService {

	List<Branch> getAllBranches();

	Optional<Branch> getBranchByName(String branchName);

	Branch addnewBranch(Branch branch2);

}
