package com.allstateMsSql.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.allstateMsSql.model.Branch;
import com.allstateMsSql.repo.BranchRepo;


@Service
public class CommonServiceImpl implements CommonService {
	@Autowired
	BranchRepo branchRepo;

	@Override
	public List<Branch> getAllBranches() {
		// TODO Auto-generated method stub
		return branchRepo.findAll();
	}

	@Override
	public Optional<Branch> getBranchByName(String branchName) {
		// TODO Auto-generated method stub
		return branchRepo.getBranchByName(branchName);
	}

	@Override
	public Branch addnewBranch(Branch branch2) {
		// TODO Auto-generated method stub
		return branchRepo.save(branch2);
	}

}
