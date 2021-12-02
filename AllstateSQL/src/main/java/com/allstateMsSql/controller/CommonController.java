package com.allstateMsSql.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.allstateMsSql.model.Branch;
import com.allstateMsSql.services.CommonService;

@RestController
@CrossOrigin("*")
@RequestMapping("common")
public class CommonController {
	@Autowired
	CommonService commonService;
	
	
	@RequestMapping(value = "/getAllBranches", method = RequestMethod.GET)
	public @ResponseBody List<Branch> getAllBranches() {
		List<Branch> branches= null;
		try {
			branches = commonService.getAllBranches();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return branches;
	}

}
